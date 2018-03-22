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
