import { Extension } from '@tiptap/core';
const INDENT_SIZE = 40; // px per level
const MAX_INDENT = 8;
const TextIndent = Extension.create({
    name: 'textIndent',
    addOptions() {
        return {
            types: [
                'paragraph',
                'heading',
                'blockquote',
                'bulletList',
                'orderedList',
            ],
        };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    indent: {
                        default: 0,
                        parseHTML: (element) => {
                            const paddingLeft = element.style.paddingLeft;
                            if (!paddingLeft)
                                return 0;
                            return Math.round(parseInt(paddingLeft) / INDENT_SIZE);
                        },
                        renderHTML: (attributes) => {
                            if (!attributes.indent || attributes.indent === 0)
                                return {};
                            return {
                                style: `padding-left: ${attributes.indent * INDENT_SIZE}px`,
                            };
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            indent: () => ({ tr, state, dispatch }) => {
                const { selection } = state;
                const { from, to } = selection;
                state.doc.nodesBetween(from, to, (node, pos) => {
                    if (this.options.types.includes(node.type.name)) {
                        const currentIndent = node.attrs.indent || 0;
                        if (currentIndent < MAX_INDENT && dispatch) {
                            tr.setNodeMarkup(pos, undefined, {
                                ...node.attrs,
                                indent: currentIndent + 1,
                            });
                        }
                    }
                });
                if (dispatch)
                    dispatch(tr);
                return true;
            },
            outdent: () => ({ tr, state, dispatch }) => {
                const { selection } = state;
                const { from, to } = selection;
                state.doc.nodesBetween(from, to, (node, pos) => {
                    if (this.options.types.includes(node.type.name)) {
                        const currentIndent = node.attrs.indent || 0;
                        if (currentIndent > 0 && dispatch) {
                            tr.setNodeMarkup(pos, undefined, {
                                ...node.attrs,
                                indent: currentIndent - 1,
                            });
                        }
                    }
                });
                if (dispatch)
                    dispatch(tr);
                return true;
            },
        };
    },
    addKeyboardShortcuts() {
        return {
            Tab: () => this.editor.commands.indent(),
            'Shift-Tab': () => this.editor.commands.outdent(),
        };
    },
});
export default TextIndent;
