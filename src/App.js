import React from 'react';
import { UrlFormSection } from './urlForm';
import { UrlListSection } from './urlList';

function App() {
  return (
    <main className='flex w-full h-screen min-h-screen max-h-screen'>
      <UrlFormSection />
      <UrlListSection />
    </main>
  );
}

export default App;