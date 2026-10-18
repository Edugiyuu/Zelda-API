import top from '../Imgs/ButtonStyle/top1.svg'
import bottom from '../Imgs/ButtonStyle/bottom1.svg'

/** The gold corner flourishes used around framed cards. The parent must be position: relative. */
const Ornaments = () => (
    <>
        <img className="ornament ornament-tl" src={top} alt="" />
        <img className="ornament ornament-tr" src={top} alt="" />
        <img className="ornament ornament-bl" src={bottom} alt="" />
        <img className="ornament ornament-br" src={bottom} alt="" />
    </>
);

export default Ornaments;
