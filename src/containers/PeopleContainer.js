import People from '../components/People'
import { connect } from 'react-redux'
import { personSelected } from '../modules/feelings'


const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      personSelected: (personId) => {
        dispatch(personSelected(personId))
      }
    }
}

const PeopleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(People)

export default PeopleContainer
