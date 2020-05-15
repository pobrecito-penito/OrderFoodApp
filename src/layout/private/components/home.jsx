import React from 'react';
import NavBar from './navbar/navbar';
import Chart from './home/chart';
import Info from './admin/info'
import Container from 'react-bootstrap/Container';

const Home = () => {
    return(
        <>
        <NavBar />
        <h4 style={{display: "flex", justifyContent: "center",
            marginTop: "30px",
            marginBottom: "50px"}}>Welcome, {localStorage.getItem('username')}!</h4>
        <Container style={{display: "grid", gridTemplateColumns: "1fr 1fr", marginLeft: "200px"}}>
            <Info />
            <Chart />
        </Container>

        </>
    )
}

export default Home