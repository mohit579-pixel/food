import Icon from '../icons/Icon';
import './Card.css';
function Card({player,onPlay,index}) {
    let icon = <Icon />;
    if (player === 'X')
        icon = <Icon name='cross' />;
    else if (player === 'O')
        icon = <Icon name='circle' />;

    return (
        <div className='card' onClick={()=>onPlay(index)}>
            {icon}
            {/* hello */}
        </div>
    );
}

export default Card;
