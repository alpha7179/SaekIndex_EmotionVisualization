# 색인(SaekIn) 프로젝트: 감정 분석 및 시각화

이 프로젝트는 사용자의 감정 데이터를 설문을 통해 수집하고, 이를 시각화하여 보여주는 웹 서비스입니다. React를 기반으로 제작되었습니다.

## ✨ 주요 기능

-   

## 🛠️ 기술 스택

-   **Frontend**: React, Vite, React Router
-   **Backend**: 
-   **i18n**: react-i18next
-   **Deployment**: 

## 🚀 시작하기

### 1. 프로젝트 복제 및 설치
```bash
git clone [저장소_URL]
cd [프로젝트_폴더]
npm install
```

### 2. 환경 변수 설정
프로젝트 루트 폴더에 `.env` 파일을 생성하고 아래 내용을 채워주세요.

```
VITE_API_SECRET_KEY=자신만의_비밀_키
```
> Netlify 배포 시에는 Netlify 대시보드에 `API_SECRET_KEY`, `NETLIFY_ACCESS_TOKEN`, `VITE_API_SECRET_KEY`를 등록해야 합니다.

### 3. 개발 서버 실행
```bash
# 로컬 개발 환경 실행 (Netlify CLI 필요)
netlify dev

# 또는 프론트엔드만 실행
npm run dev
```

## 🔄 AWS 프론트엔드 업데이트 방법
이 프로젝트는 AWS S3와 CloudFront를 통해 배포됩니다. Netlify와 달리, 코드 수정 후에는 수동으로 빌드 및 업로드 과정을 거쳐야 합니다.

### 1단계: ✏️ 로컬에서 코드 수정
src 폴더 내의 컴포넌트, 페이지, 스타일 등을 원하는 대로 수정합니다. 수정이 완료되면 로컬 개발 서버에서(npm run dev) 변경 사항이 올바르게 작동하는지 확인합니다.

### 2단계: 📦 프로젝트 빌드
수정이 완료된 프로젝트를 웹 서버에 올릴 수 있는 정적 파일 형태로 변환(빌드)합니다. 터미널에서 아래 명령어를 실행하세요.

```bash
npm run build
```
성공적으로 완료되면 프로젝트 루트에 dist 폴더가 생성되거나 업데이트됩니다.

### 3단계: ☁️ S3에 업로드
빌드된 결과물을 AWS S3 버킷에 업로드합니다.

AWS S3 콘솔에 접속하여 이전에 생성한 버킷(예: saekindex-frontend)으로 이동합니다.

(권장) 기존 파일과의 충돌을 막기 위해, 버킷 안의 모든 파일과 폴더를 삭제합니다.

업로드 버튼을 누르고, 로컬 프로젝트의 dist 폴더 안에 있는 모든 내용을 업로드합니다.

### 4단계: 🔄 CloudFront 캐시 무효화 (필수!)
가장 중요한 단계입니다. S3의 원본 파일만 교체하면 CloudFront는 변경된 내용을 모르고 한동안 이전 버전의 캐시(복사본)를 계속 보여줄 수 있습니다. 따라서 CloudFront에게 캐시를 새로고침하라고 알려줘야 합니다.

AWS CloudFront 콘솔에 접속하여 배포 ID를 클릭합니다.

무효화(Invalidations) 탭을 선택합니다.

무효화 생성(Create invalidation) 버튼을 클릭합니다.

