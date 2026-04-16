/* eslint-disable @typescript-eslint/no-require-imports */
export const content = [
  './src/**/*.{js,ts,jsx,tsx,mdx}',
  './stories/**/*.{js,ts,jsx,tsx,mdx}',
  './.storybook/**/*.{js,ts}',
];
export const theme = {
  container: {
    center: true,
    padding: '2rem',
    screens: {
      xs: '0px',
      sm: '640px', // mobile screen size
      md: '768px', // tablet screen size
      lg: '1024px', // desktop screen size
      xl: '1440px', // wide desktop screen size
    },
  },
  extend: {
    flex: {
      1.5: '0 1.5 auto',
    },
    gridTemplateColumns: {
      '4-fit': 'repeat(4, fit-content(100%))',
    },
    borderRadius: {
      32: '32px',
      40: '40px',
    },
  },
  fontSize: {
    '12px': ['12px', '16px'],
    '14px': ['14px', '20px'],
    '16px': ['16px', '24px'],
    '18px': ['18px', '26px'],
    '20px': ['20px', '28px'],
    '24px': ['24px', '32px'],
    '28px': ['28px', '34px'],
    '30px': ['30px', '36px'],
    '32px': ['32px', '38px'],
    '36px': ['36px', '40px'],
    '40px': ['40px', '48px'],
    '48px': ['48px', 1],
    '60px': ['60px', 1],
    '64px': ['64px', 1],
    '72px': ['72px', 1],
    '96px': ['96px', 1],
    '128px': ['128px', 1],
  },
  borderWidth: {
    0: '0px',
    DEFAULT: '1px',
    2: '2px',
    3: '3px',
    4: '4px',
    6: '6px',
    8: '8px',
    10: '10px',
  },
  ringWidth: {
    0: '0px',
    DEFAULT: '1px',
    2: '2px',
    3: '3px',
    4: '4px',
    8: '8px',
  },
  colors: {
    transparent: 'rgba(0, 0, 0, 0)',
    neutral: {
      10: {
        DEFAULT: 'rgba(255, 255, 255, <alpha-value>)', // #FFFFFF
        dark: 'rgba(10, 15, 30, <alpha-value>)', // #0A0F1E
      },
      15: {
        DEFAULT: 'rgba(250, 250, 250, <alpha-value>)', // #FAFAFA
        dark: 'rgba(13, 21, 56, <alpha-value>)', // #0D1538
      },
      20: {
        DEFAULT: 'rgba(245, 245, 245, <alpha-value>)', // #F5F5F5
        dark: 'rgba(42, 48, 73, <alpha-value>)', // #2A3049
      },
      30: {
        DEFAULT: 'rgba(237, 237, 237, <alpha-value>)', // #EDEDED
        dark: 'rgba(20, 20, 20, <alpha-value>)', // #141414 (Adjusted to a neutral dark gray)
      },
      40: {
        DEFAULT: 'rgba(224, 224, 224, <alpha-value>)', // #E0E0E0
        dark: 'rgba(60, 60, 60, <alpha-value>)', // #3C3C3C
      },
      50: {
        DEFAULT: 'rgba(194, 194, 194, <alpha-value>)', // #C2C2C2
        dark: 'rgba(82, 82, 82, <alpha-value>)', // #525252
      },
      60: {
        DEFAULT: 'rgba(158, 158, 158, <alpha-value>)', // #9E9E9E
        dark: 'rgba(106, 106, 106, <alpha-value>)', // #6A6A6A
      },
      70: {
        DEFAULT: 'rgba(117, 117, 117, <alpha-value>)', // #757575
        dark: 'rgba(136, 136, 136, <alpha-value>)', // #888888
      },
      80: {
        DEFAULT: 'rgba(97, 97, 97, <alpha-value>)', // #616161
        dark: 'rgba(160, 160, 160, <alpha-value>)', // #A0A0A0
      },
      90: {
        DEFAULT: 'rgba(64, 64, 64, <alpha-value>)', // #404040
        dark: 'rgba(188, 188, 188, <alpha-value>)', // #BCBCBC
      },
      100: {
        DEFAULT: 'rgba(10, 10, 10, <alpha-value>)', // #0A0A0A
        dark: 'rgba(255, 255, 255, <alpha-value>)', // #FFFFFF
      },
    },
    primary: {
      main: {
        DEFAULT: 'rgba(49, 130, 206, <alpha-value>)', // #3182CE
        dark: 'rgba(90, 155, 226, <alpha-value>)', // #5A9BE2
      },
      surface: {
        DEFAULT: 'rgba(240, 248, 255, <alpha-value>)', // #F0F8FF
        dark: 'rgba(26, 43, 69, <alpha-value>)', // #1A2B45
      },
      border: {
        DEFAULT: 'rgba(186, 213, 239, <alpha-value>)', // #BAD5EF
        dark: 'rgba(42, 59, 94, <alpha-value>)', // #2A3B5E
      },
      hover: {
        DEFAULT: 'rgba(41, 108, 172, <alpha-value>)', // #296CAC
        dark: 'rgba(74, 143, 192, <alpha-value>)', // #4A8FC0
      },
      pressed: {
        DEFAULT: 'rgba(24, 65, 103, <alpha-value>)', // #184167
        dark: 'rgba(44, 90, 138, <alpha-value>)', // #2C5A8A
      },
      focus: {
        DEFAULT: 'rgba(49, 130, 206, 0.2)', // #3182CC33
        dark: 'rgba(90, 155, 226, 0.2)', // #5A9BE2
      },
    },
    danger: {
      main: {
        DEFAULT: 'rgba(203, 58, 49, <alpha-value>)', // #CB3A31
        dark: 'rgba(224, 106, 101, <alpha-value>)', // #E06A65
      },
      surface: {
        DEFAULT: 'rgba(255, 244, 242, <alpha-value>)', // #FFF4F2
        dark: 'rgba(59, 26, 24, <alpha-value>)', // #3B1A18
      },
      border: {
        DEFAULT: 'rgba(238, 180, 176, <alpha-value>)', // #EEB4B0
        dark: 'rgba(162, 59, 56, <alpha-value>)', // #A23B38
      },
      hover: {
        DEFAULT: 'rgba(189, 37, 28, <alpha-value>)', // #BD251C
        dark: 'rgba(216, 74, 68, <alpha-value>)', // #D84A44
      },
      pressed: {
        DEFAULT: 'rgba(115, 25, 18, <alpha-value>)', // #731912
        dark: 'rgba(156, 60, 42, <alpha-value>)', // #9C3C2A
      },
      focus: {
        DEFAULT: 'rgba(203, 58, 49, 0.2)', // #CB3A31
        dark: 'rgba(224, 106, 101, 0.2)', // #E06A65
      },
    },
    warning: {
      main: {
        DEFAULT: 'rgba(205, 123, 46, <alpha-value>)', // #CD7B2E
        dark: 'rgba(224, 163, 92, <alpha-value>)', // #E0A35C
      },
      surface: {
        DEFAULT: 'rgba(255, 249, 242, <alpha-value>)', // #FFF9F2
        dark: 'rgba(59, 42, 24, <alpha-value>)', // #3B2A18
      },
      border: {
        DEFAULT: 'rgba(238, 206, 176, <alpha-value>)', // #EECEB0
        dark: 'rgba(184, 134, 94, <alpha-value>)', // #B8865E
      },
      hover: {
        DEFAULT: 'rgba(191, 105, 25, <alpha-value>)', // #BF6919
        dark: 'rgba(214, 138, 64, <alpha-value>)', // #D68A40
      },
      pressed: {
        DEFAULT: 'rgba(115, 64, 17, <alpha-value>)', // #734011
        dark: 'rgba(158, 91, 48, <alpha-value>)', // #9E5B30
      },
      focus: {
        DEFAULT: 'rgba(205, 123, 46, 0.2)', // #CD7B2E
        dark: 'rgba(224, 163, 92, 0.2)', // #E0A35C
      },
    },
    success: {
      main: {
        DEFAULT: 'rgba(67, 147, 108, <alpha-value>)', // #43936C
        dark: 'rgba(111, 191, 139, <alpha-value>)', // #6FBF8B
      },
      surface: {
        DEFAULT: 'rgba(235, 255, 245, <alpha-value>)', // #EBFFF5
        dark: 'rgba(30, 42, 39, <alpha-value>)', // #1E2A27
      },
      border: {
        DEFAULT: 'rgba(184, 219, 202, <alpha-value>)', // #B8DBCA
        dark: 'rgba(134, 185, 168, <alpha-value>)', // #86B9A8
      },
      hover: {
        DEFAULT: 'rgba(54, 122, 89, <alpha-value>)', // #367A59
        dark: 'rgba(86, 155, 127, <alpha-value>)', // #569B7F
      },
      pressed: {
        DEFAULT: 'rgba(32, 87, 61, <alpha-value>)', // #20573D
        dark: 'rgba(58, 123, 98, <alpha-value>)', // #3A7B62
      },
      focus: {
        DEFAULT: 'rgba(67, 147, 108, 0.2)', // #43936C
        dark: 'rgba(111, 191, 139, 0.2)', // #6FBF8B
      },
    },
    info: {
      main: {
        DEFAULT: 'rgba(76, 77, 220, <alpha-value>)', // #4C4DDC
        dark: 'rgba(123, 124, 224, <alpha-value>)', // #7B7CE0
      },
      surface: {
        DEFAULT: 'rgba(245, 245, 255, <alpha-value>)', // #F5F5FF
        dark: 'rgba(31, 31, 58, <alpha-value>)', // #1F1F3A
      },
      border: {
        DEFAULT: 'rgba(223, 224, 243, <alpha-value>)', // #DFE0F3
        dark: 'rgba(159, 160, 176, <alpha-value>)', // #9FA0B0
      },
      hover: {
        DEFAULT: 'rgba(51, 52, 204, <alpha-value>)', // #3334CC
        dark: 'rgba(92, 93, 208, <alpha-value>)', // #5C5DD0
      },
      pressed: {
        DEFAULT: 'rgba(33,33,122, <alpha-value>)', // #212A7A
        dark: 'rgba(66, 68, 160, <alpha-value>)', // #4244A0
      },
      focus: {
        DEFAULT: 'rgba(76, 77, 220, 0.2)', // #4C4DDC at 20% opacity
        dark: 'rgba(123, 124, 224, 0.2)', // #7B7CE0 at 20% opacity
      },
    },
  },
  highlight: {
    main: {
      DEFAULT: 'rgba(253, 92, 157, <alpha-value>)', // #FD5C9D
      dark: 'rgba(255, 126, 179, <alpha-value>)', // #FF7EB3
    },
    surface: {
      DEFAULT: 'rgba(255, 233, 239, <alpha-value>)', // #FFE9EF
      dark: 'rgba(45, 20, 30, <alpha-value>)', // #2D141E
    },
    border: {
      DEFAULT: 'rgba(253, 209, 226, <alpha-value>)', // #FDD1E2
      dark: 'rgba(94, 45, 65, <alpha-value>)', // #5E2D41
    },
    hover: {
      DEFAULT: 'rgba(217, 52, 119, <alpha-value>)', // #D93477
      dark: 'rgba(255, 105, 165, <alpha-value>)', // #FF69A5
    },
    pressed: {
      DEFAULT: 'rgba(190, 69, 118, <alpha-value>)', // #BE4576
      dark: 'rgba(255, 85, 145, <alpha-value>)', // #FF5591
    },
  },
  accent: {
    main: {
      DEFAULT: 'rgba(254, 139, 45, <alpha-value>)', // #FE8B2D
      dark: 'rgba(255, 161, 82, <alpha-value>)', // #FFA152
    },
    surface: {
      DEFAULT: 'rgba(255, 246, 238, <alpha-value>)', // #FFF6EE
      dark: 'rgba(38, 26, 18, <alpha-value>)', // #261A12
    },
    border: {
      DEFAULT: 'rgba(242, 194, 155, <alpha-value>)', // #F2C29B
      dark: 'rgba(84, 60, 40, <alpha-value>)', // #543C28
    },
    hover: {
      DEFAULT: 'rgba(217, 115, 31, <alpha-value>)', // #D9731F
      dark: 'rgba(255, 175, 110, <alpha-value>)', // #FFAF6E
    },
    pressed: {
      DEFAULT: 'rgba(138, 69, 16, <alpha-value>)', // #8A4510
      dark: 'rgba(255, 145, 60, <alpha-value>)', // #FF913C
    },
  },

  boxShadow: {
    'box-1': '0px 1px 2px rgba(0, 0, 0, 0.12)',
    'box-2': '0px 4px 8px rgba(0, 0, 0, 0.1)',
    'box-3': 'inset 1px 2px 2px rgba(0, 0, 0, 0.08)',
    'box-4':
      '0px 9px 20px 0px rgba(0, 0, 0, 0.1), 0px 37px 37px 0px rgba(0, 0, 0, 0.09), 0px 82px 49px 0px rgba(0, 0, 0, 0.05), 0px 146px 59px 0px rgba(0, 0, 0, 0.01), 0px 229px 64px 0px rgba(0, 0, 0, 0)',
    'box-notification':
      '0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12)',
  },
  keyframes: {
    spin: {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
    ping: {
      '75%, 100%': { transform: 'scale(2)', opacity: '0' },
    },
    pulse: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '.5' },
    },
    bounce: {
      '0%, 100%': {
        transform: 'translateY(-25%)',
        animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
      },
      '50%': {
        transform: 'translateY(0)',
        animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
      },
    },
    'accordion-down': {
      from: { height: '0' },
      to: { height: 'var(--radix-accordion-content-height)' },
    },
    'accordion-up': {
      from: { height: 'var(--radix-accordion-content-height)' },
      to: { height: '0' },
    },
  },
  animation: {
    none: 'none',
    spin: 'spin 1s linear infinite',
    ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    bounce: 'bounce 1s infinite',
    'accordion-down': 'accordion-down 0.2s ease-out',
    'accordion-up': 'accordion-up 0.2s ease-out',
  },
};
export const plugins = [
  require('tailwindcss-animate'),
  function ({ addComponents }) {
    addComponents({
      '.apple-scrollbar': {
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '4px',
        },
        '&:hover::-webkit-scrollbar-thumb': {
          background: 'rgba(10, 10, 10, 0.5)',
        },
      },
    });

    // Add Firefox-specific styles
    addComponents({
      '@supports (-moz-appearance:none)': {
        '.apple-scrollbar': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.5) transparent',
        },
      },
    });
  },
];
export const darkMode = 'class';

export default {
  darkMode,
  content,
  theme,
  plugins,
};
