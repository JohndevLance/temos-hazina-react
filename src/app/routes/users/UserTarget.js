import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from '../../../util/Api';
import moment from 'moment';
import {DatePicker} from 'material-ui-pickers';
import LinearProgress from '@material-ui/core/LinearProgress';

function UserTarget(props) {
  const [selectedDate, setSelectedDate] = React.useState(moment());
  const [selectedToDate, setSelectedToDate] = React.useState(moment());
  const [target, setTarget] = React.useState("");
  const [lppc, setLppc] = React.useState("");
  const [coverage, setCoverage] = React.useState("");
  const [strike_rate, setStrikeRate] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleDateToChange = (date) => {
    setSelectedToDate(date);
  };
  const handleChange = name => event => {
    setTarget(event.target.value)
  }
  const handleListItemClick = () => {
    setLoading(true)
    const url = 'v1/user_targets';
    const data = { 
      start_date : selectedDate, 
      end_date : selectedToDate, 
      target : target, 
      user_id : props.user_id,
      strike_rate : strike_rate,
      coverage : coverage,
      lppc : lppc, 
      structure_id : props.structure_id
    }
    console.log(JSON.stringify(data))
    axios.post(url,
    JSON.stringify(data)
    ).then(({data}) => {
      setLoading(false)
      console.log("post: ", data);
      if (data.success) {
        props.onClose()
        props.refresh()
      } else {
       
      }
    }).catch(function (error) {
      setLoading(false)
      console.log("Error****:", error.message);
    });               
  }
  const { open, user_id, onClose, ...other} = props;
  console.log(user_id)
  
    return (
        <Dialog open={props.open} onClose={props.onClose}>
          <DialogTitle>Target</DialogTitle>
          <DialogContent>
          {loading&&<LinearProgress color="secondary"/>}
            <DialogContentText>
              Add User Target
            </DialogContentText>
            <div key="date_from" className="picker">
              <DatePicker
                fullWidth
                label="Date From"
                value={selectedDate}
                onChange={handleDateChange}
                animateYearScrolling={false}
                leftArrowIcon={<i className="zmdi zmdi-arrow-back"/>}
                rightArrowIcon={<i className="zmdi zmdi-arrow-forward"/>}
              />
            </div>
            <div key="date_to" className="picker">
              <DatePicker
                fullWidth
                label="Date To"
                value={selectedToDate}
                onChange={handleDateToChange}
                animateYearScrolling={false}
                leftArrowIcon={<i className="zmdi zmdi-arrow-back"/>}
                rightArrowIcon={<i className="zmdi zmdi-arrow-forward"/>}
              />
            </div>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Target Value"
              type="target"
              fullWidth
              value={target}
              onChange={handleChange('target')}
            />
             <TextField
              autoFocus
              margin="dense"
              id="name"
              label="LPPC Value"
              type="text"
              fullWidth
              value={lppc}
              onChange={(event) => {setLppc(event.target.value)}}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Coverage Value"
              type="target"
              fullWidth
              value={coverage}
              onChange={(event) => {setCoverage(event.target.value)}}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Strike Rate Value"
              type="strike_rate"
              fullWidth
              value={strike_rate}
              onChange={(event) => {setStrikeRate(event.target.value)}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => onClose()} color="secondary">
              Cancel
            </Button>
            <Button onClick={() => handleListItemClick()} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
    );
  }

export default UserTarget;