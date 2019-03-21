// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response){
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if(response.status === 'connected'){
    // Logged into your app and Facebook.
    testAPI();
  }else{
    // The person is not logged into your app or we are unable to tell.
    console.log('please login this app');
  };
};

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState(){
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};
