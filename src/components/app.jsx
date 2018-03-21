import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toolbar from './Toolbar';
import TextEditor from './TextEditor';
import Login from './Login';
import Home from './Home';
// react-redux - the bindings, the connections
import { Provider, connect } from 'react-redux';
// the difference is that redux is the idea of having a store,
//    a reducer, and actions
import { createStore } from 'redux';

const inlineStyle = () => ({
  // 'width': '1000px',
  // 'height': '500px',
  border: 'solid black',
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  // 'backgroundColor': input.guessed ? 'red' : 'yellow'
});

/* reducer - a function; */
const store = createStore((state = { loggedIn: null }, action) => {
  switch(action.type) {
    case 'USER_LOGIN':
      return Object.assign({}, state, { loggedIn: action.data });
  }
  return state;
}/*middleware would go here , default initial state*/);

class App extends React.Component {
  render() {
    const { loggedIn } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          {!loggedIn ? <Login /> : <Home />}
          {/* <Toolbar /> */}
          <div style={inlineStyle()}>
            {/* <TextEditor /> */}
          </div>
        </div>
      </MuiThemeProvider>);
  }
}



const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn
});

const mapStateToDispatch = (dispatch) => ({

});

const App2 = connect(mapStateToProps, mapStateToDispatch)(App);

export default class AppShell extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <App2 />
    </Provider>);
  }
}
