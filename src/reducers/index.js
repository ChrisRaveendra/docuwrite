import { Editor, EditorState, RichUtils, convertFromRaw } from 'draft-js';

// const reducer = (state = { editorState: EditorState.createEmpty() }, action) => {
//   switch (action.type) {
//     case 'SELECT':
//         state.editorState
//     case 'ITALIC_SELECT':
//     default:
//         return state;
//   }
// }
//
// export default reducer;

const defaultState = { editorState: EditorState.createEmpty() };

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_EDITOR_STATE':
        console.log(action.content);
        console.log('state to update:', EditorState.createWithContent(convertFromRaw(action.content)));
        console.log('original state:', state.editorState);
        //return EditorState.createWithContent(convertFromRaw(action.content));
        return {
          ...state,
          editorState: EditorState.createWithContent(convertFromRaw(action.content))
        };
    default:
        return state;
  }
}

export default reducer;
