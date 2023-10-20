function HeaderUsers(){
    
    return(
        <div>
            <header className="bg-gray-50">
                <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-60 lg:py-10">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-1 items-center justify-between gap-8 sm:justify-end">
                            <div className="flex gap-4">

                            <a
                                href="#"
                                className="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
                            >
                                <span 
                                className="sr-only"
                                >Academy</span>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                >
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path
                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                />
                                </svg>
                            </a>

                            <a
                                href="#"
                                className="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
                            >
                                <span className="sr-only">Notifications</span>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                                </svg>
                            </a>
                            </div>

                            <div
                            className="group flex shrink-0 items-center rounded-lg transition"
                            >
                            <img
                                alt="Man"
                                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                className="h-10 w-10 rounded-full object-cover"
                            />

                            <p className="ms-2 hidden text-left text-xs sm:block">
                                <strong className="block font-medium">Eric Frusciante</strong>

                                <span className="text-gray-500"> eric@frusciante.com </span>
                            </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Welcome Back, Barry!
                        </h1>

                        <p className="mt-1.5 text-sm text-gray-500">
                            Your website has seen a 52% increase in traffic in the last month. Keep
                            it up! 🚀
                        </p>
                    </div>
                </div>
            </header> 
        </div>
    )
}

export default HeaderUsers