import { XMarkIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";

export const ToastError = ({
  t,
  error,
  title,
}: {
  t: any;
  error: any;
  title: string;
}) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
    >
      <div className="w-0 flex-1 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <div className="flex items-center gap-2">
              <XMarkIcon className="h-8 w-8 text-red-400" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">{title}</p>
            </div>

            <p className="mt-1 pl-8 text-sm text-gray-500">
              {(error as any)?.response?.data?.message || error || ""}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-red-800 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};
