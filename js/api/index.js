const domain = 'https://api.appworks-school.tw';
const apiDomain = 'https://api.appworks-school.tw/api/1.0';

let Header = new Headers({
  'Content-Type': 'application/json'
});
let getInit = { 
  method: 'GET',
  mode: 'cors',
  headers: Header,
  cache: 'force-cache'
};

let postInit = {
  method: 'POST',
  mode: 'cors',
  headers: Header
}