import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gray-900">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // This script runs before hydration, removing any attributes that might cause hydration mismatches
              (function() {
                const attributes = ['data-new-gr-c-s-check-loaded', 'data-gr-ext-installed'];
                attributes.forEach(attr => {
                  if (document.body.hasAttribute(attr)) {
                    document.body.removeAttribute(attr);
                  }
                });
              })();
            `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}