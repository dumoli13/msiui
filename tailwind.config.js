export const content = ['./src/**/*.{html,js,jsx,ts,tsx}'];
export const theme = {
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px',
    },
  },
  extend: {
    flex: {
      1.5: '0 1.5 auto',
    },
    gridTemplateColumns: {
      '4-fit': 'repeat(4, fit-content(100%))',
    },
    fontFamily: {
      sans: ['DM Sans', 'sans-serif'],
    },
    borderRadius: {
      32: '32px',
      40: '40px',
    },
  },
  fontSize: {
    '12px': ['12px', '16px'],
    '14px': ['14px', '20px'],
    '16px': ['16px', '20px'],
    '18px': ['18px', '20px'],
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
      10: 'rgba(255, 255, 255, <alpha-value>)', // #FFFFFF
      15: 'rgba(250, 250, 250, <alpha-value>)', // #FAFAFA
      20: 'rgba(245, 245, 245, <alpha-value>)', // #F5F5F5
      30: 'rgba(237, 237, 237, <alpha-value>)', // #EDEDED
      40: 'rgba(224, 224, 224, <alpha-value>)', // #E0E0E0
      50: 'rgba(194, 194, 194, <alpha-value>)', // #C2C2C2
      60: 'rgba(158, 158, 158, <alpha-value>)', // #9E9E9E
      70: 'rgba(117, 117, 117, <alpha-value>)', // #757575
      80: 'rgba(97, 97, 97, <alpha-value>)', // #616161
      90: 'rgba(64, 64, 64, <alpha-value>)', // #404040
      100: 'rgba(10, 10, 10, <alpha-value>)', // #0A0A0A
    },
    primary: {
      main: 'rgba(49, 130, 206, <alpha-value>)', // #3182CE
      surface: 'rgba(214, 230, 245, <alpha-value>)', // #D6E6F5
      border: 'rgba(186, 213, 239, <alpha-value>)', // #BAD5EE
      hover: 'rgba(41, 108, 172, <alpha-value>)', // #286CAB
      pressed: 'rgba(24, 65, 103, <alpha-value>)', // #184167
      focus: 'rgba(49, 130, 206, 0.2)', // #3182CE
    },
    danger: {
      main: 'rgba(203, 58, 49, <alpha-value>)', // #CB3A31
      surface: 'rgba(255, 244, 242, <alpha-value>)', // #FFF4F2
      border: 'rgba(238, 180, 176, <alpha-value>)', // #EEB4B0
      hover: 'rgba(189, 37, 28, <alpha-value>)', // #BC251C
      pressed: 'rgba(115, 25, 18, <alpha-value>)', // #731912
      focus: 'rgba(203, 58, 49, 0.2)', // #CB3A31
    },
    warning: {
      main: 'rgba(205, 123, 46, <alpha-value>)', // #CD7B2E
      surface: 'rgba(255, 249, 242, <alpha-value>)', // #FFF9F2
      border: 'rgba(238, 206, 176, <alpha-value>)', // #EECEB0
      hover: 'rgba(191, 105, 25, <alpha-value>)', // #BF6818
      pressed: 'rgba(114, 64, 17, <alpha-value>)', // #724011
      focus: 'rgba(205, 123, 46, 0.2)', // #CD7B2E
    },
    success: {
      main: 'rgba(67, 147, 108, <alpha-value>)', // #43936C
      surface: 'rgba(247, 247, 247, <alpha-value>)', // #F7F7F7
      border: 'rgba(183, 219, 201, <alpha-value>)', // #B7DBC9
      hover: 'rgba(54, 122, 89, <alpha-value>)', // #357A59
      pressed: 'rgba(32, 87, 60, <alpha-value>)', // #20563C
      focus: 'rgba(67, 147, 108, 0.2)', // #43936C
    },
    info: {
      main: 'rgba(203, 58, 65, <alpha-value>)', // #CB3A41
      surface: 'rgba(245, 245, 255, <alpha-value>)', // #FFF4F2
      border: 'rgba(223, 224, 243, <alpha-value>)', // #DFE0F3
      hover: 'rgba(51, 52, 204, <alpha-value>)', // #3334CC
      pressed: 'rgba(33, 33, 122, <alpha-value>)', // #21217A
      focus: 'rgba(67, 147, 108, 0.2)', // #43936C
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
export const plugins = [require('tailwindcss-animate')];
