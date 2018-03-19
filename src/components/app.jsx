import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toolbar from './Toolbar';
import TextEditor from './TextEditor';

export default class App extends React.Component {
  render() {
    return (<MuiThemeProvider><div>
      <Toolbar />

      <h2>Welcome to React!</h2>

      <TextEditor />
    </div>
    </MuiThemeProvider>);
  }
}
