'use client'
import React, { useState } from 'react';
import axios from 'axios';

const AddHugotLine = () => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost/api_hugotLine/api.php', { content });
            if (response.data.success) {
                // Optionally, refresh hugot lines list
            } else {
                alert('Failed to add hugot line');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind?" />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddHugotLine;

