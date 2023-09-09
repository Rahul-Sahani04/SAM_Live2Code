import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
function NavLink(props) {
  return (
    <li class="main-nav py-2 grid place-items-center lg:mx-5 glow">
      <a
        href={
          props.text.toLowerCase() !== "contact"
            ? `#${props.text.toLowerCase()}`
            : "#team"
        }
        class="p-2 w-1/2 lg:w-28 text-center rounded font-bold hover:text-white"
      >
        {props.text}
      </a>
    </li>
  );
}

const Navbar = (props) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div class="bg-slate-950 w-full xl:grid xl:place-items-center sticky top-0 z-10 h-20">
      <nav class="bg-slate-950 text-slate-200 lg:flex xl:container">
        <div class="flex">
        <div className="flex-1 mb-6 ml-6">
            <a
              className="text-orange-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
              href="#"
            >
              <svg
                className="h-6 w-6 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#ffffff"
              >
                <path d="M13 8V0L8.11 5.87 3 12h4v8L17 8h-4z" />
              </svg>
              SAM
            </a>
          </div>
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
