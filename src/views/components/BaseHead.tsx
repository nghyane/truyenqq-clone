export const BaseHead = ({
  children,
}: {
  children?: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const childrenElements = children
    ? Array.isArray(children)
      ? children
      : [children]
    : null;

  return (
      <head>
          <meta
              name="robots"
              content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>

          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="black"/>


          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link rel="preconnect" href="https://cdn.jsdelivr.net"/>

          <link rel="preload" href={
              process.env.APP_CSS
          } as="style"/>

          <link
              href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600&display=swap"
              rel="stylesheet"
          />

          <link rel="stylesheet" href="/public/css/styles.css"/>

          <link rel="profile" href="https://gmpg.org/xfn/11"/>

          <link
              rel="apple-touch-icon"
              sizes="57x57"
              href="/public/favicon-57x57.png"
          />
          <link
              rel="apple-touch-icon"
              sizes="60x60"
              href="/public/favicon-60x60.png"
          />
          <link
              rel="apple-touch-icon"
              sizes="72x72"
              href="/public/favicon-72x72.png"
          />
          <link
              rel="apple-touch-icon"
              sizes="76x76"
              href="/public/favicon-76x76.png"
          />
          <link
              rel="apple-touch-icon"
              sizes="114x114"
              href="/public/favicon-114x114.png"
          />
          <link
              rel="apple-touch-icon"
              sizes="120x120"
              href="/public/favicon-120x120.png"
          />
          <link
              rel="apple-touch-icon"
              sizes="144x144"
              href="/public/favicon-144x144.png"
          />
          <link
              rel="apple-touch-icon"
              sizes="152x152"
              href="/public/favicon-152x152.png"
          />
          <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/public/favicon-180x180.png"
          />
          <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/public/favicon-16x16.png"
          />
          <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/public/favicon-32x32.png"
          />
          <link
              rel="icon"
              type="image/png"
              sizes="96x96"
              href="/public/favicon-96x96.png"
          />
          <link
              rel="icon"
              type="image/png"
              sizes="192x192"
              href="/public/favicon-192x192.png"
          />
          <link
              rel="shortcut icon"
              type="image/x-icon"
              href="/public/favicon.ico"
          />
          <link rel="icon" type="image/x-icon" href="/public/favicon.ico"/>
          <meta name="msapplication-TileColor" content="#ffffff"/>
          <meta
              name="msapplication-TileImage"
              content="/public/favicon-144x144.png"
          />
          <meta name="msapplication-config" content="/public/browserconfig.xml"/>
          <link rel="manifest" href="/public/manifest.json"/>
          <meta name="theme-color" content="#ffffff"></meta>

          <meta name="twitter:site" content={`@${process.env.TWITTER_USERNAME}`}/>
          <meta
              name="twitter:creator"
              content={`@${process.env.TWITTER_USERNAME}`}
          />

          {childrenElements}


          <script type="text/javascript">
              {`
                    window.VARIABLES = {
                        VISITOR_TOKEN: 'visitorToken',
                        UUID_HASH: 'uuidHash',
                        CACHE_ID: 'cacheId',
                        HISTORIES: 'histories'
                    }
              `}
          </script>


          <script async data-cfasync="false" src="https://cdn.pubfuture-ad.com/v2/unit/pt.js" type="text/javascript"></script>

          
      </head>
  );
};

export default BaseHead;
