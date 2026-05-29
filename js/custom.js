$(window).on("load", function () {
  "use strict";

  $("#status").fadeOut();
  $("#preloader").delay(350).fadeOut("slow");
  $("body").delay(350).css({ overflow: "visible" });

  if ($(".portfolio_container").length) {
    $(".portfolio_container").isotope("layout");
  }

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

  // Active nav on scroll
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

  // Smooth scroll
  nav.find("a").on("click", function (e) {
    var target = $(this).attr("href");

    if ($(target).length) {
      e.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $(target).offset().top - navHeight + 2
        },
        600
      );
    }
  });

  // Stellar
  if ($.fn.stellar) {
    $(window).stellar();
  }

  // AOS
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1200,
      once: false,
      disable: "mobile"
    });
  }

  // Portfolio isotope setup
  var $portfolio = $(".portfolio_container");

  if ($portfolio.length && $.fn.isotope) {
    $portfolio.isotope({
      itemSelector: ".portfolio_container > div",
      layoutMode: "fitRows",
      filter: "*"
    });

    $(".portfolio_filter a").on("click", function (e) {
      e.preventDefault();

      $(".portfolio_filter .active").removeClass("active");
      $(this).addClass("active");

      var filterValue = $(this).attr("data-filter");

      $portfolio.isotope({
        filter: filterValue,
        layoutMode: "fitRows"
      });

      setTimeout(function () {
        $portfolio.isotope("layout");

        if (typeof AOS !== "undefined") {
          AOS.refresh();
        }
      }, 300);

      setTimeout(function () {
        $portfolio.isotope("layout");

        if (typeof AOS !== "undefined") {
          AOS.refreshHard();
        }
      }, 800);
    });

    // Recalculate when lazy-loaded images finish loading
    $(".portfolio_container img").on("load", function () {
      $portfolio.isotope("layout");

      if (typeof AOS !== "undefined") {
        AOS.refresh();
      }
    });

    // Safety refresh
    $(window).on("resize", function () {
      $portfolio.isotope("layout");

      if (typeof AOS !== "undefined") {
        AOS.refresh();
      }
    });
  }

  // Animated modals
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

  // Contact form validation
  if ($("#contact-form").length && $.fn.validate) {
    $("#contact-form").validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        email: {
          required: true
        },
        phone: {
          required: false
        },
        message: {
          required: true
        }
      },

      messages: {
        name: {
          required: "This field is required",
          minlength: "your name must consist of at least 2 characters"
        },
        email: {
          required: "This field is required"
        },
        message: {
          required: "This field is required"
        }
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