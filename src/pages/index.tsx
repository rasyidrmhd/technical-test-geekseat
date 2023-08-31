import React from "react";
import type { NextPage } from "next";
import axiosInstance from "../app/config/axios";
import {
  Flex,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { PeopleResponse } from "interfaces/people.interface";

const Home: NextPage = () => {
  const [data, setData] = React.useState<PeopleResponse | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getPeople = async () => {
      try {
        setIsLoading(true);
        const resp = await axiosInstance.get("/people");
        console.log(resp.data, ">>>>data");
        setData(resp.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getPeople();
  }, []);

  return (
    <Flex p="40px" w="100vw" h="100vh" inset={0}>
      <TableContainer w="full" bg="white" h="fit-content">
        <Table variant="simple">
          {isLoading && (
            <Tbody>
              <Tr>
                <Td colSpan={7} textAlign="center">
                  <Spinner
                    color="blue"
                    thickness="4px"
                    speed="0.65s"
                    size="lg"
                    emptyColor="gray"
                  />
                  <Text mt="10px">Loading data</Text>
                </Td>
              </Tr>
            </Tbody>
          )}
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
          <Tbody>
            {data?.results?.map((person, idx) => (
              <Tr key={idx}>
                <Td>{idx}</Td>
                <Td>{person.name}</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default Home;
