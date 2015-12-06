var app = angular.module("News",[]);

app.controller("MainCtrl",function(){
  this.test = "Testing";
  this.posts = [];

  this.addPost = function() {
    if (!this.post.title || this.post.title === '') { return; }
    this.post.upvotes = 0;
    this.posts.push(this.post);

    this.post={};
  };

  this.upvotePost = function(post) {
    post.upvotes += 1;
  }
});
