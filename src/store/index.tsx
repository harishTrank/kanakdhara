import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

import {rootReducer} from './rootReducer';

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
