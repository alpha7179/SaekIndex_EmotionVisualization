/* src/i18n.js */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // 번역 파일을 서버에서 불러오도록 설정
  .use(initReactI18next) // i18n을 react-i18next에 연결
  .init({
    lng: 'ko', // 기본 언어
    fallbackLng: 'ko', // 번역 파일에 해당 언어의 텍스트가 없을 경우 기본 언어로 표시
    
    // 번역 파일이 있는 경로 설정
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    
    // 디버그 모드: 개발 중 번역 키가 없는 등의 문제를 콘솔에 출력
    debug: true,

    interpolation: {
      escapeValue: false, // React는 기본적으로 XSS를 방어하므로 false로 설정
    },
  });

export default i18n;