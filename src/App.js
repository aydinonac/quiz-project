import './App.css';
import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";

function App() {
  const [questions, setQuestions] = useState();
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);

  const fetchQuestions = async(category = "", difficulty = "") => {
    const {data}=await axios.get(
      `https://opentdb.com/api.php?amount=10${category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    setQuestions(data.results);
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
          <Routes>
            <Route path='/' element={<Home
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions}
              />
            }>
            </Route> 
            <Route path='/quiz' element={<Quiz
              name={name}
              questions={questions}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
              />
            }>
            </Route> 
            <Route path='/result' 
              element={<Result name={name} score={score} category="lit"/>}>
            </Route>         
          </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
