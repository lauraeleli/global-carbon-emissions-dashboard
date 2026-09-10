// CO₂-Daten: Filtern und Sortieren

const landFilter = document.getElementById("landFilter");
const unternehmenFilter = document.getElementById("unternehmenFilter");
const sortLand = document.getElementById("sortLand");
const sortUnternehmen = document.getElementById("sortUnternehmen");
const tbody = document.querySelector("#co2Table tbody");

let landAufsteigend = true;
let unternehmenAufsteigend = true;

if (landFilter && unternehmenFilter && tbody) {

    const zeilen = document.querySelectorAll("#co2Table tbody tr");

    landFilter.addEventListener("change", filterTabelle);
    unternehmenFilter.addEventListener("change", filterTabelle);

    function filterTabelle() {

        const land = landFilter.value;
        const unternehmen = unternehmenFilter.value;

        zeilen.forEach(function (zeile) {

            const landName = zeile.cells[0].textContent;
            const unternehmenName = zeile.cells[1].textContent;

            const landPasst =
                land === "" || landName === land;

            const unternehmenPasst =
                unternehmen === "" || unternehmenName === unternehmen;

            zeile.style.display =
                (landPasst && unternehmenPasst) ? "" : "none";

        });

    }

    if (sortLand) {

        sortLand.addEventListener("click", function () {

            const zeilen = Array.from(tbody.querySelectorAll("tr"));

            zeilen.sort(function (a, b) {

                return landAufsteigend
                    ? a.cells[0].textContent.localeCompare(b.cells[0].textContent)
                    : b.cells[0].textContent.localeCompare(a.cells[0].textContent);

            });

            zeilen.forEach(function (zeile) {
                tbody.appendChild(zeile);
            });

            landAufsteigend = !landAufsteigend;

        });

    }

    if (sortUnternehmen) {

        sortUnternehmen.addEventListener("click", function () {

            const zeilen = Array.from(tbody.querySelectorAll("tr"));

            zeilen.sort(function (a, b) {

                return unternehmenAufsteigend
                    ? a.cells[1].textContent.localeCompare(b.cells[1].textContent)
                    : b.cells[1].textContent.localeCompare(a.cells[1].textContent);

            });

            zeilen.forEach(function (zeile) {
                tbody.appendChild(zeile);
            });

            unternehmenAufsteigend = !unternehmenAufsteigend;

        });

    }

}


// Für rechts-nach-links geschriebene Sprachen wird das lokale Menü automatisch auf die linke Seite verschoben.

const rtlSprachen = /^(ar|fa|he|ur|ps|dv|ku|yi)(-|$)/i;
const browserSprache = navigator.language || navigator.userLanguage || "de-DE";
const istRTL = rtlSprachen.test(browserSprache);

document.documentElement.dir = istRTL ? "rtl" : "ltr";

// Absicherung des Kontaktformulars

const formular = document.getElementById("kontaktFormular");

// Prüft, ob eine Eingabe HTML-Tags enthält.
function enthaeltHTML(eingabe) {
    return /<[^>]*>/i.test(eingabe);
}

// Escaping von HTML-Zeichen, um XSS-Angriffe zu verhindern.
function escapeHTML(eingabe) {
    return eingabe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

if (formular) {

    formular.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const nachricht = document.getElementById("nachricht").value.trim();

        // Zusätzliche Längenprüfung per JavaScript.
        if (name.length > 50 || nachricht.length > 500) {
            alert("Die Eingabe überschreitet die zulässige Länge.");
            return;
        }

        // Schutz vor der Eingabe von HTML-Tags
        if (
            enthaeltHTML(name) ||
            enthaeltHTML(email) ||
            enthaeltHTML(nachricht)
        ) {
            alert("Die Eingabe enthält unzulässige HTML-Zeichen.");
            return;
        }

    
        const sichererName = escapeHTML(name);
        const sichereEmail = escapeHTML(email);
        const sichereNachricht = escapeHTML(nachricht);

        // Variablen werden bewusst nur als Text verarbeitet und nicht mit innerHTML in die Seite geschrieben
        void sichererName;
        void sichereEmail;
        void sichereNachricht;

        alert("Nachricht erfolgreich geprüft. (Demoversion – es wird nichts versendet.)");

        formular.reset();

    });

}


// Eigenes Seitenmenü

const menuButton = document.getElementById("menuButton");
const closeButton = document.getElementById("closeMenu");
const menu = document.getElementById("seitenMenue");
const overlay = document.getElementById("overlay");

if (menuButton && menu && overlay) {

    menuButton.addEventListener("click", function () {

        menu.classList.add("aktiv");
        overlay.classList.add("aktiv");
        menuButton.setAttribute("aria-expanded", "true");

    });

}

if (closeButton) {

    closeButton.addEventListener("click", schliesseMenue);

}

if (overlay) {

    overlay.addEventListener("click", schliesseMenue);

}

const lokaleLinks = document.querySelectorAll("#seitenMenue a");

lokaleLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        schliesseMenue();

    });

});

function schliesseMenue() {

    if (menu) {
        menu.classList.remove("aktiv");
    }

    if (overlay) {
        overlay.classList.remove("aktiv");
    }

    if (menuButton) {
        menuButton.setAttribute("aria-expanded", "false");
    }

}
