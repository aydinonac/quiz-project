import './App.css';
import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";
import Categories from './Data/Categories';

function App() {
  const [questions, setQuestions] = useState();
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
// a state variable to be consumed by multiple children
  const [category, setCategory] = useState("");

  const fetchQuestions = async(category = "", difficulty = "") => {
    const {data}=await axios.get(
      `https://opentdb.com/api.php?amount=10${category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    setQuestions(data.results);
  }

  function updateCategory(category) {

      setCategory(category)
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
              category={category}
              updateCategory={updateCategory}
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
              element={<Result name={name} score={score} category={category}/>}>
            </Route>         
          </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
