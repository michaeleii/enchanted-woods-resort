import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  if (!cabins) return <Empty resource="cabins" />;
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins: {
    created_at: string | null;
    description: string | null;
    discount: number | null;
    id: number;
    image: string | null;
    max_capacity: number | null;
    name: string | null;
    regular_price: number | null;
    [field: string]: string | number | null;
  }[];
  switch (filterValue) {
    case "all":
      filteredCabins = cabins || [];
      break;
    case "no-discount":
      filteredCabins = cabins?.filter((cabin) => cabin.discount === 0) || [];
      break;
    case "with-discount":
      filteredCabins = cabins?.filter((cabin) => cabin.discount !== 0) || [];
      break;
    default:
      filteredCabins = cabins || [];
      break;
  }

  const sortedValue = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortedValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
export default CabinTable;
