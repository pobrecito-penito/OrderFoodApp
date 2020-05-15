import React, { useEffect, useState } from 'react';
import { findData } from '../../../../services/api.service';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from 'react-bootstrap/Container';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
}));




const InactivePolls = () => {

    const classes = useStyles();

    const [inactivePolls,setInactivePolls] = useState([]);

    const [limit,setLimit] = useState(100);
    useEffect(() => {
        findData('poll',`?$limit=${limit}`).then(res => {
            if(res.data.total > limit){
                setLimit(limit + 100);          
            } else {
                let array = res.data.data;
                let tmp = [];
                array.forEach(el => {
                if(el.label && el.date && el.restaurants && el.votes && el.active === false){
                    tmp.push(el);
                    }})
                setInactivePolls(tmp);
            } 
        })
    },[limit]);  
    
    const findWinningRestaurant = (poll) => {
        if(poll.votes !== [] && poll.votes){
            let max = 0;
            poll.votes.forEach(el => {
                if(el.votes >= max){
                    max = el;
                }
            })
            return poll.restaurants.find(el => el.id === max.restaurantId).name;
        }
    }

    return(
        <>
        <h3 style={{display: "flex", justifyContent: "center",
            marginTop: "30px",
            marginBottom: "30px"}}>Orders</h3>
        <Container>
        <Grid container spacing={3}>
        {inactivePolls.map(el => {
            return(
                <Grid  key={el.id} item xs={4}>
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} style={{width: "70%"}} alt="complex" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEX///8AAABhYWGWlpalpaVKSkqampr7+/tRUVHc3Nzt7e319fWZmZmhoaGpqang4ODBwcHHx8fPz8+wsLC5ublCQkJbW1uBgYEaGhrMzMzx8fEpKSmNjY1oaGh6enre3t45OTkQEBAtLS09PT1tbW0hISEXFxeIiIh9fX10dHRGRkYrKyvgDYoBAAAMyklEQVR4nO2daXuyOhCGsWpBrVpx6aK22M225///v1PfMtl3JoR6+XxrwZAbQjKZTIYsYzWavlWHXiod7ovj7SSLp0n/PRkco81DLMBdajSiahSDb9SJ5wfa4QMuUzMJWufIgDepiSRtcXucrj3Bk14wAUdsycWxn0q7txemIntEwntSarVCLDZE8zuKiFcXOkws0coM1+OQVAert5mQEqMMQ/56g/r0kQokj3COVGBj7aFGSOUdOtREa0GVcN5E6EhfUUrD0W1dpyuU0qZ1aQuU0pAEJiRKYV+/ZR1QCsPSNWbXUGE2CCyVmA3rgNsz4whGMJTery7rGqMsNOV1rQYYhV0Ik+hC6KXGhI/zh9VsNhA0W96OxsFldodwPnujUy+FvneLoAlCRwgfPj9MdKBi5u+Q6AJhPnDC+9Xed16WnjD3da4WpV/5qQmvdSAGDX1szMSEo/8CAHtehmFawnDv/4vz8JGScDIUql3tVuU4lzUZLQZ74VznSXtCwjlf46cHy3A3H1TcDxxbajrCkq3ty9JpNB99sT/6crpOMsIFU9X3W+dLjJ+Y3zm5slMRsk/wxusiI6atvjmcn4hwzDRQb6O6T398tJ+dhpD6xntPAddhGoDdN5GGkA4TYdcd01nIs+3cJITUUgv1ROdk7ezDemoCwnljwJ96b6GMO9uZCQjXULlZg2s5L3MlIFxB1bgRe1icNKyfal78/gkdySv/50lktdmySpKAEGq2NdQjF4qq/+RGTlgl6ZnthfYJB1Axrhd0I+RLhh7ZHIjQPuGhPosfrEMISY9lXJJonZC8hcZ6OBGS6eXQdMHWCb/rkwRjJIgQzjKunLVNCAapuMYY0NNk9CGaYtfaJpxq6uo/WpwE92ub6dU2ITTSR4zrZdnG3kxbJnysTykwLpfRfstQ/ZYJYWbfxF5jBbabYWG9ZULoGtAiitbqjotRy4Qba4U8BbdM7yhomdDeqDwFAUH6kPV2CeFqeNEa9kiLdgnBkny9QpPzXW2H8LkXS/qZfruEI10FG0vvOT0XQn3fdS6tVO/gTzNa4KsrfSm/4ISojf6Src8Pj8UQXXuT3zV5pEJ0XQi91GlClAlbpwnfpIhAm2arkbj23mnCMBV8gMEZEv5ox0QLnichuwhoJZyvizga2ucWTURsQithSsu7kV4m507Y2+bnTthbd59wkCliAo2alFMms8DuDxCGaEEZ52kJ9dOnpnYp+Lr+rVJaCecFnpON00a/vtbY8iZ7icuOj/jhcwtYL9ufLSEJM8zPlTCD1AULO+F4t9RFMD0upv3+Sn/02nw0qicKXPV9x770SbFOtCRhsZ+qoy/Go1XUvvSkOojuzXm0EDu+ktt1IS7blFvj0d/fxvUI191p5T4eVtwGrWmP1ys36RTz3fAJdeC3cQnrqOQPjxH/g4lUYFKQ1Hp3PnqEf8YlhIBYL5uGvFAyQo8J1fhUHDyQ3xLALhLCUj63g8LzKLMzoYuEvek4y8vvnkaD09FX3VHpt/rwFSBssh8f3naHET8vxb1OjsD/jpp+ayXEkJtN86T+sblZjo1HjbEr7ROquxZjx3Nw7Ja6QqjYdXjPtLKjfFQ1PBB9WPbcpCCUhnjeABD3zb4azYPKtrs7CWFWssnUZCPObKZtTb/tCiFraisNcXIH7rzN9K4QnqY8s5upYUIUflRNeHUTnMDvehNE2JYw1g89RvwEatdqS6G2CeefMZyJJpuzZcIH//7LSZGjoD0IIwGadjK2S/hX49oC54eo6soMeK6oG47ixpe6E04UdcNRxJUZL0LS06CF74GJ2pWehqxUhScn0xSon+a3TAjZvrHST8OL/a4/pWVC8iIifbQANr4bpoltW21kQRWlnX45lCYTjsvVcjaYLVelayW87FKoE8bmLuK2M2Vx4QnLm6LHqui75EbzmltQh+DUg0WlZ5KbwdggGMJS6arrfVlfGS9CxqlwGDTI9/iwoQUZ7xUhvOUcPJzeLdNjv/khN714CRwG12wh5g2pjn4aI6PnDBj7+xCWbzu4eqJeDC+k7xx/hgpYWbKEufvaPtEIaV4FBFn3THt4E+91/YK/n2auXTbzlX0clwg314vnySky73nRL4RjmpYa4olaeqQs1evJYVs/T/gkMjzwa2FqCz7M17YS75+v7ndOgw1DqBkUZgemVKVTK9SbOClnd/sw59rX9cp1LKWE+mGTXe5RPUVCWN+LbmWdB8LCtEj1yDQoxWIBIayNhpAkc/EEcXeWvGLMY5RvBSGsg02rKDUNFQxNNgubpqpcS8cIISzQos3gMQTzNWu3Sx2B0gtLCCHBQYSPuQULsqlU9lMpoviICCGZwSNln8EQPEKX7o/YWqKhRAhJQhys9DPNRSrtNOEmcRDCjJESkrfVlsywLZGd1Y73HFbXhc6GEmZkhd0lO2x8QcdgSa54S9478iryPS9DSF9W03SrJc2pG8B4w2+ZYFBwsvDrIAwhGy1ZDUYxP+Zq0fiWzQBumkOeHvQ91BS63p4yxOffH3zObQfdOyUx1UftucjURn9bMkGEqQZnpHOEE+NnOJT6tvdzzZblTPcQXlVABHcn1zVxhNlE79LS6s6Wr3xtL6MZIM1dBZfSE2b5RrpGs1pkzVbHTV0eBSQJNKeKnwmEYd40c1MN59ubejsGkKR5hWbKznIlwmwiB0naZWqqoZ+J+DCPg/REJgVq/R92eUwm/GGcBTgp9E11bP+xUsZVPDVgVle8shCeNF/MrNFy/ErCWttUYXAbXisKqY9t6DHYhmJyqGgAIQ6ZzZqnI3TSmH/WOoMWhot71cH62FT+l+RXGpNXQQdIHNbMC9yI8OdSvGNR01ShE1f4wsR0rhntLsRVpUdiU2sByXSEmQI2JBT7EfWXgKBGilUKBSE8cqGjmXxA0mE9IJkgMdVoTJiN+SFU2auCrSQv9ikIYdbEEz7+K+OEaAAkv2UGxOaEP5c8cIyKpgp5wOWdhoZnyI32YFAOjYBk+Y/JN45BKDZV2QDQJ342vIdsuvYxed8ZG1CRChzwGWcNDqHUq4pNFawIyR2rIFSFPueK6YlqfRv6UsyeBmRuqmTUF+0wBSGMFnzidwlRmcwdezzkxTfVV75BwqgvZspWEdbLd4J7RrCz1BEK9e6yivkXIqHRACCTROE3KsK9+lTuKWpCMOqj7LcpMAl/hiO9AWDJWM8SQs8rTp2YG6gBhK6UfYVxCbmvHfW4XhV6uYo/X0UIz1tyvxNEXRANWMrsUIpNqDcADsonoyIkM0qp8I0ZUPlDdEKpqUKzVI/6SkJ4EeXu8kq+R4ygnXCfiIlAKDXVXwNDPeorCaGmCmd3OVjqJ/4QQ8E94yiE6qaqHPWVhKS1+Xmmwezmc6rHIZQMgFNTVY76akK4GZXXNcFRyC9VxSIUDYD1M81pxI76akLivfbZtEb2r06U/w4n0UpsqspRX01Io0/dl6Tn9EKcIhL+vBi8D/0WxjNm1NcQkhZtCe1jCjqoH2FcQrFXhWGkYiqmJqQ/dP1QAbEGxIX8yIRiU61F+0gdIXELGKIOWZEY9Eo8EptQMgD+iY76WkK6nuMS4kNX46Q5dnxCsany9dASMtl7rA01pyk55M63DUJFUyVNT09IE+b13s07v8sDOVPxEd5WCBVNFTo8A2HGpDYwRfkwrnfVxwZbIpSaKhCZCCdM9sqDbrvwgClUGVTdGqHYVOv/mgg5xN7HTK7/hMvDoY4ab4+Qy7ZJfIVGwizn14/3S8bEyedL/p5pwm7aJOSaquYzdKLEz7IfXve7fr9/vJKizXXjZruETFN1eoYZ/56ZpN3W3zIhsVXB3rQSZnNt/ilGG72F3jrhb1MdglPaTugQWnAwfa81AWGWl9S0ciFUWkWMzPs2UhCyciPMspUuXmto/t7u3yH86aSm8upMMbPPkP8OYXba5LH8rDEPm7ul9AULpf4UYZAuhLF1IWyuC2FsXQib60IYWxfC5roQxtaFsLkuhLEFhDfe3ztyFFn/SE0YXxfCC+GF8EJ4Ifz7hHvv7+G6fjb3qiOETVPc6TXtCOH5W23nTyjuUsBTars0q8NQjvYzA1VHgSo3P7ai+rNt+q/LNVUd0vcd7QI2abaP4KkuP10CLOgIbAudoYKo+CafyGgmiEFUBWxhCELHENLmhuo+6k2GYJVtlNLdRKIQYtxlEqUabzSyi2azd/u6jo9IIiZjkpvootsWmnwiTyWaTjZxskQa0f/qlNHHTfmKxqemfAtP4r4NUhyDP+3E6sjt9kzYkf4KM3OvSrHGWg+5BiCGCfv1DhJ2Fm1WiO92E438k3C5aZv8HSQSP52Io3jekQDlO+zn+N5POtCrNJp9Fu/2mjtoW9wtn7my/wehT7NEgsxcJgAAAABJRU5ErkJggg==" />
                                </ButtonBase>
                        </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography style={{margin: "1em 0 0.5em 0",
                                                            color: "#343434",
                                                            fontWeight: "normal",
                                                            fontFamily: "'Ultra', sans-serif",   
                                                            fontSize: "20px",
                                                            lineHeight: "42px",
                                                            textTransform: "uppercase",
                                                            textShadow: "0 1px gray, 0 2px #777"}} gutterBottom variant="subtitle1">
                                            {el.label}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {findWinningRestaurant(el)}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {el.date}
                                        </Typography>
                                    </Grid>
                                    <Grid item style={{ border: "0.1px outset", width: "fit-content" }}>
                                        <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                            <Link style={{textDecoration: "none", color: "black"}} to={`/order/${el.id}`}>Order Now</Link>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            </Grid>
                        </Paper>
                        </div>
                        </Grid>
            )
        })}
        </Grid>
        </Container>
        </>
    )
} 

export default InactivePolls