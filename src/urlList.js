// import React, { useState } from 'react';

export function UrlListSection() {
    const handleDelete = async () => {
        console.log('deletando');
    };

    return(
        <section className="w-1/5 h-full min-h-full bg-[#283618] flex flex-col items-center p-5 text-white text-left space-y-5">
            <h1 className="text-xl w-full font-bold text-[#FEFAE0]">My short's</h1>
            <div className="flex bg-[#606C38] w-full h-fit rounded-xl overflow-x-auto">
                <div className="w-4/5 p-5">
                    <h1 className="font-bold underline whitespace-nowrap overflow-hidden text-ellipsis"><a href="http://localhost:5000/short/BtFdhPRda">http://localhost:5000/short/BtFdhPRda</a></h1>
                    <h1 className="text-sm whitespace-nowrap overflow-hidden text-ellipsis italic text-gray-300 mb-2">http://localhost:5000/short/BtFdhPRda</h1>
                    <span className="text-sm text-gray-300">Creation: 24/10/2019 14:35:20</span>
                </div>
                <div className="flex flex-col justify-center items-center w-1/5 border-l border-[#283618]">
                    <button id='createBtn' className='w-full h-full' onClick={handleDelete}>
                        <i className="btn-icon fa-solid fa-xmark"></i>
                    </button>
                    <button id='createBtn' className='w-full h-full border-t border-[#283618]' onClick={handleDelete}>
                        <i class="fa-solid fa-copy"></i>
                    </button>
                </div>
            </div>
        </section>
    );
};