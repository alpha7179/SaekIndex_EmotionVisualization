/* src/components/SurveyForm.jsx */
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import FormField from './FormField';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
// 1. 필요한 모듈들을 가져옵니다.
import { useMutation } from '@tanstack/react-query';
import { submissionAPI } from '../services/api'; // 중앙 API 관리 파일

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

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    defaultValues: { date: today, age: 25, question3: '' }
  });

  const ageValue = watch('age');

  // 2. useMutation으로 데이터 제출 로직을 정의합니다.
  const mutation = useMutation({
    mutationFn: (newSubmissionData) => submissionAPI.createSubmission(newSubmissionData),
    onSuccess: () => {
      toast.success(t('AnalyzePage.success'));
      reset(); // 성공 시 폼 초기화
      setTimeout(() => {
        navigate('/'); // 1초 후 홈으로 이동
      }, 1000);
    },
    onError: (error) => {
      console.error('Error submitting survey:', error);
      toast.error(t('AnalyzePage.error'));
    }
  });

  // 3. onSubmit 함수를 매우 간단하게 변경합니다.
  //   react-hook-form이 data를 전달해주면, mutation을 실행시키기만 하면 됩니다.
  const onSubmit = (data) => {
    // age 값을 숫자로 변환
    const submissionData = { ...data, age: Number(data.age) };
    mutation.mutate(submissionData);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)} name="survey-submit">
        {/* ... (폼 필드 부분은 변경 없음) ... */}
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

        {/* 4. isSubmitting 대신 mutation.isPending을 사용하여 로딩 상태를 관리합니다. */}
        <SubmitButton type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? t('AnalyzePage.submitload') : t('AnalyzePage.submit')}
        </SubmitButton>
      </form>
    </FormContainer>
  );
}

export default SurveyForm;
