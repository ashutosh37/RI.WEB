import React from 'react'
import Footer from './Footer'
import SetName from './setname'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <SetName/>
  </div>
)

export default App