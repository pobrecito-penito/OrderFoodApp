import React, { useState, useEffect } from 'react';
import { findData, getData, updateData, deleteData } from '../../../../services/api.service';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Container from 'react-bootstrap/Container';
import VoteList from './vote-list';
import EndPollBtn from './end-poll';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));



const ActivePolls = () => {

    // RESTART API
    // for(let i = 0; i <= 200; i++){
    //     findData('poll',`/${i}`).then(res => {
    //         console.log(res);
    //         if(!res.data.label || !res.data.restaurants){
    //             deleteData('poll',i);
    //         }
    //     }).catch(err => {
    //         if(err){
    //             deleteData('poll',i);
    //         }
    //     }
    //     )
    // }

    const [activePolls,setActivePolls] = useState([]);
    const [refresh,setRefresh] = useState('');

    const [limit,setLimit] = useState(100);
    useEffect(() => {
        findData('poll',`?$limit=${limit}`).then(res => {
            if(res.data.total > limit){
                setLimit(limit + 100);          
            } else {
                let array = res.data.data;
                let tmp = [];
                array.forEach(el => {
                if(el.label && el.date && el.restaurants && el.votes && el.active === true){
                    tmp.push(el);
                    }})
                setActivePolls(tmp);
            } 
        })
    },[limit,refresh]);   


    //CHECK VOTE PERMISSION

    const [allow,setAllow] = useState(true);

    const checkVotePermission = (id) => {
        let tmp = [];
        getData('poll',id).then(res => {
            let votes = res.data.votes;
            console.log(votes);
            votes.forEach(el => {
                if(el.userIds){
                    el.userIds.forEach(el => {
                        if(el === localStorage.getItem('id')){
                            tmp.push(el);
                        } 
                    })
                }
            })
            
            if(tmp.length >= 2){
                setAllow(false);
                console.log(`YOU CAN'T VOTE!!!`);
                console.log(allow);
                console.log(tmp);
                return
            } else {
                console.log(allow);
                setAllow(true);
            }
        })  
    }

    //END POLL
    const endPoll = (pollId) => {
        getData('poll',pollId).then(res => {
            let poll = res.data;
            updateData('poll',poll.id,{label: poll.label, date: poll.date, active: false, restaurants: poll.restaurants.map(el => el.id), votes: poll.votes.map(el => el.id)}).then(() => setRefresh(refresh + 'a'));
        })
    }

    //EXPANSION PANEL
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (id) => (event, isExpanded) => {
        setExpanded(isExpanded ? id : false);
        checkVotePermission(id);
    };

    return(
        <>
        <h3 style={{display: "flex", justifyContent: "center",
            marginTop: "30px",
            marginBottom: "30px"}}>Active Polls</h3>
        {activePolls.map(el => {
            let poll = {
                id: el.id,
                label: el.label,
                date: el.date,
                restaurants: el.restaurants,
                votes: el.votes,
                active: el.active
            }
            return(
                <Container key={el.id}>
                    <ExpansionPanel expanded={expanded === el.id} onChange={handleChange(el.id)}>
                        <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >
                            <Typography style={{fontSize: "x-large"}} className={classes.heading}>{el.label}</Typography>
                            <Typography className={classes.secondaryHeading}>{el.date}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <VoteList restaurants={el.restaurants} allow={allow} setAllow={setAllow} pollId={el.id} votes={el.votes} checkVotePermission={checkVotePermission} poll={poll} />
                        </ExpansionPanelDetails>  
                        <Container style={{display: "flex", justifyContent: "center"}}>
                            <EndPollBtn handleClick={endPoll} pollId={el.id} />
                        </Container>
                    </ExpansionPanel>
                </Container>
                    )
                })}
        </>
    )
}

export default ActivePolls