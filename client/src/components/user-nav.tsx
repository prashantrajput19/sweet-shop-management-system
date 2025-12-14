import useLocalStorage from "@/hooks/useLocalStorage";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

export default function UserNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, clearUser } = useUser();

    const [, setAccessToken] = useLocalStorage<string | null>("accessToken", null);
    const [, setRefreshToken] = useLocalStorage<string | null>("refreshToken", null);

    const handleLogout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        clearUser();
        navigate('/login');
    };

    return (
        <div className="flex justify-between items-center px-4 md:px-6">
            <h2 className="text-2xl font-semibold">
                {location.pathname === '/purchased' ?
                    "Purchased Sweets"
                    :
                    `Hi, ${user?.name}`
                }

            </h2>
            {user && <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>{user.name}</DropdownMenuItem>
                    <DropdownMenuItem>{user.email}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="cursor-pointer" onClick={() => navigate('/purchased')}>Purchased</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="cursor-pointer" onClick={handleLogout}>Logout</DropdownMenuLabel>
                </DropdownMenuContent>
            </DropdownMenu>}
        </div>
    )
}
