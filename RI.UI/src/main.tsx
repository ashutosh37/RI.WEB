import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Home} from './components/Home'

if(document.getElementById("contents")) {
  ReactDOM.render(
    <Home title="hello"/> , document.getElementById("contents")
  );
}

//https://medium.com/@stowball/a-dummys-guide-to-redux-and-thunk-in-react-d8904a7005d3