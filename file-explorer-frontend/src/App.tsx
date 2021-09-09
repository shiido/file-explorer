import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ChakraProvider } from '@chakra-ui/react';

import IndexPage from '@/pages/IndexPage';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider resetCSS={false}>
        <IndexPage />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
