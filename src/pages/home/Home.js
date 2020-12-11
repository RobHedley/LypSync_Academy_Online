import React, { Fragment, useState, useEffect } from 'react'

import { listNotes, listUserss } from '../../graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from '../../graphql/mutations';
import { API, Storage, Auth } from 'aws-amplify';

import Quiz from 'react-quiz-component';
import HeaderBar from '../../components/atoms/headerBar/HeaderBar'

import styles from './Home.module.scss'

const initialFormState = { name: '', description: '' }

const Home = () => {
  const [selectedState, setselectedState] = useState('National')

  const [notes, setNotes] = useState([]);
  const [courses, setCourses] = useState([])
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
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
      <h1>My Notes App test</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Note name"
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
          notes.map(note => (
            <div key={note.id || note.name}>
              <h2>{note.name}</h2>
              <p>{note.description}</p>
              {
                note.image && <img src={note.image} style={{width: 200}} alt='' />
              }
              <br /><button onClick={() => deleteNote(note)}>Delete note</button>
            </div>
          ))
        }
      </div>
      <Quiz quiz={quiz}/>
    </div>
    <div className="NavContainer">
      {/* <HeaderBar /> */}
      Home Page
    </div>
    <div className="ContentLeft">
      {/* <SideBar position={'left'} wide={true}>
      <p className={styles.explanation}></p>
        <DropDown options={getStateOptions()} onChange={handleChange}/>
        {stateLevel &&
          <LayerControl data={getStateData(masterFile)} selectedState={selectedState} />
        }
        <OverlayControl data={getOverlayData(masterFile)} />
      </SideBar> */}
      Side bar
    </div>
    <div className="ContentRight">
      {/* <SideBar position={'right'} wide={true}>
        <StatsPanel masterFile={masterFile} selectedState={selectedState} />
      </SideBar> */}
      other bar
    </div>
  </Fragment>
  );
}

export default Home

