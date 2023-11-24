import { useEffect, useState } from "react";
import ToolsMenu from "./ToolsMenu";
import { useNavigate } from "react-router-dom";

function SideMenu(){

    const navigate = useNavigate();
    const [ userName, setUserName ] = useState();
    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const user = JSON.parse(localStorage?.getItem("user"));
            setUserName(user);
          }
    }, [])
    const signOut = () => {
        localStorage.removeItem('token')
        navigate("/");
    }

    const letter = (str) => {
        return str ? str.charAt(0).toUpperCase() + str.slice(1)  : '';
    };
    

    return (
        <div>
            <div className="flex h-screen w-16 flex-col justify-between border-e bg-white">
                <div>
                    <div className="inline-flex h-16 w-16 items-center justify-center">
                    {userName?.name && (
                        <span className="grid h-10 w-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                            {letter(userName.name[0])}
                        </span>
                    )}
                    </div>

                    <ToolsMenu />
                    
                </div>

                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
                    <form action="/logout">
                    <button
                        type="button"
                        onClick= {signOut}
                        className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 opacity-75"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                        </svg>

                        <span
                        className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                        >
                        Logout
                        </span>
                    </button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default SideMenu