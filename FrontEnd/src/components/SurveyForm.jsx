/* src/components/SurveyForm.jsx */
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import FormField from './FormField';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  
  // 3. 현재 언어(i18n.language)에 맞는 설문 데이터를 선택합니다. (기본값은 'ko')
  const surveyData = surveys[i18n.language] || surveys.ko;

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { date: today, age: 25, question3: '' }
  });

  const ageValue = watch('age');

  const onSubmit = async (data) => {
    try {
      // 1. 우리 서버(Netlify Function)의 주소로 데이터를 보냅니다.
      // Netlify는 자동으로 /api/파일이름 과 같은 주소를 만들어줍니다.
      const response = await fetch('/.netlify/functions/submit-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // 2. 데이터를 JSON 문자열로 변환하여 보냅니다.
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      const result = await response.json();
      console.log('Success:', result);
      toast.success('설문이 성공적으로 제출되었습니다!');

      setTimeout(() => {
        navigate('/'); 
      }, 1000); // 1000ms = 1초

    } catch (error) {
      console.error('Error submitting survey:', error);
      toast.error('제출 중 오류가 발생했습니다.');
    }
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