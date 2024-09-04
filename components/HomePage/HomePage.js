'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Replace with your API endpoints
const API_HUGOT_LINES = 'http://localhost/api_hugotLine/api.php';
const API_TRENDING = 'http://localhost/api_hugotLine/api.php';

const HomePage = () => {
    const [hugotLines, setHugotLines] = useState([]);
    const [trendingLines, setTrendingLines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHugotLines = async () => {
            try {
                const response = await axios.get(API_HUGOT_LINES);
                setHugotLines(response.data);
            } catch (error) {
                console.error("Error fetching hugot lines:", error);
            }
        };

        const fetchTrendingLines = async () => {
            try {
                const response = await axios.get(API_TRENDING);
                setTrendingLines(response.data);
            } catch (error) {
                console.error("Error fetching trending lines:", error);
            }
        };

        fetchHugotLines();
        fetchTrendingLines();
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home-page">
            <div className="hugot-lines">
                <h2>Hugot Lines</h2>
                {hugotLines.length === 0 ? (
                    <p>No hugot lines available.</p>
                ) : (
                    hugotLines.map((line) => (
                        <div key={line.id} className="hugot-line">
                            <p>{line.content}</p>
                            <p><strong>Posted by:</strong> {line.username} on {new Date(line.created_at).toLocaleString()}</p>
                            {/* Add buttons for reactions and comments here */}
                        </div>
                    ))
                )}
            </div>

            <div className="trending">
                <h2>Trending Today</h2>
                {trendingLines.length === 0 ? (
                    <p>No trending lines available.</p>
                ) : (
                    trendingLines.map((line) => (
                        <div key={line.id} className="trending-line">
                            <p>{line.content}</p>
                            <p><strong>Posted by:</strong> {line.username}</p>
                            {/* Add buttons for reactions and comments here */}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HomePage;
