import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Textbar from './Toolbar';
import TextEditor from './TextEditor';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Toggle from 'material-ui/Toggle'



import {connect} from 'react-redux';
import {handleEditor, handleThemeChange, handleUpdate} from '../actions/index';

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

const Document = ({ updateEditor, updateDoc, editorState, selectionState, isDarkTheme, changeTheme }) => {

  return (<MuiThemeProvider muiTheme={getMuiTheme(!isDarkTheme ? lightBaseTheme : darkBaseTheme)}>
    <div>
      <Toggle onToggle={() => changeTheme(isDarkTheme)}/>
      {/* <Textbar
        updateEditor={updateEditor}
        editorState={editorState}
      /> */}
      <div style={inlineStyle()}>
        <TextEditor
          updateEditor={updateEditor}
          // updateSelection={(selectionState) => updateSelection(selectionState)}
          editorState={editorState}
          selectionState={selectionState}
          handleUpdate={updateDoc}
        />
      </div>
    </div>
  </MuiThemeProvider>);
}

const mapStateToProps = ({ editorState, selectionState, isDarkTheme }) => ({ editorState, selectionState, isDarkTheme });

const mapDispatchToProps = (dispatch) => ({
  updateEditor: (editorState, selectionState) => {
    dispatch(handleEditor(editorState, selectionState));
  },
  changeTheme: (isDarkTheme) => {
    dispatch(handleThemeChange(isDarkTheme))
  },
  updateDoc: state => dispatch(handleUpdate(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(Document);
