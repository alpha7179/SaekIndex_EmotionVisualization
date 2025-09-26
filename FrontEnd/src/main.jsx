/* src/main.jsx */
import React, { Suspense } from 'react'; // Suspense import
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './i18n'; // 1. 방금 만든 i18n.js 파일을 import

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Suspense로 App을 감싸줍니다. 번역 파일을 불러오는 동안 보여줄 로딩 화면을 위함입니다. */}
    <Suspense fallback="Loading..."> 
      <App />
    </Suspense>
  </React.StrictMode>,
);