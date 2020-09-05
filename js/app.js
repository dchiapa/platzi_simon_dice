const celeste = document.querySelector("#celeste");
const violeta = document.querySelector("#violeta");
const naranja = document.querySelector("#naranja");
const verde = document.querySelector("#verde");
const btnEmpezar = document.querySelector("#btnEmpezar");
const ULTIMO_NIVEL = 10;

class Juego {
  constructor() {
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel(), 500);
  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this);
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.toggleBtnEmpezar();
    this.nivel = 1;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    };
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  siguienteNivel() {
    this.subNivel = 0;
    this.iluminarSecuencia();
    this.agregarEventos();
  }

  transformarNumeroColor(num) {
    switch (num) {
      case 0:
        return "celeste";
      case 1:
        return "violeta";
      case 2:
        return "naranja";
      case 3:
        return "verde";
    }
  }
  transformarColorNumero(color) {
    switch (color) {
      case "celeste":
        return 0;
      case "violeta":
        return 1;
      case "naranja":
        return 2;
      case "verde":
        return 3;
    }
  }
  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), i * 1000);
    }
  }
  iluminarColor(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => {
      this.colores[color].classList.remove("light");
    }, 350);
  }
  agregarEventos() {
    this.colores.celeste.addEventListener("click", this.elegirColor);
    this.colores.violeta.addEventListener("click", this.elegirColor);
    this.colores.naranja.addEventListener("click", this.elegirColor);
    this.colores.verde.addEventListener("click", this.elegirColor);
  }
  eliminarEventos() {
    this.colores.celeste.removeEventListener("click", this.elegirColor);
    this.colores.violeta.removeEventListener("click", this.elegirColor);
    this.colores.naranja.removeEventListener("click", this.elegirColor);
    this.colores.verde.removeEventListener("click", this.elegirColor);
  }
  elegirColor(e) {
    const color = e.target.dataset.color;
    const numero = this.transformarColorNumero(color);
    this.iluminarColor(color);
    if (numero === this.secuencia[this.subNivel]) {
      this.subNivel++;
      if (this.subNivel === this.nivel) {
        this.nivel++;
        this.eliminarEventos();
        if (this.nivel === ULTIMO_NIVEL + 1) {
          this.gano();
        } else {
          setTimeout(this.siguienteNivel, 1500);
        }
      }
    } else {
      this.perdio();
    }
  }
  gano() {
    setTimeout(() => {
      alert("Felicitaciones, ganaste!");
    }, 500);
  }
  perdio() {
    setTimeout(() => {
      alert("Lo sentimos, perdiste :(");
    }, 500);
  }
  toggleBtnEmpezar() {
    btnEmpezar.classList.toggle("hide");
  }
}

function empezarJuego() {
  window.juego = new Juego();
}
