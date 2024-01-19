import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Loader, MantineProvider, NumberInput } from '@mantine/core';
import {
  ButtonStyles,
  DateInputStyles,
  FileInputStyles,
  MultiSelectInputStyles,
  NumberInputStyles,
  PasswordInputStyles,
  SelectInputStyles,
  TextInputStyles,
  TextareaInputStyles,
} from '@/src/themes/mantine.theme';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { poppins } from '@/src/utils/font.utils';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useAuth } from '@/src/hooks/useAuth';
import { UserCredential } from '@/src/context/user-credential.context';
import { COLORS } from '@/src/constant/colors.constant';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production';
import { Notifications } from '@mantine/notifications';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({});

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: poppins.style.fontFamily,
        components: {
          Button: { defaultProps: ButtonStyles },
          TextInput: { defaultProps: TextInputStyles },
          PasswordInput: { defaultProps: PasswordInputStyles },
          DateInput: { defaultProps: DateInputStyles },
          Select: { defaultProps: SelectInputStyles },
          Textarea: { defaultProps: TextareaInputStyles },
          MultiSelect: { defaultProps: MultiSelectInputStyles },
          NumberInput: { defaultProps: NumberInputStyles },
          FileInput: { defaultProps: FileInputStyles },
        },
        colors: {
          danger: [COLORS.DANGER],
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <DndProvider backend={HTML5Backend}>
          <UserCredential>
            <Notifications />
            <Component {...pageProps} />
          </UserCredential>
        </DndProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}
