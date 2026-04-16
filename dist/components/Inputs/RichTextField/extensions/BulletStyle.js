import { Extension } from '@tiptap/core';
const BulletStyle = Extension.create({
    name: 'bulletStyle',
    addOptions() {
        return {
            types: ['bulletList'],
        };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    bulletStyle: {
                        default: 'disc',
                        parseHTML: (element) => element.style.listStyleType || 'disc',
                        renderHTML: (attributes) => {
                            if (!attributes.bulletStyle || attributes.bulletStyle === 'disc')
                                return {};
                            return { style: `list-style-type: ${attributes.bulletStyle}` };
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setBulletStyle: (style) => ({ commands }) => {
                return commands.updateAttributes('bulletList', {
                    bulletStyle: style,
                });
            },
        };
    },
});
export default BulletStyle;
