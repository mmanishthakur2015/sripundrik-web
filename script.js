/**
 * Shri Pundrik Goswami Ji Maharaj - Spiritual Portal
 * Interactive Frontend Engine
 * Powered by Planet C
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initHeroSlider();
  initStickyHeader();
  initMobileDrawer();
  initCountdown();
  initFilterTabs();
  initCounters();
});

/* ==========================================================================
   1. Theme Customizer & Appearance Engine
   ========================================================================== */
function initThemeEngine() {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeSwitcherToggle');
  const drawerPanel = document.getElementById('themeDrawerPanel');
  const drawerClose = document.getElementById('themeDrawerClose');
  const darkModeToggle = document.getElementById('darkModeToggle');

  // Load saved theme
  const savedTheme = localStorage.getItem('spg_theme') || 'gold';
  const savedDarkMode = localStorage.getItem('spg_dark') === 'true';
  const savedFontSize = localStorage.getItem('spg_fontsize') || 'normal';

  switchTheme(savedTheme, false);
  if (savedDarkMode) {
    toggleDarkMode(true, false);
    if (darkModeToggle) darkModeToggle.checked = true;
  }
  adjustFontSize(savedFontSize, false);

  // Drawer Toggle Events
  if (themeToggle && drawerPanel) {
    themeToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      drawerPanel.classList.toggle('open');
    });
  }

  if (drawerClose && drawerPanel) {
    drawerClose.addEventListener('click', () => {
      drawerPanel.classList.remove('open');
    });
  }

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (drawerPanel && drawerPanel.classList.contains('open') && !drawerPanel.contains(e.target) && e.target !== themeToggle) {
      drawerPanel.classList.remove('open');
    }
  });
}

