import '../Styles/SimpleBox.css';
import top1 from '../Imgs/ButtonStyle/top1.svg'
import bottom1 from '../Imgs/ButtonStyle/bottom1.svg'

const SimpleBox = ({ img, title, subtitle, width, height }: any) => {
    return (

        <div
            className="SimpleBox"
            style={{
                backgroundImage: `url(${img})`,
            }}
        >

            <div className='BoxInfo' style={{ width: `${width}`, height: `${height}` }}>
                <img src={bottom1} className="decoration bottom1" />
                <img src={bottom1} className="decoration bottom2" />
                <h3>{title}</h3>
                <p>{subtitle}</p>
                <img src={top1} className="decoration top2" />
                <img src={top1} className="decoration top1" />
            </div>

        </div>
    );
};

export default SimpleBox;
