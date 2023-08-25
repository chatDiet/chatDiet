import mongoose from 'mongoose';
import test1 from '../../public/js/chat.js';
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
