import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import app from './firebase.init';

const auth = getAuth(app)

const FormOfMe = () => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const handelEmailBlur = event => {
        setEmail(event.target.value)
    }

    const handelPasswordBlur = event => {
        setPass(event.target.value)
    }

    const handelSubmitForm = event => {
        createUserWithEmailAndPassword(auth, email, pass)
            .then(result => {
                const user = result.user
                console.log(user)
            })
            .catch((error) => {
                console.error(error)
            })
        event.preventDefault()
    }

    return (
        <div className='w-50 mx-auto'>
            <h2 className='text-primary'>Please Register!!!</h2>
            <Form onSubmit={handelSubmitForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handelEmailBlur} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onBlur={handelPasswordBlur} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default FormOfMe;