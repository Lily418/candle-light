import Diary from '../components/Diary'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    'feelings' : state.feelings.feelings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const DiaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Diary)

export default DiaryContainer
