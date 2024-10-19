import React from 'react';
import { Shield, Clock, CreditCard } from 'lucide-react';

const AboutService = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-indigo-900 text-center mb-12">Om tjenesten</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <div className="space-y-6">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Trygg og konfidensiell</h3>
                  <p className="text-gray-600">
                    HeiDoktor tilbyr pålitelig medisinsk rådgivning fra erfarne leger. Vår tjeneste er 100% konfidensiell og sikker.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-6 w-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Rask respons</h3>
                  <p className="text-gray-600">
                    Få et grundig svar på ditt medisinske spørsmål innen 24 timer. Vår tjeneste er lett tilgjengelig når du trenger det.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CreditCard className="h-6 w-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Rimelig pris</h3>
                  <p className="text-gray-600">
                    For kun 299 kr får du profesjonell medisinsk rådgivning. Betal enkelt og trygt med Vipps.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-red-600 font-semibold">
                Merk: Dette er ikke en akuttjeneste. Ved medisinske nødstilfeller, ring 113.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="https://res.cloudinary.com/dm897nueu/image/upload/v1729068129/p5oxhsuih6me3898upng.jpg"
              alt="Lege"
              className="rounded-full w-64 h-64 object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutService;