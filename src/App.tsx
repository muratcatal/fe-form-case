import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Tax } from "./components/tax";
import { Layout } from "./styled";

const client = new QueryClient();

function App() {
  return (
    <Layout data-testid="layout">
      <QueryClientProvider client={client}>
        <Toaster position="bottom-center" />
        <Tax />
      </QueryClientProvider>
    </Layout>
  );
}

export default App;
