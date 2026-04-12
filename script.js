const servicesData = {
    civil: {
        title: "Construção & Reformas",
        items: ["Reformas em Geral", "Alvenaria e Revestimentos", "Pisos e Porcelanatos", "Pintura Predial", "Ampliação de Ambientes"],
        color: "#00e5ff"
    },
    eletrica: {
        title: "Elétrica & Automação",
        items: ["Instalações Industriais", "Quadros de Força", "Automação Residencial", "Manutenção Preventiva", "Projetos de Iluminação"],
        color: "#ff007f"
    },
    hidraulica: {
        title: "Hidráulica",
        items: ["Redes de Água e Esgoto", "Instalação de Louças", "Detecção de Vazamentos", "Limpeza de Caixas d'Água", "Tubulações de Gás"],
        color: "#00e5ff"
    },
    refrigeracao: {
        title: "Refrigeração",
        items: ["Instalação de Ar Condicionado", "Manutenção de Chiller", "Plano de Manutenção (PMOC)", "Câmaras Frias", "Limpeza de Dutos"],
        color: "#ff007f"
    },
    pintura: {
        title: "Pintura & Drywall",
        items: ["Pintura Comercial", "Grafiato e Texturas", "Divisórias em Drywall", "Forro de Gesso", "Pintura Epóxi"],
        color: "#00e5ff"
    },
    serralheria: {
        title: "Serralheria",
        items: ["Estruturas Metálicas", "Portões e Grades", "Corrimão de Inox", "Mezaninos", "Soldas em Geral"],
        color: "#ff007f"
    }
};

function openModal(serviceKey) {
    const data = servicesData[serviceKey];
    const modal = document.getElementById('service-modal');
    const body = document.getElementById('modal-body');
    let itemsHtml = data.items.map(item => `<li><i class="fas fa-check-circle"></i> ${item}</li>`).join('');
    body.innerHTML = `
        <h2 style="color: ${data.color}">${data.title}</h2>
        <ul>${itemsHtml}</ul><br>
        <a href="https://wa.me/5527998171142?text=Olá, quero orçamento para ${data.title}" target="_blank" class="btn-modal">
            <i class="fab fa-whatsapp"></i> Orçar Agora
        </a>`;
    modal.style.display = 'flex';
}

document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-links a');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    const intro = document.getElementById('intro-overlay');
    const video = document.getElementById('intro-video');
    const content = document.getElementById('main-content');

    if (!sessionStorage.getItem('introViu')) {
        video.play().catch(() => fecharIntro());
        video.onended = () => fecharIntro();
        setTimeout(fecharIntro, 12000);
    } else {
        intro.style.display = 'none';
        content.classList.remove('hidden');
        content.classList.add('show');
    }

    function fecharIntro() {
        intro.style.opacity = '0';
        content.classList.remove('hidden');
        content.classList.add('show');
        sessionStorage.setItem('introViu', 'true');
        setTimeout(() => intro.style.display = 'none', 1000);
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    document.querySelector('.close-modal').onclick = () => document.getElementById('service-modal').style.display = 'none';
    window.onclick = (e) => { if (e.target == document.getElementById('service-modal')) document.getElementById('service-modal').style.display = 'none'; };
});
