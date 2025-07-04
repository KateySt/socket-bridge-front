'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error page caught:', error);
  }, [error]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="text-gray-700 mb-6">{error.message || 'Unexpected error occurred.'}</p>
      <button
        onClick={() => reset()}
        className="btn btn-outline btn-primary"
      >
        Try again
      </button>
    </div>
  );
}
