import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props: any) {
  return (
    <Html lang="uk" className="notranslate" translate="no">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kosugi+Maru&family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <style
          id={"_goober"}
          // And defined it in here
          dangerouslySetInnerHTML={{ __html: " " + (props as any).css }}
        />
        <meta charSet="utf-8" />
      </Head>
      <body style={{ padding: 0, margin: 0 }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
