import { useEffect, useReducer } from 'react';
/**
 * Forces a React re-render whenever the editor's selection or content changes.
 * Required because useCurrentEditor() reads from context but does not set up
 * its own subscriptions — toolbar components won't otherwise re-render when
 * the cursor moves or marks change.
 */
export function useEditorRerender(editor) {
    const [, rerender] = useReducer((n) => n + 1, 0);
    useEffect(() => {
        if (!editor)
            return;
        editor.on('selectionUpdate', rerender);
        editor.on('update', rerender);
        return () => {
            editor.off('selectionUpdate', rerender);
            editor.off('update', rerender);
        };
    }, [editor]);
}
