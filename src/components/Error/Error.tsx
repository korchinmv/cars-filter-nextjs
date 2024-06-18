interface IErrorProps {
  text: string;
  css?: string;
}

const Error = ({ text, css }: IErrorProps) => {
  return <p className={`mb-[20px] ${css}`}>{text}</p>;
};

export default Error;
