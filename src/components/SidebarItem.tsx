import { useSidebarStore } from "@/stores/sidebarStore.ts";

// @ts-ignore
const SidebarItem = ({ icon, text, active, alert, onclick }) => {
  const Icon = icon;
  const { isOpen } = useSidebarStore();

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      className={`
      relative flex items-center py-2 px-3 my-1
      font-medium rounded-md cursor-pointer
      transition-colors group
      text-neutral-300
      ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-800"
          : "hover:bg-indigo-400 hover:text-neutral-300"
      }
    `}
      onClick={onclick}
    >
      <Icon size={20} />
      <span
        className={`overflow-hidden transition-all ${isOpen ? "w-52 ml-3" : "w-0"}`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 bg-amber-800 rounded-full ${isOpen ? "" : "top-2"}`}
        />
      )}

      {!isOpen && (
        <div
          className={`
        absolute left-full rounded-md px-2 py-1 ml-6
        bg-indigo-100 text-indigo-800 text-sm
        invisible opacity-20 -translate-x-3 transition-all
        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
