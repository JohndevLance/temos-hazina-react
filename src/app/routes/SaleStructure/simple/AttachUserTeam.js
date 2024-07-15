import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import axios from '../../../../util/Api';

class AttachUserTeam extends Component {
  handleRequestClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
    this.attachRep(value)
  };

  attachRep = (value) => {
    const data = {rep_id : value, team_id : this.props.team.id}
    console.log(JSON.stringify(data))
    axios.post('v1/team/attach',
    JSON.stringify(data)
    ).then(({data}) => {
      console.log("post: ", data);
      if (data.success) {
        this.refresh()
      } else {
       
      }
    }).catch(function (error) {
      console.log("Error****:", error.message);
    });                  
  }

  render() {
    const {classes, users, onClose, ...other} = this.props;

    return (
      <Dialog onClose={this.handleRequestClose} {...other}>
        <DialogTitle>Select sales rep to attach</DialogTitle>
        <div>
          <List>
            {users.map(user =>
              <ListItem key={(user.id).toString()} button onClick={() => this.handleListItemClick(user.id)} key={user.email}>
                <ListItemAvatar>
                  <Avatar alt="sales rep" src={user.image}/>
                </ListItemAvatar>
                <ListItemText primary={user.name}/>
              </ListItem>,
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
      </Dialog>
    );
  }
}

AttachUserTeam.propTypes = {
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};
export default AttachUserTeam;
