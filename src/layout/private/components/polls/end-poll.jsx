import React from 'react';
import Button from '@material-ui/core/Button';

const EndPollBtn = ({handleClick,pollId}) => {
    return(
        <>
        {localStorage.getItem('role') === 'admin' ? 
        <Button onClick={() => handleClick(pollId)} variant="outlined" color="secondary"> End Poll </Button> :
        <div></div>}
        </>
    )
}

export default EndPollBtn