import { useState, useEffect, useRef } from 'react';


function News(props) {

    const { text } = props;
    const [ animationDuration, setAnimationDuration ] = useState(0);
    const refBulletin = useRef(null);
    const refBulletinMessage = useRef(null);

    useEffect(() => {
        const bulletin = refBulletin.current;
        const bulletinMessage = refBulletinMessage.current;
        const width = bulletinMessage.clientWidth > bulletin.clientWidth ? bulletinMessage.clientWidth : bulletin.clientWidth;
        const duration = width / 0.05;
        setAnimationDuration(duration);
    }, [refBulletin], [refBulletinMessage, text],)

    return (
        <div ref={refBulletin} className="bulletin">
            <p ref={refBulletinMessage} className="bulletin__message"
                style={{animationDuration: animationDuration + "ms"}}>
                {text}
            </p>
        </div>
    )
}


export { News };