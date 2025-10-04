/* src/components/FormField.jsx */
import React from 'react';
import styled from '@emotion/styled';

const FormGroup = styled.div`
  margin-bottom: 2.5rem; 
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #555;
  margin-bottom: ${props => 
    (props.type === 'radio' || props.type === 'checkbox') ? '2.5rem' : '0.5rem'};
`;

const Input = styled.input`
  width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1rem;
`;
const Select = styled.select`
  width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1rem;
`;
const Textarea = styled.textarea`
  width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1rem; resize: vertical; min-height: 100px;
`;
const ErrorMessage = styled.span`
  color: #ff4757; font-size: 0.875rem; margin-top: 0.25rem; display: block;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 아이템(버튼, 텍스트)을 위아래 수직으로 쌓음 */
  align-items: center;   /* 수직으로 쌓인 아이템들을 가운데 정렬 */
  gap: 0.25rem;          /* 버튼과 텍스트 사이 간격 */
  flex: 1;               /* 각 선택지가 동일한 너비를 갖도록 함 */
`;

const RequiredMark = styled.span`
  color: red;
  margin-left: 0.25rem;
`;


const InputField = ({ type, name, register, options, ...rest }) => {
  switch (type) {
    case 'textarea':
      return <Textarea id={name} {...register(name)} {...rest} />;
    case 'select':
      return (
        <Select id={name} {...register(name)} {...rest}>
          {options.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </Select>
      );
    case 'radio':
      return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          {options.map(option => (
            <OptionWrapper key={option.value}>
              <input type="radio" value={option.value} {...register(name)} {...rest} />
              <span>{option.label}</span>
            </OptionWrapper>
          ))}
        </div>
      );
    case 'checkbox':
        return (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              {options.map(option => (
                <OptionWrapper key={option.value}>
                    <input type="checkbox" value={option.value} {...register(name)} {...rest} />
                    <span>{option.label}</span>
                </OptionWrapper>
              ))}
            </div>
        );
    default:
      return <Input id={name} type={type} {...register(name)} {...rest} />;
  }
};


const FormField = ({ label, name, type, register, errors, options, validation, ...rest }) => {
  return (
    <FormGroup>
      <Label htmlFor={name} type={type}>{label}{validation?.required && <RequiredMark>*</RequiredMark>}</Label>
      <InputField
        type={type}
        name={name}
        register={register}
        options={options}
        {...validation ? { ...register(name, validation) } : { ...register(name) }}
        {...rest}
      />
      {errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
    </FormGroup>
  );
};

export default FormField;