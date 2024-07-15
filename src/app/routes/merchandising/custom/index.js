import React from 'react';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import ContainerHeader from 'components/ContainerHeader/index';
import QuestionDialog from './QuestionDialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Delete } from '@material-ui/icons';
import { postFormCustom } from 'actions/forms';
import { getFormCategories } from 'actions/formcategories';
import {connect} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';

class CustomBuilder extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      openproductdialog : false,
      title : "",
      form_category : "",
      question_data: false,
      questions : []
    }
    this.question_id = 0;
  }
  onQuestionDialogClose = (value) => {
    this.setState({openproductdialog : false})
  }
  handleRequestSave() {
    var data={
      formname : this.state.title,
      form_category_id : this.state.form_category, 
      formobj : this.state.questions
    }
    var formjson = JSON.stringify(data)
    console.log('====================================');
    console.log(formjson);
    console.log('====================================');
    this.props.postForm(formjson)
  }
  componentDidMount() {
    this.props.getFormCategories()
  }
  componentDidUpdate(prevProps) {
    console.log(prevProps.message)
    if (prevProps.error || prevProps.message) {
      if (this.props.message !== prevProps.message) {
      if(prevProps.message=="Success"){
        this.notify('success', "Form created successfully")
        this.props.history.push("/app/merchandising");
      }
      }
    }
  }
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
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }
  addQuestion = (question) => {
    var questions = this.state.questions.slice();
    if(question.question_id){
      questions = questions.map(q => q.question_id !== question.question_id ? q : question);
    }else{
      this.question_id++
      question.question_id = this.question_id
      questions.push(question);
    }
    this.setState({questions});
  }
  render() {
    return (
    <div className="app-wrapper">
      <ContainerHeader match={this.props.match} title="Add Form & Questions"/>
      <Card>
        <form className="row" noValidate autoComplete="off">
        <div className="col-md-6 col-12" >
                <TextField
                  id="title"
                  label="Form Title"
                  value={this.state.title}
                  onChange={this.handleChange('title')}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                />
          </div>
          <div className="col-md-6 col-12" >
                <TextField
                  id="select-category"
                  select
                  label="Select"
                  value={this.state.form_category}
                  onChange={this.handleChange('form_category')}
                  SelectProps={{}}
                  helperText="Please select form category"
                  margin="normal"
                  fullWidth
                >
                  {this.props.form_categories_data.map(option => (
                    <MenuItem key={(option.id).toString()} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              </form>
          </Card>
      <div style={{ maxWidth: '100%' }}>
      <QuestionDialog 
        open={this.state.openproductdialog} 
        onClose={this.onQuestionDialogClose } 
        structure_id={this.props.location.state ? this.props.location.state.structure_id : null}
        addQuestion={this.addQuestion}
        question_data={this.state.question_data}
        questions={this.state.questions}
      />
      
        <Button
          aria-owns={this.state.open ? 'simple-SidenavContent.js' : null}
          aria-haspopup
          onClick={() => { this.setState({openproductdialog : true, question_data : false}) }}
          variant="contained" 
          color="primary" 
          className="jr-btn bg-purple text-white"
        >New Question</Button>
      </div>
      <div className="w-100">
      <List>
        {this.state.questions.map((question) => (
          <ListItem>
            <ListItemIcon button 
            onClick={() => { this.setState({openproductdialog : true, question_data : question}) }}>
              <i className="zmdi zmdi-menu zmdi-hc-fw zmdi-hc-2x"/>
            </ListItemIcon>
            <ListItemText primary={question.label}/>
            <ListItemIcon>
              <i className="zmdi zmdi-trash text-red zmdi-hc-fw zmdi-hc-2x"/>
            </ListItemIcon>
            <div className="col-md-1 col-12">
                <IconButton onClick={() => this.removeOption(question.id)} color="inherit" aria-label="Close">
                  <Delete className="text-red"/>
                </IconButton>
              </div>
          </ListItem>
        ))}
        
        <Divider light/>

        <div className="bg-amber-100">
          <Button
            onClick={() => { this.handleRequestSave() }}
            variant="outlined" 
            color="primary" 
            size="large"
            fullWidth
            className="jr-btn bg-green text-white"
          >Submit Form</Button>
        </div>

      </List>

    </div>
    </div>
    );
    }
}
const mapDispatchToProps = dispatch => {
  return {
    postForm: (payload) => dispatch(postFormCustom(payload)),
    getFormCategories : () => dispatch(getFormCategories())
  }
}
const mapStateToProps = ({commonData, formcategories}) => {
  const {error, loading, message} = commonData;
  const { form_categories_data } = formcategories
  return {error, loading, message, form_categories_data};
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomBuilder)