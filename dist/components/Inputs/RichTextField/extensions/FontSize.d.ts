import { Extension } from '@tiptap/core';
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (size: string) => ReturnType;
            unsetFontSize: () => ReturnType;
        };
    }
}
declare const FontSize: Extension<any, any>;
export default FontSize;
//# sourceMappingURL=FontSize.d.ts.map