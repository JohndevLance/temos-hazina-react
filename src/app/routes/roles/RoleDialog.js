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
import { getPermissions } from 'actions/permissions';
import axios from 'util/Api';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { APIKEY } from 'constants/ActionTypes';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import CheckboxListSecondary from './CheckboxListSecondary';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const imageref = React.createRef();
class RoleDialog extends React.Component {
  state = {
    open: false,
    name : "",
    email : "",
    phone : "",
    active: true,
    location : {},
    permissions: [],
    checked : [],
    loading: false
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
      NotificationManager.error(msg, "OK", 5000, () => {
            alert('callback');
          });
    }
  }
  componentDidMount(){
    this.props.getPermissions()
  }
  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
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
  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };
  componentWillReceiveProps(nextProps){
    // if(nextProps.data.length){
    //   this.setState({ categories : nextProps.data})
    // }
  }
  handleRequestSave = () => {
    this.setState({loading : true})
    var data = {
        "name" : this.state.name,
        "associated-permissions": this.state.permissions, 
        "permissions": this.state.checked
      }
        console.log(JSON.stringify(data))
    axios.post( 'v1/roles',
        data 
      )
      .then(({data}) => {
          //handle success
          console.log(data);
          this.setState({loading : false})
          if(data.success){
            this.notify('success', "Role created successfully")
            this.props.onClose()
            this.props.refresh()
          }else{
              let str='An error occured'
              if(data.errors!="undefined"){
                  str=''
              if(data.errors.length){
                  data.errors.map(error=>{
                    str = str+error;
                  })
                }
            }
            console.log(str)
            this.notify('error', str)
          }
      })
      .catch((error) => {
          //handle error
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
  handlePermissionToggle = (event, value) => {
    const {checked} = this.state;
    console.log(value)
    const currentIndex = checked.indexOf(value);
    
    if (currentIndex === -1) {
      this.setState(state => {
        const checked = state.checked.concat(value);
        return {
          checked
        };
      });
     
    } else {
      this.setState({checked: this.state.checked.filter((value) => { 
        return value !== value 
    })});
      
    }
    
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
                Add Role
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
                  id="name"
                  label="Name"
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                  fullWidth
                />
              </div>
              
              <div className="col-md-6 col-12">
              <CheckboxListSecondary permissions={this.props.permissionsdata} checked={this.state.checked} handlePermissionToggle={this.handlePermissionToggle}/>
                
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
    getPermissions: () => dispatch(getPermissions())
  }
}
const mapStateToProps = ({ permissions }) => {
  const {permissionsdata} = permissions;
  console.log(permissionsdata)
  return { permissionsdata }
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleDialog);