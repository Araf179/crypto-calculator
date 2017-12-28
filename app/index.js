import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'react-redux'; 
import Navigator from './config/routes';
import Home from './config/routes';
import { AlertProvider } from './components/alert';
import store from './config/store';

EStyleSheet.build({
    $primaryBlue: '#87CEEB',
    $primaryOrange: '#EBCE87',
    $primaryGreen: '#9CEB87',
    $primaryPurple: '#EB87C9',
    $white: '#FFFFFF',
    $lightGray: '#F0F0F0',
    $border: '#979797',
    $inputText: '#797979',
    $darkText: '#343434',
});

export default () => (
    <Provider store={store}>
      <AlertProvider>
        <Navigator onNavigationStateChange={null} />
      </AlertProvider>
    </Provider>
  );