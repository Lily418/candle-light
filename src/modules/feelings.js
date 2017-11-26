import moment from 'moment'
import uuid from 'uuid/v4'

const CHANGE_FEELING_SENTIMENT = "CHANGE_FEELING_SENTIMENT"
const QUESTION_ANSWER_UPDATED = "QUESTION_ANSWER_UPDATED"
const START_FEELING_SAVE = "START_QUESTION_SAVE"
const FEELING_SAVED = "QUESTION_SAVED"
const LOADED_FEELINGS = "LOADED_FEELINGS"
const CHANGE_SHOWING_FEELING = "CHANGE_SHOWING_FEELING"
const PERSON_NAME_UPDATED = "PERSON_NAME_UPDATED"
const FEELING_WORD_UPDATED = "FEELING_WORD_UPDATED"

const initialState = {
  showingSection: null,
  feelingWordsPositive: ["Uplifted", "Cared For" ,"Comfortable","Encouraged","Free","Happy","Secure","Loved","Social","Relaxed","Confident","Safe","Listened To","Supported","Respected","Energized"],
  feelingWordsNegative: ["Humiliated","Ignored","Pressured","Mocked","Controlled","Upset","Inadequate","Hurt","Isolated","Scared","Confused","Threatened","Manipulated","Used","Insignificant","Exhausted"],
  feelingWord: null,
  selectedSentiment: null,
  questionAnswer: "",
  personName: "",
  feelings: [],
  showingFeeling: null
}

export const changeFeelingSentiment = (selectedSentiment) => {
  return {
    "type": CHANGE_FEELING_SENTIMENT,
    selectedSentiment
  }
}

export const changeShowingFeeling = (feelingRecord) => {
  return {
    "type": CHANGE_SHOWING_FEELING,
    feelingRecord
  }
}

export const questionAnswerUpdated = (questionAnswer) => {
  return {
    type: QUESTION_ANSWER_UPDATED,
    questionAnswer
  }
}

export const personNameUpdated = (personName) => {
  return {
    type: PERSON_NAME_UPDATED,
    personName
  }
}

export const feelingWordUpdated = (feelingWord) => {
  return {
    type: FEELING_WORD_UPDATED,
    feelingWord
  }
}

/*export const saveFeeling = (description, sentiment, feelingWord, onComplete) => {
  return (dispatch, getState) => {
    const state = getState()
    const realm = state.realm.realm
    realm.write(() => {
      realm.create("FeelingRecord", {
        id: uuid(),
        description, sentiment, feelingWord,
        created: moment().toDate(),
      })
    })

    onComplete()
  }
}*/

const addIsNewDate = (feelingRecords) => {
  let previousCreated = null

  let feelingRecordsWithIsNewDate = []

  feelingRecords.forEach((feelingRecord) => {
    const created = moment(feelingRecord.created)

    feelingRecordsWithIsNewDate.push({
      ...feelingRecord,
      isNewDate: !previousCreated || previousCreated.format("DDddd") !== created.format("DDddd")
    })

    previousCreated = created
  })

  return feelingRecordsWithIsNewDate
}

const dispatchFeelings = (realm, dispatch) => {
  dispatch({
    type: LOADED_FEELINGS,
    feelings : addIsNewDate(realm.objects("FeelingRecord").sorted('created', true))
  })
}

export const loadFeelings = () => {
  return (dispatch, getState) => {
    const state = getState()
    const realm = state.realm.realm

    dispatchFeelings(realm, dispatch)

    realm.addListener("change", () => {
      dispatchFeelings(realm, dispatch)
    })
  }
}


export default function feelings(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_FEELING_SENTIMENT:
      return {
        ...state,
        "selectedSentiment": action.selectedSentiment
      }
    case PERSON_NAME_UPDATED:
      return {
        ...state,
        "personName": action.personName
      }
    case FEELING_WORD_UPDATED:
      return {
        ...state,
        "feelingWord": action.feelingWord
    }
    case QUESTION_ANSWER_UPDATED:
      return {
        ...state,
        "questionAnswer": action.questionAnswer
      }
    case LOADED_FEELINGS:
      return {
        ...state,
        feelings: action.feelings
      }
    case CHANGE_SHOWING_FEELING:
      return {
        ...state,
        showingFeeling: action.feelingRecord
      }
    default:
      return state
  }
}
