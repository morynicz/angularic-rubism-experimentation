angular.module('News').factory('posts',[function(){
  var o = {
    posts: [{upvotes: 69, title: "test", link: "testtest", comments: [
      {author: 'Joe', body: 'Cool post', upvotes: 0},
      {author: 'Ed', body: 'Meh', upvotes: 0}
    ]}]
  };

  return o;
}]);
