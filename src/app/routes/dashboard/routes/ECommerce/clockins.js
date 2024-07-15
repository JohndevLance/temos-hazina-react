import React from 'react';
import ContainerHeader from 'components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';
import CardBox from 'components/CardBox';
import MaterialTable from "material-table";
import axios from 'util/Api';
import { forwardRef } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { IMAGE_BASE_URL } from '../../../../../constants/ActionTypes'

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
import Button from '@material-ui/core/Button';
import { APIKEY } from 'constants/ActionTypes';

import Battery20 from '@material-ui/icons/Battery20';
import Battery30 from '@material-ui/icons/Battery30';
import Battery50 from '@material-ui/icons/Battery50';
import Battery60 from '@material-ui/icons/Battery60';
import Battery80 from '@material-ui/icons/Battery80';
import Battery90 from '@material-ui/icons/Battery90';
import BatteryFull from '@material-ui/icons/BatteryFull';
import BatteryAlert from '@material-ui/icons/BatteryAlert';
import BatteryUnknown from '@material-ui/icons/BatteryUnknown';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import Viewer from 'react-viewer';
import moment from 'moment';

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

class Orders extends React.Component {
  state = {
    anchorEl: undefined,
    open: false,
    opendialog: false,
    edit: false,
    opencustomerdialog: false,
    opensalesreps: false,
    visible : false,
    image : 'https://source.unsplash.com/user/c_v_r'
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
  notify(type) {
    if (type == "success") {
      NotificationManager.success(<IntlMessages id="notification.successMessage" />);
    } else if (type == "info") {
      NotificationManager.info(<IntlMessages id="notification.infoMsg" />);
    }
    else if (type == "warning") {
      NotificationManager.warning(<IntlMessages id="notification.warningMessage" />, <IntlMessages
        id="notification.closeAfter3000ms" />, 3000);
    }
    else if (type == "error") {
      NotificationManager.error(<IntlMessages id="notification.errorMessage" />, <IntlMessages
        id="notification.clickMe" />, 5000, () => {
          alert('callback');
        });
    }
  }
  createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info(<IntlMessages id="notification.infoMsg" />);
          break;
        case 'success':
          NotificationManager.success(<IntlMessages id="notification.successMessage" />, <IntlMessages
            id="notification.titleHere" />);
          break;
        case 'warning':
          NotificationManager.warning(<IntlMessages id="notification.warningMessage" />, <IntlMessages
            id="notification.closeAfter3000ms" />, 3000);
          break;
        case 'error':
          NotificationManager.error(<IntlMessages id="notification.errorMessage" />, <IntlMessages
            id="notification.clickMe" />, 5000, () => {
              alert('callback');
            });
          break;
        default:
          NotificationManager.info(<IntlMessages id="notification.infoMsg" />);
      }
    };
  };
  onOrderDialogClose = (value) => {
    this.setState({ opencustomerdialog: false })
  }
  refresh = () => {
    this.tableRef.current.onQueryChange();
  }
  openViewer(img_url){
    console.log("image url", img_url)
    if(img_url){
      this.setState({visible : true, image : img_url})
    }
  }
  render() {
    console.log(window.google)
    return (
      <div>
            <Viewer
            visible={this.state.visible}
            onClose={() => { this.setState({visible : false}) } }
            images={[{src: this.state.image, alt: ''}]}
            />
          <div style={{ maxWidth: '100%' }}>
            <MaterialTable
              tableRef={this.tableRef}
              options={{
                exportButton: true,
                pageSize : 20
              }}

              icons={tableIcons}
              columns={[
                {
                  field: 'username',
                  title: 'username',
                },
                {
                  field: '',
                  title: 'Photo',
                  render: (rowData) => {
                    let img_url = rowData.img_url ? IMAGE_BASE_URL+rowData.img_url : ""
                    return (<div>
                      {img_url ? <img onClick={() => this.openViewer(img_url)} src={img_url} alt="photo" style={{width: 50, borderRadius: '50%'}}/> :
                      <p>{'-'}</p>}
                      
                      </div>)
                  }
                },
                {
                  field: '',
                  title: 'Clock time',
                  render: (rowData) => {
                    
                    return (
                      <p>{rowData.clockin ? moment(rowData.clockin).format('LLLL') : "-"}</p>
                      )
                  }
                },
               
                { title: 'Clock In Address', field: 'address' },
                { title: 'Today Visits', field: 'today_visits' },
                { title: 'Month Visits', field: 'month_visits' },
                { title: 'Today Sales', field: 'today_sales' },
                { title: 'Month Sales', field: 'month_sales' },
                { title: 'Sales Target', field: 'sale_target' },
                { title: 'Total Sales', field: 'salestotal' },
              ]}
              // detailPanel={[
              //   {
              //     tooltip: 'Show On Map',
              //     render: rowData => {
              //       return (
              //         <div
              //           style={{
              //             fontSize: 100,
              //             textAlign: 'center',
              //             color: 'white',
              //             backgroundColor: '#43A047',
              //           }}
              //         >
              //           <MapComponent location={{ lat: rowData.lat ? rowData.lat * 1 : 0, lng: rowData.lng ? rowData.lng * 1 : 0 }} address={rowData.address} geotimestamp={rowData.geotimestamp}/>
              //         </div>
              //       )
              //     },
              //   },

              // ]}
              // onRowClick={(event, rowData, togglePanel) => togglePanel()}
              data={query =>
                new Promise((resolve, reject) => {
                  let url = 'v1/dashboarduser?'
                    axios.get(url,
                    ).then(({data}) => {
                      console.log("fetchData: ", data);
                      if (data.success) {
                        console.log(data.data)
                        resolve({
                          data: data.data,
                          
                          totalCount: data.data ? data.data.length : 0,
                        });
                        this.tableRef.current.dataManager.changePageSize(data.data.length)
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
              title="Users Summary"
            />
          </div>
        
        <NotificationContainer />
      </div>
    );
  }
}

export default Orders;