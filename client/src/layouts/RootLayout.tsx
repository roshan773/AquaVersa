import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-[#f8fafc] relative">
      {/* Background Mesh Overlay */}
      <div className="bg-mesh fixed inset-0 z-0 opacity-40"></div>
      
      <Navbar />
      
      <main className="flex-grow z-10">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};
export default RootLayout;
