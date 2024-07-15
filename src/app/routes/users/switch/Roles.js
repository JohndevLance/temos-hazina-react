import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';

class SwitchListSecondary extends Component {
  state = {
    checked: ['wifi'],
  };

  handleToggle = (event, value) => {
    const {checked} = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    return (
      <List subheader={<ListSubheader className="position-static">Roles</ListSubheader>}>
        {this.props.data.map((role, index) => {
          return <ListItem key={index.toString()}>
          <ListItemIcon>
            <i className="zmdi zmdi-label-alt zmdi-hc-fw zmdi-hc-2x"/>
          </ListItemIcon>
          <ListItemText primary={role.name}/>
          <ListItemSecondaryAction>
            <Switch color="primary"
                    onClick={event => this.props.handleRoleToggle(event, role.name)}
                    checked={this.props.checked.indexOf(role.name) !== -1}
            />
          </ListItemSecondaryAction>
        </ListItem>
        })}
        
      </List>
    );
  }
}


export default SwitchListSecondary;