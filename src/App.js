import React, { useState } from 'react';
import ForceGraph from './components/ForceGraph';
import AIChatNode from './components/AIChatNode';
import { graphData } from './data/graphData';

const App = () => {
  const [showAIChat, setShowAIChat] = useState(false);

  const handleNodeClick = (node) => {
    if (node.id === 'center') {
      setShowAIChat(true);
    }
  };

  return (
    <div className="h-screen w-full relative font-sans">
      <ForceGraph 
        graphData={graphData} 
        onNodeClick={handleNodeClick}
      />
      {showAIChat && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
          <AIChatNode onClose={() => setShowAIChat(false)} />
        </div>
      )}
    </div>
  );
};

export default App;