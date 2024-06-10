import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getLandingPage } from '../../../utils/storage';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../../../component/Header'));
const Footer = dynamic(() => import('../../../component/Footer'));
const TextBlock = dynamic(() => import('../../../component/TextBlock'));
const ImageComponent = dynamic(() => import('../../../component/ImageComponent'));

const components = { Header, Footer, TextBlock, ImageComponent };

export default function View() {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(null);

  useEffect(() => {
    if (id) {
      setPage(getLandingPage(id));
    }
  }, [id]);

  if (!page) return <div>Loading...</div>;

  return (
    <div>
      {page.components.map((component, index) => {
        const Component = components[component.type];
        return <Component key={index} {...component.props} />;
      })}
    </div>
  );
}
