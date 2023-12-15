import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-extrabold">{error.status}</h1>
      <p className="font-thin">{error.statusText}</p>
    </div>
  );
};

export default ErrorPage;
