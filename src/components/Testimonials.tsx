import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sara Johansen',
      text: "Jeg fikk et raskt og grundig svar på mitt medisinske spørsmål. Legens råd var uvurderlig!",
      rating: 5,
    },
    {
      name: 'Mikael Chen',
      text: 'Bekvemmeligheten ved å få ekspertråd hjemmefra er fantastisk. Sterkt anbefalt!',
      rating: 5,
    },
    {
      name: 'Emma Rodriguez',
      text: 'Jeg var bekymret for et symptom og fikk beroligelse innen timer. Denne tjenesten er en game-changer.',
      rating: 4,
    },
  ];

  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Hva våre pasienter sier</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{testimonial.text}</p>
              <p className="font-semibold text-indigo-600">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;