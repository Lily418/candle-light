import DescribeFeeling from '../components/DescribeFeeling'
import { connect } from 'react-redux'
import { questionAnswerUpdated } from '../modules/feelings'

const mapStateToProps = (state) => {
  return {
    'selectedWord' : state.feelings.selectedWord,
    'questionAnswer': state.feelings.questionAnswer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    questionAnswerUpdated: (questionAnswer) => {
      dispatch(questionAnswerUpdated(questionAnswer))
    }
  }
}

const DescribeFeelingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DescribeFeeling)

export default DescribeFeelingContainer
