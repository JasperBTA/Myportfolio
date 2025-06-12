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

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Pobierz dane z formularza
            const contactForm = document.getElementById('contactForm');
    const showMessagesBtn = document.getElementById('showMessagesBtn');
    const clearMessagesBtn = document.getElementById('clearMessagesBtn');
    const messagesTableDiv = document.getElementById('messagesTable');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Pobierz dane z formularza
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            const topic = document.getElementById('topic').value;
            const contactType = document.querySelector('input[name="contactType"]:checked')?.value || '';
            const agreement = document.getElementById('agreement').checked;

            // Prosta walidacja
            if (!name || !email || !phone || !message || !topic || !contactType || !agreement) {
                alert('Wypełnij wszystkie pola formularza i zaakceptuj politykę prywatności!');
                return;
            }

            // Pobierz istniejące wiadomości lub utwórz nową tablicę
            let messages = [];
            if (localStorage.getItem('contactMessages')) {
                messages = JSON.parse(localStorage.getItem('contactMessages'));
            }

            // Dodaj nową wiadomość z wszystkimi polami
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

            // Zapisz do localStorage
            localStorage.setItem('contactMessages', JSON.stringify(messages));

            // Wyczyść formularz i pokaż komunikat
            contactForm.reset();
            alert('Wiadomość została zapisana lokalnie!');
        });
    }

    // Wyświetlanie wiadomości w tabeli
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
            let table = `<table class="table table-bordered"><thead>
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
            table += "</tbody></table>";
            messagesTableDiv.innerHTML = table;
        });
    }

    // Usuwanie wszystkich wiadomości
    if (clearMessagesBtn && messagesTableDiv) {
        clearMessagesBtn.addEventListener('click', function () {
            localStorage.removeItem('contactMessages');
            messagesTableDiv.innerHTML = "<p>Wszystkie wiadomości zostały usunięte.</p>";
        });
    }
            // (Opcjonalnie) Możesz też wywołać tu kod do wysyłki na serwer, jeśli chcesz
        });
    }

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
    };

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

});
