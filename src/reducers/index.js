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
  room: null,
};

// defaultState.selectionState = defaultState.editorState.getSelection();

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    // GOAL: To update state & signal the correct visual changes but have modular access to the different components (editor, selection, content)
    case 'UPDATE_EDITOR_STATE':
        // debugger;
      console.log(action.editor.toJS());
      return {
        ...state,
        editorState: action.editor,
        selectionState: action.selection,
      };
    case 'USER_LOGIN':

      return {
        ...state,
        loggedIn: action.data.username,
        userID: action.data.userID,
        socket: io('http://localhost:3000'),
      };
    case 'JOIN_DOC':
      return {
        ...state,
        currDOC: action.docID,
        currState: action.state,
        room: action.room,
      };
    default:
      return state;
  }
};

export default reducer;
