import Diary from '../components/Diary'
import { connect } from 'react-redux'
import { loadFeelings, changeShowingFeeling  } from '../modules/feelings'


const mapStateToProps = (state) => {
  return {
    'feelings' : state.feelings.feelings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadFeelings: () => {
      dispatch(loadFeelings())
    },
    changeShowingFeeling: (feelingId) => {
      dispatch(changeShowingFeeling(feelingId))
    }
  }
}

const DiaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Diary)

export default DiaryContainer
