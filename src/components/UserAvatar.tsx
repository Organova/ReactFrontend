import React from "react";
import {Avatar} from "@heroui/react";
import {MoreVertical} from "lucide-react";
import {useSidebarStore} from "@/stores/sidebarStore.ts";
import useUserStore from "@/stores/useUserStore.ts";

const UserAvatar: React.FC = () => {
    const { isOpen } = useSidebarStore();
    const {firstName, lastName, email} = useUserStore();

    return (
        <>
            <div>
                <Avatar className="md flex-shrink-0" name="John Doe" />
                <div className="ml-3 flex-1 min-w-0 flex items-center justify-between">
                    <div
                        className={`overflow-hidden transition-all ${isOpen ? "w-full" : "w-0"}`}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold">{firstName} {lastName}</h4>
                            <span className="text-xs">{email}</span>
                        </div>
                    </div>
                    <MoreVertical size={20} />
                </div>
            </div>
        </>
    );
};

export default UserAvatar;