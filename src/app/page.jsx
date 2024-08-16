"use client"

import Swal from 'sweetalert2';
import Link from "next/link";
import Navbar from "./Navbar";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useEffect, useState } from "react";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/topic`;

export default function Home() {
  const [topicData, setTopicData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTopic = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      const responseMessage = await response.json();
      setTopicData(responseMessage.topicList);
    } catch (error) {
      console.error('Error while fetching topic data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTopic = async (e) => {
    const deleteId = e.target.id;
    try {
      const response = await fetch(`${apiUrl}/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseMessage = await response.json();
      Swal.fire({
        title: "Good job!",
        text: responseMessage.message,
        icon: "success"
      });
      getTopic();
    } catch (error) {
      console.error('Error while deleting topic:', error.message);
    }
  };

  useEffect(() => {
    getTopic();
  }, []);
  return (
    <div className="">
      <Navbar />
      <div className="show_topic_list w-10/12 mt-5 m-auto">
        <div className="border-b border-sunsetOrange mb-5 p-2">
          <Link href="/addTopic">
            <button className="border text-lg p-2 bg-skyBlue text-lightBeige">Add Topic</button>
          </Link>
        </div>
        <div className="topic_list border border-red-800 p-2 bg-grey h-auto">
          {loading ? (
            <div className="loader flex justify-center items-center h-[50vh]">
              <div className="custom-loader"></div>

            </div>
          ) : (
            topicData && topicData.length > 0 ? (
              topicData.map((elm, index) => (
                <div key={index} className="list flex justify-between items-center p-1 px-5 border border-lightBlue my-3 bg-white">
                  <div className="topics w-11/12">
                    <h1 className="text-3xl font-bold break-words">{elm.title}</h1>
                    <span className="text-gray-500 break-words">{elm.description}</span>
                  </div>

                  <div className="flex justify-between items-center w-20 text-3xl">
                    <span>
                      <AiOutlineDelete className="text-red cursor-pointer" id={elm._id} onClick={handleDeleteTopic} />
                    </span>
                    <Link href={`/editTopic/${elm._id}`}>
                      <FiEdit2 className="text-skyBlue" />
                    </Link>

                  </div>
                </div>
              ))
            ) : (
              <p>No topics available.</p>
            )
          )}

        </div>
      </div>
    </div >
  );
}
