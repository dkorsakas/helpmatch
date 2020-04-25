import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import SearchBar from '../components/layout/SearchBar';
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
    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    );

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
                <SearchBar />
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
};

const mapStateToProps = (state) => ({
  data: state.data,
  groupName: state.data.groupName,
});

export default connect(mapStateToProps, mapActionsToProps)(group);
