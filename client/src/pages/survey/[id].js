import React, { useState, useEffect } from "react";
import { getSurveyById } from "@/api/survey";
import { useRouter } from "next/router";
import { useFieldArray, useForm, watch } from "react-hook-form";
import {
  Box,
  ChakraProvider,
  CSSReset,
  extendTheme,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Image,
  Icon,
  useToast,
  useDisclosure,
  Button,
  Flex,
  HStack,
  VStack,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useTable, useFilters, useSortBy } from "react-table";
import { FiPlus, FiEdit, FiDelete } from "react-icons/fi";
import InputField from "@/component/InputField";
import ModalConfirmation from "@/component/ModalConfirmation";
import axios from "axios";
import SurveyTable from "@/component/SurveyTable";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        fontFamily: "body",
      },
    },
  },
});

export default function Page({ surveyId }) {
  const [category, setCategory] = useState([]);
  const router = useRouter();
  const tableSize = useBreakpointValue({ base: "lg", lg: "lg", sm: "sm" });
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [detailCategory, setDetailCategory] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getSurveyById(surveyId);
      setCategory(data);
    };
    fetchCategory();
  }, [surveyId]);

  console.log(category);

  const columns = React.useMemo(
    () => [
      {
        Header: "text",
        accessor: "text",
      },
    ],
    []
  );

  const handleEdit = async (id) => {
    const foundProduct = await getSurveyById(id);
    setDetailCategory(foundProduct);
    if (foundProduct) {
      setEditItemId(id);
      setIsModalOpen(true);
    }
  };

  const handleDeleteItems = async (id) => {
    try {
      await deleteSurvey(id);
      handleCloseModal(),
        toast({
          title: "Delete Category",
          description: "Successfully deleted category",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      fetchCategories();
    } catch (error) {
      toast({
        title: "Failed to delete category",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/survey/${editItemId}`,
        data
      );
      handleCloseModal();
      toast({
        title: "Update Product",
        description: "Successfully updated Product",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      fetchCategories();
      reset();
    } catch (error) {
      toast({
        title: "Failed to update product",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Flex
      w={"100%"}
      marginTop={"5em"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      zIndex={1}>
      <HStack
        display={"flex"}
        justifyContent={"space-between"}
        mx={5}
        alignItems={"center"}>
        <Button size={"sm"} w={"3"} onClick={() => router.back()}>
          <ArrowBackIcon w={4} h={4} />
        </Button>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          Survey mengenai {category?.survey?.title}
        </Text>
        <InputCategory fetchCategory={() => category()} />
      </HStack>

      <Flex direction={"column"}>
        <Flex direction={"column"} columnGap={"20px"}>
          <Flex direction={"column"}></Flex>
          <VStack mt={6}>
            <TableContainer overflowY={"auto"} h={"25em"} px={5} w={"100%"}>
              <Table size={tableSize} variant="simple">
                <Thead bg={"#06283D"}>
                  <Tr>
                    <Th color={"#EEEDED"}>Text</Th>
                    <Th color={"#EEEDED"}>Action</Th>
                  </Tr>
                </Thead>
                <Tbody bg={"#EEEDED"}>
                  {category?.question?.map((item) => (
                    <Tr key={item.id}>
                      <Td>{item.text}</Td>
                      <Td>
                        <Icon
                          color={"#06283D"}
                          onClick={() => handleEdit(item.id)}
                          as={FiEdit}
                          mr={3}
                          _hover={{
                            cursor: "pointer",
                            color: "#4F709C",
                          }}
                          title="Edit"
                        />
                        <Icon
                          color={"red"}
                          onClick={() => {
                            setDeleteId(item.id);
                            onOpen();
                          }}
                          as={FiDelete}
                          _hover={{
                            cursor: "pointer",
                            color: "#EF6262",
                          }}
                          title="Delete"
                        />
                      </Td>
                    </Tr>
                  ))}
                  <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader textAlign="center">Edit Survey</ModalHeader>
                      <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <InputField
                            label={"Title"}
                            name={"title"}
                            placeholder={"Insert Title"}
                            register={register("title", {
                              required: "This is required",
                            })}
                            errors={errors.title}
                          />
                          <InputField
                            label={"Description"}
                            name={"description"}
                            placeholder={"Insert description"}
                            register={register("description", {
                              required: "This is required",
                            })}
                            errors={errors.description}
                          />
                          <Button
                            type="submit"
                            size={"md"}
                            colorScheme="blue"
                            isLoading={isSubmitting}
                            rounded={"full"}
                            w={"100%"}>
                            Update Survey
                          </Button>
                        </form>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          size={"sm"}
                          colorScheme="red"
                          rounded={"full"}
                          fontWeight={"semibold"}
                          onClick={handleCloseModal}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Tbody>
              </Table>
            </TableContainer>

            <ModalConfirmation
              isOpen={isOpen}
              onClose={onClose}
              name={"category"}
              onClick={() => {
                handleDeleteItems(deleteId);
                onClose();
              }}
            />
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader textAlign="center">Edit Category</ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                      label={"Category Name"}
                      name={"title"}
                      placeholder={"Insert title"}
                      register={register("title", {
                        required: "This is required",
                      })}
                      errors={errors.title}
                    />
                    <InputField
                      label={"Description"}
                      name={"description"}
                      placeholder={"Insert description"}
                      register={register("description", {
                        required: "This is required",
                      })}
                      errors={errors.description}
                    />
                    <Button
                      type="submit"
                      size={"md"}
                      colorScheme="blue"
                      isLoading={isSubmitting}
                      rounded={"full"}
                      w={"100%"}>
                      Update Category
                    </Button>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button
                    size={"sm"}
                    colorScheme="red"
                    rounded={"full"}
                    fontWeight={"semibold"}
                    onClick={handleCloseModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <SurveyTable data={category?.question} />
          </VStack>
        </Flex>
      </Flex>
    </Flex>
    // <ChakraProvider theme={theme}>
    //   <CSSReset />
    //   <Box p={4}>
    //     <Table {...getTableProps()} variant="striped" colorScheme="teal">
    //       <Thead>
    //         {headerGroups.map((headerGroup) => (
    //           <Tr {...headerGroup.getHeaderGroupProps()}>
    //             {headerGroup.headers.map((column) => (
    //               <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
    //                 {column.render("Header")}
    //                 <span>
    //                   {column.isSorted
    //                     ? column.isSortedDesc
    //                       ? " 🔽"
    //                       : " 🔼"
    //                     : ""}
    //                 </span>
    //               </Th>
    //             ))}
    //           </Tr>
    //         ))}
    //       </Thead>
    //       <Tbody {...getTableBodyProps()}>
    //         {rows.map((row) => {
    //           prepareRow(row);
    //           return (
    //             <Tr {...row.getRowProps()}>
    //               {row.cells.map((cell) => {
    //                 return (
    //                   <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
    //                 );
    //               })}
    //             </Tr>
    //           );
    //         })}
    //       </Tbody>
    //     </Table>
    //   </Box>
    // </ChakraProvider>
  );
}

export const InputCategory = ({ fetchCategories }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/question",
        data
      );
      handleCloseModal(),
        toast({
          title: "Created Category",
          description: "Successfully created category",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      fetchCategories();
      reset();
    } catch (error) {
      toast({
        title: "Failed to create category",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Box>
      <Button
        size="sm"
        bgColor={"#06283D"}
        color={"#EEEDED"}
        leftIcon={<FiPlus />}
        onClick={handleOpenModal}
        borderRadius={"full"}
        boxShadow={"0px 0px 3px 0px #06283D"}
        _hover={{
          bg: "#164B60",
          color: "#EEEDED",
        }}>
        Create Response Survey Pemilu 2024
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Category Form</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label={"text"}
                name={"text"}
                placeholder={"Insert text"}
                register={register("text", { required: "This is required" })}
                errors={errors.text}
              />
              <InputField
                type={"number"}
                label={"survey_id"}
                name={"survey_id"}
                placeholder={"Insert survey_id"}
                register={register("survey_id", {
                  required: "This is required",
                })}
                errors={errors.survey_id}
              />
              <Button
                type="submit"
                size={"md"}
                colorScheme="blue"
                mt={3}
                rounded={"full"}
                w={"100%"}>
                Create Title
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              size={"sm"}
              colorScheme="red"
              rounded={"full"}
              fontWeight={"semibold"}
              onClick={handleCloseModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;

  return { props: { surveyId: id } };
}
