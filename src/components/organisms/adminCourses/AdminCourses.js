import React, { useState, useEffect,  Fragment} from 'react'
import styles from './AdminCourses.module.scss'

import { listCourses } from '../../../graphql/queries';
import { createCourse as createCourseMutation, deleteCourse as deleteCourseMutation } from '../../../graphql/mutations';
import { API, Storage, Auth } from 'aws-amplify';

const initialFormState = { name: '', description: '' }

const AdminCourses = () => {

  const [courses, setCourses] = useState([])
  const [formData, setFormData] = useState(initialFormState);

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

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createCourseMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
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
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchCourses();
  }

  return (
  <Fragment>
    AdminCourses
    <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Course Name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Note description"
        value={formData.description}
      />
      <input
        type="file"
        onChange={onChange}
      />
      <button onClick={createNote}>Create Note</button>
      <div style={{marginBottom: 30}}>
        {
          courses.map(course => (
            <div key={course.id || course.name}>
              <h2>{course.name}</h2>
          <p>{course.category}<br />{course.cpdNo}<br /><a href={course.coursework} rel="noreferrer" target="_blank">Coursework</a></p>
              {
                course.image && <img src={course.image} style={{width: 200}} alt='' />
              }
              <br /><button onClick={() => deleteNote(course)}>Delete note</button>
            </div>
          ))
        }
      </div>
  </Fragment>
  );
}

export default AdminCourses

