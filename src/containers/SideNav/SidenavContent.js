import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';


class SidenavContent extends Component {
  componentDidMount() {
    const {history} = this.props;
    const that = this;
    const pathname = `${history.location.pathname}`;// get current path

    const menuLi = document.getElementsByClassName('menu');
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function (event) {

        const parentLiEle = that.closest(this, 'li');
        if(menuLi[i].classList.contains('menu') && parentLiEle !== null) {
          event.stopPropagation();

          if(menuLi[i].classList.contains('open')) {
            menuLi[i].classList.remove('open', 'active');
          } else {
            menuLi[i].classList.add('open', 'active');
          }
        } else {
          for (let j = 0; j < menuLi.length; j++) {
            const parentLi = that.closest(this, 'li');
            if (menuLi[j] !== this && (parentLi === null || !parentLi.classList.contains('open'))) {
              menuLi[j].classList.remove('open');
            } else {
              if(menuLi[j].classList.contains('open')) {
                menuLi[j].classList.remove('open');
              } else {
                menuLi[j].classList.add('open');
              }
            }
          }
        }
      }
    }

    const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {

    }
  }

  componentWillReceiveProps(nextProps) {

    const {history} = nextProps;
    const pathname = `${history.location.pathname}`;// get current path

    const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {

    }
  }

  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
        if (typeof document.body[fn] === 'function') {
          matchesFn = fn;
          return true;
        }
        return false;
      });

      let parent;

      // traverse parents
      while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
          return parent;
        }
        el = parent;
      }
    } catch (e) {

    }

    return null;
  }

  render() {
    return (
      <CustomScrollbars className="scrollbar">
        <ul className="nav-menu">

          <li className="nav-header">
            <IntlMessages id="sidebar.main"/>
          </li>
          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
              <span className="nav-text">
                <IntlMessages id="sidebar.dashboard"/>
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/eCommerce">
                                    <span className="nav-text text-transform-none"><IntlMessages
                                      id="sidebar.dashboard.sales"/></span>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="menu no-arrow">
            <NavLink to="/app/salestructure">
              <i className="zmdi zmdi-trending-down zmdi-hc-fw"/>
              <span className="nav-text"><IntlMessages id="pages.samplePage"/> </span>
            </NavLink>
          </li>
          {/* user menu */}
          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-accounts-list zmdi-hc-fw"/>
              <span className="nav-text">
                <IntlMessages id="sidebar.users"/>
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/users">
                                    <span className="nav-text text-transform-none"><IntlMessages
                                      id="sidebar.users.manage"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/roles">
                                    <span className="nav-text text-transform-none"><IntlMessages
                                      id="sidebar.users.roles"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/eCommerce">
                                    <span className="nav-text text-transform-none"><IntlMessages
                                      id="sidebar.users.permissions"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/teams">
                                    <span className="nav-text text-transform-none">Teams</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/userstracking">
                                    <span className="nav-text text-transform-none"><IntlMessages
                                      id="sidebar.users.tracking"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/eCommerce">
                                    <span className="nav-text text-transform-none"><IntlMessages
                                      id="sidebar.users.appointments"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/targets">
                                    <span className="nav-text text-transform-none">
                                      Manage User Targets
                                    </span>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="menu no-arrow">
            <NavLink to="/app/orders">
              <i className="zmdi zmdi-shopping-basket zmdi-hc-fw"/>
              <span className="nav-text">Orders </span>
            </NavLink>
          </li>
          <li className="menu no-arrow">
            <NavLink to="/app/invoices">
              <i className="zmdi zmdi-shopping-cart zmdi-hc-fw"/>
              <span className="nav-text">Invoices </span>
            </NavLink>
          </li>
          {/* client menu */}
          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-accounts-alt zmdi-hc-fw"/>
              <span className="nav-text">
                <IntlMessages id="sidebar.client"/>
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/channels">
                                    <span className="nav-text text-transform-none"><IntlMessages
                                      id="sidebar.channel.manage"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/types">
                                    <span className="nav-text text-transform-none">Types</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/distributors">
                                    <span className="nav-text text-transform-none">Distributors</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/customers">
                                    <span className="nav-text text-transform-none">Customers</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/principals">
                                    <span className="nav-text text-transform-none">Manufacturers</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/eCommerce">
                                    <span className="nav-text text-transform-none"><IntlMessages
                                      id="sidebar.client.attach"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/eCommerce">
                                    <span className="nav-text text-transform-none"><IntlMessages
                                      id="sidebar.client.map"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/eCommerce">
                                    <span className="nav-text text-transform-none"><IntlMessages
                                      id="sidebar.client.reports"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/eCommerce">
                                    <span className="nav-text text-transform-none"><IntlMessages
                                      id="sidebar.client.activitylog"/></span>
                </NavLink>
              </li>
            </ul>
          </li>
          {/* product menu */}
          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-shopping-cart-plus zmdi-hc-fw"/>
              <span className="nav-text">
                <IntlMessages id="sidebar.product"/>
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/products">
                                    <span className="nav-text text-transform-none"><IntlMessages
                                      id="sidebar.product.manage"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/categories">
                                    <span className="nav-text text-transform-none">Categories</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/product/upload">
                                    <span className="nav-text text-transform-none"><IntlMessages
                                      id="sidebar.product.upload"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/eCommerce">
                                    <span className="nav-text text-transform-none"><IntlMessages
                                      id="sidebar.product.catalogue"/></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dashboard/eCommerce">
                                    <span className="nav-text text-transform-none"><IntlMessages
                                      id="sidebar.product.edit"/></span>
                </NavLink>
              </li>
            </ul>
          </li>
          {/* merchandising menu */}
          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-bike zmdi-hc-fw"/>
              <span className="nav-text">
                Merchandizing
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/formcategories">
                                    <span className="nav-text text-transform-none">Form Categories</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/merchandising">
                                    <span className="nav-text text-transform-none">Forms</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/custom">
                                    <span className="nav-text text-transform-none">Custom</span>
                </NavLink>
              </li>
            </ul>
          </li>
          {/* routes menu */}
          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-pin-drop zmdi-hc-fw"/>
              <span className="nav-text">
                Route Management
              </span>
            </Button>
            <ul className="sub-menu">
              <li>
                <NavLink className="prepend-icon" to="/app/countries">
                                    <span className="nav-text text-transform-none">Countries</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/regions">
                                    <span className="nav-text text-transform-none">Regions</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/areas">
                                    <span className="nav-text text-transform-none">Areas</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/stockist">
                                    <span className="nav-text text-transform-none">Stockists</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/routes">
                                    <span className="nav-text text-transform-none">Routes</span>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="menu collapse-box">
            <Button>
              <i className="zmdi zmdi-view-web zmdi-hc-fw"/>
              <span className="nav-text">
                Reports
              </span>
            </Button>
            <ul className="sub-menu">
              {/* <li>
                <NavLink className="prepend-icon" to="/app/countries">
                                    <span className="nav-text text-transform-none">Product Report</span>
                </NavLink>
              </li> */}
              <li>
                <NavLink className="prepend-icon" to="/app/salebycustomer">
                                    <span className="nav-text text-transform-none">Sale By Customer Region</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/salebycustomerorder">
                                    <span className="nav-text text-transform-none">Sale By Customer Region Orders</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/salebyproduct">
                                    <span className="nav-text text-transform-none">Sale By Product</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/clockins">
                                    <span className="nav-text text-transform-none">Clockins</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/outletvisits">
                                    <span className="nav-text text-transform-none">Outlet Visits</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/dailysales">
                                    <span className="nav-text text-transform-none">Daily Sales</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="prepend-icon" to="/app/coverage">
                                    <span className="nav-text text-transform-none">Coverage</span>
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </CustomScrollbars>
    );
  }
}

export default withRouter(SidenavContent);
