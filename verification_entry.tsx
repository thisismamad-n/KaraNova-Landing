import React from 'react';
import { createRoot } from 'react-dom/client';
import Squares from './app/_components/Squares';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <div style={{ width: '800px', height: '600px', position: 'relative', backgroundColor: 'black' }}>
    <Squares />
    <div style={{ position: 'absolute', bottom: -1000, height: '10px' }} id="spacer"></div>
  </div>
);