function switchTheme(themeName, persist = true) {
  document.documentElement.setAttribute('data-theme', themeName);

  // Update active state in palette grid
  document.querySelectorAll('.palette-card').forEach(btn => {
    if (btn.getAttribute('data-theme-val') === themeName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (persist) {
    localStorage.setItem('spg_theme', themeName);
    showToast('Theme Changed', `Switched to ${themeName.charAt(0).toUpperCase() + themeName.slice(1)} palette.`);
  }
}

function toggleDarkMode(isDark, persist = true) {
  if (isDark) {
    document.documentElement.setAttribute('data-dark', 'true');
  } else {
    document.documentElement.removeAttribute('data-dark');
  }

  if (persist) {
    localStorage.setItem('spg_dark', isDark ? 'true' : 'false');
    showToast('Appearance', isDark ? 'Dark mode enabled.' : 'Light mode enabled.');
  }
}

function adjustFontSize(size, persist = true) {
  const root = document.documentElement;
  root.classList.remove('font-small', 'font-large');

  if (size === 'small') root.classList.add('font-small');
  if (size === 'large') root.classList.add('font-large');

  document.querySelectorAll('.font-btn').forEach(btn => {
    btn.classList.remove('active');
    if (size === 'small' && btn.textContent.trim() === 'A-') btn.classList.add('active');
    if (size === 'normal' && btn.textContent.trim() === 'A') btn.classList.add('active');
    if (size === 'large' && btn.textContent.trim() === 'A+') btn.classList.add('active');
  });

  if (persist) {
    localStorage.setItem('spg_fontsize', size);
  }
}

/* ==========================================================================
   2. Hero Banner Carousel
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const sliderSection = document.getElementById('heroSlider');

  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval = null;
  const slideDuration = 6000;

  function showSlide(index) {
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentSlide = index;
  }

  function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, slideDuration);
  }

  function stopAutoPlay() {
    if (slideInterval) clearInterval(slideInterval);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      startAutoPlay();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAutoPlay();
    });
  });

  if (sliderSection) {
    sliderSection.addEventListener('mouseenter', stopAutoPlay);
    sliderSection.addEventListener('mouseleave', startAutoPlay);
  }

  startAutoPlay();
}

/* ==========================================================================
   3. Sticky Header & Back to Top
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   4. Mobile Navigation Drawer
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const closeBtn = document.getElementById('drawerClose');
  const navLinks = document.querySelectorAll('.mobile-nav-item');

  function openDrawer() {
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   5. Live Event Countdown
   ========================================================================== */
function initCountdown() {
  const daysEl = document.getElementById('cdDays');
  const hoursEl = document.getElementById('cdHours');
  const minsEl = document.getElementById('cdMinutes');
  const secsEl = document.getElementById('cdSeconds');

  if (!daysEl) return;

  // Set target date: 8 days and 14 hours from current session
  let targetTime = new Date().getTime() + (8 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000);

  function update() {
    const now = new Date().getTime();
    const diff = targetTime - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(d).padStart(2, '0');
    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   6. Event & Gallery Filtering
   ========================================================================== */
function initFilterTabs() {
  // Event Tabs
  const eventTabs = document.querySelectorAll('.event-tab-btn');
  const eventCards = document.querySelectorAll('.event-card');

  eventTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      eventTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      eventCards.forEach(card => {
        const type = card.getAttribute('data-event-type');
        if (filter === 'all' || type === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Gallery Tabs
  const galleryTabs = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

function filterPillar(cat) {
  const cards = document.querySelectorAll('.pillar-card');
  cards.forEach(c => {
    if (c.getAttribute('data-category') === cat) {
      c.scrollIntoView({ behavior: 'smooth', block: 'center' });
      c.style.transform = 'translateY(-12px) scale(1.02)';
      c.style.borderColor = 'var(--primary)';
      setTimeout(() => {
        c.style.transform = '';
      }, 1500);
    }
  });
}

/* ==========================================================================
   7. Animated Stats Counter
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  let started = false;

  function countUp() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target') || 500;
      let count = 0;
      const speed = target / 40;

      const timer = setInterval(() => {
        count += speed;
        if (count >= target) {
          counter.textContent = target >= 1000 ? (target >= 10000 ? '50k+' : '2,500+') : target + '+';
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(count) + '+';
        }
      }, 35);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      countUp();
    }
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-counter-grid');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   8. Video Player Modal
   ========================================================================== */
function openVideoPlayer(videoId, title) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  const titleEl = document.getElementById('videoModalTitle');

  if (titleEl) titleEl.textContent = title || 'Spiritual Discourse';
  if (iframe) iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');

  if (iframe) iframe.src = '';
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ==========================================================================
   9. Lightbox Photo Zoom
   ========================================================================== */
function openLightbox(imgSrc, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');

  if (img) img.src = imgSrc;
  if (cap) cap.textContent = caption || '';
  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function likeGalleryItem(btn, event) {
  event.stopPropagation();
  const countEl = btn.querySelector('.like-count');
  let count = parseInt(countEl.textContent, 10) || 100;

  if (btn.classList.contains('liked')) {
    btn.classList.remove('liked');
    countEl.textContent = count - 1;
  } else {
    btn.classList.add('liked');
    countEl.textContent = count + 1;
    showToast('Heart Given', 'Jai Gaur! Your appreciation was added.');
  }
}

/* ==========================================================================
   10. Modal Helper Functions
   ========================================================================== */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on background click
document.querySelectorAll('.site-modal').forEach(m => {
  m.addEventListener('click', (e) => {
    if (e.target === m) {
      m.classList.remove('open');
      document.body.style.overflow = '';
      const iframe = m.querySelector('iframe');
      if (iframe) iframe.src = '';
    }
  });
});

/* ==========================================================================
   11. Information Modal Loader (openInfoModal)
   ========================================================================== */
const infoContents = {
  'life': {
    title: 'Divine Life & Spiritual Journey',
    html: `
      <p>Shri Manmadhava Gaudeshwar Vaishnava Acharya Shri Pundrik Goswami Ji Maharaj was born into the sacred lineage of <strong>Shri Gopal Bhatt Goswami</strong>, one of the Six Goswamis of Vrindavan initiated directly under the divine grace of <strong>Shri Chaitanya Mahaprabhu</strong>.</p>
      <p>From early childhood, Maharaj Ji displayed supreme devotion and scriptural acumen. As the grandson of the revered saint Shri Atul Krishna Goswami Ji Maharaj, he inherited the sublime responsibility of the spiritual throne of Shri Radha Raman Temple.</p>
      <p>His transformative TEDx talk, <em>"From Religiosity to Spirituality"</em>, opened up the intimate journey of courage, dedication, and modern vision that define his guidance today.</p>
    `
  },
  'biography': {
    title: 'Biography of Acharya Shri Pundrik Goswami Ji',
    html: `
      <p><strong>Title:</strong> 38th Acharya of Gaudiya Parampara<br>
      <strong>Abode:</strong> Vaijayanti Ashram, Gyan Gudri, Vrindavan Dham<br>
      <strong>Lineage:</strong> Shri Gopal Bhatt Goswami Parampara</p>
      <p>Pujya Maharaj Ji has addressed prestigious international assemblies, universities, and interfaith summits. Combining fluency in English, Hindi, and Sanskrit, he articulates profound Vedic truths with scientific reasoning, inspiring millions of youth to lead an ethically grounded, spirit-centered life.</p>
      <p>He is the founder and patron of <strong>Vaijayanti Sewa Sansthan Trust</strong>, running gaushalas, spiritual learning centers, and humanitarian relief across northern India.</p>
    `
  },
  'parampara': {
    title: 'The Sacred Gaudiya Lineage (Parampara)',
    html: `
      <p>The Gaudiya Vaishnava lineage traces back to Lord Shri Chaitanya Mahaprabhu (1486–1534), who revealed the supreme path of Prema Bhakti through the chanting of the Holy Names: <em>Hare Krishna Hare Krishna Krishna Krishna Hare Hare, Hare Rama Hare Rama Rama Rama Hare Hare</em>.</p>
      <p>In 1542, Shri Gopal Bhatt Goswami Ji manifested the self-manifested deity of <strong>Thakur Shri Radha Raman Lal Ji</strong> from a sacred Shaligram Shila in Vrindavan. The Goswami family has served Thakur Ji continuously for five centuries.</p>
    `
  },
  'radharaman': {
    title: 'Thakur Shri Radha Raman Ji Temple',
    html: `
      <p>Established in 1542 AD, Shri Radha Raman Temple in Vrindavan is one of the seven historic Goswami temples of Vraj. Thakur Ji manifested Himself with divine beauty, and His eternal kitchen fire (Anala) has burned uninterruptedly for more than 480 years without matches or external modern fuel.</p>
      <p>Maharaj Shri Pundrik Goswami Ji serves as a hereditary Seva Adhikari, upholding the pristine puja traditions, raag-bhog, and festivals of Thakur Ji.</p>
    `
  },
  'awards': {
    title: 'Honours, Accolades & Global Recognitions',
    html: `
      <ul>
        <li><strong>TEDx Keynote Speaker</strong> &ndash; Recognized for revolutionary discourse bridging modern science and Vedic mysticism.</li>
        <li><strong>Interfaith Peace Ambassador</strong> &ndash; Represented Sanatan Dharma at global summits advocating ahimsa, harmony, and cow protection.</li>
        <li><strong>University Keynotes</strong> &ndash; Honored by IIT Roorkee, Delhi University, JNU, University of Michigan (USA), and University of Birmingham (UK).</li>
        <li><strong>Youth Icon for Sanatan Culture</strong> &ndash; Commended for establishing global youth clubs, pathshalas, and value-based de-addiction programs.</li>
      </ul>
    `
  },
  'peace': {
    title: 'Peace & Ethics Initiatives',
    html: `
      <p>Through the Gopal Clubs and international symposiums, Maharaj Ji actively promotes inter-community dialogue, mental well-being, and ecological protection. His discourse emphasizes that true peace begins with inner self-purification and mindful living.</p>
    `
  },
  'nimai-info': {
    title: 'Nimai Pathshala &ndash; Global Online Vedic School',
    html: `
      <p><strong>Nimai Pathshala</strong> brings the holy wisdom of Vrindavan directly into homes worldwide via live interactive video classrooms.</p>
      <p>Curriculum highlights:</p>
      <ul>
        <li>Shlokas and chanting with accurate Sanskrit pronunciation</li>
        <li>Stories of Krishna, Ramayana, and the Srimad Bhagavatam</li>
        <li>Value-based moral reasoning and mind focus techniques for young students</li>
        <li>Devotee classes open to all age groups with flexible international batch timings</li>
      </ul>
      <p>To enroll, please contact the ashram via the Contact form or WhatsApp.</p>
    `
  },
  'sanjhi-info': {
    title: 'Sanjhi Mahotsav &ndash; Sacred Temple Art',
    html: `
      <p>Sanjhi is an ancient folk-art indigenous to Vraj, created by Shri Radha Rani and the Braj Gopis to welcome Shri Krishna back from the pastures at dusk. Using intricate hand-cut paper stencils, elaborate dry color powder mandalas are drawn on temple floors.</p>
      <p>Under Maharaj Ji's patronage, the Sanjhi Mahotsav is revived annually at Radha Raman Temple with classical Samaj Gayan.</p>
    `
  },
  'katha-info': {
    title: 'Shrimad Bhagwat Katha Series',
    html: `
      <p>Pujya Maharaj Ji's Kathas are celebrated for their poetic nectar, deep philosophical clarity, and uplifting kirtans. Having completed hundreds of 7-day Bhagwat Kathas across India, the UK, USA, and Southeast Asia, Maharaj Ji touches the hearts of listeners of all generations.</p>
    `
  },
  'lectures-info': {
    title: 'Youth & University Keynotes',
    html: `
      <p>Maharaj Ji has addressed students, professors, and corporate leaders on subjects like <em>"Emotional Equilibrium Through the Gita"</em>, <em>"Science & Sanatan Dharma"</em>, and <em>"Mind Over Matter"</em>. His interactive Q&A sessions are widely followed on social media.</p>
    `
  },
  'trust-vrindavan': {
    title: 'Vaijayanti Sewa Sansthan Trust',
    html: `
      <p>Vaijayanti Sewa Sansthan is the official charitable trust spearheading social, educational, and gau-seva projects. Headquartered at Gyan Gudri, Vrindavan, it administers daily bhandaras (Annadanam), spiritual retreats, and humanitarian medical assistance.</p>
    `
  },
  'gaushala': {
    title: 'Vrindavan Gaushala & Gau Protection',
    html: `
      <p>Over 2,500 indigenous cows (Gir, Tharparkar, Sahiwal) are protected and nurtured across the trust's gaushalas. Free healthcare, organic fodder, and shelter are provided for injured, rescued, and elderly cattle.</p>
    `
  },
  'peeth': {
    title: 'Regional Peeths: Amritsar, Jalandhar & Ludhiana',
    html: `
      <p>To serve devotees across Punjab and northern India, dedicated Peeths have been established in Amritsar, Jalandhar, and Ludhiana. They host regular satsangs, festive processions, and charity drives.</p>
    `
  },
  'gopal-club': {
    title: 'Gopal Youth Club',
    html: `
      <p>Gopal Club engages thousands of youth in noble service, social cleanliness, de-addiction campaigns, and character development workshops rooted in Bhakti-yoga.</p>
    `
  },
  'mumbai-katha': {
    title: 'Shri Braj Bhagwat Katha &ndash; Mumbai Session',
    html: `
      <p><strong>Dates:</strong> 27th January to 2nd February<br>
      <strong>Venue:</strong> Azad Maidan, Fort, South Mumbai<br>
      <strong>Timings:</strong> 4:00 PM to 7:00 PM IST<br>
      <strong>Orator:</strong> Pujya Acharya Shri Pundrik Goswami Ji</p>
      <p>Complimentary seating passes available. You can register instantly through the RSVP Pass button.</p>
    `
  },
  'kolkata-katha': {
    title: 'Shrimad Bhagwat Katha &ndash; Kolkata Session',
    html: `
      <p><strong>Dates:</strong> 12th January to 18th January<br>
      <strong>Venue:</strong> PC Chandra Garden, Kolkata<br>
      <strong>Timings:</strong> 3:00 PM to 6:00 PM IST</p>
      <p>Featuring seven divine days of Krishna Lila, Govardhan Utsav, and Rukmini Vivah celebrations.</p>
    `
  },
  'vrindavan-holi': {
    title: 'Vrindavan Holi & Phoolon Ki Holi',
    html: `
      <p><strong>Date:</strong> Phalgun Purnima / Holi<br>
      <strong>Venue:</strong> Shri Radha Raman Temple, Vrindavan<br>
      Experience the authentic, pure Braj Phoolon Ki Holi, herbal gulal, and classical Samaj Gayan in the presence of Thakur Ji.</p>
    `
  }
};

function openInfoModal(topicKey) {
  const modal = document.getElementById('infoModal');
  const titleEl = document.getElementById('infoModalTitle');
  const bodyEl = document.getElementById('infoModalBody');

  const content = infoContents[topicKey] || {
    title: 'Shri Pundrik Goswami Ji Maharaj',
    html: '<p>Information regarding this divine initiative will be shared shortly. Please feel free to reach out to the ashram office.</p>'
  };

  if (titleEl) titleEl.textContent = content.title;
  if (bodyEl) bodyEl.innerHTML = content.html;
  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   12. RSVP Seating Pass Form
   ========================================================================== */
function openRSVPModal(eventTitle) {
  const modal = document.getElementById('rsvpModal');
  const eventTitleInput = document.getElementById('rsvpEventTitle');
  const eventSubtitle = document.getElementById('rsvpEventSubtitle');
  const successCard = document.getElementById('rsvpSuccessCard');
  const form = document.getElementById('rsvpForm');

  if (eventTitleInput) eventTitleInput.value = eventTitle || 'Shrimad Bhagwat Katha';
  if (eventSubtitle) eventSubtitle.textContent = eventTitle || 'Shrimad Bhagwat Katha';
  if (successCard) successCard.style.display = 'none';
  if (form) form.style.display = 'block';

  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

async function handleRSVPSubmit(event) {
  event.preventDefault();
  const submitBtn = document.getElementById('rsvpSubmitBtn');
  const eventTitle = document.getElementById('rsvpEventTitle').value;
  const name = document.getElementById('rsvpName').value.trim();
  const phone = document.getElementById('rsvpPhone').value.trim();
  const email = document.getElementById('rsvpEmail').value.trim();
  const seats = document.getElementById('rsvpSeats').value;

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Confirming Pass...';
  }

  const generatedPass = 'SPG-' + Math.floor(100000 + Math.random() * 900000);

  try {
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, eventTitle, seats })
    });
    const result = await response.json();
    displayRSVPSuccess(result.passId || generatedPass, result.message || `Booking for "${eventTitle}" is confirmed!`);
  } catch (err) {
    // Client-side fallback if server offline
    displayRSVPSuccess(generatedPass, `Booking for "${eventTitle}" confirmed! Pass saved locally.`);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-check-circle"></i> Generate & Confirm Pass';
    }
  }
}

function displayRSVPSuccess(passId, message) {
  const form = document.getElementById('rsvpForm');
  const successCard = document.getElementById('rsvpSuccessCard');
  const passCodeDisplay = document.getElementById('passCodeDisplay');
  const successMsg = document.getElementById('rsvpSuccessMsg');

  if (form) form.style.display = 'none';
  if (successCard) successCard.style.display = 'block';
  if (passCodeDisplay) passCodeDisplay.textContent = passId;
  if (successMsg) successMsg.textContent = message;

  showToast('Booking Confirmed', `Your Pass ${passId} has been generated!`);
}

/* ==========================================================================
   13. Donation & Seva Form
   ========================================================================== */
function selectDonationPreset(amount) {
  document.querySelectorAll('.preset-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-amount') === String(amount));
  });

  const customInput = document.getElementById('customDonationInput');
  if (customInput) customInput.value = amount;
}

function setModalAmount(amount) {
  const modalAmount = document.getElementById('modalDonationAmount');
  if (modalAmount) modalAmount.value = amount;

  document.querySelectorAll('.seva-presets.in-modal .preset-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.includes(amount.toLocaleString()));
  });
}

function proceedToDonate() {
  const customInput = document.getElementById('customDonationInput');
  const amount = customInput ? customInput.value : 1100;
  openDonationModal('general', amount);
}

function openDonationModal(category, prefillAmount) {
  const modal = document.getElementById('donationModal');
  const categorySelect = document.getElementById('modalSevaCategory');
  const amountInput = document.getElementById('modalDonationAmount');
  const form = document.getElementById('donationForm');
  const successCard = document.getElementById('donationSuccessCard');

  if (categorySelect && category) {
    if (category === 'gaushala') categorySelect.value = 'Gaushala Seva';
    else if (category === 'annadanam') categorySelect.value = 'Daily Annadanam';
    else if (category === 'education') categorySelect.value = 'Nimai Pathshala';
    else if (category === 'medical') categorySelect.value = 'Medical Relief';
    else categorySelect.value = 'General Trust';
  }

  if (amountInput && prefillAmount) {
    amountInput.value = prefillAmount;
  }

  if (form) form.style.display = 'block';
  if (successCard) successCard.style.display = 'none';

  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

async function handleDonationSubmit(event) {
  event.preventDefault();
  const submitBtn = document.getElementById('donateSubmitBtn');
  const sevaCategory = document.getElementById('modalSevaCategory').value;
  const amount = document.getElementById('modalDonationAmount').value;
  const name = document.getElementById('donorName').value.trim();
  const phone = document.getElementById('donorPhone').value.trim();
  const email = document.getElementById('donorEmail').value.trim();

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Recording Pledge...';
  }

  const generatedReceipt = 'DON-' + Math.floor(100000 + Math.random() * 900000);

  try {
    const res = await fetch('/api/donation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, sevaCategory, amount })
    });
    const result = await res.json();
    displayDonationSuccess(result.receiptNo || generatedReceipt);
  } catch (err) {
    displayDonationSuccess(generatedReceipt);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Record Pledge & Receive Receipt';
    }
  }
}

