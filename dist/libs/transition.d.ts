import type { ModalAnimation, ModalAnimationConfig, ModalTransition } from '../types/animation';
type TransitionVars = {
    from: gsap.TweenVars;
    to: gsap.TweenVars;
    fromOut: gsap.TweenVars;
    isCollapse?: true;
    collapseAxis?: 'height' | 'width';
};
type AnimationDefaults = {
    duration?: number;
    ease?: string;
    transition?: ModalTransition;
};
export declare const DEFAULT_ANIMATION_IN: Required<AnimationDefaults>;
export declare const DEFAULT_ANIMATION_OUT: Required<AnimationDefaults>;
export declare const createSymmetricAnimation: (anim: ModalAnimation) => ModalAnimationConfig;
export declare const resolveAnimation: (animation?: ModalAnimationConfig, defaults?: {
    in?: AnimationDefaults;
    out?: AnimationDefaults;
}) => {
    animDuration: number;
    animEase: string;
    animTransition: "fade" | "zoom" | "grow" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "flip" | "collapse-top" | "collapse-bottom" | "collapse-left" | "collapse-right";
    animTransformOrigin: string | undefined;
    animDurationOut: number;
    animEaseOut: string;
    animTransitionOut: "fade" | "zoom" | "grow" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "flip" | "collapse-top" | "collapse-bottom" | "collapse-left" | "collapse-right";
    animTransformOriginOut: string | undefined;
};
declare const getTransitionVars: (transition?: ModalTransition, transformOriginIn?: string, transformOriginOut?: string) => TransitionVars;
export default getTransitionVars;
export type { TransitionVars };
//# sourceMappingURL=transition.d.ts.map