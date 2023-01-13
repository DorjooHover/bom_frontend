import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { HiMenuAlt3 } from "react-icons/hi";
import useBreakpoints from "../../hooks/useBreakpoints";
import { NavContainer } from "../../lib/Container";

import { useAuth } from "context/auth";
import Cookies from "js-cookie";
import BottomMenu from "./bottomMenu";
import {
  EstimateIcon,
  HeartIcon,
  UserIcon,
  WalletIcon,
  WhiteHeartIcon,
} from "./icons";
import SearchBar from "./searchBar";
import SideMenu from "./sideMenu";
import UserDropdown from "./userDropdown";
import NavLogo from "./navLogo";

const calcSize = (pt) => {
  switch (pt) {
    case "3xl":
    case "2xl":
    case "xl":
    case "lg":
      return { width: 130, height: 63 };
    case "md":
    case "sm":
    case "xs": {
      return { width: 110, height: 43 };
    }
    case "default":
      return { width: 105, height: 38 };
    default: {
      return { width: 140, height: 73 };
    }
  }
};
const UpperNav = ({}) => {
  const router = useRouter();
  const pt = useBreakpoints();

  const [size, setSize] = useState(() => calcSize(pt));
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showBottomMenu, setShowBottomMenu] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    setSize(calcSize(pt));
    console.log(Cookies.get("currentUser"));
  }, [pt]);

  return (
    <div className="md:bg-white bg-mainBlossom shadow-lg z-30 sticky">
      {/* <div className="md:bg-white bg-mainBlossom shadow-lg z-30 sticky md:overflow-hidden overflow-y-visible overflow-clip"> */}
      <NavContainer>
        <div className="flex flex-row items-center w-full justify-between py-2">
          <NavLogo {...{ size }} />
          <div className="md:block hidden lg:w-[55vw] w-[50vw] px-4 lg:px-8">
            <SearchBar />
          </div>
          <div className="md:flex hidden  flex-row items-center lg:gap-8 gap-4">
            <WalletIcon onClick={() => router.push("/wallet")} />
            <EstimateIcon onClick={() => router.push("/estimate")} />
            <HeartIcon onClick={() => router.push("/bookmark")} />

            {user == undefined ? (
              <UserIcon
                text="Бүртгүүлэх"
                onClick={() => router.push("/login")}
              />
            ) : (
              <UserDropdown user={user} logout={logout} />
            )}
          </div>
          <div className="md:hidden flex justify-center items-center gap-2">
            <WhiteHeartIcon
              word={false}
              onClick={() => router.push("/bookmark")}
            />
            <button
              onClick={() => {
                setShowSideMenu(true);
              }}
              // onClick={openNav}
            >
              <HiMenuAlt3
                size={30}
                className="hover:text-blue-400 text-white transition-all ease-in"
              />
            </button>
          </div>
        </div>
      </NavContainer>
      <SideMenu
        show={showSideMenu}
        closeNav={() => {
          setShowSideMenu(false);
        }}
        openNav={() => setShowSideMenu(true)}
      />
      <BottomMenu />
    </div>
  );
};

export default UpperNav;
