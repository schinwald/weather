import { useEffect, useState, useRef } from 'react';

const classNames = require("classnames");


function Search(props) {

	const { autocomplete, count, data, onSearch } = props;
    let [ location, setLocation ] = useState("");
	let [ results, setResults ] = useState([]);
	let [ focus, setFocus ] = useState(false);
	let [ selected, setSelected ] = useState(null);
	let refLocation = useRef();

	useEffect(() => {
		if (focus === true && autocomplete === true && data !== null) {
			const query = location.replace(/[\s]*[,]([\s]*)/, ",$1").replace(/[\s]+/, " ").toLowerCase();
			const array = data.filter((element) => {
					const { tag } = element;
					if (query === "") return true;
					if (tag.search(query) !== -1) return true;
					return false;
				})
				.slice(0, count);
			setResults(array);
			if (array.length > 0) setSelected(0);
		} else {
			setResults([]);
			setSelected(null);
		}
	}, [location, count, data, autocomplete, focus]);

	function generateResultsHTML() {
		const query = location.replace(/[\s]*[,]([\s]*)/, ",$1").replace(/[\s]+/, " ").toLowerCase();
		const html = results.map((element, key) => {
			const { tag, name } = element;
			const start = tag.search(query);
			const end = start + query.length;
			const stringA = name.slice(0, start);
			const stringB = name.slice(start, end);
			const stringC = name.slice(end, name.length);
			return (
				<li key={key}
					className={classNames({"selected": selected === key})}
					onClick={() => {handleResultClick(key);}}
					onMouseOver={() => {setSelected(key)}}
					onFocus={handleFocus}>
					<p>
						<span className="mismatch">{stringA}</span>
						<span className="match">{stringB}</span>
						<span className="mismatch">{stringC}</span>
					</p>
				</li>
			);
		});
		return html;
	}

	function handleResultClick() {
		const input = refLocation.current;
		const result = results[selected];
		input.value = result.name;
		setLocation(result.tag);
		onSearch(result);
	}

	function handleKeyDown(event) {
		const code = event.code;
		switch (code) {
			case 'Enter':
				if (selected !== null && 0 <= selected && selected < results.length) {
					handleResultClick(selected);
				}
				break;
			case 'ArrowUp':
				if (selected !== null && 0 <= selected - 1 && selected - 1 < results.length) {
					setSelected(selected - 1);
				} else if (selected === null && results.length > 0) {
					setSelected(0);
				}
				break;
			case 'ArrowDown':
				if (selected !== null && 0 <= selected + 1 && selected + 1 < results.length) {
					setSelected(selected + 1);
				} else if (selected === null && results.length > 0) {
					setSelected(0);
				}
				break;
			default:
				break;
		}
	}

	function handleChange(event) {
		const input = event.target;
		let text = input.value;
		// last character of text was deleted
		if (text === location.substring(0, location.length - 1)) {
			// second last character is a comma
			if (text[text.length - 1] === ",") {
				text = text.substring(0, text.length - 1);
			}
		}
		const array = text.replace(/[^\sa-zA-Z,]/, "")
			.replace(/[\s]*[,][\s]*/, ",")
			.split(",")
			.map((text) => {
				const array = text.replace(/[\s]+/, " ")
					.split(" ")
					.map((text) => {
						if (text.length > 0) return text[0].toUpperCase() + text.slice(1).toLowerCase();
						return "";
					})
				return array.join(" ");
			});
		const processed = array.join(", ");
		if (location !== processed) {
			setLocation(processed);
		}
		input.value = processed;
	}

	function handleFocus(event) {
		setFocus(true);
	}

	function handleBlur(event) {
		
	}

	return (
		<div className="search"
			onFocus={handleFocus}
			onBlur={handleBlur}>
			<div className="input">
				<input
					ref={refLocation}
					type={"search"}
					placeholder={"City, Country"}
					onKeyDown={handleKeyDown}
					onChange={handleChange}
					disabled={data === null}
				/>
				<input
					type="button"
					value={"🔍"}
					onClick={handleResultClick}
				/>
			</div>
			{results.length > 0 &&
				<ul>
					{generateResultsHTML()}
				</ul>
			}
		</div>
	);
}


export { Search };