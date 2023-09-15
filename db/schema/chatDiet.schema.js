import mongoose from 'mongoose';
const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    trainerId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const Chat = mongoose.model(`roomName${roomId}`, chatSchema);

// const modelName = `roomName${roomId}Chat`;
// const Chat = mongoose.model(modelName, chatSchema);

export default Chat;
