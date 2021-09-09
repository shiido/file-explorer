import React, { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { SimpleGrid, Wrap, WrapItem, Center } from '@chakra-ui/react';

// Utils
import notify from '@/utiles/toastUtil';

// Actions
import { onFilesFind } from '@/redux/actions/todoActions';

import socket from '@/utiles/socketUtil';

import SectionDirectory from '@/components/SectionDirectory';
import NewSectionButton from '@/components/NewSectionButton';

const IndexPage: React.FC = () => {

   const dispatch = useDispatch();

   const folders = process.env.REACT_APP_FOLDERS;
   console.log('folders', folders)

   const files: any[] = useSelector((state: RootStateOrAny) => state.todo.sample.folders);

   const handleNotify = (data: any) => {

      console.log('notify', data);

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
         duration: 5000,
         position: 'bottom-right'
      });

   }

   const handleRegisterNewDirectory = (data: any) => {
      console.log('Here.', data, socket);
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
            console.log('data', data)
            dispatch(onFilesFind(data));
         });

         socket.on('exception', function (data) {
            console.log('event', data);
         });

         socket.on('disconnect', function () {
            console.log('Disconnected');
         });

         return () => {
            socket.disconnect();
         };

      },
      []
   );

   return <>
      <SimpleGrid columns={1} spacing={2}>
         {files.map((item, index) => {
            return <SectionDirectory key={index} data={item} />
         })}

         <NewSectionButton handleRegisterNewDirectory={handleRegisterNewDirectory} />

      </SimpleGrid>

   </>;
};

export default IndexPage;
