import { Editor, EditorState, SelectionState, RichUtils, convertFromRaw } from 'draft-js';
import { debug } from 'util';

const defaultState = {
  editorState: EditorState.createEmpty(),
  selectionState: SelectionState.createEmpty(),
  loggedIn: null,
  isDarkTheme: false
};

// defaultState.selectionState = defaultState.editorState.getSelection();

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    //GOAL: To update state & signal the correct visual changes but have modular access to the different components (editor, selection, content)
    case 'UPDATE_EDITOR_STATE':
        // debugger;
        return {
          ...state,
          editorState: action.editor,
          selectionState: action.selection
        };
    case 'UPDATE_THEME':
        return {
          ...state,
          isDarkTheme: !action.isDarkTheme,
        }
    case 'USER_LOGIN':
        return {
          ...state,
          loggedIn: action.data,
        }
    default:
        return state;
  }
}

export default reducer;
