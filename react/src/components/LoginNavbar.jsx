

export default function LoginNavbar() {
    return (
        <>
            <nav className="bg-yellow-400 dark:bg-gray-900 py-3">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className=" text-2xl italic text-gray-600 font-semibold whitespace-nowrap dark:text-white">Student Management System</span>
                    </a>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    </div>
                </div>
            </nav>
        </>
    );
}
