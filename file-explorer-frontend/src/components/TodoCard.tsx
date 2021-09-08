import React, { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';

import FolderTree, { testData } from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';

// Actions
import { onTodoFind } from '@/redux/actions/todoActions';

import socket from '@/utiles/socketUtil';

/*interface Props {
   [key: string]: any;
}*/

const TodoCard: React.FC = () => {

   const dispatch = useDispatch();

   const todo: [] = useSelector((state: RootStateOrAny) => state.todo.data.all);


   console.log('env', process.env);

   useEffect(
      () => {
         dispatch(onTodoFind());
      },
      []
   );

   const onTreeStateChange = (state, event) => console.log(state, event);

   return <>
      <SimpleGrid columns={2} spacing={2}>
         <Box bg="gray.300" borderWidth="1px" borderRadius="lg" p={4} m={2} borderColor="gray.100"
            boxShadow="0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)" height="700px">
            <Text>Hola</Text>

            <FolderTree
               data={testData}
               onChange={onTreeStateChange}
            />

         </Box>

         <Box bg="gray.300" borderWidth="1px" borderRadius="lg" p={4} m={2} borderColor="gray.100"
            boxShadow="0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)" height="700px">
            <Text>Hola</Text>

            <FolderTree
               data={testData}
               onChange={onTreeStateChange}
            />

         </Box>

      </SimpleGrid>
   </>;
};

export default TodoCard;
