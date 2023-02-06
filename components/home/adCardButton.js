import React from 'react';
import { FaHeart } from 'react-icons/fa';

import urls from '@/constants/api';
import mergeNames from '@/util/mergeNames';
import { Tooltip, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { BiGitCompare } from 'react-icons/bi';
const AdCardButton = ({ id }) => {
  const toast = useToast();
  const [isLiked, setIsLiked] = React.useState(false);
  const token = getCookie('token')
  const addToBookmark = async () => {
    try {
      await axios
        .post(`${urls['test']}/bookmark/ad`, {
          adId: id,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((d) => console.log(d));
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  return (
    <div className="flex flex-row items-center space-x-2">
      <Tooltip label="Хадгалах">
        <button
          className="p-2 transition-all duration-300 ease-in-out rounded-full bg-slate-200/40 group hover:bg-slate-200"
          onClick={() => {
            addToBookmark();
            setIsLiked(true);
            toast({
              title: 'Хүсэл рүү нэмэгдлээ.',
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
          }}
        >
          <FaHeart
            className={mergeNames(
              'hover:text-red-400 ',
              isLiked ? 'text-red-500/90' : 'text-slate-200/90'
            )}
          />
        </button>
      </Tooltip>

      <Tooltip label="Харьцуулах">
        <button className="p-2 transition-all duration-300 ease-in-out rounded-full bg-slate-200/40 hover:bg-slate-200">
          <BiGitCompare className="text-blue-700" />
        </button>
      </Tooltip>
    </div>
  );
};

export default AdCardButton;
