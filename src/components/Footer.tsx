import React from 'react';
import { Heart, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold">HeiDoktor</span>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Ekspertråd fra leger når du trenger det.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Hurtiglenker</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Hjem</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Om oss</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Tjenester</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Kontakt oss</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-indigo-400" />
                <a href="mailto:info@heidoktor.no" className="text-base text-gray-300 hover:text-white">info@heidoktor.no</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-indigo-400" />
                <a href="tel:+4712345678" className="text-base text-gray-300 hover:text-white">+47 123 45 678</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-base text-gray-400">
            © 2024 HeiDoktor. Alle rettigheter reservert.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;