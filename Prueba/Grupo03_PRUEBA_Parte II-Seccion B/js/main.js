// Slider fade del RIGHT MENU + dentro de tarjetas "EJECUTAR"
(function ($) {
  function initFadeSlider(root) {
    // root puede ser un contenedor; si no, usa el del RIGHT MENU
    var $slider = root ? $(root) : $('#rightMenu #sliderFade');
    if (!$slider.length || $slider.data('fade-init')) return;

    var $imgs = $slider.find('.fade-img');
    if ($imgs.length < 2) {
      // si solo hay 1 imagen, muéstrala y sal
      $imgs.show();
      $slider.data('fade-init', true);
      return;
    }

    // Estado inicial
    $imgs.hide().eq(0).show();
    var i = 0;

    // Bucle de desvanecimiento
    setInterval(function () {
      var next = (i + 1) % $imgs.length;
      $imgs.eq(i).fadeOut(800);
      $imgs.eq(next).fadeIn(800);
      i = next;
    }, 3000);

    $slider.data('fade-init', true);
  }

  $(document).ready(function () {
    // 1) Inicia el slider del RIGHT MENU (el que pusiste en el index)
    initFadeSlider();

    // 2) Si usas tarjetas con botón "EJECUTAR", al abrir, inicializa su slider
    $(document).on('click', '.content-card .btn.btn-primary', function () {
      var $res = $(this).closest('.content-card').find('.resultado').first();
      $res.toggleClass('d-none');

      // Si al mostrar hay un sliderFade dentro, inicialízalo una sola vez
      if (!$res.hasClass('d-none')) {
        var $innerSlider = $res.find('#sliderFade').first();
        if ($innerSlider.length) initFadeSlider($innerSlider);
      }
    });
  });
})(jQuery);
