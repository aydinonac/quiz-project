import undraw_Questions_re_1fy7 from "./undraw_Questions_re_1fy7.png"
import { Backdrop, Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
// import { useHistory} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Categories from '../../Data/Categories';
import "./Home.css";
import { blueGrey } from "@mui/material/colors";
console.log(Categories)
const Home = ({name, setName, fetchQuestions, category, updateCategory, nQues, setNQues}) => {
	
	const [difficulty, setDifficulty] = useState("");
	const [error, setError] = useState(false);
	const [totalQues, setTotalQues] = useState(0);
	const [allowStartQuiz, setAllowStartQuiz] = useState(false);
	// const history = useHistory();
	const navigate = useNavigate();

	const handleSubmit = async() => {
		if (!category || !difficulty || !name) {
			setError(true)
			return;
		} else {
			setError(false)
			setTotalQues(await fetchQuestions(category, difficulty))
			// history.push("quiz");
			/// only going to navigate once nQues has been selected
			// navigate("/quiz");
		}
	};

	function setupQuiz(e) {
		setNQues(e.target.value);
		setAllowStartQuiz(true)
			
	}

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
						Fetch Quiz
					</Button>
					{totalQues > 0 ? <TextField
						style={{ marginTop: 20 }}
						label="Number of questions (4 - 10)? "
						variant="outlined"
						onChange={(e) => {(e.target.value > 3 && e.target.value <= totalQues) ? 
							setupQuiz(e) : 
							setAllowStartQuiz(false)
						}}
						/> : null}
					{allowStartQuiz ? <Button
						variant="contained"
						color="primary"
						size="large"
						onClick={() => navigate("./Quiz")}
					>
						Start Quiz
					</Button> : null} 
				</div>
			</div>
			<img src={undraw_Questions_re_1fy7} className="banner" alt="quiz img"/>
		</div>
		
	);
};

export default Home;