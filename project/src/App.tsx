import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { About } from './pages/About';
import { Shop } from './pages/Shop';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { HiveDetail } from './pages/HiveDetail';
import { Alerts } from './pages/Alerts';
import { AddHive } from './pages/AddHive';
import { Settings } from './pages/Settings';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected routes with layout */}
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="hive" element={<HiveDetail />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="add-hive" element={<AddHive />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;