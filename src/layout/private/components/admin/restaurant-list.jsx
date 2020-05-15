import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { updateData, deleteData } from '../../../../services/api.service';
import Container from 'react-bootstrap/Container';

const RestaurantList = ({restaurants,refresh,triggerRefresh}) => {

    const updateRestaurant = (id,name,address) => {
        updateData('restaurant',id,{name: name, address: address}).then(() => triggerRefresh(refresh + 'a'));
    }

    const deleteRestaurant = (id) => {
        deleteData('restaurant',id).then(() => triggerRefresh(refresh + 'a'));
    }

    return(
        <>
        {restaurants.map(el => {
            return(
                <Container key={el.id}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl defaultValue={el.name} onChange={(e) => el.name = e.target.value} />
                    <InputGroup.Prepend>
                        <InputGroup.Text>Address</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl defaultValue={el.address} onChange={(e) => el.address = e.target.value} />
                    <Button variant="outline-secondary" onClick={() => updateRestaurant(el.id,el.name,el.address)}>Update</Button>
                    <Button variant="outline-secondary" onClick={() => deleteRestaurant(el.id)}>Remove</Button>
                </InputGroup>
                </Container>
            )      
        })}
        </>
    )
}

export default RestaurantList