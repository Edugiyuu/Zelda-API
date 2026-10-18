import { DiamondIcon } from './Icons';

interface PageHeadProps {
    eyebrow: string
    title: string
    lead: string
}

const PageHead = ({ eyebrow, title, lead }: PageHeadProps) => (
    <header className="page-head">
        <p className="eyebrow"><DiamondIcon />{eyebrow}</p>
        <h1 className="page-title">{title}</h1>
        <p className="page-lead">{lead}</p>
        <div className="rule"><span /><DiamondIcon /><span /></div>
    </header>
);

export default PageHead;
