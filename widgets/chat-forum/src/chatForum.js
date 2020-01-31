import React, { useState, useEffect, useRef, Fragment } from 'react'

import './assets/css/app.scss'
import * as SockJs from 'sockjs-client'
import * as Stomp from 'stompjs'

const ChatForum = () => {

  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')
  const [currentUser, setCurrentUser] = useState('Anon')

  const sock = new SockJs('http://192.168.0.126:8080/socket')
  const stompClient = Stomp.over(sock)

  useEffect(()=> {
    stompClient.connect({}, function(frame) {
      stompClient.subscribe("/chat", (message) => {
        if(message.body) {
          messages.push(message.body)
          setMessages([...messages])
        }
      })
    })
  }, [])

  return (
    <> 
    {messages.map((message, index) => (
        <div key={index}>
          <p><a href={`/profiles/${message.slice(0, message.indexOf(':'))}`}>{message.slice(0, message.indexOf(':'))}</a> {message.slice(message.indexOf(':'))}</p>
        </div>
    ))}

      <textarea id="messageInput" rows='4' cols='50' value={messageInput} onChange={ e => setMessageInput(e.target.value)}>
      </textarea>
      <button onClick={e=> {
        stompClient.send("/app/send/message" , {}, `${currentUser}:  ${messageInput}`) 
        setMessageInput('')
        }}>POST</button>
        <br/>
        <input type='text' value={currentUser} onChange={e => setCurrentUser(e.target.value)}/>
    </>
  )
}

export default ChatForum
