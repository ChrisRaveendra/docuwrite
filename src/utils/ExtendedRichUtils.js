import { Modifier, EditorState, RichUtils } from 'draft-js';
import getCurrentlySelectedBlock from './getCurrentlySelectedBlock'

// Extend draftJS RichUtils module to include toggle for ContentBlock text-alignment
const ALIGNMENT_DATA_KEY = 'textAlignment';
const ExtendedRichUtils = Object.assign({}, RichUtils, {

	/* @params: editorState - object - holds draftJS EditorState
							alignment - string - desired text-alignment
		 @returns: object - draftJS EditorState with new ContentBlock meta-data
		 Toggles text-alignment for ContentBlock
	*/
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
