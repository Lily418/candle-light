import DetailFeeling from '../components/DetailFeeling'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
  return {
    'showingFeeling' : state.feelings.showingFeeling
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const DetailFeelingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailFeeling)

export default DetailFeelingContainer