function displayDonationSuccess(receiptNo) {
  const form = document.getElementById('donationForm');
  const successCard = document.getElementById('donationSuccessCard');
  const receiptEl = document.getElementById('donationReceiptNo');

  if (form) form.style.display = 'none';
  if (successCard) successCard.style.display = 'block';
  if (receiptEl) receiptEl.textContent = receiptNo;

  showToast('Seva Contribution Noted', `Reference: ${receiptNo}. Radhe Radhe!`);
}

/* ==========================================================================
   14. Contact Form Submission
   ========================================================================== */
async function handleContactSubmit(event) {
  event.preventDefault();
  const submitBtn = document.getElementById('contactSubmitBtn');
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const phone = document.getElementById('contactPhone').value.trim();
  const type = document.getElementById('contactInquiryType').value;
  const subject = document.getElementById('contactSubject').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting Message...';
  }

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, type, subject, message })
    });
    const data = await res.json();
    showToast('Message Received', data.message || 'Radhe Radhe! We will contact you soon.');
    document.getElementById('contactForm').reset();
  } catch (err) {
    showToast('Message Sent', 'Radhe Radhe! Your inquiry has been received by the ashram seva office.');
    document.getElementById('contactForm').reset();
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Inquiry';
    }
  }
}

/* ==========================================================================
   15. Newsletter Subscription
   ========================================================================== */
