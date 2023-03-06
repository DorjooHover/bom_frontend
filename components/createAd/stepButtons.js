import MainContainer from '@/layout/mainContainer';
import { STYLES } from '@/styles/index';
import CustomModal from '@/util/CustomModal';
import mergeNames from '@/util/mergeNames';
import { AspectRatio, Box, Heading, Stack, Text } from '@chakra-ui/react';
import { ProductInfo } from 'pages/product/[slug]';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import ImageGallery from 'react-image-gallery';
const ButtonProcess = () => {
  return (
    <div className="relative w-full h-5 overflow-hidden bg-emerald-700/30 rounded-xl">
      <div className="absolute top-0 bottom-0 left-0 bg-emerald-500 h-5 w-[10vw]" />
      <p className="absolute top-0 left-[10vw] bottom-0 flex justify-center items-center font-semibold">
        10%
      </p>
    </div>
  );
};

const StepButtons = ({
  onPrev = () => {},
  loading = false,
  onNext = () => {},
  data,
  txt = 'Дараах',
  onClick = () => {},
  step,
}) => {
  console.log(data);
  return (
    <div className="mt-4">
      {/* <ButtonProcess /> */}
      <div className="flex flex-row justify-between pt-2">
        <button
          onClick={onPrev}
          className="flex flex-row items-center gap-1 px-4 py-2 font-bold text-white bg-red-400 rounded-full"
        >
          <FiArrowLeft size={20} />
          Буцах
        </button>

        {step == 2 ? (
          <CustomModal
            btnOpen={
              <>
                Илгээх <FiArrowRight size={20} />
              </>
            }
            onclick={onNext}
            btnClose="Нэмэх"
            btnClose2="Буцах"
            header="Баталгаажуулах хэсэг"
          >
            <MainContainer>
              <Stack direction={'row'} py={2} gap={3}>
                {/* //TODO Filter Box */}
                {/* {data?.subCategory && <FilterLayout data={data.subCategory}/>} */}

                {/* //TODO Main product */}
                <Box maxWidth={'100%'} flex="0 0 100%" borderRadius="5px">
                  <Box className="p-3 bg-white shadow-md md:p-10 rounded-xl">
                    {/*Product */}
                    {data.title && (
                      <Heading variant={'mediumHeading'} mb={5}>
                        {data.title}
                      </Heading>
                    )}

                    {/* product image and information */}
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 product__content-wrapper">
                      {/*  //TODO LEFT SIDE IMAGES AND DESC */}

                      <div>
                        <Stack
                          className={mergeNames(
                            STYLES.flexBetween,
                            'flex-row mb-2'
                          )}
                        >
                          <div className="flex flex-col justify-center sm:flex-row">
                            {/* <Text className="mr-[10px]">
                        Зарын огноо: {moment(data.createdAt).format('lll')}
                      </Text> */}
                            {/* <Text>Зарын дугаар: {data.num}</Text> */}
                          </div>
                        </Stack>

                        <Box
                          className={mergeNames(
                            'product__image',
                            'border-2 border-blue-900/20  mb-[120px] shadow-md'
                          )}
                        >
                          {data?.images && (
                            <AspectRatio ratio={1}>
                              <ImageGallery
                                items={data?.images.map((i) => ({
                                  original: i,
                                  thumbnail: i,
                                }))}
                              />
                            </AspectRatio>
                          )}
                        </Box>
                        <Text mt={5}>{data.description}</Text>
                      </div>

                      {/*  //TODO  ENDING LEFT SIDE IMAGES AND DESC */}

                      {/*  //TODO  STARTS RIGHT SIDE INFOS */}
                      {data && (
                        <div className="grid grid-cols-1 gap-1 md:gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                          {/* <Button
                      onClick={() => router.push(`/account/${data.user._id}`)}
                    >
                      {data.user?.phone}
                    </Button> */}

                          <p className="text-xl font-bold col-span-full">
                            Ерөнхий мэдээлэл
                          </p>

                          {data?.filters?.map((p, i) => {
                            console.log(data);
                            if (p.type != null) {
                              return (
                                <ProductInfo
                                  key={i}
                                  title={p.name}
                                  id={p.type}
                                  value={p.input}
                                  onClick={() =>
                                    getFilterByItem(p.type, p.input)
                                  }
                                />
                              );
                            }
                          })}
                        </div>
                      )}

                      {/*  //TODO  ENDING RIGHT SIDE INFOS */}
                    </div>
                  </Box>
                </Box>
              </Stack>
            </MainContainer>
          </CustomModal>
        ) : (
          <button
            disabled={loading}
            onClick={onNext}
            className="flex flex-row items-center gap-1 px-4 py-2 font-bold text-white bg-blue-500 rounded-full a"
          >
            {/* <AiOutlineLoading3Quarters
            className={mergeNames(loading ? 'animate-spin' : 'hidden')}
          /> */}
            {txt}
            <FiArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default StepButtons;
