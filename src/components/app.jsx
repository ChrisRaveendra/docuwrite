import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toolbar from './Toolbar';
import TextEditor from './TextEditor';

import {connect} from 'react-redux';
//import {handleFormat} from '../actions/index';

const inlineStyle = () => ({
  // 'width': '1000px',
  // 'height': '500px',
  'border': 'solid black',
  'display': 'flex',
  'flex': '1',
  'flexDirection': 'column',
  'alignItems': 'center',
  'justifyContent': 'center',
  // 'backgroundColor': input.guessed ? 'red' : 'yellow'
});

let App = ({ updateEditor, editorState }) => {
  return (<MuiThemeProvider>
    <div>
      <Toolbar/>
      <div style={inlineStyle()}>

        <h2>Welcome to React!</h2>

        <TextEditor
          updateEditor={(editorState) => updateEditor(editorState)}
          editorState={editorState}
        />
      </div>
    </div>
  </MuiThemeProvider>);
}

const mapStateToProps = ({ editorState }) => ({ editorState });
//
// const mapDispatchToProps = (dispatch) => ({
//   updateEditor: (editorState) => {
//     dispatch({
//       type: 'UPDATE_EDITOR_STATE',
//       content: editorState,
//     })
//   }
// });
const mapDispatchToProps = (dispatch) => ({
  updateEditor: (editorState) => {
    //debugger;
    dispatch({
      type: 'UPDATE_EDITOR_STATE',
      content: editorState,
    })
  }
});

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
