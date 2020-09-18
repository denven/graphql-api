import React from "react";
import { useQuery, gql } from "@apollo/client";

const ALL_BOOKS = gql`
	{
		books {
			name
			genre
			author {
				name
			}
		}
	}
`;

export default function PageView() {
	// hooks can be used at the root position of a component, not nested inside
	const { loading, error, data } = useQuery(ALL_BOOKS);
	console.log(data);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<React.Fragment>
			<header className="header">
				<h1>Reading List during COVID-19</h1>
			</header>

			<main className="body">
				<div className="books">
					<table>
						<thead>
							<tr>
								<th>No.</th>
								<th>Name</th>
								<th>Genre</th>
								<th>Author</th>
							</tr>
						</thead>
						<tbody>
							{data.books.map((item, index) => {
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{item.name}</td>
										<td>{item.genre}</td>
										<td>{item.author.name}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className="details">Book Detail</div>
			</main>
		</React.Fragment>
	);
}
