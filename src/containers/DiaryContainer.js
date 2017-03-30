import Diary from '../components/Diary'
import { connect } from 'react-redux'
import { loadFeelings  } from '../modules/feelings'


const mapStateToProps = (state) => {
  return {
    'feelings' : state.feelings.feelings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadFeelings: () => {
      dispatch(loadFeelings())
    }
  }
}

const DiaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Diary)

export default DiaryContainer
