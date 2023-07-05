import React, { useState } from 'react';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';

export function UrlFormSection() {
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
  
        try {
            fetch(`${backendUrl}/api/short`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: sendData,
            }).then(async response => {
            if (response.status === 201) {
                let data = await response.json();
                console.log(data);
                iziToast.success({
                    position: 'topRight',
                    message: data.message,
                });
                setShortUrl(`${backendUrl}/short/${data.shortUrl}`);

                let createBtn = document.getElementById('createBtn');
                let createBtnIcon = createBtn.querySelector('.btn-icon');

                createBtnIcon.classList.remove('fa-link');
                createBtnIcon.classList.add('fa-check');
                setTimeout(() => {
                    createBtnIcon.classList.remove('fa-check');
                    createBtnIcon.classList.add('fa-link');
                }, 1000);
                
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

    const copyUrl = (button) => {
        let shortUrlField = document.getElementById('shortUrlField');

        navigator.clipboard.writeText(shortUrlField.value)
        .then(function() {
            let copyBtn = document.getElementById('copyBtn');
            let copyBtnIcon = copyBtn.querySelector('.btn-icon');

            copyBtnIcon.classList.remove('fa-clipboard');
            copyBtnIcon.classList.add('fa-check');
            setTimeout(() => {
                copyBtnIcon.classList.remove('fa-check');
                copyBtnIcon.classList.add('fa-clipboard');
            }, 1000);
        })
        .catch(function(error) {
            console.error("Failed to copy text: ", error);
        });
    };

    return(
        <section className="w-4/6 h-full min-h-full bg-slate-800 flex flex-col items-center justify-center">
            <div className="w-1/3 h-fit min-h-fit bg-white rounded-xl px-10 py-8 text-center flex flex-col justify-center space-y-5">
                <h1 className='text-2xl font-bold mb-3'>MayUrl Shortener</h1>
                <div className='w-full flex justify-between space-x-3'>
                    <input
                        id='longUrlField'
                        className='w-full border-solid bg-orange-400 rounded-md px-4 py-3 text-white placeholder:text-white focus:ring-2 focus:ring-orange-600 focus:border-orange-600 focus:outline-0'
                        type="text"
                        placeholder="Enter a long URL"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                    />
                    <button id='createBtn' className='w-fit px-4 py-3 bg-orange-400 rounded-md text-white focus:ring-2 focus:ring-orange-600 focus:border-orange-600' onClick={handleShorten}>
                        <i class="btn-icon fa-solid fa-link"></i>
                    </button>
                </div>
                {shortUrl && (
                    <div className='w-full flex text-center justify-between space-x-3'>
                        <input
                            id='shortUrlField'
                            className='w-full border-solid bg-blue-400 rounded-md px-4 py-3 text-white placeholder:text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-0'
                            type="text"
                            placeholder={shortUrl}
                            value={shortUrl}
                            readOnly
                        />
                        <button id='copyBtn' className='w-fit px-5 py-3 bg-blue-400 rounded-md text-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600' onClick={copyUrl}>
                            <i class="btn-icon fa-solid fa-clipboard"></i>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};