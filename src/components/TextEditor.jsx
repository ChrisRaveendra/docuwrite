import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Editor, EditorState, RichUtils, convertToRaw, Modifier } from 'draft-js';
import { OrderedSet } from 'immutable'; 
import Paper from 'material-ui/Paper';
import Textbar from './Toolbar';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

export default class TextEditor extends React.Component {
    //onChange is used to update the state of the Draft.js editor for any toolbox changes (bold, italics, etc)
    constructor(props) {
        super(props);
        
        // this.onChange = (editorState, selectionState) => this.handleEditorChange(editorState, selectionState);

        this.handleEditorChange = this._handleEditorChange.bind(this);
    }
    // Update editor state & selection state then pass these new states to the UPDATE action
    // This will result in the reducer signaling updates to the DOM
    _onBoldClick(e) {
        const currentSelection = this.props.editorState.getSelection();
        console.log('is collapsed: ', currentSelection.isCollapsed());
        
        e.preventDefault();
        
        let updatedSelect
        if (currentSelection.isCollapsed()) {


            let newEditor = EditorState.acceptSelection(this.props.editorState, currentSelection);
            const old = this.props.editorState.getInlineStyleOverride()

            newEditor = EditorState.setInlineStyleOverride(newEditor, OrderedSet.of('BOLD'));

            this.handleEditorChange(newEditor);

        } 
        
        else {
        let newEditor = EditorState.acceptSelection(this.props.editorState, currentSelection);
        
        newEditor = RichUtils.toggleInlineStyle(newEditor,'BOLD');
        // newEditor = EditorState.acceptSelection(newEditor, currentSelection);
        // let newSelection = newEditor.getSelection();
        
        this.handleEditorChange(newEditor);
        }
    }

    _onItalicClick(e) {
        e.preventDefault();
        console.log(this);
        this.onChange(RichUtils.toggleInlineStyle(
            this.props.editorState,
            'ITALIC',
        ));
    }

    /*  Take in newly changed draftJS editor state & format correctly for use in redux Action
        Occurs for both:
            1) Any changes to Editor 
            2) Any interactions with Toolbar */
    //CURRENT OBSERVATIONS: 
    //  shows empty selection state for commands (ctrl + z)
    //  Tab exits the editor
    //  does show a selection state for bold/italic button click
    _handleEditorChange(editorState) {
        // debugger;
        this.props.updateEditor(
            editorState,
        );
    }

    handleEditorChange(editorState) {
        // debugger;
        this.props.updateEditor(
            editorState,
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
                        <Editor
                            className='editor'
                            editorState={this.props.editorState}
                            onChange={this.handleEditorChange.bind()}
                            spellCheck={true}
                            ref='editor'
                        />
                </Paper>
            </div>
        );
    }
}