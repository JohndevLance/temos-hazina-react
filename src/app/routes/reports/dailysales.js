import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import CardBox from 'components/CardBox/index';
import MaterialTable from "material-table";
import axios from 'util/Api';
import { forwardRef } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Refresh from '@material-ui/icons/Refresh';

import { push } from 'connected-react-router'
import Button from '@material-ui/core/Button';
import { PUBLIC_BASE_URL } from 'constants/ActionTypes';
import moment from 'moment';
import {DatePicker} from 'material-ui-pickers';
import LinearProgress from '@material-ui/core/LinearProgress';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Refresh: forwardRef((props, ref) => <Refresh {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

class Customers extends React.Component {
  state = {
    anchorEl: undefined,
    open: false,
    opendialog : false,
    edit : false,
    opencustomerdialog : false,
    opensalesreps : false,
    search: false,
    export: false,
    fromdate: moment(),
    todate: moment(),
    download : false,
  };
  tableRef = React.createRef();
  componentDidMount() {
    // this.loadJS('https://maps.googleapis.com/maps/api/js?key='+APIKEY+'&v=3.exp&libraries=geometry,drawing,places')
  }
  loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    console.log(ref)
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
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
      NotificationManager.error(msg, "ERROR", 5000, () => {
            
          });
    }
  }
  createNotification = (type, msg) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info(<IntlMessages id="notification.infoMsg"/>);
          break;
        case 'success':
          NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
            id="notification.titleHere"/>);
          break;
        case 'warning':
          NotificationManager.warning(<IntlMessages id="notification.warningMessage"/>, <IntlMessages
            id="notification.closeAfter3000ms"/>, 3000);
          break;
        case 'error':
          NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
            id="notification.clickMe"/>, 5000, () => {
            alert('callback');
          });
          break;
        default:
          NotificationManager.info(<IntlMessages id="notification.infoMsg"/>);
      }
    };
  };
  handleDateFromChange = (date) => {
    this.setState({fromdate: date});
  };
  handleDateToChange = (date) => {
    this.setState({todate: date});
  };
  search = () => {
    this.setState({
      search : true,
      export : false
    })
    setTimeout(() => {
      this.tableRef.current.onQueryChange();
    }, 100);
  }
  export = () => {
    this.setState({
      export : true,
    })
    setTimeout(() => {
      const payload = {
        search : this.state.search,
        fromdate : this.state.fromdate,
        todate: this.state.todate,
        export: this.state.export
      }
      console.log(JSON.stringify(payload))
      let url = 'v1/report/dailysales'
        axios.post(url, payload
        ).then(({data}) => {
          console.log("fetchReport: ", data.data);
          if (data.success) {
            window.open(PUBLIC_BASE_URL+'/downloadFile?path='+data.data.path, '_blank');
          } else {
            this.notify("error")
            console.log("error : "+data)
          }
          this.setState({download : false})
        }).catch((error) => {
            console.log(error)
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
    }, 100);
  }
  download = () => {
    this.setState({
      download : true
    })
    setTimeout(() => {
      this.tableRef.current.onQueryChange();
    }, 100);
  }
  refresh= () => {
    this.tableRef.current.onQueryChange();
  }
  render() {
    console.log(window.google)
    return (
      <div>
      <div className="app-wrapper">
      <div className="jr-card col-12">
                <div className="row">
                  <div className="col-4">
                    <div key="date_from" className="picker">
                      <DatePicker
                        fullWidth
                        label="Date From"
                        value={this.state.fromdate}
                        onChange={this.handleDateFromChange}
                        animateYearScrolling={false}
                        leftArrowIcon={<i className="zmdi zmdi-arrow-back"/>}
                        rightArrowIcon={<i className="zmdi zmdi-arrow-forward"/>}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                  <div key="date_to" className="picker">
                    <DatePicker
                      fullWidth
                      label="Date To"
                      value={this.state.todate}
                      onChange={this.handleDateToChange}
                      animateYearScrolling={false}
                      leftArrowIcon={<i className="zmdi zmdi-arrow-back"/>}
                      rightArrowIcon={<i className="zmdi zmdi-arrow-forward"/>}
                    />
                  </div>
                  </div>
                  <div className="col-2">
                  <Button
                      aria-owns={this.state.open ? 'simple-SidenavContent.js' : null}
                      aria-haspopup
                      onClick={() => { this.search() }}
                      variant="contained" 
                      color="primary" 
                      className="jr-btn btn-amber text-white"
                    >Search</Button>
                  </div>
                  <div className="col-2">
                  <Button
                      aria-owns={this.state.open ? 'simple-SidenavContent.js' : null}
                      aria-haspopup
                      onClick={() => { this.export() }}
                      variant="contained" 
                      color="primary" 
                      className="jr-btn bg-purple text-white"
                    >Download Excel</Button>
                  </div>
                </div>
              </div>
      
      
        <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          tableRef={this.tableRef}
          options={{
            exportButton: true,
            pageSize: 50,
          }}
          
          icons={tableIcons}
          columns={[
            { title: 'UserName', field: 'username' },
            { title: 'User ID', field: 'user_id' },
            { title: 'Total', field: 'total' },
            { title: 'Coverage', field: 'coverage' },
          
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              const payload = {
                search : this.state.search,
                fromdate : this.state.fromdate,
                todate: this.state.todate,
                export: this.state.export
              }
              console.log(JSON.stringify(payload))
              let url = 'v1/report/dailysales?'
                url += '&page=' + (query.page + 1)
                console.log(url)
                axios.post(url, payload
                ).then(({data}) => {
                  console.log("fetchReport: ", data.data);
                  if (data.success) {
                    resolve({
                      data: data.data,
                      // page: 1,
                      // totalCount: data.data.length,
                  });
                  } else {
                    this.notify("error")
                    console.log("error : "+data)
                  }
                  this.setState({download : false})
                }).catch((error) => {
                    console.log(error)
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
            })
        }
          title="Daily Sales"
          editable={{
            isEditable: rowData => true, // only name(a) rows would be editable
            isDeletable: rowData => true, // only name(a) rows would be deletable
           
        }}
        />
      </div>
      </div>
      <NotificationContainer/>
      </div>
    );
  }
}

export default Customers;