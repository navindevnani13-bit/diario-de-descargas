import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Tu URL debe terminar en .firebaseio.com/
const firebaseConfig = {
  databaseURL: "https://diario-de-descargas-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const tarjetas = document.querySelectorAll('.card');

tarjetas.forEach(tarjeta => {
    const nombre = tarjeta.getAttribute('data-user');
    const valorDisplay = tarjeta.querySelector('.valor');
    const btnAumentar = tarjeta.querySelector('.aumentar');
    const btnDisminuir = tarjeta.querySelector('.disminuir');
    const btnReset = tarjeta.querySelector('.resetear');

    const userRef = ref(db, 'contadores/' + nombre);

    // Escuchar cambios de la nube
    onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        valorDisplay.textContent = data !== null ? data : 0;
    });

    // Actualizar en la nube
    const actualizar = (cambio) => {
        const valorActual = parseInt(valorDisplay.textContent) || 0;
        set(userRef, valorActual + cambio);
    };

    btnAumentar.onclick = () => actualizar(1);
    btnDisminuir.onclick = () => actualizar(-1);
    btnReset.onclick = () => set(userRef, 0);
});
