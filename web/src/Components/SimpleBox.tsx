import '../Styles/SimpleBox.css';

const SimpleBox = ({ img, title, subtitle }: any) => {
    return (
        <div
            className="SimpleBox"
            style={{
                backgroundImage: `url(${img})`,
            }}
        >
            <div className='BoxInfo'>
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>

        </div>
    );
};

export default SimpleBox;
