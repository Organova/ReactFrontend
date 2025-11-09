import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import SidebarItem from "@/components/SidebarItem.tsx";
import { useSidebarStore } from "@/stores/sidebarStore.ts";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { isOpen, toggleOpen, items, toggleActive } = useSidebarStore();
  const navigate = useNavigate();

  const children = items.map((item) => (
    // eslint-disable-next-line react/jsx-key
    <SidebarItem
      active={item.active}
      alert={item.alert}
      icon={item.icon}
      text={item.text}
      onclick={() => {
        toggleActive(item.id);
        navigate(item.path);
      }}
    />
  ));

  return (
    <aside className="h-full ">
      <nav className="h-full flex flex-col shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <h4
            className={`overflow-hidden transition-all ${isOpen ? "w-32" : "w-0"}`}
          >
            Sidebar
          </h4>
          <button
            onClick={() => toggleOpen()}
            className="p-1.5 rounded-lg cursor-pointer"
          >
            {isOpen ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex-1 px-3 ">{children}</ul>

        <div className={`border-t flex p-3 `}>
          <img
            src="https://ui-avatars.com/api/?name=John+Doe"
            alt="John Doe"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${isOpen ? "w-52 ml-3" : "w-0"}`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs ">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
