import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, Thermometer, Baby, Brain, Stethoscope, Pill, Activity, Heart, Droplet } from 'lucide-react';

const TreatmentConditions = () => {
  const [showAll, setShowAll] = useState(false);
  const [showUntreatable, setShowUntreatable] = useState(false);

  const treatableConditions = [
    { name: 'Allergi', icon: Droplet },
    { name: 'Amming', icon: Baby },
    { name: 'Angst og uro', icon: Brain },
    { name: 'Astma', icon: Stethoscope },
    { name: 'Barnesykdommer', icon: Baby },
    { name: 'Bihulebetennelse', icon: Thermometer },
    { name: 'Covid 19', icon: Activity },
    { name: 'Depresjon', icon: Brain },
    { name: 'Diaré og oppkast', icon: Droplet },
    { name: 'Eksem', icon: Droplet },
    { name: 'Elveblest', icon: Droplet },
    { name: 'Ensomhet og isolasjon', icon: Brain },
    { name: 'Erektil dysfunksjon – impotens', icon: Heart },
    { name: 'Fordøyelsesplager', icon: Stethoscope },
    { name: 'Forkjølelse', icon: Thermometer },
    { name: 'Henvisning', icon: Stethoscope },
    { name: 'Hudproblemer', icon: Droplet },
    { name: 'Selvfølelse', icon: Brain },
    { name: 'Legeerklæring', icon: Stethoscope },
    { name: 'Krise- og stressreaksjoner', icon: Brain },
    { name: 'Luftveisinfeksjon', icon: Stethoscope },
    { name: 'Migrene og hodepine', icon: Brain },
    { name: 'Muskel- og skjelettlidelser', icon: Stethoscope },
    { name: 'Prevensjon', icon: Pill },
    { name: 'Psykiske plager', icon: Brain },
    { name: 'Resept', icon: Pill },
    { name: 'Skabb', icon: Droplet },
    { name: 'Stikk og bitt', icon: Droplet },
    { name: 'Søvnproblemer og insomni', icon: Brain },
    { name: 'Urinveisinfeksjon', icon: Droplet },
    { name: 'Vaksine', icon: Stethoscope },
    { name: 'Øyeinfeksjon', icon: Droplet }
  ];

  const untreatableConditions = [
    'Brystsmerter', 'Kraftig blødning', 'Pustevansker', 'Hodeskader', 'Benbrudd', 'Plutselig og alvorlig smerte',
    'Moderat og omfattende brannskade', 'Psykose og forvirring', 'Kramper', 'Akutt synstap',
    'Noder / svulster (nyoppståtte kuler i testikkel, bryst eller i huden)', 'Feber hos spedbarn fra 0-6 måneder',
    'Justering av fast medisin', 'Resepter på vanedannende stoffer', 'Ingen bilde- / videoundersøkelser av kjønnsorganer eller lignende',
    'Trafikkulykke', 'Strømskader / støt', 'Fall fra høyder', 'Mistanke om hjernehinnebetennelse', 'Bevisstløshet',
    'Akutt svimmelhet', 'Akutt og alvorlig allergisk reaksjon', 'Drukning', 'Mistanke om akutt hjernehendelse (hjerneslag osv.)'
  ];

  const displayedConditions = showAll ? treatableConditions : treatableConditions.slice(0, 9);

  return (
    <div className="bg-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-indigo-900 text-center mb-12">Tilstander vi kan behandle</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {displayedConditions.map((condition, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <condition.icon className="h-8 w-8 text-indigo-600 mr-3" />
              <p className="text-indigo-600 font-medium">{condition.name}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          {!showAll && treatableConditions.length > 9 && (
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
            >
              Vis mer <ChevronDown className="ml-2 h-5 w-5" />
            </button>
          )}
          {showAll && (
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
            >
              Vis mindre <ChevronUp className="ml-2 h-5 w-5" />
            </button>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setShowUntreatable(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            <AlertCircle className="mr-2 h-5 w-5" />
            Tilstander vi ikke kan behandle
          </button>
        </div>

        {showUntreatable && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tilstander vi ikke kan behandle</h3>
              <ul className="list-disc pl-5 space-y-2">
                {untreatableConditions.map((condition, index) => (
                  <li key={index} className="text-gray-700">{condition}</li>
                ))}
              </ul>
              <div className="mt-6 text-right">
                <button
                  onClick={() => setShowUntreatable(false)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Lukk
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreatmentConditions;