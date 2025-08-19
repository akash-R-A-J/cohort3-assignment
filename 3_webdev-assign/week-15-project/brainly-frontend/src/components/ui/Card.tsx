import { ShareIcon } from "../../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

const defaultStyles =
  "p-8 bg-white rounded-md border-gray-200 min-w-96 max-w-96 border mb-5";

export const Card = ({ title, link, type }: CardProps) => {
  return (
    <div className={`${defaultStyles}`}>
      {/* card top */}
      <div className="flex justify-between">
        {/* card top-left content */}
        <div className="flex items-center">
          <div className="pr-2 text-gray-500">
            <ShareIcon size="md" />
          </div>
          {title}
        </div>

        {/* card top-right icons*/}
        <div className="flex items-center">
          <a className="pr-2 text-gray-500" href={link} target="_blank">
            <ShareIcon size="md" />
          </a>
          <div className="pr-2 text-gray-500">
            <ShareIcon size="md" />
          </div>
        </div>
      </div>

      {/* card content */}
      <div className="pt-4">
        {type === "youtube" && (
          <iframe
            src={link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full"
          ></iframe>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
};
