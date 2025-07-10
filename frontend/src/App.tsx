import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import './index.css';
import SeedManagement from './pages/SeedManagement';
import AnnualPlan from './pages/AnnualPlan';

// Composant de protection des routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Ici vous pouvez ajouter la logique d'authentification
  // Pour l'instant, on simule un utilisateur connecté
  const isAuthenticated = true; // À remplacer par la vraie logique d'auth

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Page de connexion temporaire
const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion à ROBI
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Robots autonomes pour le maraîchage
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">
            Page de connexion en cours de développement
          </p>
        </div>
      </div>
    </div>
  );
};

// Pages temporaires pour les autres sections
const FarmsPage: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Mes Fermes</h1>
      <p className="mt-2 text-gray-600">Page en cours de développement</p>
    </div>
  </div>
);

const RobotsPage: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Robots</h1>
      <p className="mt-2 text-gray-600">Page en cours de développement</p>
    </div>
  </div>
);

const ReportsPage: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Rapports</h1>
      <p className="mt-2 text-gray-600">Page en cours de développement</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div>
                  <Navigation />
                  <Dashboard />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/farms"
            element={
              <ProtectedRoute>
                <div>
                  <Navigation />
                  <FarmsPage />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/robots"
            element={
              <ProtectedRoute>
                <div>
                  <Navigation />
                  <RobotsPage />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <div>
                  <Navigation />
                  <ReportsPage />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/seeds"
            element={
              <ProtectedRoute>
                <SeedManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/annual-plan"
            element={
              <ProtectedRoute>
                <AnnualPlan />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
