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
    <div className="noise-bg" style={{ minHeight: '100vh' }}>
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
