/* src/pages/AnalyzePage.jsx */
import React from 'react';
import styled from '@emotion/styled';
import SurveyForm from '../components/SurveyForm';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader'; // PageHeader import

// 페이지 전체를 감싸는 컨테이너 추가
const PageContainer = styled.div`
  padding: 3rem 1rem;
`;

function AnalyzePage() {
  const { t } = useTranslation();
  return (
    <PageContainer>
      <PageHeader
        icon="📋"
        title={t('AnalyzePage.title')} 
        subtitle={t('AnalyzePage.subtitle')}
        />
      <SurveyForm />
    </PageContainer>
  );
}

export default AnalyzePage;