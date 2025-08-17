import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/PlusIcon";

function App() {
  return (
    <div className="text-center">
      <h1 className="text-blue text-center text-3xl pt-10 mt-25">
        Hello Guys!
      </h1>
      <Button
        variant="primary"
        size="lg"
        text="Add Content"
        startIcon={<PlusIcon size="lg" />}
        onClick={() => {
          console.log("Adding the content.");
        }}
      ></Button>
      <Button
        variant="secondary"
        size="md"
        text="Share Brain"
        onClick={() => {
          console.log("Sharing this content.");
        }}
      ></Button>
    </div>
  );
}

export default App;
