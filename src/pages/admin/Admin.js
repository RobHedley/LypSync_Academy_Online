import React from 'react'
import styles from './Admin.module.scss'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import HeaderBar from '../../components/atoms/headerBar/HeaderBar'
import AdminCourses from '../../components/organisms/adminCourses/AdminCourses'
import CourseStats from '../../components/organisms/courseStats/CourseStats'
import Bookings from '../../components/organisms/bookings/Bookings'

const Admin = () => {

  return (
  <div className={styles.wrapper}>
    <header className="App-header">
      <HeaderBar />
    </header>
    <div className={styles.content}>
      <Tabs className={styles.tabs}>
        <TabList>
          <Tab>Dashboard</Tab>
          <Tab>Users</Tab>
          <Tab>Courses</Tab>
          <Tab>Analytics</Tab>
          <Tab>Bookings</Tab>
          <Tab>Stock</Tab>
        </TabList>
        <TabPanel>
          <h2>Dashboard</h2>
        </TabPanel>
        <TabPanel>
          <h2>User Panel</h2>
        </TabPanel>
        <TabPanel>
          <h2>Courses Panel</h2>
          <AdminCourses />
        </TabPanel>
        <TabPanel>
          <h2>Analytics</h2>
          <CourseStats />
        </TabPanel>
        <TabPanel>
          <h2>Bookings</h2>
          <Bookings />
        </TabPanel>
        <TabPanel>
          <h2>Stock</h2>
          <CourseStats />
        </TabPanel>
      </Tabs>
    </div>
  </div>
  );
}

export default Admin