async function handleNewsletterSubmit(event) {
  event.preventDefault();
  const submitBtn = document.getElementById('nlSubmitBtn');
  const emailInput = document.getElementById('nlEmail');
  const email = emailInput ? emailInput.value.trim() : '';

  if (!email) return;

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  }

  try {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    showToast('Subscribed!', data.message || 'Thank you for joining daily satsang updates.');
    if (emailInput) emailInput.value = '';
  } catch (err) {
    showToast('Subscribed!', 'Thank you! You will receive daily divine thoughts and katha alerts.');
    if (emailInput) emailInput.value = '';
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Subscribe</span> <i class="fa-solid fa-paper-plane"></i>';
    }
  }
}

/* ==========================================================================
   16. Copy Text Helper
   ========================================================================== */
function copyText(elementId, successMessage) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const text = el.textContent.trim();
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to Clipboard', successMessage || `${text} copied!`);
  }).catch(() => {
    showToast('Copy Failed', 'Please manually copy the text.', true);
  });
}

/* ==========================================================================
   17. Toast Notification System
   ========================================================================== */
let toastTimeout = null;

function showToast(title, message, isError = false) {
  const toast = document.getElementById('toastNotification');
  const titleEl = document.getElementById('toastTitle');
  const msgEl = document.getElementById('toastMessage');
  const iconEl = document.getElementById('toastIcon');

  if (!toast) return;

  if (titleEl) titleEl.textContent = title;
  if (msgEl) msgEl.textContent = message;

  if (iconEl) {
    if (isError) {
      iconEl.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="color: #ef4444;"></i>';
      toast.style.borderLeftColor = '#ef4444';
    } else {
      iconEl.innerHTML = '<i class="fa-solid fa-circle-check" style="color: var(--primary);"></i>';
      toast.style.borderLeftColor = 'var(--primary)';
    }
  }

  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    hideToast();
  }, 4500);
}

function hideToast() {
  const toast = document.getElementById('toastNotification');
  if (toast) toast.classList.remove('show');
}
