import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

export const DashboardChart = () => {
  const {user} = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTransaksi();
  }, []);

  const fetchTransaksi = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/list_trx');
      setData(response.data.message);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const formatDataForChart = () => {
    return data.map(item => ({
      createdAt: new Date(item.createdAt).toLocaleDateString(),
      amount: parseInt(item.amount),
      username: item.user.username,// display in tooltip
    }));
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { username, amount, createdAt } = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="label">{`Date: ${createdAt}`}</p>
          <p className="label">{`Amount: ${amount}`}</p>
          <p className="label">{`Username: ${username}`}</p>
        </div>
      );
    }
    return null;
  };

  const chartData = formatDataForChart();

  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">Hi {user.name}, Welcome back </h2>

      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};