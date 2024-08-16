"use server"
import { NextResponse } from "next/server";
import TopicModel from "@/lib/model/topic";
import connectDB from "@/lib/config";


export async function GET(request) {
    try {
        await connectDB()
        const { searchParams } = new URL(request.url);
        let page = parseInt(searchParams.get('page')) || 1;
        let limit = parseInt(searchParams.get('limit')) || 5;
        const skip = (page - 1) * limit;

        const [totalDocuments, topicList] = await Promise.all([
            TopicModel.countDocuments({ deleted: false }),
            TopicModel.find({ deleted: false }).limit(limit).skip(skip)
        ]);

        const totalPages = Math.ceil(totalDocuments / limit);

        return NextResponse.json({
            currentPage: page,
            totalPages,
            totalItems: totalDocuments,
            topicList,
        }, { status: 200, statusText: "Get all topics" });

    } catch (error) {
        console.error("Error while getting topic data:", error);
        return NextResponse.json({ message: "Error while getting topic data" }, { status: 500 });
    }
}


export async function POST(request) {
    try {
        await connectDB()
        const body = await request.json();
        const newTopic = new TopicModel(body);
        await newTopic.save();

        return NextResponse.json({ message: "Topic added successfully", topic: newTopic }, { status: 201 });

    } catch (error) {
        console.error("Error while adding topic data:", error);

        return NextResponse.json({ message: "Error while adding topic data" }, { status: 500 });
    }
}
