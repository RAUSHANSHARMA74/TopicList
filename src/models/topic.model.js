"use server"
import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});

const TopicModel = mongoose.models.Topic || mongoose.model('Topic', topicSchema);

export default TopicModel;
