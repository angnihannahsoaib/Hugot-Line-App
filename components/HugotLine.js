'use client'
import React, { useState } from 'react';
import axios from 'axios';

const HugotLine = ({ hugotLine }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(hugotLine.content);

    const handleEdit = async () => {
        try {
            const response = await axios.put('http://localhost/api_hugotLine/api.php', { id: hugotLine.id, content });
            if (response.data.success) {
                setIsEditing(false);
            } else {
                alert('Failed to update hugot line');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost/api_hugotLine/api.php${hugotLine.id}`);
            if (response.data.success) {
                // Optionally, refresh hugot lines list
            } else {
                alert('Failed to delete hugot line');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    };

    return (
        <div>
            {isEditing ? (
                <div>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                    <button onClick={handleEdit}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>{hugotLine.content}</p>
                    <p>Posted by: {hugotLine.user_name}</p>
                    <p>{new Date(hugotLine.created_at).toLocaleString()}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default HugotLine;

