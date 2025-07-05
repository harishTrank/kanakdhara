import {useEffect, useState} from 'react';

import {useMessage} from './useMessage';
import {GOLD_API_KEY, GOLD_API_STATUS, GOLD_PRICE_URL} from '../lib/Constants';
import { useGetCustomPriceApi } from '../hooksQuery/Home/query';

export const useGetGoldRates = () => {
  const setMessage = useMessage();

  const [goldPrice, setGoldPrice] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getCustomPriceApi: any = useGetCustomPriceApi();

  const getGoldRates = async () => {
    const myHeaders = new Headers();
    myHeaders.append('x-access-token', GOLD_API_KEY);
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(GOLD_API_STATUS, requestOptions)
      .then(response => response.text())
      .then(result => {
        const responseStatus = JSON.parse(result);
        console.log('responseStatus', responseStatus);
        if (responseStatus) {
          fetch(GOLD_PRICE_URL, requestOptions)
            .then(response => response.text())
            .then(res => {
              const goldDetails: any = JSON.parse(res);
              const base24kPrice: any = Math.round(goldDetails.price_gram_24k * 10) + (Number(getCustomPriceApi?.data?.karat_24_price_addon) || 6999);
              setGoldPrice(base24kPrice);
              setIsLoading(false);
            })
            .catch(error => setMessage(error));
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error123431', error);
        setMessage(error);
      });
  };

  useEffect(() => {
    getGoldRates();
  }, []);

  return {
    goldPrice,
    isLoading,
  };
};
