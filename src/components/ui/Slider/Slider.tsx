"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import { useState } from "react";
import { TImage } from "@/types/Image";
import noPicImage from "@/../public/no-pic.jpg";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface ISliderProps {
  data: TImage[];
}

const Slider = ({ data }: ISliderProps) => {
  const [errorImage, setErrorImage] = useState<string | null>(null);

  return (
    <Swiper
      className='mb-[30px] rounded-xl'
      navigation={true}
      modules={[Navigation, EffectFade]}
      effect={"fade"}
      slidesPerView={1}
      loop={true}
    >
      {data.map((image: TImage) => {
        return (
          <SwiperSlide key={parseInt(image.id)}>
            <Image
              className='cursor-grabbing w-full'
              src={errorImage !== null ? errorImage : image.image}
              priority
              alt='Картинка машины'
              width='200'
              height='200'
              onError={() => {
                setErrorImage(noPicImage.src);
              }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
