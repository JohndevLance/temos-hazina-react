import React from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'util/Api';
import CircularProgress from "components/CircularProgress/index";
import Snackbar from '@material-ui/core/Snackbar';

class DatatablePage extends React.Component{
  constructor(props){
      super(props)
      this.state = {
          loading:true,
          error : false
      }
      this.tableData = {
        columns: [
            {
              label: 'Customer Name',
              field: 'name',
              sort: 'asc',
              width: 150
            },
            {
              label: 'Structure',
              field: 'structure',
              sort: 'asc',
              width: 270
            },
            {
              label: 'Channel',
              field: 'channel',
              sort: 'asc',
              width: 270
            },
            {
              label: 'Phone Number',
              field: 'phone_number',
              sort: 'asc',
              width: 200
            },
            {
              label: 'product_name',
              field: 'product_name',
              sort: 'asc',
              width: 100
            },
            {
              label: 'Quantity',
              field: 'qty',
              sort: 'asc',
              width: 150
            },
            {
              label: 'Total',
              field: 'total',
              sort: 'asc',
              width: 100
            }
          ],
          rows: [
            
          ]
        }//end data
  }
  componentDidMount(){
    this.getSalesByCustomer()
  }
  getSalesByCustomer(){
    axios.get('v1/report/salebycustomer',
      ).then(({data}) => {
        console.log("fetchDatas: ", data);
        if (data.success) {
          console.log(data.data)
          // Create a new array based on current state:
        this.tableData.rows = data.data;
        console.log(this.tableData)
        this.setState({loading : false})
        } else {
          // this.notify("error")
          console.log("error : "+data)
        }
      }).catch((error) => {
        const response = []
        this.setState({loading : false, error : true})
        console.log("Error****:", error.message);
      });
  }
  
  render = () => {
  return (
    <div>
        {this.stateloading && <div className="loader-view">
          <CircularProgress/>
        </div>}
   {!this.state.loading&&
    <MDBDataTable
      striped
      bordered
      hover
      data={this.tableData}
    />
   }
   <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          open={this.state.error}
          autoHideDuration={3000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">An error occured</span>}
        />
    </div>
  );
}
}

export default DatatablePage;