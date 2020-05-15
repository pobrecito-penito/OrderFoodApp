import React, { useState, useEffect } from 'react'
import { findData, createData } from '../../../../services/api.service'
import RestaurantList from './restaurant-list';
import NavBar from '../navbar/navbar';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';


const Restaurants = () => {

    const [refresh,triggerRefresh] = useState('');

    const [restaurants,setRestaurants] = useState([]);
    const [page,setPage] = useState(1);
    let condition = `?$limit=5&$skip=${5*(page-1)}`;
    const [total,setTotal] = useState('');
    useEffect(() => {
        findData('restaurant',condition).then(res => {
            let array = res.data.data;
            setTotal(res.data.total);
            let tmp = [];
            array.forEach(el => {
              if(el.name){
                tmp.push(el);
              }})
            setRestaurants(tmp);
          })
      },[condition,refresh]);
      
      const handlePage = (event,value) => {
        setPage(value);
      }

    //CREATE RESTAURANT
    const [name,setName] = useState('');
    const [address,setAddress] = useState('');

    const addRestaurant = () => {
        if(name !== '' && address !== ''){
            createData('restaurant',{name: name, address: address}).then(() => {
                triggerRefresh(refresh + 'a');
                setName('');
                setAddress('');
            })
        } else {
            alert('Invalid data!');
        }
    }
    
    return(
        <>
        <NavBar />
        <h3 style={{display: "flex", justifyContent: "center",
            marginTop: "30px",
            marginBottom: "30px"}}>All Restaurants</h3>
        <div style={{marginBottom: "20px"}}>
            <Typography>Page: {page}</Typography>
            <Pagination count={Math.ceil(total/5)} page={page} onChange={handlePage}/>
        </div>
        <RestaurantList restaurants={restaurants} refresh={refresh} triggerRefresh={triggerRefresh} />
        <h4 style={{display: "flex", justifyContent: "center",
            marginTop: "30px",
            marginBottom: "30px"}}>Add Restaurant</h4>
            <Container>
                <InputGroup className="mb-3">
                <InputGroup.Prepend>
                        <InputGroup.Text>Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl onChange={(e) => setName(e.target.value)} />
                    <InputGroup.Prepend>
                        <InputGroup.Text>Adress</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl onChange={(e) => setAddress(e.target.value)} />
                    <Button variant="outline-secondary" onClick={() => addRestaurant()}>Add</Button>
                </InputGroup>
            </Container>
        </>
    )
}

export default Restaurants