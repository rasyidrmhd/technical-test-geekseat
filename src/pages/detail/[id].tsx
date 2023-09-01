import React from "react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import axiosInstance from "config/axios";
import { Center, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { People } from "interfaces/people.interface";
import useResponseToast from "hooks/useToast";
import { AxiosError, AxiosResponse } from "axios";
import { startCase } from "lodash";
import ColumnFetcher from "@/components/ColumnFetcher";

export const getServerSideProps: GetServerSideProps<{
  data: People;
  error: string;
}> = async (context) => {
  try {
    const id = context.query.id;
    const response = await axiosInstance.get(`/people/${id}`);
    return { props: { data: response.data, error: "" } };
  } catch (error) {
    const { response } = error as AxiosError;
    const { data } = response as AxiosResponse;
    return { props: { data: {}, error: data.detail as string } };
  }
};

const Detail: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data, error }) => {
  const router = useRouter();
  const { showToast } = useResponseToast();

  React.useEffect(() => {
    if (error) {
      showToast("Error", "error", error);
    }
  }, [error, showToast]);

  return (
    <Flex p="40px" w="100vw" minH="100vh" gap="20px" flexDir="column">
      <Center
        gap="4px"
        w="fit-content"
        onClick={() => router.push("/")}
        cursor="pointer"
      >
        <ArrowBackIcon />
        Back
      </Center>
      <Flex w="full" p="20px" bg="white" borderRadius="20px" flexDir="column">
        <Grid templateColumns="repeat(12,1fr)">
          <GridItem colSpan={2}>Name</GridItem>
          <GridItem colSpan={10}>: {startCase(data.name)}</GridItem>
        </Grid>
        <Grid templateColumns="repeat(12,1fr)">
          <GridItem colSpan={2}>Height</GridItem>
          <GridItem colSpan={10}>: {data.height} cm</GridItem>
        </Grid>
        <Grid templateColumns="repeat(12,1fr)">
          <GridItem colSpan={2}>Mass</GridItem>
          <GridItem colSpan={10}>: {data.mass}</GridItem>
        </Grid>
        <Grid templateColumns="repeat(12,1fr)">
          <GridItem colSpan={2}>Hair Color</GridItem>
          <GridItem colSpan={10}>: {startCase(data.hair_color)}</GridItem>
        </Grid>
        <Grid templateColumns="repeat(12,1fr)">
          <GridItem colSpan={2}>Skin Color</GridItem>
          <GridItem colSpan={10}>: {startCase(data.skin_color)}</GridItem>
        </Grid>
        <Grid templateColumns="repeat(12,1fr)">
          <GridItem colSpan={2}>Eye Color</GridItem>
          <GridItem colSpan={10}>: {startCase(data.eye_color)}</GridItem>
        </Grid>
        <Grid templateColumns="repeat(12,1fr)">
          <GridItem colSpan={2}>Birth Year</GridItem>
          <GridItem colSpan={10}>: {startCase(data.birth_year)}</GridItem>
        </Grid>
        <Grid templateColumns="repeat(12,1fr)">
          <GridItem colSpan={2}>Gender</GridItem>
          <GridItem colSpan={10}>: {startCase(data.gender)}</GridItem>
        </Grid>
        <Grid templateColumns="repeat(12,1fr)">
          <GridItem colSpan={2}>Home World</GridItem>
          <GridItem colSpan={10} as={Flex} gap="4px">
            : <ColumnFetcher resource="planets" endpoints={[data.homeworld]} />{" "}
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(12,1fr)">
          <GridItem colSpan={2}>Films</GridItem>
          <GridItem colSpan={10} as={Flex} gap="4px">
            : <ColumnFetcher resource="films" endpoints={data.films} />{" "}
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(12,1fr)">
          <GridItem colSpan={2}>Species</GridItem>
          <GridItem colSpan={10} as={Flex} gap="4px">
            : <ColumnFetcher resource="species" endpoints={data.species} />{" "}
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(12,1fr)">
          <GridItem colSpan={2}>Vehicles</GridItem>
          <GridItem colSpan={10} as={Flex} gap="4px">
            : <ColumnFetcher resource="vehicles" endpoints={data.vehicles} />{" "}
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(12,1fr)">
          <GridItem colSpan={2}>Starships</GridItem>
          <GridItem colSpan={10} as={Flex} gap="4px">
            : <ColumnFetcher resource="starships" endpoints={data.starships} />{" "}
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Detail;
