import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class CategoryDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title : "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };
  handleChange(event) {
    this.setState({title: event.target.value});
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.handleRequestClose}>
          <DialogTitle>Add category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter category.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Category"
              type="text"
              fullWidth
              value = {this.state.title}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => this.props.onClick("cancel", null) } color="secondary">
              Cancel
            </Button>
            {!this.props.edit?
            <Button onClick={ () => this.props.onClick("submit", this.state.title) } color="primary">
              ADD
            </Button> : <Button onClick={ () => this.props.onClick("edit", this.state.title) } color="primary">
              EDIT
            </Button>
            }
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CategoryDialog;