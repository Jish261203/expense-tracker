import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import TransactionPage from "./pages/TransactionPage";
import LoginPage from './pages/LoginPage'
import Header from "./components/ui/Header";

function App() {
  const authUser = true;
	return (
		<>
			{authUser && <Header />}
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/transaction/:id" element={<TransactionPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}
export default App;
