'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddHugotLine from './AddHugotLine';
import HugotLine from './HugotLine';

const MainPage = () => {
    const [hugotLines, setHugotLines] = useState([]);

    useEffect(() => {
        const fetchHugotLines = async () => {
            try {
                const response = await axios.get('http://localhost/api_hugotLine/api.php');
                setHugotLines(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchHugotLines();
    }, []);

    return (
        <div>
            <AddHugotLine />
            {hugotLines.map(hugotLine => (
                <HugotLine key={hugotLine.id} hugotLine={hugotLine} />
            ))}
        </div>
    );
};

export default MainPage;

