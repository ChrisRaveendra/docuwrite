import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import Paper from 'material-ui/Paper';

export default class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };
        this.focus = () => {this.refs.editor.focus()};
        this.onChange = (editorState) => this.handleEditorChange(editorState);
        this.focus = () => {
          this.refs.editor.focus()
        }
    }

    _onBoldClick(e) {
        e.preventDefault();
        //console.log(this);
        console.log('Redux', this.props.editorState);
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            'BOLD',
        ));
    }

    _onItalicClick(e) {
        e.preventDefault();
        console.log(this);
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            'ITALIC',
        ));
    }

    handleEditorChange(editorState) {
    //  console.log(editorState)
    //  debugger;
      this.setState({editorState});
      this.props.updateEditor(convertToRaw(editorState.getCurrentContent()));
    }


    render() {
        return (
            <div id='content'>
                <h1>Draft.js Editor</h1>

                <button type="button" onMouseDown = {this._onBoldClick.bind(this)}>
                    Bold
                </button>
                <button type="button" onMouseDown = {this._onItalicClick.bind(this)}>
                    Italic
                </button>

                <Paper zDepth={2}>
                  <div
                    onClick={this.focus}>
                    <Editor
                        className='editor'
                        editorState={EditorState.acceptSelection(
                          this.props.editorState,
                          this.state.editorState.getSelection()
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
// const TextEditor = ({updateEditor}) => {
//   constructor(props) {
//       super(props);
//       //this.state = { editorState: EditorState.createWithContent(convertFromRaw(content)) };
//       this.focus = () => {this.refs.editor.focus()};
//       this.onChange = (editorState) => this.setState({ editorState });
//   }
//
//   _onBoldClick(e) {
//       e.preventDefault();
//       console.log(this);
//       this.onChange(RichUtils.toggleInlineStyle(
//           this.state.editorState,
//           'BOLD',
//       ));
//   }
//
//   _onItalicClick(e) {
//       e.preventDefault();
//       console.log(this);
//       this.onChange(RichUtils.toggleInlineStyle(
//           this.state.editorState,
//           'ITALIC',
//       ));
//   }
//
//   _onClick(format) {
//     console.log(format);
//     this.onChange(this.props.handleFormat(format));
//   }
//
//   handleEditorChange = (editorState) => {
//     this.setState({editorState});
//
//     this.props.updateEditor({
//       content: convertToRaw(editorState.getCurrentContent())
//     });
//   }
//
//   focus = () => {
//     this.refs.editor.focus()
//   }
//
//   render() {
//     return (<div id='content'>
//       <h1>Draft.js Editor</h1>
//
//       <button type="button" onMouseDown={this._onBoldClick.bind(this)}>
//         Bold
//       </button>
//       <button type="button" onMouseDown={this._onItalicClick.bind(this)}>
//         Italic
//       </button>
//       <button type="button" onMouseDown={this._onClick.bind(this, 'hello')}>
//         Test
//       </button>
//
//       <Paper zDepth={2}>
//         <Editor
//           className='editor'
//           //editorState={EditorState.acceptSelection(this.props.editorState, this.state.editorState.getSelection())}
//           editorState={this.props.editorState}
//           onChange={this.handleEditorChange}
//           spellCheck={true}
//           ref='editor'/>
//       </Paper>
//     </div>);
//   }
// };
