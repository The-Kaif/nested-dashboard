import { useEffect, useState } from "react";
import { getLandingPages, deleteLandingPage } from "../utils/storage";
import { useRouter } from "next/router";
import { isAuthenticated } from "../utils/auth";
import Image from "next/image";
import Badge from "../component/Badge";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  const [pages, setPages] = useState([]);
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      setAuthenticated(true);
      fetchLandingPages();
    }
  }, []);

  const fetchLandingPages = () => {
    const landingPages = getLandingPages();
    setPages(landingPages);
  };

  const handleDelete = (id) => {
    deleteLandingPage(id);
    fetchLandingPages(); // Refresh pages after deletion
  };

  if (!authenticated) return <div>Loading...</div>;

  return (
    <>
      <h2>Landing Pages</h2>
      {pages.length === 0 ? (
        <div className="center-container">
          <h3>No Data Found</h3>
          <p>Please create your landing page</p>
        </div>
      ) : (
        <ul className="landing-pages-list">
          {pages.map((page) => (
            <li key={page.id} className="landing-page-item">
              {page.preview && (
                <Image
                  className="preview-image"
                  src={page.preview}
                  alt={`${page.title} Preview`}
                  width={250}
                  height={250}
                />
              )}
              <Badge status={page.status} />
              <div className="info-perpage per-item">
                <p className="title">{page.title}</p>
                <p className="description">{page.description}</p>
              </div>
              <div className="per-item">
                <button onClick={() => router.push(`/edit/${page.id}`)}>
                  Edit
                </button>
                <button onClick={() => router.push(`/view/${page.id}`)}>
                  View
                </button>
                <button onClick={() => handleDelete(page.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button
        className="floating-button btnWithICon"
        onClick={() => router.push("/create")}
      >
        <FaPlus size={15} />
        &nbsp; Create New Page
      </button>
    </>
  );
}
