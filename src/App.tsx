import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ScholarshipManager } from './components/ScholarshipManager';

export const App: React.FC = () => {
  const [userRole, setUserRole] = useState<'student' | 'donor' | 'admin'>('student');

  return (
    <Layout userRole={userRole} setUserRole={setUserRole}>
      <ScholarshipManager userRole={userRole} />
    </Layout>
  );
};

export default App;
