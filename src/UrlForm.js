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
                position: 'bottomRight',
                message: 'Long URL is required',
                close: true,
                backgroundColor: '#BC6C25',
                progressBarColor: '#DDA15E',
                messageColor: '#FEFAE0',
                timeout: 2000,
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
                    position: 'bottomRight',
                    message: data.message,
                    close: true,
                    backgroundColor: '#606C38',
                    progressBarColor: '#FEFAE0',
                    messageColor: '#FEFAE0',
                    timeout: 2000,
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
                    position: 'bottomRight',
                    message: 'Erro ao salvar, verifique o console',
                    close: true,
                    backgroundColor: '#BC6C25',
                    progressBarColor: '#DDA15E',
                    messageColor: '#FEFAE0',
                    timeout: 2000,
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
        <section className="w-4/5 h-full min-h-full bg-hero-pattern bg-center bg-cover flex flex-col items-center justify-center text-[#FEFAE0]">
            <div className="w-1/3 h-fit min-h-fit bg-[#606C38] rounded-xl px-10 py-8 text-center flex flex-col justify-center space-y-5 shadow-2xl">
                <h1 className="text-4xl mb-3 font-['Caprasimo']">WeShort</h1>
                <div className='w-full flex justify-between space-x-3'>
                    <input
                        id='longUrlField'
                        className='w-full border-solid bg-[#283618] rounded-md px-4 py-3 focus:ring-2 focus:ring-[#BC6C25] focus:border-[#BC6C25] focus:outline-0'
                        type="text"
                        placeholder="Enter a long URL"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                    />
                    <button id='createBtn' className='w-fit max-w-[51px] px-4 py-3 bg-[#283618] rounded-md focus:ring-2 focus:ring-[#BC6C25] focus:border-[#BC6C25]' onClick={handleShorten}>
                        <i className="btn-icon fa-solid fa-link"></i>
                    </button>
                </div>
                {shortUrl && (
                    <div className='w-full flex text-center justify-between space-x-3'>
                        <input
                            id='shortUrlField'
                            className='w-full border-solid bg-[#283618] rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-0'
                            type="text"
                            placeholder={shortUrl}
                            value={shortUrl}
                            readOnly
                        />
                        <button id='copyBtn' className='w-fit max-w-[51px] px-5 py-3 bg-[#283618] rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600' onClick={copyUrl}>
                            <i className="btn-icon fa-solid fa-clipboard"></i>
                        </button>
                    </div>
                )}
            </div>
            <span className='absolute bottom-5 left-5 italic'>Image by <a className='underline' href='https://unsplash.com/@trapnation'>Andre Benz</a> at <a className='underline' href='https://unsplash.com/'>Unsplash</a>.</span>
        </section>
    );
};