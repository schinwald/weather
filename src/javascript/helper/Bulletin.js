import { useState, useEffect, useRef } from 'react';


function Bulletin(props) {

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

    function getAlert() {
        if (text.length > 0) {
            return (
                <>
                    <span>NEWS ALERT:</span>
                    <span>{text.toUpperCase()}</span>
                </>
            );
        } else {
            return (
                <>
                    <span>NO NEWS ALERT</span>
                    <span>{text.toUpperCase()}</span>
                </>
            );
        }
    }

    return (
        <div ref={refBulletin} className="bulletin">
            <p ref={refBulletinMessage} className="bulletin__message"
                style={{animationDuration: animationDuration + "ms"}}>
                {getAlert()}
            </p>
        </div>
    )
}


export { Bulletin };