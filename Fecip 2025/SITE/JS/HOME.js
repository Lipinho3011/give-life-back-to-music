// Função de rolagem suave personalizada (1.5s)
function smoothScrollTo(targetY, duration = 1500) {
	const startY = window.pageYOffset;
	const startTime = performance.now();
	function animateScroll(currentTime) {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const ease = progress < 0.5
			? 2 * progress * progress
			: -1 + (4 - 2 * progress) * progress;
		window.scrollTo(0, startY + (targetY - startY) * ease);
		if (progress < 1) {
			requestAnimationFrame(animateScroll);
		}
	}
	requestAnimationFrame(animateScroll);
}
// Botões de rolagem horizontal para as listas de cards
document.addEventListener('DOMContentLoaded', function() {
	document.querySelectorAll('.bloco__msc').forEach(function(bloco) {
		const list = bloco.querySelector('.card__list');
		const btnLeft = bloco.querySelector('.scroll-left');
		const btnRight = bloco.querySelector('.scroll-right');
		if (list && btnLeft && btnRight) {
			btnLeft.addEventListener('click', function() {
				list.scrollBy({ left: -list.offsetWidth * 0.7, behavior: 'smooth' });
			});
			btnRight.addEventListener('click', function() {
				list.scrollBy({ left: list.offsetWidth * 0.7, behavior: 'smooth' });
			});
		}
	});
});
// Animação suave de rolagem personalizada (1.5s) para todos os links internos
document.addEventListener('DOMContentLoaded', function() {
	// Botão principal "MÚSICAS"
	const btn = document.getElementById('btn');
	const section = document.getElementById('musicas');
	if (btn && section) {
		btn.addEventListener('click', function(e) {
			e.preventDefault();
			const targetY = section.getBoundingClientRect().top + window.pageYOffset;
			smoothScrollTo(targetY, 1500);
		});
	}

	// Todos os links internos do menu e do footer
	document.querySelectorAll('a[href^="#"]').forEach(function(link) {
		link.addEventListener('click', function(e) {
			const href = link.getAttribute('href');
			if (href.length > 1) {
				const target = document.querySelector(href);
				if (target) {
					e.preventDefault();
					const targetY = target.getBoundingClientRect().top + window.pageYOffset;
					smoothScrollTo(targetY, 1500);
				}
			}
		});
	});
});
// Animação palavra por palavra: cada palavra aparece com fade-in e deslizamento
document.addEventListener('DOMContentLoaded', function() {
	const title = document.getElementById('title__main');
	if (!title) return;
	const text = title.textContent;
	title.textContent = '';
	// Cria um span para cada palavra
	const words = text.split(' ');
	words.forEach((word, i) => {
		const span = document.createElement('span');
		span.textContent = word;
		span.className = 'title__main-word';
		title.appendChild(span);
		if (i < words.length - 1) {
			title.appendChild(document.createTextNode(' '));
		}
	});
	// Anima cada palavra individualmente
	const wordSpans = title.querySelectorAll('.title__main-word');
	wordSpans.forEach((span, i) => {
		setTimeout(() => {
			span.classList.add('visible');
		}, 350 * i + 100);
	});
});
