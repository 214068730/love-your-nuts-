import React, { useEffect } from 'react'

const Profile = (props) => {
  useEffect(() => {

  }, [])

  return (
    <>
      <img src='https://pbs.twimg.com/profile_images/914451216687681536/KB9O1oqf_400x400.jpg' />
      <br />
      <div> Name: {props.match.params.user}</div>
      <br />
      <div> This is my story: 
        I was a happy health nutter and then BOOM. Went to the doc. Met the nuts guys. They helped me big time. I am still alive</div>
      <br />
      <br />
      <div>
        Click <a href="/private/chat">here </a>to chat with me privately
      </div>
    </>
  )
}

export default Profile
