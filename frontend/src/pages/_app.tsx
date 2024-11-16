import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { baseSepolia, flowTestnet } from "viem/chains";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { FlowWalletConnectors } from "@dynamic-labs/flow";

const config = createConfig({
  chains: [baseSepolia, flowTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [baseSepolia.id]: http(),
    [flowTestnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DynamicContextProvider
      theme="dark"
      settings={{
        environmentId: "850ffeff-cf60-42c8-af65-040ceb270299",

        walletConnectors: [EthereumWalletConnectors, FlowWalletConnectors],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <Component {...pageProps} />
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
