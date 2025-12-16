/**
 * @format
 */

// --- MUST LOAD FIRST (fixes AppState.removeEventListener error)
import './polyfills';

// Gesture handler MUST be at the top (after polyfills)
import 'react-native-gesture-handler';

import {AppRegistry, LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreAllLogs();

function Main() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <App />
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(appName, () => Main);
