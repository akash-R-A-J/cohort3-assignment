import cmpLogo from "../assets/cmp_logo.jpg";

export const Screen_1 = () => {
  return (
    <div className="bg-[#002b5b] min-h-screen font-sans font-semibold text-white text-center">
      <Logo />
      <Content />
    </div>
  );
};

const Logo = () => {
  return (
    <div className="flex justify-center pt-15">
      <img src={cmpLogo} alt="" className="rounded-full w-9 h-9 mr-1" />
      <div className="text-xl ml-3 mt-1">
        <span className="text-[#36c6c0]">Webinar</span>.gg
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <div className="m-15">
      <p className="text-2xl mb-12">Verify Your Age</p>
      <Form />
    </div>
  );
};

const Form = () => {
  return (
    <div className="flex flex-col">
      <p className="text-xs mb-2 text-gray-400">
        Please confirm your birth year. This date will not be stored.
      </p>
      <input
        type="text"
        name="birth-date"
        id=""
        placeholder="Your Birth Year"
        className="w-xxs mr-auto ml-auto mb-4 bg-[#19406a] border border-gray-600 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-[#0e8d9e]"
      />
      <input
        type="button"
        value="Continue"
        className="bg-[#8094ad] w-xxs mr-auto ml-auto mt-2 py-2 px-20 border rounded-md outline-none  "
      />
    </div>
  );
};
