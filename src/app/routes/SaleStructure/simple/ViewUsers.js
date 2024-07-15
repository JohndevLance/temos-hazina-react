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

class ViewUsers extends Component {
  state = {
      users : [],
      loading : false
  }
  componentDidMount () {
      
  }
  handleRequestClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
    this.props.attachRep(value, this.props.structure_id)
  };
  getUsers = (value) => {
    axios.get('v1/salesrep/users?structure_id='+this.props.structure_id,
    ).then(({data}) => {
      console.log("fetchSalesUnitUsers: ", data);
      if (data.success) {
       this.setState({users : data.data})
      } else {
       
      }
    }).catch((error) => {
      console.log(JSON.stringify(error))
      console.log("Error****:", error.message);
    });                  
  }
  componentDidUpdate(prevProps){
    if (this.props.open !== prevProps.open) {
      if(this.props.open){
        this.getUsers()
      }
    }
  }
  render() {
    const {classes, users, onClose, selectedValue, ...other} = this.props;

    return (
      <Dialog onClose={this.handleRequestClose} {...other}>
        <DialogTitle>Users on this sales unit</DialogTitle>
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
            {this.state.users.map((user) => {
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

ViewUsers.propTypes = {
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};
export default ViewUsers;
