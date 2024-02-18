import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

export const useModal = () => {
  const [itemId, setItemId] = useState('');

  const [opened, { close, open }] = useDisclosure(false);

  const handleConfirm = (itemId: string) => {
    setItemId(itemId);

    console.log('payroll id : ', itemId);

    open();
  };

  return { itemId, opened, close, open, handleConfirm };
};
