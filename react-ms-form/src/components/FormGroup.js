import React from 'react';
import PropTypes from 'prop-types';
import { StyledFormGroup, Input, Label, Textarea } from './Form.styled';

const FormGroup = props => {
  const { title, name, value, onChange, type, placeholder, size, required } = props;
  const width =
    size < 4
      ? size * 25 - 2 + '%'
      : size * 25 + '%';
  return (
    <StyledFormGroup width={width}>
      <Label htmlFor={name}>
        {title} {required && <span style={{ color: '#d20f0f'}}>*</span>}
      </Label>
      {type === 'textarea'
        ? <Textarea value={value} name={name} onChange={onChange} placeholder={placeholder} />
        : <Input value={value} name={name} onChange={onChange} type={type} placeholder={placeholder} />}    
    </StyledFormGroup>
  )
}

FormGroup.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  // can be 1, 2 or 4 'quarters'
  size: PropTypes.number,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
}

FormGroup.defaultProps = {
  type: 'text',
  size: 4,
  required: false,
  disabled: false,
}

export default FormGroup;