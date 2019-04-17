import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import {SetName} from '../components/setname'

const AddTodo = ({ dispatch }) => {
  let input
  console.log("add todo container");
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        <input ref={node => (input = node)} />
        <button type="submit">Add Todo</button>
      </form>
      <SetName text={input.value}/>
    </div>
  )
}

export default connect()(AddTodo)