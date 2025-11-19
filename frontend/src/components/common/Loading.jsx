import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen bg-dark-primary flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-16 h-16 border-4 border-teal-accent border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 font-mono text-sm text-slate-400 uppercase tracking-widest">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
