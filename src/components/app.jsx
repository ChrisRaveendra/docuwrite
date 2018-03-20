import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Textbar from './Toolbar';
import TextEditor from './TextEditor';

import {connect} from 'react-redux';
import {handleEditor, handleSelection} from '../actions/index';

const inlineStyle = () => ({
  // 'width': '1000px',
  // 'height': '500px',
  'border': 'solid black',
  'display': 'flex',
  'flex': '1',
  'flexDirection': 'column',
  'alignItems': 'center',
  'justifyContent': 'center',
});

let App = ({ updateEditor, /*updateSelection*/ editorState, selectionState}) => {
  return (<MuiThemeProvider>
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
  </MuiThemeProvider>);
}

const mapStateToProps = ({ editorState, selectionState }) => ({ editorState, selectionState});

const mapDispatchToProps = (dispatch) => ({
  updateEditor: (editorState, selectionState) => {
    dispatch(handleEditor(editorState, selectionState));
  },
});

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
