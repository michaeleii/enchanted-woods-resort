import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  border-radius: 999999px;
`;

const LogoText = styled.p`
  font-family: "Raleway", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-green-700);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-shadow: 1px 1px var(--color-grey-100);
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo.webp" alt="Logo" />
      <LogoText>Enchanted Woods Resort</LogoText>
    </StyledLogo>
  );
}

export default Logo;
