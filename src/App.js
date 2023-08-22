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
  // a state variable consumable by multiple children
  const [category, setCategory] = useState("");
  const [nQues, setNQues] = useState(0);

  const fetchQuestions = async(category = "", difficulty = "") => {
    const {data}=await axios.get(
      `https://questionbank-6jpv66rewq-uc.a.run.app?amount=30${category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
  
    setQuestions(data.results);
    return data.results ? data.results.length : 0
  }
  
  function updateCategory(category) {
      setCategory(category)
  }
 
  console.log(questions)
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
          <Routes>
            <Route path='/' element={<Home
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions}
              category={category}
              updateCategory={updateCategory}
              nQues={nQues}
              setNQues={setNQues}
              />
            }>
            </Route> 
            <Route path='/quiz' element={<Quiz
              name={name}
              questions={questions}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
              nQues={nQues}
              />
            }>
            </Route> 
            <Route path='/result' 
              element={<Result name={name} score={score} category={category} nQues={nQues}/>}>
            </Route>         
          </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
 