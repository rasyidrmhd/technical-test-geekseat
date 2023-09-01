import React from "react";
import { Skeleton, Text } from "@chakra-ui/react";
import usePromiseAll from "hooks/usePromiseAll";

const ColumnFetcher: React.FC<{ resource: string; endpoints: string[] }> = ({
  resource,
  endpoints,
}) => {
  const [data, setData] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  if (isLoading) {
    return <Skeleton w="full" height="20px" />;
  }

  React.useEffect(() => {
    const baseUrlRemover = endpoints.map((endpoint) =>
      endpoint.replaceAll(`${process.env.NEXT_PUBLIC_BASE_URL}`, "")
    );
    const getAll = async () => {
      try {
        setIsLoading(true);
        const resp = await usePromiseAll(resource, baseUrlRemover);
        // setData(resp);
      } catch (error) {}
    };
    getAll();
  }, [endpoints, setIsLoading]);

  return <Text>Films</Text>;
};

export default ColumnFetcher;
