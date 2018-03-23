import { Editor, EditorState, SelectionState, RichUtils, convertFromRaw } from 'draft-js';
import { debug } from 'util';
import io from 'socket.io-client';

const defaultState = {
  editorState: EditorState.createEmpty(),
  selectionState: SelectionState.createEmpty(),
  loggedIn: null,
  userID: null,
  currDOC: null,
  currState: null,
  socket: null,
  title: null,
  isDarkTheme: false
};

// defaultState.selectionState = defaultState.editorState.getSelection();

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    // GOAL: To update state & signal the correct visual changes but have modular access to the different components (editor, selection, content)
    case 'UPDATE_EDITOR_STATE':
      return {
        ...state,
        editorState: action.editor,
      };
    case 'USER_LOGIN':
      return {
        ...state,
        loggedIn: action.data.username,
        userID: action.data.userID,
        socket: io('http://localhost:3000/'),
      };
    case 'UPDATE_TITLE':
      return {
        ...state,
        title: action.title
      }
    case 'JOIN_DOC':
      return {
        ...state,
        currDOC: action.docID,
        editorState: action.state ? EditorState.createWithContent(convertFromRaw(JSON.parse(action.state))) : EditorState.createEmpty(),
        title: action.title,
      };
    case 'UPDATE_DOC':
      debugger;
      return {
        ...state,
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(action.state))),
        title: action.title,
        date: action.date
      };
    case 'LEAVE_DOC':
      return {
      ...state,
      currDOC: null,
      currState: null,
      title: null,
      isDarkTheme: false,
    }
    case 'UPDATE_THEME':
      return {
        ...state,
        isDarkTheme: !action.isDarkTheme,
      };
    case 'LOGOUT':
      return {
        ...state,
        loggedIn: null,
        currDOC: null,
        currState: null,
        title: null,
        date: null,
        socket: null,
        isDarkTheme: false,
      }
    default:
      return state;
  }
};

export default reducer;
