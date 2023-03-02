import {
  Box,
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SidebarWithHeader from "./AdminHome";

import { useLocation } from "react-router-dom";
import axios from "axios";
import CreateRoomModal from "../../components/common/CreateRoomModal";
import useFetch from "../../hooks/useFetch";

const RoomTable = () => {
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8000/api/hotels`
  );
  console.log("Hotel data", data);

  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("isOpen", isOpen);

  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log("pathhhhhhhhhhhhh", path);

  const [rowData, setRowData] = useState([]);
  console.log("rowData", rowData);

  const deleteUser = async (roomId) => {
    console.log("roomId", roomId);
    try {
      const hotelId = data.find((hotel, i) => {
        return hotel.rooms.includes(roomId);
      });
      console.log("hotelId", hotelId);
      await axios.delete(
        `http://localhost:8000/api/${path}/${roomId}/${hotelId._id}`
      );
      setRowData(rowData.filter((item) => item._id !== roomId));
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8000/api/${path}/`)
      .then((res) => res.json())
      .then((rowData) => setRowData(rowData));
  }, []);
  return (
    <SidebarWithHeader>
      <Box h="20em">
        <Box textAlign="end">
          <Button colorScheme="whatsapp" onClick={() => onOpen()}>
            Add Room
          </Button>
        </Box>
        <TableContainer>
          <Table variant="striped" colorScheme="blackAlpha">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Price</Th>
                <Th>MaxPeople</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {rowData &&
                rowData.map((item, key) => (
                  <Tr key={item?._id}>
                    <Td>{item?._id}</Td>
                    <Td>{item?.title}</Td>
                    <Td>{item?.price}</Td>
                    <Td>{item?.maxPeople}</Td>
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
        <CreateRoomModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </Box>
    </SidebarWithHeader>
  );
};

export default RoomTable;
