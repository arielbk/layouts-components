import React, { Component } from 'react';
import { Container, Header, ContentArea, Row, Footer } from './App.styled';
import { Button } from './Form.styled';
import FormGroup from './FormGroup';
import ProgressCircle from './ProgressCircle.styled';

export default class App extends Component {
  state = {
    steps: [
      {
        current: true,
        contains: ['name', 'tags', 'description']
      },
      {
        current: false,
        contains: ['times', 'period', 'reminderEvery', 'reminderTypes']
      },
      {
        current: false,
        contains: ['difficulty', 'habitType']
      }
    ],
    name: {
      value: '',
    },
    tags: {
      value: '',
    },
    description: {
      value: '',
    },
    times: {
      value: '',
    },
    period: {
      value: '',
    },
    reminderEvery: {
      value: ''
    },
    reminderTypes: [],
    difficulty: {
      value: '',
    },
    habitType: {
      value: '',
    }
  }

  handleChange = ({target}) => {
    const { name, value } = target;
    this.setState({ [name]: { value: value } })
  }

  handleStepChange = (newStepIndex) => {
    const steps = [...this.state.steps];
    steps.forEach(step => step.current = false);
    steps[newStepIndex].current = true;
    this.setState({ steps });
  }

  handleSubmit = () => {
    if (!this.state.name.value) {
      this.handleStepChange(0);
      return alert('Name field is required!');
    }
    alert('Form submitted! [Do something with state now...]')
  }

  render() {
    const {
      steps,
      name, tags, description, times, period, reminderEvery, reminderTypes, difficulty, habitType
    } = this.state;

    let stepIndex;
    steps.forEach(step => { if (step.current) stepIndex = steps.indexOf(step) });

    let formContent;

    switch (stepIndex) {
      case (0):
        formContent = (
          <ContentArea>
            <Row>
              <FormGroup
                title="Habit Name"
                name="name"
                value={name.value}
                onChange={this.handleChange}
                placeholder="E.g. Running, Workout, Drink water, Floss..."
                size={2}
                required
              />
              <FormGroup
                title="Tags"
                name="tags"
                value={tags.value}
                onChange={this.handleChange}
                placeholder="E.g. Work, Exercise, Diet..."
                size={2}
              />
            </Row>
            <FormGroup
              title="Description"
              name="description"
              value={description.value}
              onChange={this.handleChange}
              type="textarea"
              placeholder="Add any details about the habit here..."
              size={4}
            />
          </ContentArea>
        );
        break;
      case (1):
        formContent = (
          <ContentArea>
            <Row>
              <FormGroup
                title="How often do you want to complete this habit?"
                name="times"
                value={times.value}
                onChange={this.handleChange}
                placeholder="Once, Twice..."
                size={2}
              />
              <FormGroup
                title="every"
                name="period"
                value={period.value}
                onChange={this.handleChange}
                placeholder="Daily, Weekly, Monthly, Yearly..."
                size={2}
              />
            </Row>
            <Row>
              <FormGroup
                title="How often would you like to be reminded?"
                name="reminderEvery"
                value={reminderEvery.value}
                onChange={this.handleChange}
                placeholder="Daily, Weekly, Monthly..."
                size={2}
              />
              <FormGroup
                title="How would you like to be reminded?"
                name="reminderTypes"
                value={reminderTypes.value}
                onChange={this.handleChange}
                placeholder="Email, Push, In-App..."
                size={2}
              />
            </Row>
          </ContentArea>
        );
        break;
      case (2):
      formContent = (
        <ContentArea>
          <Row>
            <FormGroup
              title="Difficulty"
              name="difficulty"
              value={difficulty.value}
              onChange={this.handleChange}
              placeholder="Trivial, Easy, Medium, Hard, Epic..."
              size={2}
            />
            <FormGroup
              title="Habit Type"
              name="habitType"
              value={habitType.value}
              onChange={this.handleChange}
              placeholder="Active, Passive..."
              size={2}
            />
          </Row>
        </ContentArea>
      );
      break;
      default:
        formContent = (
          <ContentArea>No form content to show!</ContentArea>
        )
    }

    // logic for which left buttons to show
    let leftButtons;
    if (stepIndex > 0) leftButtons = (<Button onClick={() => this.handleStepChange(stepIndex - 1)}>Back</Button>);

    // logic for which right buttons to show
    let rightButtons;
    if (stepIndex < steps.length - 1) {
      rightButtons = (
        <div style={{ width: '270px' }}>
          <Button secondary onClick={this.handleSubmit}>Skip</Button>
          <Button onClick={() => this.handleStepChange(stepIndex + 1)}>Next</Button>
        </div>
      )
    } else if (stepIndex === steps.length -1) {
      rightButtons = (
        <div style={{ width: '270px', justifyContent: 'flex-end' }}>
          <Button onClick={this.handleSubmit}>Done</Button>
        </div>
      )
    }

    return (
      <Container>
        <Header>Add a New Habit</Header>
        {formContent}
        <Footer>
          <div style={{ width: '270px' }}>
            {leftButtons}
          </div>
          <div>
            {steps.map((step, index) =>
              <ProgressCircle
                key={index}
                step={step}
                onClick={() => this.handleStepChange(index)}
              />
            )}
          </div>
          {rightButtons}
        </Footer>
      </Container>
    )
  }
}

