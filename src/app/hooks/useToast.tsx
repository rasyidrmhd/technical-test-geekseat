import React from "react";
import { useToast } from "@chakra-ui/react";

const useResponseToast = () => {
  const toast = useToast();

  const showToast = React.useCallback(
    (
      title: string,
      status: "warning" | "error" | "success" | "info" | "loading" | undefined,
      message?: string
    ) => {
      toast({
        position: "top",
        title: title,
        description: message,
        status: status,
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]
  );

  return {
    showToast,
  };
};

export default useResponseToast;
