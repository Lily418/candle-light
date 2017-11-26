import People from '../components/People'
import { connect } from 'react-redux'
import { personSelected, loadPeople } from '../modules/people'


const mapStateToProps = (state) => {
  return {
    people: state.people.people
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      loadPeople: () => {
        dispatch(loadPeople())
      },
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
