import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Textbar from './Toolbar';
import TextEditor from './TextEditor';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Toggle from 'material-ui/Toggle'
import { convertToRaw } from 'draft-js';


import {connect} from 'react-redux';
import {handleEditor, handleThemeChange, handleUpdate, handleExit} from '../actions/index';

const inlineStyle = () => ({
  'overflow': 'visible',
  'height': 'calc(100vh - 160px)',

});

const Document = ({ updateEditor, editorState, isDarkTheme, changeTheme, currDOC, socket, title, updateDoc, leaveDoc }) => {

  return (<MuiThemeProvider muiTheme={getMuiTheme(!isDarkTheme ? lightBaseTheme : darkBaseTheme)}>
    <div>
        <Toggle onToggle={() => {          
          let stringState = convertToRaw(editorState.getCurrentContent());
          stringState = JSON.stringify(stringState);
          socket.emit('update-document',
          { docID: currDOC, state: stringState, title: title },
          ({ success }) => {
            changeTheme(isDarkTheme);
              // this must be emitted for updates to occur
              console.log('success?!', success);
              console.log('title??', title);
              console.log('newTheme', isDarkTheme)
              updateEditor(editorState);
            });
          
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

const mapStateToProps = ({ editorState, isDarkTheme, currDOC, socket, title }) => ({ editorState, isDarkTheme, currDOC, socket, title });

const mapDispatchToProps = (dispatch) => ({
  updateEditor: (editorState) => {
    dispatch(handleEditor(editorState));
  },
  changeTheme: (isDarkTheme) => {
    dispatch(handleThemeChange(isDarkTheme));
  },
  updateDoc: (state, title, date) => {
    dispatch(handleUpdate(state, title, date));
  },
  leaveDoc: () => dispatch(handleExit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Document);
