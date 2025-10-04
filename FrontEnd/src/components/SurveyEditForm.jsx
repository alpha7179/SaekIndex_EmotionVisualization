//src/components/SurveyEditForm.jsx
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// 1. SurveyForm과 동일한 의존성을 가져옵니다.
import FormField from './FormField';
import surveyKO from '../data/survey.ko.json';
import surveyEN from '../data/survey.en.json';

// 스타일 컴포넌트
const Panel = styled.div` background: white; border-radius: 12px; padding: 1rem; `;
const Actions = styled.div` display: flex; gap: 0.5rem; `;
const Button = styled.button` padding: 0.4rem 0.75rem; border: 1px solid #ddd; border-radius: 6px; background: white; cursor: pointer; &:hover { background: #f5f5f5; } &:disabled { cursor: not-allowed; opacity: 0.5; }`;

const surveys = {
  ko: surveyKO,
  en: surveyEN,
};

function SurveyEditForm({ selectedSurvey, onSubmit, onReset, isSubmitting }) {
  const { i18n } = useTranslation();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const surveyData = surveys[i18n.language] || surveys.ko;


  useEffect(() => {
    if (selectedSurvey) {

      surveyData.forEach(field => {
        let value = selectedSurvey[field.name] || '';
        if (field.name === 'date' && value) {
          value = new Date(value).toISOString().split('T')[0];
        } else if (Array.isArray(value)) {
          value = value.join(', ');
        }
        setValue(field.name, value);
      });
    } else {
      reset();
    }
  }, [selectedSurvey, setValue, reset, surveyData]);

  return (
    <Panel>
      <h3>{selectedSurvey ? `수정: ${selectedSurvey.name}님의 설문` : '수정할 설문 선택'}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {}
        {surveyData.map((field) => {
          const validation = field.validation?.required 
            ? { required: field.validation.required } 
            : {};

          return (
            <FormField
              key={field.name}
              type={field.type}
              name={field.name}
              label={field.label}
              register={register}
              errors={errors}
              options={field.options}
              validation={validation}
              readOnly={field.readOnly}
              min={field.min}
              max={field.max}
              placeholder={field.placeholder}
            />
          );
        })}
        <Actions>
          <Button type="submit" disabled={isSubmitting || !selectedSurvey}>수정하기</Button>
          <Button type="button" onClick={onReset}>폼 초기화</Button>
        </Actions>
      </form>
    </Panel>
  );
}

export default SurveyEditForm;