const fetch = require('node-fetch');

exports.handler = async function(event) {
  // 1. 설정한 비밀 키가 요청에 포함되었는지 확인
  const secretKey = event.headers['x-secret-key'];
  if (secretKey !== process.env.API_SECRET_KEY) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  const accessToken = process.env.NETLIFY_ACCESS_TOKEN;
  const formId = 'survey-submit'; // index.html에 있는 폼 이름
  const siteId = process.env.SITE_ID; // Netlify가 자동으로 주입
  
  const url = `https://api.netlify.com/api/v1/sites/${siteId}/forms/${formId}/submissions`;

  try {
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch submissions');
    }

    const submissions = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(submissions),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};