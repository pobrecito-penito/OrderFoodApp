import React, { useState, useEffect } from 'react';
import { getData } from '../../../../services/api.service';
import Container from 'react-bootstrap/Container';
import MealTransferList from './meal-transfer-list';
import OrderDialog from './order-dialog';

const ChooseMeals = ({pollId}) => {
    
    const [poll,setPoll] = useState({});

    useEffect(() => {
        getData('poll',pollId).then(res => setPoll(res.data));
    },[])

    //WINNING RESTAURANT
    const findWinningRestaurant = (poll) => {
        if(poll.votes !== [] && poll.votes){
            let max = 0;
             
            poll.votes.forEach(el => {
                if(el.votes >= max){
                    max = el;
                }
            })
      
            return poll.restaurants.find(el => el.id === max.restaurantId);
        } else {
            return "Winning restaurant";
        }
    }

    let restaurantId = findWinningRestaurant(poll).id;
    

    return(
        
        <Container>
            <h3 style={{display: "flex", justifyContent: "center",
                marginTop: "30px",
                marginBottom: "30px"}}>{poll.label} - {findWinningRestaurant(poll).name}</h3>
                <div style={{display: "flex",justifyContent: "center", marginBottom: "10px"}}>
                {localStorage.getItem('role') === 'admin' ? <OrderDialog pollId={pollId} /> : <div></div>}
                </div>  
                <MealTransferList restaurantId={restaurantId} pollId={pollId} />
        </Container>
    )
}

export default ChooseMeals