
import React from 'react';

const stats = [
  { label: '项目总数', value: '100+' },
  { label: 'UI设计案例', value: '50+' },
  { label: '开发对接', value: '30+' },
  { label: '客户好评', value: '96.7%' },
];

export const Stats: React.FC = () => {
  return (
    <div className="bg-cream border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-2">
              <h3 className="text-4xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-500 font-medium tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
