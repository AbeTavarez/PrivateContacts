import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";

import { Col, Container, Row } from "react-bootstrap";
const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <ContactForm />
        </Col>
        <Col>
          <Contacts />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
