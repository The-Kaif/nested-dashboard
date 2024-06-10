import { useEffect, useState } from 'react';
import { getLandingPages, deleteLandingPage } from '../utils/storage';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../utils/auth';

export default function Home() {
  const [pages, setPages] = useState([]);
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    } else {
      setAuthenticated(true);
      setPages(getLandingPages());
    }
  }, []);

  const handleDelete = (id) => {
    deleteLandingPage(id);
    setPages(getLandingPages());
  };

  if (!authenticated) return <div>Loading...</div>;

  return (
    <>
      <h2>Landing Pages</h2>
      <ul>
        {pages.map((page) => (
          <li key={page.id}>
            <span>{page.title}</span>
            <div>
              <button onClick={() => router.push(`/edit/${page.id}`)}>Edit</button>
              <button onClick={() => router.push(`/view/${page.id}`)}>View</button>
              <button onClick={() => handleDelete(page.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => router.push('/create')}>Create New Page</button>
    </>
  );
}
