$(window).on("load", function () {
  "use strict";

  $("#status").fadeOut();
  $("#preloader").delay(350).fadeOut("slow");
  $("body").delay(350).css({ overflow: "visible" });

  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }
});

var $section = $(".section-skills");

function loadDaBars() {
  $(".progress .progress-bar").progressbar({
    transition_delay: 500
  });
}

$(document).ready(function () {
  "use strict";

  var sections = $(".section");
  var nav = $(".navbar-fixed-top, footer");
  var navHeight = nav.outerHeight();

  $(window).on("scroll", function () {
    var currentScroll = $(this).scrollTop();

    sections.each(function () {
      var sectionTop = $(this).offset().top - navHeight;
      var sectionBottom = sectionTop + $(this).outerHeight();

      if (sectionTop <= currentScroll && currentScroll <= sectionBottom) {
        nav.find("a").removeClass("active");
        sections.removeClass("active");

        $(this).addClass("active");
        nav.find('a[href="#' + $(this).attr("id") + '"]').addClass("active");
      }
    });

    if ($(window).scrollTop() > 80) {
      $(".navbar-fixed-top").addClass("bg-nav");
    } else {
      $(".navbar-fixed-top").removeClass("bg-nav");
    }
  });

  nav.find("a").on("click", function (e) {
    var target = $(this).attr("href");

    if (!target || target === "#" || target.charAt(0) !== "#") return;

    try {
      var $target = $(target);

      if (!$target.length) return;

      e.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $target.offset().top - navHeight + 2
        },
        600
      );
    } catch (err) {
      return;
    }
  });

  if ($.fn.stellar) {
    $(window).stellar();
  }

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1200,
      once: false,
      disable: "mobile"
    });
  }

  /* Portfolio Filtering Fix */
  $(".portfolio_filter a").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    $(".portfolio_filter a").removeClass("active");
    $(this).addClass("active");

    var filterValue = $(this).attr("data-filter");
    var items = document.querySelectorAll(".portfolio_container > div");

    items.forEach(function (item) {
      if (filterValue === "*") {
        item.style.setProperty("display", "flex", "important");
      } else {
        if (item.matches(filterValue)) {
          item.style.setProperty("display", "flex", "important");
        } else {
          item.style.setProperty("display", "none", "important");
        }
      }
    });

    if (typeof AOS !== "undefined") {
      setTimeout(function () {
        AOS.refreshHard();
      }, 100);
    }
  });

  $(".portfolio_item").each(function () {
    var modalTarget = $(this).data("modal-target");

    if (modalTarget && $.fn.animatedModal) {
      $(this).animatedModal({
        modalTarget: modalTarget,
        animatedIn: "zoomIn",
        animatedOut: "fadeOut",
        color: "#3498db"
      });
    }
  });

  if ($("#contact-form").length && $.fn.validate) {
    $("#contact-form").validate({
      rules: {
        name: { required: true, minlength: 2 },
        email: { required: true },
        phone: { required: false },
        message: { required: true }
      },

      messages: {
        name: {
          required: "This field is required",
          minlength: "your name must consist of at least 2 characters"
        },
        email: { required: "This field is required" },
        message: { required: "This field is required" }
      },

      submitHandler: function (form) {
        $(form).ajaxSubmit({
          type: "POST",
          data: $(form).serialize(),
          url: "process.php",

          success: function () {
            $("#contact :input").attr("disabled", "disabled");

            $("#contact").fadeTo("slow", 1, function () {
              $(this).find(":input").attr("disabled", "disabled");
              $(this).find("label").css("cursor", "default");
              $("#success").fadeIn();
            });
          },

          error: function () {
            $("#contact").fadeTo("slow", 1, function () {
              $("#error").fadeIn();
            });
          }
        });
      }
    });
  }
});