export type ModalTransition =
  | 'fade'
  | 'zoom'
  | 'grow'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'flip'
  | 'collapse-top'
  | 'collapse-bottom'
  | 'collapse-left'
  | 'collapse-right';

type TransformOriginTransition = 'zoom' | 'grow' | 'flip';
type OtherTransition = Exclude<ModalTransition, TransformOriginTransition>;

type AnimationBase = {
  duration?: number;
  ease?: string;
};

type AnimationWithTransformOrigin = AnimationBase & {
  transition?: TransformOriginTransition;
  transformOrigin?: string;
};

type AnimationWithoutTransformOrigin = AnimationBase & {
  transition: OtherTransition;
  transformOrigin?: never;
};

export type ModalAnimation =
  | AnimationWithTransformOrigin
  | AnimationWithoutTransformOrigin;

// Single config → applied to both in and out. Tuple → [in, out].
export type ModalAnimationConfig = ModalAnimation | [ModalAnimation, ModalAnimation];
