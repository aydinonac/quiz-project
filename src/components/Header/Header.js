import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
	return (
		<div className="Header">
			<Link to="/" className="title">Test-your-knowledge QUIZ</Link>
			<hr className='divider'/>
		</div>
	);
};

export default Header;