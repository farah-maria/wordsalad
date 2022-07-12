const readyBtn = document.getElementById('ready-btn');
const nextFrame = document.getElementById('next-frame');
const quizContainerElement = document.getElementById('quiz-container');
const answersElement = document.getElementById('answer-clicks');
const quizWordElement = document.getElementById('question');
const modalMessageElement = document.getElementById('wellDoneMessage');

//modal//
const modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

let shuffleQWords, currentWord;

let correctAnswerCounter = 0;

readyBtn.addEventListener('click', startGame);

nextFrame.addEventListener('click', () => {
  setNextWord()
});

function startGame() {
  readyBtn.classList.add('hide');
  shuffleQWords = questions.sort(() => Math.random() - .5);
  currentWord = 0 ;
  quizContainerElement.classList.remove('hide');
  setNextWord();
}

function setNextWord() {
  currentWord++
  resetState();
  showQuestion(shuffleQWords[currentWord]);
}

function showQuestion(question) {
  quizWordElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener('click', clickBtn);
    answersElement.appendChild(button);
  })
}

function resetState() {
  clearStatusClass(document.body);
  nextFrame.classList.add('hide');
  while (answersElement.firstChild) {
    answersElement.removeChild(answersElement.firstChild);
  }
}

function clickBtn(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  
  if (correct) correctAnswerCounter ++;

  setStatusClass(document.body, correct);
  Array.from(answersElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  })
  if (currentWord < shuffleQWords.length-1) {
    nextFrame.classList.remove('hide');
  } else {
    modal.style.display = "block";
    modalMessageElement.innerText = 'You got ' + correctAnswerCounter +' correct out of '+shuffleQWords.length+' :)' + 
    ' Your prize is a silly, word-salad sentence. See if you can write ones of your own with the same adjective, noun, verb and adverb.';
    document.getElementById('randomSentence').innerText = generateRandomSentence();

    readyBtn.innerText = 'Well done! Click here to go again :)';
    readyBtn.classList.remove('hide');

    document.getElementById('modal-close-button').addEventListener('click', ()=>{
      modal.style.display = 'none';
    });

  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function getWordType(strWordType){
  return questions.filter((question)=>{
    return question.answers.filter((ans)=>{
      return (ans.text === strWordType && ans.correct === true)
    }).length > 0;
  });
}

function getNouns(){
  return getWordType('noun');
}

function getVerbs(){
  return getWordType('verb');
}

function getAdverbs(){
  return getWordType('adverb');
}

function getAdjectives(){
  return getWordType('adjective');
}

function getRandomWord(arrWords){
  return arrWords[Math.floor((Math.random() * arrWords.length))].question
}
function generateRandomSentence(){
  return "The " + getRandomWord(getAdjectives()) + " " + getRandomWord(getNouns()) + " " + getRandomWord(getVerbs()) + " to the shop " + getRandomWord(getAdverbs()) + ".";
}

const questions = [
  {
    question: 'apple',
    answers: [
      { text: 'noun', correct: true },
      { text: 'adjective', correct: false},
      { text: 'verb', correct: false },
      { text: 'adverb', correct: false}
    ]
  },
  {
    question: 'tall',
    answers: [
      { text: 'noun', correct: false },
      { text: 'adjective', correct: true },
      { text: 'verb', correct: false },
      { text: 'adverb', correct: false }
    ]
  },
  {
    question: 'rolls',
    answers: [
      { text: 'noun', correct: false },
      { text: 'adjective', correct: false },
      { text: 'verb', correct: true },
      { text: 'adverb', correct: false }
      
    ]
  },
  {
    question: 'dances',
    answers: [
      { text: 'noun', correct: false },
      { text: 'adjective', correct: false },
      { text: 'verb', correct: true },
      { text: 'adverb', correct: false }
      
    ]
  }, 
  {
    question: 'blonde',
    answers: [
      { text: 'noun', correct: false },
      { text: 'adjective', correct: true },
      { text: 'verb', correct: false },
      { text: 'adverb', correct: false }
      
    ]
  },
  {
    question: 'hand',
    answers: [
      { text: 'noun', correct: true },
      { text: 'adjective', correct: false },
      { text: 'verb', correct: false },
      { text: 'adverb', correct: false }
      
    ]
  },
  {
    question: 'limps',
    answers: [
      { text: 'noun', correct: false },
      { text: 'adjective', correct: false },
      { text: 'verb', correct: true },
      { text: 'adverb', correct: false }
      
    ]
  },
  {
    question: 'hot',
    answers: [
      { text: 'noun', correct: false },
      { text: 'adjective', correct: true },
      { text: 'verb', correct: false },
      { text: 'adverb', correct: false }
      
    ]
  },
  {
    question: 'sleep',
    answers: [
      { text: 'noun', correct: false },
      { text: 'adjective', correct: false },
      { text: 'verb', correct: true },
      { text: 'adverb', correct: false }
      
    ]
  },
  {
    question: 'bravely',
    answers: [
      { text: 'noun', correct: false },
      { text: 'adjective', correct: false },
      { text: 'verb', correct: false },
      { text: 'adverb', correct: true }
      
    ]
  },
  {
    question: 'funnily',
    answers: [
      { text: 'noun', correct: false },
      { text: 'adjective', correct: false },
      { text: 'verb', correct: false },
      { text: 'adverb', correct: true }
      
    ]
  },
  {
    question: 'smooth',
    answers: [
      { text: 'noun', correct: false },
      { text: 'adjective', correct: true },
      { text: 'verb', correct: false },
      { text: 'adverb', correct: false }
      
    ]
  },
  {
    question: 'city',
    answers: [
      { text: 'noun', correct: true },
      { text: 'adjective', correct: false },
      { text: 'verb', correct: false },
      { text: 'adverb', correct: false }
    ]
  },
  {
    question: 'town',
    answers: [
      { text: 'noun', correct: true },
      { text: 'adjective', correct: false },
      { text: 'verb', correct: false },
      { text: 'adverb', correct: false }
    ]
  },
  {
    question: 'furry',
    answers: [
      { text: 'noun', correct: false },
      { text: 'adjective', correct: true },
      { text: 'verb', correct: false },
      { text: 'adverb', correct: false } 
    ]
  },
  {
    question: 'walk',
    answers: [
      { text: 'noun', correct: false },
      { text: 'adjective', correct: false },
      { text: 'verb', correct: true },
      { text: 'adverb', correct: false }
    ]
  },
  {
    question: 'calmly',
    answers: [
      { text: 'noun', correct: false },
      { text: 'adjective', correct: false },
      { text: 'verb', correct: false },
      { text: 'adverb', correct: true }
    ]
  },
  {
    question: 'briskly',
    answers: [
      { text: 'adjective', correct: false },
      { text: 'noun', correct: false },
      { text: 'verb', correct: false },
      { text: 'adverb', correct: true }
    ]
  },
  {
    question: 'boy',
    answers: [
      { text: 'adjective', correct: false },
      { text: 'noun', correct: true },
      { text: 'verb', correct: false },
      { text: 'adverb', correct: false }
    ]
  },
  {
    question: 'girl',
    answers: [
      { text: 'adjective', correct: false },
      { text: 'noun', correct: true },
      { text: 'verb', correct: false },
      { text: 'adverb', correct: false }
    ]
  }
]