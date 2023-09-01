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
  Button,
  Input,
  Skeleton,
} from "@chakra-ui/react";
import { PeopleResponse } from "interfaces/people.interface";
import usePagination from "hooks/usePagination";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import useResponseToast from "hooks/useToast";
import { AxiosError, AxiosResponse } from "axios";
import ColumnFetcher from "@/components/ColumnFetcher";

const Home: NextPage = () => {
  const router = useRouter();
  const { showToast } = useResponseToast();
  const [data, setData] = React.useState<PeopleResponse | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");

  const { renderPageNumber, currentPage, setCurrentPage } = usePagination({
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
        const { response } = error as AxiosError;
        const { data } = response as AxiosResponse;
        showToast("Error", "error", data?.message as string);
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
  }, [currentPage, search, showToast]);

  const columns = React.useMemo(() => {
    return [
      { label: "no", width: "5%" },
      { label: "name", width: "10%" },
      { label: "films", width: "15%" },
      { label: "species", width: "15%" },
      { label: "starships", width: "20%" },
      { label: "vehicles", width: "20%" },
      { label: "action", width: "10%" },
    ];
  }, []);

  const getNumber = React.useCallback(
    (number: number) => {
      return (currentPage - 1) * 10 + number + 1;
    },
    [currentPage]
  );

  return (
    <Flex
      p={{ base: " 40px 20px", lg: "40px" }}
      w="100vw"
      minH="100vh"
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
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
            setIsLoading(true);
          }}
        />
        <TableContainer
          w="full"
          p="20px"
          bg="white"
          borderRadius="20px"
          h="fit-content"
        >
          <Table variant="striped">
            <Thead>
              <Tr>
                {columns.map((column, idx) => {
                  return (
                    <Th
                      fontSize="16px"
                      color="wool-neutral.dark"
                      key={idx}
                      w={column.width}
                      wordBreak="break-word"
                    >
                      {column.label}
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
                    <Td>
                      <ColumnFetcher
                        resource="films"
                        endpoints={person.films}
                      />
                    </Td>
                    <Td>
                      <ColumnFetcher
                        resource="species"
                        endpoints={person.species}
                      />
                    </Td>
                    <Td>
                      <ColumnFetcher
                        resource="starships"
                        endpoints={person.starships}
                      />
                    </Td>
                    <Td>
                      <ColumnFetcher
                        resource="vehicles"
                        endpoints={person.vehicles}
                      />
                    </Td>
                    <Td>
                      <Button
                        colorScheme="blue"
                        onClick={() =>
                          router.push(
                            `/detail/${person.url.replaceAll(
                              `${process.env.NEXT_PUBLIC_BASE_URL}/people/`,
                              ""
                            )}`
                          )
                        }
                      >
                        Detail
                      </Button>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>

      {isLoading && data === null ? <Skeleton h="20px" /> : renderPageNumber}
    </Flex>
  );
};

export default Home;
