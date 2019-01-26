import React from 'react'
import ReactDOM from 'react-dom'
import { HelloWorld } from './components/HelloWorld';



if (document.getElementById("hello-world")) {
  ReactDOM.render(
		<HelloWorld />, document.getElementById("hello-world")
  );
}
