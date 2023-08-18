import { CircularProgress } from "@mui/material";
import {useEffect, useState} from "react";
import Question from "../../components/Question/Question";
import "./Quiz.css";
const Quiz = ({name, questions, score, setScore, setQuestions, nQues}) => {
	const [options, setOptions] = useState();
	const [currQues, setCurrQues] = useState(0);


	useEffect(() => {
		setOptions(
			questions &&
				handleShuffle([
					questions[currQues]?.correct_answer,
					...questions[currQues]?.incorrect_answers,
				])
		);
	}, [questions, currQues]);

	const handleShuffle = (optionss) => {
		return optionss.sort(() => Math.random() - 0.5);
	};

	if (questions) {
		console.log(questions)
	}
	return (
		<div className="quiz">
			<span className="subtitle">Welcome, {name}</span>
			
			{questions ? (
				<>
					<div className="quizInfo">
						<span>{questions[currQues].category}</span>
						<span>Score: {score}</span>
					</div>

					<Question
						currQues={currQues}
			            setCurrQues={setCurrQues}
			            questions={questions}
			            options={options}
			            correct={questions[currQues]?.correct_answer}
			            score={score}
			            setScore={setScore}
			            setQuestions={setQuestions}
						nQues ={nQues}
					/>
				</>
			) : (
				<CircularProgress
					style={{margin: 100}}
					color="inherit"
					size={150}
					thickness={1}
				/>
			)}		
		</div>
	);
};

export default Quiz;