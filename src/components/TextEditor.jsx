import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Editor, EditorState, RichUtils, convertToRaw, Modifier} from 'draft-js';
import {OrderedSet} from 'immutable';
import Paper from 'material-ui/Paper';
import Textbar from './Toolbar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import createStyles from 'draft-js-custom-styles';


export default class TextEditor extends React.Component {
  //onChange is used to update the state of the Draft.js editor for any toolbox changes (bold, italics, etc)
  constructor(props) {
    super(props);
  }
  // Update editor state & selection state then pass these new states to the UPDATE action
  // This will result in the reducer signaling updates to the DOM

  setAlign = () => {
    // e.preventDefault();
    const newEditorState = styles.textAlign.current(this.props.editorState);
    console.log(newEditorState);
    this.handleEditorChange(newEditorState);
  }

  /*  Take in newly changed draftJS editor state & format correctly for use in redux Action
        Occurs for both:
            1) Any changes to Editor
            2) Any interactions with Toolbar */
  //CURRENT OBSERVATIONS:
  //  shows empty selection state for commands (ctrl + z)
  //  Tab exits the editor
  //  does show a selection state for bold/italic button click
  handleEditorChange = (editorState) => {
    // debugger;
    this.props.updateEditor(editorState);
  }

  render() {
    return (<div id='content'>
      <h1>Welcome to doCuwRitE</h1>

      <Paper zDepth={2}>
            <Textbar
                updateEditor={this.props.updateEditor}
                editorState={this.props.editorState}
            />
        <Editor className='editor'
                editorState={this.props.editorState}
                onChange={this.handleEditorChange}
                spellCheck={true} 
                ref='editor' 
        />
      </Paper>
    </div>);
  }
}
