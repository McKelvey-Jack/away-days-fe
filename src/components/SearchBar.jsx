import React, { Component } from 'react';
import SearchStadiumsList from './SearchStadiumsList';

export default class SearchBar extends Component {
  state = {
    stadium: '',
  };

  handleChange = (e) => {
    this.setState({ stadium: e.target.value });
  };

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Search by club or stadium..."
            className="search-box"
            onChange={(e) => this.handleChange(e)}
            value={this.state.stadium}
          />
        </form>
        {this.state.stadium.length >= 2 ? (
          <SearchStadiumsList searchValue={this.state.stadium} />
        ) : null}
      </div>
    );
  }
}
