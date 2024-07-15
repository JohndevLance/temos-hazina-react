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


class SimpleDialog extends Component {
  handleRequestClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
    this.props.attachRep(value, this.props.structure_id)
  };

  render() {
    const {classes, users, onClose, selectedValue, ...other} = this.props;

    return (
      <Dialog onClose={this.handleRequestClose} {...other}>
        <DialogTitle>Select sales rep to attach</DialogTitle>
        <div>
          <List>
            {users.map(rep => {
            return (
              <ListItem key={(rep.id).toString()} button onClick={() => this.handleListItemClick(rep.user_id)}>
                <ListItemAvatar>
                  <Avatar alt="sales rep" src={rep.image}/>
                </ListItemAvatar>
                <ListItemText primary={rep.name}/>
              </ListItem>
              )}
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

SimpleDialog.propTypes = {
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};
export default SimpleDialog;
