import React from 'react';
import Typography from '@material-ui/core/Typography';

const VotesPerc = ({votesPercentage,refresh}) => {
    console.log(refresh);
    
    return(
        <Typography>{votesPercentage === 'NaN%' ? '0%' : votesPercentage}</Typography>
    )
}

export default VotesPerc