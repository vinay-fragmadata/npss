import { Box, styled } from "@mui/material";
import { LOGOS } from "../../configs/imageContainer";
import { StyledHeaderBox } from "../../styledComponents/StyledSimpleHeader";
import "./style.css";

const ForgotPassword = () => {
  return (
    <>
      <StyledPaper className="login-page-container">
        <StyledHeaderBox>
          <img
            className="login-page-logo"
            src={LOGOS.mashreqLogo.image}
            alt={LOGOS.mashreqLogo.alt}
          />
        </StyledHeaderBox>
        <StyledContainer>
          <h2> Coming soon...</h2>
        </StyledContainer>
      </StyledPaper>
    </>
  );
};

export default ForgotPassword;

/**
 * Custom styling
 */
const StyledPaper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
}));
