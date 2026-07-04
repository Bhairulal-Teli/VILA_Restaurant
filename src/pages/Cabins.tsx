import styled from "styled-components";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Cabins() {
  return (
    <Container>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </Container>
  );
}

export default Cabins;