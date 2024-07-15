import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CardBox from 'components/CardBox/index';
import IntlMessages from 'util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from 'react-redux';
import {getRoles} from 'actions/roles'
import {getPermissions} from 'actions/permissions';
import axios from 'util/Api';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import Roles from './switch/Roles';
import Permissions from './switch/Permissions';
import LinearProgress from '@material-ui/core/LinearProgress';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const imageref = React.createRef();
class UserDialog extends React.Component {
  state = {
    open: false,
    username : "",
    first_name : "",
    last_name : "",
    email : "",
    phone : "",
    active: true,
    confirmed : false,
    abilities : [],
    location : {},
    mapready : false,
    sendconfemail : false,
    password : "",
    verification_code:"",
    password_confirmation :"",
    roles :[],
    permissions : [],
    loading : false
  };
  notify(type, msg){
    if(type=="success"){
     NotificationManager.success(<IntlMessages id="notification.successMessage"/>); 
    }else if(type=="info"){
      NotificationManager.info(<IntlMessages id="notification.infoMsg"/>);
    }
    else if(type=="warning"){
      NotificationManager.warning(<IntlMessages id="notification.warningMessage"/>, <IntlMessages
            id="notification.closeAfter3000ms"/>, 3000);
    }
    else if(type=="error"){
      NotificationManager.error(msg, "ERROR", 5000, () => {
            
          });
    }
  }
  componentDidMount() {
    this.setState({verification_code: this.randomNumber(1000, 9999)})
  }
  componentDidUpdate(prevProps){
    if (this.props.open !== prevProps.open) {
      if(this.props.open){
        this.props.getRoles()
        this.props.getPermissions()
      }
    }
  }
  randomNumber(min, max){
    const r = Math.random()*(max-min) + min
    return Math.floor(r)
}
  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };
  handleChange = name => event => {
    if(name =="active" ||name=="confirmed"||name=="sendconfemail"){
      this.setState({[name] : !this.state[name]});
    }
    else{
      this.setState({
        [name]: event.target.value,
      });
    }
    
  };
  toggleActiveChecked = () => {
    
  };
  handlePriceListChange =  id => event => {
    var prices = this.state.prices.slice(); // Make a copy of the emails first.
    // prices.push({id : event.target.value}); // Update it with the modified email.
    const index = prices.findIndex((e) => e.id === id);
    event.persist()
    if (index === -1) {
      prices.push({id: id, price: event.target.value});
      this.setState({prices});
    } else {
      this.setState(prevState => {
        const newprices = [...prevState.prices];
        newprices[index].price = event.target.value;
        return {prices: newprices};
    })
    }
    
}
  handleRequestSave = () => {
    if(this.state.loading==true) return;
    if(this.state.password!=this.state.password_confirmation){
      NotificationManager.error("Passwords do not match", "ERROR", 1000, () => {
       
      });
      return;
    }
    this.setState({loading:true})
    var data = {
        "username" : this.state.username,
        "first_name" : this.state.first_name,
        "last_name" : this.state.last_name,
        "phone": this.state.phone.replace(/\s/g, ''), 
        "email": this.state.email,
        "roles": this.state.roles,
        "permissions": this.state.permissions,
        "confirmed" : this.state.confirmed,
        "structure_id" : this.props.structure_id,
        "code" : this.state.verification_code
       }
      console.log(JSON.stringify(data))
      axios.post( 'v1/registerrep',
          data 
        )
      .then(({data}) => {
          //handle success
          this.setState({loading:false})
          console.log(data);
          if(data.Code==201){
            this.notify('success', "User created successfully")
            this.props.onClose()
            this.props.refresh()
          }else{
              let str=data.Message? data.Message :
    
            console.log(str)
            this.notify('error', str)
          }
      })
      .catch((error) => {
        this.setState({loading:false})
          //handle error
          
          console.log(error);
          if(error.response){
            if(error.response.data){
              this.notify('error', error.response.data.message)
              let str='An error occured'
              const data = error.response.data
              if(data.errors){
                const values = Object.values(data.errors)
                  str=''
              if(values.length){
                  values.map(error=>{
                    str = str+error;
                    this.notify('error', error)
                  })
                }
              }
              console.log(str)
              
            }
          }
      });    
  };
  handleSetLocation = (location) => {
    console.log("set location", location)
    this.setState({location : location, mapready: true})
  }
  handleRoleToggle = (event, value) => {
    const {roles} = this.state;
    const currentIndex = roles.indexOf(value);
    const newChecked = [...roles];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      roles: newChecked,
    });
  };
  handlePermissionToggle = (event, value) => {
    const {permissions} = this.state;
    const currentIndex = permissions.indexOf(value);
    const newChecked = [...permissions];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      permissions: newChecked,
    });
  };
  render() {
    const cardStyle = "bg-primary text-white"
    return (
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={this.handleRequestClose}
          TransitionComponent={Transition}
        >
          <AppBar className="position-relative">
            <Toolbar>
              <IconButton onClick={this.props.onClose} color="inherit" aria-label="Close">
                <CloseIcon/>
              </IconButton>
              <Typography variant="inherit" color="inherit" style={{
                flex: 1,
              }}>
                Add user
              </Typography>
              <Button onClick={this.handleRequestSave} color="inherit">
                save
              </Button>
            </Toolbar>
            {this.state.loading==true&&<LinearProgress color="secondary"/>}
          </AppBar>
          <div style={{padding : 20}}>
          <form className="row" noValidate autoComplete="off">
              <div className="col-md-6 col-12" >
                <TextField
                  id="username"
                  label="Username"
                  value={this.state.username}
                  onChange={this.handleChange('username')}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-md-6 col-12" >
                <TextField
                  id="first_name"
                  label="First Name"
                  value={this.state.first_name}
                  onChange={this.handleChange('first_name')}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-md-6 col-12" >
                <TextField
                  id="last_name"
                  label="Last Name"
                  value={this.state.last_name}
                  onChange={this.handleChange('last_name')}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-md-6 col-12" >
                <TextField
                  id="email"
                  label="Email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  margin="normal"
                  fullWidth
                />
              </div>
              
              <div className="col-md-6 col-12" >
                <label>Phone number</label>
                <PhoneInput
                  label="Phone"
                  country={'ke'}
                  value={this.state.phone}
                  onChange={phone => this.setState({ phone })}
                />
              </div>
              <div className="col-md-6 col-12" >
                <TextField
                  id="Verification code"
                  label="Code"
                  value={this.state.verification_code}
                  disabled
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-md-6">
              <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.active}
                      onChange={this.handleChange('active')}
                      color="primary"
                    />
                  }
                  label="Active"
                />
              </div>
              <div className="col-md-6">
              <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.confirmed}
                      onChange={this.handleChange('confirmed')}
                      color="secondary"
                    />
                  }
                  label="Confirmed"
                />
              </div>
              
              <div className="col-md-6">
                  <Roles data={this.props.rolesdata} handleRoleToggle={this.handleRoleToggle} checked={this.state.roles}/>
              </div>
              <div className="col-md-6">
                  <Permissions data={this.props.permissionsdata} checked={this.state.permissions} handlePermissionToggle={this.handlePermissionToggle}/>
              </div>
          </form>
          </div>
          <NotificationContainer/>
        </Dialog>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRoles: () => dispatch(getRoles()),
    getPermissions : () => dispatch(getPermissions())
  }
}
const mapStateToProps = ({ roles, permissions}) => {
  const { rolesdata } = roles;
  const { permissionsdata } = permissions;
  return { rolesdata, permissionsdata }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDialog);