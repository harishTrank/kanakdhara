import {FC, ReactElement, useMemo} from 'react';
import {Axios} from './Axios';

import {useAppDispatch} from '../store';
import {logout} from '../store/auth/authSlice';

type Props = {
  children: ReactElement;
};

const WithAxios: FC<Props> = ({children}) => {
  const dispatch = useAppDispatch();
  useMemo(() => {
    Axios.interceptors.response.use(
      function (response: any) {
        return response;
      },
      async error => {
        if (error?.response?.status === 401) {
          dispatch(logout());
        }
        return Promise.reject(error);
      },
    );
  }, [dispatch]);

  return children;
};

export default WithAxios;
