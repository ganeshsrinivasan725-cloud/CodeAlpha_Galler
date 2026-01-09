document.addEventListener('DOMContentLoaded',()=>{
  const gallery = Array.from(document.querySelectorAll('.card'));
  const galleryEl = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const btnClose = document.querySelector('.lb-close');
  const btnPrev = document.querySelector('.lb-prev');
  const btnNext = document.querySelector('.lb-next');
  let current = 0;

  function openLightbox(index){
    const card = gallery[index];
    const img = card.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    lbCaption.textContent = card.querySelector('figcaption').textContent || '';
    lightbox.setAttribute('aria-hidden','false');
    current = index;
  }

  function closeLightbox(){
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
  }

  function showNext(){
    current = (current + 1) % gallery.length;
    openLightbox(current);
  }
  function showPrev(){
    current = (current - 1 + gallery.length) % gallery.length;
    openLightbox(current);
  }

  gallery.forEach((card, idx)=>{
    card.addEventListener('click',()=> openLightbox(idx));
  });

  btnClose.addEventListener('click',closeLightbox);
  btnNext.addEventListener('click',showNext);
  btnPrev.addEventListener('click',showPrev);

  document.addEventListener('keydown',(e)=>{
    if(lightbox.getAttribute('aria-hidden')==='false'){
      if(e.key==='ArrowRight') showNext();
      if(e.key==='ArrowLeft') showPrev();
      if(e.key==='Escape') closeLightbox();
    }
  });

  lightbox.addEventListener('click',(e)=>{
    if(e.target===lightbox) closeLightbox();
  });

  // Category filtering
  document.querySelectorAll('.cat-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      gallery.forEach(card=>{
        const matches = (cat==='all') || (card.dataset.cat===cat);
        card.style.display = matches ? '' : 'none';
      });
    });
  });

  // Image filters
  function applyFilter(filter){
    galleryEl.classList.remove('grayscale','sepia');
    if(filter==='grayscale') galleryEl.classList.add('grayscale');
    if(filter==='sepia') galleryEl.classList.add('sepia');
  }
  document.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

});
