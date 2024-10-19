import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentConfirmation = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">Betaling mottatt!</h1>
      <p className="text-xl text-gray-600 text-center mb-8 max-w-md">
        Takk for din betaling. Ditt medisinske spørsmål er nå sendt til våre leger for vurdering.
      </p>
      <p className="text-lg text-gray-600 text-center mb-8 max-w-md">
        Du vil motta et svar innen 24 timer på e-postadressen du har oppgitt.
      </p>
      <Link
        to="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Tilbake til forsiden
      </Link>
    </div>
  );
};

export default PaymentConfirmation;