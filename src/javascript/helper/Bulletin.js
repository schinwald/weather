import { useState, useEffect, useRef } from 'react';


function Bulletin(props) {

    const { alerts } = props;
    const [ animationDuration, setAnimationDuration ] = useState(0);
    const refBulletin = useRef(null);
    const refBulletinMessage = useRef(null);
    let bulletinMessage;

    useEffect(() => {
        const bulletin = refBulletin.current;
        const bulletinMessage = refBulletinMessage.current;
        const width = bulletinMessage.clientWidth > bulletin.clientWidth ? bulletinMessage.clientWidth : bulletin.clientWidth;
        const duration = width / 0.05;
        setAnimationDuration(duration);
    }, [refBulletin, refBulletinMessage, alerts])

    if (alerts && alerts.length > 0) {
        bulletinMessage = <>
            { 
                alerts.map((element, index) => {
                    return <>
                        <span>{element.sender_name + ":"}</span>
                        <span>{element.description}</span>
                    </>
                })
            }
        </>
    } else {
        bulletinMessage = <>
            <span>NO NEWS ALERT</span>
        </>
    }

    return (
        <div ref={refBulletin} className="bulletin">
            <p ref={refBulletinMessage} className="bulletin__message"
                style={{animationDuration: animationDuration + "ms"}}>
                { bulletinMessage }
            </p>
        </div>
    )
}


export { Bulletin };