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