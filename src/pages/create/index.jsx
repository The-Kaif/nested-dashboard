import { useState } from 'react';
import { createLandingPage } from '../../utils/storage';
import { useRouter } from 'next/router';

export default function Create() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    createLandingPage({ title, description, components: [] });
    router.push('/');
  };

  return (
    <>
      <h2>Create Landing Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </>
  );
}
