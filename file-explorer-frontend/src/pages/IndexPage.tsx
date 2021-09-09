import React, { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Wrap, Center, Box, Text } from '@chakra-ui/react';

// utiles
import notify from '@/utiles/toastUtil';
import socket from '@/utiles/socketUtil';

// actions
import { onFilesFind } from '@/redux/actions/directoryActions';

// components
import SectionDirectory from '@/components/SectionDirectory';
import NewSectionButton from '@/components/NewSectionButton';

const IndexPage: React.FC = () => {

   const dispatch = useDispatch();

   const folders = process.env.REACT_APP_FOLDERS;

   const files: any[] = useSelector((state: RootStateOrAny) => state.directory.sample.folders);

   const handleNotify = (data: any) => {

      let status = '';
      let description = '';
      if (data.event === 'unlink' || data.event === 'unlinkDir') {
         status = 'error';
         description = (data.event === 'unlink') ? `The file called ${data.path} has been deleted` : `The folder called ${data.path} has been deleted`;
      } else if (data.event === 'add' || data.event === 'addDir') {
         status = 'success';
         description = (data.event === 'add') ? `The file called ${data.path} has been added` : `The folder called ${data.path} has been added`;
      } else {
         status = 'info';
         description = `The file called ${data.path} has been renamed`;
      }

      notify({
         status,
         description,
         title: 'New Change',
         duration: 8000,
         position: 'bottom-right'
      });

   }

   const handleRegisterNewDirectory = (data: any) => {
      socket.emit('new-monitoring', data.directory);
   }

   socket.on('connect', function () {

      socket.emit('monitoring', folders?.split(','), (response: any) => {
         dispatch(onFilesFind(response));
      });

   });

   useEffect(
      () => {

         socket.on('refresh', function (data) {
            dispatch(onFilesFind(data.folderResponse));
            handleNotify(data.event);
         });

         socket.on('new-directory', function (data) {
            dispatch(onFilesFind(data));
         });

         socket.on('disconnect', function () {
            notify({
               status: 'error',
               title: 'Disconnect',
               duration: 2000,
               position: 'bottom-left'
            });
         });

         return () => {
            socket.disconnect();
         };

      },
      // eslint-disable-next-line
      []
   );

   return <>
      <Box bg="gray.700">

         <Text fontSize="6xl" textAlign="center" color="white">File Explorer</Text>

         <Wrap spacing="30px" align="center" justify="center">
            {files.map((item, index) => {
               return <SectionDirectory key={index} data={item} />
            })}
         </Wrap>

         <Box p={5} m={5}>
            <Center>
               <NewSectionButton handleRegisterNewDirectory={handleRegisterNewDirectory} />
            </Center>
         </Box>

      </Box>
   </>;
};

export default IndexPage;