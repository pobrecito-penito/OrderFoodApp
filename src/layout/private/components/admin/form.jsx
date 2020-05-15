import React from 'react';
import Form from 'react-bootstrap/Form';
import { state } from '../../../../services/auth.service';
import ImageUpload from './image-uploader';

const InfoForm = () => {


    return (
        <Form style={{width: "300px"}}>
        <Form.Group controlId="formGroupEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" onChange={(e) => state.company.name = e.target.value} placeholder="Enter Company Name" />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" onChange={(e) => state.company.address = e.target.value} placeholder="Enter Company Address" />
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" onChange={(e) => state.company.email = e.target.value} placeholder="Enter Company Email Address" />
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="text" onChange={(e) => state.company.phone = e.target.value} placeholder="Enter Company Phone Number" />
        </Form.Group>
        <ImageUpload />
        </Form>
    )
}

export default InfoForm