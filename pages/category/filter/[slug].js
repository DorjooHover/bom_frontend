import AdContent from '@/components/home/adContent';
import urls from '@/constants/api';
import MainContainer from '@/layout/mainContainer';
import mergeNames from '@/util/mergeNames';
import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@chakra-ui/react';

import { ContainerX } from '@/lib/Container';
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript
} from '@react-google-maps/api';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../../context/auth';

const CategoryFilter = ({ propAds }) => {
  const router = useRouter();
  const { categories, ads, setAds } = useAuth();
  const [category, setCategory] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toLowerCase = (text) => {
    if (text) {
      return text.toLowerCase();
    }
  };
  useEffect(() => {
    setAds(propAds?.ads);
  }, [propAds]);

  const [isLoading, setIsLoading] = useState(false);
  const libraries = useMemo(() => ['places'], []);
  // const { categories, setAds } = useAuth();
  const [markerActive, setMarkerActive] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC2u2OzBNo53GxJJdN3Oc_W6Yc42OmdZcE',
    libraries: libraries,
  });
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );
  const mapCenter = useMemo(
    () => ({
      lat: ads ? parseFloat(ads[0]?.location?.lat ?? 47.74604) : 47.74604,
      lng: ads ? parseFloat(ads[0]?.location?.lng ?? 107.341515) : 107.341515,
    }),
    []
  );
  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  function createKey(location) {
    return location.lat + location.lng;
  }

  return (
    <Box my={5} as="section" id="category">
      <MainContainer>
        <div className="relative flex flex-col gap-3 p-2">
          {/* //TODO Filter Box */}
          <Box className="max-w-[100%] w-full rounded-[5px]">
            {/* //TODO Engiin zar */}
            {ads?.length > 0 ? (
              <AdContent
                data={ads}
                tlc={toLowerCase}
                title={category ?? ''}
                showLink="hidden"
                inCat
              />
            ) : (
              <ContainerX>
                <div className="grid h-[80vh] text-2xl place-items-center">
                  ?????? ?????????????? ??????????
                </div>
              </ContainerX>
            )}
          </Box>
        </div>
        {/* <CustomModal></CustomModal> */}
  
      </MainContainer>
    </Box>
  );
};

export default CategoryFilter;

export async function getServerSideProps(ctx) {
  const { params, query } = ctx;
  const { slug } = params;
  const {num, value} = query
  const res = await fetch(`${urls['test']}/ad/filter/${slug}/${value}/${parseInt(num)}`);
  const ads = await res.json();
  return {
    props: {
      propAds: ads,
    },
  };
}
