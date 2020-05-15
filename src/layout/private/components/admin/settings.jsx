import React from 'react';
import NavBar from '../navbar/navbar';
import InfoForm from './form'
import Container from 'react-bootstrap/Container';
import Info from './info';

const Settings = () => {


    return(
        <>
        <NavBar />
        <h4 style={{display: "flex", justifyContent: "center",
            marginTop: "30px",
            marginBottom: "50px"}}>Settings</h4>
        <Container style={{display: "grid", gridTemplateColumns: "1fr 1fr", marginLeft: "230px"}}>
            <InfoForm />
            <Info />
        </Container>
        
        </>
    )
}

export default Settings