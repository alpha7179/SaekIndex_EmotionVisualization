/* src/components/SurveyForm.jsx */
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import FormField from './FormField';
import { useTranslation } from 'react-i18next';

// 1. 두 언어의 설문 파일을 모두 import 합니다.
import surveyKO from '../data/survey.ko.json';
import surveyEN from '../data/survey.en.json';

const FormContainer = styled.div`
  background: white; padding: 2rem; border-radius: 12px; max-width: 600px; margin: 0 auto;
`;
const SubmitButton = styled.button`
  width: 100%; padding: 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer;
`;

// 2. 언어별 설문 데이터를 담을 객체를 만듭니다.
const surveys = {
  ko: surveyKO,
  en: surveyEN,
};

function SurveyForm() {
  const { t, i18n } = useTranslation();
  const today = new Date().toISOString().split('T')[0];
  
  // 3. 현재 언어(i18n.language)에 맞는 설문 데이터를 선택합니다. (기본값은 'ko')
  const surveyData = surveys[i18n.language] || surveys.ko;

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { date: today, age: 25, question3: '' }
  });

  const ageValue = watch('age');

  const onSubmit = async (data) => {
    // ...
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)} name="survey-submit">
        <input type="hidden" name="form-name" value="survey-submit" />

        {surveyData.map((field) => {
          // 4. 이제 t() 함수로 감쌀 필요 없이, JSON 파일의 텍스트를 그대로 사용합니다.
          const label = field.name === 'age' 
            ? `${field.label}: ${ageValue}` 
            : field.label;
          
          const validation = field.validation?.required 
            ? { required: field.validation.required } 
            : {};
          
          return (
            <FormField
              key={field.name}
              type={field.type}
              name={field.name}
              label={label}
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

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('AnalyzePage.submitload') : t('AnalyzePage.submit')}
        </SubmitButton>
      </form>
    </FormContainer>
  );
}

export default SurveyForm;