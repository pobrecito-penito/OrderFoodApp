import React from 'react';
import Button from '@material-ui/core/Button';

const VoteBtn = ({id,allow,handleVote}) => {
    return(
        <>
        {allow === false ? <Button variant="outlined" disabled>Vote</Button> : 
                <Button onClick={()=>handleVote(id)} variant="outlined" color="primary">Vote</Button>}
        </>
    )
}

export default VoteBtn