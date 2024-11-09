
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { useState } from "react";
import '../css/login.css';
import { useAuthContext } from '../context/AuthContext';
import toast from "react-hot-toast";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { setAuthUser } = useAuthContext();
    const [loading, setloading] = useState(false);

    const login = async (username, password) => {

        const success = handleInputErrors(username, password);
        if (!success) return;
        setloading(true)
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            localStorage.setItem("sphere-user", JSON.stringify(data))
            setAuthUser(data)

        } catch (error) {
            toast.error(error.message)
        } finally {
            setloading(false)
        }
    }


    function handleInputErrors(username, password) {
        if (!username || !password) {
            toast.error("Please fill out all the fields!")
            return false;
        }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password)
    }
    return (
        <div className='flex flex-col items-center justify-center min-w-96 max-auto rounded-[25px] '>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border-t-2 border-l-2 border-r-2 border-b-2'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    LOGIN
                    <span className='text-yellow-300 pl-2 font-semibold'> tracker </span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="pt-5">
                            <input type="text" className='p-6 w-full rounded-md input input-bordered h-10' autoComplete="On"
                                placeholder='Enter username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                            <FaRegUser className='absolute right-2 top-1/2 -translate-y-1/2' />
                        </div>
                    </div>
                    <div>
                        <div className="pt-5">
                            <input type="password" placeholder='Enter password' className='w-full p-6 rounded-md input input-bordered h-10' autoComplete="On"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <Link to="/signup" className=' pb-3 text-sm hover:underline text-white hover:text-red-400 mt-4 inline-block'>

                        Don't have an account!
                    </Link>
                    <div>
                        <button className='bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-md w-full h-12 transition duration-200 ease-in-out'>
                            {loading ? <span className='loading loading-spinner'></span> : "    Log IN"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;