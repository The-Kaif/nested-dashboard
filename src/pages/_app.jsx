import { Toaster } from "react-hot-toast";
import Layout from "../component/Layout"; // Assuming Layout component manages your page layout
import "../styles/globals.css"; // Global styles for the application
import { useRouter } from "next/router";
import Head from "next/head"; // Head component from Next.js for managing document head metadata

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const currentUrl = router.asPath;
  const noNavbarUrls = ["/login", "/register"]; // URLs where navbar should not be displayed
  const displayNavbar = !noNavbarUrls.includes(currentUrl); // Determine if navbar should be displayed based on current URL

  return (
    <>
      <Head>
        <title>CurvUp</title> {/* Title of the document */}
        <link rel="icon" href="/favicon.ico" /> {/* Favicon for the website */}
      </Head>
      {displayNavbar ? (
        <>
          <Layout> {/* Wrapper Layout component */}
            <Toaster position="top-center" /> {/* Toast notifications position */}
            <Component {...pageProps} /> {/* Render the current page component */}
          </Layout>
        </>
      ) : (
        <>
          <Toaster position="top-center" /> {/* Toast notifications for pages without navbar */}
          <Component {...pageProps} /> {/* Render the current page component */}
        </>
      )}
    </>
  );
}

export default MyApp;
