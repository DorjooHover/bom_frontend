import React from 'react';
import { BiArea, BiDoorOpen } from 'react-icons/bi';

import { FiCamera, FiDelete } from 'react-icons/fi';
import { IoBedOutline } from 'react-icons/io5';
import { TbBath } from 'react-icons/tb';

import urls from '@/constants/api';
import mergeNames from '@/util/mergeNames';
import { Skeleton } from '@chakra-ui/react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import AdCardButton from './adCardButton';

// const custom = ({ src, width, quality }) => {
//   return `${src}?w=${width}&q=${quality || 75}`;
// };

function Card({ item, deleteFunc = () => {}, isDelete = false }) {
  const router = useRouter();
  const user = getCookie('user');
  return (
    // <Skeleton>
    <Skeleton isLoaded>
      <div
        className="relative overflow-hidden rounded-md md:min-h-[35vh] min-h-[30vh]  shadow-md bg-zinc-200 group "
        // onClick={() => item && item._id && router.push(`/product/${item.num}`)}
      >
        {/* zarin zurag absolute  */}
        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-0 w-full h-full cursor-pointer"
          onClick={async () => {
            user &&
              item &&
              item._id &&
              (await axios
                .get(
                  `${urls['test']}/ad/view/${item.num}/${JSON.parse(user)._id}`
                )
                .then((d) => router.push(`/product/${item.num}`)));
          }}
        >
          {item?.images && (
            <Image
              src={item?.images[0] ?? '/images/HeaderSlider/1.jpg'}
              alt="product image"
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-125 transition-all w-full object-cover h-full ease-in-out duration-400 aspect-[4/5] relative z-0"
            />
            // <div className="group-hover:scale-125 transition-all w-full object-cover h-full ease-in-out duration-400 aspect-[4/5] relative z-0">
            //   <Image
            //     loader={custom}
            //     src={item?.images[0] ?? '/images/HeaderSlider/1.jpg'}
            //     alt="product image"
            //     layout="fill"
            //     objectFit="cover"
            //   />
            // </div>
          )}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-700/0 via-slate-700/30 to-slate-900/100"></div>
        </div>
        {/* Zariin body  */}
        <div className="relative z-0 flex w-full h-full px-3 py-2">
          <div className="absolute top-0 left-0 z-10 flex items-start justify-between flex-1 w-full p-2">
            <div className="px-2 py-1 rounded-md bg-mainBlossom w-fit">
              <p className="h-4 text-sm font-semibold text-white md:h-6">
                <Image
                  src="/images/logo/bom-white.png"
                  alt="BOM logo"
                  objectFit="contain"
                  className="h-full"
                  width={32}
                  height={24}
                  // layout="fill"
                />
              </p>
            </div>

            {isDelete ? (
              <button
                className="flex items-center justify-center w-6 h-6 bg-gray-600 rounded-full md:w-8 md:h-8"
                onClick={deleteFunc}
              >
                <FiDelete size={16} className="text-white" />
              </button>
            ) : (
              <button
                className="flex items-center justify-center w-6 h-6 bg-gray-600 rounded-full md:w-8 md:h-8"
                onClick={() => console.log('asdf')}
              >
                <FiCamera size={16} className="text-white" />
              </button>
            )}
          </div>
        </div>

        {/* Zariin info  */}
        <div className="absolute bottom-0 left-0 z-20 flex flex-col justify-end w-full p-2 mb-2 space-y-2 ">
          <div className="relative flex flex-row justify-between w-full">
            <TextContainer
              title={item.title}
              description={item.positions?.location_id ?? ''}
            />
            <AdCardButton id={item?.num} adId={item?._id} />
          </div>
          <div className="flex flex-wrap items-end justify-between gap-x-1">
            {item?.filters?.map((p, i) => {
              return (
                <React.Fragment key={i}>
                  <ApartmentIconInfo p={p} />
                  {p.type === 'area' && (
                    <ItemContainer
                      Icon={(props) => <BiArea {...props} text="" />}
                      text={calcValue(p.input, '??????????????', '??.????')}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          {item?.adStatus == 'pending' && (
            <p
              className={mergeNames(
                'text-teal-300 px-3 rounded-md font-bold mx-auto'
              )}
            >
              {/* {item.adStatus} */}
              ?????????????????? ??????????...
            </p>
          )}
          {item?.adStatus == 'deleted' && (
            <p
              className={mergeNames(
                'text-teal-300 px-3 rounded-md font-bold mx-auto'
              )}
            >
              {/* {item.adStatus} */}
              ???????????????????? ??????????...
            </p>
          )}
        </div>
      </div>
    </Skeleton>
  );
}
const ApartmentIconInfo = ({ p }) => {
  // END YG ROOM MASTERBEDROOM AND BATHROOM IIN MEDEELEL BAIAGA
  return (
    <React.Fragment>
      {p && p.type === 'room' && (
        <ItemContainer
          text={calcValue(p.input, '??????????????')}
          Icon={(props) => <BiDoorOpen {...props} text="" />}
        />
      )}
      {p && p.type === 'masterBedroom' && (
        <ItemContainer
          Icon={(props) => <IoBedOutline {...props} text="" />}
          text={calcValue(p.input, '??????????????')}
        />
      )}
      {p && p.type === 'bathroom' && (
        <ItemContainer
          Icon={(props) => <TbBath {...props} text="" />}
          text={calcValue(p.input, '??????????????')}
        />
      )}
    </React.Fragment>
  );
};

const ItemContainer = ({ Icon = () => <></>, text = '' }) => {
  return (
    <div className="flex flex-row items-center gap-1">
      <Icon className="text-white" />
      <p className="text-white md:text-sm text-[12px]">{text}</p>
    </div>
  );
};

const TextContainer = ({ title = '', description = '' }) => {
  return (
    <div className="w-2/3">
      <p className="text-sm font-bold text-white uppercase truncate md:text-lg">
        {title}
      </p>
      <p className="text-[12px] md:text-base font-semibold truncate text-slate-200/90 first-letter:uppercase">
        {description}
      </p>
    </div>
  );
};

const typeCheck = (id, propmt) => {
  return id && id.name && id.name.toLowerCase() === propmt;
  // return id && id.name && id.name.toLowerCase() === propmt;
};

const calcValue = (props, checker = '??????????????', suffix) => {
  // p?.value?.toLowerCase() === "??????????????"

  if (props.toString().toLowerCase() === checker) return 0;
  if (props) {
    if (suffix) return `${props} ${suffix}`;
    return props;
  }
  return '-';
};
export default Card;
