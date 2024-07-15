import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { Delete } from '@material-ui/icons';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from 'react-redux';
import { getQuestionTypes, getSkipOptions } from 'actions/forms';
import axios from 'util/Api';
import InfoView from 'components/InfoView';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Card } from '@material-ui/core';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const imageref = React.createRef();
const initial_state = {
  open: false,
  label : "",
  show_options : false,
  option_id : 0,
  skip_option_id : 0,
  count_conditions : 1,
  required : false,
  question_type : "",
  has_skip : false,
  options : [],
  skip_conditions: [],
  loading: false,
  question_id : false
};
class QuestionDialog extends React.Component {
  constructor(props){
    super(props)
    this.state = initial_state
  }
  
  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleRequestClose = () => {
    this.props.onClose();
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    if(name=='question_type'){
      var question_type = event.target.value
      if( question_type==2||
          question_type==3||
          question_type==4||
          question_type==5){
          this.setState({show_options : true})      
      }
      else{
        this.setState({show_options : false})
      }
    }     
  };
  handleOptionsChange =  id => event => {
    var options = this.state.options.slice(); // Make a copy of the emails first.
    // prices.push({id : event.target.value}); // Update it with the modified email.
    const index = options.findIndex((e) => e.id === id);
    event.persist()
    if (index === -1) {
      options.push({id: id, option: event.target.value});
      this.setState({options});
    } else {
      this.setState(prevState => {
        const newoptions = [...prevState.options];
        newoptions[index].option = event.target.value;
        return {options: newoptions};
    })
    }
    
  }
  componentDidMount(){
    this.props.getQuestionTypes()
    this.props.getSkipOptions()
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.open){
      if(nextProps.question_data){
        this.setState({ 
          label : nextProps.question_data.label,
          question_type : nextProps.question_data.question_type,
          has_skip : nextProps.question_data.has_skip,
          options : nextProps.question_data.options,
          required : nextProps.question_data.required,
          skip_conditions : nextProps.question_data.skip_conditions,
          show_options : nextProps.question_data.options.length,
          question_id : nextProps.question_data.question_id
        })
        let max_option_id = Math.max.apply(Math, nextProps.question_data.options.map(function(o) { return o.id; }))
        let max_skip_condition_id = Math.max.apply(Math, nextProps.question_data.skip_conditions.map(function(o) { return o.id; }))
        this.setState({
          option_id : max_option_id,
          skip_option_id : max_skip_condition_id,
        })
      }else{
        this.resetForm()
      }
    }
  }
  resetForm = () => {
    this.setState(initial_state)
  }
  saveQuestion = () => {
    let question_data = {
      question_id : this.state.question_id,
      label : this.state.label,
      question_type : this.state.question_type,
      options : this.state.options,
      required : this.state.required,
      has_skip : this.state.has_skip,
      skip_conditions : this.state.skip_conditions,
    }
    this.props.addQuestion(question_data)
    this.handleRequestClose()
    this.resetForm()
  }
  addOption (type) {
    if(type == "skip"){
      const id = this.state.skip_option_id + 1
      var options = this.state.skip_conditions.slice();
      options.push({id: id, question : '', skip_option : ''});
      this.setState({skip_conditions: options, skip_option_id : id});
    }else{
      const id = this.state.option_id + 1
      var options = this.state.options.slice();
      options.push({id: id, option: ''});
      this.setState({options, option_id : id});
    }
  }
  handleOptionsChange =  id => event => {
    var options = this.state.options.slice(); // Make a copy of the emails first.
    // prices.push({id : event.target.value}); // Update it with the modified email.
    const index = options.findIndex((e) => e.id === id);
    event.persist()
    if (index === -1) {
      options.push({id: id, option: event.target.value});
      this.setState({options});
    } else {
      this.setState(prevState => {
        const newoptions = [...prevState.options];
        newoptions[index].option = event.target.value;
        return {options: newoptions};
    })
    }
    
  }
  handleSkipOptionsChange =  (id, type) => event => {
    var options = this.state.skip_conditions.slice();
    console.log(options);
    const index = options.findIndex((e) => e.id === id);
    event.persist()
    if (index === -1) {
      options.push({id: id, option: event.target.value});
      this.setState({options});
    } else {
      if(type == 'question') {
        this.setState(prevState => {
          const newoptions = [...prevState.skip_conditions];
          newoptions[index].question = event.target.value;
          return {skip_conditions: newoptions};
        })
      }else{
        this.setState(prevState => {
          const newoptions = [...prevState.skip_conditions];
          newoptions[index].skip_option = event.target.value;
          return {skip_conditions: newoptions};
        })
      }
    }
    
  }
  removeOption = (id)=> {
    var options = this.state.options.slice(); // Make a copy of the emails first.
    // prices.push({id : event.target.value}); // Update it with the modified email.
    const index = options.findIndex((e) => e.id === id);
    if (index != -1) {
      options.splice(index, 1)
      this.setState({options});
    }
  }
  removeSkipOption = (id)=> {
    var options = this.state.skip_conditions.slice(); // Make a copy of the emails first.
    // prices.push({id : event.target.value}); // Update it with the modified email.
    const index = options.findIndex((e) => e.id === id);
    if (index != -1) {
      options.splice(index, 1)
      this.setState({skip_conditions :options});
    }
  }
  getValue = (id)=> {
    const index = this.state.options.findIndex((e) => e.id === id)
    if (index != -1) {
      return this.state.options[index].option
    }else{
      return ''
    }
  }
  getSkipValue = (id) => {
    const index = this.state.skip_conditions.findIndex((e) => e.id === id)
    if (index != -1) {
      return this.state.options[index].option
    }else{
      return ''
    }
  }
  renderOption () {
    return (
      this.state.options.map(option => (
      <React.Fragment>
      <div className="col-md-11 col-12" >
                <TextField
                  id="name"
                  label="Option"
                  value={this.getValue(option.id)}
                  onChange={this.handleOptionsChange(option.id)}
                  margin="normal"
                  fullWidth
                />
              </div>
              
              <div className="col-md-1 col-12">
                <IconButton onClick={() => this.removeOption(option.id)} color="inherit" aria-label="Close">
                  <Delete className="text-red"/>
                </IconButton>
              </div>
              
        </React.Fragment>))
    )
  }
  renderSkipOption () {
    return (
      this.state.skip_conditions.map((option, index) => (
      <React.Fragment>
      <div className="col-md-5 col-12" >
                <TextField
                  id="skip-logic-question"
                  select
                  label="Select question from list?"
                  value={this.state.skip_conditions[index].question}
                  onChange={this.handleSkipOptionsChange(option.id, 'question')}
                  // SelectProps={{}}
                  helperText="Select question from list"
                  margin="normal"
                  fullWidth
                >
                    {this.props.questions.map ((question) => (
                    <MenuItem key={question.question_id} value={question.question_id}>
                      {question.label}
                    </MenuItem>))}
                </TextField>
              </div>
              <div className="col-md-6" >
                <TextField
                  id="skip-logic"
                  select
                  label="Skip logic?"
                  value={this.state.skip_conditions[index].skip_option}
                  // value={this.getSkipValue('condition', option.id).skip_option}
                  onChange={this.handleSkipOptionsChange(option.id, 'condition')}
                  SelectProps={{}}
                  helperText="Has Skip Logic"
                  margin="normal"
                  fullWidth
                >
                    {this.props.skip_options.map((skip_option) => <MenuItem key={skip_option.id} value={skip_option.id}>
                      {skip_option.condition} 
                    </MenuItem>)}
                </TextField>
              </div>
              <div className="col-md-1 col-12">
                <IconButton onClick={() => this.removeSkipOption(option.id)} color="inherit" >
                  <Delete className="text-red"/>
                </IconButton>
              </div>
        </React.Fragment>))
    )
  }
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
                New Question
              </Typography>
              <Button onClick={this.saveQuestion} color="inherit">
                save
              </Button>
            </Toolbar>
            {this.state.loading==true&&<LinearProgress color="secondary"/>}
          </AppBar>
          <div style={{padding : 20}}>
          <form className="row" noValidate autoComplete="off">
              <div className="col-md-6 col-12" >
                <TextField
                  id="label"
                  label="Label"
                  variant="outlined"
                  value={this.state.label}
                  onChange={this.handleChange('label')}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-md-12 col-12" >
                <TextField
                  id="select-question-type"
                  select
                  label="Question Type"
                  variant="outlined"
                  value={this.state.question_type}
                  onChange={this.handleChange('question_type')}
                  SelectProps={{}}
                  helperText="Please select question type"
                  margin="normal"
                  fullWidth
                >
                    {this.props.question_types.map((question_type) => <MenuItem key={question_type.id} value={question_type.id}>
                      {question_type.question_type} 
                    </MenuItem>)}
                </TextField>
              </div>
              {this.state.show_options&&this.renderOption()}
              {this.state.show_options&&
              <div className="col-md-12">
                <Button
                  aria-owns={this.state.open ? 'simple-SidenavContent.js' : null}
                  aria-haspopup
                  onClick={() => { this.addOption('option') }}
                  color="secondary" 
                  className="jr-btn bg-green text-white"
                >Add New Option</Button>
                
              </div>}
              <div className="col-md-6 col-12" >
                <TextField
                  id="select-mandatory"
                  select
                  label="Mandatory?"
                  variant="outlined"
                  value={this.state.required}
                  onChange={this.handleChange('required')}
                  SelectProps={{}}
                  helperText="Is Question mandatory"
                  margin="normal"
                  fullWidth
                >
                    <MenuItem key={"text"} value={true}>
                      Yes 
                    </MenuItem>
                    <MenuItem key={"text"} value={false}>
                      No 
                    </MenuItem>
                </TextField>
              </div>
              <div className="col-md-12 col-12" >
                <TextField
                  id="skip-logic"
                  select
                  label="Skip logic?"
                  value={this.state.has_skip}
                  onChange={this.handleChange('has_skip')}
                  SelectProps={{}}
                  helperText="Has Skip Logic"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                >
                    <MenuItem key={"1"} value={true}>
                      Yes 
                    </MenuItem>
                    <MenuItem key={"0"} value={false}>
                      No 
                    </MenuItem>
                </TextField>
              </div>
              {this.state.has_skip&&this.renderSkipOption()}
              {this.state.has_skip&&<div className="col-md-12 col-12" >
              <Button
                aria-owns={this.state.open ? 'simple-SidenavContent.js' : null}
                aria-haspopup
                onClick={() => { this.addOption('skip') }}
                variant="contained" 
                color="primary" 
                className="jr-btn bg-purple text-white"
              >Add New Condition</Button>
              </div>}
              
          </form>
          </div>
          {/* <InfoView/> */}
        </Dialog>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getQuestionTypes: () => dispatch(getQuestionTypes()),
    getSkipOptions: () => dispatch(getSkipOptions())
  }
}
const mapStateToProps = ({forms}) => {
  const { question_types, skip_options } = forms
  return { question_types, skip_options }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDialog);