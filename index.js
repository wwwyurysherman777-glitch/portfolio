
document.documentElement.classList.add('js');

// année automatique dans le footer
document.getElementById('annee').textContent = new Date().getFullYear();

// menu burger pour le mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
burger.addEventListener('click', () => {
  const ouvert = nav.classList.toggle('ouvert');
  burger.classList.toggle('actif', ouvert);
  burger.setAttribute('aria-expanded', ouvert);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('ouvert');
  burger.classList.remove('actif');
  burger.setAttribute('aria-expanded', 'false');
}));


const liens = [...nav.querySelectorAll('a')];
const sections = ['accueil', 'competences', 'projets', 'contact']
  .map(id => document.getElementById(id));
const obsLiens = new IntersectionObserver(entrees => {
  entrees.forEach(e => {
    if (e.isIntersecting) {
      liens.forEach(l => l.classList.toggle('actif', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => s && obsLiens.observe(s));


// fait apparaitre les sections lors scroll
const obsReveal = new IntersectionObserver(entrees => {
  entrees.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obsReveal.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => obsReveal.observe(el));