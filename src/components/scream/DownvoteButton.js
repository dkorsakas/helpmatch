import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

// REdux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

export class DownvoteButton extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.screamId
      )
    )
      return true;
    else return false;
  };
  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };
  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to='/login'>
        <MyButton tip='Like'>
          <ArrowDownwardIcon color='secondary' />
        </MyButton>
      </Link>
    ) : this.likedScream() ? (
      <MyButton tip='Undo like' onClick={this.unlikeScream}>
        <ArrowDownwardIcon color='primary' />
      </MyButton>
    ) : (
      <MyButton tip='Like' onClick={this.likeScream}>
        <ArrowDownwardIcon color='secondary' />
      </MyButton>
    );
    return likeButton;
  }
}

DownvoteButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(mapStateToProps, mapActionsToProps)(DownvoteButton);
