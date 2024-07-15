import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import Settings from './Settings';
import Auth from './Auth';
import Common from './Common';
import SaleStructure from './SaleStructure';
import categories from './categories';
import channels from './channels';
import customers from './customers';
import salesreps from './salesreps';
import products from './products';
import roles from './roles';
import permissions from './permissions';
import types from './types';
import forms from "./forms";
import principals from "./principals";
import formcategories from "./formcategories";
import routes from "./routes";
import teams from './teams';
import regions from './regions';

export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  auth: Auth,
  commonData: Common,
  salestructure: SaleStructure,
  categories : categories,
  channels : channels,
  salesreps : salesreps,
  products :products,
  customers : customers,
  roles : roles,
  permissions : permissions,
  types : types,
  forms : forms,
  principals : principals,
  formcategories : formcategories,
  routes : routes,
  teams : teams,
  regions: regions
});
