import React  from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Container from 'react-bootstrap/Container';
import Typography from '@material-ui/core/Typography';
import { getData, createData, updateData } from '../../../../services/api.service';
import Btn from './vote-btn';

const VoteList = ({restaurants,pollId,setAllow,allow,votes,checkVotePermission,poll}) => {

    console.log(`POLL ID: ${pollId}`);
    

    const userId = localStorage.getItem('id');
    
    const handleVote = (restaurantId) => {

            let restaurantIds = restaurants.map(el => el.id);

            // checkVotePermission(pollId);

            getData('poll',pollId).then(res => {
                let votes = res.data.votes;
                console.log(votes);

                if(votes){

                    let vote = votes.find(el => el.pollId === pollId && el.restaurantId === restaurantId);
                    console.log(vote); 

                    let voteIds = votes.map(el => el.id);

                    if(vote){
                        if(vote.userIds){
                            updateData('vote',vote.id,{pollId: vote.pollId, restaurantId: vote.restaurantId, votes: vote.votes + 1, userIds: [...vote.userIds,userId]}).then(() => checkVotePermission(pollId));
                        } else {
                            updateData('vote',vote.id,{pollId: vote.pollId, restaurantId: vote.restaurantId, votes: vote.votes + 1, userIds: [userId]}).then(() => checkVotePermission(pollId));
                        }
                    } else {
                        createData('vote',{pollId: pollId, restaurantId: restaurantId, votes: 1, userIds: [userId]}).then(res => {
                            console.log("create");console.log(res.data.id);
                            updateData('poll',pollId,{label: poll.label, date: poll.date, active: poll.active, restaurants: restaurantIds, votes: [...voteIds,res.data.id]}).then(() => checkVotePermission(pollId));
                        }); 
                    }
                } else {
                    console.log('NO POLL.VOTES');
                    createData('vote',{pollId: pollId, restaurantId: restaurantId, votes: 1, userIds: [userId]}).then(res => {
                        console.log("create");console.log(res.data.id);
                        updateData('poll',pollId,{label: poll.label, date: poll.date, active: poll.active, restaurants: restaurantIds, votes: [res.data.id]}).then(() => checkVotePermission(pollId));
                    }); 
                }
            })
    }

    //VOTES SUM
    let votesSum = 0;
    votes.forEach(el => votesSum += el.votes);

    return(
        <Container>
        <List  dense>
        {restaurants.map(el => {
        //   const labelId = `checkbox-list-secondary-label-${el.id}`;
        let restaurantVotes = votes.filter(element => element.restaurantId === el.id);
        let restaurantVotesSum = 0; 
        restaurantVotes.forEach(el => restaurantVotesSum += el.votes);
        let votesPercentage = ( restaurantVotesSum / votesSum ) * 100 + '%';
        
            return(
                <ListItem key={el.id} button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar`}
                      src={`https://cdn1.iconfinder.com/data/icons/human-profession/1000/Chef-2-512.png`}
                    />
                  </ListItemAvatar>
                  <ListItemText><Typography style={{fontSize: "large"}}>{el.name}</Typography>
                  <Typography>{votesPercentage === 'NaN%' ? '0%' : votesPercentage}</Typography>
                  </ListItemText>
                  <Btn allow={allow} handleVote={handleVote} id={el.id} />
                </ListItem>
              );
            })}
          </List>
          </Container>
    )

}

export default VoteList