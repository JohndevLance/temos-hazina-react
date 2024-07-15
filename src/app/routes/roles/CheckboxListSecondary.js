import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import { Badge } from "reactstrap";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import axios from 'util/Api'

class CheckBoxListControl extends Component {

  render() {
    const {permissions} = this.props;
    return (
      <List>
        {permissions ? permissions.map(permission =>
          <ListItem button key={permission.id} onClick={event => this.props.handlePermissionToggle(event, permission.id)}>
            <ListItemText className="br-break" primary={permission.name} />
            <Badge className="mr-4 mt-2 text-uppercase" color="success" pill>Permission</Badge>
            <ListItemSecondaryAction>
              <Checkbox color="primary"
                        checked={this.props.checked.indexOf(permission.id) !== -1}
                        onClick={event => this.props.handlePermissionToggle(event, permission.id)}
              />
            </ListItemSecondaryAction>
          </ListItem>,
        ) : null}
      </List>
    );
  }
}

export default CheckBoxListControl;