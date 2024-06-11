import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getLandingPage } from "../../../utils/storage";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../../../component/Header"));
const Footer = dynamic(() => import("../../../component/Footer"));
const TextBlock = dynamic(() => import("../../../component/TextBlock"));
const ImageComponent = dynamic(() =>
  import("../../../component/ImageComponent")
);

const components = { Header, Footer, TextBlock, ImageComponent };

export default function View() {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(null);

  console.log("id", id);

  useEffect(() => {
    if (id) {
      const landingPage = getLandingPage(id);
      setPage(landingPage);
    }
  }, [id]);

  console.log("page", page);

  if (!page) return <div>Loading...</div>;

  return (
    <div>
      <h1>{page.title}</h1>
      <p>{page.description}</p>
      {page.components.map((component, index) => {
        const Component = components[component.type];
        return Component ? (
          <Component key={index} {...component.props} />
        ) : null;
      })}
    </div>
  );
}
