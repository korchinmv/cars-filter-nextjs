interface ITitle {
  text: string;
}
const Title = ({ text }: ITitle) => {
  return <h1 className='text-[34px] mb-[30px]'>{text}</h1>;
};

export default Title;
