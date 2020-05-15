import React from 'react'
import { Link } from "react-router-dom";
import NavBar from '../navbar/navbar';
import './links.css' ;
import Container from 'react-bootstrap/Container';

const Admin = () => {
    return(
        <>
        <NavBar />
        <h4 style={{display: "flex", justifyContent: "center",
            marginTop: "30px",
            marginBottom: "150px"}}>Admin</h4>
        <Container style={{display: "flex", justifyContent:"center"}}>
            <Link className='link' to='manage-rest'>Restaurants</Link>
            <Link className='link' to='create-poll'>Create Poll</Link>
            <Link className='link' to='settings'>Settings</Link>
        </Container>
        </>
    )
}

export default Admin