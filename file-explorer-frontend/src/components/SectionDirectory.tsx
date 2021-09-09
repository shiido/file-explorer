import React from 'react';

import { Box, Badge, WrapItem, Center } from '@chakra-ui/react';
import FolderTree from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';

interface Section {
   name: string,
   children: []
}

const SectionDirectory: React.FC<{ data: Section }> = (props) => {

   return <WrapItem>
      <Center>
         <Box w="680px" h="300px" bg="gray.50" borderWidth="1px" borderRadius="lg" p={4} m={2}
            borderColor="gray.100" boxShadow="0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)"
            overflowY="auto"
            css={{
               '&::-webkit-scrollbar': {
                  width: '4px',
               },
               '&::-webkit-scrollbar-track': {
                  width: '6px',
               },
               '&::-webkit-scrollbar-thumb': {
                  background: '#319795',
                  borderRadius: '24px',
               },
            }}>

            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
               <Badge borderRadius="full" px="2" colorScheme="teal">
                  {props.data.name}
               </Badge>
            </Box>

            <FolderTree
               data={props.data}
               showCheckbox={false}
               indentPixels={40}
               readOnly
            />

         </Box>
      </Center>
   </WrapItem>

};

export default SectionDirectory;