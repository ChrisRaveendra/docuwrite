import { Editor, EditorState, SelectionState, RichUtils, convertFromRaw } from 'draft-js';

const defaultState = { 
  editorState: EditorState.createEmpty(), 
  selectionState: SelectionState.createEmpty(),
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    //GOAL: To update state & signal the correct visual changes but have modular access to the different components (editor, selection, content)
    case 'UPDATE_EDITOR_STATE':
        return {
          ...state,
          editorState: EditorState.createWithContent(convertFromRaw(action.editor)),
          selectionState: action.selection,
        };

    default:
        return state;
  }
}

export default reducer;
