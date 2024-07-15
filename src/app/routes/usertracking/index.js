import React from "react";

import Profile from "components/wall/Profile/index";
import PostList from "components/wall/PostList/index";
import Interests from "components/wall/Interests/index";
import Photos from "components/wall/Photos/index";
import Friends from "components/wall/Friends/index";
import CustomScrollbars from "util/CustomScrollbars";
import {communitiesList, friendList, interestList, photoList, postList, recentActivity, user, userInfo} from "./data";
import Communities from "components/wall/Communities/index";
import RecentActivity from "./RecentActivity";
import UserTable from "./userstable";
import UsersMap from "./userstable/usersmap";
import axios from 'util/Api';

const moment = require('moment')

class Wall extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          locations : [],
          limit : 10
        }
      }
      componentDidMount(){
        this.getLocations()
      }
      getLocations(){
        axios.get('v1/activity/listindividual',
          ).then(({data}) => {
            console.log("fetchActivities: ", data);
            if (data.success) {
              console.log(data.data)
              this.setState({locations : data.data})
            } else {
              // this.notify("error")
              console.log("error : "+data)
            }
          }).catch((error) => {
            const response = []
           
            console.log("Error****:", error.message);
          });
      }
  render = () => {
    return (
        <div className="jr-main-content">
            <div className="row">
                <div className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-12">
                    <CustomScrollbars className="jr-wall-scroll scrollbar">
                        <div className="jr-wall-postlist">
                            <div className="jr-card p-2">
                            <UsersMap locations={this.state.locations}/>
                            </div>
                            
                            <UserTable/>
                        </div>
                    </CustomScrollbars>
                </div>
                <div className="d-none d-lg-block col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                    <CustomScrollbars className="jr-wall-scroll scrollbar">
                        <div className="jr-wall-sidebar">
                            <RecentActivity recentList={recentActivity} shape="square"/>
                        </div>
                    </CustomScrollbars>
                </div>
            </div>
        </div>
    )
  }
}

export default Wall
