import { useSearchParams } from "react-router-dom";
import Select from "./Select";

interface SortByOption { value: string; label: string; }

function SortBy({ options }: { options: SortByOption[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByValue = searchParams.get("sortBy") ?? "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return <Select value={sortByValue} options={options} type="white" onChange={handleChange} />;
}

export default SortBy;