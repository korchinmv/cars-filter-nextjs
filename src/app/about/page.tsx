import Link from "next/link";

const AboutPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen px-5 text-[22px]'>
      <a
        className='block mb-[25px] text-[26px] text-[#ed5564]'
        target='_blank'
        href='https://github.com/korchinmv/cars-filter-nextjs'
      >
        Ссылка на GitHub
      </a>

      <div className='mb-[15px]'>
        Использовались технологии: Next.js (SSR, fetch), TypeScipt, Redux
        Toolkit, TailwindCSS.
      </div>
      <div className='mb-[15px]'>
        Использовались библиотки: Swiper.js, Material UI.
      </div>
      <div className='mb-[15px]'>
        На выполнение работы потрачено времени: фильтрация 3 дня (примерно по
        4-5 часов в день), на все остальное примерно 8 часов.
      </div>
      <div className='mb-[25px]'>
        Столкнулся со сложностями: отображение данных для фильтрации т.к. данные
        с сервера приходят в разных форматах, была сложность в реализации
        фильтрации авто (решением было принято использовать глобальные состояния
        в redux), в остальных задачах сложностей не было.
      </div>
      <div className='mb-[15px]'>
        Существуют ошибки api бэкенда, например когда выставляешь фильтры Exeed
        + Hyundai + Модель Exeed TXL то api возвращает только машину с моделью
        TXL (должны быть еще машины Hyundai
        https://test.taxivoshod.ru/api/test/?w=catalog-cars&brand[]=EXEED&brand[]=Hyundai&model[]=TXL).
        Такие ошибочные комбинации по фильтрам встречались не один раз.
      </div>
      <div className='mb-[50px]'>
        В проекте выполнилось: верстка только для десктопа, роутинг по
        страницам, пагинация списка машин, получение данных с сервера,
        фильтрация машин, обработка ошибок при получении фото машин, слайдер
        фотографий и динамические метаданные на странице машины, сохранение
        данных (пагинация, фильтры, список машин) в localStorage, запрос к
        серверу по нажатию чекбокса, при выборе марки авто список моделей
        сокращается, вся фильтрация отображается в строке запроса url.
      </div>

      <Link
        className='bg-white text-black rounded-lg py-2 px-3 transition-colors hover:bg-[#ed5564] hover:text-[#fff]'
        href='/'
      >
        На главную
      </Link>
    </div>
  );
};

export default AboutPage;
