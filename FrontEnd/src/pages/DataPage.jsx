import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import PageHeader from '../components/PageHeader';

const PageContainer = styled.div`
  padding: 3rem 1rem;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
`;

function DataPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/.netlify/functions/get-submissions', {
          headers: {
            // Netlify에 설정한 비밀 키를 헤더에 담아 보냅니다.
            'x-secret-key': import.meta.env.VITE_API_SECRET_KEY // 2단계에서 설정한 값과 일치해야 함
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSubmissions(data.map(item => item.data)); // 실제 데이터는 'data' 필드 안에 있습니다.
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <PageContainer>Loading...</PageContainer>;
  if (error) return <PageContainer>Error: {error}</PageContainer>;

  return (
    <PageContainer>
      <PageHeader title="설문조사 결과" />
      <Table>
        <thead>
          <tr>
            {submissions.length > 0 && Object.keys(submissions[0]).map(key => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={index}>
              {Object.values(submission).map((value, i) => <td key={i}>{Array.isArray(value) ? value.join(', ') : value}</td>)}
            </tr>
          ))}
        </tbody>
      </Table>
    </PageContainer>
  );
}

export default DataPage;