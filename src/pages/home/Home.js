import React, { Fragment, useState, useEffect } from 'react'

import { listNotes, listUserss } from '../../graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from '../../graphql/mutations';
import { API, Storage, Auth } from 'aws-amplify';

//import Quiz from 'react-quiz-component';
import HeaderBar from '../../components/atoms/headerBar/HeaderBar'
import LibraryBooksTwoToneIcon from '@material-ui/icons/LibraryBooksTwoTone';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import CardGiftcardOutlinedIcon from '@material-ui/icons/CardGiftcardOutlined';
import styles from './Home.module.scss'

const initialFormState = { name: '', description: '' }

const Home = () => {

  const [notes, setNotes] = useState([]);
  const [courses, setCourses] = useState([])
  const [currentUser, setCurrentUser] = useState({firstName: '', lastName: '', email: ''})
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    //fetchNotes();
    fetchCourses();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(notesFromAPI.map(async note => {
      if (note.image) {
        const image = await Storage.get(note.image);
        note.image = image;
      }
      return note;
    }))
    setNotes(apiData.data.listNotes.items);
  }

  async function fetchCourses() {
    const curUser = await Auth.currentAuthenticatedUser()
    .then((data) => {
       // this data has user details in accessToken
       console.log('currentUser', data)
       setCurrentUser({firstName: 'Rob', lastName: 'Hedley', email: 'rob@robhedley.com'})
    }).catch(err => console.log(err));
    const apiData = await API.graphql({ query: listUserss });
    const UsersFromAPI = apiData.data;
    console.log('Users', UsersFromAPI)
    // await Promise.all(notesFromAPI.map(async note => {
    //   if (note.image) {
    //     const image = await Storage.get(note.image);
    //     note.image = image;
    //   }
    //   return note;
    // }))
    //setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }

  const quiz =  {
    "quizTitle": "Anatomy and Physiology Online Assesment",
    "quizSynopsis": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
    "questions": [
      {
        "question": "Which of the following is NOT a layer of the skin?",
        "questionType": "text",
        "questionPic": "https://dummyimage.com/600x400/000/fff&text=X",
        "answerSelectionType": "single",
        "answers": [
          "Epidermis",
          "Dermis",
          "Sausage",
          "Sub-Cutaneaous"
        ],
        "correctAnswer": "3",
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "point": "20"
      },
      {
        "question": "In which skin layer do Hair Folicles sit?",
        "questionType": "text",
        "answerSelectionType": "single",
        "answers": [
          "Epidermis",
          "Dermis",
          "Sub-Cutaneaous"
        ],
        "correctAnswer": "2",
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "point": "20"
      },
      {
        "question": "Another question.....ps the second one is correct?",
        "questionType": "text",
        "answerSelectionType": "single",
        "answers": [
          "True",
          "False"
        ],
        "correctAnswer": "2",
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "point": "10"
      },
      {
        "question": "Which of the following concepts is true?",
        "questionType": "text",
        "answerSelectionType": "single",
        "answers": [
          "Rob is the best",
          "Lynne is the best",
          "they are both equal",
        ],
        "correctAnswer": "3",
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "point": "30"
      },
      {
        "question": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
        "questionType": "photo",
        "answerSelectionType": "single",
        "answers": [
          "https://dummyimage.com/600x400/000/fff&text=A",
          "https://dummyimage.com/600x400/000/fff&text=B",
          "https://dummyimage.com/600x400/000/fff&text=C",
          "https://dummyimage.com/600x400/000/fff&text=D"
        ],
        "correctAnswer": "1",
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "point": "20"
      },
      {
        "question": "Multiple choice?",
        "questionType": "text",
        "answerSelectionType": "multiple",
        "answers": [
          "This one is correct",
          "So is this one",
          "Nope, not this one",
          "Yep"
        ],
        "correctAnswer": [1, 2, 4],
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "point": "20"
      },
    ]
  } 

  return (
  <Fragment>
    <div className="App">
      <header className="App-header">
        <HeaderBar />
      </header>
      <h2>Hi {currentUser.firstName}, where do you want to go?</h2>
      <div className={styles.grid}>
        <div className={styles.grid__item}>
          <div className={styles.grid__itemTop}>
            <LibraryBooksTwoToneIcon style={{ fontSize: 80, color: '#e1ac88' }}/>
          </div>
          <div className={styles.grid__itemMid}>
            My Courses
          </div>
          <div className={styles.grid__itemBot}>
            <p>See all of you available and completed courses. From here you can complete any courses that you havent already.</p>
          </div>  
        </div>
        <div className={styles.grid__item}>
          <div className={styles.grid__itemTop}>
            <CardGiftcardOutlinedIcon style={{ fontSize: 140, color: '#e1ac88' }}/>
          </div>
          <div className={styles.grid__itemMid}>
            My Certificates
          </div>
          <div className={styles.grid__itemBot}>
            <p>View, print and send a link for all of you certificates.</p>
          </div>  
        </div>
        <div className={styles.grid__item}>
          <div className={styles.grid__itemTop}>
            <AccountBoxOutlinedIcon style={{ fontSize: 140, color: '#e1ac88' }}/>
          </div>
          <div className={styles.grid__itemMid}>
            Get help
          </div>
          <div className={styles.grid__itemBot}>
            <p>Having a problem, need to ask a question? This is the section for you.</p>  
          </div>  
        </div>
        <div className={styles.grid__item}>
          <div className={styles.grid__itemTop}>
            <ContactSupportOutlinedIcon style={{ fontSize: 140, color: '#e1ac88' }}/>
          </div>
          <div className={styles.grid__itemMid}>
            My Profile Settings
          </div>
          <div className={styles.grid__itemBot}>
            <p>Update your profile information such as contact details, the name you want on your certificates etc.</p>  
          </div>  
        </div>
      </div>
      {/* <Quiz quiz={quiz}/> */}
    </div>
  </Fragment>
  );
}

export default Home

