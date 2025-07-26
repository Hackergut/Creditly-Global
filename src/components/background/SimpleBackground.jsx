import React from 'react';

// Componente background ottimizzato con maggiore luminosità
export default React.memo(function SimpleBackground({ children }) {
  return (
    <div className="min-h-screen antialiased overflow-x-hidden text-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects con luminosità aumentata */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-400/15 via-transparent to-transparent pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-400/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400/5 via-transparent to-transparent pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});