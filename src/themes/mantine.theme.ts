import {
  MantineProvider,
  ButtonProps,
  SwitchProps,
  TextInputProps,
  PasswordInputProps,
  SelectItemProps,
  TextareaProps,
  MultiSelectProps,
  NumberInputProps,
  FileInputProps,
} from '@mantine/core';
import { SelectItemsStylesNames } from '@mantine/core/lib/Select/SelectItems/SelectItems';
import { DateInputProps } from '@mantine/dates';

export const ButtonStyles: Partial<ButtonProps> = {
  h: '40px',
  px: '1rem',
  py: '5px',
  radius: '7px',
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

export const SelectInputStyles: Partial<TextInputProps> = {
  styles: {
    input: {
      borderRadius: '7px',
      marginTop: 10,
      padding: 24,
    },
  },
};

export const DateInputStyles: Partial<DateInputProps> = {
  radius: '7px',
  styles: {
    label: {
      marginBottom: '10px',
    },
    input: {
      padding: 24,
    },
  },
};

export const TextareaInputStyles: Partial<TextareaProps> = {
  radius: '7px',
  styles: {
    label: {
      marginBottom: '10px',
    },
    input: {
      height: '120px',
      padding: 24,
    },
  },
};

export const MultiSelectInputStyles: Partial<MultiSelectProps> = {
  styles: {
    label: {
      marginBottom: '10px',
    },
    input: {
      padding: 12,
    },
  },
};

export const NumberInputStyles: Partial<NumberInputProps> = {
  styles: {
    label: {
      marginBottom: '10px',
    },
    input: {
      padding: 24,
    },
  },
};

export const FileInputStyles: Partial<FileInputProps> = {
  styles: {
    label: {
      marginBottom: 10,
    },
    input: {
      padding: 13,
      borderRadius: 10,
    },
  },
};
