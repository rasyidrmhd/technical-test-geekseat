import React from "react";
import { ListItem, Skeleton, Text, UnorderedList } from "@chakra-ui/react";
import usePromiseAll from "hooks/usePromiseAll";

const ColumnFetcher: React.FC<{ resource: string; endpoints: string[] }> = ({
  resource,
  endpoints,
}) => {
  const [data, setData] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const baseUrlRemover = endpoints.map((endpoint) =>
      endpoint.replaceAll(`${process.env.NEXT_PUBLIC_BASE_URL}`, "")
    );
    const getAll = async () => {
      try {
        setIsLoading(true);
        const resp = await usePromiseAll(resource, baseUrlRemover);
        setData(resp as string[]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getAll();
  }, [endpoints, setIsLoading]);

  if (endpoints.length === 0) {
    return;
  }

  if (isLoading) {
    return <Skeleton w="full" height="20px" />;
  }

  return (
    <UnorderedList>
      {data.map((e) => (
        <ListItem>{e}</ListItem>
      ))}
    </UnorderedList>
  );
};

export default ColumnFetcher;
