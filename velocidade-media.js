    const txtDistancia = document.querySelector('input[type="number"]#distancia');
const txtTempo     = document.querySelector('input[type="number"]#tempo');
const txtResultado = document.querySelector('input[type="text"]#resultado');
const txtAlerta    = document.querySelector('span#alerta');

function getValue({ element, name, message, shouldAlert }) {
    const value = element.value;
    const alertEl = document.querySelector(`#alerta-${element.id}`);
   
    // Valor encontrado
    if ((value != 0) && (!element.required || value)) {
        if (alertEl) alertEl.textContent = "";
        return value;
    } else {
        alerta({ element, name, message, shouldAlert });
    }
}

function alerta({ element, name, message, shouldAlert }) {
    if (message) {
        mostrarAlerta({ message, element, shouldAlert });
        return;
    }

    if (!name) {
        const label = document.querySelector(`label[for="${element.id}"]`);

        if (label) name = label.textContent.replace(/:$/, "").toLowerCase();
    }

    if (name && element.value === '0') {
        message = `O campo ${name} não pode ser zero.`;
    } else {
        message = name ? // poderia usar ??= para atribuição
            `O campo ${name} não pode estar vazio!` :
            "Preencha todos os campos obrigatórios!";
    }

    mostrarAlerta({ message, element, shouldAlert });
}

function mostrarAlerta({ message, element, shouldAlert }) {
    console.log(message);

    if (shouldAlert) {
        alert(message);
    } else {
        const alertEl = document.querySelector(`#alerta-${element.id}`);
        alertEl.textContent = message;
    }
}


function velocidadeMedia(distancia, tempo) {
    return distancia / tempo;
}

function calcular() {
    const distancia = getValue({ element: txtDistancia }); // pode adicionar shouldAlert: true para usar alert()
    const tempo = getValue({ element: txtTempo });

    const resultado = velocidadeMedia(distancia, tempo);

    if (resultado != 0 && !resultado)
        return;

    if (resultado > 100) {
        txtAlerta.textContent = "Velocidade acima do permitido!";
        txtAlerta.style.color = "red";
    } else {
        txtAlerta.textContent = "";
        txtAlerta.style.color = "";
    }

    console.log("Calculado com sucesso.");
    txtResultado.value = `${resultado} km/h`;
}
