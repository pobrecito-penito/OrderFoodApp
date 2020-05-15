import React, { useState, useEffect } from 'react';
import {Pie} from 'react-chartjs-2';
import { findData } from '../../../../services/api.service.js';
import { users } from '../../../../services/auth.service.js';
import Container from 'react-bootstrap/Container';

const Chart = () => {
    
    const [userData,setUserData] = useState([]);

    useEffect(() => {
        findData('order-item','').then(res => {
            let item = res.data.data;
            
            let usernames = []; 
            
            users.map(el => {
                let user = {
                    name: el.username,
                    expenses: 0
                }
                return usernames.push(user);
            });

            usernames.forEach(el => {
                item.forEach(element => {
                    if(el.name === element.user && element.price && element.quantity){
                        el.expenses += element.price * element.quantity;
                    }
                })
            })

            setUserData(usernames)
        })
    },[])
    
    const data = {
        labels: userData.map(el => el.name),
        datasets: [{
            data: userData.map(el => el.expenses),
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
        }]
    };

  
    return (
      <Container >
        <h4 style={{display: "flex", justifyContent: "center"}}>Expenses per User</h4>
        <Pie data={data} />
        </Container>
    );
  
}

export default Chart