import React from "react";
import {Button} from "@heroui/react";
import {useSidebarStore} from "@/stores/sidebarStore.ts";
import {useNavigate} from "react-router-dom";

const UserLogIn: React.FC = () => {
    const {isOpen} = useSidebarStore()
    const nav = useNavigate()

    return (
        <>
            <div className={`ml-3 flex-1 min-w-0 flex items-center justify-center overflow-hidden ${isOpen ? "w-full" : "hidden"}`}>
                <Button className={"w-full"} onPress={() => {nav("/login")}}>Login</Button>
            </div>
        </>
    );
};

export default UserLogIn;