import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Editor, EditorState, RichUtils } from 'draft-js';
import Paper from 'material-ui/Paper';

export default class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };
        this.onChange = (editorState) => this.setState({ editorState });
    }
    _onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            'BOLD',
        ));
    }
    render() {
        return (
            <div id='content'>
                <h1>Draft.js Editor</h1>
                <button onClick={this._onBoldClick.bind(this)}>Bold</button>
                <Paper  zDepth={5}>
                    <Editor
                        className='editor'
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                    />
                </Paper>
            </div >
    );
    }
}
