import React from "react";
import {Avatar} from "@heroui/react";
import {MoreVertical} from "lucide-react";
import {useSidebarStore} from "@/stores/sidebarStore.ts";
import useUserStore from "@/stores/useUserStore.ts";

const UserAvatar: React.FC = () => {
    const { isOpen } = useSidebarStore();
    const {firstName, lastName, email} = useUserStore();

    return (
        <div className="flex items-center w-full min-w-0">
            <Avatar className="flex-shrink-0" name={`${firstName} ${lastName}`} />
            <div className={`ml-3 flex-1 min-w-0 flex items-center justify-between overflow-hidden transition-all duration-200 ${isOpen ? "w-full opacity-100" : "w-0 opacity-0"}`}>
                <div className="leading-4 min-w-0">
                    <h4 className="font-semibold truncate">{firstName} {lastName}</h4>
                    <span className="text-xs truncate block">{email}</span>
                </div>
                <MoreVertical className="flex-shrink-0 ml-2" size={20} />
            </div>
        </div>
    );
};

export default UserAvatar;