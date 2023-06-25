import React, { useState } from 'react';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const backendUrl = 'http://localhost:5000';

  const handleShorten = async () => {

    if (!longUrl) {
      iziToast.error({
        position: 'topRight',
        message: 'Long URL is required',
      });
      return;
    }

    let sendData = JSON.stringify({
      "longUrl" : longUrl,
    });
    console.log(sendData);

    try {
      fetch(`${backendUrl}/api/short`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: sendData,
      }).then(async response => {
        if (response.status == 201) {
          let data = await response.json();
          console.log(data);
          iziToast.success({
            position: 'topRight',
            message: data.message,
          });
          setShortUrl(`${backendUrl}/short/${data.shortUrl}`);
        } else {
          throw new Error(response.statusText);
        }
      }).catch(error => {
        console.error(error);
        iziToast.error({
          position: 'topRight',
          message: 'Erro ao salvar, verifique o console.',
        });
      });
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter a long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />
      <button onClick={handleShorten}>Shorten</button>
      {shortUrl && (
        <div>
          <h2>Short URL:</h2>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;