import { Panel } from "./Layout";
import ReverseDictionary from "./ReverseDictionary";
import LookupDictionary from "./LookupDictionary";

function App() {
  return (
    <main className="h-screen w-screen">
      <Panel>
        <ReverseDictionary />
      </Panel>
    </main>
  );
}

export default App;
