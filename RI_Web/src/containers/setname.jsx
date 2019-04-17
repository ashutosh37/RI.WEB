import { connect } from 'react-redux'
import SetName from '../components/SetName'
const mapStateToProps = state => ({
    todos: state.todos
  })

  export default connect(
    mapStateToProps,
    null
  )(SetName)