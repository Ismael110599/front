import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children }) => <div className="border-b pb-4">{children}</div>;

const CardContent = ({ children }) => <div className="pt-4">{children}</div>;

const CardTitle = ({ children }) => <h3 className="text-2xl font-semibold">{children}</h3>;

export { Card, CardHeader, CardContent, CardTitle };
