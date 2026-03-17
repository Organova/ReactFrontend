import { ChevronFirst, ChevronLast } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Divider} from "@heroui/react";

import SidebarItem from "@/components/SidebarItem.tsx";
import { useSidebarStore } from "@/stores/sidebarStore.ts";
import UserAvatar from "@/components/UserAvatar.tsx";
import useUserStore from "@/stores/useUserStore.ts";
import UserLogIn from "@/components/UserLogIn.tsx";

const Sidebar = () => {
  const { isOpen, toggleOpen, items, toggleActive } = useSidebarStore();
  const {loggedIn} = useUserStore()

  const navigate = useNavigate();

  const children = items.map((item) => (
    <SidebarItem
      key={item.id}
      active={item.active}
      alert={item.alert}
      icon={item.icon}
      onclick={() => {
        toggleActive(item.id);
        navigate(item.path);
      }}
      text={item.text}
    />
  ));

  return (
    <aside
      className={`h-full transition-all duration-200 ease-in-out ${isOpen ? "w-64" : "w-14"} flex-shrink-0`}
    >
      <nav className="h-full flex flex-col shadow-sm">
        <div className="p-4 pb-2 flex items-center justify-between">
          <h4
            className={`overflow-hidden transition-all ${isOpen ? "w-32" : "w-0"}`}
          >
            Sidebar
          </h4>
          <button
            className="p-1.5 rounded-lg cursor-pointer"
            onClick={() => toggleOpen()}
          >
            {isOpen ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex-1 px-1">{children}</ul>

        <Divider className="w-full" />

        <div className="flex items-center p-4">
            {loggedIn ? <UserAvatar/> : <UserLogIn/>}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
