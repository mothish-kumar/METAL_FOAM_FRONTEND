import { useLoader } from "../context/LoaderContext";

const GlobalLoader = () => {
  const { loading, offline } = useLoader();

  if (!loading && !offline) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {loading && <div className="animate-spin w-16 h-16 border-4 border-white border-t-transparent rounded-full"></div>}
      {offline && (
        <div className="absolute bottom-5 px-4 py-2 bg-red-500 text-white rounded">
          No Internet Connection
        </div>
      )}
    </div>
  );
};

export default GlobalLoader;
