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
import usePagination from "hooks/usePagination";

const Home: NextPage = () => {
  const [data, setData] = React.useState<PeopleResponse | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { renderPageNumber, currentPage } = usePagination({
    currentCount: data?.results.length || 0,
    totalCount: data?.count || 0,
    siblingCount: 1,
  });

  React.useEffect(() => {
    const getPeople = async () => {
      try {
        setIsLoading(true);
        const resp = await axiosInstance.get("/people");
        setData(resp.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getPeople();
  }, []);

  return (
    <Flex p="40px" w="100vw" minH="100vh" inset={0} overflowX="hidden">
      <Flex flexDir="column" w="full" justifyContent="space-between" gap="20px">
        <Flex p="20px" w="full" bg="white" borderRadius="20px">
          <TableContainer w="full" h="fit-content">
            <Table variant="simple">
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
                {isLoading ? (
                  <Tr>
                    <Td colSpan={7} textAlign="center" p="50px">
                      <Spinner
                        color="blue.500"
                        thickness="4px"
                        speed="0.65s"
                        size="lg"
                        emptyColor="gray"
                      />
                      <Text mt="10px">Loading data</Text>
                    </Td>
                  </Tr>
                ) : (
                  data?.results?.map((person, idx) => (
                    <Tr key={idx}>
                      <Td>{idx}</Td>
                      <Td>{person.name}</Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>

        {renderPageNumber}
      </Flex>
    </Flex>
  );
};

export default Home;
