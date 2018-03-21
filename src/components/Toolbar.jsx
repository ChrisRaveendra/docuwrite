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


export default class Textbar extends React.Component {
  render() {
    return (
      <div>
        <Toolbar title="My Toolbar">
          
          <button type="button" >
            Bold
          </button>
          
          <button type="button" >
            Italic
          </button>

        </Toolbar>
      </div>
    );
  }
}
