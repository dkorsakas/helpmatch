import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';
import DownvoteButton from './DownvoteButton';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons

// Redux
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import { Button } from '@material-ui/core';

const styles = {
  card: {
    position: 'relative',

    marginBottom: 20,
  },

  content: {
    padding: 25,
    objectFit: 'cover',
  },
  tags: {
    margin: 4,
  },
  media: {
    height: 140,
  },
  comments: {
    margin: 10,
  },
};

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount,
        tag,
        location,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;

    const tagDisplay =
      tag === 'helping' ? (
        <Chip
          className={classes.tags}
          color='primary'
          size='small'
          label='Offers help'
        />
      ) : tag === 'asking' ? (
        <Chip
          className={classes.tags}
          color='secondary'
          size='small'
          label='Needs help'
        />
      ) : (
        <Chip size='small' className={classes.tags} label='Other' />
      );

    function truncateText(text, length) {
      if (text.length <= length) {
        return text;
      }

      return text.substr(0, length) + '\u2026';
    }

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title='Profile image'
          className={classes.media}
        />
        <CardContent className={classes.content}>
          <Typography
            variant='h5'
            component={Link}
            to={`/users/${userHandle}`}
            color='primary'
          >
            {truncateText(userHandle, 25)}
          </Typography>
          {deleteButton}
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).fromNow()}
            {tagDisplay}
          </Typography>

          <Typography color='primary'>{`Loacation: ${location}`}</Typography>
          <Typography variant='body1'>{truncateText(body, 200)}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} Votes</span>
          <DownvoteButton screamId={screamId} />

          <span className={classes.comments}>
            {commentCount} comments{' '}
            <ScreamDialog
              screamId={screamId}
              userHandle={userHandle}
              openDialog={this.props.openDialog}
            />
          </span>
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
