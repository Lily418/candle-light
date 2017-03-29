import DescribeFeeling from '../components/DescribeFeeling'
import { connect } from 'react-redux'
import { questionAnswerUpdated, saveFeeling  } from '../modules/feelings'

const mapStateToProps = (state) => {
  return {
    'selectedWord' : state.feelings.selectedWord,
    'selectedSentiment': state.feelings.selectedSentiment,
    'questionAnswer': state.feelings.questionAnswer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    questionAnswerUpdated: (questionAnswer) => {
      dispatch(questionAnswerUpdated(questionAnswer))
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
