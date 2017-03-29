import moment from 'moment'

const CHANGE_FEELING_SECTION = "CHANGE_FEELING_SECTION"
const SELECT_WORD = "SELECT_WORD"
const QUESTION_ANSWER_UPDATED = "QUESTION_ANSWER_UPDATED"
const START_FEELING_SAVE = "START_QUESTION_SAVE"
const FEELING_SAVED = "QUESTION_SAVED"

const initialState = {
  showingSection: null,
  feelingWordsPositive: ["Uplifted", "Cared For" ,"Comfortable","Encouraged","Free","Happy","Secure","Loved","Social","Relaxed","Confident","Safe","Listened To","Supported","Respected","Energized"],
  feelingWordsNegative: ["Humiliated","Ignored","Pressured","Mocked","Controlled","Upset","Inadequte","Hurt","Isolated","Scared","Confused","Threatened","Manipulated","Used","Insignificant","Exhausted"],
  selectedWord: null,
  selectedSentiment: null,
  questionAnswer: "",
  feelings: [{
    "sentiment" : "Positive",
    "feelingWord" : "Free",
    "description": "Free Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna..."
  }, {
    "sentiment" : "Negative",
    "feelingWord" : "Ignored",
    "description": "Ignored Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna..."
  }, {
    "sentiment" : "Negative",
    "feelingWord" : "Pressured",
    "description": "Pressured Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna..."
  }]
}

export const changeFeelingSection = (showingSection) => {
  return {
    "type": CHANGE_FEELING_SECTION,
    showingSection
  }
}

export const wordSelected = (selectedWord, selectedSentiment) => {
  return {
    type: SELECT_WORD,
    selectedWord, selectedSentiment
  }
}

export const questionAnswerUpdated = (questionAnswer) => {
  return {
    type: QUESTION_ANSWER_UPDATED,
    questionAnswer
  }
}

export const saveFeeling = (description, sentiment, feelingWord, onComplete) => {
  return (dispatch, getState) => {
    const state = getState()
    const realm = state.realm.realm
    realm.write(() => {
      realm.create("FeelingRecord", {
        description, sentiment, feelingWord,
        created: moment().toDate(),
      })
    })

    onComplete()
  }
}



export default function feelings(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_FEELING_SECTION:
      return {
        ...state,
        "showingSection": action.showingSection
      }
    case SELECT_WORD:
      return {
        ...state,
        "selectedWord": action.selectedWord,
        "selectedSentiment": action.selectedSentiment
      }
    case QUESTION_ANSWER_UPDATED:
      return {
        ...state,
        "questionAnswer": action.questionAnswer
      }
    default:
      return state
  }
}
