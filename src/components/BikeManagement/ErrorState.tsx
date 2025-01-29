import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <AlertTriangle className="h-16 w-16 text-red-600 mx-auto" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
          Une erreur est survenue
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{message}</p>
      </div>
    </div>
  );
};