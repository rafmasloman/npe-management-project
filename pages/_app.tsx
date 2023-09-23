// import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Loader, MantineProvider } from '@mantine/core';
import {
  ButtonStyles,
  DateInputStyles,
  MultiSelectInputStyles,
  PasswordInputStyles,
  SelectInputStyles,
  TextInputStyles,
  TextareaInputStyles,
} from '@/src/themes/mantine.theme';
import jakartaSans from '@/src/utils/font.utils';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

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
          DateInput: { defaultProps: DateInputStyles },
          Select: { defaultProps: SelectInputStyles },
          Textarea: { defaultProps: TextareaInputStyles },
          MultiSelect: { defaultProps: MultiSelectInputStyles },
        },
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <Component {...pageProps} />
      </DndProvider>
    </MantineProvider>
  );
}
