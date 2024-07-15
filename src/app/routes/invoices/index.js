import React from 'react';
import ContainerHeader from 'components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';
import CardBox from 'components/CardBox';
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
import AccountCircle from '@material-ui/icons/AccountCircle';
import Refresh from '@material-ui/icons/Refresh';
import { push } from 'connected-react-router'
import OrderDialog from './CustomerDialog';
import Button from '@material-ui/core/Button';
import { APIKEY } from 'constants/ActionTypes';
import MapComponent from './Map';
import OrderComponent from '../Order/Invoice';

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

class Invoices extends React.Component {
  state = {
    anchorEl: undefined,
    open: false,
    opendialog : false,
    edit : false,
    opencustomerdialog : false,
    opensalesreps : false
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
  notify(type){
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
      NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
            id="notification.clickMe"/>, 5000, () => {
            alert('callback');
          });
    }
  }
  createNotification = (type) => {
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
  onOrderDialogClose = (value) => {
    this.setState({opencustomerdialog : false})
  }
  refresh= () => {
    this.tableRef.current.onQueryChange();
  }
  render() {
    console.log(window.google)
    return (
      <div>
      <div className="app-wrapper">
      
        <OrderDialog open={this.state.opencustomerdialog} edit={this.state.edit} onClose={ this.onOrderDialogClose } refresh={this.refresh}/>
        
        <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          tableRef={this.tableRef}
          options={{
            exportButton: true,
            pageSize:"10"
          }}
          
          icons={tableIcons}
          columns={[
            {  
              field: '',
              title: 'Structure',
              render: (rowData) => {
                return rowData.structure.title
              } 
            },
            {  
              field: '',
              title: 'Client',
              render: (rowData) => {
                return rowData.customer.name
              } 
            },
            { title: 'Total Amount', field: 'grand_total' },
            {  
              field: '',
              title: 'User',
              render: (rowData) => {
                return rowData.user.full_name
              } 
            },
            {  
              field: '',
              title: 'Payment Method',
              render: (rowData) => {
                return rowData.payment_method ? rowData.payment_method.name : ""
              } 
            },
            {  
              field: '',
              title: 'Created at',
              render: (rowData) => {
                return rowData.loctimestamp
              } 
            },
            {  
              field: '',
              title: 'Synced at',
              render: (rowData) => {
                return rowData.created_at
              } 
            },
          ]}
          detailPanel={[
            {
              tooltip: 'Show On Map',
              render: rowData => {
                return (
                  <div
                    style={{
                      fontSize: 100,
                      textAlign: 'center',
                      color: 'white',
                      backgroundColor: '#43A047',
                    }}
                  >
                   <MapComponent location={{lat: rowData.lat ? rowData.lat*1 : 0, lng: rowData.lng ? rowData.lng*1 : 0 }}/>
                  </div>
                )
              },
            },
            {
              tooltip: 'Show Details',
              render: rowData => {
                return (
                  <div
                    style={{
                     
                    }}
                  >
                    <OrderComponent order={rowData}/>
                  </div>
                )
              },
            },
          ]}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
          data={query =>
            new Promise((resolve, reject) => {
              let url = 'v1/invoiceadmin/list?'
                url += '&page=' + (query.page + 1)
                axios.get(url,
                ).then(({data}) => {
                  console.log("fetchInvoices: ", data);
                  if (data.success) {
                    console.log(data.data)
                    resolve({
                      data: data.data.data,
                      page: data.data.current_page-1,
                      totalCount: data.data.total,
                  });
                  } else {
                    this.notify("error")
                    console.log("error : "+data)
                  }
                }).catch((error) => {
                  const response = []
                  this.notify("error")
                  console.log("Error****:", error.message);
                });
            })
        }
          title="Invoices"
          editable={{
            isEditable: rowData => true, // only name(a) rows would be editable
            isDeletable: rowData => true, // only name(a) rows would be deletable
            
            
            onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                      axios.delete('v1/invoices/'+oldData.id
                        ).then(({data}) => {
                          console.log("post: ", data);
                          if(data.status=202){
                            this.notify('success')
                            this.tableRef.current.onQueryChange();
                          }
                          resolve();
                        }).catch((error) => {
                          console.log("Error****:", error.message);
                          this.notify('error')
                        });
                        {
                            /* let data = this.state.data;
                            const index = data.indexOf(oldData);
                            data.splice(index, 1);
                            this.setState({ data }, () => resolve()); */
                        }
                        resolve();
                    }, 1000);
                })
        }}
        />
      </div>
      </div>
      <NotificationContainer/>
      </div>
    );
  }
}

export default Invoices;