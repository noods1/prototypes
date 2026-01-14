import React from 'react';
import { Navbar } from '@/components/Navbar';
import { CatalogList } from '@/components/CatalogList';

const Index = () => {
  return (
    <div className="overflow-hidden bg-[#ECECED] h-screen flex flex-col">
      <Navbar />
      <CatalogList />
    </div>
  );
};

export default Index;
