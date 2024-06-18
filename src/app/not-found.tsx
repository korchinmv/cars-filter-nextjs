import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
  description: "Not Found page",
};

const NotFoundPage = () => {
  return (
    <h1 className='flex justify-center items-center h-screen'>Not Found</h1>
  );
};
export default NotFoundPage;
