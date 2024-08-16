"use client"
import Swal from 'sweetalert2';
import React, { useState } from 'react'
import Navbar from '../Navbar.jsx'
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/topic`;


export default function Page() {
    const [topic, setTopic] = useState({
        title: "",
        description: ""
    })

    const handleAddChange = (e) => {
        const { id, value } = e.target;
        setTopic((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        if (topic.title == "" || topic.description == "") alert("Plz add tittle and description both")
        else addTopic(topic)
    }

    const addTopic = async (topic) => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(topic),
            });
            const responseMessage = await response.json();
            setTopic({
                title: "",
                description: ""
            })
            Swal.fire({
                position: "center",
                icon: "success",
                title: responseMessage.message,
                showConfirmButton: false,
                timer: 1000
            });

        } catch (error) {
            console.error('Error while adding topic:', error.message);
        } finally {
            setTimeout(() => {
                window.location.href = "/"
            }, 1200)
        }
    };


    return (
        <div>
            <Navbar />
            <div className="add_topic w-1/2 m-auto border border-darkBlue p-2 mt-5">
                <h1 className='text-lightGreen font-bold text-3xl py-2'>Add Your Topics</h1>
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" name="" id="title" placeholder='title' className="border border-lightBlue block w-full box-border my-2 text-xl p-2 outline-none" value={topic.title} onChange={handleAddChange} />
                    <input type="text" name="" id="description" placeholder='Description' className="border border-lightBlue block w-full box-border my-2 text-xl p-2 outline-none" value={topic.description} onChange={handleAddChange} />
                    <button type='submit' className="border text-lg p-2 bg-skyBlue text-lightBeige hover:bg-lightGreen">Add Topic</button>
                </form>
            </div>
        </div>
    )
}
