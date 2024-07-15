import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis} from 'recharts';
import Widget from "components/Widget";
import axios from 'util/Api';

import ContainerHeader from 'components/ContainerHeader/index';
import SalesStatistic from 'components/dashboard/eCommerce/SalesStatistic';
import CardMenu from 'components/dashboard/Common/CardMenu';
import IntlMessages from 'util/IntlMessages';
import UserSummary from './clockins'

import './../../routes/Misc/test.css'


class ECommerce extends React.Component {

  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      menuState: false,
      dashboard_data: null
    }
  }
  onOptionMenuSelect = event => {
    this.setState({menuState: true, anchorEl: event.currentTarget});
  };

  handleRequestClose = () => {
    this.setState({menuState: false});
  };
  componentDidMount() {
      axios.get('v1/dashboarddata',
      ).then(({data}) => {
        console.log("fetchDashboard: ", data);
        if (data.success) {
          console.log(data.data)
          this.setState({dashboard_data : data.data})
        } else {
          console.log("error : "+data)
        }
      }).catch((error) => {
        const response = []
        
        console.log("Error****:", error.message);
      });
  }
  format(number){
    return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }
  render() {
    const {anchorEl, menuState} = this.state;
    return (
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <ContainerHeader match={this.props.match} title={<IntlMessages id="sidebar.dashboard.sales"/>}/>

        <div className="row">
          <div className="col-lg-3 col-sm-6 col-12">
            <Widget title="Todays Visits" styleName="jr-card-metrics p-4 bg-gradient-primary text-white">
            <div className="row no-gutters align-items-xl-end">
                <h3 className="mb-1 jr-fs-xxl jr-font-weight-bold no-wrap">Ksh {this.state.dashboard_data ? this.format(this.state.dashboard_data.today_visits) : '-'}</h3>
                
            </div>
            </Widget>
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
          <Widget title="Month Visits" styleName="jr-card-metrics p-4 bg-secondary text-white">
            <div className="row no-gutters align-items-xl-end">
              
                <h3 className="mb-1 jr-fs-xxl jr-font-weight-bold">Ksh {this.state.dashboard_data ? this.format(this.state.dashboard_data.month_visits) : '-'}</h3>
                
            </div>
            </Widget>
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
          <Widget title="Todays Sales" styleName="jr-card-metrics p-4 bg-success text-white">
            <div className="row no-gutters align-items-xl-end">
              
                <h3 className="mb-1 jr-fs-xxl jr-font-weight-bold">Ksh {this.state.dashboard_data ? this.format(this.state.dashboard_data.today_sales) : '-'}</h3>
                
            </div>
            </Widget>
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
          <Widget title="Month Sales" styleName="jr-card-metrics p-4 bg-warning text-white">
            <div className="row no-gutters align-items-xl-end">
              
                <h3 className="mb-1 jr-fs-xxl jr-font-weight-bold">Ksh {this.state.dashboard_data ? this.format(this.state.dashboard_data.month_sales) : '-'}</h3>
              
            </div>
            </Widget>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <SalesStatistic/>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <UserSummary/>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-xl-5 col-12">
            <div className="row">
              <div className="col-xl-12 col-sm-6">
                <HorizontalItemCard
                  styleTitle="mb-4"
                  styleName="p-4"
                  title="This Year Sale Report"
                  price="Ksh 685K+"
                  detail="Post 9 month data"
                  chartPosition="align-self-end"
                >
                  <ResponsiveContainer width="100%" height={100}>
                    <BarChart data={chartDataWithoutAxis}>
                      <Bar dataKey='amt' fill='#3f51b5' maxBarSize={10}/>
                      <XAxis stroke="#3f51b5" dataKey="name"/>
                    </BarChart>
                  </ResponsiveContainer>
                </HorizontalItemCard>
              </div>

              <div className="col-xl-12 col-sm-6">
                <HorizontalItemCard
                  styleTitle="mb-4"
                  styleName="p-4"
                  title={<IntlMessages id="dashboard.yearlyProfit"/>}
                  price="Ksh 125K+"
                  detail={<IntlMessages id="dashboard.post9MonthData"/>}>
                  <YearlyProfitChart
                    shadowColor={'rgba(0,188,212,0.8)'}
                    centerText="20k"
                    textColor="#999999"
                    height={120}
                    chartType="customDoughnut"
                    backgroundColor={['#F44336', '#00BCD4']}
                    borderColor={['#F44336', '#00BCD4']}
                    hoverBorderColor={['#F44336', '#00BCD4']}
                    hoverBorderWidth={[8, 2]}
                    rotation={220}/>
                </HorizontalItemCard>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-8 col-md-7 col-12">
            <div className="jr-card jr-full-card">
              <CardHeader heading={<IntlMessages id="dashboard.newCustomers"/>}
                          subHeading={<IntlMessages id="dashboard.newThisMonth"/>}/>

              <UserDetailTable data={customers}/>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-md-5 col-12">
            <ProductImage/>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-8 col-12">
            <div className="jr-card">
              <div className="jr-card-header d-flex align-items-center">
                <div className="mr-auto">
                  <h3 className="d-inline-block mb-0"><IntlMessages id="table.recentOrders"/></h3>
                  <span className="text-white badge badge-success"><IntlMessages id="table.thisWeek"/></span>
                </div>
                <IconButton className="icon-btn" onClick={this.onOptionMenuSelect.bind(this)}>
                  <i className="zmdi zmdi-chevron-down"/>
                </IconButton>
              </div>
              <OrderTable/>
            </div>
          </div>

          <div className="col-xl-4 col-12">
            <div className="jr-card jr-full-card">
              <div className="jr-card-header d-flex align-items-center mb-3">
                <h3 className="card-heading mb-0"><i
                  className="zmdi zmdi-chart-donut zmdi-hc-fw text-primary text-lighten-2 mr-2"/>
                  <IntlMessages id="dashboard.marketingCampaign"/>
                </h3>
                <span className="badge badge-primary ml-auto">Today</span>
              </div>
              <MarketingTable data={marketingData}/>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-8 col-lg-12 order-xl-2">
            <div className="jr-card">
              <CardHeader heading={<IntlMessages id="dashboard.popularProducts"/>}
                          subHeading={<IntlMessages id="dashboard.loremIpsum"/>} styleName="mb-4"/>

              <div className="row">
                {products.map((product, index) => <PopularProduct key={index} product={product}/>)}
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-7 order-xl-1">
            <LatestNotifications appNotification={appNotification}
                                 announcementsNotification={announcementsNotification}/>
          </div>

          <div className="col-xl-3 col-md-5 col-12 order-xl-5">
            <div className="jr-card">
              <div className="jr-card-header">
                <h3 className="card-heading"><IntlMessages id="dashboard.browser"/></h3>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <div>
                  {browserList.map((browser, index) => {
                    return (
                      <BrowserCell key={browser.id} browser={browser}/>
                    );
                  })}
                </div>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-xl-3 col-md-4 col-12 order-xl-3">
            <div className="jr-card">
              <div className="jr-card-header">
                <h3 className="card-heading"><IntlMessages id="dashboard.cartItems"/></h3>
              </div>
              <ResponsiveContainer width="100%">
                <RadarChart/>
              </ResponsiveContainer>
              <div className="d-flex justify-content-center mt-3">
                <div className="mr-4"><span
                  className="size-10 bg-primary lighten-1 rounded-circle d-inline-block mr-1"/> Orderd
                </div>
                <div><span className="size-10 bg-red lighten-1 rounded-circle d-inline-block mr-1"/> Pending</div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-4 col-sm-6 col-12 order-xl-4">
            <div className="jr-card">
              <div className="jr-card-header">
                <h3 className="card-heading"><IntlMessages id="dashboard.traffic"/></h3>
              </div>
              <ResponsiveContainer width="100%">
                <div className="d-flex justify-content-center" style={{width: "100%", height: "150px"}}>
                  <ReactSpeedometer
                    value={333}
                    fluidWidth
                    needleHeightRatio={0.4}
                    ringWidth={40}
                    segments={4}
                    needleTransitionDuration={4000}
                    needleTransition="easeElastic"/>
                </div>
              </ResponsiveContainer>
              <div className="text-center mt-4">
                <h4 className="mb-1">333s User online</h4>
                <p className="card-text">Moderate Level</p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-4 col-sm-6 col-12 order-xl-6">
            <div className="jr-card">
              <div className="jr-card-header">
                <h3 className="card-heading"><IntlMessages id="dashboard.application"/></h3>
              </div>
              <ResponsiveContainer width="100%">
                <DoughnutChart/>
              </ResponsiveContainer>

              <div className="row">
                <div className="col-6">
                  <div className="media">
                    <i className="zmdi zmdi-android zmdi-hc-fw mr-2 text-success"/>
                    <div className="media-body">
                      <h5 className="mb-0">Android</h5>
                      <span className="jr-fs-sm text-muted">14,500 User</span>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="media">
                    <i className="zmdi zmdi-apple zmdi-hc-fw mr-2 text-warning"/>
                    <div className="media-body">
                      <h5 className="mb-0">iOS</h5>
                      <span className="jr-fs-sm text-muted">9,800 User</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <CardBox styleName="col-12" heading="Site Visitors Statistics" headingStyle="mb-1">
            <SiteVisitor/>
          </CardBox>
        </div> */}

        <CardMenu menuState={menuState} anchorEl={anchorEl}
                  handleRequestClose={this.handleRequestClose.bind(this)}/>
      </div>
    );
  }
}

export default ECommerce;