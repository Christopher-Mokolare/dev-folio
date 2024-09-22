
//----------------------------------swiper ----------------------------------

const swiperWrapper = document.querySelector('.swiper-wrapper');
const prevButton = document.querySelector('.swiper-prev-img');
const nextButton = document.querySelector('.swiper-next-img');

let currentIndex = 0;
const slides = document.querySelectorAll('.swiper-slide');
const totalSlides = slides.length;
const slideWidth = slides[0].clientWidth;

nextButton.addEventListener('click', () => {
    if (currentIndex < totalSlides - 1) {  // Adjust to match the number of visible slides
        currentIndex++;
        swiperWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        swiperWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
});