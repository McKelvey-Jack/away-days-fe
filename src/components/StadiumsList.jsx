import React, { Component } from 'react';
import * as api from '../apiReq';
import Load from './Load';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import commaNumber from 'comma-number';
import { Link } from '@reach/router';
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import ComingSoon from './ComingSoon';
import Error from './Error';

export default class StadiumsList extends Component {
  state = {
    stadiums: [],
    isLoading: true,
    isError: false,
  };

  componentDidMount() {
    const country = this.props.country;
    api
      .getStadiumsByCountry(country)
      .then((stadiums) => {
        this.setState({ stadiums, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isError: true, isLoading: false });
      });
  }
  goBack() {
    window.history.back();
  }

  render() {
    if (this.props.country === 'spain' || this.props.country === 'france') {
      return <ComingSoon />;
    }
    if (this.state.isLoading) {
      return <Load />;
    } else if (this.state.isError) {
      return <Error />;
    } else {
      return (
        <div className={'stadiums-list-page-container'}>
          <button
            onClick={() => this.goBack()}
            className={'individual-stadium-home-button'}
          >
            <FontAwesomeIcon className="button-icon" icon={faUndoAlt} />
          </button>
          <h1 className={'stadiums-list-header'}>
            Stadiums in {this.props.country}{' '}
          </h1>
          <div className="stadiums-list-country">
            {this.state.stadiums.map((stadium) => {
              return (
                <Link
                  to={`/stadiums/${stadium.stadium_id}`}
                  key={stadium.stadium_id}
                >
                  <div
                    className="country-stadium-card"
                    style={{
                      backgroundImage: `url(${stadium.picture})`,
                    }}
                  >
                    <img
                      className="country-club-logo"
                      src={stadium.logo}
                      alt="club logo"
                    />
                    <div className="country-club-container">
                      <p className="country-stadium-name">{stadium.name}</p>
                    </div>
                    <p className="stadium-capacity">
                      <FontAwesomeIcon icon={faUsers} />{' '}
                      {commaNumber(stadium.capacity)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      );
    }
  }
}
