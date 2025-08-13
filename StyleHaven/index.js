const portfolioService = {
    projects: JSON.parse(localStorage.getItem('portfolio')) || [
        { name: "Cozy Living Room", style: "Modern", date: "2025-01-15", image: "https://i.postimg.cc/JnghMqW4/cozy-lively-home-interior-design.jpg" },
        { name: "Elegant Bedroom", style: "Classic", date: "2025-02-20", image: "https://i.postimg.cc/KjRFsKms/interior-design-neoclassical-style-with-furnishings-decor.jpg" },
        { name: "Minimalist Kitchen", style: "Contemporary", date: "2025-03-10", image: "https://i.postimg.cc/XN50ZrXc/minimalist-kitchen-interior-design.jpg" }
    ],
    save() {
        localStorage.setItem('portfolio', JSON.stringify(this.projects));
    },
    add(project) {
        this.projects.push(project);
        this.save();
    },
    update(index, project) {
        this.projects[index] = project;
        this.save();
    },
    delete(index) {
        this.projects.splice(index, 1);
        this.save();
    }
};




const styleService = {
    styles: JSON.parse(localStorage.getItem('styles')) || [
        { name: "Modern", description: "Clean lines and minimalistic aesthetics." },
        { name: "Classic", description: "Timeless elegance with ornate details." },
        { name: "Contemporary", description: "Sleek and functional with bold accents." }
    ],
    save() {
        localStorage.setItem('styles', JSON.stringify(this.styles));
    }
};

const servicesService = {
    services: JSON.parse(localStorage.getItem('services')) || [
        {
            name: "Full Home Design",
            description: "Transform your entire home with a cohesive, personalized design plan. We handle every detail, from layout and furniture selection to lighting and decor, ensuring a harmonious and stunning result that reflects your lifestyle.",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        },
        {
            name: "Room Makeovers",
            description: "Revitalize individual rooms with creative designs tailored to your taste. Whether it’s a cozy living room, a serene bedroom, or a functional home office, we create spaces that inspire and delight.",
            image: "https://i.postimg.cc/KYMMCz8j/bedroom-with-chandelier-bed-with-blanket-it.jpg"
        },
        {
            name: "Color Consultations",
            description: "Discover the perfect color palette to enhance your space’s ambiance. Our experts guide you through color selection, ensuring harmony and a timeless aesthetic that elevates every room.",
            image: "https://i.postimg.cc/SKWBrB7j/montreal-color-consultation-006.jpg"
        },
        {
            name: "Custom Furniture Design",
            description: "Create bespoke furniture pieces that perfectly fit your space and style. From statement sofas to unique storage solutions, our custom designs blend form, function, and artistry.",
            image: "https://i.postimg.cc/sX8SnNJG/modern-styled-entryway.jpg"
        },
        {
            name: "Lighting Design",
            description: "Illuminate your home with expertly planned lighting solutions. We combine ambient, task, and accent lighting to create mood, enhance functionality, and highlight your space’s best features.",
            image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15"
        },
        {
            name: "Space Planning",
            description: "Optimize your home’s layout for maximum comfort and efficiency. Our space planning services ensure every square foot is used effectively, creating a seamless flow tailored to your needs.",
            image: "https://images.unsplash.com/photo-1600585152915-d208bec867a1"
        }
    ],
    save() {
        localStorage.setItem('services', JSON.stringify(this.services));
    }
};

function showSection(sectionId) {

    const video = document.querySelector('#home video');


    if (video && sectionId !== 'home') {
        video.pause();
    }


    document.querySelectorAll('section').forEach(sec => {
        sec.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';


    if (sectionId === 'home' && video) {
        video.play();
    }


    if (sectionId === 'portfolio') renderPortfolio();
    if (sectionId === 'services') renderServices();
    if (sectionId === 'home') renderHome();
}

function renderHome() {

}

function renderPortfolio(filteredProjects = portfolioService.projects) {
    const portfolioList = document.getElementById('portfolio-list');
    portfolioList.innerHTML = '';
    filteredProjects.forEach((project, index) => {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        div.innerHTML = `
            <img src="${project.image}" alt="${project.name}" onclick="showModal(${index})" style="cursor: pointer;">
            <h3>${project.name}</h3>
            <p>Style: ${project.style}</p>
            <p>Date: ${new Date(project.date).toLocaleDateString()}</p>
        `;
        portfolioList.appendChild(div);
    });
}

function renderServices() {
    const servicesList = document.getElementById('services-list');
    servicesList.innerHTML = '';
    servicesService.services.forEach(service => {
        const div = document.createElement('div');
        div.className = 'service-card';
        div.innerHTML = `
            <img src="${service.image}" alt="${service.name}">
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <button onclick="showSection('contact')">Learn More</button>
        `;
        servicesList.appendChild(div);
    });
}

function showModal(index) {
    const project = portfolioService.projects[index];
    document.getElementById('modal-image').src = project.image;
    document.getElementById('modal-image').alt = project.name;
    document.getElementById('modal-title').textContent = project.name;
    document.getElementById('modal-style').textContent = `Style: ${project.style}`;
    document.getElementById('modal-date').textContent = `Date: ${new Date(project.date).toLocaleDateString()}`;
    document.getElementById('portfolio-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('portfolio-modal').style.display = 'none';
}

function populateStyles() {
    const filter = document.getElementById('portfolio-filter');
    filter.innerHTML = '<option value="">All Styles</option>';
    styleService.styles.forEach(style => {
        const option = document.createElement('option');
        option.value = style.name;
        option.textContent = style.name;
        filter.appendChild(option);
    });
}

document.getElementById('portfolio-search').addEventListener('input', filterSortPortfolio);
document.getElementById('portfolio-filter').addEventListener('change', filterSortPortfolio);
document.getElementById('portfolio-sort').addEventListener('change', filterSortPortfolio);

function filterSortPortfolio() {
    let projects = [...portfolioService.projects];
    const search = document.getElementById('portfolio-search').value.toLowerCase();
    const filter = document.getElementById('portfolio-filter').value;
    const sort = document.getElementById('portfolio-sort').value;

    if (search) {
        projects = projects.filter(p => p.name.toLowerCase().includes(search));
    }

    if (filter) {
        projects = projects.filter(p => p.style === filter);
    }

    if (sort === 'name') {
        projects.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'date') {
        projects.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    renderPortfolio(projects);
}

document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    console.log('Contact Form Submission:', { name, email, message });
    alert('Thank you for your message! We will get back to you soon.');
    document.getElementById('contact-form').reset();
});

document.getElementById('feedback-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('feedback-name').value;
    const email = document.getElementById('feedback-email').value;
    const type = document.getElementById('feedback-type').value;
    const rating = document.getElementById('feedback-rating').value;
    const contact = document.getElementById('feedback-contact').value;
    const feedback = document.getElementById('feedback-text').value;
    console.log('Feedback Submission:', { name, email, type, rating, contact, feedback });
    alert('Thank you for your feedback! We appreciate your input.');
    document.getElementById('feedback-form').reset();
});

function restrictNumericInput(inputId) {
    const input = document.getElementById(inputId);
    input.addEventListener('input', function (e) {
        this.value = this.value.replace(/[0-9]/g, '');
    });
}

restrictNumericInput('name');
restrictNumericInput('feedback-name');

function populateStyles() {
    const filter = document.getElementById('portfolio-filter');
    filter.innerHTML = '<option value="">All Styles</option>';
    styleService.styles.forEach(style => {
        const option = document.createElement('option');
        option.value = style.name;
        option.textContent = style.name;
        filter.appendChild(option);
    });
}

populateStyles();
showSection('home');