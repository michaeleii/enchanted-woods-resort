import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
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
  margin-top: 1rem;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo.webp" alt="Logo" />
      <LogoText>
        Enchanted Woods <br />
        Resort
      </LogoText>
    </StyledLogo>
  );
}

export default Logo;
