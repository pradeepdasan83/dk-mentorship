import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'on-secondary-fixed-variant': '#1f4d54',
        'primary-container': '#0d1c32',
        'on-tertiary-fixed-variant': '#5c4300',
        'tertiary-container': '#261a00',
        'on-primary-fixed': '#0d1c32',
        'outline-variant': '#c5c6cd',
        'on-primary-container': '#76849f',
        'on-tertiary-fixed': '#261a00',
        'surface': '#fbf9fb',
        'inverse-surface': '#303032',
        'on-error-container': '#93000a',
        'secondary-fixed-dim': '#a1ced6',
        'on-tertiary-container': '#a87d00',
        'tertiary': '#000000',
        'on-surface-variant': '#44474d',
        'on-primary-fixed-variant': '#39475f',
        'background': '#fbf9fb',
        'on-surface': '#1b1b1d',
        'primary-fixed-dim': '#b9c7e4',
        'outline': '#75777e',
        'surface-container': '#efedef',
        'surface-tint': '#515f78',
        'on-primary': '#ffffff',
        'tertiary-fixed-dim': '#f6be39',
        'on-secondary': '#ffffff',
        'surface-dim': '#dbd9db',
        'on-error': '#ffffff',
        'primary': '#000000',
        'primary-fixed': '#d6e3ff',
        'tertiary-fixed': '#ffdfa0',
        'surface-variant': '#e4e2e4',
        'inverse-primary': '#b9c7e4',
        'inverse-on-surface': '#f2f0f2',
        'secondary-fixed': '#bcebf3',
        'on-secondary-container': '#3f6b72',
        'secondary-container': '#bcebf3',
        'error-container': '#ffdad6',
        'on-tertiary': '#ffffff',
        'surface-container-low': '#f5f3f5',
        'surface-bright': '#fbf9fb',
        'secondary': '#39656c',
        'surface-container-high': '#eae7ea',
        'surface-container-highest': '#e4e2e4',
        'error': '#ba1a1a',
        'on-background': '#1b1b1d',
        'surface-container-lowest': '#ffffff',
        'on-secondary-fixed': '#001f24'
      },
      borderRadius: {
        'DEFAULT': '0.125rem',
        'lg': '0.25rem',
        'xl': '0.5rem',
        'full': '0.75rem'
      },
      spacing: {
        'gutter': '24px',
        'base': '8px',
        'stack-md': '24px',
        'margin-desktop': '48px',
        'container-max': '1280px',
        'stack-lg': '48px',
        'margin-mobile': '16px',
        'stack-sm': '12px'
      },
      fontFamily: {
        'display': ['Manrope', 'sans-serif'],
        'body': ['Work Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
};
export default config;
