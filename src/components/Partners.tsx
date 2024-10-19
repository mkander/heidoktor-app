import React from 'react';

const Partners = () => {
  const partners = [
    { name: 'Vitusapotek', logo: 'https://res.cloudinary.com/dm897nueu/image/upload/v1729068442/qopsxxz1ysssxsfmbtdk.jpg' },
    { name: 'Boots apotek', logo: 'https://res.cloudinary.com/dm897nueu/image/upload/v1729068442/uwzi3dkxuyaevlt1z6ca.jpg' },
    { name: 'Apotek 1', logo: 'https://res.cloudinary.com/dm897nueu/image/upload/v1729068442/czklf3zy2ivi8y9hybpb.jpg' },
  ];

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Våre betrodde partnere</h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {partners.map((partner, index) => (
            <div key={index} className="flex justify-center items-center">
              <img src={partner.logo} alt={partner.name} className="h-12 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;