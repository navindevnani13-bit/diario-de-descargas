// Importamos solo lo que necesitamos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// CONFIGURACIÓN: Pega aquí la URL de tu Firebase
const firebaseConfig = {
  databaseURL: "https://diario-de-descargas-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Seleccionamos las tarjetas   
const tarjetas = document.querySelectorAll('.card');

tarjetas.forEach(tarjeta => {
    const nombre = tarjeta.getAttribute('data-user');
    const valorDisplay = tarjeta.querySelector('.valor');
    const btnAumentar = tarjeta.querySelector('.aumentar');
    const btnDisminuir = tarjeta.querySelector('.disminuir');
    const btnReset = tarjeta.querySelector('.resetear');

    // Referencia en la base de datos para este usuario
    const userRef = ref(db, 'contadores/' + nombre);

    // ESCUCHAR CAMBIOS: Cuando alguien pulse un botón, se actualiza en TODOS los móviles
    onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        valorDisplay.textContent = data !== null ? data : 0;
    });

    // FUNCIONES PARA ACTUALIZAR
    const cambiarValor = (delta) => {
        const valorActual = parseInt(valorDisplay.textContent);
        set(userRef, valorActual + delta);
    };

    btnAumentar.onclick = () => cambiarValor(1);
    btnDisminuir.onclick = () => cambiarValor(-1);
    btnReset.onclick = () => set(userRef, 0);
});