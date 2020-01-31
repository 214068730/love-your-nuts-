import React, { useEffect } from 'react'

const Profile = (props) => {
  useEffect(() => {

  }, [])

  return (
    <>
      <img src='https://pbs.twimg.com/profile_images/914451216687681536/KB9O1oqf_400x400.jpg' />
      <div> Name: {props.match.params.user}</div>
    </>
  )
}

export default Profile
