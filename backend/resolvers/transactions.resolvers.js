import Transaction from "../models/transaction.model.js";
const transactionResolver = {
	Query: {
		transactions: async (_, __, context) => {
			try {
				if (!context.getUser()) throw new Error("Unauthorized");
				const userId = await context.getUser()._id;
				const transactions = await Transaction.find({ userId });
				return transactions;
			} catch (err) {
				console.log("Error getting transaction", err);
				throw new Error("Error getting transaction");
			}
		},

		transaction: async (_, { transactionId }) => {
			try {
				const transaction = await Transaction.findById(transactionId);
				return transaction;
			} catch (err) {
				console.log("Error getting transaction", err);
				throw new Error("Error getting transaction");
			}
		},
		//
	},
	Mutation: {
		createTransaction: async (_, { input }, context) => {
			try {
				const newTransaction = new Transaction({
					...input,
					userId: context.getUser()._id,
				});

				await newTransaction.save();
				return newTransaction;
			} catch (err) {
				console.log("Error creating transaction", err);
				throw new Error("Error creating transaction");
			}
		},
		updateTransaction: async (_, { input }) => {
			try {
				const updateTransaction = await Transaction.findByIdAndUpdate(
					input.transactionId,
					input,
					{ new: true }
				);
				return updateTransaction;
			} catch (err) {
				console.log("Error updating transaction", err);
				throw new Error("Error updating transaction");
			}
		},
		deleteTransaction: async (_, { transactionId }) => {
			try {
				const deleteTransaction = await Transaction.findByIdAndDelete(
					transactionId
				);
				return deleteTransaction;
			} catch (error) {
				console.log("Error deleting transaction", err);
				throw new Error("Error deleting transaction");
			}
		},
    },
    //
};

export default transactionResolver;
