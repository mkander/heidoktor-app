import React from 'react';
import { CheckCircle } from 'lucide-react';

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">Takk!</h1>
      <p className="text-xl text-gray-600 text-center mb-8">
        Ditt medisinske spørsmål er sendt inn. Våre leger vil svare deg snart.
      </p>
      <a
        href="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Tilbake til forsiden
      </a>
    </div>
  );
};

export default ThankYou;