import { IoMdLogOut } from "react-icons/io";
import useLogout from "../hooks/useLogout";

const LogoutButton = () => {
    const logout = useLogout()
    return (
        <div>
            <IoMdLogOut className="w-6 h-6 text-white cursor-pointer"
                onClick={logout}
            />
        </div>
    )
}

export default LogoutButton;