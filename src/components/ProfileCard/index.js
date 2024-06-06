import './index.css'

const ProfileCard = props => {
  const {profileDetails} = props
  const {name, profileImageUrl, shortBio} = profileDetails
  return (
    <div className="profile-container">
      <div>
        <img src={profileImageUrl} alt="profile" className="profile" />
      </div>
      <h1>{name}</h1>
      <p>{shortBio}</p>
    </div>
  )
}

export default ProfileCard
