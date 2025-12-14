import { useSearchParams } from "react-router-dom";
import Select from "./Select.jsx";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByValue = searchParams.get('sortBy');

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return <Select value={sortByValue} options={options} type="white" onChange={handleChange} />;
}

export default SortBy;
