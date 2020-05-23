import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import './FailureDisplay.scss';
import { put, failureState } from '../../../../data/api';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UserContext } from '../../../../data/auth/UserContext';
import Dropdown from 'react-bootstrap/Dropdown';

function LastElement(props) {
  function changeUpvote(e) {
    e.preventDefault();
    let hasUpvote = false;
    props.upvoters.map((upvoter) =>
      props.id === upvoter.id ? (hasUpvote = true) : (hasUpvote = false)
    );
    if (!hasUpvote) {
      put('/failures/upvote?failureId=' + props.failureid, '');
    } else {
      put('/failures/upvote/remove?failureId=' + props.failureid, '');
    }
  }
  function changeState(e) {
    put('/failures/state?failureId=' + props.failureid + '&newState=' + e, '').then(
      (result) => {
        //console.log(result.payload);
        let newFailure = props.failures;
        //console.log(newFailure);
        newFailure[props.failureid - 1] = result.payload;
        //console.log(newFailure);
        props.setFailures(newFailure);
        //console.log(props.currentFailure);
        //console.log(props.failures);
      }
    );
  }

  return props.role === 'STUDENT' || props.role === 'TEACHER' ? (
    <Button onClick={changeUpvote}>
      <i className='fas fa-thumbs-up'></i>
    </Button>
  ) : (
    <Dropdown onSelect={changeState}>
      <Dropdown.Toggle id='dropdown-basic'>Résoudre</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey='ONGOING'>{failureState.ONGOING}</Dropdown.Item>
        <Dropdown.Item eventKey='CLOSED'>{failureState.CLOSED}</Dropdown.Item>
        <Dropdown.Item eventKey='UN_RESOLVED'>
          {failureState.UN_RESOLVED}
        </Dropdown.Item>
        <Dropdown.Item eventKey='USELESS'>{failureState.USELESS}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

function FailureStateDisplay(props) {
  switch (props.state) {
    case 'UN_RESOLVED':
      return (
        <div className='unresolved'>
          <i className='fas fa-exclamation-triangle'></i> {failureState.UN_RESOLVED}
        </div>
      );
    case 'ONGOING':
      return (
        <div className='ongoing'>
          <i className='fas fa-tools'></i> {failureState.ONGOING}
        </div>
      );
    case 'CLOSED':
      return (
        <div className='closed'>
          <i className='fas fa-hard-hat'></i> {failureState.CLOSED}
        </div>
      );
    case 'USELESS':
      return (
        <div className='useless'>
          <i className='fas fa-frown-open'></i> {failureState.USELESS}
        </div>
      );
  }
}

export function FailureDisplay(props) {
  const { state } = useContext(UserContext);
  let currentTime = new Date(props.date);
  return (
    <div>
      <Accordion defaultActiveKey='1'>
        <Card>
          <Card.Header>
            <Container>
              <Row>
                <Col>
                  <Row>
                    <strong>Appareil :</strong>
                  </Row>
                  <Row>{props.device}</Row>
                </Col>
                <Col>
                  <Row>
                    <strong>Type de panne :</strong>
                  </Row>
                  <Row>{props.type}</Row>
                </Col>
                <Col>
                  <Row>
                    <strong>Date :</strong>
                  </Row>
                  <Row>{currentTime.toLocaleDateString()} </Row>
                </Col>
                <Col md='auto'>
                  <Row>
                    <strong>Etat : </strong>
                  </Row>
                  <Row>
                    <FailureStateDisplay state={props.state} />
                  </Row>
                </Col>
                <Col>
                  <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                    Description
                  </Accordion.Toggle>
                </Col>
                <Col>
                  <LastElement
                    role={state.role}
                    id={state.id}
                    failureid={props.id}
                    upvoters={props.upvoters}
                    setFailures={props.setFailures}
                    currentFailure={props.currentFailure}
                    failures={props.failures}
                  />
                  + {props.upvoters && props.upvoters.length}
                </Col>
              </Row>
            </Container>
          </Card.Header>
          <Accordion.Collapse eventKey='0'>
            <Card.Body>{props.description}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <br />
    </div>
  );
}
