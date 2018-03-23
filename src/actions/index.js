export function handleEditor(editorState) {
    return {
        type: 'UPDATE_EDITOR_STATE',
        editor: editorState,
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

export function handleUpdate(state, title) {
  return {
    type: 'UPDATE_DOC',
    state,
    title,
  }
}
