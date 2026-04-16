export const DEFAULT_ANIMATION_IN = {
    duration: 0.3,
    ease: 'back.out(1.4)',
    transition: 'grow',
};
export const DEFAULT_ANIMATION_OUT = {
    duration: 0.25,
    ease: 'power2.in',
    transition: 'grow',
};
export const createSymmetricAnimation = (anim) => anim;
export const resolveAnimation = (animation, defaults) => {
    const inDef = { ...DEFAULT_ANIMATION_IN, ...defaults?.in };
    const outDef = { ...DEFAULT_ANIMATION_OUT, ...defaults?.out };
    const inAnim = Array.isArray(animation) ? animation[0] : animation;
    const outAnim = Array.isArray(animation) ? animation[1] : animation;
    return {
        animDuration: inAnim?.duration ?? inDef.duration,
        animEase: inAnim?.ease ?? inDef.ease,
        animTransition: inAnim?.transition ?? inDef.transition,
        animTransformOrigin: inAnim
            ?.transformOrigin,
        animDurationOut: outAnim?.duration ?? outDef.duration,
        animEaseOut: outAnim?.ease ?? outDef.ease,
        animTransitionOut: outAnim?.transition ?? outDef.transition,
        animTransformOriginOut: outAnim?.transformOrigin,
    };
};
const ORIGIN_CENTER_BOTTOM = 'center bottom';
const ORIGIN_CENTER_TOP = 'center top';
const getTransitionVars = (transition = 'zoom', transformOriginIn, transformOriginOut) => {
    const transitions = {
        fade: {
            from: { opacity: 0 },
            to: { opacity: 1 },
            fromOut: { opacity: 0 },
        },
        zoom: {
            from: { opacity: 0, scale: 0.85 },
            to: { opacity: 1, scale: 1 },
            fromOut: { opacity: 0, scale: 0.85 },
        },
        grow: {
            from: { opacity: 0, scale: 0.5, transformOrigin: ORIGIN_CENTER_BOTTOM },
            to: { opacity: 1, scale: 1, transformOrigin: ORIGIN_CENTER_BOTTOM },
            fromOut: {
                opacity: 0,
                scale: 0.5,
                transformOrigin: ORIGIN_CENTER_BOTTOM,
            },
        },
        'slide-up': {
            from: { opacity: 0, y: 40 },
            to: { opacity: 1, y: 0 },
            fromOut: { opacity: 0, y: 40 },
        },
        'slide-down': {
            from: { opacity: 0, y: -40 },
            to: { opacity: 1, y: 0 },
            fromOut: { opacity: 0, y: -40 },
        },
        'slide-left': {
            from: { opacity: 0, x: 80 },
            to: { opacity: 1, x: 0 },
            fromOut: { opacity: 0, x: 80 },
        },
        'slide-right': {
            from: { opacity: 0, x: -80 },
            to: { opacity: 1, x: 0 },
            fromOut: { opacity: 0, x: -80 },
        },
        flip: {
            from: {
                opacity: 0,
                rotationX: -90,
                transformOrigin: ORIGIN_CENTER_TOP,
                perspective: 800,
            },
            to: {
                opacity: 1,
                rotationX: 0,
                transformOrigin: ORIGIN_CENTER_TOP,
                perspective: 800,
            },
            fromOut: {
                opacity: 0,
                rotationX: -90,
                transformOrigin: ORIGIN_CENTER_TOP,
                perspective: 800,
            },
        },
        'collapse-top': {
            from: { y: -40 },
            to: { y: 0 },
            fromOut: { y: -40 },
            isCollapse: true,
            collapseAxis: 'height',
        },
        'collapse-bottom': {
            from: { y: 40 },
            to: { y: 0 },
            fromOut: { y: 40 },
            isCollapse: true,
            collapseAxis: 'height',
        },
        'collapse-left': {
            from: { x: -80 },
            to: { x: 0 },
            fromOut: { x: -80 },
            isCollapse: true,
            collapseAxis: 'width',
        },
        'collapse-right': {
            from: { x: 80 },
            to: { x: 0 },
            fromOut: { x: 80 },
            isCollapse: true,
            collapseAxis: 'width',
        },
    };
    const result = transitions[transition];
    if (transformOriginIn) {
        result.from = { ...result.from, transformOrigin: transformOriginIn };
        result.to = { ...result.to, transformOrigin: transformOriginIn };
    }
    if (transformOriginOut) {
        result.fromOut = { ...result.fromOut, transformOrigin: transformOriginOut };
    }
    else if (transformOriginIn) {
        // If only `in` is overridden, apply it to out as well for symmetry
        result.fromOut = { ...result.fromOut, transformOrigin: transformOriginIn };
    }
    return result;
};
export default getTransitionVars;
