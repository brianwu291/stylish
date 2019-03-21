// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI(){
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response){
    console.log('Successful login for: ' + response.name);
  });
}