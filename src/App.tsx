import { Text } from "@chakra-ui/react";
import memindLogo from "./assets/logo.svg";

function App() {
  return (
    <>
      <h1>Vite + React</h1>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={memindLogo} className="logo memind" alt="memind logo" />
        </a>
      </div>
      <Text>it works</Text>;
    </>
  );
}

export default App;
