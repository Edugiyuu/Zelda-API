import { Link } from 'react-router-dom';
import '../Styles/CustomLink.css';
import top1 from '../Imgs/ButtonStyle/top1.svg'
import bottom1 from '../Imgs/ButtonStyle/bottom1.svg'

const CustomLink = ({ to, title }: any) => {
    return (
        <Link to={to} className="buttonText">
            <img src={bottom1} className="decoration bottom1" />
            <img src={bottom1} className="decoration bottom2" />
            {title}
            <img src={top1}  className="decoration top2" />
            <img src={top1}  className="decoration top1" />
        </Link>
    );
};

export default CustomLink;