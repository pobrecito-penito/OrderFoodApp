import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { state } from '../../../../services/auth.service';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{height: "fit-content"}} >
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="https://media-exp1.licdn.com/dms/image/C4E1BAQE_eM7tSAX0TQ/company-background_10000/0?e=2159024400&v=beta&t=lARYxxY2gMwAjTFjBB6sRLKykaj_EZV-GgVrHsRm_Bc"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography style={{display: "flex", justifyContent: "center"}} gutterBottom variant="h5" component="h2">
            {state.company.name}
          </Typography>
          <Typography style={{display: "flex", justifyContent: "center"}} variant="body2" color="textSecondary" component="p">
            Address: {state.company.address}
          </Typography>
          <Typography style={{display: "flex", justifyContent: "center"}} variant="body2" color="textSecondary" component="p">
            Email Address: {state.company.email}
          </Typography>
          <Typography style={{display: "flex", justifyContent: "center"}} variant="body2" color="textSecondary" component="p">
            Phone: {state.company.phone}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{display: "flex", justifyContent: "center"}}>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
