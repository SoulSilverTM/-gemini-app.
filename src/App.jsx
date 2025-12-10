import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { ProjectProvider } from './context/ProjectContext';
import { ConfigProvider } from './context/ConfigContext';
import { ProcessProvider } from './context/ProcessContext';
import { DocumentProvider } from './context/DocumentContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserAdmin from './pages/UserAdmin';
import Projects from './pages/Projects';
import ProjectProcess from './pages/ProjectProcess';
import Documents from './pages/Documents';
import Reports from './pages/Reports';
import Configuration from './pages/Configuration';
import Settings from './pages/Settings';
import MainLayout from './layout/MainLayout';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ProjectProvider>
          <ConfigProvider>
            <ProcessProvider>
              <DocumentProvider>
                <ThemeProvider>
                  <Router>
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/" element={
                        <ProtectedRoute>
                          <MainLayout />
                        </ProtectedRoute>
                      }>
                        <Route index element={<Dashboard />} />
                        <Route path="users" element={<UserAdmin />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="process" element={<ProjectProcess />} />
                        <Route path="documents" element={<Documents />} />
                        <Route path="reports" element={<Reports />} />
                        <Route path="configuration" element={<Configuration />} />
                        <Route path="settings" element={<Settings />} />
                      </Route>
                    </Routes>
                  </Router>
                </ThemeProvider>
              </DocumentProvider>
            </ProcessProvider>
          </ConfigProvider>
        </ProjectProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
