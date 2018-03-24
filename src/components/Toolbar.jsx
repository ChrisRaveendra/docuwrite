import React from 'react';

// Material UI Components
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';

// Material UI Icons
import FormatBold from 'material-ui/svg-icons/editor/format-bold';
import FormatItalic from 'material-ui/svg-icons/editor/format-italic';
import FormatUnderlined from 'material-ui/svg-icons/editor/format-underlined';
import FormatAlignCenter from 'material-ui/svg-icons/editor/format-align-center';
import FormatAlignLeft from 'material-ui/svg-icons/editor/format-align-left';
import FormatAlignRight from 'material-ui/svg-icons/editor/format-align-right';
import FormatAlignJustify from 'material-ui/svg-icons/editor/format-align-justify';
import Code from 'material-ui/svg-icons/action/code';
import FormatSize from 'material-ui/svg-icons/editor/format-Size';
import FormatColorText from 'material-ui/svg-icons/editor/format-color-text';
import { SketchPicker, GithubPicker } from 'react-color';
import FormatListBulleted from 'material-ui/svg-icons/editor/format-list-bulleted';
import FormatListNumbered from 'material-ui/svg-icons/editor/format-list-Numbered';

// Custom editor styling with draftJS and draft-js-custom-styles
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js';
import ExtendedRichUtils from '../utils/ExtendedRichUtils';
import createStyles from 'draft-js-custom-styles';
import {connect} from 'react-redux';
import getCurrentlySelectedBlock from '../utils/getCurrentlySelectedBlock';

// Extended customStylesMap with desired css attributes
const customStyleMap = {};
const { styles, customStyleFn, exporter } = createStyles([
  'font-size', 'color', 'font-weight', 'font-style', 'text-decoration', 'text-align', 'width', 'display', 'text-indent'
], 'CUSTOM_', customStyleMap);

export default class Textbar extends React.Component {
  state = {}

  /* @params: e - event object
     @returns null
     Toggles bold inlineStyle and sends newEditorState to update Redux state
  */
  toggleBold = (e) => {
    e.preventDefault();
    const newEditorState = styles.fontWeight.toggle(this.props.editorState, 'bold');
    this.handleEditorChange(newEditorState);
  };

  /* @params: e - event object
     @returns null
     Toggles italic inlineStyle and sends newEditorState to update Redux state.
  */
  toggleItalic = (e) => {
    e.preventDefault();
    const newEditorState = styles.fontStyle.toggle(this.props.editorState, 'italic');
    this.handleEditorChange(newEditorState);
  };

  /* @params: e - event object
     @returns null
     Toggles underline inlineStyle and sends newEditorState to update Redux state.
  */
  toggleUnderline = (e) => {
    e.preventDefault();
    const newEditorState = styles.textDecoration.toggle(this.props.editorState, 'underline');
    this.handleEditorChange(newEditorState);
  };

  /* @params: e - event object
     @returns null
     Sets draftJS ContentBlock alignment Right and sends newEditorState to update Redux state.
  */
  toggleAlignRight = (e) => {
    e.preventDefault();
    const newEditorState = ExtendedRichUtils.toggleAlignment(this.props.editorState, "RIGHT");
    this.handleEditorChange(newEditorState);
  }

  /* @params: e - event object
     @returns null
     Sets draftJS ContentBlock alignment Center and sends newEditorState to update Redux state.
  */
  toggleAlignCenter = (e) => {
    e.preventDefault();
    const newEditorState = ExtendedRichUtils.toggleAlignment(this.props.editorState, "CENTER");
    this.handleEditorChange(newEditorState);
  }

  /* @params: e - event object
     @returns null
     Sets draftJS ContentBlock alignment Left and sends newEditorState to update Redux state.
  */
  toggleAlignLeft = (e) => {
    e.preventDefault();
    const newEditorState = ExtendedRichUtils.toggleAlignment(this.props.editorState, "LEFT");
    this.handleEditorChange(newEditorState);
  }

  /* @params: e - event object
     @returns null
     Justifyies draftJS ContentBlock and sends newEditorState to update Redux state.
  */
  toggleAlignJustify = (e) => {
    e.preventDefault();
    const newEditorState = ExtendedRichUtils.toggleAlignment(this.props.editorState, "JUSTIFY");
    this.handleEditorChange(newEditorState);
  }

  /* @params: e - event object
     @returns null
     Toggles unordered-list ContentBlock Styling and sends newEditorState to update Redux state.
  */
  toggleUl = (e) => {
    e.preventDefault();
    const newEditorState = RichUtils.toggleBlockType(this.props.editorState,"unordered-list-item")
    this.handleEditorChange(newEditorState);
  }

  /* @params: e - event object
     @returns null
     Toggles ordered-list ContentBlock Styling and sends newEditorState to update Redux state.
  */
  toggleOl = (e) => {
    e.preventDefault();
    const newEditorState = RichUtils.toggleBlockType(this.props.editorState,"ordered-list-item")
    this.handleEditorChange(newEditorState);
  }

  /* @params: e - event object
     @returns null
     Toggles code-block ContentBlock Styling and sends newEditorState to update Redux state.
  */
  toggleCodeBlock = (e) => {
    e.preventDefault();
    const newEditorState = RichUtils.toggleBlockType(this.props.editorState,"code-block")
    this.handleEditorChange(newEditorState);
  }

