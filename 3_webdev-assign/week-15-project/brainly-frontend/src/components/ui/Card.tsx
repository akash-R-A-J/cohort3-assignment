import { ShareIcon } from "../../icons/ShareIcon";
import { TrashIcon } from "../../icons/TrashIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";

// interface ContentType {
//     type: "tweet" | "youtube" | "webpage" | "document";
// }

interface CardProps {
  header: string;
  type: "tweet" | "youtube" | "webpage" | "document";
  link: string;
}

const defaulCardtStyle =
  "bg-white rounded-md p-2 m-2 border-gray-100 border-3 w-1/5 h-1/3 mx-auto";

//   if needed, add some default styles for the icons present in the card
// const defaultIconStyle = "";

// TODOS: add respective icon component here
const IconTypeComponent: Record<CardProps["type"], React.ReactElement> = {
  tweet: <TwitterIcon size="md" />,
  youtube: <TwitterIcon size="md" />,
  webpage: <TwitterIcon size="md" />,
  document: <TwitterIcon size="md" />,
};

// main card component
export const Card = (props: CardProps) => {
  return (
    <div className={`${defaulCardtStyle}`}>
      <CardTop type={props.type} header={props.header} />

      <div>Link: {props.link}</div>
    </div>
  );
};

interface CardTopProps {
  type: "tweet" | "youtube" | "webpage" | "document";
  header: string;
}

const CardTop = (props: CardTopProps) => {
  return (
    <div className={`flex justify-between items-center mb-3 mx-2`}>
      <div className={`flex items-center`}>
        <span className="p-2">{IconTypeComponent[props.type]}</span>
        {props.header}
      </div>
      <div className={`flex max-w-1/2`}>
        <span className={`p-2`}>
          <ShareIcon size="md" />
        </span>
        <span className={`p-2`}>
          <TrashIcon size="md" />
        </span>
      </div>
    </div>
  );
};

interface CardContent {
    content: string;
}
const CardBody = (props: CardContent) => {
    return <div></div>
}
