import { Modifier, EditorState, RichUtils } from 'draft-js';

const getCurrentlySelectedBlock = (editorState) => {
	const selection = editorState.getSelection();
	const startKey = selection.getStartKey();
	let endKey = selection.getEndKey();
	const content = editorState.getCurrentContent();
	let target = selection;

	// Triple-click can lead to a selection that includes offset 0 of the
	// following block. The `SelectionState` for this case is accurate, but
	// we should avoid toggling block type for the trailing block because it
	// is a confusing interaction.
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

const ALIGNMENTS = {
	CENTER:  'center',
	JUSTIFY: 'justify',
	LEFT:    'left',
	RIGHT:   'right'
};

const ALIGNMENT_DATA_KEY = 'textAlignment';

const ExtendedRichUtils = Object.assign({}, RichUtils, {
	// Largely copied from RichUtils' `toggleBlockType`
	toggleAlignment(editorState, alignment) {
		const { content, currentBlock, hasAtomicBlock, target } = getCurrentlySelectedBlock(editorState);

		if (hasAtomicBlock) {
			return editorState;
		}

		const blockData = currentBlock.getData();
		const alignmentToSet = blockData && blockData.get(ALIGNMENT_DATA_KEY) === alignment ?
			undefined :
			alignment;

		return EditorState.push(
			editorState,
			Modifier.mergeBlockData(content, target, {
				[ALIGNMENT_DATA_KEY]: alignmentToSet
			}),
			'change-block-data'
		);
	}
});

export default ExtendedRichUtils;
