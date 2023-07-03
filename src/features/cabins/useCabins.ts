import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useCabins() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";

  let filter:
    | { discount: string; field: string; method?: "gte" | "lte" }
    | undefined;
  if (filterValue === "all") filter = undefined;

  if (filterValue === "with-discount") {
    filter = {
      discount: "1",
      field: "discount",
      method: "gte",
    };
  }
  if (filterValue === "no-discount") {
    filter = {
      discount: "0",
      field: "discount",
      method: "lte",
    };
  }

  const sortByRaw = searchParams.get("sortBy") || "name-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const page = Number(searchParams.get("page")) || 1;

  const {
    data: { data: cabins, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins", filter, sortBy, page],
    queryFn: () => getCabins({ filter, sortBy, page }),
  });
  const pageCount = count ? Math.ceil(count / PAGE_SIZE) : 1;
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["cabins", filter, sortBy, page + 1],
      queryFn: () => getCabins({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["cabins", filter, sortBy, page - 1],
      queryFn: () => getCabins({ filter, sortBy, page: page - 1 }),
    });
  return { cabins, count, isLoading, error };
}

export { useCabins };
