import React, { useState, useEffect, useRef, Fragment } from 'react'

import ReactDOM from 'react-dom'
import axios from 'axios'
import './assets/css/app.scss'
import * as SockJs from 'sockjs-client'
import * as Stomp from 'stompjs'

const ChatForum = () => {

  const [messages, setMessages] = useState(['test'])
  const [messageInput, setMessageInput] = useState('')

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
          <p>{message}</p>
        </div>
    ))}

      <textarea id="messageInput" rows='4' cols='50' value={messageInput} onChange={ e => setMessageInput(e.target.value)}>
      </textarea>
      <button onClick={e=> {
        stompClient.send("/app/send/message" , {}, messageInput) 
        setMessageInput('')
        }}>POST</button>
    </>
  )
}

ReactDOM.render(<ChatForum />, document.getElementById('chatForumWidget'))
