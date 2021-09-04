

function News(props) {

    const { text } = props;

    return (
        <div class="news">
            <span>National News Alert: </span>
            <span>{text}</span>
        </div>
    )
}


export { News }