import { Editor, EditorState, SelectionState, RichUtils, convertFromRaw } from 'draft-js';
import { debug } from 'util';

const defaultState = { 
  editorState: EditorState.createEmpty(), 
  selectionState: SelectionState.createEmpty(),
};

// defaultState.selectionState = defaultState.editorState.getSelection();

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    //GOAL: To update state & signal the correct visual changes but have modular access to the different components (editor, selection, content)
    case 'UPDATE_EDITOR_STATE':
        // debugger;
        console.log(action.editor.toJS())
        return {
          ...state,
          editorState: action.editor,
          selectionState: action.selection,
        };

    default:
        return state;
  }
}

export default reducer;
