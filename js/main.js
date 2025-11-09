$(function () {
  // Botón EJECUTAR: mostrar/ocultar el resultado (sin conflictos)
  $(document).on('click', '.content-card .btn.btn-primary', function () {
    const $card = $(this).closest('.content-card');
    const $res  = $card.find('.resultado').first();

    // Si esta tarjeta contiene el slider del Ejercicio 4, inicialízalo SOLO una vez
    if ($res.find('#sliderFade').length && !$res.data('fade-init')) {
      const $imgs = $res.find('#sliderFade .fade-img');
      if ($imgs.length) {
        $imgs.not(':first').hide();
        let i = 0;
        setInterval(function () {
          $imgs.eq(i).fadeOut(1000);
          i = (i + 1) % $imgs.length;
          $imgs.eq(i).fadeIn(1000);
        }, 3000);
        $res.data('fade-init', true);
      }
    }

    $res.toggleClass('d-none');
  });

  // Inicializa el carrusel de la Parte 3 si existe (Bootstrap 5 API)
  const slider = document.querySelector('#miSlider');
  if (slider && window.bootstrap && bootstrap.Carousel) {
    new bootstrap.Carousel(slider, {
      interval: 3500,
      pause: 'hover',
      touch: true,
      wrap: true
    });
  }
});
// === Ejercicio: botón EJECUTAR + slider con fade ===
(function ($) {
  $(function () {
    var fadeState = { inited: false, timer: null, idx: 0 };

    // Mostrar/ocultar el ejercicio y arrancar el fade solo una vez
    $(document).on('click', '#btn-ejercicio-slider', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();

      var $btn = $(this);
      var $box = $('#ejercicio-slider-box');

      $box.toggleClass('d-none');
      var abierto = !$box.hasClass('d-none');

      // Cambia texto/ícono del botón
      $btn.html(
        abierto
          ? '<i class="fas fa-eye-slash"></i> Ocultar'
          : '<i class="fas fa-code"></i> EJECUTAR'
      );

      // Iniciar animación fade solo la primera vez
      if (abierto && !fadeState.inited) {
        var $imgs = $('#sliderFade .fade-img');
        if ($imgs.length) {
          $imgs.hide().eq(0).show();
          fadeState.inited = true;
          fadeState.idx = 0;

          fadeState.timer = setInterval(function () {
            var $actual = $imgs.eq(fadeState.idx);
            $actual.stop(true, true).fadeOut(800);
            fadeState.idx = (fadeState.idx + 1) % $imgs.length;
            $imgs.eq(fadeState.idx).stop(true, true).fadeIn(800);
          }, 3000);
        }
      }

      // (Opcional) refrescar ScrollSpy si está disponible (Bootstrap 3)
      if (typeof $('body').scrollspy === 'function') {
        try { $('body').scrollspy('refresh'); } catch (err) {}
      }
    });
  });
})(jQuery);