'객체 경로 추가' 입력 칸에 /* 를 입력합니다. (의미: 모든 파일을 무효화하라)

무효화 생성 버튼을 클릭합니다.

무효화 작업은 약 1~2분 정도 소요됩니다. 작업이 완료된 후 웹사이트에 접속하면 수정된 내용이 반영된 것을 확인할 수 있습니다.

💡 자동화 팁: 이 모든 과정(빌드 → S3 업로드 → 캐시 무효화)은 GitHub Actions와 같은 CI/CD 도구를 사용하면 GitHub에 코드만 푸시해도 자동으로 처리되도록 만들 수 있습니다.

## ⚙️ React + Vite 프로젝트 개발환경

```bash
npm create vite@latest . -- --template react

> npx
> create-vite . react

│
◆  Select a framework:
│  ○ Vanilla
│  ○ Vue
│  ● React
│  ○ Preact
│  ○ Lit
│  ○ Svelte
│  ○ Solid
│  ○ Qwik
│  ○ Angular
│  ○ Marko
│  ○ Others

 Select a variant:
│  ○ TypeScript
│  ○ TypeScript + SWC
│  ○ JavaScript
│  ● JavaScript + SWC
│  ○ React Router v7 ↗
│  ○ TanStack Router ↗
│  ○ RedwoodSDK ↗
│  ○ RSC ↗


 Scaffolding project in C:\Users\hsoh\WorkspaceAjou\pwd-week3...
    npm install
    npm run dev


npm install

added 112 packages, and audited 113 packages in 4s

29 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities


npm run dev

> pwd-week3@0.0.0 dev
> vite


  VITE v7.1.5  ready in 317 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

> 💡 브라우저에서 http://localhost:5173 이 열리면 성공!


## 📁 프로젝트 구조

### 1. FrontEnd 구조

```
FrontEnd/
├── .gitignore
├── .env
├── README.md
├── eslint.config.js
├── index.html
├── netlify.toml
├── package.json
├── package-lock.json
├── node_modules/
├── netlify/
├── image/
├── public/
│   ├──  locales
│   │    ├── en
│   │    │   └── translation.json
│   │    └── ko
│   │        └── translation.json
│   ├── vite.svg
│   └── _redirects
├── src/
│   ├── assets/               # 이미지, SVG 등 정적 자원
│   │   └── react.svg
│   ├── components/           # 재사용 컴포넌트
│   │   ├── Footer.jsx
│   │   ├── FormField.jsx
│   │   ├── GradientIcon.jsx
│   │   ├── Header.jsx
│   │   ├── NotFound.jsx
│   │   ├── PageHeader.jsx
│   │   └── SurveyForm.jsx
│   ├── data/                 # JSON 데이터
│   │   ├── survey.en.json
│   │   └── survey.ko.json
│   ├── pages/                # 페이지 컴포넌트
│   │   ├── AnalyzePage.jsx
│   │   ├── DataPage.jsx
│   │   ├── HomePage.jsx
│   │   └── VisualizationPage.jsx
│   ├── services/             # API 로직
│   │   └── api.jsx
│   ├── styles/               # 스타일 (styled-components 등)
│   │   └── GlobalStyles.jsx
│   ├── App.css
│   ├── App.jsx               # 메인 앱 컴포넌트
│   ├── i18n.js               # 국제화 설정
│   ├── index.css
│   └── main.jsx              # 애플리케이션 진입점
└── vite.config.js
```

### 2. BackEnd 구조

```
```

---

## 🔧 핵심 컴포넌트

### 1. FrontEnd 컴포넌트

#### 1-1. ./(root)

1-1-1. package.json
```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@tanstack/react-query": "^5.87.4",
    "axios": "^1.12.1",
    "i18next": "^25.5.2",
    "i18next-http-backend": "^3.0.2",
    "node-fetch": "^2.7.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-hook-form": "^7.62.0",
    "react-i18next": "^16.0.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.9.1",
    "react-spinners": "^0.17.0",
    "react-toastify": "^11.0.5"
  },
  "devDependencies": {
    "@eslint/js": "^9.33.0",
    "@types/react": "^19.1.10",
    "@types/react-dom": "^19.1.7",
    "@vitejs/plugin-react-swc": "^4.0.0",
    "eslint": "^9.33.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "vite": "^7.1.2"
  }
}

```

```bash
npm install
```

1-1-2. index.html
```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="image/icon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="감정을 통한 예술을 경험하세요" />
    <title>색인 SaekIn</title>
  </head>
  <body>
      <noscript>이 앱을 실행하려면 JavaScript를 활성화해야 합니다.</noscript>
  
    <form name="survey-submit" netlify hidden>
      <input type="date" name="date" />
      <input type="text" name="name" />
      <input type="range" name="age" />
      <input type="radio" name="question1" />
      <input type="checkbox" name="question2" />
      <select name="question3"></select>
      <textarea name="question4"></textarea>
    </form>

  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

#### 1-2. src/

1-2-1. src/main.jsx
```jsx
/* src/main.jsx */
import React, { Suspense } from 'react'; 
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './i18n';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {}
    <Suspense fallback="Loading..."> 
      <App />
    </Suspense>
  </React.StrictMode>,
);
```

1-2-2. src/App.jsx
```jsx
/* src/App.jsx */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';
import VisualizationPage from './pages/VisualizationPage';
import DataPage from './pages/DataPage';

