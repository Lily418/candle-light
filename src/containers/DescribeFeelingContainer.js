import DescribeFeeling from '../components/DescribeFeeling'
import { connect } from 'react-redux'
import { questionAnswerUpdated, saveFeeling, changeFeelingSentiment, personNameUpdated, feelingWordUpdated } from '../modules/feelings'

const mapStateToProps = (state) => {
  return {
    'selectedPerson' : state.feelings.selectedWord,
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
    saveFeeling: (description, sentiment, feelingWord, onComplete) => {
      dispatch(saveFeeling(description, sentiment, feelingWord, onComplete))
    }
  }
}

const DescribeFeelingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DescribeFeeling)

export default DescribeFeelingContainer
