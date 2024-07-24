import React from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';

const ForceGraph = ({ graphData, onNodeClick }) => {
  return (
    <ForceGraph3D
      graphData={graphData}
      nodeLabel="name"
      nodeColor={node => node.color}
      onNodeClick={onNodeClick}
      nodeThreeObject={(node) => {
        const sprite = new SpriteText(node.name);
        sprite.color = node.color;
        sprite.textHeight = 8;
        return sprite;
      }}
      linkWidth={1}
      linkColor={() => '#ffffff'}
      backgroundColor="#000011"
    />
  );
};

export default ForceGraph;