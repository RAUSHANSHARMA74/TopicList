"use server"
import { NextResponse } from "next/server";
import TopicModel from "@/lib/model/topic";
import connectDB from "@/lib/config";

export async function GET(request, { params }) {
    const { id } = params;

    try {
        await connectDB()
        const getOneTopic = await TopicModel.findOne({ _id: id, deleted: false });

        if (!getOneTopic) {
            return NextResponse.json({ message: "Topic not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "One topic fetched successfully",
            topic: getOneTopic
        }, { status: 200 });

    } catch (error) {
        console.error("Error while getting topic data:", error);
        return NextResponse.json({ message: "Error while getting topic data" }, { status: 500 });
    }
}


export async function PATCH(request, { params }) {
    const { id } = params;

    try {
        await connectDB()

        const body = await request.json();

        const updatedTopic = await TopicModel.findOneAndUpdate(
            { _id: id, deleted: false },
            body,
            { new: true }
        );

        if (!updatedTopic) {
            return NextResponse.json({ message: "Topic not found or already deleted" }, { status: 404 });
        }

        return NextResponse.json({ message: "Topic updated successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error while updating Topic data:", error);
        return NextResponse.json({ message: "Error while updating Topic data" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        await connectDB()

        const deletedTopic = await TopicModel.findByIdAndUpdate(id, { deleted: true }, { new: true });

        if (!deletedTopic) {
            return NextResponse.json({ message: "Topic not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Topic deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error while deleting topic data:", error);
        return NextResponse.json({ message: "Error while deleting topic data" }, { status: 500 });
    }
}