"use client";
import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, A11y } from "swiper/modules";
import { TImage } from "@/types/Image";
import Image from "next/image";

interface ISliderProps {
  data: TImage[];
}

const Slider = ({ data }: ISliderProps) => {
  return (
    <Swiper
      className='mb-[30px]'
      navigation={true}
      modules={[Navigation, EffectFade, A11y]}
      effect={"fade"}
      slidesPerView={1}
      loop={true}
    >
      {data.map((image: TImage) => {
        return (
          <SwiperSlide key={parseInt(image.id)}>
            {
              <Image
                className='cursor-grabbing'
                src={image.image}
                priority
                alt='Картинка машины'
                width='400'
                height='150'
              />
            }
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
