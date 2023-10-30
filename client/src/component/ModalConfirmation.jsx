import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

function ModalConfirmation({ isOpen, onClose, name, onClick }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalBody>
          <Text>{`Are you sure you want to delete this ${name}?`}</Text>
        </ModalBody>
        <ModalFooter>
          <Button rounded={"full"} colorScheme="red" mr={3} onClick={onClick}>
            Delete
          </Button>
          <Button rounded={"full"} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalConfirmation;
