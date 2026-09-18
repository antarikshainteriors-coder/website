/* Antariksha Interiors - site behaviour: nav, scroll reveal, project galleries */

(function(){
  var GALLERIES = window.__GALLERIES__ || {};
  var META = {
    majestique: {title:'Majestique Tower 1', sub:'Kharadi, Pune'},
    keshavanagar: {title:'Keshavanagar Home', sub:'Keshavanagar, Pune'}
  };
  var overlay = document.getElementById('galleryOverlay');
  var grid = document.getElementById('galleryGrid');
  var titleEl = document.getElementById('galleryTitle');
  var subEl = document.getElementById('gallerySub');
  var closeBtn = document.getElementById('galleryClose');
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightboxImg');
  var lbCount = document.getElementById('lightboxCount');
  var lbClose = document.getElementById('lightboxClose');
  var lbPrev = document.getElementById('lightboxPrev');
  var lbNext = document.getElementById('lightboxNext');

  var currentImgs = [];
  var currentIndex = 0;

  function openGallery(id, pushHash){
    var imgs = GALLERIES[id];
    if(!imgs || !imgs.length) return;
    currentImgs = imgs;
    var meta = META[id] || {};
    titleEl.textContent = meta.title || '';
    subEl.textContent = (meta.sub ? meta.sub + ' \u00b7 ' : '') + imgs.length + ' photos';
    grid.innerHTML = '';
    imgs.forEach(function(src, i){
      var im = document.createElement('img');
      im.src = src;
      im.loading = 'lazy';
      im.alt = (meta.title || 'Project') + ' photo ' + (i+1);
      im.addEventListener('click', function(){ openLightbox(i); });
      grid.appendChild(im);
    });
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    if(pushHash !== false && location.hash !== '#project-' + id){
      history.pushState({gallery:id}, '', '#project-' + id);
    }
  }

  function closeGallery(clearHash){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    closeLightbox();
    if(clearHash !== false && location.hash.indexOf('#project-') === 0){
      history.pushState({}, '', location.pathname + location.search);
    }
  }

  function openLightbox(i){
    currentIndex = i;
    lbImg.src = currentImgs[i];
    lbCount.textContent = (i+1) + ' / ' + currentImgs.length;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  }
  function closeLightbox(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
  }
  function step(delta){
    if(!currentImgs.length) return;
    currentIndex = (currentIndex + delta + currentImgs.length) % currentImgs.length;
    lbImg.src = currentImgs[currentIndex];
    lbCount.textContent = (currentIndex+1) + ' / ' + currentImgs.length;
  }

  document.querySelectorAll('.project-card.has-gallery').forEach(function(card){
    var id = card.getAttribute('data-project');
    card.addEventListener('click', function(){ openGallery(id); });
    card.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openGallery(id); }
    });
  });

  closeBtn.addEventListener('click', function(){ closeGallery(); });
  overlay.addEventListener('click', function(e){ if(e.target === overlay) closeGallery(); });
  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', function(){ step(-1); });
  lbNext.addEventListener('click', function(){ step(1); });
  lightbox.addEventListener('click', function(e){ if(e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      if(lightbox.classList.contains('open')) closeLightbox();
      else if(overlay.classList.contains('open')) closeGallery();
    }
    if(lightbox.classList.contains('open')){
      if(e.key === 'ArrowRight') step(1);
      if(e.key === 'ArrowLeft') step(-1);
    }
  });

  window.addEventListener('popstate', function(){
    var h = location.hash;
    if(h.indexOf('#project-') === 0){
      openGallery(h.replace('#project-',''), false);
    } else {
      closeGallery(false);
    }
  });

  if(location.hash.indexOf('#project-') === 0){
    openGallery(location.hash.replace('#project-',''), false);
  }
})();

(function(){
  var toggle = document.getElementById('navToggle');
  var panel = document.getElementById('mobilePanel');
  var close = document.getElementById('navClose');
  function open(){ panel.classList.add('open'); }
  function shut(){ panel.classList.remove('open'); }
  if(toggle) toggle.addEventListener('click', open);
  if(close) close.addEventListener('click', shut);
  panel.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', shut); });

  var els = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:0.14});
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('in'); });
  }
})();
