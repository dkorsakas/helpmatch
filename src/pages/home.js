import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Scream from '../components/scream/Scream';
import ProfileRoot from '../components/profile/ProfileRoot';
import ScreamSkeleton from '../util/ScreamSkeleton';

import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getScreams();
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
        <Grid container>
          <Grid item sm={2} xs={12}></Grid>
          <Grid item sm={8} xs={12}>
            <ProfileRoot />
            <br></br>
            {recentScreamsMarkup}
          </Grid>
          <Grid item sm={2} xs={12}></Grid>
        </Grid>
      </div>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(home);
