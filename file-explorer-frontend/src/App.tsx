import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ChakraProvider } from '@chakra-ui/react';

import TodoCard from '@/components/TodoCard';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider resetCSS={false}>
        <TodoCard />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
