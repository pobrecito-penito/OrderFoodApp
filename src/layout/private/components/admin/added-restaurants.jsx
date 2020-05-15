import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

const AddedRestaurants = ({restaurants,setRestaurants,createPoll}) => {

    const removeRestaurant = (restaurant) => {
        let tmp = [...restaurants];
        let index = tmp.findIndex(el => el === restaurant);
        tmp.splice(index,1);
        setRestaurants(tmp);
    }


    return (
      <>
      {restaurants.length === 0 ? <div></div> : 
      <>
        <h5 style={{display: "flex", justifyContent: "center",
            marginTop: "30px",
            marginBottom: "30px"}}>Added:</h5>
            <List  style={{fontSize: "300px"}} dense>
        {restaurants.map(el => {
          const labelId = `checkbox-list-secondary-label-${el.id}`;
            return(
                <ListItem key={el.id} button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar`}
                      src={`https://cdn1.iconfinder.com/data/icons/human-profession/1000/Chef-2-512.png`}
                    />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={el.name} />
                  <IconButton onClick={() => removeRestaurant(el)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              );
            })}
          </List>
          <Button onClick={() => createPoll()} size="large" variant="outlined" color="primary">
              Create Poll
          </Button> </> }
          </>
    )
}

export default AddedRestaurants
