import React from "react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import axiosInstance from "config/axios";
import { Center, Flex } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { People } from "interfaces/people.interface";

export const getServerSideProps: GetServerSideProps<{ data: People }> = async (
  context
) => {
  const id = context.query.id;
  const response = await axiosInstance.get(`/people/${id}`);
  return { props: { data: response.data } };
};

const Detail: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const router = useRouter();
  console.log(data);
  return (
    <Flex
      p="40px"
      w="100vw"
      minH="100vh"
      gap="20px"
      flexDir="column"
      border="1px solid black"
    >
      <Center
        gap="4px"
        w="fit-content"
        onClick={() => router.push("/")}
        cursor="pointer"
      >
        <ArrowBackIcon />
        Back
      </Center>
      <Flex w="full" p="20px" bg="white" borderRadius="20px"></Flex>
    </Flex>
  );
};

export default Detail;
