import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import OrderTable from './order-table';
import { findData, deleteData } from '../../../../services/api.service';
import TableHeader from './excel/table-header';
import ExcelTable from './excel/table-data';
import { ExportCSV } from './excel/export';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function MaxWidthDialog({pollId}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };


  //TABLE DATA

  const [data,setData] = useState([]);
  const [total,setTotal] = useState(0);
  useEffect(() => {
    findData('order','').then(res => {
      let orders = res.data.data;   
      let theOrder = orders.find(el => el.pollId === pollId
      );
      
      if(theOrder){
        findData('order-item','').then(response => {
          let orderItems = response.data.data;
          let theOrderItems = orderItems.filter(el => el.orderId === theOrder.id);
          let array = [];
          let sum = 0;
          theOrderItems.forEach(el => {
            let object = {
              meal: el.meal,
              price: `${el.price } din`,
              quantity: el.quantity,
              user: el.user
            }
            if(el.price && el.quantity){
              sum += el.price * el.quantity;
            }
            array.push(object);            
          })
          setTotal(sum);
          setData(array);
        })
      }
      
    })

  },[])

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Finish Order
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={'xl'}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Your Order</DialogTitle>
        <DialogContent>
          <OrderTable data={data} />
        </DialogContent>
        <DialogContentText style={{display: "flex", justifyContent: "center"}}>Total: {total} din</DialogContentText>
        <DialogActions>
          <ExportCSV cvsData={data} fileName={'order table'} />
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}