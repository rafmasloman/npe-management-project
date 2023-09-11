// import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import {
  ButtonStyles,
  PasswordInputStyles,
  TextInputStyles,
} from '@/src/themes/mantine.theme';
import jakartaSans from '@/src/utils/font.utils';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
        fontFamily: jakartaSans.style.fontFamily,
        components: {
          Button: { defaultProps: ButtonStyles },
          TextInput: { defaultProps: TextInputStyles },
          PasswordInput: { defaultProps: PasswordInputStyles },
        },
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}
