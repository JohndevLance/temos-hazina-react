import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import CardBox from 'components/CardBox/index';
import MaterialTable from "material-table";
import axios from 'util/Api';
import { forwardRef } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {Badge} from 'reactstrap';
import { getRoutes } from '../../../actions/routes'

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
import UserDialog from './UserDialog';
import Routes from './Routes';
import UserTarget from './UserTarget';
import Target from './Target';
import MapComponent from './Map';
import Button from '@material-ui/core/Button';
import { APIKEY } from 'constants/ActionTypes';
import {connect} from 'react-redux';

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

class Users extends React.Component {
  state = {
    anchorEl: undefined,
    open: false,
    opendialog : false,
    edit : false,
    openuserdialog : false,
    opensalesreps : false,
    routesopen : false,
    routeuser : null,
    usertargetopen : false,
    targetsopen: false,
    targets:[]
  };
  tableRef = React.createRef();
  componentDidMount() {
    // this.loadJS('https://maps.googleapis.com/maps/api/js?key='+APIKEY+'&v=3.exp&libraries=geometry,drawing,places')
    this.props.getRoutes()
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
  onUserDialogClose = (value) => {
    this.setState({openuserdialog : false})
  }
  onRoutesClose = (value) => {
    this.setState({routesopen : false})
  }
  onUserTargetClose = (value) => {
    this.setState({usertargetopen : false})
  }
  onTargetsClose = (value) => {
    this.setState({targetsopen : false})
  }
  refresh= () => {
    this.tableRef.current.onQueryChange();
  }
  handleAssignRoute= (user_id) => {
    this.setState({routeuser : user_id, routesopen : true})
  }
  handleAssignTarget= (user_id) => {
    this.setState({target_user : user_id, usertargetopen : true})
  }
  handleViewTarget= (targets) => {
    this.setState({targets : targets, targetsopen : true})
  }
  render() {
    return (
      <div>
      <div className="app-wrapper">
      
        <UserDialog open={this.state.openuserdialog} edit={this.state.edit} onClose={ this.onUserDialogClose } refresh={this.refresh} structure_id={this.props.location.state ? this.props.location.state.structure_id : null}/>
        <Routes open={this.state.routesopen} onClose={ this.onRoutesClose } refresh={this.refresh} routes={this.props.routes_data} user_id={this.state.routeuser}/>
        <UserTarget open={this.state.usertargetopen} onClose={ this.onUserTargetClose } refresh={this.refresh} user_id={this.state.target_user}/>
        <Target open={this.state.targetsopen} onClose={ this.onTargetsClose } refresh={this.refresh} targets={this.state.targets} user_id={this.state.routeuser}/>
        <Button
          aria-owns={this.state.open ? 'simple-SidenavContent.js' : null}
          aria-haspopup
          onClick={() => { this.setState({openuserdialog : true}) }}
          variant="contained" 
          color="primary" 
          className="jr-btn bg-purple text-white"
        >New User</Button>
        <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          tableRef={this.tableRef}
          options={{
            exportButton: true
          }}
          
          icons={tableIcons}
          columns={[
            { title: 'First Name', field: 'first_name' },
            { title: 'Last Name', field: 'last_name' },
            { title: 'Email', field: 'email' },
            { title: 'User Name', field: 'username' },
            {
              field: 'roles',
              title: 'Roles',
              render: (rowData) => {
                return (
                rowData.roles.map((role) => {
                return <Badge key={role.id} color="success">{role.name}</Badge>
                })
                )
              } 
            },
            {
              field: 'route',
              title: 'Assign Route',
              render: (rowData) => {
                return (
                  <Button
                  aria-haspopup
                  onClick={() => this.handleAssignRoute(rowData.id)}
                  variant="outlined" 
                  color="primary"
                  size="small"
                  >{rowData.route ? rowData.route.name : "Assign Route"}</Button>
                )
              } 
            },
            {
              field: 'route',
              title: 'Routes',
              render: (rowData) => {
                console.log(rowData)
                return (
                  <p>{rowData.user_route.map((route_user) => {
                    return <span>{route_user.route ? route_user.route.name : ''},</span>
                  })}</p>
                )}
            },
            {
              field: 'target',
              title: 'Assign target',
              render: (rowData) => {
                return (
                  <Button
                  aria-haspopup
                  onClick={() => this.handleAssignTarget(rowData.id)}
                  variant="contained" 
                  color="primary"
                  size="small"
                  >{"Assign Target"}</Button>
                )
              } 
            },
            {
              field: 'target',
              title: 'Targets',
              render: (rowData) => {
                return (
                  <Button
                  aria-haspopup
                  onClick={() => this.handleViewTarget(rowData.target)}
                  variant="contained" 
                  color="secondary"
                  size="small"
                  >{"View Targets"}</Button>
                )
              } 
            },
            { title: 'Created at', field: 'created_at' }
          ]}
          
          data={query =>
            new Promise((resolve, reject) => {
              let url = 'v1/users?'
                url += '&page=' + (query.page + 1)
                console.log(url)
                axios.get(url,
                ).then(({data}) => {
                  console.log("fetchCustomers: ", data);
                  if (data.success) {
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
          title="Users"
          editable={{
            isEditable: rowData => true, // only name(a) rows would be editable
            isDeletable: rowData => true, // only name(a) rows would be deletable
            
            onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  console.log(newData)
                    setTimeout(() => {
                      axios.patch('v1/users/'+newData.id,
                        newData
                        ).then(({data}) => {
                          console.log("post: ", data);
                          if (data.success) {
                            const data = this.state.data;
                            data.push(data.data);
                            this.setState({ data }, () => resolve());
                          } else {
                           
                          }
                        }).catch(function (error) {
                          console.log("Error****:", error.message);
                        });
                        {
                            /* const data = this.state.data;
                            const index = data.indexOf(oldData);
                            data[index] = newData;                
                            this.setState({ data }, () => resolve()); */
                        }
                        resolve();
                    }, 1000);
                }),
            onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                      axios.delete('v1/users/'+oldData.id
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

const mapDispatchToProps = dispatch => {
  return {
    getRoutes: () => dispatch(getRoutes())
  }
}
const mapStateToProps = ({ routes }) => {
  const { routes_data } = routes;
  
  return { routes_data }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);