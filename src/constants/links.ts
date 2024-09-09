import { IoSettingsOutline } from "react-icons/io5";
import { FaRegAddressBook } from "react-icons/fa";
import { MdOutlineCabin } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi";
import { LuUsers2 } from "react-icons/lu";
export const sidebarLinks = [
  {
    id: 1,
    title: "Home",
    path: "/dashboard",
    icon: HiOutlineHome,
  },
  {
    id: 2,
    title: "Bookings",
    path: "/bookings",
    icon: FaRegAddressBook,
  },
  {
    id: 3,
    title: "Cabins",
    path: "/cabins",
    icon: MdOutlineCabin,
  },
  {
    id: 4,
    title: "Users",
    path: "/users",
    icon: LuUsers2,
  },
  {
    id: 5,
    title: "Settings",
    path: "/settings",
    icon: IoSettingsOutline,
  },
];
