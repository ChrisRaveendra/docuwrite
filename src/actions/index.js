export function handleEditor(editorState, selectionState) {
    return {
        type: 'UPDATE_EDITOR_STATE',
        editor: editorState,
        selection: selectionState,
    }
}

export function handleThemeChange(isDarkTheme) {
    return {
        type: 'UPDATE_THEME',
        isDarkTheme: isDarkTheme
    }
}

export function handleExit() {
    return {
        type: 'LEAVE_DOC',
    }
}

export function handleUpdate(state) {
  return {
    type: 'UPDATE_DOC',
    state,
  }
}
