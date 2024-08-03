import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB Connected:${conn.connected.host}`);
	} catch (err) {
		console.log(`Error ${err.message}`);
		process.exit(1);
	}
};
