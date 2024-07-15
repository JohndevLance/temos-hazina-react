import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from '../../../util/Api';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

class TeamDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title : "",
      supervisors : [],
      supervisor : "",
      loading : false
    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    
  }
  componentDidUpdate(prevProps){
    if (this.props.open !== prevProps.open) {
      if(this.props.open){
        this.getSupervisors()
      }
    }
  }
  getSupervisors(){
    console.log(this.props.structure_id)
    const url = 'v1/role/supervisor?structure_id='+this.props.structure_id;
    console.log(url)
    axios.get(url,
      ).then(({data}) => {
        console.log("fetchSupervisors: ", data);
        if (data.success) {
         this.setState({supervisors : data.data})
        } else {
         
        }
      }).catch((error) => {
        console.log(JSON.stringify(error))
        console.log("Error****:", error.message);
      });
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
  saveTeam() {
    this.setState({loading : true})
    const data = {
      name : this.state.title,
      supervisor_id : this.state.supervisor,
      structure_id : this.props.structure_id
    }
    console.log(JSON.stringify(data))
    axios.post('v1/teams',
    JSON.stringify(data)
    ).then(({data}) => {
      console.log("post: ", data);
      this.setState({loading : false})
      if (data.success) {
        this.props.onClose()
      } else {
       
      }
    }).catch( (error) => {
      console.log("Error****:", error.message);
      this.setState({loading : false})
    });                   
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.handleRequestClose}>
          <DialogTitle>Add team</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Team details.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Team"
              type="text"
              fullWidth
              value = {this.state.title}
              onChange={this.handleChange}
            />
            <FormControl className="w-100 mb-2">
                  <InputLabel htmlFor="age-simple">supervisor</InputLabel>
                  <Select
                    value={this.state.supervisor}
                    onChange={(e) => {
                      this.setState({supervisor : e.target.value})
                    }}
                    input={<Input id="supervisor"/>}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {this.state.supervisors.map((supervisor) => {
                      return (
                        <MenuItem value={supervisor.id}>{supervisor.username}</MenuItem>
                      )
                    })}
                    
                  </Select>
                </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => this.props.onClose() } color="secondary">
              Cancel
            </Button>
            {!this.props.edit?
            <Button onClick={ () => this.saveTeam() } color="primary">
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

export default TeamDialog;