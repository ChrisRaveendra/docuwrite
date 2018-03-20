import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import Paper from 'material-ui/Paper';
import Textbar from './Toolbar';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

export default class TextEditor extends React.Component {
    //onChange is used to update the state of the Draft.js editor for any toolbox changes (bold, italics, etc)
    constructor(props) {
        super(props);

        this.focus = () => {this.refs.editor.focus()};
        
        this.onChange = (editorState, selectionState) => this.handleEditorChange(editorState, selectionState);
    }

    // Update editor state & selection state then pass these new states to the UPDATE action
    // This will result in the reducer signaling updates to the DOM
    _onBoldClick(e) {
        e.preventDefault();

        let newEditor = RichUtils.toggleInlineStyle(this.props.editorState,'BOLD');
        let newSelection = newEditor.getSelection();

        this.onChange(newEditor, newSelection);
    }

    _onItalicClick(e) {
        e.preventDefault();
        console.log(this);
        this.onChange(RichUtils.toggleInlineStyle(
            this.props.editorState,
            'ITALIC',
        ));
    }

    //Take in newly changed draftJS editor state & format correctly for use in redux Action
    handleEditorChange(editorState, selectionState) {
        this.props.updateEditor(
            convertToRaw(editorState.getCurrentContent()), 
            selectionState,
        );
    }


    render() {
        return (
            <div id='content'>
                <h1>Draft.js Editor</h1>
                        <button type="button" onMouseDown={this._onBoldClick.bind(this)}>
                            Bold
                    </button>
                        <button type="button" onMouseDown={this._onItalicClick.bind(this)}>
                            Italic
                    </button>
                <Paper zDepth={2}>
                    <div
                        onClick={this.focus}>
                        
                        <Editor
                            className='editor'
                            editorState={EditorState.acceptSelection(
                            this.props.editorState,
                            this.props.selectionState
                            )}
                            onChange={this.handleEditorChange.bind(this)}
                            spellCheck={true}
                            ref='editor'
                        />
                    </div>
                </Paper>
            </div>
        );
    }
}