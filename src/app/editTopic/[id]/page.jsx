"use client"
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar'
import { useParams } from 'next/navigation'
const apiUrl = "/api/topic";

export default function page() {
    const [update, setUpdate] = useState({
        title: "",
        description: ""
    })

    const [loading, setLoading] = useState(false);
    const params = useParams()
    const getOneTopic = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/${params.id}`);
            const responseMessage = await response.json();
            const { title, description } = responseMessage.topic;
            update.title = title;
            update.description = description;
        } catch (error) {
            console.error('Error while fetching topic data:', error.message);
        } finally {
            setLoading(false);
        }
    };


    const updateTopic = async (topic) => {
        try {
            const response = await fetch(`${apiUrl}/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(topic),
            });
            const responseMessage = await response.json();
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


    const handleUpdateChange = (e) => {
        const { id, value } = e.target;
        setUpdate((prev) => ({
            ...prev,
            [id]: value,
        }));
    }

    const handleUpdateTopic = (event) => {
        event.preventDefault()
        updateTopic(update)
    }

    useEffect(() => {
        getOneTopic()
    }, [])

    return (
        <div>
            <Navbar />
            <div className="add_topic w-1/2 m-auto border border-darkBlue p-2 mt-5">
                <h1 className='text-lightGreen font-bold text-3xl py-2'>Edit Your Topics</h1>
                <form action="" onSubmit={handleUpdateTopic}>
                    <input type="text" name="" id="title" placeholder='Title' value={update.title} onChange={handleUpdateChange} className="border border-lightBlue block w-full box-border my-2 text-xl p-2 outline-none" />
                    <input type="text" name="" id="description" placeholder='Description' value={update.description} onChange={handleUpdateChange} className="border border-lightBlue block w-full box-border my-2 text-xl p-2 outline-none" />
                    <button type='submit' className="border text-lg p-2 bg-skyBlue text-lightBeige hover:bg-lightGreen">Edit Topic</button>
                </form>
            </div>
        </div>
    )
}
