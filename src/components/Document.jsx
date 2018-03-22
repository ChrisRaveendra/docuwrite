import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Textbar from './Toolbar';
import TextEditor from './TextEditor';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';



import {connect} from 'react-redux';
import {handleEditor, handleThemeChange, handleExit} from '../actions/index';

const inlineStyle = () => ({
  // 'width': '1000px',
  // 'height': '500px',
  // 'display': 'flex',
  // 'flex': '1',
  // 'flexDirection': 'column',
  // 'alignItems': 'center',
  // 'justifyContent': 'center',
  'overflow': 'visible',
  'height': 'calc(100vh - 160px)',
});

const Document = ({ updateEditor, editorState, selectionState, isDarkTheme, changeTheme, currDOC, socket, leaveDoc }) => {

  return (<MuiThemeProvider muiTheme={getMuiTheme(!isDarkTheme ? lightBaseTheme : darkBaseTheme)}>
    <div>
        <Toggle onToggle={() => {
          changeTheme(isDarkTheme);
          document.body.style.backgroundColor = !isDarkTheme ? "#3c3b3b" : "#f6f7f9";
        }}/>
        <div style={inlineStyle()}>
          <TextEditor
            updateEditor={updateEditor}
            editorState={editorState}
            selectionState={selectionState}
            currDOC={currDOC}
            socket={socket}
            leaveDoc={leaveDoc}
          />
        </div>
    </div>
  </MuiThemeProvider>);
}

const mapStateToProps = ({ editorState, selectionState, isDarkTheme, currDOC, socket }) => ({ editorState, selectionState, isDarkTheme, currDOC, socket });

const mapDispatchToProps = (dispatch) => ({
  updateEditor: (editorState, selectionState) => {
    dispatch(handleEditor(editorState, selectionState));
  },
  changeTheme: (isDarkTheme) => {
    dispatch(handleThemeChange(isDarkTheme))
  },
  leaveDoc: () => {
    dispatch(handleExit());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Document);
