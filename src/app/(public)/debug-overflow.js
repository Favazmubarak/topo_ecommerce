document.querySelectorAll('*').forEach(el => {
  if (el.scrollWidth > el.clientWidth) {
    console.log('Overflowing element:', el, 'ScrollWidth:', el.scrollWidth, 'ClientWidth:', el.clientWidth);
  }
});
