import React, { useEffect, useState } from 'react';
import { FailureDisplay } from './failureSection/FailureDisplay';
import './RoomPage.scss';
import { SubTitle, Title } from '../../common/text/Basics';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { get } from '../../../data/api';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FailureTypeManagement } from './failureTypeSection/FailureTypeManagement';

export function RoomPage() {
  let { id } = useParams();
  const [room, setRoom] = useState({});
  const [failures, setFailures_] = useState([]);
  const setFailures = (failures) => {
    console.log(failures, 'in setFailures');
    return setFailures_(failures);
  };
  const [building, setBuilding] = useState([]);

  useEffect(() => {
    get('/rooms/' + id).then((result) => {
      setRoom(result.payload);
      setFailures(result.payload.failures);
      setBuilding(result.payload.building);
    });
  }, []);

  console.log(failures, 'failures');
  return (
    <div>
      <Title> {room.number} </Title>
      <SubTitle> Batiment : {building.name}</SubTitle>
      <Container className='room-wrapper'>
        <Row>
          <Col>
            {failures.map((failure) => (
              <FailureDisplay
                id={failure.id}
                type={failure.title}
                device={failure.deviceCategory}
                date={failure.createdAt}
                description={failure.description}
                state={failure.state}
                upvoters={failure.upvoters}
                setFailures={setFailures}
                currentFailure={failure}
                failures={failures}
              />
            ))}
          </Col>
        </Row>
      </Container>
      <SubTitle>Gestion de la salle</SubTitle>
      <Container>
        <FailureTypeManagement roomId={id} />
      </Container>
    </div>
  );
}
