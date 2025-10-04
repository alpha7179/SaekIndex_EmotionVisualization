//src/pages/AdminPage.jsx
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { surveyAPI } from '../services/api';
import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';
import SurveyEditForm from '../components/SurveyEditForm';

// 스타일 컴포넌트
const Container = styled.div` 
  padding: 2rem; 
  max-width: 1200px;
  margin: 0 auto;
`;
const Grid = styled.div` display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; @media (max-width: 992px) { grid-template-columns: 1fr; } `;
const Panel = styled.div` background: white; border-radius: 12px; padding: 1rem; `;
const Table = styled.table` width: 100%; border-collapse: collapse; font-size: 0.9rem; th, td { border-bottom: 1px solid #eee; padding: 0.75rem; text-align: left; vertical-align: top; } th { background: #fafafa; } tr:hover { background: #fafafa; } `;
const Actions = styled.div` display: flex; gap: 0.5rem; `;
const Button = styled.button` padding: 0.4rem 0.75rem; border: 1px solid #ddd; border-radius: 6px; background: white; cursor: pointer; &:hover { background: #f5f5f5; } &:disabled { cursor: not-allowed; opacity: 0.5; }`;
const Danger = styled(Button)` color: #ff4757; border-color: #ffb3ba; `;
// 답변 목록을 보기 좋게 만들기 위한 스타일 추가
const AnswerList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.85rem;
  li {
    margin-bottom: 0.25rem;
    white-space: pre-wrap;
    word-break: break-all;
  }
  strong {
    margin-right: 0.5rem;
    color: #555;
  }
`;

function AdminPage() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['surveys'],
    queryFn: surveyAPI.getSurveys,
  });

  const surveys = data?.data || [];

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => surveyAPI.updateSurvey(id, payload),
    onSuccess: () => {
      toast.success('수정 완료');
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => surveyAPI.deleteSurvey(id),
    onSuccess: () => {
      toast.info('삭제 완료');
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
      if (selected?._id) {
        setSelected(null);
      }
    },
  });

  const onSubmit = async (form) => {
    if (!selected) return;
    const question1 = typeof form.question1 === 'string'
      ? form.question1.split(',').map((s) => s.trim()).filter(Boolean)
      : [];
    const payload = {
      date: form.date,
      name: form.name?.trim(),
      age: Number(form.age),
      question1,
      question2: form.question2?.trim(),
      question3: form.question3?.trim(),
      question4: form.question4?.trim(),
    };
    await updateMutation.mutateAsync({ id: selected._id, payload });
  };
  
  const onDelete = async (row) => {
    if (!confirm(`[삭제] '${row.name}'님의 설문을 삭제할까요?`)) return;
    await deleteMutation.mutateAsync(row._id);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <Container>
      <PageHeader
        title="최종 데이터 관리"
        subtitle="승인된 최종 설문 데이터를 직접 수정하거나 삭제합니다."
      />
      <Grid>
        <Panel>
          <Table>
            <thead>
              <tr>
                <th>이름 (나이)</th>
                <th>제출일</th>
                {/* 테이블 헤더를 더 포괄적인 이름으로 변경합니다. */}
                <th>주요 설문 내용</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {surveys.map((s) => (
                <tr key={s._id}>
                  <td>{s.name} ({s.age}세)</td>
                  <td>{new Date(s.date).toLocaleDateString()}</td>
                  {/* 모든 설문 답변을 목록 형태로 보여주도록 수정합니다. */}
                  <td>
                    <AnswerList>
                      <li><strong>Q1:</strong> {Array.isArray(s.question1) ? s.question1.join(', ') : '-'}</li>
                      <li><strong>Q2:</strong> {s.question2 || '-'}</li>
                      <li><strong>Q3:</strong> {s.question3 || '-'}</li>
                      <li><strong>Q4:</strong> {(s.question4 || '-').substring(0, 40)}{s.question4 && s.question4.length > 40 ? '...' : ''}</li>
                    </AnswerList>
                  </td>
                  <td>
                    <Actions>
                      <Button onClick={() => setSelected(s)}>수정</Button>
                      <Danger onClick={() => onDelete(s)}>삭제</Danger>
                    </Actions>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Panel>

        <SurveyEditForm
          selectedSurvey={selected}
          onSubmit={onSubmit}
          onReset={() => setSelected(null)}
          isSubmitting={updateMutation.isPending}
        />
      </Grid>
    </Container>
  );
}

export default AdminPage;

