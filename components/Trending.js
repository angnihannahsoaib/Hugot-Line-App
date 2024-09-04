'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Trending = () => {
    const [trendingLines, setTrendingLines] = useState([]);

    useEffect(() => {
        const fetchTrendingLines = async () => {
            try {
                const response = await axios.get('http://localhost/api_hugotLine/api.php');
                setTrendingLines(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTrendingLines();
    }, []);

    return (
        <div>
            <h2>Trending Today</h2>
            {trendingLines.map(line => (
                <div key={line.id}>
                    <p>{line.content}</p>
                    <p>{line.likes} Likes | {line.hearts} Hearts | {line.stars} Stars | {line.comments} Comments</p>
                </div>
            ))}
        </div>
    );
};

export default Trending;
