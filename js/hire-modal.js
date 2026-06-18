(function () {
  const modal = document.getElementById('hire-modal');
  if (!modal) return;

  const overlay = modal.querySelector('.hire-modal-overlay');
  const closeBtn = modal.querySelector('.hire-modal-close');
  const form = document.getElementById('hire-form');
  const toast = document.getElementById('hire-toast');
  const openBtns = document.querySelectorAll('[data-hire-modal]');

  // GA4 漏斗事件
  function track(eventName, params) {
    if (typeof gtag === 'undefined') return;
    gtag('event', eventName, Object.assign({ event_category: 'hire_funnel' }, params));
  }

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    track('hire_modal_open');
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', function (e) {
    e.preventDefault();
    openModal();
  }));

  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // form_start：第一次互動時觸發
  if (form) {
    let started = false;
    form.addEventListener('focusin', function () {
      if (started) return;
      started = true;
      track('hire_form_start');
    }, { once: false });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const services = [...form.querySelectorAll('[name="service"]:checked')]
        .map(el => el.value).join(',');

      track('hire_form_submit', { services: services });

      const submitBtn = form.querySelector('.hire-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = '送出中…';

      const payload = {
        姓名: form.name.value,
        服務項目: services || '未選擇',
        專案說明: form.description.value,
        預計時程: form.timeline.value,
        預算範圍: form.budget.value,
        聯絡方式: form.contact.value,
      };

      fetch('https://formspree.io/f/mjgddqdk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          if (!res.ok) throw new Error();
          closeModal();
          showToast();
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = '送出需求';
          closeModal();
          showToast('danger');
        });
    });

    // 關閉時重設表單狀態
    modal.addEventListener('transitionend', function () {
      if (!modal.classList.contains('active')) {
        form.hidden = false;
        form.reset();
        started = false;
        const submitBtn = form.querySelector('.hire-submit');
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = '送出需求'; }
      }
    });
  }
  function showToast(type) {
    if (!toast) return;
    const isDanger = type === 'danger';
    toast.querySelector('p').textContent = isDanger
      ? '送出失敗，請直接寄信至 rf61128@gmail.com'
      : '收到了！我會在 2 個工作天內回覆你。';
    toast.querySelector('.hire-toast-icon').textContent = isDanger ? '✕' : '✦';
    toast.classList.toggle('hire-toast--danger', isDanger);
    toast.hidden = false;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        toast.classList.add('show');
      });
    });
    setTimeout(function () {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', function hide() {
        toast.hidden = true;
        toast.removeEventListener('transitionend', hide);
      });
    }, 4000);
  }
})();

// Photo strip — sequential cycling (one frame at a time)
(function () {
  var frames = document.querySelectorAll('[data-strip-frame]');
  if (!frames.length) return;

  var pool = [
    '/images/hire/img_ui_editor2.jpg',
    '/images/hire/img_ui_single.jpg',
    '/images/hire/img_ui_website.jpg',
    '/images/hire/img_graphic-1.jpg',
    '/images/hire/img_graphic-2.jpg',
    '/images/hire/img_graphic-3.jpg',
    '/images/hire/img_graphic-4.jpg',
  ];

  function pickOther(currentSrc) {
    var candidates = pool.filter(function (p) { return !currentSrc.endsWith(p); });
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function slideNext(frame, done) {
    var img = frame.querySelector('img');
    var nextSrc = pickOther(img.src);

    // 滑出到左邊
    img.style.transform = 'translateX(-110%)';
    img.style.opacity = '0';

    setTimeout(function () {
      // 瞬移到右邊、換圖
      img.style.transition = 'none';
      img.style.transform = 'translateX(110%)';
      img.style.opacity = '1';
      img.src = nextSrc;

      void img.offsetWidth; // force reflow

      // 從右滑入
      img.style.transition = 'transform 0.45s ease, opacity 0.45s ease';
      img.style.transform = 'translateX(0)';

      setTimeout(function () {
        if (done) done();
      }, 480);
    }, 450);
  }

  var idx = 0;

  function next() {
    slideNext(frames[idx], function () {
      idx = (idx + 1) % frames.length;
      setTimeout(next, 2000);
    });
  }

  setTimeout(next, 1800);
})();
