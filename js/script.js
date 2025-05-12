// Mobile menu toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Gallery data
const galleryData = [
  {
    id: 1,
    title: "Mountain Sunrise",
    category: "landscape",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Beautiful sunrise over the Rocky Mountains",
    camera: "Canon EOS R5 | 24-105mm f/4",
  },
  {
    id: 2,
    title: "Urban Portrait",
    category: "portrait",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    description: "Portrait session in downtown Chicago",
    camera: "Sony A7 III | 85mm f/1.4",
  },
  {
    id: 3,
    title: "Wildlife Safari",
    category: "wildlife",
    image:
      "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    description: "Elephant in the wild during African safari",
    camera: "Nikon D850 | 200-500mm f/5.6",
  },
  {
    id: 5,
    title: "Studio Portrait",
    category: "portrait",
    image:
      "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    description: "Professional studio portrait with dramatic lighting",
    camera: "Canon 5D Mark IV | 50mm f/1.2",
  },
  {
    id: 6,
    title: "Bird in Flight",
    category: "wildlife",
    image:
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    description: "Eagle soaring over the mountains",
    camera: "Sony A9 II | 400mm f/2.8",
  },
  {
    id: 7,
    title: "Desert Dunes",
    category: "landscape",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
    description: "Sand dunes in the Sahara Desert at sunset",
    camera: "Nikon Z7 | 24-70mm f/2.8",
  },
  {
    id: 8,
    title: "Street Photography",
    category: "portrait",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    description: "Candid street portrait in New York City",
    camera: "Leica M10 | 35mm f/1.4",
  },
];

// Initialize gallery
const galleryGrid = document.getElementById("gallery-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderGallery(filter = "all") {
  galleryGrid.innerHTML = "";

  const filteredItems =
    filter === "all"
      ? galleryData
      : galleryData.filter((item) => item.category === filter);

  filteredItems.forEach((item) => {
    const galleryItem = document.createElement("div");
    galleryItem.className =
      "gallery-item relative overflow-hidden rounded-lg cursor-pointer";
    galleryItem.dataset.category = item.category;

    galleryItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="w-full h-64 object-cover">
                    <div class="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4 opacity-0 hover:opacity-100 transition-opacity">
                        <div>
                            <h3 class="text-white font-bold text-lg">${item.title}</h3>
                            <p class="text-gray-200 text-sm">${item.camera}</p>
                        </div>
                    </div>
                `;

    galleryItem.addEventListener("click", () => openModal(item));
    galleryGrid.appendChild(galleryItem);
  });
}

// Filter gallery
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Update active button
    filterButtons.forEach((btn) => {
      if (btn === button) {
        btn.classList.remove("bg-white", "text-gray-700");
        btn.classList.add("bg-indigo-600", "text-white");
      } else {
        btn.classList.remove("bg-indigo-600", "text-white");
        btn.classList.add("bg-white", "text-gray-700");
      }
    });

    // Filter gallery
    const filter = button.dataset.filter;
    renderGallery(filter);
  });
});

// Modal functionality
const modal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalCamera = document.getElementById("modal-camera");
const closeModal = document.getElementById("close-modal");

function openModal(item) {
  modalImage.src = item.image;
  modalImage.alt = item.title;
  modalTitle.textContent = item.title;
  modalDescription.textContent = item.description;
  modalCamera.textContent = item.camera;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
});

// Close modal when clicking outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
});

// Back to top button
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.remove("hidden");
  } else {
    backToTopBtn.classList.add("hidden");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Close mobile menu if open
      mobileMenu.classList.add("hidden");
    }
  });
});

// Initialize gallery on page load
document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
});
