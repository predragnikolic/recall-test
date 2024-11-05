import {
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { type ReactNode, Suspense, useState } from "react";

export function ProvideReactQuery({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					gcTime: 0,
					retry: false,
				},
			},
		}),
	);
	return (
		<QueryClientProvider client={queryClient}>
			<Suspense fallback={null}>{children}</Suspense>
		</QueryClientProvider>
	);
}
