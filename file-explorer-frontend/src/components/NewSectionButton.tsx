import React from 'react';

import {
   Button, Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   useDisclosure,
   FormControl,
   FormLabel,
   FormErrorMessage,
   Input
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';

interface FuncProps {
   handleRegisterNewDirectory: (data: any) => void;
}

const NewSectionButton: React.FC<FuncProps> = (props: FuncProps) => {

   const { isOpen, onOpen, onClose } = useDisclosure();
   const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm();

   return <>
      <Button onClick={onOpen} bg="cyan.600" colorScheme="teal" variant="solid">
         Add New Directory
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>

         <ModalOverlay />

         <ModalContent>

            <form onSubmit={handleSubmit(props.handleRegisterNewDirectory)}>

               <ModalHeader>Monitoring new directory</ModalHeader>

               <ModalBody>

                  <FormControl isInvalid={errors.directory}>

                     <FormLabel htmlFor="directory">
                        Directory
                     </FormLabel>

                     <Input
                        size="xs"
                        id="directory"
                        placeholder="Enter the directory to monitoring"
                        {
                        ...register("directory",
                           {
                              required: "The directory is required",
                           })
                        }
                     />

                     <FormErrorMessage>
                        {errors.directory && errors.directory.message}
                     </FormErrorMessage>

                  </FormControl>

               </ModalBody>

               <ModalFooter>
                  
                  <Button colorScheme="teal" bg="red.500" size="sm" variant="solid" mr={3} onClick={onClose}>
                     Cancel
                  </Button>

                  <Button isLoading={isSubmitting} bg="cyan.600" colorScheme="teal" variant="solid" size="sm" type="submit">
                     Monitoring
                  </Button>
               </ModalFooter>

            </form>

         </ModalContent>
      </Modal>
   </>;
}

export default NewSectionButton;