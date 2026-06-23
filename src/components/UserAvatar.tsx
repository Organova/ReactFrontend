import React, { useRef, useState } from "react";
import { Avatar } from "@heroui/react";
import { LogOut, MoreVertical } from "lucide-react";
import { useSidebarStore } from "@/stores/sidebarStore.ts";
import useUserStore from "@/stores/useUserStore.ts";
import { useNavigate } from "react-router-dom";

const UserAvatar: React.FC = () => {
    const { isOpen } = useSidebarStore();
    const { username, logout } = useUserStore();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setMenuOpen(false);
        await logout();
        navigate("/login");
    };

    return (
        <div className="flex items-center w-full min-w-0 relative">
            <Avatar className="flex-shrink-0" name={username} />
            <div
                className={`ml-3 flex items-center gap-2 transition-all duration-200 ${isOpen ? "flex-1 min-w-0 opacity-100" : "w-0 opacity-0 pointer-events-none"}`}
            >
                <h4 className="font-semibold flex-1 min-w-0 truncate">{username}</h4>
                <button
                    className="flex-shrink-0 p-1 rounded-md hover:bg-default-100 cursor-pointer"
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    <MoreVertical size={20} />
                </button>
            </div>

            {menuOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setMenuOpen(false)}
                    />
                    <div
                        ref={menuRef}
                        className="absolute bottom-10 right-0 z-50 min-w-[140px] bg-content1 border border-default-200 rounded-lg shadow-lg py-1"
                    >
                        <button
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-danger hover:bg-danger-50 cursor-pointer"
                            onClick={handleLogout}
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserAvatar;