import React, { useState, useEffect } from "react";
import {
  getSurveys,
  createSurvey,
  updateSurvey,
  deleteSurvey,
  getSurveyById,
} from "../api/survey";
import { useRouter } from "next/router";
import { useFieldArray, useForm, watch } from "react-hook-form";
import {
  Box,
  Grid,
  Text,
  Button,
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
  FormControl as FormErrorMessage,
  FormLabel as ChakraFormLabel,
  useToast,
  Icon,
  useDisclosure,
  Skeleton,
  extendTheme,
  ChakraProvider,
  CSSReset,
} from "@chakra-ui/react";
import { FiPlus, FiEdit, FiDelete } from "react-icons/fi";
import InputField from "./InputField";
import ModalConfirmation from "./ModalConfirmation";
import axios from "axios";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
} from "react-table";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        fontFamily: "body",
      },
    },
  },
});

// function GlobalFilter({
//   preGlobalFilteredRows,
//   globalFilter,
//   setGlobalFilter,
// }) {
//   const count = preGlobalFilteredRows.length;
//   const [value, setValue] = useState(globalFilter);
//   const onChange = useAsyncDebounce((value) => {
//     setGlobalFilter(value || undefined);
//   }, 200);

//   return (
//     <Input
//       value={value || ""}
//       onChange={(e) => {
//         setValue(e.target.value);
//         onChange(e.target.value);
//       }}
//       placeholder={`Search ${count} records...`}
//     />
//   );
// }

const Landing = () => {
  const [surveys, setSurveys] = useState([]);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [detailCategory, setDetailCategory] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getSurveys().then((data) => {
      setSurveys(data);
    });
  }, [surveys]);
  console.log(surveys);

  const columns = React.useMemo(
    () => [
      {
        Header: "name",
        accessor: "title",
      },
      {
        Header: "description",
        accessor: "description",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: surveys,
      },
      useSortBy
    );

  useEffect(() => {
    if (detailCategory) {
      setValue("name", detailCategory.name);
      setValue("description", detailCategory.description);
    }
  }, [detailCategory, isModalOpen]);

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
    <Box maxW="7xl" mx={"auto"} pt={{ base: 2, sm: 12, md: 17 }} mt={"5em"}>
      <Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          mb={"6em"}
          pb={"10"}>
          <Text fontWeight={"bold"} fontSize={"xl"}>
            Survey Pemilu 2024
          </Text>
          <InputCategory fetchSurvey={() => surveys()} />
        </Box>
        <Box>
          <TableContainer overflowY={"auto"} h={"25em"} px={5}>
            <Table variant="simple">
              <Thead bg={"#06283D"}>
                <Tr>
                  <Th color={"#EEEDED"}>Name</Th>
                  <Th color={"#EEEDED"}>Description</Th>

                  <Th color={"#EEEDED"}>Action</Th>
                </Tr>
              </Thead>

              <Tbody bg={"#EEEDED"}>
                {surveys.map((survey) => (
                  <Tr key={survey.id}>
                    <Td
                      onClick={() => router.push(`/survey/${survey.id}`)}
                      cursor={"pointer"}
                      _hover={"black"}>
                      {survey.title}
                    </Td>
                    <Tr>
                      <Td>{survey.description}</Td>
                    </Tr>

                    <Td>
                      <Icon
                        color={"#06283D"}
                        onClick={() => handleEdit(survey.id)}
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
                          setDeleteId(survey.id);
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
        </Box>
      </Box>
    </Box>
  );
};

export const InputCategory = ({ fetchSurvey }) => {
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
        "http://localhost:3000/api/v1/survey",
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
      fetchSurvey();
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
        Create Survey Pemilu 2024
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Category Form</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label={"title"}
                name={"title"}
                placeholder={"Insert title"}
                register={register("title", { required: "This is required" })}
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

// const Landing = () => {
//   const [data, setData] = useState([]);
//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "ID",
//         accessor: "id",
//       },
//       {
//         Header: "Name",
//         accessor: "title",
//       },
//       {
//         Header: "Email",
//         accessor: "description",
//       },
//       // Add more columns as needed
//     ],
//     []
//   );

//   useEffect(() => {
//     // Fetch data from an API using Axios
//     axios.get("http://localhost:3000/api/v1/survey").then((response) => {
//       setData(response.data);
//     });
//   }, []);

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     state,
//     setGlobalFilter,
//     page,
//     nextPage,
//     previousPage,
//     canNextPage,
//     canPreviousPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     setPageSize,
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: {
//         pageSize: 10,
//       },
//     },
//     useFilters,
//     useGlobalFilter,
//     useSortBy,
//     usePagination
//   );

//   return (
//     <ChakraProvider theme={theme}>
//       <CSSReset />
//       <Box p={4}>
//         {/* <GlobalFilter
//           preGlobalFilteredRows={rows}
//           globalFilter={state.globalFilter}
//           setGlobalFilter={setGlobalFilter}
//         /> */}
//         <Table {...getTableProps()} variant="striped" colorScheme="teal">
//           <Thead>
//             {headerGroups.map((headerGroup) => (
//               <Tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                     {column.render("Header")}
//                     <span>
//                       {column.isSorted
//                         ? column.isSortedDesc
//                           ? " 🔽"
//                           : " 🔼"
//                         : ""}
//                     </span>
//                   </Th>
//                 ))}
//               </Tr>
//             ))}
//           </Thead>
//           <Tbody {...getTableBodyProps()}>
//             {page.map((row) => {
//               prepareRow(row);
//               return (
//                 <Tr {...row.getRowProps()}>
//                   {row.cells.map((cell) => {
//                     return (
//                       <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
//                     );
//                   })}
//                 </Tr>
//               );
//             })}
//           </Tbody>
//         </Table>
//         <div>
//           <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//             {"<<"}
//           </button>{" "}
//           <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//             {"<"}
//           </button>{" "}
//           <button onClick={() => nextPage()} disabled={!canNextPage}>
//             {">"}
//           </button>{" "}
//           <button
//             onClick={() => gotoPage(pageCount - 1)}
//             disabled={!canNextPage}>
//             {">>"}
//           </button>{" "}
//           <span>
//             Page{" "}
//             <strong>
//               {state.pageIndex + 1} of {pageOptions.length}
//             </strong>{" "}
//           </span>
//           <span>
//             | Go to page:{" "}
//             <input
//               type="number"
//               defaultValue={state.pageIndex + 1}
//               onChange={(e) => {
//                 const page = e.target.value ? Number(e.target.value) - 1 : 0;
//                 gotoPage(page);
//               }}
//               style={{ width: "50px" }}
//             />
//           </span>{" "}
//           <select
//             value={state.pageSize}
//             onChange={(e) => {
//               setPageSize(Number(e.target.value));
//             }}>
//             {[10, 20, 30, 40, 50].map((pageSize) => (
//               <option key={pageSize} value={pageSize}>
//                 Show {pageSize}
//               </option>
//             ))}
//           </select>
//         </div>
//       </Box>
//     </ChakraProvider>
//   );
// };

export default Landing;
