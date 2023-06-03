// import react bootstrap components
import { Accordion, Card, Container } from 'react-bootstrap';
//import css
import '../css/AboutCalculator.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function AboutCalculator() {
  return (
    <Container className="mx-auto about-calculator">
      <Accordion className="accordion-items">
        <Accordion.Item eventKey="0">
          <Accordion.Header className="accordion-header">
            About this Calculator
          </Accordion.Header>
          <Accordion.Body>
            <Card>
              <Card.Body>
                This calculator allows you to compare the cost of attending different colleges and universities in the United States. Specifically, this tool provides information on the cost of attendance and the median salaries for students who earned Bachelor's degrees one and four years after graduation.
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header className="text-center">How to Use</Accordion.Header>
          <Accordion.Body>
            <Card>
              <Card.Body>
                To use this calculator, enter a college or university as well as a major you are interested in studying. Then, add your entry to the table to see how its cost of attendance and median salary compare to other school and major combinations.
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header className="text-center">Where Does the Data Come From?</Accordion.Header>
          <Accordion.Body>
            <Card>
              <Card.Body>
                The data provided by this tool comes from the College Scorecard, which offers comprehensive information about colleges and universities in the United States. To access the College Scorecard and learn more about the data used in this tool, please visit their website at <a href="https://collegescorecard.ed.gov/">https://collegescorecard.ed.gov/</a>.
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default AboutCalculator;
