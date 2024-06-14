interface ILoadingProps {
  text: string;
}

const Loading = ({ text }: ILoadingProps) => {
  return <span>{text}</span>;
};

export default Loading;
