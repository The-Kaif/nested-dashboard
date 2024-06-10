import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getLandingPage, updateLandingPage } from '../../../utils/storage';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../../../component/Header'));
const Footer = dynamic(() => import('../../../component/Footer'));
const TextBlock = dynamic(() => import('../../../component/TextBlock'));
const ImageComponent = dynamic(() => import('../../../component/ImageComponent'));

const components = { Header, Footer, TextBlock, ImageComponent };

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(null);

  useEffect(() => {
    if (id) {
      setPage(getLandingPage(id));
    }
  }, [id]);

  const handleAddComponent = (type) => {
    const newComponent = { type, props: {} };
    setPage((prevPage) => ({
      ...prevPage,
      components: [...prevPage.components, newComponent],
    }));
  };

  const handleSave = () => {
    updateLandingPage(id, page);
    router.push('/');
  };

  if (!page) return <div>Loading...</div>;

  return (
    <>
      <h2>Edit Landing Page</h2>
      <div>
        <button onClick={() => handleAddComponent('Header')}>Add Header</button>
        <button onClick={() => handleAddComponent('Footer')}>Add Footer</button>
        <button onClick={() => handleAddComponent('TextBlock')}>Add Text Block</button>
        <button onClick={() => handleAddComponent('ImageComponent')}>Add Image</button>
      </div>
      <div>
        {page.components.map((component, index) => {
          const Component = components[component.type];
          return <Component key={index} {...component.props} />;
        })}
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => router.push(`/view/${id}`)}>Preview</button>
      <button onClick={() => { page.status = 'Live'; handleSave(); }}>Publish</button>
    </>
  );
}
