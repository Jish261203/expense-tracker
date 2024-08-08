import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import TransactionPage from "./pages/TransactionPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/ui/Header";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

function App() {
	const { loading, data  } = useQuery(GET_AUTHENTICATED_USER);
	const [authUser, setAuthUser] = useState(null);

	useEffect(() => {
		if (!loading) {
			setAuthUser(data?.authUser);
		}
	}, [loading, data]);

	if (loading) return null; // Or a loading spinner component

	return (
		<>
			{authUser && <Header />}
			<Routes>
				<Route
					path="/"
					element={authUser ? <HomePage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/login"
					element={authUser ? <Navigate to="/" /> : <LoginPage />}
				/>
				<Route
					path="/signup"
					element={authUser ? <Navigate to="/" /> : <SignUpPage />}
				/>
				<Route
					path="/transaction/:id"
					element={authUser ? <TransactionPage /> : <Navigate to="/login" />}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
