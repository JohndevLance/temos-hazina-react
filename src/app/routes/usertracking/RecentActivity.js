import React from "react";
import Avatar from '@material-ui/core/Avatar';

import ActivityItem from "./ActivityItem";
import axios from 'util/Api';

const moment = require('moment')

class RecentActivity extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      activities : [],
      limit : 10
    }
  }
  componentDidMount(){
    this.getActivity()
  }
  getActivity(){
    axios.get('v1/activity/list',
      ).then(({data}) => {
        console.log("fetchActivities: ", data);
        if (data.success) {
          console.log(data.data)
          this.setState({activities : data.data})
        } else {
          // this.notify("error")
          console.log("error : "+data)
        }
      }).catch((error) => {
        const response = []
       
        console.log("Error****:", error.message);
      });
  }
  getName(task, shape) {
    if (!task.avatar) {
      console.log(task.user.full_name)
      let nameSplit = task.user.full_name.split(" ");
      if (task.user.full_name.split(" ").length === 1) {
        const initials = nameSplit[0].charAt(0).toUpperCase();
        return <Avatar
          className={shape === 'circle' ? 'size-40 bg-primary mr-3 rounded' : 'size-40 bg-primary mr-3'}>{initials}</Avatar>
      } else {
        const initials = nameSplit[0].charAt(0).toUpperCase() + nameSplit[1].charAt(0).toUpperCase();
        return <Avatar
          className={shape === 'circle' ? 'size-40 bg-cyan mr-3 rounded' : 'size-40 bg-cyan mr-3'}>{initials}</Avatar>
      }
    } else {
      return <Avatar className={shape === 'circle' ? 'size-40 mr-3 rounded' : 'size-40 mr-3'} alt="..."
                     src={task.avatar}/>;
    }
  }
  onLoadMore =()=> {
    console.log("loadMore")
    this.setState({limit : this.state.limit+10})
  };
  render = () => {
    const {recentList, shape} = this.props;
    return (
      <div className="jr-entry-sec mb-0">
        <h2 className="jr-entry-title">Recent Activities</h2>
        {this.state.activities.slice(0, this.state.limit).map((activity) =>
          // <div className="jr-timeline-info" key={"activity-" + activity.id}>
          <div>
            {/* <h4 className="jr-timeline-info-day">{moment(activity.timestamp).format('dddd')}</h4> */}
            <div className="recent-activity">
              {/* {activity.tasks.map((task) => { */}
                {/* return  */}
                <div className="media user-profile" key={"taskId-" + activity.id}>
                  {this.getName(activity, "circle")}
                    <p><span className="jr-link" key={8}>{activity.user.full_name}</span> visited {activity.customer? activity.customer.name : ""}
        <i> Current Status {activity.current_status ? activity.current_status.name : ""} at {moment(activity.timestamp).format('llll')}</i></p>
                  {/* <ActivityItem task={activity}/> */}
                </div>
              {/* })} */}
            </div>
          </div>)}
        <span className="jr-link mt-n2 d-block" onClick={() => this.onLoadMore()}>Load More</span>
      </div>
    );
  }
  };

export default RecentActivity;
