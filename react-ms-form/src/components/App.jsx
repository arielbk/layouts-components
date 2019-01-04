import React, { Component } from 'react';
import { Container, Header, ContentArea, Row, Footer } from './App.styled';
import { Button } from './Form.styled';
import FormGroup from './FormGroup';
import ProgressCircle from './ProgressCircle.styled';

export default class App extends Component {
  state = {
    steps: [
      { current: true },
      {},
      {}
    ]
  }

  render() {
    const { steps } = this.state;
    return (
      <Container>
        <Header>Add a New Habit</Header>
        <ContentArea>
          <Row>
            <FormGroup
              title="Habit Name"
              name="name"
              placeholder="E.g. Running, Workout, Drink water, Floss..."
              size={2}
              required
            />
            <FormGroup
              title="Tags"
              name="tags"
              placeholder="E.g. Work, Exercise, Diet..."
              size={2}
            />
          </Row>
          <FormGroup
              title="Description"
              name="description"
              type="textarea"
              placeholder="Add any details about the habit here..."
              size={4}
            />
        </ContentArea>
        <Footer>
          <div style={{ width: '270px' }}></div>
          <div>
            {steps.map((step, index) =>
              <ProgressCircle
                key={index}
                step={step}
              />
            )}
          </div>
          <div style={{ width: '270px' }}>
            <Button secondary>Skip</Button>
            <Button>Next</Button>
          </div>
        </Footer>
      </Container>
    )
  }
}

