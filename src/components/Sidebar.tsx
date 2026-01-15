import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Divider, Avatar} from "@heroui/react";

import SidebarItem from "@/components/SidebarItem.tsx";
import { useSidebarStore } from "@/stores/sidebarStore.ts";

const Sidebar = () => {
  const { isOpen, toggleOpen, items, toggleActive } = useSidebarStore();
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
      className={`h-full transition-all duration-200 ease-in-out ${isOpen ? "w-52" : "w-14"} flex-shrink-0`}
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
          <Avatar className="md flex-shrink-0" name="John Doe" />
          <div className="ml-3 flex-1 min-w-0 flex items-center justify-between">
            <div
              className={`overflow-hidden transition-all ${isOpen ? "w-full" : "w-0"}`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs">johndoe@gmail.com</span>
              </div>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
