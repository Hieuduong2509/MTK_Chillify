import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center mx-auto max-w-7xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
          404
        </h1>
        <p className="mb-5 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
          Something's missing.
        </p>
        <p className="mb-5 text-lg font-light text-gray-500 dark:text-gray-400">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.{" "}
        </p>
        <a
          className="inline-flex items-center justify-center h-12 px-6 py-3.5 gap-2.5 cursor-pointer bg-primary hover:bg-hover text-white font-medium rounded-lg transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          onClick={() => navigate("/")}
        >
          <span className="material-symbols-outlined text-[1.25rem]">
            arrow_back
          </span>
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
