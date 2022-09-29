import React from 'react';
import './App.css';
import PhotoPicker from './PhotoPicker';
import PhotoViewer from './PhotoViewer';

function App() {
  return (
    <div className="container">
      <PhotoPicker/>
      <PhotoViewer/>
    </div>
  );
}

export default App;
