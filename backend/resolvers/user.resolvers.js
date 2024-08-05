import { users } from "../dummyData/data.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
	Mutation: {
		signUp: async (_, { input }, context) => {
			try {
				const { username, name, password, gender } = input;

				if (!username || !name || !password || !gender) {
					throw new Error("All fields are required");
				}
				const existingUser = await User.findOne({ username });
				if (existingUser) {
					throw new Error("User already exists");
				}
				const salt = await bcrypt.genSalt(10);
				const hashedpassword = await bcrypt.hash(password, salt);

				const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
				const girProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

				const newUser = new User({
					username,
					name,
					password: hashedpassword,
					gender,
					profilePicture: gender === "male" ? boyProfilePic : girProfilePic,
				});

				await newUser.save();
				await context.login(newUser);
				return newUser;
			} catch (err) {
				console.log("Error in signUp", err);
				throw new Error(err.message || "internal server error");
			}
		},

		login: async (_, { input }, context) => {
			try {
				const { username, password } = input;
				const { user } = await context.authenticate("graphql-local", {
					username,
					password,
				});

				await context.login(user);
				return user;
			} catch (err) {
				console.log("Error in login", err);
				throw new Error(err.message || "internal server error");
			}
		},

		logout: async (_, _, context) => {
			try {
				await context.logout();
				req.session.destroy((err) => {
					if (err) throw err;
				});
				res.clearCookie("connect.sid");
				return { message: "Logged out successfully" };
			} catch (err) {
				console.log("Error in logout", err);
				throw new Error(err.message || "internal server error");
			}
		},
	},
	Query: {
		authUser: async (_, _, context) => {
			try {
				const user = await context.getUser();
				return user;
			} catch (err) {
				console.log("Error in authUser", err);
				throw new Error(err.message || "internal server error");
			}
		},
		user: async (_, { userId }) => {
			try {
				const user = await User.findById(userId);
				return user;
			} catch (err) {
				console.log("Error in user query", err);
				throw new Error(err.message || "Error in getting user");
			}
		},
	},
};

export default userResolver;
