export const InputField = ({
  reference,
  placeholder,
}: {
  reference?: any;
  placeholder: string;
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        ref={reference}
        className="px-4 py-2 rounded-md border m-2"
      />
    </div>
  );
};
