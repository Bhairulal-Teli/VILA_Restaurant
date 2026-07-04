import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import AddCabin from "./AddCabin";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";

  if (isLoading) return <Spinner />;

  let filteredCabins = cabins ?? [];
  if (filterValue === "no-discount") filteredCabins = filteredCabins.filter((c: any) => c.discount === 0);
  if (filterValue === "with-discount") filteredCabins = filteredCabins.filter((c: any) => c.discount > 0);

  const sortByValue = searchParams.get("sortBy") || "default";
  let sortedCabins = filteredCabins;
  if (sortByValue !== "default") {
    const [field, direction] = sortByValue.split("-");
    const modifier = direction === "asc" ? 1 : -1;
    sortedCabins = [...filteredCabins].sort((a: any, b: any) => (a[field] - b[field]) * modifier);
  }

  if (!cabins?.length) return <Empty resourceName="Cabins" />;

  return (
    <>
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
            render={(cabin: any) => <CabinRow cabin={cabin} key={cabin.id} />}
          />
        </Table>
      </Menus>
      <AddCabin />
    </>
  );
}

export default CabinTable;