import React, { useCallback, useEffect, useRef, useState } from "react";

export function NavHighlightedMenu({ items, offset }) {
	const [active, setActive] = useState(null);
	const rootRef = useRef();

	const onChangeActiveItem = useCallback((activeId) => {
		if (activeId) {
			setTimeout(() => {
				if (!rootRef.current) return;

				const activeNode = rootRef.current.querySelector('.nav__item_active');
				if (!activeNode) return;

				if (typeof activeNode.scrollIntoViewIfNeeded === "function") {
					activeNode.scrollIntoViewIfNeeded(true);
				}
			});
		}

		setActive(activeId);
	}, []);

	const onScroll = useCallback(() => {
		if (!(items instanceof Array)) {
			return null;
		}

		let isActiveFound = false;

		for (let i = 0; i < items.length; i++) {
			const item = items[i];

			const node = document.querySelector(`[data-nav-section="${item.anchor}"]`);
			if (!node || typeof node.getBoundingClientRect !== "function") continue;

			const boundingClientRect = node.getBoundingClientRect();

			if (
				boundingClientRect.top < window.innerHeight &&
				boundingClientRect.top - offset + node.offsetHeight > 0
			) {
				if (active !== item.anchor) {
					onChangeActiveItem(item.anchor);
				}

				isActiveFound = true;
				break;
			}
		}

		if (!isActiveFound) {
			setActive(null);
		}
	}, [active, items, offset]);

	useEffect(() => {
		window.addEventListener("scroll", onScroll);
		onScroll();

		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	if (!(items instanceof Array)) {
		return null;
	}

	return (
		<div className="nav" ref={rootRef}>
			<div className="nav__inner">
				{items.map((item) => (
					<li
						key={item.anchor}
						className={`nav__item nav__item_${active === item.anchor ? "active" : "no-active"}`}
					>
						<a
							href={`#${item.anchor}`}
							className={`nav__link nav__link_${
								active === item.anchor ? "active" : "no-active"
							}`}
						>
							{item.content}
						</a>
					</li>
				))}
			</div>
		</div>
	);
}