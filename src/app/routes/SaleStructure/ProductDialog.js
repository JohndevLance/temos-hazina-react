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
import {Card, CardBody, CardText,} from 'reactstrap';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from 'react-redux';
import {getCategories} from 'actions/categories';
import {getPrincipals} from 'actions/principals';
import FullScreen from './FullScreen/index';
import axios from 'util/Api';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const imageref = React.createRef();
class FullScreenDialog extends React.Component {
  state = {
    open: false,
    name : "",
    code : "",
    category : "",
    principal : "",
    desc : "",
    image : "",
    prices : [],
    categories: [],
    channels : [],
    imagefiles : null,
  };
  notify(type, msg){
    if(type=="success"){
     NotificationManager.success(msg); 
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
  componentDidMount(){
    
  }
  componentDidUpdate(prevProps){
    if (this.props.open !== prevProps.open) {
      if(this.props.open){
        this.props.getPrincipals();
      }
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.data.length){
      this.setState({ categories : nextProps.data})
    }
    if(nextProps.channelsdata.length){
      this.setState({ channels : nextProps.channelsdata})
    }
  }
  getValue = (id)=> {
      const index = this.state.prices.findIndex((e) => e.id === id)
      if (index != -1) {
        return this.state.prices[index].price
      }else{
        return ''
      }
    }
  handleSetImage = (files) => {
    this.setState({opendialog : false})
    this.setState({imagefiles : files})
  }
  handleRequestSave = () => {
    var formData = new FormData();

    formData.set('name', this.state.name)
    formData.set('code', this.state.code)
    formData.set('desc', this.state.desc)
    formData.set('cat_id', this.state.category)
    formData.set('structure_id', this.props.structure_id)
    formData.set('prices', JSON.stringify(this.state.prices))
    if(this.state.imagefiles!="undefined"&&this.state.imagefiles!=null){
      if(this.state.imagefiles[0]!="undefined"){
        formData.append('product_image', this.state.imagefiles[0]);
      }
    }
    axios({
      method: 'post',
      url: 'v1/products',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then(({data}) => {
          //handle success
          console.log(data);
          if(data.success){
            this.notify('success', "Product created successfully")
            this.props.onClose()
          }else{
            this.notify('error', data.message)
          }
      })
      .catch((error) => {
          //handle error
          console.log(JSON.stringify(error));
          this.notify('error', error.message)
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
                Add Product
              </Typography>
              <Button onClick={this.handleRequestSave} color="inherit">
                save
              </Button>
            </Toolbar>
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
              <div className="col-md-6 col-12" >
                <TextField
                  id="code"
                  label="Code"
                  value={this.state.code}
                  onChange={this.handleChange('code')}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-md-6 col-12" >
                <TextField
                  id="desc"
                  label="Description"
                  value={this.state.desc}
                  onChange={this.handleChange('desc')}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-md-6 col-12" >
                <TextField
                  id="select-category"
                  select
                  label="Select"
                  value={this.state.category}
                  onChange={this.handleChange('category')}
                  SelectProps={{}}
                  helperText="Please select product category"
                  margin="normal"
                  fullWidth
                >
                  {this.state.categories.map(option => (
                    <MenuItem key={(option.id).toString()} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-md-6 col-12" >
                <TextField
                  id="select-category"
                  select
                  label="Select"
                  value={this.state.principal}
                  onChange={this.handleChange('principal')}
                  SelectProps={{}}
                  helperText="Please select product principal"
                  margin="normal"
                  fullWidth
                >
                  {this.props.principals_data.map(option => (
                    <MenuItem key={(option.id).toString()} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              {this.state.channels.map(channel => (
                    <div key={(channel.id).toString()} className="col-md-6 col-12" >
                    <TextField
                      id={channel.id}
                      label={channel.name+" price"}
                      value={this.getValue(channel.id)}
                      onChange={this.handlePriceListChange(channel.id)}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  ))}
              <CardBox styleName="col-sm-6" cardStyle="" childrenStyle="text-center">
                <FullScreen setImage={this.handleSetImage}/>
              </CardBox>
          </form>
          </div>
          <NotificationContainer/>
        </Dialog>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => dispatch(getCategories()),
    getPrincipals: () => dispatch(getPrincipals())
  }
}
const mapStateToProps = ({categories, channels, principals}) => {
  const {data} = categories;
  const {channelsdata} = channels;
  const { principals_data } = principals;
  return { data, channelsdata, principals_data }
};

export default connect(mapStateToProps, mapDispatchToProps)(FullScreenDialog);