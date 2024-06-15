interface ILoadingProps {
  text: string;
}

const Loading = ({ text }: ILoadingProps) => {
  return <p className='mb-[20px]'>{text}</p>;
};

export default Loading;
