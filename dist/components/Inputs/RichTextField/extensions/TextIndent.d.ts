import { Extension } from '@tiptap/core';
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        textIndent: {
            indent: () => ReturnType;
            outdent: () => ReturnType;
        };
    }
}
declare const TextIndent: Extension<any, any>;
export default TextIndent;
//# sourceMappingURL=TextIndent.d.ts.map