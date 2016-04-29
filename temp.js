User.findOne()
.then(function (user) {
  // big old crazy object, but no name or
  // id anywhere in there. Hmmmmmm…
  console.log(user);
});
