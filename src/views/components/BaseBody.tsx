import BaseHeader from "./BaseHeader";
import BaseNav from "./BaseNav";

export const BaseBody = ({children, className, disableAds = false,}: {
  children?: JSX.Element | JSX.Element[];
  className?: string;
  disableAds?: boolean;
}): JSX.Element => {
  const safeChildren = Array.isArray(children) ? children : [children];

  return (
      <body
          className={
              "flex h-full flex-col items-center justify-center overflow-y-scroll bg-slate-50 " +
              (className ? className : "")
          }
      >
      <BaseHeader/>

      <BaseNav/>

      <main className="h-full w-full text-slate-800">
        {children ? safeChildren : null}
      </main>

      <div
          className="fixed right-5 top-5 z-50 hidden max-w-xs rounded-xl border  border-gray-200 bg-white opacity-0 shadow-lg transition-opacity duration-300"
          id="toast"
      >
        <div className="flex p-4">
          <div className="flex-shrink-0">
            <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
              <path
                  d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
            </svg>
          </div>
          <div className="ms-3">
            <p
                className="text-sm text-gray-700 dark:text-gray-400"
                id="toast-message"
            ></p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-5 right-5 z-50 opacity-40 md:bottom-10 md:right-10">
        <button
            aria-label="Back to top"
            id="back-to-top-button"
            className="rounded-md border bg-black p-2 text-white opacity-0 shadow-lg transition-opacity duration-300"
        >
          <svg
              className="m-auto h-4 w-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M12 4.5c.28 0 .53.11.71.29l7 7a1.003 1.003 0 0 1 0 1.42.999.999 0 0 1-1.42 0L13 8.41V19a1 1 0 0 1-2 0V8.41l-5.29 5.3a.999.999 0 1 1-1.42-1.42l7-7A.997.997 0 0 1 12 4.5z"/>
          </svg>
        </button>
      </div>

      <script src={
        process.env.APP_JS
      } type="module"/>


      {
        !disableAds &&
        process.env.ADSENSE_CLIENT ? (
            <script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.ADSENSE_CLIENT}`}
                crossorigin="anonymous"
            />
        ) : null
      }
      </body>
  );
};

export default BaseBody;
