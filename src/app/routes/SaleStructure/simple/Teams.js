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
import axios from '../../../../util/Api';
import CloudUpload from '@material-ui/icons/CloudUpload';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AttachUserTeam from './AttachUserTeam';
import ListTeamUsers from './ListTeamUsers';

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

 function Teams(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [userOpen, setUserOpen] = React.useState(false);
  const [usersOpen, setUsersOpen] = React.useState(false);
  const [team, setTeam] = React.useState({});
  const [teamusers, setTeamUsers] = React.useState({});

  const handleRequestClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  const onAttachUserClose = () => {
    setUserOpen(false)
  }
  const handleListItemClick = value => {
    setUserOpen(true)
    setTeam(value)
    // props.onClose(value);
    // this.props.attachRep(value, this.props.structure_id)
  };
  const handleViewUsers = value => {
    getUsers(value)
  }
  const onViewUsersClose = () => {
    setUsersOpen(false)
  }
  const getUsers = (value) => {
    axios.get('v1/team/users?team_id='+value.id,
    ).then(({data}) => {
      console.log("fetchTeamUsers: ", data);
      if (data.success) {
       setTeamUsers(data.data)
       setUsersOpen(true)
      } else {
       
      }
    }).catch((error) => {
      console.log(JSON.stringify(error))
      console.log("Error****:", error.message);
    });                  
  }
  const { open, teams, users, onClose, selectedValue, ...other} = props;
  console.log(teamusers)
    return (
      <div>
      <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={onClose}
      >
         <div style={modalStyle} className={classes.paper}>
          <List>
            {teams.map(team =>
              <ListItem key={(team.id).toString()} dense >
                <ListItemAvatar>
                  <Avatar alt="sales rep" src={team.image}/>
                </ListItemAvatar>
                <ListItemText primary={team.name}/>
                <button className="btn btn-primary" type="button" onClick={() => handleListItemClick(team)}>
                  <AttachmentIcon/>
                  Attach User
                </button>
                <button className="btn btn-secondary" type="button" onClick={() => handleViewUsers(team)} >
                  <AttachmentIcon/>
                  View Users
                </button>
              </ListItem>
            )}
            {/* <ListItem button onClick={() => this.handleListItemClick('addAccount')}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add Account"/>
            </ListItem> */}
          </List>
        </div>
      </Modal>
      <AttachUserTeam users={props.users}
      open={userOpen}
      onClose={onAttachUserClose}
      structure_id = {props.structure_id}
      team={team}
      />
      {usersOpen&&<ListTeamUsers
      open={usersOpen}
      onClose={onViewUsersClose}
      structure_id = {props.structure_id}
      team={team}
      teamusers={teamusers}
      />}
      </div>
    );
  }


Teams.propTypes = {
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};
export default Teams;
