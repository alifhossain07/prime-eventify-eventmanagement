// components/LoadingPage.tsx
import React from 'react';

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <span className="loading loading-bars loading-xl text-primary"></span>
      <p className="mt-4 text-gray-600 font-semibold">Loading, please wait...</p>
    </div>
  );
};

export default LoadingPage;