// Components
import Header from './components/Header';
import Footer from './components/Footer'; 
import NotFound from './components/NotFound';

// Styles
import GlobalStyles from './styles/GlobalStyles';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalStyles />
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/analyze" element={<AnalyzePage />} />
              <Route path="/visualization" element={<VisualizationPage />} />
              <Route path="/data" element={<DataPage />} /> 
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          theme="light"
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
```

1-2-3. src/i18n.js
```js
/* src/i18n.js */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    lng: 'ko',
    fallbackLng: 'ko',
    
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    
    debug: true,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

1-2-4. src/index.css
```css
/* src/index.css */
@font-face {
    font-family: 'ChangwonDanggamAsak';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/CWDangamAsac-Bold.woff') format('woff');
    font-weight: normal;
    font-display: swap;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

1-2-5. src/App.css
```css
/* src/App.css */

/* default style */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background: #f5f5f5;
  color: #333;
}

/* layout */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
}

/* button style */
button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background: #f0f0f0;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* form style */
input, select, textarea {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

/* footer style */
.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

/* loading style */
.loading {
  text-align: center;
  padding: 2rem;
}

/* error style */
.error {
  color: red;
  padding: 1rem;
  text-align: center;
}
```

#### 1-3. src/styles/

1-3-1. src/styles/GlobalStyles.jsx
```jsx
/** src/styles/GlobalStyles.jsx */
/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={css`
      /* Emotion으로 관리할 글로벌 스타일 */
      a {
        color: inherit;
        text-decoration: none;
      }
      
      ul {
        list-style: none;
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }
    `}
  />
);

export default GlobalStyles;
```

#### 1-4. src/services/

1-4-1. src/services/api.jsx
```jsx
/* src/services/api.jsx */


```

#### 1-5. src/components/

1-5-1. src/components/Footer.jsx
```jsx
/* src/components/Footer.jsx */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background-color: #f9fafb; /* 매우 옅은 회색 배경 */
  color: #6b7280; /* 기본 텍스트 색상 */
  font-size: 0.875rem;
  padding: 3rem 2rem;
  border-top: 1px solid #f0f0f0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ColumnsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* 화면이 작아지면 줄바꿈 */
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e8eb;
`;

const Column = styled.div`
  flex: 1;
  min-width: 150px; /* 컬럼의 최소 너비 */
