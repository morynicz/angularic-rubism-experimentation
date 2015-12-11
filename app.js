var app = angular.module("News",[]);

app.factory('posts',[function(){
  var o = {
    posts: [{upvotes: 69, title: "test", link: "testtest"}]
  };

  return o;
}]);

app.controller("MainCtrl",['posts', function(posts){
  this.test = "Testing";
  this.posts = posts.posts;

  this.addPost = function() {
    if (!this.post.title || this.post.title === '') { return; }
    this.post.upvotes = 0;
    this.posts.push(this.post);

    this.post={};
  };

  this.upvotePost = function(post) {
    post.upvotes += 1;
  }
}]);
