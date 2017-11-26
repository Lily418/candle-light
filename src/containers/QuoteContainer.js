import Quote from '../components/Quote'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const QuoteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Quote)

export default QuoteContainer
