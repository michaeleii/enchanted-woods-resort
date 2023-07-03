import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

function useCabins() {
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

  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabin", filter, sortBy],
    queryFn: () => getCabins({ filter, sortBy }),
  });

  return { cabins, isLoading };
}

export { useCabins };
