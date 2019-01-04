import styled from 'styled-components';

const ProgressCircle = styled.div`
  ${props => props.step.current
  ? 'background: #757575;'
  : 'background: #e8e8e8;'}
  display: inline-block;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin: 0 0.3rem;
`;

ProgressCircle.defaultProps = {
  current: false
}

export default ProgressCircle;
