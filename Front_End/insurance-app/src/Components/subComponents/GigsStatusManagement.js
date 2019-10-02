import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

import { pauseGig, loveGig } from "../../Redux/Actions/Gigs";
import { connect } from "react-redux";

class GigsStatusManagement extends Component {
  constructor() {
    super();
    this.state = {
      isEditable: false,
      isLoved: false,
      lovers: 0,
      price: null,
      gigDeleted: false,
      gigPaused: false
    };
  }

  componentDidMount = () => {
    this.setState({
      price: this.props.price || 5,
      lovers: this.props.love || 0
    });
  };

  componentWillMount = () => {
    this.setState({ gigPaused: this.props.active });
  };

  editGig = () => {
    this.setState({ isEditable: !this.state.isEditable });
  };

  disableGigSettings = () => {
    if (this.state.isEditable) {
      this.setState({ isEditable: false });
    }
  };

  iLove = () => {
    this.setState({
      isLoved: !this.state.isLoved
    });

    if (!this.state.isLoved) {
      this.setState({ lovers: this.state.lovers + 1 });
      this.props.loveGig(
        this.props.seriveId,
        localStorage.ProfileId,
        this.state.lovers + 1
      );
    } else {
      this.setState({ lovers: this.state.lovers - 1 });

      this.props.loveGig(
        this.props.seriveId,
        localStorage.ProfileId,
        this.state.lovers - 1
      );
    }
  };

  deleteGig = () => {
    this.setState({ gigDeleted: true });
  };

  PauseGig = async () => {
    this.setState({ gigPaused: !this.state.gigPaused });

    await this.postNewStatus();
  };

  postNewStatus = async () => {
    if (this.props.active) {
      this.props.pauseGig(this.props.seriveId, false);
    } else {
      this.props.pauseGig(this.props.seriveId, true);
    }
  };

  render() {
    return (
      <Fragment>
        <div className="Gig-setting" onClick={this.disableGigSettings}>
          <div
            className="background"
            style={{ backgroundImage: `url(${this.props.image})` }}
          />
          <div className="setting">
            <div className="title">
              <Link
                to={`/Gig_Management/edit/${this.props.seriveId}`}
                style={{ color: "black" }}
              >
                {this.props.title}
              </Link>
            </div>
            <div className="edit-gig">
              <span>السعر {this.state.price}$</span>
              <div className="like">
                <span style={{ fontSize: 14, color: "#c4c4c4" }}>
                  ({this.state.lovers}+)
                </span>
                <span> </span>
                <i
                  className={`fa ${
                    this.state.isLoved ? "fa-heart" : "fa-heart-o"
                  }`}
                  style={{
                    transition: "all ease 600ms",
                    color: this.state.isLoved ? "#cc6355" : "#c4c4c4"
                  }}
                  onClick={this.iLove}
                />
              </div>
              <div
                className="settings-popup"
                style={{
                  display: this.state.isEditable ? "block" : "none"
                }}
              >
                <Link
                  to={`/gig_profile/${
                    this.props.seriveId
                  }/${this.props.title.split(" ").join("_")}`}
                >
                  <div className="edit_view">
                    <i className="fa fa-eye" /> عرض
                  </div>
                </Link>
                <Link to={`/Gig_Management/edit/${this.props.seriveId}`}>
                  <div className="edit_view">
                    <i className="fa fa-pencil" /> تعديل
                  </div>
                </Link>

                <div className="edit_view" onClick={this.enableGig}>
                  <i className="fa fa-trash" /> حذف
                </div>
                <div onClick={this.PauseGig} className="edit_view">
                  <i
                    className={
                      this.state.gigPaused ? "fa fa-pause" : "fa fa-play"
                    }
                  />{" "}
                  {this.state.gigPaused ? "إقاف" : "تشغيل"}
                </div>
              </div>
              <div
                className="hovered"
                onClick={this.editGig}
                title="Service Settings"
              >
                <div className="dot" />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapActionsToProps = {
  pauseGig,
  loveGig
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(GigsStatusManagement);
