export const Input = ({ type, placeHolder }) => {
  return (
    <span
      className={`w-xs m-2 rounded-md text-xl px-2 py-2 text-white cursor-pointer bg-[#19406a]`}
    >
      <input
        className="outline-none m-4"
        type={type}
        placeholder={placeHolder}
      />
    </span>
  );
};
