 // click to show search input form
function showSearchInput() {
  let searchForm = document.querySelector('.hide');
  searchForm.className = 'search-form-popup';
} 
document.querySelector('.mobile-search-icon').onclick = showSearchInput;

// click to hide search input form
function hideSearchInput() {
  let searchForm = document.querySelector('.search-form-popup');
  searchForm.className = 'hide';
}
document.querySelector('.close-search-input').onclick = hideSearchInput;