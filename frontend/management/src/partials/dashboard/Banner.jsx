import React, { useState } from "react";

function Banner() {
  const [bannerOpen, setBannerOpen] = useState(true);
  const query = new URLSearchParams(location.search);
  const template = query.get("template");
  const liteLink =
    template === "laravel"
      ? "https://github.com/cruip/laravel-tailwindcss-admin-dashboard-template"
      : "https://github.com/cruip/tailwind-dashboard-template";

  return (
    <>
      {bannerOpen && (
        <div className="right-0 md:right-12 bottom-0 md:bottom-8 z-50 fixed w-full md:w-auto">
          <div className="flex justify-between dark:border-slate-700 bg-slate-800 shadow-lg p-3 border border-transparent md:rounded text-slate-50 text-sm">
            <div className="inline-flex text-slate-500">
              <a
                className="font-medium text-slate-50 hover:underline"
                href={liteLink}
                target="_blank"
                rel="noreferrer"
              >
                Download<span className="sm:inline hidden"> on GitHub</span>
              </a>{" "}
              <span className="px-1.5 italic">or</span>{" "}
              <a
                className="font-medium text-emerald-400 hover:underline"
                href="https://cruip.com/mosaic/"
                target="_blank"
                rel="noreferrer"
              >
                Check Premium Version
              </a>
            </div>
            <button
              className="border-gray-700 ml-3 pl-2 border-l text-slate-500 hover:text-slate-400"
              onClick={() => setBannerOpen(false)}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-4 h-4 fill-current shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;
