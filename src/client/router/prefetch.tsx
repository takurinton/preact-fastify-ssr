import { h, Component } from 'preact';
import { subscribers, getCurrentUrl, Link as StaticLink, exec } from './index';

export class Match extends Component {
	componentDidMount() {
		this.update = url => {
			this.nextUrl = url;
			this.setState({});
		};
		subscribers.push(this.update);
	}

	componentWillUnmount() {
		subscribers.splice(subscribers.indexOf(this.update)>>>0, 1);
	}
	
	render(props) {
		let url = this.nextUrl || getCurrentUrl(),
			path = url.replace(/\?.+$/,'');
		this.nextUrl = null;
		return props.children({
			url,
			path,
			matches: exec(path, props.path, {}) !== false
		});
	}
}

export function Link({ class: c, className, path, ...props }) {
	const inactive = [c, className].filter(Boolean).join(' ');
	const active = [c, className].filter(Boolean).join(' ');
	return (
		<Match path={path || props.href}>
			{ ({ matches }) => (
				<StaticLink {...props} class={matches ? active : inactive} />
			) }
		</Match>
	);
}

export default Match;