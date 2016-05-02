require('normalize.css/normalize.css');
require('styles/style.stylus');

import React from 'react';
import AuthView from './authView';
import { AppBar, Icon, Snackbar } from 'material-ui';
import Nav from './nav';

import { VelocityTransitionGroup } from 'velocity-react';

import { connect } from 'react-redux';

class AppComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isNavigationOpen: false
		}
	}

	componentDidMount() {

	}

	setNavigationOpen(open) {
		this.setState({ isNavigationOpen: open });
	}

	render() {
		return (

		<div>
			<AppBar
				title="crowdplay"
				onLeftIconButtonTouchTap={ () => this.setNavigationOpen(true) }
				style={{
					position: "fixed",
					top: 0
				}}>
				whoah
			</AppBar>

			<Nav open={this.state.isNavigationOpen} onRequestChange={(open) => this.setNavigationOpen(open)} />

			<div>
				{this.props.errors.map((error, index) => {
					return <Snackbar open={true} message={error} key={index} onRequestClose={() => {}} />
				})}
			</div>

			<div style={{
				marginTop: "60px"
			}}>
				<VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
					{ this.props.children }
				</VelocityTransitionGroup>
			</div>
		</div>);
	}
}

function mapStateToProps(state) {
	return {
		errors: state.get("errors")
	}
}

export default connect(mapStateToProps)(AppComponent);
