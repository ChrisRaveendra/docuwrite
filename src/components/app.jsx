 import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Textbar from './Toolbar';
import TextEditor from './TextEditor';
import Login from './Login';
import Home from './Home';
// react-redux - the bindings, the connections
import { Provider, connect } from 'react-redux';
// the difference is that redux is the idea of having a store,
//    a reducer, and actions
import { createStore } from 'redux';

import {handleEditor} from '../actions/index';
// /* reducer - a function; */
// const store = createStore((state = { loggedIn: null }, action) => {
//   switch(action.type) {
//     case 'USER_LOGIN':
//       return Object.assign({}, state, { loggedIn: action.data });
//   }
//   return state;
// }/*middleware would go here , default initial state*/);


const inlineStyle = () => ({
  'border': 'solid black',
  'display': 'flex',
  'flex': '1',
  'flexDirection': 'column',
  'alignItems': 'center',
  'justifyContent': 'center',
});

let App = ({ updateEditor, /*updateSelection*/ editorState, selectionState, loggedIn}) => {
  return (<MuiThemeProvider>
    {/* {!loggedIn ? (<Login />) : */}
      {/* ( */}
        <div>
        <Textbar/>
        <div style={inlineStyle()}>
          <TextEditor
            updateEditor={updateEditor}
            // updateSelection={(selectionState) => updateSelection(selectionState)}
            editorState={editorState}
            selectionState={selectionState}
          />
        </div>
      </div>
    {/* ) */}
    {/* } */}

  </MuiThemeProvider>);
}

const mapStateToProps = ({ editorState, selectionState, loggedIn }) => ({ editorState, selectionState, loggedIn});

const mapDispatchToProps = (dispatch) => ({
  updateEditor: (editorState, selectionState) => {
    dispatch(handleEditor(editorState, selectionState));
  },
});

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
