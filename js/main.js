$('.carousel').carousel({
  interval: 3000,
  pause: "hover"
});
try {
  if ($.fn && $.fn.carousel) {
    $('.carousel').carousel({ interval: 3000, pause: 'hover' });
  }
} catch(e) {}
