import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }: { options: { value: string; label: string }[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sortBy") || "";
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      value={currentSort}
      options={options}
      type="white"
      onChange={handleChange}
    />
  );
}
export default SortBy;
