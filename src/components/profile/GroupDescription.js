import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';

import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';
import ProfileSkeleton from '../../util/ProfileSkeleton';
// MUI stuff
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';

import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
//Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.spreadThis,
});

class GroupDescription extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated,
      },
    } = this.props;

    return (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className='image-wrapper'>
            {this.props.shortGroupName ? (
              <img
                alt='group'
                src={`https://www.countryflags.io/${this.props.shortGroupName.toLowerCase()}/shiny/64.png`}
              />
            ) : (
              <img src={imageUrl} alt='profile' className='profile-image' />
            )}
          </div>
          <hr />
          <div className='profile-details'>
            <Typography color='primary' variant='h5'>
              {this.props.groupName}
            </Typography>
            <hr />
            <Typography variant='body2'>this is amazing group</Typography>
            <hr />
          </div>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  shortGroupName: state.data.shortGroupName,
  groupName: state.data.groupName,
});

const mapActionsToProps = { logoutUser, uploadImage };

GroupDescription.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  shortGroupName: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(GroupDescription));
