import { useState } from 'react';
import MenuView from './views/MenuView.jsx';
import ExplainView from './views/ExplainView.jsx';
import SimulatorView from './views/SimulatorView.jsx';

export default function App() {
  const [view, setView] = useState('menu'); // 'menu' | 'explain' | 'simulator'
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  const goToMenu = () => setView('menu');

  const selectAlgorithm = (algoId) => {
    setSelectedAlgorithm(algoId);
    setView('explain');
  };

  const goToSimulator = () => setView('simulator');
  const goToExplain = () => setView('explain');

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.12'/%3E%3C/svg%3E\")",
          backgroundSize: '240px 240px',
        }}
      />
      {view === 'menu' && (
        <MenuView onSelect={selectAlgorithm} />
      )}
      {view === 'explain' && (
        <ExplainView
          algorithmId={selectedAlgorithm}
          onBack={goToMenu}
          onSimulate={goToSimulator}
        />
      )}
      {view === 'simulator' && (
        <SimulatorView
          algorithmId={selectedAlgorithm}
          onBack={goToExplain}
          onMenu={goToMenu}
        />
      )}
    </div>
  );
}
