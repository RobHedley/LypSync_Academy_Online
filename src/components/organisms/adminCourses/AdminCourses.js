import React, { useState, useEffect,  Fragment} from 'react'
import styles from './AdminCourses.module.scss'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

 const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const AdminCourses = () => {

  const [courses, setCourses] = useState([])
  const [formData, setFormData] = useState(initialFormState);
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const classes = useStyles();

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

  function editCourse( id ){
    console.log('id = ', id)
  }

  return (
  <Fragment className={classes.root}>
    <div className={styles.outer}>
      <Grid item xs={12} md={12}>
        <h2>Current Courses</h2>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox checked={dense} onChange={(event) => setDense(event.target.checked)} />
            }
            label="Compact Mode"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={secondary}
                onChange={(event) => setSecondary(event.target.checked)}
              />
            }
            label="Show Course Details"
          />
        </FormGroup>
          <div className={classes.demo}>
            <List dense={dense}>
              {courses.map(course => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={course.name}
                      secondary={secondary ? course.category : null}
                    />
                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={editCourse(course.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              )}
            </List>
          </div>
        </Grid>
    </div>
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Create New Course</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div className={styles.form}>
            <input
              className={styles.inputtext}
              onChange={e => setFormData({ ...formData, 'name': e.target.value})}
              placeholder="Course Name"
              value={formData.name}
            />
            <textarea 
              className={styles.textareastandard}
              id="Description" 
              rows="4" 
              cols="50"
              onChange={e => setFormData({ ...formData, 'description': e.target.value})}
              placeholder="Course description"
              value={formData.description}
            />
            <select className={styles.select} onChange={e => setFormData({ ...formData, 'category': e.target.value})}>
              <option value="">Select Course Category</option>
              <option value="AESTHETICS">Aesthetics</option>
              <option value="BEAUTY">Beauty</option>
            </select>
            <select className={styles.select} onChange={e => setFormData({ ...formData, 'courseLevel': e.target.value})}>
              <option value="">Select Course Level</option>
              <option value="FOUNDATION">Foundation</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
              <option value="MASTERADVANCED">Master Advanced</option>
            </select>
            <input
              className={styles.inputtext}
              type="file"
              placeholder="Course work"
              onChange={onChange}
            />
            <input
              className={styles.inputtext}
              onChange={e => setFormData({ ...formData, 'cpdNo': e.target.value})}
              placeholder="CPD No"
              value={formData.cpdNo}
            />
            <textarea 
              className={styles.textareastandard}
              id="Assesment" 
              rows="4" 
              cols="50"
              onChange={e => setFormData({ ...formData, 'assessment': e.target.value})}
              placeholder="Assesment JSON"
              value={formData.assessment}></textarea>
            <button className={styles.submitButton} onClick={createCourse}>Create Course</button>
          </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  </Fragment>
  );
}

export default AdminCourses

