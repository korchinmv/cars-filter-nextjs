interface IErrorProps {
  text: string;
}

const Error = ({ text }: IErrorProps) => {
  return <p className='mb-[20px]'>{text}</p>;
};

export default Error;
