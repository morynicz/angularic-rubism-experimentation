angular.module('News').controller("MainCtrl",['posts', function(posts){
  this.posts = posts.posts;

  this.addPost = function() {
    if (!this.post.title || this.post.title === '') { return; }
    this.post.upvotes = 0;
    this.post.comments = [
      {author: 'Joe', body: 'Cool post', upvotes: 0},
      {author: 'Ed', body: 'Meh', upvotes: 0}
    ];
    this.posts.push(this.post);

    this.post={};
  };

  this.upvotePost = function(post) {
    post.upvotes += 1;
  };
}]);
