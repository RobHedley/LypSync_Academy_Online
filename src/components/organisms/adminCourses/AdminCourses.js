import React, { useState, useEffect,  Fragment} from 'react'
import styles from './AdminCourses.module.scss'

import { listCourses } from '../../../graphql/queries';
import { createCourse as createCourseMutation, deleteCourse as deleteCourseMutation } from '../../../graphql/mutations';
import { API, Storage } from 'aws-amplify';

const initialFormState = { 
  name: '', 
  description: '', 
  category: '', 
  courseLevel: '', 
  cpdNo: '',
  assessment: '',
  coursework: ''
 }

const AdminCourses = () => {

  const [courses, setCourses] = useState([])
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchCourses();
  }, []);

  console.log('formDate', formData)

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

  async function createCourse() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createCourseMutation, variables: { input: formData } });
    if (formData.coursework) {
      const coursework = await Storage.get(formData.coursework);
      formData.coursework = coursework;
    }
    setCourses([ ...courses, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newCourseArray = courses.filter(course => course.id !== id);
    setCourses(newCourseArray);
    await API.graphql({ query: deleteCourseMutation, variables: { input: { id } }});
  }

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, coursework: file.name });
    await Storage.put(file.name, file);
    fetchCourses();
  }

  return (
  <Fragment>
    <div className={styles.form}>
      <input
          onChange={e => setFormData({ ...formData, 'name': e.target.value})}
          placeholder="Course Name"
          value={formData.name}
        />
        <textarea 
          id="Description" 
          rows="4" 
          cols="50"
          onChange={e => setFormData({ ...formData, 'description': e.target.value})}
          placeholder="Course description"
          value={formData.description}
        />
        <select onChange={e => setFormData({ ...formData, 'category': e.target.value})}>
          <option value="AESTHETICS">Aesthetics</option>
          <option value="BEAUTY">Beauty</option>
        </select>
        <select onChange={e => setFormData({ ...formData, 'courseLevel': e.target.value})}>
          <option value="FOUNDATION">Foundation</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
          <option value="MASTERADVANCED">Master Advanced</option>
        </select>
        <input
          type="file"
          placeholder="Course work"
          onChange={onChange}
        />
        <input
          onChange={e => setFormData({ ...formData, 'cpdNo': e.target.value})}
          placeholder="CPD No"
          value={formData.cpdNo}
        />
        <textarea 
          id="Assesment" 
          rows="4" 
          cols="50"
          onChange={e => setFormData({ ...formData, 'assessment': e.target.value})}
          placeholder="Assesment JSON"
          value={formData.assessment}></textarea>
        <button onClick={createCourse}>Create Course</button>
      </div>
      <div style={{marginBottom: 30}}>
        {
          courses.map(course => (
            <div key={course.id || course.name}>
              <h2>{course.name}</h2>
          <p>{course.category}<br />{course.cpdNo}<br /><a href={course.coursework} rel="noreferrer" target="_blank">Coursework</a></p>
              {
                course.image && <img src={course.image} style={{width: 200}} alt='' />
              }
              <br /><button onClick={() => deleteNote(course.id)}>Delete note</button>
            </div>
          ))
        }
      </div>
  </Fragment>
  );
}

export default AdminCourses