`;

const ColumnTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #333d4b;
  margin-bottom: 1rem;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const LinkItem = styled.li`
  a {
    color: #6b7280;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const InfoSection = styled.div`
  padding-top: 2rem;
  font-size: 0.75rem;
  line-height: 1.5;
`;

const FooterLogo = styled.strong`
  font-family: 'ChangwonDanggamAsak', sans-serif; /* 적용할 폰트 지정 */
  font-weight: normal; /* font-face에 정의된 weight 사용 */
  font-size: 1.5rem; /* 폰트 크기 살짝 키우기 (선택 사항) */
`;

function Footer() {
    const location = useLocation();
    const { t, i18n } = useTranslation();

    
    return (
        <FooterContainer>
        <FooterContent>
            <ColumnsWrapper>
            <Column>
                <ColumnTitle>{t('footer.menuname')}</ColumnTitle>
                <LinkList>
                <LinkItem><a href="/">{t('menu.home')}</a></LinkItem>
                <LinkItem><a href="/analyze">{t('menu.analyze')}</a></LinkItem>
                <LinkItem><a href="/visualization">{t('menu.visualization')}</a></LinkItem>
                </LinkList>
            </Column>
            </ColumnsWrapper>

            <InfoSection>
            <strong><FooterLogo>색인</FooterLogo> {t('footer.projectname')}</strong> <br />
            © 2025 SaekIn Proj. All Rights Reserved.
            </InfoSection>
        </FooterContent>
        </FooterContainer>
    );
}

export default Footer;

```


1-5-2. src/components/FormField.jsx
```jsx
/* src/components/FormField.jsx */
import React from 'react';
import styled from '@emotion/styled';

const FormGroup = styled.div`
  margin-bottom: 2.5rem; 
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #555;
  margin-bottom: ${props => 
    (props.type === 'radio' || props.type === 'checkbox') ? '2.5rem' : '0.5rem'};
`;

const Input = styled.input`
  width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1rem;
`;
const Select = styled.select`
  width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1rem;
`;
const Textarea = styled.textarea`
  width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1rem; resize: vertical; min-height: 100px;
`;
const ErrorMessage = styled.span`
  color: #ff4757; font-size: 0.875rem; margin-top: 0.25rem; display: block;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 아이템(버튼, 텍스트)을 위아래 수직으로 쌓음 */
  align-items: center;   /* 수직으로 쌓인 아이템들을 가운데 정렬 */
  gap: 0.25rem;          /* 버튼과 텍스트 사이 간격 */
  flex: 1;               /* 각 선택지가 동일한 너비를 갖도록 함 */
`;

const RequiredMark = styled.span`
  color: red;
  margin-left: 0.25rem;
`;


const InputField = ({ type, name, register, options, ...rest }) => {
  switch (type) {
    case 'textarea':
      return <Textarea id={name} {...register(name)} {...rest} />;
    case 'select':
      return (
        <Select id={name} {...register(name)} {...rest}>
          {options.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </Select>
      );
    case 'radio':
      return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          {options.map(option => (
            <OptionWrapper key={option.value}>
              <input type="radio" value={option.value} {...register(name)} {...rest} />
              <span>{option.label}</span>
            </OptionWrapper>
          ))}
        </div>
      );
    case 'checkbox':
        return (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              {options.map(option => (
                <OptionWrapper key={option.value}>
                    <input type="checkbox" value={option.value} {...register(name)} {...rest} />
                    <span>{option.label}</span>
                </OptionWrapper>
              ))}
            </div>
        );
    default:
      return <Input id={name} type={type} {...register(name)} {...rest} />;
  }
};


const FormField = ({ label, name, type, register, errors, options, validation, ...rest }) => {
  return (
    <FormGroup>
      <Label htmlFor={name} type={type}>{label}{validation?.required && <RequiredMark>*</RequiredMark>}</Label>
      <InputField
        type={type}
        name={name}
        register={register}
        options={options}
        {...validation ? { ...register(name, validation) } : { ...register(name) }}
        {...rest}
      />
      {errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
    </FormGroup>
  );
};

export default FormField;
```

1-5-3. src/components/GradientIcon.jsx
```jsx
/* src/components/GradientIcon.jsx */
import React from 'react';

const GradientIcon = ({ icon, id }) => {
  const IconComponent = icon;

  return (
    <svg width="3rem" height="3rem" viewBox="0 0 24 24">
      <defs>
        {}
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#b84182ff' }} />
          <stop offset="100%" style={{ stopColor: '#F8EBE4' }} />
        </linearGradient>
      </defs>
      {}
      <IconComponent fill={`url(#${id})`} size="100%" />
    </svg>
  );
};

