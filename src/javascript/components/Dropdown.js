import classNames from "classnames";
import { useEffect, useState } from "react";

function Dropdown(props) {

    const { index, items, callback } = props;
    const [ active, setActive ] = useState(0);
    const [ selected, setSelected ] = useState(-1);
    const [ collapse, setCollapse ] = useState(true);
    let dropdown;

    useEffect(() => {
        setActive(index);
    }, [index])

    function onKeyDown(event) {
        const code = event.code;
        let index = -1;
        switch (code) {
			case 'Enter':
                index = selected;
				if (0 <= index && index < items.length) {
                    activate(index);
				}
				break;
			case 'ArrowUp':
                index = selected - 1;
                if (index === active) index--;
				if (0 <= index && index < items.length) {
                    setSelected(index);
				}
				break;
			case 'ArrowDown':
                index = selected + 1;
                if (index === active) index++;
				if (0 <= index && index < items.length) {
                    setSelected(index);
				}
				break;
			default:
				break;
        }
    }

    function activate(index) {
        setActive(index);
        setCollapse(true);
        setSelected(-1);
        callback(index);
    }
    
    if (items) {
        dropdown = {
            button: (
                <div tabindex={0} className={"dropdown__button"} 
                    onClick={(event) => { setCollapse(!collapse) }}
                    onKeyDown={(event) => { onKeyDown(event); }}>
                        {items[active]}
                </div>
            ),
            items: collapse ? null : <>
                <hr className={"dropdown__divider"} />
                <ul className={"dropdown__items"}>
                    {
                        items.map((value, index) => {
                                return (
                                    <li key={index} className={classNames("dropdown__item", { "selected": selected === index})}
                                        onClick={() => { activate(index); }}
                                        onMouseOver={() => { setSelected(index); }}>
                                        {value}
                                    </li>
                                )
                            }).filter((predicate, index, array) => {
                                if (index !== active) return true;
                                return false;
                            })
                    }
                </ul>
            </>
        }
    } else {
        dropdown = {
            button: null,
            items: null
        }
    }

    return (
        <div className={"dropdown"}>
            <div className={"dropdown__container"}>
                { dropdown.button }
                { dropdown.items }
            </div>
        </div>
    )
}

export { Dropdown }