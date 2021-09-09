import React from 'react';

import {
   Button,
   Modal,
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

      <Button onClick={onOpen} bg="teal.400" colorScheme="teal" variant="solid" role="new-directory-button">
         Add New Directory
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} id="new-directory-modal">

         <ModalOverlay />

         <ModalContent>

            <form onSubmit={handleSubmit(props.handleRegisterNewDirectory)}>

               <ModalHeader>Monitoring new directory</ModalHeader>

               <ModalBody>

                  <FormControl isInvalid={errors.directory}>

                     <FormLabel htmlFor="directory">Directory</FormLabel>

                     <Input role="new-directory-input" size="xs" id="directory" placeholder="Enter the directory to monitoring"
                        {
                        ...register("directory",
                           {
                              required: "The directory is required",
                           })
                        }
                     />

                     <FormErrorMessage role="error-message">{errors.directory && errors.directory.message}</FormErrorMessage>

                  </FormControl>

               </ModalBody>

               <ModalFooter>

                  <Button role="cancel-modal-button" colorScheme="teal" bg="red.500" size="sm" variant="solid" mr={3} onClick={onClose}>
                     Cancel
                  </Button>

                  <Button role="accept-modal-button" isLoading={isSubmitting} bg="cyan.600" colorScheme="teal" variant="solid" size="sm" type="submit">
                     Monitoring
                  </Button>

               </ModalFooter>

            </form>

         </ModalContent>
      </Modal>
   </>;
}

export default NewSectionButton;