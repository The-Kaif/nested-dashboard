import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" /> {/* Character encoding */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" /> {/* Responsive viewport */}
        <link rel="shortcut icon" href="/images/favicon.ico" /> {/* Favicon */}
      </Head>
      <body>
        <Main /> {/* Main content of the application */}
        <NextScript /> {/* Scripts Next.js needs to include */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WGTKRVJF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </body>
    </Html>
  );
}
