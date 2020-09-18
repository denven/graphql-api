import "./App.scss";
import PageView from "./components/PageView";

import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="App">
				<PageView />
			</div>
		</ApolloProvider>
	);
}

export default App;
