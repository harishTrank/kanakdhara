import {useToast} from 'native-base';
import {useEffect, useState} from 'react';

export const useMessage = () => {
  const [message, setMessage] = useState('');
  const toast = useToast();

  useEffect(() => {
    toast.closeAll();

    if (message) {
      toast.show({
        title: message,
        placement: 'bottom',
        duration: 3000,
        onCloseComplete: () => setMessage(''),
      });
    }
  }, [message]);

  return setMessage;
};
