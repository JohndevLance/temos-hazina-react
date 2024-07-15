import React from 'react';
import {connect} from 'react-redux';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import Tree from 'react-d3-tree';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import clone from 'clone';
import {getStructure, addChild, editChild} from 'actions/sale_structure';
import {getCategories, addCategory, editCategory } from 'actions/categories';
import {getChannels} from 'actions/channels';
import {getTeams} from 'actions/teams';
import {refreshTree} from 'actions/sale_structure';
import {getReps, attachRep} from 'actions/salesreps';
import InfoView from 'components/InfoView';
import FormDialog from './FormDialog';
import ProductDialog from './ProductDialog';
import CategoryDialog from './CategoryDialog';
import SalesRepDialog from './salesRepDialog';
import SimpleDialog from './simple/SimpleDialog';
import TeamDialog from './TeamDialog';
import Teams from './simple/Teams';
import ViewUsers from './simple/ViewUsers';
import axios from '../../../util/Api';
import RestoreIcon from '@material-ui/icons/Restore';
import UnitTarget from './UnitTarget';

const containerStyles = {
  width: '100%',
  height: '100vh',
}

class NodeLabel extends React.PureComponent {
  state = {
    anchorEl: undefined,
    open: false,
    opendialog : false,
    edit : false,
    openproductdialog : false,
    opencategorydialog : false,
    openteamsdialog : false,
    opensalesrepdialog : false,
    opensalesreps : false,
    openteams : false,
    opentarget : false
  };

