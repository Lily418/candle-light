import AddFeeling from '../components/AddFeeling'
import { connect } from 'react-redux'
import { changeFeelingSection } from '../modules/feelings'

const mapStateToProps = (state) => {
  return {
    'showingSection': state.feelings.showingSection,
    'feelingWordsPositive': state.feelings.feelingWordsPositive,
    'feelingWordsNegative': state.feelings.feelingWordsNegative
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeFeelingSection: (newSection) => {
      dispatch(changeFeelingSection(newSection))
    }
  }
}

const AddFeelingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFeeling)

export default AddFeelingContainer
