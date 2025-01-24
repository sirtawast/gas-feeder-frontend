import {
  QueryClient,
  QueryClientProvider,
} from "@preact-signals/query";
import "./app.css";

import Main from "./components/Main.tsx";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <Main/>
    </QueryClientProvider>
  );
}

export default App;
