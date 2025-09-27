/* src/components/GradientIcon.jsx */
import React from 'react';

// 이 컴포넌트는 내부에 있는 아이콘에 그라데이션 fill을 적용하는 역할을 합니다.
const GradientIcon = ({ icon, id }) => {
  const IconComponent = icon;

  return (
    <svg width="3rem" height="3rem" viewBox="0 0 24 24">
      <defs>
        {/* 그라데이션 정의 */}
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#b84182ff' }} />
          <stop offset="100%" style={{ stopColor: '#F8EBE4' }} />
        </linearGradient>
      </defs>
      {/* 기존 아이콘을 복제하고, fill 속성만 그라데이션 id로 덮어씁니다.
        react-icons의 아이콘들은 대부분 24x24 viewBox를 사용합니다.
      */}
      <IconComponent fill={`url(#${id})`} size="100%" />
    </svg>
  );
};

export default GradientIcon;