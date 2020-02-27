import './range-slider.scss';


$(function ($) {
  var $range = $(".js-range-slider__input"),
    $inputRange = $(".js-input-range"),
    $inputFrom = $(".js-input-from"),
    $inputTo = $(".js-input-to"),
    instance,
    min = 0,
    max = 1000,
    from = 0,
    to = 0;

  $range.ionRangeSlider({
    skin: "user",
    type: "double",
    min: 0,
    max: 15000,
    from: 5000,
    to: 10000,
    step: 1000,
    hide_min_max: true,
    hide_from_to: true,
    keyboard: true,
    onStart: updateInputs,
    onChange: updateInputs
  });


  instance = $range.data("ionRangeSlider");

  function updateInputs(data) {
    from = data.from;
    to = data.to;

    $inputFrom.prop("value", from);
    $inputTo.prop("value", to);
    $inputRange.html(`${from}&#8381; - ${to}&#8381;`);
  }

  $inputFrom.on("input", function () {
    var val = $(this).prop("value");

    // validate
    if (val < min) {
      val = min;
    } else if (val > to) {
      val = to;
    }

    instance.update({
      from: val
    });
  });

  $inputTo.on("input", function () {
    var val = $(this).prop("value");

    // validate
    if (val < from) {
      val = from;
    } else if (val > max) {
      val = max;
    }

    instance.update({
      to: val
    });

  });
});