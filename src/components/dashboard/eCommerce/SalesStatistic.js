import React, {useState, useEffect} from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import axios from 'util/Api';
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
  ];
const SalesStatistic = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('v1/dashboardchart',
      ).then(({data}) => {
        console.log("fetchDashboardChart: ", data);
        if (data.success) {
          console.log(data.data)
          setData(data.data)
        } else {
          console.log("error : "+data)
        }
      }).catch((error) => {
        const response = []
        
        console.log("Error****:", error.message);
      });
  }, []);
  return (
    <div className="jr-card">
      <div className="jr-card-header d-flex align-items-center">
        <h3 className="mb-0">Sales Statistic</h3>
      </div>
      
      <div className="row">
        
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}
                       margin={{top: 10, right: 30, left: 0, bottom: 0}}>
              <XAxis dataKey="name"/>
              <YAxis type="number" domain={[0, 1000000]}/>
              <CartesianGrid strokeDasharray="0" stroke="#DCDEDE" />

              <Tooltip/>
              <defs>
                <linearGradient id="salesStatistic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4258BC" stopOpacity={1}/>
                  <stop offset="95%" stopColor="#FFF" stopOpacity={0.8}/>
                </linearGradient>
              </defs>

              <Area type='monotone' dataKey='uv' strokeWidth={2} stroke='#6F82E5' fill="url(#salesStatistic)" />
            </AreaChart>
          </ResponsiveContainer>
        
        
      </div>
    </div>
  );
};

export default SalesStatistic;
