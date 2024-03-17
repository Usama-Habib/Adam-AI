import React, { FC } from 'react';

type PlanFeature = string;

interface Plan {
  name: string;
  price: string;
  features: PlanFeature[];
  buttonText: string;
  link: string;
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: '25',
    features: [
      '100 Generations incl.',
      '1 GB Storage',
      'Leverage from the power of all our tools',
    ],
    buttonText: 'Our Starter',
    link: '#starter',
  },
  {
    name: 'Premium',
    price: '99',
    features: [
      '750 Generations incl.',
      '2 GB Storage',
      'Priority Support',
      'Smart Notifications',
    ],
    buttonText: 'Get Premium',
    link: '#premium',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '299',
    features: [
      '2500 Generations incl.',
      'API-Access',
      'Bulk Export',
      'Advanced Analytics',
      'Advanced Security',
    ],
    buttonText: 'Become Enterprise',
    link: '#enterprise',
  },
];

const PricingSection: FC = () => (
  <div className="py-12 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:flex-wrap -mx-4">
        {plans.map((plan, index) => (
          <div key={index} className={`w-full sm:w-1/3 px-4 mb-6 sm:mb-0 ${plan.highlighted ? 'sm:-mt-6' : ''}`}>
            <div className={`shadow-lg rounded-2xl p-6 ${plan.highlighted ? 'bg-yellow-100' : 'bg-white'} transform transition-all duration-300 hover:scale-105`}>
              <h3 className="text-2xl font-semibold text-center text-gray-700">{plan.name}</h3>
              <p className="text-center text-gray-500">{`Starts at $${plan.price}`}</p>
              <ul className="my-6 space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <svg className="w-6 h-6 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a href={plan.link} className={`block w-full py-3 text-center rounded-lg ${plan.highlighted ? 'bg-yellow-600 text-white' : 'bg-blue-600 text-white'} hover:scale-110 transform transition-all duration-300`}>
                {plan.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PricingSection;
