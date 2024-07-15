import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import axios from '../../../util/Api';
import CloudUpload from '@material-ui/icons/CloudUpload';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

 function Routes(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [userOpen, setUserOpen] = React.useState(false);
  const [usersOpen, setUsersOpen] = React.useState(false);
  const [team, setTeam] = React.useState({});
  const [teamusers, setTeamUsers] = React.useState({});

  
  const handleListItemClick = (route) => {
    const url = 'v1/route/assign/'+route.id+'/'+props.user_id;
    console.log(url)
    axios.get(url,
    ).then(({data}) => {
      console.log("assignRoute: ", data);
      if (data.success) {
       props.onClose()
       props.refresh()
      } else {
       
      }
    }).catch((error) => {
      console.log(JSON.stringify(error))
      console.log("Error****:", error.message);
    });                  
  }
  const { open, targets, user_id, onClose, selectedValue, ...other} = props;
  console.log(targets)
    return (
      <div>
      <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={onClose}
      >
         <div style={modalStyle} className={classes.paper}>
          <table class="table table-striped">
            <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Target</th>
                <th>Lppc</th>
                <th>Coverage</th>
                <th>Strike Rate</th>
            </tr>
            {targets.map(target =>  
              <tr key={(target.id).toString()} >
                <td>{target.start_date}</td>
                <td>{target.end_date}</td>
                <td>{target.target}</td>
                <td>{target.lppc}</td>
                <td>{target.coverage}</td>
                <td>{target.strike_rate}</td>
                
              </tr>
            )}
            
          </table>
        </div>
      </Modal>
      </div>
    );
  }


Routes.propTypes = {
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};
export default Routes;
