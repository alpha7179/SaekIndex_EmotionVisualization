const fetch = require('node-fetch');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const formData = JSON.parse(event.body);
  // Netlify Forms에 보낼 데이터 형식으로 변환
  const formBody = new URLSearchParams({
    'form-name': 'survey-submit',
    ...formData
  }).toString();

  try {
    // Netlify가 제공하는 내부 폼 제출 주소로 데이터를 전송
    await fetch(process.env.URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody,
    });

    console.log('Form submission successful');
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data submitted to Netlify Forms!' }),
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to submit form.' }),
    };
  }
};