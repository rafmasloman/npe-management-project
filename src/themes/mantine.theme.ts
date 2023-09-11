import {
  MantineProvider,
  ButtonProps,
  SwitchProps,
  TextInputProps,
  PasswordInputProps,
} from '@mantine/core';

export const ButtonStyles: Partial<ButtonProps> = {
  h: '40px',
  px: '1rem',
  py: '5px',
};

export const TextInputStyles: Partial<TextInputProps> = {
  radius: '7px',
  styles: {
    label: {
      marginBottom: '10px',
    },
  },
};

export const PasswordInputStyles: Partial<PasswordInputProps> = {
  radius: '7px',
  styles: {
    label: {
      marginBottom: '10px',
    },
  },
};
