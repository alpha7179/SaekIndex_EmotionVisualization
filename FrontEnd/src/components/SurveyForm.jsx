/* src/components/SurveyForm.jsx */
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import FormField from './FormField';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import surveyKO from '../data/survey.ko.json';
import surveyEN from '../data/survey.en.json';

const FormContainer = styled.div`
  background: white; padding: 2rem; border-radius: 12px; max-width: 600px; margin: 0 auto;
`;
const SubmitButton = styled.button`
  width: 100%; padding: 1rem; background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%); color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer;
`;

const surveys = {
  ko: surveyKO,
  en: surveyEN,
};

function SurveyForm() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  
  const surveyData = surveys[i18n.language] || surveys.ko;

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { date: today, age: 25, question3: '' }
  });

  const ageValue = watch('age');

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/.netlify/functions/submit-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      const result = await response.json();
      console.log('Success:', result);
      toast.success(t('AnalyzePage.success'));

      setTimeout(() => {
        navigate('/'); 
      }, 1000);

    } catch (error) {
      console.error('Error submitting survey:', error);
      toast.error(t('AnalyzePage.error'));
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)} name="survey-submit">
        <input type="hidden" name="form-name" value="survey-submit" />

        {surveyData.map((field) => {

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