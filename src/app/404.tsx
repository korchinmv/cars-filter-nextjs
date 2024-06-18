import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error",
  description: "Error page",
};

const Custom404 = () => {
  return (
    <h1 className='flex justify-center items-center h-screen'>
      404 - Page Not Found
    </h1>
  );
};
export default Custom404;
