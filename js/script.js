$(function() {

    $('.navbar-toggle').click(function() {
        $(this).toggleClass('act');
            if($(this).hasClass('act')) {
                $('.main-menu').addClass('act');
            }
            else {
                $('.main-menu').removeClass('act');
            }
    });

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.site-header',
        offset: 10
    });

	/* Progress bar */
    var $section = $('.section-skills');
    function loadDaBars() {
	    $('.progress .progress-bar').progressbar({
	        transition_delay: 500
	    });
    }
    
    $(document).bind('scroll', function(ev) {
        var scrollOffset = $(document).scrollTop();
        var containerOffset = $section.offset().top - window.innerHeight;
        if (scrollOffset > containerOffset) {
            loadDaBars();
            // unbind event not to load scrolsl again
            $(document).unbind('scroll');
        }
    });

    /* Counters  */
    if ($(".section-counters .start").length>0) {
        $(".section-counters .start").each(function() {
            var stat_item = $(this),
            offset = stat_item.offset().top;
            $(window).scroll(function() {
                if($(window).scrollTop() > (offset - 1000) && !(stat_item.hasClass('counting'))) {
                    stat_item.addClass('counting');
                    stat_item.countTo();
                }
            });
        });
    };

	// another custom callback for counting to infinity
	$('#infinity').data('countToOptions', {
		onComplete: function (value) {
		  count.call(this, {
		    from: value,
		    to: value + 1
		  });
		}
	});

	$('#infinity').each(count);

	function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }

    // Navigation overlay
    var s = skrollr.init({
            forceHeight: false,
            smoothScrolling: false,
            mobileDeceleration: 0.004,
            mobileCheck: function() {
                //hack - forces mobile version to be off
                return false;
            }
    });
    
});


function initSlideshows() {
    // Get all slideshow containers
    const slideshowContainers = document.querySelectorAll('.slideshow-container');
  
    slideshowContainers.forEach((slideshowContainer) => {
      let slideIndex = 0;
      const slides = slideshowContainer.getElementsByClassName('slides');
  
      // Show the first slide initially
      slides[slideIndex].classList.add('active');
  
      function showSlides() {
        // Remove active class from all slides
        for (let i = 0; i < slides.length; i++) {
          slides[i].classList.remove('active');
        }
  
        // Increment the slide index
        slideIndex++;
        if (slideIndex >= slides.length) {
          slideIndex = 0; // Loop back to the first slide
        }
  
        // Show the current slide
        slides[slideIndex].classList.add('active');
  
        // Change slides every 5 seconds
        setTimeout(showSlides, 3000); // Adjust timing as needed
      }
  
      // Start the slideshow for this container
      showSlides();
    });
  }
  
  // Initialize all slideshows on the page
  initSlideshows();

  function sendEmail() {
    var name = document.getElementById("name").value;
    var subject = document.getElementById("subject").value; // Capture the subject
    var phone = document.getElementById("phone").value;
    var message = document.getElementById("message").value;

    // Create a properly formatted email body
    var body = `Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0A%0A${message}`;

    // Set the mailto link with a properly formatted subject and body
    window.location.href = `mailto:kellydianga711@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
}