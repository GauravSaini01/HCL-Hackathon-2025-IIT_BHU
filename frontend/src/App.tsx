import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Patient Pages
import {
  PatientDashboard, ActivityPage, SleepPage, NutritionPage, FitnessPage, MentalHealthPage
} from './pages/PatientPages';

// Provider Pages
import {
  ProviderDashboard, ProviderPatients
} from './pages/ProviderPages';
import Landing from './pages/landing';
import SignIn from './pages/Signin';
import SignUp from './pages/SignUp';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        <Routes>
          <Route path="/" element={<Navigate to="/patient" replace />} />

          {/* Patient Routes */}
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/patient/activity" element={<ActivityPage />} />
          <Route path="/patient/sleep" element={<SleepPage />} />
          <Route path="/patient/nutrition" element={<NutritionPage />} />
          <Route path="/patient/fitness" element={<FitnessPage />} />
          <Route path="/patient/mental" element={<MentalHealthPage />} />

          {/* Provider Routes */}
          <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/provider/patients" element={<ProviderPatients />} />

          <Route path="*" element={<Navigate to="/patient" replace />} />
        </Routes>
      </div>
    </Router>
  );
}