export default GradientIcon;
```

1-5-4. src/components/src/components/Header.jsx
```jsx
/* src/components/Header.jsx */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

const HeaderContainer = styled.header`
  width: 100%;
  background: white;
  padding: 1rem 2rem; /* 좌우 패딩 추가 */
  border-bottom: 1px solid #f0f0f0; /* 아래에 얇은 구분선 추가 */
  
  /* 2. flex를 이용해 로고, 메뉴, 언어 선택 영역을 좌우로 배치 */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  color: #333d4b; /* 토스의 메인 텍스트 색상과 유사하게 */
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem; /* 메뉴 사이 간격 */
`;

const NavLink = styled(Link)`
  font-size: 1rem;
  font-weight: 600;
  color: #4e5968; /* 토스의 메뉴 텍스트 색상과 유사하게 */
  padding: 0.5rem;
  
  /* 3. 활성(active) 상태일 때 텍스트 색상을 다르게 표시 */
  &.active {
    color: #b84182ff; /* 토스의 포인트 색상 */
  }

  &:hover {
    color: #c777a3ff;
  }
`;

const LangSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4e5968;
`;

const LangButton = styled.span`
  cursor: pointer;
  padding: 0.25rem;
  color: ${props => props.active ? '#333d4b' : '#b0b8c1'}; /* 활성/비활성 색상 구분 */
`;

const Separator = styled.div`
  width: 1px;
  height: 12px;
  background-color: #e5e8eb;
`;

const HeaderLogo = styled.strong`
  font-family: 'ChangwonDanggamAsak', sans-serif; /* 적용할 폰트 지정 */
  font-weight: normal; /* font-face에 정의된 weight 사용 */
  font-size: 2rem; /* 폰트 크기 살짝 키우기 (선택 사항) */

  background: linear-gradient(135deg, #b84182ff 0%, #F8EBE4 100%);
  -webkit-background-clip: text; /* 웹킷 기반 브라우저 호환성 */
  background-clip: text;
  color: transparent;
`;


function Header() {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <HeaderContainer>
      <Logo to="/"><HeaderLogo>색인</HeaderLogo></Logo>

      <Nav>
        {}
        <NavLink to="/" className={isActive('/')}>
          {t('menu.home')}
        </NavLink>
        <NavLink to="/analyze" className={isActive('/analyze')}>
          {t('menu.analyze')}
        </NavLink>
        <NavLink to="/visualization" className={isActive('/visualization')}>
          {t('menu.visualization')}
        </NavLink>
      </Nav>

      <LangSwitcher>
        {}
        <LangButton active={i18n.language === 'ko'} onClick={() => changeLanguage('ko')}>
          KOR
        </LangButton>
        <Separator />
        <LangButton active={i18n.language === 'en'} onClick={() => changeLanguage('en')}>
          ENG
        </LangButton>
      </LangSwitcher>
    </HeaderContainer>
  );
}

export default Header;
```

1-5-5. src/components/NotFound.jsx
```jsx
/* src/components/NotFound.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  text-align: center;
  padding: 4rem 1rem;
`;

const Icon = styled(FaExclamationTriangle)`
  font-size: 4rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const HomeLink = styled(Link)`
  display: inline-block;

  transition: background 0.3s;

  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.01);
  }
`;

function NotFound() {
  const { t, i18n } = useTranslation(); 
  return (
    <Container>
      <Icon />
      <Title>{t('NotFound.title')}</Title>
      <Message>{t('NotFound.message')}</Message>
      <HomeLink to="/">{t('NotFound.button')}</HomeLink>
    </Container>
  );
}

export default NotFound;
```

