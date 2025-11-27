// GSAP ve diğer animasyon mantıkları burada yer alacak.
document.addEventListener('DOMContentLoaded', () => {

  // GSAP ve ScrollTrigger eklentisini kaydediyoruz.
  gsap.registerPlugin(ScrollTrigger);

  // --- SMOOTH SCROLL (LENIS) - Tamamen kaldırıldı ---
  /*
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
  */


  // --- GENEL ANİMASYONLAR ---
  
  // 1. Hero Alanı Giriş Animasyonu
  const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
  
  heroTimeline.fromTo(".hero-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.2 })
    .fromTo(".hero-subtitle", { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, "-=0.8")
    .fromTo(".hero-cta button", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, stagger: 0.15 }, "-=0.6")
    .fromTo(".hero-image", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5 }, "-=0.8");

  // 2. Arkaplan Parallax ve Işık Animasyonu
  gsap.to(".background-glow", {
    scale: 1.2,
    opacity: 0.8,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom top",
      scrub: 1.5
    }
  });

  gsap.fromTo(".pulse-ambient-light", 
    { scale: 0.8, opacity: 0.5 },
    { 
      scale: 1.1, 
      opacity: 0.8, 
      duration: 5, 
      repeat: -1, 
      yoyo: true, 
      ease: "sine.inOut" 
    }
  );


  // 3. Scroll-Trigger ile Bölüm ve Kart Animasyonları
  const sections = document.querySelectorAll('.section-reveal');
  sections.forEach(section => {
    const sectionTitle = section.querySelector('.section-title');
    const staggerCards = section.querySelectorAll('.stagger-card');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "bottom top",
        toggleActions: "play none none none",
      }
    });

    if (sectionTitle) {
      tl.fromTo(sectionTitle, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    }

    if (staggerCards.length > 0) {
      tl.fromTo(staggerCards, 
        { opacity: 0, y: 40, scale: 0.98 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.5"
      );
    }
  });
  
  // 4. Floating Sticky Bar Animasyonu
  gsap.fromTo(".floating-sticky-bar", 
    { opacity: 0, y: "100%" },
    { 
      opacity: 1, 
      y: "0%",
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "body",
        start: "top -15%", // Sayfanın %15'i scroll edilince belirir
        toggleActions: "play none none reverse",
      }
    }
  );

  // --- LAZY LOAD ---
  const lazyImages = document.querySelectorAll('img[data-src]');
  const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove("lazy");
        lazyImageObserver.unobserve(lazyImage);
      }
    });
  });

  lazyImages.forEach(lazyImage => {
    lazyImageObserver.observe(lazyImage);
  });

});
