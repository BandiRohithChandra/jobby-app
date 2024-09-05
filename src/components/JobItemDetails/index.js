import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobDetailsCard from '../JobDetailsCard'

import './index.css'

class JobItemDetails extends Component {
  state = {jobDetails: null, similarJobs: [], isLoading: true, isError: false}

  componentDidMount() {
    this.getJobItems()
  }

  getJobItems = async () => {
    this.setState({isLoading: true, isError: false})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const jobsData = await response.json()
      const updatedJobData = {
        companyLogoUrl: jobsData.job_details.company_logo_url,
        companyWebsiteUrl: jobsData.job_details.company_website_url,
        employmentType: jobsData.job_details.employment_type,
        id: jobsData.job_details.id,
        jobDescription: jobsData.job_details.job_description,
        skills: jobsData.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: jobsData.job_details.life_at_company.description,
          imageUrl: jobsData.job_details.life_at_company.image_url,
        },
        location: jobsData.job_details.location,
        packagePerAnnum: jobsData.job_details.package_per_annum,
        rating: jobsData.job_details.rating,
      }

      const similarJobsData = jobsData.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobDetails: updatedJobData,
        similarJobs: similarJobsData,
        isLoading: false,
        isError: false,
      })
    } else {
      this.setState({
        isLoading: false,
        isError: true,
      })
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsCardFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="retry-button" onClick={this.getJobItems}>
        Retry
      </button>
    </div>
  )

  renderJobDetailsCard = () => {
    const {jobDetails, similarJobs} = this.state
    return <JobDetailsCard jobDetails={jobDetails} similarJobs={similarJobs} />
  }

  render() {
    const {isLoading, isError} = this.state
    let content

    if (isLoading) {
      content = this.renderLoaderView()
    } else if (isError) {
      content = this.renderJobsCardFailureView()
    } else {
      content = this.renderJobDetailsCard()
    }
    return (
      <div>
        <Header />
        <div>{content}</div>
      </div>
    )
  }
}

export default JobItemDetails
