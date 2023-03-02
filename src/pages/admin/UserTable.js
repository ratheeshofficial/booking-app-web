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
  WrapItem,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import SidebarWithHeader from "./AdminHome";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import axios from "axios";

const UserTable = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [rowData, setRowData] = useState([]);

  const deleteUser = async (id) => {
    console.log("id", id);
    try {
      await axios
        .delete(`https://bookingapi-lctl.onrender.com/api/${path}/${id}`)
        .then((res) => console.log("res", res));
      setRowData(rowData.filter((item) => item._id !== id));
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetch(`https://bookingapi-lctl.onrender.com/api/${path}/`)
      .then((res) => res.json())
      .then((rowData) => setRowData(rowData));
  }, []);
  return (
    <SidebarWithHeader>
      <Box h="20em">
        {/* <AgGridReact
          className="ag-theme-alpine"
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        ></AgGridReact> */}
        <TableContainer>
          <Table variant="striped" colorScheme="blackAlpha">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>UserName</Th>
                <Th>Email</Th>
                <Th>createdAt</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>

            <Tbody>
              {rowData &&
                rowData.map((item, key) => (
                  <Tr key={key}>
                    <Td>{item?._id}</Td>
                    <Td>
                      <WrapItem>
                        <Avatar
                          mt="1"
                          size="sm"
                          name="Dan Abrahmov"
                          src="https://bit.ly/dan-abramov"
                        />
                        <Text ml="5" mt="2">
                          {item?.username}
                        </Text>
                      </WrapItem>
                    </Td>
                    <Td>{item?.email}</Td>
                    <Td>{item?.createdAt}</Td>
                    <Td>
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
      </Box>
      {/* <Button colorScheme="red" onClick={() => deleteUser(1)}>
        Data
      </Button> */}
    </SidebarWithHeader>
  );
};

export default UserTable;
