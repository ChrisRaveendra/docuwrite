import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toolbar from './Toolbar';
import TextEditor from './TextEditor';

const inlineStyle = () => ({
  // 'width': '1000px',
  // 'height': '500px',
  'border': 'solid black',
  'display': 'flex',
  'flex': '1',
  'flexDirection': 'column',
  'alignItems': 'center',
  'justifyContent': 'center',
  // 'backgroundColor': input.guessed ? 'red' : 'yellow'
});

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Toolbar />
            <div style={inlineStyle()}>

              <h2>Welcome to React!</h2>

              <TextEditor />
            </div>
        </div>
      </MuiThemeProvider>);
  }
}
