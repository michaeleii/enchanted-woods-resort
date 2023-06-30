import styled from "styled-components";
import React from "react";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
const Label = styled.label`
  font-weight: 500;
`;

const ErrorMsg = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({
  label,
  error,
  children,
}: {
  label?: string;
  error?: string;
  children: React.ReactNode;
}) {
  if (!children) return null;
  return (
    <StyledFormRow>
      {label && (
        <Label htmlFor={(children as React.ReactElement).props.id}>
          {label}
        </Label>
      )}
      {children}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </StyledFormRow>
  );
}
export default FormRow;
