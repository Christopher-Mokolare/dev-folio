// **************** Menu Toggle****************
let navbar = document.querySelector('.navbar');
let menu_open = document.getElementById('open-menu-icon');
let menu_close = document.getElementById('close-menu-icon');

function toggleMenu() {
    if (window.innerWidth <= 767) {
        if (navbar.style.display === 'flex') {
            navbar.style.display = 'none';
            menu_open.style.display = 'block';
            menu_close.style.display = 'none';
        } else {
            navbar.style.display = 'flex';
            menu_open.style.display = 'none';
            menu_close.style.display = 'block';
        }
    }
}

menu_open.addEventListener('click', toggleMenu);
menu_close.addEventListener('click', toggleMenu);

// Optionally, reset navbar display on resize
window.addEventListener('resize', () => {
      
    if (window.innerWidth > 767) {
        navbar.style.display = 'flex';
        menu_open.style.display = 'none';
        menu_close.style.display = 'none';
    } else {
        navbar.style.display = 'none';
        menu_open.style.display = 'block';
    }
});     // ****************END****************

// **************** Form Validation****************
    document.addEventListener('DOMContentLoaded',function(){
    document.querySelector('#contactForm').addEventListener('submit',function(event){
    event.preventDefault();
   
    // Gather form data
    let fullName = document.getElementById('fullName').value.trim();
    let email = document.getElementById('email').value.trim();
    let mobileNumber = document.getElementById('mobileNumber').value.trim();
    let emailSubject = document.getElementById('emailSubject').value.trim();
    let message = document.getElementById('message').value.trim();
   
    // Validate form data
    if (fullName === '' || email === '' || mobileNumber === '' || emailSubject === '' || message === '') {
        formMessage.innerHTML = 'Please fill out all fields.';
        formMessage.classList.add('error-message');
        formMessage.classList.remove('hidden');
        return;
    }
    if (!validateEmail(email)) {
        formMessage.innerHTML = 'Please enter a valid email address.';
        formMessage.classList.add('error-message');
        formMessage.classList.remove('hidden');
        return;
    }
    if (!validatePhoneNumber(mobileNumber)) {
        formMessage.innerHTML = 'Please enter a valid 10 digit mobile number.';
        formMessage.classList.add('error-message');
        formMessage.classList.remove('hidden');
        return;
    }
    // If validation passes
    formMessage.innerHTML = 'Sent successfully!';
    formMessage.classList.add('success-message');
    formMessage.classList.remove('hidden');
        // Clear previous messages
    if(formMessage.innerHTML === 'Sent successfully!'){
        document.getElementById('fullName').value ='';
        document.getElementById('email').value = '';
        document.getElementById('mobileNumber').value = '';
        document.getElementById('emailSubject').value= '';
        document.getElementById('message').value = '';    
        formMessage.classList.add('success-message');
        formMessage.classList.remove('hidden');
    }

        })
    })
 
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
// Regex to match South africa's phone number format
function validatePhoneNumber(phone) {
    const phonePattern = /^0\d{9}$/; 
    return phonePattern.test(phone);
}

// ****************END***************

// ****************Button back****************
function goBack() {
    window.history.back();
}
// ****************END****************
