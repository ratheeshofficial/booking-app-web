import {
  Avatar,
  Box,
  Button,
  filter,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  WrapItem,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import SidebarWithHeader from "./AdminHome";

import { useLocation } from "react-router-dom";
import axios from "axios";
import CreateHotelModal from "../../components/common/CreateHotelModal";

const HotelTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("isOpen", isOpen);

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [rowData, setRowData] = useState([]);
  console.log("rowData", rowData);

  const deleteUser = async (id) => {
    console.log("id", id);
    try {
      await axios.delete(`http://localhost:8000/api/${path}/${id}`);
      setRowData(rowData.filter((item) => item._id !== id));
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8000/api/${path}`)
      .then((res) => res.json())
      .then((rowData) => setRowData(rowData));
  }, []);
  return (
    <SidebarWithHeader>
      <Box h="20em">
        <Box textAlign="end">
          <Button colorScheme="whatsapp" onClick={() => onOpen()}>
            Add Hotel{" "}
          </Button>
        </Box>
        <TableContainer>
          <Table variant="striped" colorScheme="blackAlpha">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Type</Th>
                <Th>City</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {rowData &&
                rowData.map((item, key) => (
                  <Tr key={item?._id}>
                    <Td>{item?._id}</Td>
                    <Td>{item?.name}</Td>
                    <Td>{item?.type}</Td>
                    <Td>{item?.city}</Td>
                    <Td>
                      <Button colorScheme="blue" variant="outline" mr="2">
                        View
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => deleteUser(item._id)}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CreateHotelModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </Box>
    </SidebarWithHeader>
  );
};

export default HotelTable;
