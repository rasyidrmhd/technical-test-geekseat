import React from "react";
import type { NextPage } from "next";
import axiosInstance from "../app/config/axios";
import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const Home: NextPage = () => {
  React.useEffect(() => {
    const testApi = async () => {
      const resp = await axiosInstance.get("/people");
      console.log(resp.data, ">>>>data");
    };
    testApi();
  }, []);

  return (
    <Flex p="40px">
      <TableContainer w="full">
        <Table variant="striped">
          <Thead>
            <Tr>
              {[
                "no",
                "name",
                "films",
                "species",
                "starships",
                "vehicles",
                "action",
              ].map((column, idx) => {
                return (
                  <Th fontSize="16px" color="wool-neutral.dark" key={idx}>
                    {column}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody></Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default Home;
