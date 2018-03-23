import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle'


import FormatBold from 'material-ui/svg-icons/editor/format-bold'
import FormatItalic from 'material-ui/svg-icons/editor/format-italic'
import FormatUnderlined from 'material-ui/svg-icons/editor/format-underlined'

import FormatAlignCenter from 'material-ui/svg-icons/editor/format-align-center'
import FormatAlignLeft from 'material-ui/svg-icons/editor/format-align-left'
import FormatAlignRight from 'material-ui/svg-icons/editor/format-align-right'

import FormatSize from 'material-ui/svg-icons/editor/format-Size'
import FormatColorText from 'material-ui/svg-icons/editor/format-color-text'
import { SketchPicker, GithubPicker } from 'react-color'


import FormatListBulleted from 'material-ui/svg-icons/editor/format-list-bulleted'
import FormatListNumbered from 'material-ui/svg-icons/editor/format-list-Numbered'

import Popover from 'material-ui/Popover'

import createStyles from 'draft-js-custom-styles';
import {connect} from 'react-redux';

const customStyleMap = {
  MARK: {
    backgroundColor: 'Yellow',
    fontStyle: 'italic'
  }
};

// Passing the customStyleMap is optional
const { styles, customStyleFn, exporter } = createStyles([
  'font-size', 'color', 'font-weight', 'font-style', 'text-decoration', 'text-align', 'width', 'display', 'text-indent'
], 'CUSTOM_', customStyleMap);

export default class Textbar extends React.Component {
  toggleBold = (e) => {
    e.preventDefault();
    const newEditorState = styles.fontWeight.toggle(this.props.editorState, 'bold');
    console.log(this)
    this.handleEditorChange(newEditorState);
  };

  toggleItalic = (e) => {
    e.preventDefault();
    const newEditorState = styles.fontStyle.toggle(this.props.editorState, 'italic');
    this.handleEditorChange(newEditorState);
  };

  toggleUnderline = (e) => {
    e.preventDefault();
    const newEditorState = styles.textDecoration.toggle(this.props.editorState, 'underline');
    this.handleEditorChange(newEditorState);
  };

  toggleCenter = (e) => {
    e.preventDefault();
    let newEditorState = styles.textAlign.toggle(this.props.editorState, 'center');
    newEditorState = styles.width.toggle(newEditorState, '100%');
    newEditorState = styles.display.toggle(newEditorState, 'block');

    // const newEditorState = RichUtils.toggleBlockType(this.props.editorState, 'center');
    console.log(newEditorState.getCurrentInlineStyle().toJS());
    this.handleEditorChange(newEditorState);
  };

  toggleBullet = (e) => {
    e.preventDefault();
    const newEditorState = styles.textIndent.toggle(this.props.editorState, '25');
    console.log(newEditorState.getCurrentInlineStyle().toJS());
    this.handleEditorChange(newEditorState);
  };

  handleEditorChange = (editorState) => {
    // debugger;
    // this.props.
    this.props.updateEditor(editorState);
  }

  handleChangeComplete = (color) => {
    console.log('old: ', this.props.editorState.getCurrentInlineStyle().toJS());
    const newEditorState = styles.color.toggle(this.props.editorState, color.hex);
    console.log('updated: ', newEditorState.getCurrentInlineStyle().toJS());
    this.handleEditorChange(newEditorState);
  };

  render() {
    let styles = this.props.editorState.getCurrentInlineStyle().toJS();
    return (
      <div style={{
        'position': 'sticky',
        'top': '0px'
      }}>
        <Toolbar style={{'display':'flex', 'alignItems': 'center'}}>
          <FormatBold onMouseDown={this.toggleBold}
                      color={styles.includes("CUSTOM_FONT_WEIGHT_bold") ? 'black' : 'white'}
                    />

          <FormatItalic onMouseDown={this.toggleItalic}
                        color={styles.includes("CUSTOM_FONT_STYLE_italic") ? 'black' : 'white'}
                      />

          <FormatUnderlined onMouseDown={this.toggleUnderline}
                            color={styles.includes("CUSTOM_TEXT_DECORATION_underline") ? 'black' : 'white'}/>

          <FormatAlignLeft hoverColor={'black'} color={'white'}/>

          <FormatAlignCenter hoverColor={'black'} color={'white'} onMouseDown={this.toggleCenter}
            color={styles.includes("CUSTOM_FONT_WEIGHT_bold") ? 'black' : 'white'}
          />

          <FormatAlignRight hoverColor={'black'} color={'white'}/>

          <FormatSize hoverColor={'black'} color={'white'}/>

          {/* <div>
          <RaisedButton
            onClick={this.handleClick}
            label="Click me"
          />
          <Popover
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.handleRequestClose}
          > */}
          <IconMenu
            iconButtonElement={<IconButton><FormatColorText /></IconButton>}
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            >

            <MenuItem
              primaryText={< SketchPicker
                onChangeComplete=
                {this.handleChangeComplete}
              />}
            />

            <MenuItem
              primaryText="Case Tools"
              menuItems={[
                <MenuItem primaryText="UPPERCASE" />,
                <MenuItem primaryText="lowercase" />,
                <MenuItem primaryText="CamelCase" />,
                <MenuItem primaryText="Propercase" />,
              ]}
            />
            {/* <Divider /> */}
            <MenuItem value="Del" primaryText="Customize" />

          </IconMenu>
          {/* </Popover>
          </div> */}

          {/* <FormatColorText hoverColor={'black'} color={'black'}/> */}

          <FormatListBulleted hoverColor={'black'} color={'white'} onMouseDown={this.toggleBullet}/>

          <FormatListNumbered hoverColor={'black'} color={'white'}/>

        </Toolbar>
      </div>
    );
  }
}
