import React, { useState } from 'react'
import { useWebSocket, WebSocketCallbackType } from '@quicksocket/usewebsocket'

import { authQuickSocket } from '../apis/authQuickSocket'

export default function App() {
  const [url, setUrl] = useState(null)
  const [connected, setConnected] = useState(false)

  const [chat, setChat] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleNameChange = (e) => setName(e.target.value)
  const handleMessageChange = (e) => setMessage(e.target.value)

  const { sendMessage, disconnect } = useWebSocket((type, message) => {
    switch (WebSocketCallbackType[type]) {
      case 'Connected':
        setConnected(true)
        break
      case 'Disconnected':
        setConnected(false)
        break
      case 'Message':
        setChat([JSON.parse(message), ...chat])
        break
    }
  }, url)

  const handleJoin = async () => {
    const connectionToken = await authQuickSocket(name)
    setUrl(`wss://ws.quicksocket.io/?t=${connectionToken}`)
  }

  const handleSend = () => sendMessage(JSON.stringify({ name, message }))

  const chatMessages = chat.map((payload, i) => (
    <p key={i}>
      {payload.name}: {payload.message}
    </p>
  ))

  return (
    <div className="container">
      <div className="chat">{chatMessages}</div>

      {!connected ? (
        <>
          <input placeholder="Name" value={name} onChange={handleNameChange} />
          <button className="connect" onClick={handleJoin}>
            JOIN!
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="message"
            value={message}
            onChange={handleMessageChange}
          />
          <button className="send" onClick={handleSend}>
            SEND!
          </button>
          <button className="disconnect" onClick={disconnect}>
            DISCONNECT!
          </button>
        </>
      )}
    </div>
  )
}