  handleClick = event => {
    event.preventDefault();
    this.setState({open: true, anchorEl: event.currentTarget});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };
  /*Subfunction with conditional rule for expanding children*/
  handleNodeClick = (nodeData, event) => {
    console.log("handle node click")
    if (event.button == 2) {
      this.handleClick(event)
      return false;
    }
    const myRef = this.props.tree;
    const data = clone(myRef.state.data);
    
    const nodeId = this.props.nodeData.id
    const matches = myRef.findNodesById(nodeId, data, []);
    const targetNode = matches[0];

    this.expandChildren(targetNode, myRef, data)
  }
    /*Function to expand the children*/
    expandChildren = (targetNode, myRef, data) => {
      myRef.setState({ data, isTransitioning: true });
        if(targetNode._collapsed){
          if(targetNode.hasOwnProperty('_children')&&targetNode._children.length>0){
            myRef.expandNodeCustom(targetNode)
          }
         
        }else{
          myRef.collapseNodeCustom(targetNode)
        }
  
        myRef.setState({ data, isTransitioning: true });
  
        setTimeout(
            () => myRef.setState({ isTransitioning: false }),
            myRef.props.transitionDuration + 10,
        );
        myRef.internalState.targetNode = targetNode;
    }
  handleAddChild = () => {
    this.handleRequestClose();
    this.setState({opendialog: true});
  };
  handleEditChild = () => {
    this.handleRequestClose();
    this.setState({opendialog: true, edit : true});
  };
  onDialogClick = (value, text) => {
    this.setState({opendialog : false})
    if(value == "submit"){
      if(text ==""){
        return;
      }
      let data = { title : text, parent_id : this.props.nodeData.cat_id}
      this.props.addChild(data)
    }
    if(value == "edit"){
      if(text ==""){
        return;
      }
      this.props.editChild(this.props.nodeData.cat_id, text)
    }
  }
  handleAddCategory = () => {
    this.handleRequestCategoryClose();
    this.setState({opencategorydialog: true});
  };
  handleRequestCategoryClose = () => {
    this.handleRequestClose();
    this.setState({opencategorydialog: false});
  };
  onCategoryDialogClick = (value, text) => {
    this.setState({opencategorydialog : false})
    if(value == "submit"){
      if(text ==""){
        return;
      }
      let data = { name : text, structure_id : this.props.nodeData.cat_id }
      this.props.addCategory(data)
    }
    if(value == "edit"){
      if(text ==""){
        return;
      }
      this.props.editCategory(this.props.nodeData.cat_id, text)
    }
  }
  handleAddProduct = () => {
    this.handleRequestClose();
    this.setState({openproductdialog: true});
  };
  onProductDialogClose = (value) => {
    this.setState({openproductdialog : false})
  }
  handleAddSalesRep = () => {
    this.handleRequestClose();
    this.setState({opensalesrepdialog: true});
  };
  handleOpenTeams = () => {
    this.handleRequestClose();
    this.setState({openteams: true});
  };
  handleOpenTargets = () => {
    this.handleRequestClose();
    this.setState({opentarget: true});
  };
  onTargetsClose = () => {
    this.setState({opentarget : false})
  }
  handleAddBackendUser = () => {
    this.handleRequestClose();
    this.props.history.push({pathname: "/app/users", state: { structure_id: this.props.nodeData.cat_id }});
  };
  handleAddTeam = () => {
    this.handleRequestClose();
    this.setState({openteamsdialog: true});
  };
  onTeamDialogClose = (value) => {
    this.setState({openteamsdialog : false})
  }
  onSalesDialogClose = (value) => {
    this.setState({opensalesrepdialog : false})
  }
  onTeamsClose = (value) => {
    this.setState({openteams : false})
  }
  handleAttachSalesRep = () => {
    this.handleRequestClose();
    this.setState({opensalesreps: true});
  };
  onSalesRepsDialogClose = (value) => {
    this.setState({opensalesreps : false})
  }
  attachRep = (id, structure_id) => {
    console.log(id, structure_id)
    this.setState({opensalesreps : false})
    this.props.attachRep(id, structure_id)
  }
  handleViewUsers = () => {
    this.handleRequestClose();
    this.setState({openusersdialog: true});
  };
  onUsersDialogClose = (value) => {
    this.setState({openusersdialog : false})
  }
  handleViewProducts = () => {
    this.props.history.push('/app/products');
  };
  handleViewChannels = () => {
    this.props.history.push('/app/channels');
  };
  loginToSalesUnit = (structure_id) => {
    console.log(structure_id)
    axios.get('v1/sale_structure/login?structure_id='+structure_id,
    ).then(({data}) => {
      // console.log("loginToSalesUnit: ", data);
      if (data.success) {
       this.props.refreshTree()
       this.handleRequestClose();
      } else {
       
      }
    }).catch((error) => {
      console.log(JSON.stringify(error))
      console.log("Error****:", error.message);
    });   
  }
  render() {
    const {className, nodeData} = this.props
    const hasplusicon = (nodeData.hasOwnProperty('_children')&&nodeData._children.length)
    return (
      <div className={className}>
        <Button
          aria-owns={this.state.open ? 'simple-SidenavContent.js' : null}
          aria-haspopup
          onClick={(event) => { console.log(event)
            this.handleNodeClick(nodeData, event) }}
          variant="contained" 
          color="primary" 
          className="jr-btn bg-purple text-white"
        >
          {hasplusicon && <i className="zmdi zmdi-plus-square zmdi-hc-fw zmdi-hc-lg"/>}
          {nodeData.name}
        </Button>
        <Button
          aria-owns={this.state.open ? 'simple-SidenavContent.js' : null}
          aria-haspopup
          variant="contained"
          onClick = {(event) => this.handleClick(event)} 
          color="primary" 
          className="jr-btn bg-orange text-white"
        >
          <i className="zmdi zmdi-more zmdi-hc-fw zmdi-hc-lg"/>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleRequestClose}
        >
          <MenuItem onClick={this.handleAddChild}><i className="zmdi zmdi-plus-square zmdi-hc-fw zmdi-hc-lg"/>{" "}Add Unit</MenuItem>
          <MenuItem onClick={this.handleEditChild}><i className="zmdi zmdi-border-color zmdi-hc-fw zmdi-hc-lg"/>{" "}Edit Unit</MenuItem>
          <MenuItem onClick={this.handleAddBackendUser}>
          <i className="zmdi zmdi-account-circle zmdi-hc-fw zmdi-hc-lg"/>
          {" "}Add Backend User</MenuItem>
          {/* <MenuItem onClick={this.handleAddTeam}>
          <i className="zmdi zmdi-accounts-alt zmdi-hc-fw zmdi-hc-lg"/>
          {" "}Add Team</MenuItem> */}
          <MenuItem onClick={this.handleAddSalesRep}>
          <i className="zmdi zmdi-account-box zmdi-hc-fw zmdi-hc-lg"/>
          {" "}Add Rep</MenuItem>
          {/* <MenuItem onClick={this.handleAttachSalesRep}>
          <i className="zmdi zmdi-account-add zmdi-hc-fw zmdi-hc-lg"/>
          {" "}Attach Sales Rep</MenuItem> */}
          <MenuItem onClick={this.handleViewUsers}>
          <i className="zmdi zmdi-format-align-justify zmdi-hc-fw zmdi-hc-lg"/>
          {" "}View Users</MenuItem>
          {/* <MenuItem onClick={this.handleOpenTeams}>
          <i className="zmdi zmdi-format-list-numbered zmdi-hc-fw zmdi-hc-lg"/>
          {" "}Teams</MenuItem>
          <MenuItem onClick={this.handleOpenTargets}>
          <i className="zmdi zmdi-chart zmdi-hc-fw zmdi-hc-lg"/>
          {" "}Add Target</MenuItem> */}
          <MenuItem onClick={() => this.loginToSalesUnit(nodeData.cat_id)}><i className="zmdi zmdi-lock-open zmdi-hc-fw zmdi-hc-lg"/>Login to Sales Unit</MenuItem>
        </Menu>
        <FormDialog open={this.state.opendialog} edit={this.state.edit} onClick={ this.onDialogClick } />
        <CategoryDialog open={this.state.opencategorydialog} edit={this.state.editcategory} onClick={ this.onCategoryDialogClick } />
        <TeamDialog open={this.state.openteamsdialog}  onClick={ this.onCategoryDialogClick } onClose={ this.onTeamDialogClose }  structure_id = {nodeData.cat_id}/>
        <ProductDialog open={this.state.openproductdialog} edit={this.state.edit} onClose={ this.onProductDialogClose } structure_id = {nodeData.cat_id}/>
        <SalesRepDialog open={this.state.opensalesrepdialog} edit={this.state.edit} onClose={ this.onSalesDialogClose } structure_id = {nodeData.cat_id}/>
        <ViewUsers open={this.state.openusersdialog} onClose={ this.onUsersDialogClose } structure_id = {nodeData.cat_id}/>
        <SimpleDialog users={this.props.salesreps}
                      selectedValue={this.state.selectedValue}
                      open={this.state.opensalesreps}
                      onClose={this.onSalesRepsDialogClose.bind(this)}
                      attachRep = {this.attachRep}
                      structure_id = {nodeData.cat_id}
        />
        <Teams users={this.props.salesreps}
                      open={this.state.openteams}
                      onClose={this.onTeamsClose.bind(this)}
                      structure_id = {nodeData.cat_id}
                      users={this.props.salesreps}
                      attachRep = {this.attachRep.bind(this)}
                      teams={this.props.teams_data ? this.props.teams_data.filter((team) => {
                        console.log(team.structure_id===nodeData.cat_id)
                        return team.structure_id===nodeData.cat_id
                      }) : []}
        />
        <UnitTarget open={this.state.opentarget} onClose={this.onTargetsClose} structure_id={nodeData.cat_id}/>
      </div>
    )
  }
}

