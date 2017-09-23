import Mood from '../components/Mood'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const MoodContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Mood)

export default MoodContainer
