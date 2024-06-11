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

  const handlePropChange = (index, prop, value) => {
    const updatedComponents = [...page.components];
    updatedComponents[index] = {
      ...updatedComponents[index],
      props: {
        ...updatedComponents[index].props,
        [prop]: value,
      },
    };
    setPage((prevPage) => ({
      ...prevPage,
      components: updatedComponents,
    }));
  };

  const handleDeleteComponent = (index) => {
    const updatedComponents = page.components.filter((_, i) => i !== index);
    setPage((prevPage) => ({
      ...prevPage,
      components: updatedComponents,
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
          return (
            <div key={index}>
              <Component {...component.props} />
              {component.type === 'Header' && (
                <input
                  type="text"
                  placeholder="Title"
                  value={component.props.title || ''}
                  onChange={(e) => handlePropChange(index, 'title', e.target.value)}
                />
              )}
              {component.type === 'Footer' && (
                <input
                  type="text"
                  placeholder="Footer Content"
                  value={component.props.content || ''}
                  onChange={(e) => handlePropChange(index, 'content', e.target.value)}
                />
              )}
              {component.type === 'TextBlock' && (
                <textarea
                  placeholder="Text"
                  value={component.props.text || ''}
                  onChange={(e) => handlePropChange(index, 'text', e.target.value)}
                />
              )}
              {component.type === 'ImageComponent' && (
                <>
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={component.props.src || ''}
                    onChange={(e) => handlePropChange(index, 'src', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Alt Text"
                    value={component.props.alt || ''}
                    onChange={(e) => handlePropChange(index, 'alt', e.target.value)}
                  />
                </>
              )}
              <button onClick={() => handleDeleteComponent(index)}>Delete</button>
            </div>
          );
        })}
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => router.push(`/view/${id}`)}>Preview</button>
      <button onClick={() => { page.status = 'Live'; handleSave(); }}>Publish</button>
    </>
  );
}