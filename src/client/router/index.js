import { h, cloneElement, Component, toChildArray } from 'preact';
import { exec, prepareVNodeForRanking, assign, pathRankSort } from './util';

let customHistory = null;
const ROUTERS = [];
const EMPTY = {};

export const subscribers = [];

function setUrl(url, type='push') {
	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	}
	else if (typeof history !== 'undefined' && history[type+'State']) {
		history[type+'State'](null, null, url);
	}
}

export function getCurrentUrl() {
	let url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	}
	else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	}
	else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return `${url.pathname || ''}${url.search || ''}`;
}

export function route(url, replace=false) {
	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
    }
    setUrl(url, replace ? 'replace' : 'push');
	return routeTo(url);
}

function routeTo(url) {
	let didRoute = false;
	for (let i = 0; i<ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (let i = subscribers.length; i--;) {
		subscribers[i](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	let href = node.getAttribute('href'), target = node.getAttribute('target');
	return route(href);
}

function handleLinkClick(e) {
    routeFromLink(e.currentTarget || e.target || this);
    
    if (e) {
		if (e.stopImmediatePropagation) e.stopImmediatePropagation();
		if (e.stopPropagation) e.stopPropagation();
		e.preventDefault();
	}
	return false;
}

let eventListenersInit = false;

function initEventListeners() {
	if (eventListenersInit) return;

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', () => {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', e => {
            if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) return;

            let t = e.target;
            do {
                if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href')) {
                    if (t.hasAttribute('native')) return;
                    if (routeFromLink(t)) {
                        return prevent(e);
                    }
                }
            } while ((t = t.parentNode));
        });
	}
	eventListenersInit = true;
}


export class Router extends Component {
	constructor(props) {
		super(props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	shouldComponentUpdate(props) {
		if (props.static !== true) return true;
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	}

	canRoute(url) {
		const children = toChildArray(this.props.children);
		return this.getMatchingChildren(children, url, false).length > 0;
	}

	routeTo(url) {
		this.setState({ url });
		const didRoute = this.canRoute(url);
		if (!this.updating) this.forceUpdate();
		return didRoute;
	}

	componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	}

	componentDidMount() {
		if (customHistory) {
			this.unlisten = customHistory.listen((location) => {
				this.routeTo(`${location.pathname || ''}${location.search || ''}`);
			});
		}
		this.updating = false;
	}

	componentWillUnmount() {
		if (typeof this.unlisten === 'function') this.unlisten();
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	}

	componentWillUpdate() {
		this.updating = true;
	}

	componentDidUpdate() {
		this.updating = false;
	}

	getMatchingChildren(children, url, invoke) {
		return children
			.filter(prepareVNodeForRanking)
			.sort(pathRankSort)
			.map( vnode => {
				let matches = exec(url, vnode.props.path, vnode.props);
				if (matches) {
					if (invoke !== false) {
						let newProps = { url, matches };
						assign(newProps, matches);
						delete newProps.ref;
						delete newProps.key;
						return cloneElement(vnode, newProps);
					}
					return vnode;
				}
			}).filter(Boolean);
	}

	render({ children, onChange }, { url }) {
		let active = this.getMatchingChildren(toChildArray(children), url, true);

		let current = active[0] || null;

		let previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url,
					previous,
					active,
					current
				});
			}
		}

		return current;
	}
}

export const Link = (props) => (
	h('a', assign({ onClick: handleLinkClick }, props))
);

export const Route = props => h(props.component, props);
export { exec };
