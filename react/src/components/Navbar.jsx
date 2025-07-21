import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { initFlowbite } from 'flowbite';

export default function Navbar() {
    const toggleDark = () => {
        document.documentElement.classList.toggle('dark');
    };

    const location = useLocation();

    useEffect(() => {
        initFlowbite(); // Re-initialize Flowbite on every route change
    }, [location.pathname]);

    return (
        <nav className="bg-yellow-400 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap mx-4 dark:text-white">SMS</span>
                </a>

                <button
                    data-collapse-toggle="navbar-user"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-user"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>

                <div className="hidden w-full md:flex md:w-auto mx-auto" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-yellow-400 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link
                                to="/home"
                                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                            >Home</Link>
                        </li>
                        <li>
                            <Link
                                to="/addStudent"
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >Add Student</Link>
                        </li>
                        <li>
                            <Link
                                to="/attendance"
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >Attendance</Link>
                        </li>

                        <li>
                            <button
                                onClick={toggleDark}
                                className="px-3 py-2 bg-transparent text-gray-900 dark:text-white rounded hover:bg-gray-600"
                            >
                                Toggle Mode
                            </button>
                        </li>

                        <li>
                            <Link
                                to="/"
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >Sign Out</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
