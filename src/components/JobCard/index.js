import './index.css'

const JobCard = props => {
  const {jobs} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobs
  return (
    <li className="jobs-container">
      <div className="first-section">
        <img
          src={companyLogoUrl}
          alt="company logo"
          className=" company-logo"
        />
        <div>
          <h1 className="spaces">{title}</h1>
          <p className="spaces">{rating}</p>
        </div>
      </div>

      <div className="second-section">
        <div className="second-part-section">
          <p className="spaces">{location}</p>
          <p className="spaces">{employmentType}</p>
        </div>
        <div>
          <p>{packagePerAnnum}</p>
        </div>
      </div>

      <hr className="line" />

      <h1>Description</h1>
      <p>{jobDescription}</p>
    </li>
  )
}

export default JobCard
