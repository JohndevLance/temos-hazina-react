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

class ListTeamUsers extends Component {
  state = {
      users : [],
      loading : false
  }
  componentDidMount(){
      
  }
  handleRequestClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
    this.attachRep(value)
  };

  render() {
    const {classes, teamusers, onClose, ...other} = this.props;

    return (
      <Dialog onClose={this.handleRequestClose} {...other}>
        <DialogTitle>Select sales attached to this team</DialogTitle>
        <div>
        <List>
            <ListItem>
            <ListItemText primary=""/>
            <ListItemText primary="User Name"/>
            <ListItemText primary="First Name"/>
            <ListItemText primary="Last Name"/>
         </ListItem>
        </List>
          <List>
            {teamusers.map((userdet) => {
                const user = userdet.user
              return(
              <ListItem key={(user.id).toString()} button onClick={() => this.handleListItemClick(user.id)} key={user.email}>
                <ListItemAvatar>
                  <Avatar alt="sales rep" src={user.image}/>
                </ListItemAvatar>
                <ListItemText primary={user.username}/>
                <ListItemText primary={user.first_name}/>
                <ListItemText primary={user.last_name}/>
              </ListItem>)
              }
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

ListTeamUsers.propTypes = {
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};
export default ListTeamUsers;
