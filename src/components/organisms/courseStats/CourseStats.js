import React, { useState, useEffect,  Fragment} from 'react'
import styles from './CourseStats.module.scss'

import { listCourses } from '../../../graphql/queries';
import { API } from 'aws-amplify';

const CourseStats = () => {

  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    const apiData = await API.graphql({ query: listCourses });
    const coursesFromAPI = apiData.data.listCourses.items;
    console.log('courses', coursesFromAPI)
    // await Promise.all(notesFromAPI.map(async note => {
    //   if (note.image) {
    //     const image = await Storage.get(note.image);
    //     note.image = image;
    //   }
    //   return note;
    // }))
    setCourses(coursesFromAPI);
  }

  return (
  <Fragment>
    <div className={styles.outer}>
      <div className={styles.fifty}>
        <h2>User Statistics</h2>
        
      </div>
      <div className={styles.fifty}>
        <h2>Course Statistics</h2>
        <div>Total Number of courses: {courses.length}</div>
        <div>Total Number of active courses: {courses.length}</div>
        <div>Total Number of completed courses: {courses.length}</div>
        <div>Number of courses completed this month: {courses.length}</div>
      </div>
    </div>
  </Fragment>
  );
}

export default CourseStats

