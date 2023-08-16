import undraw_Questions_re_1fy7 from "./undraw_Questions_re_1fy7.png"
import { Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
// import { useHistory} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Categories from '../../Data/Categories';
import "./Home.css";
console.log(Categories)
const Home = ({name, setName, fetchQuestions, category, updateCategory}) => {
	
	const [difficulty, setDifficulty] = useState("");
	const [error, setError] = useState(false);

	// const history = useHistory();
	const navigate = useNavigate();

	const handleSubmit = () => {
		if (!category || !difficulty || !name) {
			setError(true)
			return;
		} else {
			setError(false)
			fetchQuestions(category, difficulty)
			// history.push("quiz");
			navigate("/quiz");
		}
	};

	return (
		<div className="content">
			<div className="settings">
				<span style={{ fontSize: 25 }}>Quiz Settings</span>
				<div className="settings_select">
					{error && <ErrorMessage>Please fill in all the fields</ErrorMessage>}
					<TextField
						style={{ marginBottom: 20 }}
						label="Enter your name: "
						variant="outlined"
						onChange={(e) => setName(e.target.value)} />
					<TextField
						select
						label="Select category: "
						variant="outlined"
						style={{ marginBottom: 20 }}
						onChange = {(e) =>  updateCategory(e.target.value)}
						value={category}>
					
						{Categories.map((cat) => (
							<MenuItem key={cat.category} value={cat.value}>
								{cat.category}
							</MenuItem>
					))}
					</TextField>
				
					<TextField
						select
						label="Select Difficulty: "
						variant="outlined"
						style={{ marginBottom: 20 }}
						onChange={(e) => setDifficulty(e.target.value)}
						value={difficulty}
					>
						<MenuItem key="Easy" value="easy">
							Easy
						</MenuItem>
						<MenuItem key="Medium" value="medium">
							Medium
						</MenuItem>
						<MenuItem key="Hard" value="hard">
							Hard
						</MenuItem>
					</TextField>
					<Button
						variant="contained"
						color="primary"
						size="large"
						onClick={handleSubmit}
					>
						Start Quiz
					</Button>
				</div>
			</div>
			<img src={undraw_Questions_re_1fy7} className="banner" alt="quiz img" />
		</div>
		
	);
};

export default Home;