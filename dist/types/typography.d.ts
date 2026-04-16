export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph-xl' | 'paragraph-l' | 'paragraph-m' | 'paragraph-s' | 'paragraph-xs';
export interface TypographyProps extends React.HTMLAttributes<HTMLParagraphElement | HTMLHeadingElement> {
    variant?: TypographyVariant;
    children: React.ReactNode;
}
//# sourceMappingURL=typography.d.ts.map