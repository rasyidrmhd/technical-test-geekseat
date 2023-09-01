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
import useResponseToast from "hooks/useToast";
import { AxiosError, AxiosResponse } from "axios";

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
  }, [error]);

  // console.log(data);
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
      <Flex w="full" p="20px" bg="white" borderRadius="20px"></Flex>
    </Flex>
  );
};

export default Detail;
