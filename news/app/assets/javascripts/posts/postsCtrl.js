angular.module('News').controller('PostCtrl',['posts','$stateParams',function(posts,$stateParams){
  this.post = posts.posts[$stateParams.id];

  this.addComment = function() {
    if (!this.comment.body || this.comment.body === '') { return; }
    this.comment.upvotes = 0;
    this.comment.author = 'user';
    this.comments.push(this.comment);

    this.comment={};
  };

  this.upvoteComment = function(comment) {
    comment.upvotes += 1;
  };

}]);
