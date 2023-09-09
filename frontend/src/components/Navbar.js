import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
function NavLink(props) {
  return (
    <li class="py-2 grid place-items-center lg:mx-5 glow">
      <a
        href={
          props.text.toLowerCase() !== "contact"
            ? `#${props.text.toLowerCase()}`
            : "#team"
        }
        class="p-2 w-1/2 lg:w-28 text-center rounded font-bold hover:bg-slate-800 hover:text-white"
      >
        {props.text}
      </a>
    </li>
  );
}

const Navbar = (props) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div class="bg-slate-950 w-full xl:grid xl:place-items-center sticky top-0 z-10">
      <nav class="bg-slate-950 text-slate-200 lg:flex xl:container">
        <div class="flex">
          <a class="m-4 text-2xl font-bold " href="#home">
            SAM
          </a>
          <button
            class="px-4 my-2 mx-4 ml-auto font-bold rounded hover:shadow-xl hover:text-white lg:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            Menu
          </button>
        </div>

        <div>
          <ul class={(showMobileMenu ? "" : "hidden") + ` lg:ml-auto lg:flex `}>
            {props.links.map((str) => (
              <NavLink text={str} />
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
