window.addEventListener('storage', function(e) {
  sessionStorage.setItem(e.key, e.oldValue)
});

window.addEventListener('storage', function(e) {
  localStorage.setItem(e.key, e.oldValue)
});
