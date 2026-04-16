import type { Editor } from '@tiptap/react';
/**
 * Forces a React re-render whenever the editor's selection or content changes.
 * Required because useCurrentEditor() reads from context but does not set up
 * its own subscriptions — toolbar components won't otherwise re-render when
 * the cursor moves or marks change.
 */
export declare function useEditorRerender(editor: Editor | null): void;
//# sourceMappingURL=useEditorRerender.d.ts.map