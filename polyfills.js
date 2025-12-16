import {AppState, BackHandler} from 'react-native';

/* ------------------------------------------------------------------
   Polyfill for AppState.removeEventListener (deprecated)
------------------------------------------------------------------- */
if (!AppState.removeEventListener) {
  const originalAdd = AppState.addEventListener.bind(AppState);

  AppState.removeEventListener = (type, handler) => {
    const sub = originalAdd(type, handler);
    if (sub && typeof sub.remove === 'function') {
      sub.remove();
    }
  };
}

/* ------------------------------------------------------------------
   Polyfill for BackHandler.removeEventListener (deprecated)
------------------------------------------------------------------- */
if (!BackHandler.removeEventListener) {
  const originalAdd = BackHandler.addEventListener.bind(BackHandler);

  BackHandler.removeEventListener = (type, handler) => {
    try {
      const sub = originalAdd(type, handler);
      if (sub && typeof sub.remove === 'function') {
        sub.remove();
      }
    } catch (e) {
      // ignore
    }
  };
}
