import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import ScreamMobile from '../components/scream/ScreamMobile';

import SearchBarLocation from '../components/layout/SearchBarLocation';
import Scream from '../components/scream/Scream';
import GroupDescription from '../components/profile/GroupDescription';
import ScreamSkeleton from '../util/ScreamSkeleton';

//Redux
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

//import { getScreams } from '../redux/actions/dataActions';

//MUI
import Typography from '@material-ui/core/Typography';

class group extends Component {
  componentDidMount() {
    this.props.getPosts(this.props.groupName);
  }
  render() {
    const { screams, loading } = this.props.data;

    let filteredScreams = screams.filter((scream) =>
      scream.location
        .toLowerCase()
        .includes(this.props.searchLocation.toLowerCase())
    );

    let recentScreamsMarkup;

    if (isWidthDown('sm', this.props.width)) {
      recentScreamsMarkup = !loading ? (
        filteredScreams.map((scream) => (
          <ScreamMobile key={scream.screamId} scream={scream} />
        ))
      ) : (
        <ScreamSkeleton />
      );
    } else {
      recentScreamsMarkup = !loading ? (
        filteredScreams.map((scream) => (
          <Scream key={scream.screamId} scream={scream} />
        ))
      ) : (
        <ScreamSkeleton />
      );
    }

    return (
      <div>
        {!this.props.groupName && <Redirect to='/groups' />}

        <Grid container spacing={10}>
          <Grid item sm={8} xs={12}>
            {screams.length === 0 ? (
              <Typography>
                There are no posts yet in this group - be the first one to make
                the post and start the conversation
              </Typography>
            ) : (
              <div>
                <SearchBarLocation />
                <br></br>
                {recentScreamsMarkup}
              </div>
            )}
          </Grid>
          <Grid item sm={4} xs={12}>
            <GroupDescription />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapActionsToProps = { getPosts };

group.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  groupName: PropTypes.string.isRequired,
  searchLocation: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  groupName: state.data.groupName,
  searchLocation: state.data.searchLocation,
});

export default connect(mapStateToProps, mapActionsToProps)(withWidth()(group));
