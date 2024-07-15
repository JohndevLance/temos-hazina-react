import $ from "jquery";
import React, { Component, createRef } from "react";
import ReactDOM from "react-dom";
import TextField from '@material-ui/core/TextField';
import "./styles.css";
import ContainerHeader from 'components/ContainerHeader/index';
import Card from '@material-ui/core/Card';
import axios from 'util/Api';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import { postForm } from 'actions/forms';
import { getFormCategories } from 'actions/formcategories';
import {connect} from 'react-redux';
import InfoView from 'components/InfoView';
import MenuItem from '@material-ui/core/MenuItem';

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

let formBuilder;
let formTitle;

const formData = [
 
];

/* 
The order of the imports and requires is very important, especially in the online enviornment.
The two jQuery libraries must be imported using Node's require(), and not ES6 import.
Also, these two requires MUST come after setting the global jQuery and $ symbols.

In my Babel/Webpack project, the type and order of the imports is a little less sensitive.
For my project, the following alternative works:

    import $ from 'jquery';
    import React from 'react';
    import ReactDOM from 'react-dom';
    import 'jquery-ui-sortable';

    window.jQuery = $;
    window.$ = $;

    require('formBuilder');
*/

class FormBuilder extends Component {
  constructor(props){
      super(props)
      this.state={
          title : "",
          form_category : ""
      }
  }
  fb = createRef();
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
  componentDidMount() {
    this.props.getFormCategories()
    const options = {
      onSave: (formData) => {
        if(formBuilder){
          if(this.state.form_category==""){
            window.alert("Please select category")
            return
          }
          var data={formname : this.state.title,form_category_id : this.state.form_category, formobj : formBuilder.actions.getData()}
          var formjson = JSON.stringify(data)
          this.props.postForm(formjson)
        }
        },
    };
    formBuilder =  $(this.fb.current).formBuilder(options);
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
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
  render() {
    return (
    <div>
        <ContainerHeader match={this.props.match} title="Create Form"/>
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
        <div id="fb-editor" ref={this.fb} />
        <InfoView/>
    </div>);
  }
}
const mapDispatchToProps = dispatch => {
  return {
    postForm: (payload) => dispatch(postForm(payload)),
    getFormCategories : () => dispatch(getFormCategories())
  }
}
const mapStateToProps = ({commonData, formcategories}) => {
  const {error, loading, message} = commonData;
  const { form_categories_data } = formcategories
  return {error, loading, message, form_categories_data};
};

export default connect(mapStateToProps, mapDispatchToProps)(FormBuilder);
