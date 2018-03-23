import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Textbar from './Toolbar';
import TextEditor from './TextEditor';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Toggle from 'material-ui/Toggle'



import {connect} from 'react-redux';
import {handleEditor, handleThemeChange, handleUpdate, handleExit} from '../actions/index';

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

const Document = ({ updateEditor, editorState, isDarkTheme, changeTheme, currDOC, socket, updateDoc, leaveDoc, title }) => {

  return (<MuiThemeProvider muiTheme={getMuiTheme(!isDarkTheme ? lightBaseTheme : darkBaseTheme)}>
    <div>
        <Toggle onToggle={() => {
          changeTheme(isDarkTheme);
          document.body.style.backgroundColor = !isDarkTheme ? "#3c3b3b" : "#f6f7f9";
        }}/>
        <div style={inlineStyle()}>
          <TextEditor
            title={title}
            updateEditor={updateEditor}
            editorState={editorState}
            currDOC={currDOC}
            socket={socket}
            leaveDoc={leaveDoc}
            handleUpdate={updateDoc}
          />
        </div>
    </div>
  </MuiThemeProvider>);
}

const mapStateToProps = ({ editorState, isDarkTheme, currDOC, socket, title }) => ({
  editorState, isDarkTheme, currDOC, socket, title });

const mapDispatchToProps = (dispatch) => ({
  updateEditor: (editorState) => {
    dispatch(handleEditor(editorState));
  },
  changeTheme: (isDarkTheme) => {
    dispatch(handleThemeChange(isDarkTheme))
  },
  updateDoc: state => dispatch(handleUpdate(state)),
  leaveDoc: () => dispatch(handleExit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Document);
