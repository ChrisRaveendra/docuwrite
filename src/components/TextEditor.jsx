import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Editor, EditorState, RichUtils, convertToRaw, Modifier} from 'draft-js';
import {OrderedSet} from 'immutable';
import Paper from 'material-ui/Paper';
import Textbar from './Toolbar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import createStyles from 'draft-js-custom-styles';
import {getDefaultKeyBinding, KeyBindingUtil} from 'draft-js';
const {hasCommandModifier} = KeyBindingUtil;

const customStyleMap = {
  MARK: {
    backgroundColor: 'Yellow',
    fontStyle: 'italic'
  }
};

//bind the cmd-b, cmd-i, and cmd-u keys to trigger style toggles
const myKeyBindingFn = (e: SyntheticKeyboardEvent): string => {
  if (e.keyCode === 66 /* `b` key */ && hasCommandModifier(e)) {
    return 'bold';
  }
  if (e.keyCode === 73 /* `b` key */ && hasCommandModifier(e)) {
    console.log('i hit')
    return 'italic';
  }
  if (e.keyCode === 85 /* `b` key */ && hasCommandModifier(e)) {
    console.log('u hit')
    return 'underline';
  }
  return getDefaultKeyBinding(e);
}

// Passing the customStyleMap is optional
const {styles, customStyleFn, exporter} = createStyles([
  'font-size', 'color', 'font-weight', 'font-style', 'text-decoration', 'text-align'
], 'CUSTOM_', customStyleMap);

export default class TextEditor extends React.Component {
  // Update editor state & selection state then pass these new states to the UPDATE action
  // This will result in the reducer signaling updates to the DOM

  /*  Take in newly changed draftJS editor state & format correctly for use in redux Action
        Occurs for both:
            1) Any changes to Editor
            2) Any interactions with Toolbar */
  //CURRENT OBSERVATIONS:
  //  shows empty selection state for commands (ctrl + z)
  //  Tab exits the editor
  //  does show a selection state for bold/italic button click
  handleEditorChange = (editorState) => {
    this.props.updateEditor(editorState);
  }

  handleKeyCommand = (command: string): DraftHandleValue => {
    if (command === 'bold') {
      const newEditorState = styles.fontWeight.toggle(this.props.editorState, 'bold');
      this.handleEditorChange(newEditorState);
    }
    if (command === 'italic') {
      const newEditorState = styles.fontStyle.toggle(this.props.editorState, 'italic');
      this.handleEditorChange(newEditorState);
    }
    if (command === 'underline') {
      const newEditorState = styles.textDecoration.toggle(this.props.editorState, 'underline');
      this.handleEditorChange(newEditorState);
    }
    return 'not-handled';
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
                spellCheck={true} ref='editor'
                customStyleFn={customStyleFn}
                customStyleMap={customStyleMap}
                handleKeyCommand={this.handleKeyCommand}
                keyBindingFn={myKeyBindingFn}
            />
      </Paper>
    </div>);
  }
}
