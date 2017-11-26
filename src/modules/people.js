import moment from 'moment'
import uuid from 'uuid/v4'

const LOADED_PEOPLE = 'LOADED_PEOPLE'
const SELECT_PERSON = "SELECT_PERSON"


const initialState = {
  people: []
}

export const personSelected = (selectedPerson) => {
  return {
    type: SELECT_PERSON,
    selectedPerson
  }
}

const dispatchPeople = (realm, dispatch) => {
  dispatch({
    type: LOADED_PEOPLE,
    people: realm.objects("Person")
  })
}

export const loadPeople = () => {
  return (dispatch, getState) => {
    const state = getState()
    const realm = state.realm.realm

    dispatchPeople(realm, dispatch)

    realm.addListener("change", () => {
      dispatchPeople(realm, dispatch)
    })
  }
}

export default function people(state = initialState, action = {}) {
  switch (action.type) {
    case SELECT_PERSON:
      return {
        ...state,
        "selectedPerson": action.selectedPerson
      }
    case LOADED_PEOPLE:
      return {
        ...state,
        "people": action.people
      }
    default:
      return state
  }
}
