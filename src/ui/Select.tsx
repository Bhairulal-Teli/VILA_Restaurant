import styled from "styled-components";

const StyledSelect = styled.select<{ type?: string }>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid ${(props) => props.type === "white" ? "var(--color-grey-100)" : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-200);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface SelectOption { value: string; label: string; }
interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  [key: string]: any;
}

function Select({ options, value, onChange, ...props }: SelectProps) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      <option value="default">Sort (Default)</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </StyledSelect>
  );
}

export default Select;