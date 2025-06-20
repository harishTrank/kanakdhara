import {extendTheme} from 'native-base';

export const NativeBaseTheme = extendTheme({
  fontConfig: {
    Montserrat: {
      100: {
        normal: 'Montserrat-Thin',
        italic: 'Montserrat-ThinItalic',
      },
      200: {
        normal: 'Montserrat-ExtraLight',
        italic: 'Montserrat-ExtraLightItalic',
      },
      300: {
        normal: 'Montserrat-Light',
        italic: 'Montserrat-LightItalic',
      },
      400: {
        normal: 'Montserrat-Regular',
        italic: 'Montserrat-Italic',
      },
      500: {
        normal: 'Montserrat-Medium',
        italic: 'Montserrat-MediumItalic',
      },
      600: {
        normal: 'Montserrat-SemiBold',
        italic: 'Montserrat-SemiBoldItalic',
      },
      700: {
        normal: 'Montserrat-Black',
        italic: 'Montserrat-BlackItalic',
      },
      800: {
        normal: 'Montserrat-Bold',
        italic: 'Montserrat-BoldItalic',
      },
      900: {
        normal: 'Montserrat-ExtraBold',
        italic: 'Montserrat-ExtraBoldItalic',
      },
    },
  },
  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat',
    mono: 'Montserrat',
  },

  colors: {
    primary: {
      '50': '#fef4dd',
      '100': '#fbe7b8',
      '200': '#f6d996',
      '300': '#eeca76',
      '400': '#eabd53',
      '500': '#e1b244',
      '600': '#eabd53', // #d6a637
      '700': '#c49831',
      '800': '#ab8733',
      '900': '#937634',
    },
  },
});
