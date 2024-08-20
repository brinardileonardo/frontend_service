import React, {useEffect} from 'react';
import { Layout } from './Layout';
import { DashboardChart } from '../components/DashboardChart';

export const AdminDashboard = () => {
  return (
    <Layout>
      <DashboardChart/>
    </Layout>
  )
}
