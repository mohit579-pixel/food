import { FaRegCircle,FaPen ,FaTimes} from 'react-icons/fa';
function Icon({ name = 'pen' }) {
    if (name === 'circle') return <FaRegCircle />;
    else if (name === 'cross') return <FaTimes />;
    else return <FaPen />;
}
export default Icon;