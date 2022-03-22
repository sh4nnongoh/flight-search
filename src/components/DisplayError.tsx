import React, {
  FC, ReactElement
} from "react";
import { Container, Heading } from "react-bulma-components";
const DisplayError: FC = (): ReactElement => (
  <Container display="flex" justifyContent="center">
    <Heading subtitle style={{ padding: "2rem" }}>
      The application is currently experiencing some issues. Please check back later.
    </Heading>
  </Container>
);
export default DisplayError;
