import './index.css'

const JobDetailsCard = props => {
  const {jobDetails, similarJobs} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    skills,
    lifeAtCompany,
    packagePerAnnum,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <div>
      <div className="details-container">
        <div className="logo-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />

          <div>
            <h1>{title}</h1>
            <p>{rating}</p>
          </div>
        </div>
        <div className="location-container">
          <div>
            <p>{location}</p>
            <p>{employmentType}</p>
          </div>

          <div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>

        <hr />

        <div className="button-container">
          <h1>Description</h1>
          <button type="button" className="visit-button">
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Visit{' '}
            </a>
          </button>
        </div>

        <p>{jobDescription}</p>

        <div>
          <h1>Skills</h1>

          <ul className="job-skills">
            {skills.map(eachSkill => (
              <li key={eachSkill.name} className="skills-container">
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="skill"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="life-at-company-container">
          <div>
            <h1>Life at Company</h1>

            <p>{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="lifeAtCompany"
            />
          </div>
        </div>
      </div>

      <div>
        <h1>Similar Jobs</h1>

        <ul>
          {similarJobs.map(eachJob => (
            <li key={eachJob.id} className="list-container">
              <div className="logo-container">
                <img
                  src={eachJob.companyLogoUrl}
                  alt="similar job company logo"
                  className="company-logo"
                />

                <div>
                  <h1>{eachJob.title}</h1>
                  <p>{eachJob.rating}</p>
                </div>
              </div>

              <h1>Description</h1>
              <p>{eachJob.jobDescription}</p>
              <div className="eachJob-container">
                <p>{eachJob.location}</p>
                <p>{eachJob.employmentType}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default JobDetailsCard