1-5-6. src/components/PageHeader.jsx
```jsx
/* src/components/PageHeader.jsx */
import React from 'react';
import styled from '@emotion/styled';

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

function PageHeader({ icon, title, subtitle }) {
  return (
    <HeaderContainer>
      <Title>
        {icon && <span>{icon}</span>}
        {title}
      </Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </HeaderContainer>
  );
}

export default PageHeader;
```

1-5-7. src/components/SurveyForm.jsx
```jsx
/* src/components/SurveyForm.jsx */
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import FormField from './FormField';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import surveyKO from '../data/survey.ko.json';
import surveyEN from '../data/survey.en.json';

const FormContainer = styled.div`
  background: white; padding: 2rem; border-radius: 12px; max-width: 600px; margin: 0 auto;
`;
const SubmitButton = styled.button`
  width: 100%; padding: 1rem; background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%); color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer;
`;

const surveys = {
  ko: surveyKO,
  en: surveyEN,
};

function SurveyForm() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  
  const surveyData = surveys[i18n.language] || surveys.ko;

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { date: today, age: 25, question3: '' }
  });

  const ageValue = watch('age');

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/.netlify/functions/submit-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      const result = await response.json();
      console.log('Success:', result);
      toast.success(t('AnalyzePage.success'));

      setTimeout(() => {
        navigate('/'); 
      }, 1000);

    } catch (error) {
      console.error('Error submitting survey:', error);
      toast.error(t('AnalyzePage.error'));
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)} name="survey-submit">
        <input type="hidden" name="form-name" value="survey-submit" />

        {surveyData.map((field) => {

          const label = field.name === 'age' 
            ? `${field.label}: ${ageValue}` 
            : field.label;
          
          const validation = field.validation?.required 
            ? { required: field.validation.required } 
            : {};
          
          return (
            <FormField
              key={field.name}
              type={field.type}
              name={field.name}
              label={label}
              register={register}
              errors={errors}
              options={field.options}
              validation={validation}
              readOnly={field.readOnly}
              min={field.min}
              max={field.max}
              placeholder={field.placeholder}
            />
          );
        })}

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('AnalyzePage.submitload') : t('AnalyzePage.submit')}
        </SubmitButton>
      </form>
    </FormContainer>
  );
}

export default SurveyForm;
```

#### 1-6. src/pages/

1-6-1. src/pages/AnalyzePage.jsx
```jsx
/* src/pages/AnalyzePage.jsx */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import SurveyForm from '../components/SurveyForm';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';

const PageContainer = styled.div`
  padding: 3rem 1rem;
`;

const StartButton = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #b84182ff 0%, #ddc9bfff 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const StartContainer = styled.div`
  text-align: center;
  padding: 0.5rem 1rem;
`;

function AnalyzePage() {
  const { t } = useTranslation();

  const [isSurveyStarted, setIsSurveyStarted] = useState(false);

  const handleStartSurvey = () => {
    setIsSurveyStarted(true);
  };

  return (
    <PageContainer>
      <PageHeader
        icon="📋"
        title={t('AnalyzePage.title')} 
        subtitle={t('AnalyzePage.subtitle')}
        />
      {isSurveyStarted ? (
        <SurveyForm />
      ) : (
        <StartContainer>
          <StartButton onClick={handleStartSurvey}>
            {t('AnalyzePage.survaystart')}
          </StartButton>
        </StartContainer>
      )}
    </PageContainer>
  );
}

export default AnalyzePage;
```

1-6-2. src/pages/DataPage.jsx
```jsx
/* src/pages/DataPage.jsx */
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

            'x-secret-key': import.meta.env.VITE_API_SECRET_KEY 
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSubmissions(data.map(item => item.data));
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
```

1-6-3. src/pages/HomePage.jsx
```jsx
/* src/pages/HomePage.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaPoll, FaChartBar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import GradientIcon from '../components/GradientIcon';
import PageHeader from '../components/PageHeader';

const HomeContainer = styled.div`
  text-align: center;
  padding: 3rem 1rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  max-width: 800px;
  margin: 3rem auto 0;
