import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated, logout } from '../../utils/auth';

export default function Dashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    } else {
      setAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!authenticated) return <div>Loading...</div>;

  return (
    <>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <a href="/">Go to Home</a>
    </>
  );
}
