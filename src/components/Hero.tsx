import React from 'react';
import { Stethoscope } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-indigo-700 text-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <Stethoscope className="mx-auto h-16 w-16" />
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Ekspertråd fra leger, når som helst
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl">
            Få svar fra sertifiserte leger innen timer. Din helse er vår prioritet.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a href="#consultation-form" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Spør en lege
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;