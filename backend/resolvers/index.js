import {  mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.resolvers.js";
import transactionResolver from "./transactions.resolvers.js";

const mergedResolvers = mergeResolvers([userResolver, transactionResolver])

export default mergedResolvers