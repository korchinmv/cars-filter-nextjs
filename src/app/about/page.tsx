import Link from "next/link";

const AboutPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <a
        className='block mb-[20px]'
        target='_blank'
        href='https://github.com/korchinmv/cars-filter-nextjs'
      >
        Ссылка на GitHub
      </a>

      <div className='mb-[15px]'>
        Использовались технологии: Next.js (SSR, fetch), TypeScipt, Redux
        Toolkit, TailwindCSS
      </div>
      <div className='mb-[15px]'>
        Использовались библиотки: Swiper.js, Material UI
      </div>
      <div className='mb-[50px]'>
        В проекте выполнилось: роутинг по страницам, пагинация списка машин,
        получение данных с сервера, фильтрация машин, обработка ошибок при
        получении фото машин, слайдер фотографий на странице машины, сохранение
        данных (пагинация, фильтры, список машин) в localStorage.
      </div>

      <Link className='bg-white text-black rounded-lg py-2 px-3' href='/'>
        На главную
      </Link>
    </div>
  );
};

export default AboutPage;
