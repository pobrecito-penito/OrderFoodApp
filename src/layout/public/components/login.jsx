import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./login.css"
import { useHistory } from 'react-router-dom';
import { setToken, setUser, users, state } from '../../../services/auth.service';

const Login = () => {

    const history = useHistory();

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const login = () => {
       let user = users.find(el => el.username === username && el.password === password);
       if(user){
           setToken('your token');
           setUser(user);
           console.log(state.user);
            history.push('/');
       } else {
           alert('Login failed! Try again.');
       }
    }

    return(
        <div className="form">
        <div className="form-container">
        <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" placeholder="Enter username" onInput={(e) => setUsername(e.target.value)} />
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onInput={(e) => setPassword(e.target.value)} />
  </Form.Group>
  <Button onClick={() => login()} variant="primary" type="submit">
    Submit
  </Button>
</Form>
</div>
</div>
    )
}

export default Login