import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue text-brand-off-white p-8 text-center mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="text-sm">
          <p>&copy; {currentYear} Henrique Silvério</p>
          <p>Projeto Desenvolvido com React, Typescript, Tailwind CSS e jotai</p>
        </div>
        <div className="flex justify-center space-x-4">
          <a href="https://www.linkedin.com/in/henrique-b-silverio/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">LinkedIn</a>
          <a href="https://github.com/HenrySilverio/case-new-ecommerce-montink" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">GitHub</a>
          <a href="silveriohenriqueb@gmail.com" className="hover:text-orange-400">Email</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;