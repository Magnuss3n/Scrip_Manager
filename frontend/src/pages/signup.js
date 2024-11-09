import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import '../css/signup.css';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';


const Signup = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    })
    const { setAuthUser } = useAuthContext()

    const [loading, setLoading] = useState(false);

    const handleInputErrors = ({ username, password, confirmPassword }) => {
        if (!username || !password || !confirmPassword) {
            toast.error('Please fill in all the fields');
            return false;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Password doesn't match");
            return false;
        }
        return true;
    };
    const signup = async ({ username, password }) => {
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }

            //localstorage
            localStorage.setItem("tracker_user", JSON.stringify(data))
            //context
            setAuthUser(data)

            if (!res.ok) {
                throw new Error(data.message || 'Signup failed');
            }
            console.log("Response data:", data); // Log response data
            toast.success("Signup successful");
        } catch (error) {
            toast.error(error.message);
            console.error("Error:", error); // Log any error
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = handleInputErrors(inputs);
        if (!success) return;
        setLoading(true);
        await signup(inputs);
    }

    return (

        <div className='relative flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='signup-container'>
                <div className='signup-content'>
                    <h1 className='pb-9 text-3xl font-semibold text-center text-gray-300'>
                        SIGNUP
                        <span className='text-yellow-300 pl-2 font-semibold'> Tracker </span>
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className='relative'>
                                <label className='custom-field'>
                                    <input type="text" required autoComplete='on'
                                        value={inputs.username}
                                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                                    />
                                    <span className='placeholder'>Enter Username</span>
                                    <FaRegUser className='absolute right-2 top-7 -translate-y-1/2' />
                                </label>
                            </div>
                        </div>

                        <div>
                            <div className='pt-7'>
                                <label className='custom-field'>
                                    <input type="password" required autoComplete='on'
                                        value={inputs.password}
                                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                    />
                                    <span className='placeholder'>Enter Password</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className='pt-7'>
                                <label className='custom-field'>
                                    <input type="password" required autoComplete='on'
                                        value={inputs.confirmPassword}
                                        onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} />
                                    <span className='placeholder'>Confirm Password</span>
                                </label>
                            </div>
                        </div>
                        <Link to="/login" className='text-sm hover:underline text-white hover:text-red-400 mt-4 inline-block'>

                            Already have an account?
                        </Link>


                        <div className='pt-4'>
                            <button className='bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-md w-full h-12 transition duration-200 ease-in-out' >
                                {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default Signup