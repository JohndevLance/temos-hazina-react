import React, { useState } from 'react';
import {useDropzone} from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles'
import ContainerHeader from 'components/ContainerHeader/index';
import {Card, CardBody, CardImg} from 'reactstrap';
import { IconButton } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUpload from '@material-ui/icons/CloudUpload';
import axios from 'util/Api';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
    marginAutoContainer: {
      width: 500,
      height: 80,
      display: 'flex',
      backgroundColor: 'gold',
    },
    marginAutoItem: {
      margin: 'auto'
    },
    alignItemsAndJustifyContent: {
      margin :20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }))

function Dialog(props) {
  const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true
  });
  const [loading, setLoading] = useState(false);
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const notify = (type, msg) => {
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
      console.log(msg)
      NotificationManager.error(msg, "Error occured", 5000, () => {
            
          });
    }
  }
  const downloadTemplate =  () => {
    axios({
      url: 'v1/product/downloadtemplate',
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'product_template.xlsx'); //or any other extension
       document.body.appendChild(link);
       link.click();
    });
  }
  const uploadProducts =  () => {
    var formData = new FormData();
    if(acceptedFiles!="undefined"&&acceptedFiles!=null){
      if(acceptedFiles[0]!="undefined"){
        console.log(acceptedFiles)
        formData.append('product_excel', acceptedFiles[0]);
      }else{
        return
      }
    }
    setLoading(true)
    axios({
      method: 'post',
      url: 'v1/product/import',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then(({data}) => {
          //handle success
          console.log(data);
          setLoading(false)
          if(data.success){
            notify('success', "Products import successful")
            this.props.history.push('/app/products');
          }else{
            let str='An error occured'
            if(data.errors!="undefined"){
                str=''
            if(data.errors.length){
                data.errors.map(error=>{
                  str = str+error;
                  notify('error', str)
                })
              }
          }
          console.log(str)
          notify('error', str)
          }
      })
      .catch((error) => {
          //handle error
          setLoading(false)
          if(error.response){
            if(error.response.data){
              console.log(error.response.data)
              notify('error', error.response.data.message)
              let str='An error occured'
              const data = error.response.data
              if(data.errors){
                const values = Object.values(data.errors)
                  str=''
              if(values.length){
                  values.map(error=>{
                    str = str+error;
                    notify('error', str)
                  })
                }
              }
              console.log(str)
              
            }
          }
      });    
  }
  const classes = useStyles()
  return (
    <div>
    <div className="app-wrapper">
    <ContainerHeader match={props.match} title="Upload Batch Products"/>
    <Card className="shadow border-0">
    {loading==true&&<LinearProgress color="secondary"/>}
    <div style={{ maxWidth: '50%' }} className={classes.alignItemsAndJustifyContent}>
     <div className="dropzone-card">
        <button className="btn btn-secondary" type="button" onClick={downloadTemplate}>
          <CloudDownloadIcon/>
          Download Template
        </button>
      <div className="dropzone">
        <div {...getRootProps({className: 'dropzone-file-btn'})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here</p>
        </div>
        <button className="btn btn-primary" type="button" onClick={open}>
          Upload from my computer
        </button>
        <button className="btn btn-secondary" type="button" onClick={open}>
          Clear
        </button>
      </div>
      <div className="dropzone-content">
        <h3>Accepted Files</h3>
        <ul>{files}</ul>
      </div>
      <button className="btn btn-primary" type="button" onClick={uploadProducts}>
          <CloudUpload/>
          Upload Excel
        </button>
    </div>
    </div>
    </Card>
    </div>
    <NotificationContainer/>
    </div>
  );
}

export default Dialog;