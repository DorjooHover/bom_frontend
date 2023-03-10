import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { HiMenuAlt3 } from 'react-icons/hi';
import useBreakpoints from '../../hooks/useBreakpoints';
import { ContainerX } from '../../lib/Container';

import { useAuth } from 'context/auth';
import Cookies from 'js-cookie';
import BottomMenu from './bottomMenu';
import {
  EstimateIcon,
  HeartIcon,
  UserIcon,
  WalletIcon,
  WhiteHeartIcon,
} from './icons';
import SearchBar from './searchBar';
import SideMenu from './sideMenu';
import UserDropdown from './userDropdown';

const calcSize = (pt) => {
  switch (pt) {
    case '3xl':
    case '2xl':
    case 'xl':
    case 'lg':
      return { width: 130, height: 63 };
    case 'md':
    case 'sm':
    case 'xs': {
      return { width: 110, height: 43 };
    }
    case 'default':
      return { width: 105, height: 38 };
    default: {
      return { width: 140, height: 73 };
    }
  }
};
const UpperNav = (
  {
    //  openNav
  }
) => {
  const router = useRouter();
  const pt = useBreakpoints();

  const [size, setSize] = useState(() => calcSize(pt));
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showBottomMenu, setShowBottomMenu] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    setSize(calcSize(pt));
    console.log(Cookies.get('currentUser'));
  }, [pt]);

  return (
    <div className="sticky z-30 shadow-lg md:bg-white bg-mainBlossom">
      {/* <div className="sticky z-30 overflow-y-visible shadow-lg md:bg-white bg-mainBlossom md:overflow-hidden overflow-clip"> */}
      <ContainerX>
        <div className="flex flex-row items-center justify-between w-full py-2">
          <div className="cursor-pointer">
            <Link href="/">
              <a>
                <Image
                  src="/images/logo/bom-blue-text.png"
                  alt="BOM logo"
                  width={size.width}
                  height={size.height}
                  objectFit="contain"
                />
              </a>
            </Link>
          </div>
          <div className="md:block hidden lg:w-[55vw] w-[50vw] px-4 lg:px-8">
            <SearchBar />
          </div>
          <div className="flex-row items-center hidden gap-4 md:flex lg:gap-8">
            <WalletIcon onClick={() => router.push('/wallet')} />
            <EstimateIcon onClick={() => router.push('/estimate')} />
            <HeartIcon onClick={() => router.push('/bookmark')} />

            {user == undefined ? (
              <UserIcon
                text="????????????????????"
                onClick={() => router.push('/login')}
              />
            ) : (
              <UserDropdown user={user} logout={logout} />
            )}
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <WhiteHeartIcon
              word={false}
              onClick={() => router.push('/bookmark')}
            />
            <button
              onClick={() => {
                setShowSideMenu(true);
              }}
              // onClick={openNav}
            >
              <HiMenuAlt3
                size={30}
                className="text-white transition-all ease-in hover:text-blue-400"
              />
            </button>
          </div>
        </div>
      </ContainerX>
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