  /* @params: e - event object
     @returns null
     Sets text color inlineStyle and sends newEditorState to update Redux state.
  */
  handleColorChange = (color) => {
    const newEditorState = styles.color.toggle(this.props.editorState, color.hex);
    this.handleEditorChange(newEditorState);
  };

  /* @params: font - string
     @returns null
     Sets text font-size in selection to font and sends newEditorState to update Redux state.
  */
  handleFontChange = (font) => {
    const newEditorState = styles.fontSize.toggle(this.props.editorState, font);
    this.handleEditorChange(newEditorState);
  }

  /* @params: editorState - object - holds drafJS EditorState object
     @returns null
     Sends action to reducer with new editor state. Updates Redux editor state.
  */
  handleEditorChange = (editorState) => {
    this.props.updateEditor(editorState);
  }

  /* @params: type - string - name of icon;
              fnName - string - name of handler fn;
              array - array - contains values of menu items
     @returns null
     Creates Popover component containing Menu with mapped values. Adds onMouseDown
     fn to each Menu item which calls a handler fn with selected val.
  */
  makePopOver(type, fnName, array) {
      return (
        <span>
          <FormatSize color={'white'}
          //  icon={icon}
            onMouseDown={(e) => {
              e.preventDefault();
              this.setState({[`popOver${type}`]:true, fontMenuEl: e.currentTarget})
            }}
          />
          <Popover
            disableAutoFocus={true}
            open={this.state[`popOver${type}`]}
            anchorEl={this.state.fontMenuEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          //  onRequestClose={() => this.setState({[`popOver${type}`]: false})}
          >
            <Menu disableAutoFocus={true}>
              {array.map((val) => (<MenuItem
                primaryText={val}
                onMouseDown={(e) => {
                  e.preventDefault()
                  this.setState({[`popOver${type}`]:false})
                  this[fnName](val)
                }}/>)
              )}
            </Menu>
          </Popover>
        </span>
      )
    }

  render() {
    // Toggle icon color with current styling:
    // Array of inline styles
    const inlineStyles = this.props.editorState.getCurrentInlineStyle().toJS();
    // Current block styles (ie. code-block, ul, & ol)
    const {currentBlock} = getCurrentlySelectedBlock(this.props.editorState);
    const blockStyle = currentBlock.toJS().type;
    const textAlign = currentBlock.getData().get("textAlignment") === undefined ?
                      "LEFT" :
                      currentBlock.getData().get("textAlignment");
    return (
      <div style={{
        'position': 'sticky',
        'top': '0px'
      }}>
        <Toolbar style={{'display':'flex', 'alignItems': 'center'}}>
          {/* bold button */}
          <FormatBold onMouseDown={this.toggleBold} color={inlineStyles.includes("CUSTOM_FONT_WEIGHT_bold") ? 'black' : 'white'} />

          {/* italic button */}
          <FormatItalic onMouseDown={this.toggleItalic} color={inlineStyles.includes("CUSTOM_FONT_STYLE_italic") ? 'black' : 'white'} />

          {/* underline button */}
          <FormatUnderlined onMouseDown={this.toggleUnderline} color={inlineStyles.includes("CUSTOM_TEXT_DECORATION_underline") ? 'black' : 'white'} />

          {/* code-block button */}
          <Code onMouseDown={this.toggleCodeBlock} color={blockStyle === 'code-block' ? 'black' : 'white'} />

          {/* left alignment button */}
          <FormatAlignLeft onMouseDown={this.toggleAlignLeft} color={textAlign === 'LEFT' ? 'black' : 'white'}/>

          {/* center alignment button */}
          <FormatAlignCenter onMouseDown={this.toggleAlignCenter} color={textAlign === 'CENTER' ? 'black' : 'white'}/>

          {/* right alignment button */}
          <FormatAlignRight onMouseDown={this.toggleAlignRight} color={textAlign === 'RIGHT' ? 'black' : 'white'}/>

          {/* justify content button */}
          <FormatAlignJustify onMouseDown={this.toggleAlignJustify} color={textAlign === 'JUSTIFY' ? 'black' : 'white'}/>

          {/* font-size dropdown menu */}
          {this.makePopOver('fontSize', 'handleFontChange', ['14px', '18px', '20px', '24px', '26px', '36px'])}

          {/* color picker dropdown selector */}
          <div onMouseDown={(e) => e.preventDefault()}>
            <IconMenu
              disableAutoFocus={true}
              iconButtonElement={<IconButton><FormatColorText color={'white'}/></IconButton>}
              animated={false}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              >

              <MenuItem
                primaryText={< SketchPicker
                  onChangeComplete=
                  {this.handleColorChange}
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
              <MenuItem value="Del" primaryText="Customize" />
            </IconMenu>
          </div>

          {/* ul button */}
          <FormatListBulleted onMouseDown={this.toggleUl} color={blockStyle === 'unordered-list-item' ? 'black' : 'white'}/>

          {/* ol button */}
          <FormatListNumbered onMouseDown={this.toggleOl} color={blockStyle === 'ordered-list-item' ? 'black' : 'white'}/>
        </Toolbar>
      </div>
    );
  }
}
