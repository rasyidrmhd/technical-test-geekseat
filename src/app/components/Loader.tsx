import React from "react";
import { Center, ResponsiveValue, Spinner, Text } from "@chakra-ui/react";

interface LoaderProps {
  size:
    | ResponsiveValue<(string & {}) | "sm" | "md" | "lg" | "xl" | "xs">
    | undefined;
}

const Loader: React.FC<LoaderProps> = ({ size }) => {
  return (
    <Center flexDir="column" gap="10px">
      <Spinner
        color="blue.500"
        thickness="4px"
        speed="0.65s"
        size={size}
        emptyColor="gray"
      />
      <Text>Loading data</Text>
    </Center>
  );
};

export default Loader;
