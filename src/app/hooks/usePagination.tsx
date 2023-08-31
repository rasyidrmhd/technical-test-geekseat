import { Button, Center, Flex, Text } from "@chakra-ui/react";
import { first, last } from "lodash";
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const DOTS = "...";

const usePagination = ({
  totalCount = 0,
  currentCount = 0,
  siblingCount = 1,
}: {
  totalCount: number;
  currentCount: number;
  siblingCount?: number;
}) => {
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const range = React.useCallback((start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  }, []);

  const paginationRange = React.useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage, range]);

  const renderPageNumber = React.useMemo(
    () => (
      <Flex
        gap="20px"
        alignItems="center"
        w="full"
        justifyContent="space-between"
        flexDir={{ base: "column", md: "row" }}
      >
        <Text>
          Showing {currentCount} data from {totalCount} data
        </Text>
        <Flex gap="20px">
          <Center
            w="32px"
            h="32px"
            p="0"
            size="sm"
            as={Button}
            bg="white"
            variant="outline"
            isDisabled={currentPage === first(paginationRange)}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeftIcon boxSize="18px" />
          </Center>

          <Flex gap="5px">
            {paginationRange?.map((page, idx) => {
              if (page === DOTS) {
                return (
                  <Flex alignSelf="flex-end" mx="2px" key={idx}>
                    &#8230;
                  </Flex>
                );
              }

              return (
                <Center
                  w="32px"
                  h="32px"
                  as={Button}
                  variant={page === currentPage ? "solid" : "outline"}
                  p="0"
                  size="sm"
                  bg={page === currentPage ? "" : "white"}
                  colorScheme={page === currentPage ? "blue" : "gray"}
                  onClick={() => setCurrentPage(Number(page))}
                  key={idx}
                >
                  {page}
                </Center>
              );
            })}
          </Flex>

          <Center
            w="32px"
            h="32px"
            p="0"
            size="sm"
            as={Button}
            bg="white"
            variant="outline"
            isDisabled={currentPage === last(paginationRange)}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRightIcon boxSize="18px" />
          </Center>
        </Flex>
      </Flex>
    ),
    [
      currentCount,
      totalCount,
      pageSize,
      paginationRange,
      currentPage,
      setCurrentPage,
    ]
  );

  return {
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    renderPageNumber,
  };
};

export default usePagination;
