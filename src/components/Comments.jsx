import React, { Component } from 'react';
import * as api from '../apiReq';
import Load from './Load';
import { arrayConvertor, average, getTimeAgo } from '../utils';
import StarRatings from 'react-star-ratings';
import PostComment from './PostComment';

export default class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
  };

  componentDidMount() {
    const id = this.props.id;
    api.getCommentsById(id).then((comments) => {
      this.setState({ comments: comments, isLoading: false });
    });
  }

  addComment = (newComment) => {
    console.log('newComment--->', newComment);
    this.setState((currentState) => {
      const newState = [...currentState.comments];
      newState.unshift(newComment);
      console.log('newState--->', newState);
      return { comments: newState };
    });
  };

  render() {
    if (this.state.isLoading) {
      return <Load />;
    } else if (this.state.comments.length === 0) {
      return (
        <div>
          <PostComment id={this.props.id} addComment={this.addComment} />
        </div>
      );
    } else {
      const valForMonExt = arrayConvertor(
        this.state.comments,
        'valueForMoneyInGround'
      );
      const transportExt = arrayConvertor(this.state.comments, 'transport');
      const PubsExt = arrayConvertor(this.state.comments, 'pubsNearGround');

      return (
        <div className="comments-containter">
          <div className="ratings-container">
            <h4>Transport</h4>
            <StarRatings
              rating={average(transportExt)}
              starRatedColor="rgb(212,175,55)"
              changeRating={this.changeRating}
              starDimension={'1em'}
              numberOfStars={10}
              name="Transport: "
              starSpacing={'0.1em'}
            />
            <h4>Pubs near to ground</h4>
            <StarRatings
              rating={average(PubsExt)}
              starRatedColor="rgb(212,175,55)"
              changeRating={this.changeRating}
              starDimension={'1em'}
              numberOfStars={10}
              name="Transport: "
              starSpacing={'0.1em'}
            />
            <h4>Value for money in stadium</h4>
            <StarRatings
              rating={average(valForMonExt)}
              starRatedColor="rgb(212,175,55)"
              changeRating={this.changeRating}
              starDimension={'1em'}
              numberOfStars={10}
              name="Transport: "
              starSpacing={'0.1em'}
            />
          </div>
          <div>
            <PostComment id={this.props.id} addComment={this.addComment} />
            {this.state.comments.map((comment) => {
              return (
                <div className="comment-card" key={comment.comment_id}>
                  <p className="comment">{comment.thoughts}</p>
                  <div className="ratings">
                    <p className="comment-ratings">
                      Value for money in stadium
                    </p>
                    <StarRatings
                      rating={comment.valueForMoneyInGround}
                      starRatedColor="rgb(212,175,55)"
                      changeRating={this.changeRating}
                      starDimension={'1em'}
                      numberOfStars={10}
                      name="Transport: "
                      starSpacing={'0.1em'}
                    />
                    <p className="comment-ratings">Transport</p>
                    <StarRatings
                      rating={comment.transport}
                      starRatedColor="rgb(212,175,55)"
                      changeRating={this.changeRating}
                      starDimension={'1em'}
                      numberOfStars={10}
                      name="Transport: "
                      starSpacing={'0.1em'}
                    />
                    <p className="comment-ratings">Pubs near to ground</p>
                    <StarRatings
                      rating={comment.pubsNearGround}
                      starRatedColor="rgb(212,175,55)"
                      changeRating={this.changeRating}
                      starDimension={'1em'}
                      numberOfStars={10}
                      name="Transport: "
                      starSpacing={'0.1em'}
                    />
                    <p className="time-stamp">
                      {getTimeAgo(comment.created_at)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
}
