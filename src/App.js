import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import app from './firebase.init';

const auth = getAuth(app)

function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('')
  const [registered, setRegistered] = useState(false)

  const handelEmailBlur = event => {
    setEmail(event.target.value)
  }

  const handelPasswordBlur = event => {
    setPassword(event.target.value)
  }

  const handelRegisteredChange = event => {
    setRegistered(event.target.checked)
  }

  const handelSubmitForm = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {

      event.stopPropagation();
      return;
    }

    if (!/(?=.*?[0-9])/.test(password)) {
      setError('Please full fill the character')
      return
    }

    setValidated(true);
    setError('')

    if (registered) {

      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user
          console.log(user)
          setEmail('')
          setPassword('')
        })
        .catch(error => {
          console.error(error);
          setError(error.message)
        })
    }

    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user
          console.log(user)
          setEmail('')
          setPassword('')
          verifyEmail()
        })
        .catch(error => {
          console.error(error);
          setError(error.message)
        })
    }


    event.preventDefault()
  }

  const handelResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('sent email successfull')
      })
  }


  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('email verification is sent')
      })
  }

  return (
    <div>
      <div className='w-50 mx-auto'>
        <h2 className='text-primary'>Please {registered ? 'Log In' : 'Register'}!!!</h2>
        <Form noValidate validated={validated} onSubmit={handelSubmitForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handelEmailBlur} type="email" placeholder="Enter email" required />

            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handelPasswordBlur} type="password" placeholder="Password" required />

            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handelRegisteredChange} type="checkbox" label="Already Registered" />
          </Form.Group>

          <p className='text-danger'>{error}</p>
          <Button variant="primary" type="submit">
            {registered ? 'Log In' : 'Registration'}
          </Button>

          <Button onClick={handelResetPassword} variant="danger" type="submit">Forget Password</Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
