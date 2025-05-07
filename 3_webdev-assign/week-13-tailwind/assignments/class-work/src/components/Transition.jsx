export const ButtonTransition = ({value}) => {
  return (
    <div className="transition-all duration-500 bg-red-400 p-2 hover:bg-green-300 hover:p-4">
      {value}
    </div>
  );
};
