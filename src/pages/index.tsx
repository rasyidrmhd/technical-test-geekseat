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
  Button,
  Input,
} from "@chakra-ui/react";
import { PeopleResponse } from "interfaces/people.interface";
import usePagination from "hooks/usePagination";
import Loader from "@/components/Loader";

const Home: NextPage = () => {
  const [data, setData] = React.useState<PeopleResponse | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");

  const { renderPageNumber, currentPage } = usePagination({
    currentCount: data?.results.length || 0,
    totalCount: data?.count || 0,
    siblingCount: 1,
  });

  React.useEffect(() => {
    const getPeople = async () => {
      try {
        setIsLoading(true);
        const resp = await axiosInstance.get(`/people`, {
          params: {
            page: currentPage,
            search,
          },
        });
        setData(resp.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    const delay = setTimeout(
      () => {
        getPeople();
      },
      search.length ? 500 : 0
    );
    return () => clearTimeout(delay);
  }, [currentPage, search]);

  const getNumber = React.useCallback(
    (number: number) => {
      return (currentPage - 1) * 10 + number + 1;
    },
    [currentPage]
  );

  return (
    <Flex
      p="40px"
      w="100vw"
      minH="100vh"
      inset={0}
      gap="20px"
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex flexDir="column" w="full" gap="20px">
        <Input
          variant="outline"
          bg="white"
          w={{ base: "full", lg: "30%" }}
          placeholder="Search name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer
          w="full"
          p="20px"
          bg="white"
          borderRadius="20px"
          h="fit-content"
        >
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
                    <Loader size="lg" />
                  </Td>
                </Tr>
              ) : data?.results.length === 0 ? (
                <Tr>
                  <Td colSpan={7} textAlign="center" p="50px">
                    No data
                  </Td>
                </Tr>
              ) : (
                data?.results?.map((person, idx) => (
                  <Tr key={idx}>
                    <Td>{getNumber(idx)}</Td>
                    <Td>{person.name}</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td>
                      <Button colorScheme="blue">Detail</Button>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>

      {renderPageNumber}
    </Flex>
  );
};

export default Home;
