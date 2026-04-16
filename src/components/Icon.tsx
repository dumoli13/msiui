import React from 'react';
import cx from 'classnames';
import iconFilled from '../assets/icon-filled.svg';
import iconOutline from '../assets/icon-outline.svg';

// Base props that all icons share
type BaseIconProps = {
  name: IconNames;
  size?: number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  disabled?: boolean;
  animation?: 'spin' | 'pulse' | 'bounce' | 'ping';
  strokeWidth?: number;
  color?: string;
};

// Props for solid variant (only has color)
type OutlineIconProps = BaseIconProps & {
  variant?: 'outline';
  fillColor?: never;
};

// Props for outline variant (has both color and fillColor)
type SolidIconProps = BaseIconProps & {
  variant?: 'solid';
  fillColor?: string;
};

export type IconProps = OutlineIconProps | SolidIconProps;

/**
 * ready-to-use icons from the MisDesign icon library
 */
const Icon = React.forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const {
    name,
    color = 'currentColor',
    fillColor = color,
    size = '1em',
    variant = 'outline',
    strokeWidth = variant === 'outline' ? 1 : 0,
    className,
    onClick,
    disabled = false,
    animation,
  } = props;

  const animationStyle = React.useMemo(() => {
    const baseStyle: React.CSSProperties = {
      display: 'block',
      verticalAlign: 'middle',
    };

    switch (animation) {
      case 'spin':
        return { ...baseStyle, animation: 'spin 1s linear infinite' };
      case 'pulse':
        return {
          ...baseStyle,
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        };
      case 'bounce':
        return { ...baseStyle, animation: 'bounce 1s infinite' };
      case 'ping':
        return {
          ...baseStyle,
          animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        };
      default:
        return baseStyle;
    }
  }, [animation]);

  return (
    <span
      ref={ref}
      aria-label={name}
      className={cx('flex items-center justify-center', className, {
        'cursor-pointer': !!onClick && !disabled,
      })}
      {...(onClick && !disabled && { onClick, role: 'button', tabIndex: 0 })}
    >
      <svg
        width={size}
        height={size}
        stroke={color}
        fill={variant === 'solid' ? fillColor : 'none'}
        strokeWidth={
          variant === 'outline' && strokeWidth === 0 ? 1 : strokeWidth
        }
        strokeLinecap="round"
        strokeLinejoin="round"
        style={animationStyle}
        aria-hidden="true"
      >
        <use
          xlinkHref={`${variant === 'outline' ? iconOutline : iconFilled}#${name}`}
        />
      </svg>

      {/* Add global keyframes */}
      <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
            50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
          }
          @keyframes ping {
            75%, 100% { transform: scale(2); opacity: 0; }
          }
        `}</style>
    </span>
  );
});
Icon.displayName = 'Icon';

export default Icon;

export type IconNames =
  | 'academic-cap'
  | 'activity'
  | 'adjustments-horizontal'
  | 'adjustments-vertical'
  | 'alert-circle'
  | 'alert-octagon'
  | 'alert-triangle'
  | 'align-center'
  | 'align-justified'
  | 'align-left'
  | 'align-right'
  | 'anchor'
  | 'annotation'
  | 'archive-box'
  | 'archive-box-arrow-down'
  | 'archive-box-x-mark'
  | 'arrow-down'
  | 'arrow-down-circle'
  | 'arrow-down-left'
  | 'arrow-down-on-square'
  | 'arrow-down-on-square-stack'
  | 'arrow-down-right'
  | 'arrow-down-tray'
  | 'arrow-left'
  | 'arrow-left-circle'
  | 'arrow-left-end-on-rectangle'
  | 'arrow-left-start-on-rectangle'
  | 'arrow-long-down'
  | 'arrow-long-left'
  | 'arrow-long-right'
  | 'arrow-long-up'
  | 'arrow-path'
  | 'arrow-path-rounded-square'
  | 'arrow-right'
  | 'arrow-right-circle'
  | 'arrow-right-end-on-rectangle'
  | 'arrow-right-start-on-rectangle'
  | 'arrow-sm-down'
  | 'arrow-sm-left'
  | 'arrow-sm-right'
  | 'arrow-sm-up'
  | 'arrow-top-right-on-square'
  | 'arrow-trending-down'
  | 'arrow-trending-up'
  | 'arrow-turn-down-left'
  | 'arrow-turn-down-right'
  | 'arrow-turn-left-down'
  | 'arrow-turn-left-up'
  | 'arrow-turn-right-down'
  | 'arrow-turn-right-up'
  | 'arrow-turn-up-left'
  | 'arrow-turn-up-right'
  | 'arrow-up'
  | 'arrow-up-circle'
  | 'arrow-up-left'
  | 'arrow-up-on-square'
  | 'arrow-up-on-square-stack'
  | 'arrow-up-right'
  | 'arrow-up-tray'
  | 'arrow-uturn-down'
  | 'arrow-uturn-left'
  | 'arrow-uturn-right'
  | 'arrow-uturn-up'
  | 'arrows-pointing-in'
  | 'arrows-pointing-out'
  | 'arrows-right-left'
  | 'arrows-up-down'
  | 'at-symbol'
  | 'backspace'
  | 'backward'
  | 'banknotes'
  | 'bars-2'
  | 'bars-3'
  | 'bars-3-bottom-left'
  | 'bars-3-bottom-right'
  | 'bars-3-center-left'
  | 'bars-3-center-right'
  | 'bars-4'
  | 'bars-arrow-down'
  | 'bars-arrow-up'
  | 'battery-0'
  | 'battery-100'
  | 'battery-50'
  | 'beaker'
  | 'bell'
  | 'bell-alert'
  | 'bell-slash'
  | 'bell-snooze'
  | 'blockquote'
  | 'bold'
  | 'bolt'
  | 'bolt-slash'
  | 'book-open'
  | 'bookmark'
  | 'bookmark-alt'
  | 'bookmark-slash'
  | 'bookmark-square'
  | 'bounce'
  | 'briefcase'
  | 'bug-ant'
  | 'building-library'
  | 'building-office'
  | 'building-office-2'
  | 'building-storefront'
  | 'cake'
  | 'calculator'
  | 'calendar'
  | 'calendar-date-range'
  | 'calendar-days'
  | 'camera'
  | 'cash'
  | 'chart-bar'
  | 'chart-bar-square'
  | 'chart-pie'
  | 'chat'
  | 'chat-alt'
  | 'chat-alt-2'
  | 'chat-bubble-bottom-center'
  | 'chat-bubble-bottom-center-text'
  | 'chat-bubble-left'
  | 'chat-bubble-left-ellipsis'
  | 'chat-bubble-left-right'
  | 'chat-bubble-oval-left'
  | 'chat-bubble-oval-left-ellipsis'
  | 'check'
  | 'check-badge'
  | 'check-circle'
  | 'chevron-double-down'
  | 'chevron-double-left'
  | 'chevron-double-right'
  | 'chevron-double-up'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'chevron-up-down'
  | 'circle-stack'
  | 'clipboard'
  | 'clipboard-copy'
  | 'clipboard-document'
  | 'clipboard-document-check'
  | 'clipboard-document-list'
  | 'clock'
  | 'closed-eye'
  | 'cloud'
  | 'cloud-arrow-down'
  | 'cloud-arrow-up'
  | 'code-1'
  | 'code-bracket'
  | 'code-bracket-square'
  | 'cog'
  | 'cog-6-tooth'
  | 'cog-8-tooth'
  | 'collection'
  | 'color'
  | 'command'
  | 'command-line'
  | 'computer-desktop'
  | 'copyright'
  | 'cpu-chip'
  | 'credit-card'
  | 'cube'
  | 'cube-transparent'
  | 'currency-bangladeshi'
  | 'currency-dollar'
  | 'currency-euro'
  | 'currency-pound'
  | 'currency-rupee'
  | 'currency-yen'
  | 'cursor-arrow-rays'
  | 'cursor-arrow-ripple'
  | 'cursor-click'
  | 'device-phone-mobile'
  | 'device-tablet'
  | 'divide'
  | 'document'
  | 'document-arrow-down'
  | 'document-arrow-up'
  | 'document-chart-bar'
  | 'document-check'
  | 'document-currency-dollar'
  | 'document-duplicate'
  | 'document-magnifying-glass'
  | 'document-minus'
  | 'document-plus'
  | 'document-text'
  | 'download-1'
  | 'drag'
  | 'drag-nine-dots'
  | 'ellipsis-horizontal'
  | 'ellipsis-horizontal-circle'
  | 'ellipsis-vertical'
  | 'envelope'
  | 'envelope-open'
  | 'equals'
  | 'exclamation'
  | 'exclamation-circle'
  | 'exclamation-triangle'
  | 'eye'
  | 'eye-dropper'
  | 'eye-slash'
  | 'face-frown'
  | 'face-smile'
  | 'film'
  | 'finger-print'
  | 'fire'
  | 'flag'
  | 'folder'
  | 'folder-arrow-down'
  | 'folder-minus'
  | 'folder-open'
  | 'folder-plus'
  | 'forward'
  | 'funnel'
  | 'gif'
  | 'gift'
  | 'gift-top'
  | 'globe-alt'
  | 'globe-americas'
  | 'globe-asia-australia'
  | 'globe-europe-africa'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'hand-raised'
  | 'hand-thumb-down'
  | 'hand-thumb-up'
  | 'hashtag'
  | 'heart'
  | 'help-circle'
  | 'history'
  | 'home'
  | 'home-modern'
  | 'identification'
  | 'image'
  | 'import-export'
  | 'inbox'
  | 'inbox-arrow-down'
  | 'inbox-stack'
  | 'information-circle'
  | 'italic'
  | 'kanban'
  | 'key'
  | 'language'
  | 'lifebuoy'
  | 'light-bulb'
  | 'link'
  | 'link-1'
  | 'link-off'
  | 'link-slash'
  | 'list-bullet'
  | 'list-item'
  | 'list-letters'
  | 'list-numbers'
  | 'loader'
  | 'lock-closed'
  | 'lock-open'
  | 'logout'
  | 'logout-1'
  | 'magnifying-glass'
  | 'magnifying-glass-circle'
  | 'magnifying-glass-minus'
  | 'magnifying-glass-plus'
  | 'manage-server'
  | 'map'
  | 'map-pin'
  | 'maximize'
  | 'maximize2'
  | 'md-library'
  | 'megaphone'
  | 'menu'
  | 'menu-alt-1'
  | 'menu-alt-2'
  | 'menu-alt-3'
  | 'menu-alt-4'
  | 'microphone'
  | 'minimize'
  | 'minimize2'
  | 'minus'
  | 'minus-circle'
  | 'minus-sm'
  | 'moon'
  | 'musical-note'
  | 'newspaper'
  | 'no-symbol'
  | 'number-1'
  | 'number-2'
  | 'number-3'
  | 'number-4'
  | 'number-5'
  | 'number-6'
  | 'number-7'
  | 'number-8'
  | 'number-9'
  | 'numbered-list'
  | 'odoo-grid'
  | 'on-time'
  | 'overdue'
  | 'overlap-circle'
  | 'paint-brush'
  | 'paper-airplane'
  | 'paper-clip'
  | 'pause'
  | 'pause-circle'
  | 'pdf'
  | 'pencil'
  | 'pencil-alt'
  | 'pencil-square'
  | 'percent-badge'
  | 'phone'
  | 'phone-arrow-down-left'
  | 'phone-arrow-up-right'
  | 'phone-x-mark'
  | 'photo'
  | 'ping'
  | 'plan'
  | 'play'
  | 'play-circle'
  | 'play-pause'
  | 'plus'
  | 'plus-circle'
  | 'plus-sm'
  | 'power'
  | 'presentation-chart-bar'
  | 'presentation-chart-line'
  | 'printer'
  | 'priority'
  | 'pulse'
  | 'puzzle-piece'
  | 'qr-code'
  | 'question-mark-circle'
  | 'queue-list'
  | 'radio'
  | 'receipt-percent'
  | 'receipt-refund'
  | 'receipt-tax'
  | 'rectangle-group'
  | 'rectangle-stack'
  | 'recycle'
  | 'refresh'
  | 'reply'
  | 'rocket-launch'
  | 'rss'
  | 'sap'
  | 'save'
  | 'save-as'
  | 'scale'
  | 'scissors'
  | 'select-all'
  | 'selector'
  | 'server'
  | 'server-stack'
  | 'share'
  | 'shield-check'
  | 'shield-exclamation'
  | 'shopping-bag'
  | 'shopping-cart'
  | 'signal'
  | 'signal-slash'
  | 'slash'
  | 'sm-view-grid-add'
  | 'sparkles'
  | 'speaker-wave'
  | 'speaker-x-mark'
  | 'spinner'
  | 'square-2-stack'
  | 'square-3-stack-3d'
  | 'squares-2x2'
  | 'squares-plus'
  | 'stack'
  | 'star'
  | 'status-offline'
  | 'status-online'
  | 'stop'
  | 'stop-circle'
  | 'strikethrough'
  | 'sun'
  | 'swatch'
  | 'table-1'
  | 'table-cells'
  | 'tag'
  | 'text-size'
  | 'ticket'
  | 'trash'
  | 'trophy'
  | 'truck'
  | 'tv'
  | 'underline'
  | 'unselect-all'
  | 'upload'
  | 'user'
  | 'user-add'
  | 'user-circle'
  | 'user-group'
  | 'user-minus'
  | 'user-plus'
  | 'user-remove'
  | 'users'
  | 'variable'
  | 'video-camera'
  | 'video-camera-slash'
  | 'view-columns'
  | 'view-grid-add'
  | 'viewfinder-circle'
  | 'wallet'
  | 'wifi'
  | 'window'
  | 'wrench'
  | 'wrench-screwdriver'
  | 'x-circle'
  | 'x-mark';