`;

const Card = styled(Link)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

function HomePage() {
    const { t } = useTranslation();

    return (
        <HomeContainer>
        {}
        <PageHeader 
            icon="😂"
            title={t('home.title')} 
            subtitle={t('home.subtitle')}
        />
        
        <CardGrid>
            <Card to="/analyze">
            <div className="icon-container"><GradientIcon icon={FaPoll} id="poll-gradient" /></div>
            <h3>{t('home.card_analyze_title')}</h3>
            <p>{t('home.card_analyze_desc')}</p>
            </Card>
            <Card to="/visualization">
            <div className="icon-container"><GradientIcon icon={FaChartBar} id="chart-gradient" /></div>
            <h3>{t('home.card_viz_title')}</h3>
            <p>{t('home.card_viz_desc')}</p>
            </Card>
        </CardGrid>
        </HomeContainer>
    );
}

export default HomePage;
```

1-6-4. src/pages/VisualizationPage.jsx
```jsx
/* src/pages/VisualizationPage.jsx */
import React from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';

const Container = styled.div`
  text-align: center;
  padding: 3rem;
`;

function VisualizationPage() {

    const { t } = useTranslation();
    return (
        <Container>
        <PageHeader
            icon="📊"
            title={t('VisualizationPage.title')} 
            subtitle={t('VisualizationPage.subtitle')}
        />
        </Container>
    );
}

export default VisualizationPage;
```

#### 1-7. src/data/

1-7-1. src/data/survey.en.json
```json
[
  {
    "name": "date",
    "label": "Date",
    "type": "date",
    "readOnly": true
  },
  {
    "name": "name",
    "label": "Name",
    "type": "text",
    "placeholder": "Please enter your name",
    "validation": { "required": "It's a required question" }
  },
  {
    "name": "age",
    "label": "Age",
    "type": "range",
    "min": 1,
    "max": 100,
    "validation": { "required": "It's a required question" }
  },
  {
    "name": "question1",
    "label": "Question1",
    "type": "checkbox",
    "options": [
      { "value": "5", "label": "value1" },
      { "value": "4", "label": "value2" },
      { "value": "3", "label": "value3" },
      { "value": "2", "label": "value4" },
      { "value": "1", "label": "value5" }
    ],
    "validation": { "required": "It's a required question" }
  },
  {
    "name": "question2",
    "label": "Question2",
    "type": "radio",
    "options": [
      { "value": "5", "label": "value1" },
      { "value": "4", "label": "value2" },
      { "value": "3", "label": "value3" },
      { "value": "2", "label": "value4" },
      { "value": "1", "label": "value5" }
    ],
    "validation": { "required": "It's a required question" }
  },
  {
    "name": "question3",
    "label": "Question3",
    "type": "select",
    "options": [
      { "value": "", "label": "select", "disabled": true },
      { "value": "1", "label": "value1" },
      { "value": "2", "label": "value2" },
      { "value": "3", "label": "value3" },
      { "value": "4", "label": "value4" }
    ],
    "validation": { "required": "It's a required question" }
  },
  {
    "name": "question4",
    "label": "Question4",
    "type": "textarea",
    "placeholder": "Please enter the text"
  }
]
```

