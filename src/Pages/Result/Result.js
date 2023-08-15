import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "@mui/material";
import "./Result.css";

const Result = ({name, score, category}) => {
	const navigate = useNavigate()
	let ctx = null
	const nQues = 10
	
	useEffect(() => {
		if (!name) {
			navigate("/")
		}
		document.getElementById("demo").innerHTML="Results: You scored " + 
		score + "/" + nQues + " in " + "'" + category + "'"
		const canvas = document.getElementById('canvas');
		console.log('canvas', canvas)
		ctx = canvas.getContext('2d');
		draw()
	}, [name, navigate]);
	
  const draw = () => {  
    // let nQues=10;
    let n=60;  // Split circle into 60 mini-sectors
    let s= 2*Math.PI/n  // Angle(radians) for one mini-sector
    let q = n/nQues  // number of mini-sectors per question sector

    for (let c=0; c<(q*score); c=c+q) {pie('green', s, q, c)}
    for (let c=(q*score); c<n-0.1; c=c+q) {pie('red', s, q, c)}
  }
	
	const pie = (col, s, q, c) => {
		let a = 205; 
    let b = 180;
    let r=150;  // Centre(a,b) and radius(r) of circle
    ctx.strokeStyle= '#202';
    ctx.lineWidth = 1;
    ctx.fillStyle = col
    ctx.beginPath();
    ctx.moveTo(a, b)
    for (let i=0; i<=q; i=i+s) {
        ctx.lineTo(a+(r*Math.cos((c+i)*s)), b+(r*Math.sin((c+i)*s)));
    }
    ctx.closePath();
    ctx.fill()
    ctx.stroke();
	}
	
	return (
		<div className="result">
			<br/><br/>,
			{/*<h1 style={{textAlign: "center", color: "blue", marginTop: '6%'}}>Results</h1>*/}
    	<h2 id="demo" style={{textAlign: "center"}}></h2>
    	<div className="content" style={{textAlign: "center"}}>
        <canvas id="canvas" height="360" width="410" ></canvas>
        
        <form className = "legend" style={{border: "1px solid black"}}>
          <span className="legend-row">
            <span style={{backgroundColor: 'green', width: '20px', height: '20px', margin: '20px'}}></span>
            <span style={{fontSize: '25px'}}> = correct </span>
          </span>

          <span className="legend-row">
           	<span style=
           	{{backgroundColor: 'red', width: '20px', height: '20px', margin: '20px'}}></span>
            <span style={{fontSize: '25px'}}> = wrong</span>
          </span>
        </form>
    	</div>
			

			<Button
				variant="contained"
				color="secondary"
				size="large"
				style={{ alignSelf: "center", marginTop: 20}}
				href="/"
			>
				Go to Homepage
			</Button>
		</div>
	);
};

export default Result;