import "./profileCard.css";
import { profileInfo } from "./data";
import { useRecoilValueLoadable, useRecoilValue } from "recoil";

export const ProfileCard = () => {
  return (
    <div className="card-style">
      <Image />
      <Name />
      <Job />
      <Address />
      <Description />
      <ConnectButton />
      <MessageButton />
    </div>
  );
};

const Image = () => {
  const imageSrc = useRecoilValueLoadable(profileInfo("imageSrc"));
  if (imageSrc.state === "loading") {
    return <p>loading...</p>;
  } else if (imageSrc.state === "hasValue") {
    return <img src={imageSrc.contents} className="image-style" alt="profile-image" />;
  } else if (imageSrc.state === "hasError") {
    return <p>Image not found.</p>;
  }
};

const Name = () => {
  const name = useRecoilValue(profileInfo("name"));
  return <h2 className="name-style">{name}</h2>;
};

const Job = () => {
  const role = useRecoilValue(profileInfo("role"));
  const company = useRecoilValue(profileInfo("company"));

  return (
    <p className="job-style">
      {role} at {company}
    </p>
  );
};

const Description = () => {
  const description = useRecoilValue(profileInfo("description"));
  return <p className="description-style">{description}</p>;
};

const Address = () => {
  const address = useRecoilValue(profileInfo("address"));
  return <p className="address-style">{address}</p>;
};

const ConnectButton = () => {
  return <button className="button-style connect-button">Connect</button>;
};

const MessageButton = () => {
  return <button className="button-style message-button">Message</button>;
};
