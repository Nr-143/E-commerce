import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import api from "../api/api";

const SearchResults = ({ res }) => {
    const [results, setResults] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    // useEffect(() => {
    //     if (query) {
    //         api.get(`/search/results?query=${query}`)
    //             .then((response) => setResults(response.data))
    //             .catch((error) => console.error("Error fetching results:", error));
    //     }
    // }, [query]);

    return (
        <div className="search-results">
            <h2>Search Results for "{query}"</h2>
            {results.length > 0 ? (
                <ul>
                    {results.map((item) => (
                        <li key={item.id}>
                            <img src={item.image} alt={item.name} />
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default SearchResults;
