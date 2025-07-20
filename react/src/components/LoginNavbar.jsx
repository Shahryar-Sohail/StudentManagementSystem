import React from 'react';
import { Link } from 'react-router-dom';
import Home from '../pages/Home';
import AddStudent from '../pages/AddStudent';

export default function LoginNavbar() {
    return (
        <>

            <nav className="bg-yellow-400 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SMS</span>
                    </a>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <ul className="py-2 bg-yellow-400" aria-labelledby="user-menu-button">
                            <li>
                                <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                            </li>
                        </ul>
                        
                        
                    </div>
                    
                </div>
            </nav>

        </>






    );
}
