import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-commerece | Not Found",
  description: "E-commerece not found page",
};

const NotFoundPage = () => {
  return (
    <h1 className='flex justify-center items-center h-screen'>Not Found</h1>
  );
};
export default NotFoundPage;
