import React, {PropTypes} from 'react';

import {
	Card,
	Toolbar,
	ToolbarGroup,
	RaisedButton,
	List,
	ListItem,
	Avatar
} from 'material-ui';

import { firebaseForRoomId } from 'helpers/firebase';

import { Map, fromJS } from 'immutable';

import { connect } from 'react-redux';

class HistoryView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tracks: new Map()
		};
	}

	componentDidMount() {
		this.query = firebaseForRoomId(this.props.roomId)
			.child("history")
			.orderByChild("playedAt");

		this.onQueueUpdated = this.query.on("value",
			(snapshot) => {
				let tracksObject = snapshot.val();
				let tracks = fromJS(tracksObject);
				this.setState({
					tracks: tracks === null ? [] : tracks.reverse().toArray()
				});
			});
	}

	componentWillUnmount() {
		this.query.off("value", this.onQueueUpdated)
	}

	renderTracks() {
		return this.state.tracks.map((track, index) =>
			<ListItem
				primaryText={track.get("name")}
				secondaryText={track.get("artistString")}
				leftAvatar={
					<Avatar src={track.getIn(["images", 1, "url"])} />
				}
				type=""
				key={index} />
		);
	}

	render() {
		return (
			<div>
				<div className="container">
					<div className="row top-margin">
						<div className="col-md-12">
							<RaisedButton fullWidth={true} primary label="Åpne i Spotify" />
						</div>
					</div>
					<div className="row">
						<div className="col-md-12 top-margin">
							<Card>
								<List>
									{ this.renderTracks() }
								</List>
							</Card>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

HistoryView.propTypes = {
};

function mapStateToProps(state) {
	return {
		roomId: state.getIn(["session", "roomId"])
	}
}

export default connect(mapStateToProps)(HistoryView);
