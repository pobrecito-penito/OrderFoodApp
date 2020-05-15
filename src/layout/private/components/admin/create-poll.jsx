import React, {useState, useEffect} from 'react'
import NavBar from '../navbar/navbar';
import TextField from '@material-ui/core/TextField';
import Container from 'react-bootstrap/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddedRestaurants from './added-restaurants';
import {findData, createData} from '../../../../services/api.service';
import Button from "react-bootstrap/Button";

const CreatePoll = () => {
    
    const [restaurants,setRestaurants] = useState([]);

    const [options,setOptions] = useState([]);
    const [limit,setLimit] = useState(100);
    useEffect(() => {
        findData('restaurant',`?$limit=${limit}`).then(res => {
          let array = res.data.data;
          let tmp = [];
          array.forEach(el => {
            if(el.name){
              tmp.push(el);
            }})
            setRestaurants(tmp);
          if(res.data.total > limit){
            setLimit(limit + 100);          }
        })
    },[limit]);    
  
  const [restaurant,setRestaurant] = useState('');
  
  const filterRestaurants = (value) => {
    if(value !== ''){
      let array = restaurants.filter(el => el.name.toLowerCase().includes(value.toLowerCase()));

      array.forEach(element => {
        let copy = selectedRestaurants.find(el => el === element);
        if(copy){
          let index = array.findIndex(el => el  === copy);
          array.splice(index,1);
        }
      })
    
      if(array.length >= 0 && array.length <= 10){
        setOptions(array);
      } else {
        setOptions([]);
      } 

    } else {
      setOptions([]);
    }
    
  }
  

  const [selectedRestaurants,setSelectedRestaurants] = useState([]);
  
  const addRestaurant = (restaurant) => {
    if(restaurant !== null && restaurant !== ''){
      setSelectedRestaurants([...selectedRestaurants,restaurant]);

      let index = options.findIndex(el => el === restaurant);
      options.splice(index,1);
      }
  }

  //COLLECT DATA AND CREATE POLL

  const [name,setName] = useState('');

  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectDate = (date) => {
    setSelectedDate(date);
  };

  const createPoll = () => {
    let poll = {
      label: name,
      date: selectedDate,
      restaurants: selectedRestaurants.map(el => el.id),
      active: true,
      votes: []
    }
    if(poll.label && poll.date && poll.restaurants && poll.active 
        && poll.label !== '' && poll.date !== '' && poll.restaurants !== []){
      createData('poll',poll);
    } else {
      alert('Invalid data!');
    }
  }

  return(
      <>
      <NavBar />
      <Container style={{display: "grid", justifyContent: "center"}}>
      <TextField onChange={(e) => setName(e.target.value)}
          label="Poll Name"
          id="outlined-size-normal"
          variant="outlined"
          style={{marginTop: "15px"}}
        />
         <form style={{display: 'flex',
    flexWrap: 'wrap', marginTop: "15px"}} noValidate>
      <TextField onChange={(e) => selectDate(e.target.value)}
        id="date"
        label="Date"
        type="date"
        style={{
            width: 300, fontSize: "larger"}}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
      <Autocomplete onChange={(event, value) => setRestaurant(value)} onInputChange={(event, value) => filterRestaurants(value)} options={options}  getOptionLabel={(option) => option.name} id="select-on-focus"
      selectOnFocus noOptionsText='...'
      renderInput={(params) => <TextField {...params} label="Select Restaurant" margin="normal" />} />
      <Button variant="outline-secondary" onClick={() => {addRestaurant(restaurant); setOptions([]);}}>Add</Button>
     <AddedRestaurants restaurants={selectedRestaurants} setRestaurants={setSelectedRestaurants} options={options} setOptions={setOptions} createPoll={createPoll} />
        </Container>
      </>
  )

}

export default CreatePoll