import React, { useState, useContext } from 'react'
import { UserContext } from '../contexts/userContext'
import { Form, Button, Container } from 'react-bootstrap'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useContext(UserContext)

  const getUser = async () => fetch('/user').then(res => res.json())

  const sendCredentials = (username, password) => {
    const data = { username: username, password: password }

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 200) getUser().then(user => setUser(user))
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }
  return (
    <Container className='justify-content-md-center' fluid='lg'>
      <Form>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          onClick={() => sendCredentials(username, password)}
          variant='primary'
        >
          Login
        </Button>
      </Form>
    </Container>
  )
}

export default Login