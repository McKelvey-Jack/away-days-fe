import React, { Component } from 'react';
import * as api from '../apiReq';
import Load from './Load';
import { Link } from '@reach/router';

export default class SearchStadiumsList extends Component {
  state = {
    stadiums: [],
    filteredStadiums: [],
    isLoading: true,
  };

  componentDidMount() {
    api.getStadiums().then((stadiums) => {
      this.setState({ stadiums, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      const filteredStadiums = this.state.stadiums.filter((stadium) => {
        // return stadium.name === this.props.searchValue;
        return (
          stadium.club
            .toLowerCase()
            .includes(this.props.searchValue.toLowerCase()) ||
          stadium.name
            .toLowerCase()
            .includes(this.props.searchValue.toLowerCase())
        );
      });

      this.setState({ filteredStadiums });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Load />;
    } else {
      return (
        <div className={'search-stadiums-container'}>
          {this.state.filteredStadiums.map((stadium) => {
            return (
              <Link to={`/stadiums/${stadium.stadium_id}`}>
                <div className="stadium-card" key={stadium.stadoum_id}>
                  <img
                    className="club-logo"
                    src={stadium.logo}
                    alt="club logo"
                  />
                  <div className="club-container">
                    {console.log(stadium.name)}
                    <p className="stadium-name">{stadium.name}</p>
                    <p className="stadium-club">{stadium.club}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      );
    }
  }
}
