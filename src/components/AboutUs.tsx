import React from 'react';
import { MessageSquare, UserCheck, Stethoscope } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Så enkelt er det</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-indigo-600" />
            <h3 className="mt-6 text-xl font-medium text-gray-900">1. Send inn melding</h3>
            <p className="mt-2 text-base text-gray-500">Beskriv dine symptomer eller still ditt medisinske spørsmål via vårt enkle skjema.</p>
          </div>
          <div className="text-center">
            <UserCheck className="mx-auto h-12 w-12 text-indigo-600" />
            <h3 className="mt-6 text-xl font-medium text-gray-900">2. Legen vurderer forespørselen</h3>
            <p className="mt-2 text-base text-gray-500">En kvalifisert lege gjennomgår din henvendelse og forbereder en grundig vurdering.</p>
          </div>
          <div className="text-center">
            <Stethoscope className="mx-auto h-12 w-12 text-indigo-600" />
            <h3 className="mt-6 text-xl font-medium text-gray-900">3. Få råd og behandling</h3>
            <p className="mt-2 text-base text-gray-500">Motta personlige medisinske råd og eventuell behandlingsplan direkte fra legen.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;