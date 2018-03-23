/* @params: editorState - object - draftJS EditorState obj
	 @returns: object - current - draftJS ContentState obj
	 										currentBlock - selected draftJS ContentBlock obj
											hasAtomicBlock - bool
											target - draftJS selection for desired block						
*/
const getCurrentlySelectedBlock = (editorState) => {
	const selection = editorState.getSelection();
	const startKey = selection.getStartKey();
	let endKey = selection.getEndKey();
	const content = editorState.getCurrentContent();
	let target = selection;

	// Avoid toggling block type for the trailing block
	if (startKey !== endKey && selection.getEndOffset() === 0) {
		const blockBefore = content.getBlockBefore(endKey);
		if (!blockBefore) {
			throw new Error('Got unexpected null or undefined');
		}

		endKey = blockBefore.getKey();
		target = target.merge({
			anchorKey: startKey,
			anchorOffset: selection.getStartOffset(),
			focusKey: endKey,
			focusOffset: blockBefore.getLength(),
			isBackward: false
		});
	}

	const hasAtomicBlock = content.getBlockMap()
		.skipWhile((_, k) => k !== startKey)
		.takeWhile((_, k) => k !== endKey)
		.some(v => v.getType() === 'atomic');

	const currentBlock = content.getBlockForKey(startKey);

	return {
		content,
		currentBlock,
		hasAtomicBlock,
		target
	};
};

export default getCurrentlySelectedBlock;
