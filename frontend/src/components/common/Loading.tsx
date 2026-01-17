export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center p-20">
      <div className="relative h-16 w-16">
        <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-gray-200"></div>
        <div className="border-primary absolute top-0 left-0 h-full w-full animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    </div>
  );
};
