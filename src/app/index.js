import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from 'components/Header/index';
import Sidebar from 'containers/SideNav/index';
import Footer from 'components/Footer';
import Tour from '../components/Tour/index';
import Dashboard from './routes/dashboard';
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from 'constants/ActionTypes';
import {isIOS, isMobile} from 'react-device-detect';
import asyncComponent from '../util/asyncComponent';
import TopNav from 'components/TopNav';
import FormContainer from "../containers/builder/FormContainer";

class App extends React.Component {

  render() {
    const {match, drawerType, navigationStyle, horizontalNavPosition} = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'fixed-drawer' : drawerType.includes(COLLAPSED_DRAWER) ? 'collapsible-drawer' : 'mini-drawer';
    //set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add('ios-mobile-view-height')
    }
    else if (document.body.classList.contains('ios-mobile-view-height')) {
      document.body.classList.remove('ios-mobile-view-height')
    }

    return (
      <div className={`app-container ${drawerStyle}`}>
        <Tour/>

        <Sidebar/>
        <div className="app-main-container">
          <div
            className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION ? 'app-header-horizontal' : ''}`}>
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER) &&
            <TopNav styleName="app-top-header"/>}
            <Header/>
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) &&
            <TopNav/>}
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Switch>
                  <Route path={`${match.url}/dashboard`} component={Dashboard}/>
                  <Route path={`${match.url}/salestructure`}
                         component={asyncComponent(() => import('./routes/SaleStructure'))}/>
                  <Route path={`${match.url}/channels`}
                         component={asyncComponent(() => import('./routes/channels'))}/>
                  <Route path={`${match.url}/types`}
                         component={asyncComponent(() => import('./routes/types'))}/>
                  <Route path={`${match.url}/distributors`}
                         component={asyncComponent(() => import('./routes/distributors'))}/>
                  <Route path={`${match.url}/customers`}
                         component={asyncComponent(() => import('./routes/customers'))}/>
                  <Route path={`${match.url}/orders`}
                         component={asyncComponent(() => import('./routes/orders'))}/>
                  <Route path={`${match.url}/invoices`}
                         component={asyncComponent(() => import('./routes/invoices'))}/>
                  <Route path={`${match.url}/products`}
                         component={asyncComponent(() => import('./routes/products'))}/>
                  <Route path={`${match.url}/product/upload`}
                         component={asyncComponent(() => import('./routes/products/BatchUpload'))}/>
                  <Route path={`${match.url}/users`}
                         component={asyncComponent(() => import('./routes/users'))}/>
                  <Route path={`${match.url}/userstracking`}
                         component={asyncComponent(() => import('./routes/usertracking'))}/>
                  <Route path={`${match.url}/roles`}
                         component={asyncComponent(() => import('./routes/roles'))}/>
                  <Route path={`${match.url}/teams`}
                         component={asyncComponent(() => import('./routes/teams'))}/>       
                  <Route path={`${match.url}/merchandising`}
                         component={asyncComponent(() => import('./routes/merchandising'))}/>
                  <Route path={`${match.url}/principals`}
                         component={asyncComponent(() => import('./routes/principals'))}/>
                  <Route path={`${match.url}/formcategories`}
                         component={asyncComponent(() => import('../app/routes/merchandising/formcategory'))}/>
                  <Route path={`${match.url}/formbuilder`}
                         component={asyncComponent(() => import('../app/routes/merchandising/formbuilder'))}/>
                  <Route path={`${match.url}/countries`}
                         component={asyncComponent(() => import('./routes/countries'))}/>
                  <Route path={`${match.url}/regions`}
                         component={asyncComponent(() => import('./routes/regions'))}/>
                  <Route path={`${match.url}/routes`}
                         component={asyncComponent(() => import('./routes/routes'))}/>
                  <Route path={`${match.url}/towns`}
                         component={asyncComponent(() => import('./routes/towns'))}/>
                  <Route path={`${match.url}/areas`}
                         component={asyncComponent(() => import('./routes/areas'))}/>
                  <Route path={`${match.url}/stockist`}
                         component={asyncComponent(() => import('./routes/stockist'))}/>
                  <Route path={`${match.url}/salebycustomer`}
                         component={asyncComponent(() => import('./routes/reports/salebycustomerregion'))}/>
                  <Route path={`${match.url}/salebyproduct`}
                         component={asyncComponent(() => import('./routes/reports/salebyproduct'))}/>
                  <Route path={`${match.url}/clockins`}
                         component={asyncComponent(() => import('./routes/reports/clockins'))}/>
                  <Route path={`${match.url}/targets`}
                         component={asyncComponent(() => import('./routes/user_targets'))}/>
                  <Route path={`${match.url}/categories`}
                         component={asyncComponent(() => import('./routes/categories'))}/>
                  <Route path={`${match.url}/outletvisits`}
                         component={asyncComponent(() => import('./routes/reports/outlet_visits'))}/>
                  <Route path={`${match.url}/custom`}
                         component={asyncComponent(() => import('./routes/merchandising/custom'))}/>
                  <Route path={`${match.url}/stockist`}
                         component={asyncComponent(() => import('./routes/stockist'))}/>
                  <Route path={`${match.url}/salebycustomerorder`}
                         component={asyncComponent(() => import('./routes/reports/salebycustomerregionorder'))}/>
                  <Route path={`${match.url}/dailysales`}
                         component={asyncComponent(() => import('./routes/reports/dailysales'))}/>
              <Route path={`${match.url}/coverage`}
                         component={asyncComponent(() => import('./routes/reports/coverage'))}/>


                <Route component={asyncComponent(() => import('components/Error404'))}/>
              </Switch>
            </div>
            <Footer/>
          </main>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({settings}) => {
  const {drawerType, navigationStyle, horizontalNavPosition} = settings;
  return {drawerType, navigationStyle, horizontalNavPosition}
};
export default withRouter(connect(mapStateToProps)(App));