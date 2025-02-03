module.exports = {
  content: [
    './src/**/*.{ts,tsx,js,jsx}', // Include all your component files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{ts,tsx,js,jsx}'],
  },
};
