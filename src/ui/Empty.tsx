interface EmptyProps {
  resourceName?: string;
  fieldName?: string;
}

function Empty({ resourceName, fieldName }: EmptyProps) {
  return <p>No {resourceName ?? fieldName} could be found.</p>;
}

export default Empty;