"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import { TImage } from "@/types/Image";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface ISliderProps {
  data: TImage[];
}

const Slider = ({ data }: ISliderProps) => {
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
              src={image.image}
              priority
              alt='Картинка машины'
              width='200'
              height='200'
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
