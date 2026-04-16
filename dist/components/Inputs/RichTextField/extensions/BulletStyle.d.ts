import { Extension } from '@tiptap/core';
export type BulletStyleType = 'disc' | 'circle' | 'square' | 'none';
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        bulletStyle: {
            setBulletStyle: (style: BulletStyleType) => ReturnType;
        };
    }
}
declare const BulletStyle: Extension<any, any>;
export default BulletStyle;
//# sourceMappingURL=BulletStyle.d.ts.map