1-7-2. src/data/survey.ko.json
```json
[
  {
    "name": "date",
    "label": "날짜",
    "type": "date",
    "readOnly": true
  },
  {
    "name": "name",
    "label": "이름",
    "type": "text",
    "placeholder": "이름을 입력해주세요",
    "validation": { "required": "필수 응답 문항입니다." }
  },
  {
    "name": "age",
    "label": "나이",
    "type": "range",
    "min": 1,
    "max": 100,
    "validation": { "required": "필수 응답 문항입니다." }
  },
  {
    "name": "question1",
    "label": "문항1",
    "type": "checkbox",
    "options": [
      { "value": "5", "label": "값1" },
      { "value": "4", "label": "값2" },
      { "value": "3", "label": "값3" },
      { "value": "2", "label": "값4" },
      { "value": "1", "label": "값5" }
    ],
    "validation": { "required": "필수 응답 문항입니다." }
  },
  {
    "name": "question2",
    "label": "문항2",
    "type": "radio",
    "options": [
      { "value": "5", "label": "값1" },
      { "value": "4", "label": "값2" },
      { "value": "3", "label": "값3" },
      { "value": "2", "label": "값4" },
      { "value": "1", "label": "값5" }
    ],
    "validation": { "required": "필수 응답 문항입니다." }
  },
  {
    "name": "question3",
    "label": "문항3",
    "type": "select",
    "options": [
      { "value": "", "label": "선택", "disabled": true },
      { "value": "1", "label": "값1" },
      { "value": "2", "label": "값2" },
      { "value": "3", "label": "값3" },
      { "value": "4", "label": "값4" }
    ],
    "validation": { "required": "필수 응답 문항입니다." }
  },
  {
    "name": "question4",
    "label": "문항4",
    "type": "textarea",
    "placeholder": "자유롭게 의견을 남겨주세요."
  }
]
```

#### 1-8. ./public/locales

1-8-1. ./public/locales/en/translation.json
```json
{
  "menu": {
    "home": "Home",
    "analyze": "Analyze",
    "visualization": "Visualization"
  },
  "home": {
    "title": "Data Analysis & Visualization",
    "subtitle": "Analyze data and check the results through our survey.",
    "card_analyze_title": "Start Emotion Analysis",
    "card_analyze_desc": "Go to the Analysis page and start wmotion Analysis.",
    "card_viz_title": "View Emotion Visualization",
    "card_viz_desc": "Check the visualized results."
  },
  "AnalyzePage": {
    "title": "Emotion Analysis",
    "subtitle": "Please process the emotions for Emotion analysis.",
    "survaystart": "Start analysis",
    "submit": "Submit a survey",
    "submitload": "Submitting...",
    "success":"Survey submitted successfully!",
    "error":"An error occurred during submission."
  },
  "VisualizationPage": {
    "title": "Emotion Visualization",
    "subtitle": "Media art that visualizes emotions is created."
  },
  "footer": {
    "menuname": "Project",
    "projectname": "Project"
  },
  "NotFound": {
    "title": "404 - Page Not Found",
    "message": "The requested page does not exist.",
    "button": "Return to Home"
  }
}
```

1-8-2. ./public/locales/ko/translation.json
```json
{
  "menu": {
    "home": "홈",
    "analyze": "분석",
    "visualization": "시각화"
  },
  "home": {
    "title": "데이터 분석 및 시각화",
    "subtitle": "설문조사를 통해 데이터를 분석하고 결과를 확인하세요.",
    "card_analyze_title": "감정 분석 시작",
    "card_analyze_desc": "감정 분석을 시작합니다.",
    "card_viz_title": "감정 시각화 확인",
    "card_viz_desc": "시각화 결과를 확인합니다."
  },
  "AnalyzePage": {
    "title": "감정 분석",
    "subtitle": "감정분석을 위해 설문을 진행해주세요.",
    "survaystart": "분석 시작하기",
    "submit": "설문 제출하기",
    "submitload": "제출 중...",
    "success":"설문이 성공적으로 제출되었습니다!",
    "error":"제출 중 오류가 발생했습니다."
  },
  "VisualizationPage": {
    "title": "감정 시각화",
    "subtitle": "감정을 시각화한 미디어아트가 생성됩니다."
  },
  "footer": {
    "menuname": "프로젝트",
    "projectname": "프로젝트"
  },
  "NotFound": {
    "title": "404 - 페이지를 찾을 수 없습니다",
    "message": "요청하신 페이지가 존재하지 않습니다.",
    "button": "홈으로 돌아가기"
  }
}
```

### 2. BackEnd 구조

```
```

---
