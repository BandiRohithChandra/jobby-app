import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import ProfileCard from '../ProfileCard'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchInput: '',
    profileDetails: null,
    isLoading: true,
    isError: false,
    jobsList: [],
    jobsError: false,
    employmentType: [],
    minimumPackage: '',
    isJobsLoading: true,
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({isJobsLoading: true, jobsError: false})
    const {employmentType, minimumPackage, searchInput} = this.state
    const employmentTypeQuery = employmentType.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${minimumPackage}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        isJobsLoading: false,
      })
    } else {
      this.setState({
        isJobsLoading: false,
        jobsError: true,
      })
    }
  }

  onSearchInputChange = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onSearch = () => {
    this.getJobs()
  }

  onEmploymentTypeChange = event => {
    const {value, checked} = event.target
    this.setState(prevState => {
      const updatedEmploymentType = checked
        ? [...prevState.employmentType, value]
        : prevState.employmentType.filter(type => type !== value)

      return {
        employmentType: updatedEmploymentType,
      }
    }, this.getJobs)
  }

  onMinimumPackageChange = event => {
    const {value, checked} = event.target
    this.setState(
      {
        minimumPackage: checked ? value : '',
      },
      this.getJobs,
    )
  }

  getProfile = async () => {
    this.setState({isLoading: true, isError: false})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({
        isLoading: false,
        isError: true,
      })
    }
  }
  renderJobsFailureView = () => {
    return (
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button type="button" className="retry-button">
          Retry
        </button>
      </div>
    )
  }

  renderProfileFailureView = () => {
    return (
      <div>
        <button type="button" className="button" onClick={this.getProfile}>
          Retry
        </button>
      </div>
    )
  }

  renderLoaderView = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderProfileCard = () => {
    const {profileDetails} = this.state
    return (
      <div>
        <ProfileCard profileDetails={profileDetails} />
      </div>
    )
  }

  renderNoJobsFound = () => {
    return (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="noJobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    return (
      <div>
        {jobsList.length !== 0 ? (
          <ul className="jobs-list">
            {jobsList.map(eachJob => (
              <JobCard key={eachJob.id} jobs={eachJob} />
            ))}
          </ul>
        ) : (
          this.renderNoJobsFound()
        )}
      </div>
    )
  }

  render() {
    const {isLoading, isError, isJobsLoading, jobsError, searchInput} =
      this.state
    let content
    if (isLoading) {
      content = this.renderLoaderView()
    } else if (isError) {
      content = this.renderProfileFailureView()
    } else {
      content = this.renderProfileCard()
    }

    let jobsContent

    if (isJobsLoading) {
      jobsContent = this.renderLoaderView()
    } else if (jobsError) {
      jobsContent = this.renderJobsFailureView()
    } else {
      jobsContent = this.renderJobsList()
    }

    return (
      <div>
        <Header />
        <div className="left-section-container">
          <div>{content}</div>

          <hr className="line" />

          <div>
            <h1>Type of Employment</h1>
            <div>
              {employmentTypesList.map(eachEmployment => (
                <div
                  key={employmentTypesList.employmentTypeId}
                  className="types-list"
                >
                  <input
                    type="checkbox"
                    value={eachEmployment.employmentTypeId}
                    id={eachEmployment.employmentTypeId}
                    onChange={this.onEmploymentTypeChange}
                  />
                  <label htmlFor={eachEmployment.employmentTypeId}>
                    {eachEmployment.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <hr className="line" />

          <div>
            <h1>Salary Range</h1>
            <div>
              {salaryRangesList.map(eachSalary => (
                <div key={eachSalary.salaryRangeId} className="types-list">
                  <input
                    value={eachSalary.salaryRangeId}
                    type="checkbox"
                    id={eachSalary.salaryRangeId}
                    onChange={this.onMinimumPackageChange}
                  />
                  <label htmlFor={eachSalary.salaryRangeId}>
                    {eachSalary.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="right-section-container">
          <div>
            <input
              type="search"
              value={searchInput}
              placeholder="Search"
              onChange={this.onSearchInputChange}
            />
            <button
              type="button"
              data-testid="searchButton"
              onClick={this.onSearch}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>

          <div className="jobs-container">{jobsContent}</div>
        </div>
      </div>
    )
  }
}

export default Jobs
