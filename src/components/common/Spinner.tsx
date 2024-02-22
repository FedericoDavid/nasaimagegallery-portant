import { Circles } from "react-loader-spinner";

const Spinner = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Circles
        color="#00bfff"
        height={50}
        width={200}
        ariaLabel="circles-loading"
      />
      <p className="text-lg text-center pt-4">{message}</p>
    </div>
  );
};

export default Spinner;
