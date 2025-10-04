import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { submissionAPI } from '../services/api';
import { toast } from 'react-toastify';
import PageHeader from '../components/PageHeader';

const Container = styled.div` 
  padding: 2rem; 
  max-width: 1200px;
  margin: 0 auto;
`;

const Controls = styled.div` display: flex; gap: 0.5rem; margin-bottom: 1rem; `;
const FilterButton = styled.button` 
  padding: 0.4rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: ${props => (props.$active ? '#667eea' : 'white')};
  color: ${props => (props.$active ? 'white' : '#333')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${props => (props.$active ? '#5a67d8' : '#f5f5f5')};
  }
`;
const Table = styled.table` 
  width: 100%; 
  border-collapse: collapse; 
  font-size: 0.95rem; 
  th, td { border-bottom: 1px solid #eee; padding: 0.75rem; text-align: left; vertical-align: top; } 
  th { background: #fafafa; } 
  tr:hover { background: #f9f9f9; } 
`;
const Actions = styled.div` display: flex; gap: 0.5rem; `;
const Button = styled.button` 
  padding: 0.4rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover { background: #f5f5f5; }
  &:disabled { cursor: not-allowed; opacity: 0.5; }
`;
const Danger = styled(Button)` 
  color: #ff4757;
  border-color: #ffb3ba;
  &:hover { background: #ffebee; }
`;

function SubmissionsPage() {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState('pending');

  const { data, isLoading, error } = useQuery({
    queryKey: ['submissions', status],
    queryFn: () => submissionAPI.listSubmissions(status === 'all' ? undefined : status),
  });

  const items = data?.data || [];

  const approveMutation = useMutation({
    mutationFn: (id) => submissionAPI.approveSubmission(id),
    onSuccess: () => {
      toast.success('설문을 승인하여 최종 데이터에 등록했습니다.');
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      queryClient.invalidateQueries({ queryKey: ['surveys'] });
    }
  });
  
  const rejectMutation = useMutation({
    mutationFn: (id) => submissionAPI.rejectSubmission(id),
    onSuccess: () => {
      toast.info('설문을 거절했습니다.');
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: (id) => submissionAPI.deleteSubmission(id),
    onSuccess: () => {
      toast.info('설문을 삭제했습니다.');
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    }
  });

  const statuses = useMemo(() => [
    { key: 'pending', label: '대기' }, { key: 'approved', label: '승인' },
    { key: 'rejected', label: '거절' }, { key: 'all', label: '전체' },
  ], []);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <Container>
      {}
      <PageHeader
        icon="📨"
        title="설문 관리"
        subtitle="사용자가 제출한 설문을 검토하고 승인 또는 거절합니다."
      />

      <Controls>
        {statuses.map(s => (
          <FilterButton key={s.key} $active={status === s.key} onClick={() => setStatus(s.key)}>
            {s.label}
          </FilterButton>
        ))}
      </Controls>
      <Table>
        <thead>
          <tr>
            <th>제출자 정보</th>
            <th>설문 내용</th>
            <th>상태/액션</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it._id}>
              <td>
                <div><strong>{it.name}</strong> ({it.age}세)</div>
                <div>{new Date(it.date).toLocaleDateString()}</div>
              </td>
              <td>
                <div><strong>Q1:</strong> {it.question1?.join(', ')}</div>
                <div><strong>Q2:</strong> {it.question2}</div>
                <div><strong>Q3:</strong> {it.question3}</div>
                <div><strong>Q4:</strong> {it.question4}</div>
              </td>
              <td>
                <div style={{ marginBottom: '0.5rem' }}>상태: {it.status}</div>
                <Actions>
                  <Button onClick={() => approveMutation.mutate(it._id)} disabled={it.status !== 'pending'}>승인</Button>
                  <Button onClick={() => rejectMutation.mutate(it._id)} disabled={it.status !== 'pending'}>거절</Button>
                  <Danger onClick={() => { if (confirm('삭제하시겠습니까?')) deleteMutation.mutate(it._id); }}>삭제</Danger>
                </Actions>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
export default SubmissionsPage;