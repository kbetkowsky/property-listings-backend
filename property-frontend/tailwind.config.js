/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // TUMMIM Ocean-Tech palette
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe', 
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#1e40af',    // Main Tummim blue
          600: '#1d4ed8',
          700: '#1e3a8a',    // Deep blue
          800: '#1e40af',
          900: '#0f172a'     // Darkest navy
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#059669',    // Tummim green
          600: '#047857',
          700: '#065f46',    // Deep green
          800: '#064e3b',
          900: '#022c22'
        },
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#0891b2',    // Teal accent
          600: '#0e7490',
          700: '#155e75',
          800: '#164e63',
          900: '#083344'
        }
      },
      backgroundImage: {
        'ocean-gradient': 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 30%, #0891b2 70%, #059669 100%)',
        'tummim-hero': 'linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #0891b2 100%)',
        'tummim-button': 'linear-gradient(90deg, #059669 0%, #0891b2 100%)',
        'tummim-card': 'linear-gradient(145deg, #1e40af 0%, #059669 100%)',
      },
      fontFamily: {
        'display': ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'wave': 'wave 8s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