class SamplePage extends React.Component {
  state = {
    data: [{
      name: '.......Loading sale structure',
      children: [],
    }],
    ready: false
  }

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 7,
        y: dimensions.height / 3
      }
    });
    this.props.getStructure()
    this.props.getReps()
    }
    componentWillReceiveProps(nextProps){
      if(nextProps.data.length){
        this.setState({ data : nextProps.data, ready : true})
      }
      if(nextProps.refresh){
        this.props.getStructure()
        this.props.getReps()
          }
    }
    resetLoginToSalesUnit = (structure_id) => {
      axios.get('v1/sale_structure/loginreset'
      ).then(({data}) => {
        console.log("loginToSalesUnitReset: ", data);
        if (data.success) {
         this.props.refreshTree()
        } else {
         
        }
      }).catch((error) => {
        console.log(JSON.stringify(error))
        console.log("Error****:", error.message);
      });   
    }
  render() {
    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.samplePage"/>}/>
        <button className="btn btn-default" type="button" onClick={() => this.resetLoginToSalesUnit()}>
                  <RestoreIcon/>
                  Reset Login to Sales Unit
        </button>
        <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
  
          <Tree 
          translate={this.state.translate}
          data={this.state.data}
          collapsible={false}
          pathFunc = "diagonal"
          ref={t => (this.tree = t)}
          // onLinkClick={() => {console.log("link clicked")}} 
          allowForeignObjects
          nodeLabelComponent={{
            render: <NodeLabel className='myLabelComponentInSvg' tree={this.tree} addChild = {this.props.addChild} editChild = {this.props.editChild} addCategory = {this.props.addCategory} editCategory = {this.props.editCategory} refreshTree={this.props.refreshTree} salesreps = {this.props.salesrepdata} attachRep={this.props.attachRep} history={this.props.history} teams_data={this.props.teams_data}/>,
            foreignObjectWrapper: {
              y: -15,
              x: -15,
              width : 150
            }
          }}
          />
        
        </div>
        <InfoView/>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    getStructure: () => dispatch(getStructure()),
    addChild: (data) => dispatch(addChild(data)),
    editChild: (id, title) => dispatch(editChild(id, title)),
    getCategories: () => dispatch(getCategories()),
    addCategory: (data) => dispatch(addCategory(data)),
    editCategory: (id, title) => dispatch(editCategory(id, title)),
    getChannels: () => dispatch(getChannels()),
    getReps: () => dispatch(getReps()),
    getTeams: () => dispatch(getTeams()),
    refreshTree: () => dispatch(refreshTree()),
    attachRep: (id, structure_id) => dispatch(attachRep(id, structure_id)),
  }
}
const mapStateToProps = ({salestructure, salesreps, router, teams}) => {
  const {data, refresh} = salestructure;
  const {salesrepdata} = salesreps;
  const {teams_data} = teams;
  return {data, refresh, salesrepdata, router, teams_data}
};

export default connect(mapStateToProps, mapDispatchToProps)(SamplePage);