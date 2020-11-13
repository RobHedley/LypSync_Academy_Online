import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

import Quiz from 'react-quiz-component';

function App() {
  const quiz =  {
    "quizTitle": "Anatomy and Physiology Online Assesment",
    "quizSynopsis": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
    "questions": [
      {
        "question": "Which of the following is NOT a layer of the skin?",
        "questionType": "text",
        "questionPic": "https://dummyimage.com/600x400/000/fff&text=X", // if you need to display Picture in Question
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
    <div className="App">
      <header className="App-header">
        <p>
          LypSync Online Assesment.
        </p>
        <AmplifySignOut />
      </header>
      <Quiz quiz={quiz}/>
    </div>
  );
}

export default withAuthenticator(App);
