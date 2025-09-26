// Netlify Function의 기본 형식입니다.
exports.handler = async function(event, context) {
  // 1. POST 요청이 아니면 에러를 반환합니다.
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    // 2. 프론트엔드에서 보낸 JSON 데이터를 파싱합니다.
    const data = JSON.parse(event.body);
    
    // 3. 받은 데이터를 콘솔에 출력합니다. (Netlify 대시보드의 Functions 로그에서 확인 가능)
    console.log('Received survey data:', data);

    // ⭐ 향후 이 곳에서 받은 데이터를 처리하는 로직을 추가할 수 있습니다.
    // 예: 데이터베이스에 저장, 이메일로 전송, 다른 API로 전달 등

    // 4. 프론트엔드에 성공 응답을 보냅니다.
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Survey data received successfully!' }),
    };
  } catch (error) {
    // 5. 에러가 발생하면 에러 응답을 보냅니다.
    console.error('Error processing data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process survey data.' }),
    };
  }
};