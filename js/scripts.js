/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }
    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Ładowanie sekcji przez Fetch API
    fetch('navbar.html')
        .then(res => res.text())
        .then(html => { document.getElementById('navbar').innerHTML = html; });

    fetch('masthead.html')
        .then(res => res.text())
        .then(html => { document.getElementById('masthead').innerHTML = html; });

    fetch('portfolio-content.html')
        .then(res => res.text())
        .then(html => { document.getElementById('portfolio').innerHTML = html; });

    fetch('about-content.html')
        .then(res => res.text())
        .then(html => { document.getElementById('about').innerHTML = html; });

    // Kontakt i obsługa formularza po załadowaniu
    fetch('contact-content.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('contact').innerHTML = html;

            // Obsługa formularza kontaktowego
            const contactForm = document.getElementById('contactForm');
            const showMessagesBtn = document.getElementById('showMessagesBtn');
            const clearMessagesBtn = document.getElementById('clearMessagesBtn');
            const messagesTableDiv = document.getElementById('messagesTable');

            if (contactForm) {
                contactForm.addEventListener('submit', function (e) {
                    e.preventDefault();

                    const name = document.getElementById('name').value.trim();
                    const email = document.getElementById('email').value.trim();
                    const phone = document.getElementById('phone').value.trim();
                    const message = document.getElementById('message').value.trim();
                    const topic = document.getElementById('topic').value;
                    const contactType = document.querySelector('input[name="contactType"]:checked')?.value || '';
                    const agreement = document.getElementById('agreement').checked;

                    if (!name || !email || !phone || !message || !topic || !contactType || !agreement) {
                        alert('Wypełnij wszystkie pola formularza i zaakceptuj politykę prywatności!');
                        return;
                    }

                    let messages = [];
                    if (localStorage.getItem('contactMessages')) {
                        messages = JSON.parse(localStorage.getItem('contactMessages'));
                    }

                    // Zapisz dane w formacie JSON (tablica obiektów)
                    messages.push({
                        name,
                        email,
                        phone,
                        message,
                        topic,
                        contactType,
                        agreement,
                        date: new Date().toISOString()
                    });

                    localStorage.setItem('contactMessages', JSON.stringify(messages));
                    contactForm.reset();
                    alert('Wiadomość została zapisana lokalnie w formacie JSON!');
                });
            }

            if (showMessagesBtn && messagesTableDiv) {
            showMessagesBtn.addEventListener('click', function () {
                let messages = [];
                if (localStorage.getItem('contactMessages')) {
                    messages = JSON.parse(localStorage.getItem('contactMessages'));
                }
                if (messages.length === 0) {
                    messagesTableDiv.innerHTML = "<p>Brak zapisanych wiadomości.</p>";
                    return;
                }
                let table = `<div class="d-flex justify-content-center"><table class="table table-bordered w-auto text-center align-middle"><thead>
                    <tr>
                        <th>Imię i Nazwisko</th>
                        <th>Email</th>
                        <th>Telefon</th>
                        <th>Temat</th>
                        <th>Preferowana forma kontaktu</th>
                        <th>Zgoda</th>
                        <th>Wiadomość</th>
                        <th>Data</th>
                    </tr>
                </thead><tbody>`;
                messages.forEach(msg => {
                    table += `<tr>
                        <td>${msg.name}</td>
                        <td>${msg.email}</td>
                        <td>${msg.phone}</td>
                        <td>${msg.topic}</td>
                        <td>${msg.contactType === 'email' ? 'Email' : 'Telefon'}</td>
                        <td>${msg.agreement ? 'Tak' : 'Nie'}</td>
                        <td>${msg.message}</td>
                        <td>${new Date(msg.date).toLocaleString()}</td>
                    </tr>`;
                });
                table += "</tbody></table></div>";
                messagesTableDiv.innerHTML = table;
            });
        }

            if (clearMessagesBtn && messagesTableDiv) {
                clearMessagesBtn.addEventListener('click', function () {
                    localStorage.removeItem('contactMessages');
                    messagesTableDiv.innerHTML = "<p>Wszystkie wiadomości zostały usunięte.</p>";
                });
            }
        });

    fetch('footer.html')
        .then(res => res.text())
        .then(html => { document.getElementById('footer').innerHTML = html; });
});