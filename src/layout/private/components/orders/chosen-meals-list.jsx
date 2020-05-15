import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { createData, findData } from '../../../../services/api.service';

const ChosenMealsList = ({meals,pollId,restaurantId}) => {
    
    let tmp = [];
    let sum = 0;
    
    meals.forEach(el => {
        let object = {
            mealId: el.id,
            note: '',
            quantity: 1,
            price: el.price
        }
        sum += el.price;
        tmp.push(object);
    })
    const [objects,setObjects] = useState(tmp);
    const [total,setTotal] = useState(sum);
    console.log(objects);
    console.log(total);
    useEffect(() => {
        
    },[])
    //HANDLE TOTAL 
    
    const handleTotal = (meal,object,value) => {
        console.log(object.quantity);
        console.log(value);

        if(value > object.quantity){
            setTotal(total + meal.price * (value - object.quantity));  
            object.quantity = value; 
        } else if(value < object.quantity){
            setTotal(total - meal.price * (object.quantity - value));
            object.quantity = value; 
        }
    }
    console.log(total);

    const createOrderItem = () => {
        findData('order','').then(res => {
            let orders = res.data.data;
            let order = orders.find(el => {
                if(el.pollId){
                   return el.pollId === pollId;
                }
            });
            
            if(order){
                findData('order-item','').then(res => {
                    let orderItems = res.data.data;
                    let theOrderItems = [];
                    orderItems.forEach(el => {
                        if(el.orderId === order.id){
                            theOrderItems.push(el);
                        }
                    })
                    theOrderItems.forEach(el => {
                        if(el.user === localStorage.getItem('username')){
                            alert("You already added to shopping cart!");
                        } else {
                            meals.forEach(el => {
                                let object = objects.find(element => element.mealId === el.id);
                                let orderItem = {
                                    note: object.note,
                                    quantity: object.quantity,
                                    mealId: object.mealId,
                                    orderId: order.id,
                                    user: localStorage.getItem('username')
                                }
                                createData('order-item',orderItem);
                            })  
                        }
                    })
                })
            } else {
                createData('order',{date: Date.now(), pollId: pollId, restaurantId: restaurantId}).then(res => {
                    let orderId = res.data.id;
                    meals.forEach(el => {
                        let object = objects.find(element => element.mealId === el.id);
                        let orderItem = {
                            note: object.note,
                            quantity: object.quantity,
                            mealId: object.mealId,
                            meal: el.title,
                            orderId: orderId,
                            user: localStorage.getItem('username')
                        }
                        createData('order-item',orderItem);
                    })  
                })
            }
        })
    }

    return(
        <Container style={{display: "grid", justifyContent: "spaceEvenly", width:"70%"}}>
        <List dense>
        {meals.map(el => {
          const labelId = `checkbox-list-secondary-label-${el.id}`;
            return(
                <ListItem key={el.id} button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar`}
                      src={`data:image/jpeg;base64,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`}
                    />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={el.title} />
                  <ListItemText id={labelId} primary={el.description} />
                  <ListItemText id={labelId} primary={el.price + ' din'} />
                    <FormControl style={{width: "60px"}} type="number" step={1} defaultValue={'1'} onChange={(e) => {
                        handleTotal(el,objects.find(element => element.mealId === el.id),parseInt(e.target.value)) }} />
                    <FormControl style={{width: "150px"}} placeholder={'Note'} onChange={(e) => objects.find(element => element.mealId === el.id).note = e.target.value} />
                </ListItem>
              );
            })}
          </List>
          <ListItemText style={{justifySelf: "center"}} primary={`Total: ${total} din`} />
          <IconButton onClick={() => createOrderItem()} style={{width: "100px", justifySelf: "center"}} color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
            </IconButton>
          </Container>
    )
}

export default ChosenMealsList