import DescribeFeeling from '../components/DescribeFeeling'
import { connect } from 'react-redux'
import { questionAnswerUpdated, changeFeelingSentiment, personNameUpdated, feelingWordUpdated } from '../modules/feelings'
import { createPerson, addFeelingToPerson } from '../modules/people'

const mapStateToProps = (state) => {
  return {
    'selectedPerson' : state.people.selectedPerson,
    'selectedSentiment': state.feelings.selectedSentiment,
    'questionAnswer': state.feelings.questionAnswer,
    'personName': state.feelings.personName,
    'feelingWord': state.feelings.feelingWord
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    questionAnswerUpdated: (questionAnswer) => {
      dispatch(questionAnswerUpdated(questionAnswer))
    },
    personNameUpdated: (personName) => {
      dispatch(personNameUpdated(personName))
    },
    changeFeelingSentiment: (newSection) => {
      dispatch(changeFeelingSentiment(newSection))
    },
    feelingWordUpdated: (feelingWord) => {
      dispatch(feelingWordUpdated(feelingWord))
    },
    createPerson: (personName, description, sentiment, feelingWord, onComplete) => {
      dispatch(createPerson(personName, description, sentiment, feelingWord, onComplete))
    },
    addFeelingToPerson: (person, description, sentiment, feelingWord, onComplete) => {
      dispatch(addFeelingToPerson(person, description, sentiment, feelingWord, onComplete))
    }
  }
}

const DescribeFeelingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DescribeFeeling)

export default DescribeFeelingContainer
