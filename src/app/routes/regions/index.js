import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import CardBox from 'components/CardBox/index';
import MaterialTable from "material-table";
import axios from 'util/Api';
import { forwardRef } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LinearProgress from '@material-ui/core/LinearProgress';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {connect} from 'react-redux';

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
import { getCountries } from 'actions/routes';
import { truncateWithEllipsis } from '@amcharts/amcharts4/.internal/core/utils/Utils';

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

class Regions extends React.Component {
  state = {
    supervisor: ""
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
  componentDidMount () {
    this.props.getCountries()
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  refresh= () => {
    this.tableRef.current.onQueryChange();
  }
  render() {
    return (
      <div>
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title="Manage Regions"/>
        <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          options={{
            exportButton: true
          }}
          icons={tableIcons}
          columns={[
            { title: 'name', field: 'name' },
            {
              title: 'Country', field: 'country_id',
              render: (rowData) => {
                return rowData.country.name
              },
              editComponent: props => (
                <FormControl className="w-100 mb-2">
                  <InputLabel htmlFor="age-simple">country</InputLabel>
                  <Select
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                    input={<Input id="country_id"/>}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {this.props.countries_data.map((country) => {
                      return (
                        <MenuItem value={country.id}>{country.name}</MenuItem>
                      )
                    })}
                    
                  </Select>
                </FormControl>
              )
            },
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              let url = 'v1/regions?'
                url += '&page=' + (query.page + 1)
                axios.get(url,
                ).then(({data}) => {
                  console.log("fetchRegions: ", data);
                  if (data.success) {
                    console.log(data.data.current_page)
                    resolve({
                      data: data.data.data,
                      page: data.data.current_page-1,
                      totalCount: data.data.total,
                  });
                  } else {
                    this.notify("error")
                    console.log("error : "+data)
                  }
                }).catch( (error) => {
                  const response = []
                  this.notify("error")
                  console.log("Error****:", error.message);
                });
            })
        }
          title="Regions"
          editable={{
            isEditable: rowData => true, // only name(a) rows would be editable
            isDeletable: rowData => true, // only name(a) rows would be deletable
            onRowAdd: newData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log(newData)
                        axios.post('v1/regions',
                        JSON.stringify(newData)
                        ).then(({data}) => {
                          console.log("post: ", data);
                          this.refresh()
                          if (data.success) {
                            this.refresh()
                          } else {
                           
                          }
                        }).catch(function (error) {
                          console.log("Error****:", error.message);
                        });
                        {
                            /* const data = this.state.data;
                            data.push(newData);
                            this.setState({ data }, () => resolve()); */
                        }
                        resolve();
                    }, 1000);
                }),
            onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  delete newData.country
                  delete newData.created_at
                  delete newData.deleted_at
                  delete newData.updated_at
                  delete newData.structure_id
                  console.log(newData)
                    setTimeout(() => {
                      axios.put('v1/regions/'+newData.id,
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
                      axios.delete('v1/regions/'+oldData.id
                        ).then(({data}) => {
                          console.log("post: ", data);
                          resolve();
                        }).catch(function (error) {
                          console.log("Error****:", error.message);
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
    getCountries: () => dispatch(getCountries())
  }
}
const mapStateToProps = ({ routes }) => {
  const { countries_data } = routes;
  
  return { countries_data }
};

export default connect(mapStateToProps, mapDispatchToProps)(Regions);