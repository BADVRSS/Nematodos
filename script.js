document.addEventListener("DOMContentLoaded", () => {
  const curiosidades = [
    "C. elegans fue el primer organismo multicelular en tener su genoma completamente secuenciado.",
    "Aproximadamente el 40% de los genes de C. elegans tienen homólogos en humanos.",
    "C. elegans puede sobrevivir al congelamiento y descongelamiento.",
    "Este nematodo tiene exactamente 959 células somáticas en su forma hermafrodita.",
    "C. elegans puede entrar en un estado de 'dauer' para sobrevivir condiciones adversas.",
    "El 99.9% de los individuos de C. elegans son hermafroditas.",
    "La esperanza de vida de C. elegans es de aproximadamente 2-3 semanas.",
    "C. elegans tiene un sistema nervioso con solo 302 neuronas.",
    "Estos nematodos pueden detectar y responder a más de 80 diferentes sustancias químicas.",
    "C. elegans fue enviado al espacio para estudiar los efectos de la microgravedad en los organismos.",
    "El linaje celular completo de C. elegans desde el huevo hasta el adulto está mapeado.",
    "C. elegans fue el primer animal en tener su conectoma (mapa de conexiones neuronales) completamente descrito.",
    "Algunos individuos de C. elegans pueden tener una vida útil de hasta 4 meses en condiciones de laboratorio especiales.",
    "C. elegans tiene la capacidad de regenerar algunas partes de su cuerpo, como la faringe.",
    "Este nematodo ha sido utilizado para estudiar los efectos de los medicamentos contra el cáncer y el envejecimiento.",
    "C. elegans puede producir más de 300 descendientes durante su vida reproductiva.",
    "El genoma de C. elegans contiene aproximadamente 20,000 genes.",
    "C. elegans fue el primer organismo en el que se descubrió el ARN de interferencia (RNAi).",
    "Los machos de C. elegans representan solo alrededor del 0.1% de la población en condiciones normales.",
    "C. elegans puede sobrevivir en ambientes con muy poco oxígeno.",
  ]

  const curiosidadesList = document.getElementById("curiosidades")

  curiosidades.forEach((curiosidad) => {
    const li = document.createElement("li")
    li.textContent = curiosidad
    curiosidadesList.appendChild(li)
  })

  // Manejo de secciones
  const sections = document.querySelectorAll("main > section")
  const navLinks = document.querySelectorAll("nav a")

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href").slice(1)
      sections.forEach((section) => {
        section.classList.remove("active")
      })
      document.getElementById(targetId).classList.add("active")
      if (window.innerWidth < 768) {
        document.getElementById("main-nav").classList.remove("active")
        document.getElementById("menu-toggle").classList.remove("active")
      }
    })
  })

  // Manejo del menú hamburguesa
  const menuToggle = document.getElementById("menu-toggle")
  const mainNav = document.getElementById("main-nav")

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active")
    mainNav.classList.toggle("active")
  })

  // Cerrar menú al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
      mainNav.classList.remove("active")
      menuToggle.classList.remove("active")
    }
  })

  // Cambio de tema con animación
  const themeToggle = document.getElementById("theme-toggle")
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")
    if (document.body.classList.contains("dark-mode")) {
      themeToggle.textContent = "🌞"
    } else {
      themeToggle.textContent = "🌓"
    }
  })

  // Clase Nematode mejorada
  class Nematode {
    constructor(canvas, ctx) {
      this.canvas = canvas
      this.ctx = ctx
      this.segments = 100
      this.segmentLength = 3
      this.thickness = 5
      this.points = []
      this.angle = 0
      this.angleSpeed = 0.02
      this.speed = 0.5
      this.turnSpeed = 0.01
      this.targetX = canvas.width / 2
      this.targetY = canvas.height / 2

      // Inicializar puntos
      for (let i = 0; i < this.segments; i++) {
        this.points.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          angle: 0,
        })
      }
    }

    update(behavior = "normal") {
      // Actualizar ángulo de la cabeza
      this.angle += Math.sin(Date.now() * 0.001) * this.angleSpeed

      // Mover la cabeza
      const head = this.points[0]
      head.x += Math.cos(this.angle) * this.speed
      head.y += Math.sin(this.angle) * this.speed

      // Mantener el nematodo en la pantalla
      if (head.x < 0) head.x = this.canvas.width
      if (head.x > this.canvas.width) head.x = 0
      if (head.y < 0) head.y = this.canvas.height
      if (head.y > this.canvas.height) head.y = 0

      // Aplicar comportamiento específico
      const behaviors = {
        etanol: { speed: 0.2, angleSpeed: 0.05, turnSpeed: 0.005, thickness: 5 },
        cafeina: { speed: 1, angleSpeed: 0.03, turnSpeed: 0.02, thickness: 5 },
        nicotina: { speed: 0.7, angleSpeed: 0.04, turnSpeed: 0.015, thickness: 5 },
        antidepresivos: { speed: 0.6, angleSpeed: 0.02, turnSpeed: 0.005, thickness: 5 },
        "metales-pesados": { speed: 0.3, angleSpeed: 0.01, turnSpeed: 0.005, thickness: 4 },
        antioxidantes: { speed: 0.8, angleSpeed: 0.02, turnSpeed: 0.015, thickness: 6 },
        cannabinoides: { speed: 0.4, angleSpeed: 0.04, turnSpeed: 0.01, thickness: 5 },
        antibioticos: { speed: 0.5, angleSpeed: 0.02, turnSpeed: 0.01, thickness: 5 },
        estatinas: { speed: 0.6, angleSpeed: 0.02, turnSpeed: 0.015, thickness: 5 },
        aspirina: { speed: 0.7, angleSpeed: 0.025, turnSpeed: 0.012, thickness: 5 },
        ibuprofeno: { speed: 0.65, angleSpeed: 0.03, turnSpeed: 0.011, thickness: 5 },
        paracetamol: { speed: 0.55, angleSpeed: 0.015, turnSpeed: 0.009, thickness: 5 },
        vitamina_c: { speed: 0.9, angleSpeed: 0.03, turnSpeed: 0.02, thickness: 6 },
        omega3: { speed: 0.75, angleSpeed: 0.025, turnSpeed: 0.018, thickness: 5.5 },
        probioticos: { speed: 0.85, angleSpeed: 0.035, turnSpeed: 0.022, thickness: 5.5 },
        melatonina: { speed: 0.4, angleSpeed: 0.01, turnSpeed: 0.005, thickness: 5 },
        cafeina: { speed: 1.2, angleSpeed: 0.04, turnSpeed: 0.025, thickness: 5 },
        alcohol: { speed: 0.3, angleSpeed: 0.06, turnSpeed: 0.003, thickness: 4.5 },
        nicotina: { speed: 0.8, angleSpeed: 0.05, turnSpeed: 0.02, thickness: 4.5 },
        thc: { speed: 0.5, angleSpeed: 0.07, turnSpeed: 0.008, thickness: 5 },
        cocaina: { speed: 1.5, angleSpeed: 0.08, turnSpeed: 0.03, thickness: 4 },
        heroina: { speed: 0.2, angleSpeed: 0.01, turnSpeed: 0.002, thickness: 4 },
        metanfetamina: { speed: 2, angleSpeed: 0.1, turnSpeed: 0.04, thickness: 3.5 },
        lsd: { speed: 1, angleSpeed: 0.09, turnSpeed: 0.035, thickness: 5.5 },
        mdma: { speed: 1.3, angleSpeed: 0.06, turnSpeed: 0.028, thickness: 5 },
        ketamina: { speed: 0.4, angleSpeed: 0.02, turnSpeed: 0.004, thickness: 4.5 },
        normal: { speed: 0.5, angleSpeed: 0.02, turnSpeed: 0.01, thickness: 5 },
      }

      const currentBehavior = behaviors[behavior] || behaviors.normal
      this.speed = currentBehavior.speed
      this.angleSpeed = currentBehavior.angleSpeed
      this.turnSpeed = currentBehavior.turnSpeed
      this.thickness = currentBehavior.thickness

      if (behavior === "nicotina" && Math.random() < 0.01) this.speed = 0 // Parálisis ocasional
      if (behavior === "antibioticos") this.segments = 80 // Reducción del tamaño

      // Girar hacia el objetivo
      const dx = this.targetX - head.x
      const dy = this.targetY - head.y
      const targetAngle = Math.atan2(dy, dx)
      const angleDiff = targetAngle - this.angle
      this.angle += Math.sin(angleDiff) * this.turnSpeed

      // Actualizar el resto del cuerpo
      for (let i = 1; i < this.segments; i++) {
        const prev = this.points[i - 1]
        const current = this.points[i]
        const dx = prev.x - current.x
        const dy = prev.y - current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance > this.segmentLength) {
          const ratio = this.segmentLength / distance
          current.x = prev.x - dx * ratio
          current.y = prev.y - dy * ratio
        }
      }
    }

    draw() {
      this.ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue("--text-color")
      this.ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--text-color")
      this.ctx.lineWidth = this.thickness
      this.ctx.lineCap = "round"
      this.ctx.lineJoin = "round"

      // Dibujar el cuerpo
      this.ctx.beginPath()
      this.ctx.moveTo(this.points[0].x, this.points[0].y)
      for (let i = 1; i < this.segments; i++) {
        const point = this.points[i]
        this.ctx.lineTo(point.x, point.y)
      }
      this.ctx.stroke()

      // Dibujar la cabeza
      this.ctx.beginPath()
      this.ctx.arc(this.points[0].x, this.points[0].y, this.thickness * 1.5, 0, Math.PI * 2)
      this.ctx.fill()

      // Dibujar la cola
      this.ctx.beginPath()
      this.ctx.arc(
        this.points[this.segments - 1].x,
        this.points[this.segments - 1].y,
        this.thickness * 0.8,
        0,
        Math.PI * 2,
      )
      this.ctx.fill()
    }

    reset() {
      this.points = []
      for (let i = 0; i < this.segments; i++) {
        this.points.push({
          x: this.canvas.width / 2,
          y: this.canvas.height / 2,
          angle: 0,
        })
      }
      this.angle = 0
    }
  }

  // Inicialización y animación del nematodo principal
  const canvas = document.getElementById("nematodo-canvas")
  const ctx = canvas.getContext("2d")

  function resizeCanvas(canvas) {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }

  resizeCanvas(canvas)
  window.addEventListener("resize", () => resizeCanvas(canvas))

  const nematode = new Nematode(canvas, ctx)

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    nematode.update()
    nematode.draw()
    requestAnimationFrame(animate)
  }

  animate()

  // Interactividad del nematodo principal
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect()
    nematode.targetX = e.clientX - rect.left
    nematode.targetY = e.clientY - rect.top
  })

  canvas.addEventListener("click", () => {
    // Aumentar temporalmente la velocidad del nematodo al hacer clic
    const originalSpeed = nematode.speed
    nematode.speed = 2
    setTimeout(() => {
      nematode.speed = originalSpeed
    }, 1000)
  })

  // Manejo de la sección de efectos de sustancias
  const substanceButtons = document.querySelectorAll(".substance-btn")
  const substanceName = document.getElementById("substance-name")
  const substanceEffect = document.getElementById("substance-effect")
  const substanceDetails = document.getElementById("substance-details")

  const substanceInfo = {
    etanol: {
      name: "Etanol",
      effect:
        "El etanol tiene efectos significativos en el comportamiento y la fisiología de C. elegans, similares a los observados en organismos superiores.",
      details: [
        "Reduce la velocidad de locomoción y altera los patrones de movimiento",
        "Afecta la coordinación neuromuscular",
        "Altera los patrones de alimentación y bombeo faríngeo",
        "Impacta negativamente en la fertilidad y el desarrollo embrionario",
        "Induce cambios en la expresión génica relacionada con el estrés y el metabolismo",
      ],
      mechanism:
        "El etanol actúa principalmente sobre los receptores de neurotransmisores, como GABA y glutamato, alterando la señalización neuronal. También afecta la fluidez de las membranas celulares, lo que puede alterar la función de proteínas de membrana.",
      implications:
        "El estudio de los efectos del etanol en C. elegans proporciona insights valiosos sobre los mecanismos moleculares de la adicción al alcohol y la tolerancia. Además, permite investigar estrategias para mitigar los efectos negativos del consumo de alcohol.",
      ethics:
        "Aunque C. elegans es un organismo simple, la investigación con etanol plantea consideraciones éticas sobre el uso de sustancias que alteran el comportamiento en estudios científicos. Es crucial equilibrar el valor de la investigación con el bienestar del organismo.",
    },
    cafeina: {
      name: "Cafeína",
      effect:
        "La cafeína produce un aumento notable en la actividad locomotora de C. elegans y puede influir en varios aspectos de su fisiología y desarrollo.",
      details: [
        "Incrementa significativamente la velocidad y frecuencia de movimiento",
        "Puede alterar los patrones de descanso y actividad, similar a los efectos en el sueño en mamíferos",
        "A dosis altas, puede afectar negativamente el desarrollo de las larvas",
        "Modifica la respuesta a otros estímulos ambientales",
        "Aumenta la resistencia al estrés oxidativo",
      ],
      mechanism:
        "La cafeína actúa principalmente como un antagonista de los receptores de adenosina, lo que lleva a un aumento en la actividad neuronal. También puede influir en la liberación de calcio intracelular y la actividad de ciertas enzimas.",
      implications:
        "El estudio de los efectos de la cafeína en C. elegans proporciona información valiosa sobre los mecanismos de acción de los estimulantes y su impacto en el comportamiento y la fisiología. Esto puede tener implicaciones para la comprensión de los efectos de la cafeína en organismos más complejos, incluidos los humanos.",
      ethics:
        "Aunque la cafeína es generalmente considerada segura, su uso en investigación con C. elegans plantea preguntas sobre los efectos a largo plazo de la exposición a estimulantes y cómo esto podría aplicarse a otros contextos biológicos.",
    },
    nicotina: {
      name: "Nicotina",
      effect:
        "La nicotina ejerce efectos complejos en C. elegans, que van desde la estimulación locomotora a la parálisis, dependiendo de la concentración y la duración de la exposición.",
      details: [
        "A bajas concentraciones, estimula la locomoción y la actividad neuronal",
        "A altas concentraciones, causa parálisis muscular y letargia",
        "Afecta el desarrollo embrionario y la fertilidad",
        "Altera la expresión de genes relacionados con la neurotransmisión y el estrés",
        "Modifica la respuesta a otros estímulos químicos y ambientales",
      ],
      mechanism:
        "La nicotina actúa principalmente como un agonista de los receptores nicotínicos de acetilcolina, lo que lleva a la despolarización de las neuronas y la contracción muscular. A altas concentraciones, puede causar una despolarización sostenida y la parálisis.",
      implications:
        "El estudio de los efectos de la nicotina en C. elegans proporciona un modelo útil para investigar los mecanismos de adicción a la nicotina y los efectos de la exposición crónica al tabaco. También permite el estudio de los efectos de la nicotina en el desarrollo y la reproducción.",
      ethics:
        "El uso de nicotina en la investigación con C. elegans plantea consideraciones éticas similares a las del etanol, ya que se trata de una sustancia con efectos conocidos sobre el comportamiento y la fisiología. Es importante minimizar la exposición innecesaria y considerar el bienestar del organismo.",
    },
    antidepresivos: {
      name: "Antidepresivos",
      effect:
        "Los antidepresivos, particularmente los inhibidores selectivos de la recaptación de serotonina (ISRS), muestran efectos diversos en C. elegans, afectando su comportamiento, desarrollo y longevidad.",
      details: [
        "Modifican los niveles de serotonina y otros neurotransmisores",
        "Afectan el comportamiento locomotor y la respuesta al estrés",
        "Pueden alterar la reproducción y el desarrollo embrionario",
        "Influyen en la expresión de genes relacionados con el envejecimiento y la neuroprotección",
        "Algunos antidepresivos muestran efectos en la longevidad, extendiéndola o reduciéndola dependiendo del compuesto y la dosis",
      ],
      mechanism:
        "Los ISRS actúan principalmente inhibiendo la recaptación de serotonina en las sinapsis, lo que aumenta la disponibilidad de serotonina en el espacio sináptico. Esto puede afectar la señalización serotoninérgica y modular la actividad neuronal.",
      implications:
        "El estudio de los efectos de los antidepresivos en C. elegans proporciona un modelo para investigar los mecanismos de acción de estos fármacos y su impacto en el comportamiento y la fisiología. Esto puede ayudar a desarrollar nuevos tratamientos para la depresión y otros trastornos mentales.",
      ethics:
        "El uso de antidepresivos en la investigación con C. elegans plantea consideraciones éticas sobre el uso de fármacos en organismos modelo. Es importante utilizar las dosis más bajas posibles y considerar el bienestar del organismo.",
    },
    "metales-pesados": {
      name: "Metales Pesados",
      effect:
        "Los metales pesados, como el cadmio y el plomo, son altamente tóxicos para C. elegans, causando estrés oxidativo, daño celular y muerte.",
      details: [
        "Inducen estrés oxidativo y daño a las proteínas y el ADN",
        "Reducen la longevidad y afectan el desarrollo",
        "Afectan la función neuronal y la locomoción",
        "Alteran la expresión de genes relacionados con la desintoxicación y la respuesta al estrés",
        "Pueden causar muerte celular y apoptosis",
      ],
      mechanism:
        "Los metales pesados interactúan con diversas moléculas celulares, incluyendo proteínas y ácidos nucleicos, alterando su función y causando daño celular. También pueden generar especies reactivas de oxígeno (ERO), que contribuyen al estrés oxidativo.",
      implications:
        "El estudio de los efectos de los metales pesados en C. elegans proporciona un modelo para investigar los mecanismos de toxicidad de estos contaminantes y desarrollar estrategias para la bioremediación y la protección contra la contaminación ambiental.",
      ethics:
        "El uso de metales pesados en la investigación con C. elegans plantea consideraciones éticas sobre la exposición de organismos a sustancias tóxicas. Es importante minimizar la exposición y manejar los residuos de manera responsable.",
    },
    antioxidantes: {
      name: "Antioxidantes",
      effect:
        "Los antioxidantes, como la vitamina C y el glutatión, protegen a C. elegans del estrés oxidativo, mejorando su salud y longevidad.",
      details: [
        "Reducen el estrés oxidativo y el daño celular",
        "Aumentan la longevidad y la resistencia al estrés",
        "Mejoran la función neuronal y la locomoción",
        "Modulan la expresión de genes relacionados con el envejecimiento y la respuesta al estrés",
        "Pueden proteger contra enfermedades neurodegenerativas",
      ],
      mechanism:
        "Los antioxidantes neutralizan las especies reactivas de oxígeno (ERO), previniendo el daño oxidativo a las moléculas celulares. También pueden activar vías de señalización que promueven la reparación del ADN y la supervivencia celular.",
      implications:
        "El estudio de los efectos de los antioxidantes en C. elegans proporciona un modelo para investigar los mecanismos de acción de estos compuestos y su potencial para el tratamiento de enfermedades relacionadas con el envejecimiento y el estrés oxidativo.",
      ethics:
        "El uso de antioxidantes en la investigación con C. elegans generalmente se considera ético, ya que estos compuestos son generalmente seguros y beneficiosos para la salud.",
    },
    cannabinoides: {
      name: "Cannabinoides",
      effect:
        "Los cannabinoides, como el THC y el CBD, muestran efectos diversos en C. elegans, afectando su comportamiento, desarrollo y longevidad.",
      details: [
        "Alteran los patrones de movimiento y la respuesta a estímulos sensoriales",
        "Pueden modificar el comportamiento alimentario y la ingesta de nutrientes",
        "Afectan la respuesta al estrés y la resistencia a patógenos",
        "Algunos cannabinoides muestran efectos en la longevidad, extendiéndola o reduciéndola dependiendo del compuesto y la dosis",
        "Influyen en la expresión de genes relacionados con la neurotransmisión y el metabolismo",
      ],
      mechanism:
        "Los cannabinoides actúan principalmente sobre los receptores cannabinoides, que están presentes en C. elegans y otros organismos. Estos receptores modulan la actividad neuronal y la señalización celular, lo que puede afectar diversos aspectos de la fisiología y el comportamiento.",
      implications:
        "El estudio de los efectos de los cannabinoides en C. elegans proporciona un modelo para investigar los mecanismos de acción de estos compuestos y su potencial terapéutico en diversas enfermedades.",
      ethics:
        "El uso de cannabinoides en la investigación con C. elegans plantea consideraciones éticas sobre el uso de sustancias con efectos psicoactivos. Es importante utilizar las dosis más bajas posibles y considerar el bienestar del organismo.",
    },
    antibioticos: {
      name: "Antibióticos",
      effect:
        "Los antibióticos afectan a C. elegans principalmente a través de su interacción con la microbiota intestinal del nematodo.",
      details: [
        "Alteran la composición y la función de la microbiota intestinal",
        "Pueden afectar el crecimiento, el desarrollo y la longevidad",
        "Influyen en la respuesta inmune y la resistencia a patógenos",
        "Algunos antibióticos pueden tener efectos directos sobre la fisiología de C. elegans",
        "Pueden modificar la expresión de genes relacionados con el metabolismo y la inmunidad",
      ],
      mechanism:
        "Los antibióticos actúan inhibiendo el crecimiento o matando bacterias, lo que puede alterar el equilibrio de la microbiota intestinal y afectar la salud del nematodo. Algunos antibióticos también pueden tener efectos directos sobre las células de C. elegans.",
      implications:
        "El estudio de los efectos de los antibióticos en C. elegans proporciona un modelo para investigar la interacción entre la microbiota intestinal y la salud del huésped. Esto puede ayudar a desarrollar nuevas estrategias para el tratamiento de infecciones y la modulación de la microbiota.",
      ethics:
        "El uso de antibióticos en la investigación con C. elegans plantea consideraciones éticas sobre el uso de fármacos y la resistencia a los antibióticos. Es importante utilizar las dosis más bajas posibles y considerar el impacto ambiental.",
    },
    estatinas: {
      name: "Estatinas",
      effect:
        "Las estatinas, inhibidores de la HMG-CoA reductasa, muestran efectos pleiotrópicos en C. elegans, afectando su metabolismo lipídico, longevidad y resistencia al estrés.",
      details: [
        "Reducen los niveles de colesterol y otros lípidos",
        "Aumentan la longevidad y la resistencia al estrés oxidativo",
        "Mejoran la función neuronal y la locomoción",
        "Modulan la expresión de genes relacionados con el metabolismo lipídico y el envejecimiento",
        "Pueden tener efectos en la reproducción y el desarrollo",
      ],
      mechanism:
        "Las estatinas inhiben la HMG-CoA reductasa, una enzima clave en la síntesis de colesterol. Esta inhibición reduce los niveles de colesterol y otros isoprenoides, lo que puede tener efectos pleiotrópicos en diversas vías metabólicas.",
      implications:
        "El estudio de los efectos de las estatinas en C. elegans proporciona un modelo para investigar los mecanismos de acción de estos fármacos y su potencial para el tratamiento de enfermedades cardiovasculares y otras enfermedades relacionadas con el envejecimiento.",
      ethics:
        "El uso de estatinas en la investigación con C. elegans generalmente se considera ético, ya que estos fármacos son ampliamente utilizados y generalmente seguros.",
    },
    aspirina: {
      name: "Aspirina",
      effect:
        "La aspirina, un fármaco antiinflamatorio no esteroideo (AINE), muestra efectos beneficiosos en C. elegans, mejorando su longevidad y resistencia al estrés.",
      details: [
        "Reduce la inflamación y el daño celular",
        "Aumenta la longevidad y la resistencia al estrés oxidativo",
        "Mejora la función neuronal y la locomoción",
        "Modula la expresión de genes relacionados con la inflamación y el envejecimiento",
        "Puede tener efectos en la reproducción y el desarrollo",
      ],
      mechanism:
        "La aspirina inhibe la ciclooxigenasa (COX), una enzima clave en la síntesis de prostaglandinas, mediadores de la inflamación. Esta inhibición reduce la inflamación y el daño celular, lo que puede tener efectos beneficiosos en la salud y la longevidad.",
      implications:
        "El estudio de los efectos de la aspirina en C. elegans proporciona un modelo para investigar los mecanismos de acción de este fármaco y su potencial para el tratamiento de enfermedades inflamatorias y otras enfermedades relacionadas con el envejecimiento.",
      ethics:
        "El uso de aspirina en la investigación con C. elegans generalmente se considera ético, ya que este fármaco es ampliamente utilizado y generalmente seguro.",
    },
    ibuprofeno: {
      name: "Ibuprofeno",
      effect:
        "El ibuprofeno, otro AINE, muestra efectos similares a la aspirina en C. elegans, mejorando su longevidad y resistencia al estrés.",
      details: [
        "Reduce la inflamación y el daño celular",
        "Aumenta la longevidad y la resistencia al estrés oxidativo",
        "Mejora la función neuronal y la locomoción",
        "Modula la expresión de genes relacionados con la inflamación y el envejecimiento",
        "Puede tener efectos en la reproducción y el desarrollo",
      ],
      mechanism:
        "El ibuprofeno, al igual que la aspirina, inhibe la COX, reduciendo la síntesis de prostaglandinas y la inflamación. Esto puede tener efectos beneficiosos en la salud y la longevidad.",
      implications:
        "El estudio de los efectos del ibuprofeno en C. elegans proporciona un modelo para investigar los mecanismos de acción de este fármaco y su potencial para el tratamiento de enfermedades inflamatorias y otras enfermedades relacionadas con el envejecimiento.",
      ethics:
        "El uso de ibuprofeno en la investigación con C. elegans generalmente se considera ético, ya que este fármaco es ampliamente utilizado y generalmente seguro.",
    },
    paracetamol: {
      name: "Paracetamol",
      effect:
        "El paracetamol, un analgésico y antipirético, muestra efectos menos pronunciados que otros AINEs en C. elegans, pero aún puede influir en su longevidad y resistencia al estrés.",
      details: [
        "Efectos moderados en la inflamación y el daño celular",
        "Puede aumentar ligeramente la longevidad y la resistencia al estrés oxidativo",
        "Efectos menos pronunciados en la función neuronal y la locomoción",
        "Modula la expresión de genes relacionados con el metabolismo y la respuesta al estrés",
        "Puede tener efectos en la reproducción y el desarrollo",
      ],
      mechanism:
        "El mecanismo de acción del paracetamol no está completamente dilucidado, pero se cree que implica la inhibición de la COX y otros mecanismos aún no completamente comprendidos.",
      implications:
        "El estudio de los efectos del paracetamol en C. elegans proporciona un modelo para investigar los mecanismos de acción de este fármaco y su potencial para el tratamiento de enfermedades relacionadas con el dolor y la fiebre.",
      ethics:
        "El uso de paracetamol en la investigación con C. elegans generalmente se considera ético, ya que este fármaco es ampliamente utilizado y generalmente seguro.",
    },
    vitamina_c: {
      name: "Vitamina C",
      effect:
        "La vitamina C, un potente antioxidante, protege a C. elegans del estrés oxidativo, mejorando su salud y longevidad.",
      details: [
        "Reduce el estrés oxidativo y el daño celular",
        "Aumenta la longevidad y la resistencia al estrés",
        "Mejora la función neuronal y la locomoción",
        "Modula la expresión de genes relacionados con el envejecimiento y la respuesta al estrés",
        "Puede proteger contra enfermedades neurodegenerativas",
      ],
      mechanism:
        "La vitamina C neutraliza las especies reactivas de oxígeno (ERO), previniendo el daño oxidativo a las moléculas celulares. También puede activar vías de señalización que promueven la reparación del ADN y la supervivencia celular.",
      implications:
        "El estudio de los efectos de la vitamina C en C. elegans proporciona un modelo para investigar los mecanismos de acción de este compuesto y su potencial para el tratamiento de enfermedades relacionadas con el envejecimiento y el estrés oxidativo.",
      ethics:
        "El uso de vitamina C en la investigación con C. elegans generalmente se considera ético, ya que este compuesto es generalmente seguro y beneficioso para la salud.",
    },
    omega3: {
      name: "Omega-3",
      effect:
        "Los ácidos grasos omega-3 muestran efectos beneficiosos en C. elegans, mejorando su longevidad y resistencia al estrés.",
      details: [
        "Reducen la inflamación y el daño celular",
        "Aumentan la longevidad y la resistencia al estrés oxidativo",
        "Mejoran la función neuronal y la locomoción",
        "Modulan la expresión de genes relacionados con el metabolismo lipídico y el envejecimiento",
        "Pueden tener efectos en la reproducción y el desarrollo",
      ],
      mechanism:
        "Los ácidos grasos omega-3 se integran en las membranas celulares, mejorando su fluidez y función. También pueden modular la señalización celular y la expresión génica, lo que puede tener efectos beneficiosos en la salud y la longevidad.",
      implications:
        "El estudio de los efectos de los ácidos grasos omega-3 en C. elegans proporciona un modelo para investigar los mecanismos de acción de estos compuestos y su potencial para el tratamiento de enfermedades cardiovasculares y otras enfermedades relacionadas con el envejecimiento.",
      ethics:
        "El uso de ácidos grasos omega-3 en la investigación con C. elegans generalmente se considera ético, ya que estos compuestos son generalmente seguros y beneficiosos para la salud.",
    },
    probioticos: {
      name: "Probióticos",
      effect:
        "Los probióticos, bacterias beneficiosas, modulan la microbiota intestinal de C. elegans, mejorando su salud y longevidad.",
      details: [
        "Mejoran la composición y la función de la microbiota intestinal",
        "Aumentan la longevidad y la resistencia al estrés",
        "Mejoran la función inmunológica",
        "Modulan la expresión de genes relacionados con el metabolismo y la inmunidad",
        "Pueden tener efectos en la reproducción y el desarrollo",
      ],
      mechanism:
        "Los probióticos interactúan con la microbiota intestinal de C. elegans, compitiendo con bacterias patógenas y produciendo metabolitos beneficiosos. Esto puede mejorar la salud del nematodo y aumentar su longevidad.",
      implications:
        "El estudio de los efectos de los probióticos en C. elegans proporciona un modelo para investigar la interacción entre la microbiota intestinal y la salud del huésped. Esto puede ayudar a desarrollar nuevas estrategias para el tratamiento de enfermedades relacionadas con el intestino.",
      ethics:
        "El uso de probióticos en la investigación con C. elegans generalmente se considera ético, ya que estos compuestos son generalmente seguros y beneficiosos para la salud.",
    },
    melatonina: {
      name: "Melatonina",
      effect:
        "La melatonina, una hormona relacionada con el ciclo circadiano, muestra efectos en la longevidad y la resistencia al estrés en C. elegans.",
      details: [
        "Regula los ritmos circadianos",
        "Aumenta la longevidad y la resistencia al estrés oxidativo",
        "Mejora la función neuronal y la locomoción",
        "Modula la expresión de genes relacionados con el envejecimiento y la respuesta al estrés",
        "Puede tener efectos en la reproducción y el desarrollo",
      ],
      mechanism:
        "La melatonina actúa como un antioxidante y un modulador de la señalización celular, lo que puede tener efectos beneficiosos en la salud y la longevidad.",
      implications:
        "El estudio de los efectos de la melatonina en C. elegans proporciona un modelo para investigar los mecanismos de acción de esta hormona y su potencial para el tratamiento de enfermedades relacionadas con el envejecimiento y el estrés.",
      ethics:
        "El uso de melatonina en la investigacióncon C. elegans generalmente se considera ético, ya que esta hormona es generalmente segura y se utiliza ampliamente en humanos.",
    },
    alcohol: {
      name: "Alcohol",
      effect:
        "El alcohol, principalmente etanol, tiene efectos significativos en el comportamiento y la fisiología de C. elegans, similares a los observados en organismos superiores.",
      details: [
        "Reduce la velocidad de locomoción y altera los patrones de movimiento",
        "Afecta la coordinación neuromuscular",
        "Altera los patrones de alimentación y bombeo faríngeo",
        "Impacta negativamente en la fertilidad y el desarrollo embrionario",
        "Induce cambios en la expresión génica relacionada con el estrés y el metabolismo",
      ],
      mechanism:
        "El etanol actúa principalmente sobre los receptores de neurotransmisores, como GABA y glutamato, alterando la señalización neuronal. También afecta la fluidez de las membranas celulares, lo que puede alterar la función de proteínas de membrana.",
      implications:
        "El estudio de los efectos del alcohol en C. elegans proporciona insights valiosos sobre los mecanismos moleculares de la adicción al alcohol y la tolerancia. Además, permite investigar estrategias para mitigar los efectos negativos del consumo de alcohol.",
      ethics:
        "Aunque C. elegans es un organismo simple, la investigación con alcohol plantea consideraciones éticas sobre el uso de sustancias que alteran el comportamiento en estudios científicos. Es crucial equilibrar el valor de la investigación con el bienestar del organismo.",
    },
    thc: {
      name: "THC",
      effect:
        "El THC, el principal componente psicoactivo del cannabis, muestra efectos diversos en C. elegans, afectando su comportamiento, desarrollo y longevidad.",
      details: [
        "Altera los patrones de movimiento y la respuesta a estímulos sensoriales",
        "Puede modificar el comportamiento alimentario y la ingesta de nutrientes",
        "Afecta la respuesta al estrés y la resistencia a patógenos",
        "Algunos cannabinoides muestran efectos en la longevidad, extendiéndola o reduciéndola dependiendo del compuesto y la dosis",
        "Influyen en la expresión de genes relacionados con la neurotransmisión y el metabolismo",
      ],
      mechanism:
        "El THC actúa principalmente sobre los receptores cannabinoides, que están presentes en C. elegans y otros organismos. Estos receptores modulan la actividad neuronal y la señalización celular, lo que puede afectar diversos aspectos de la fisiología y el comportamiento.",
      implications:
        "El estudio de los efectos del THC en C. elegans proporciona un modelo para investigar los mecanismos de acción de este compuesto y su potencial terapéutico en diversas enfermedades.",
      ethics:
        "El uso de THC en la investigación con C. elegans plantea consideraciones éticas sobre el uso de sustancias con efectos psicoactivos. Es importante utilizar las dosis más bajas posibles y considerar el bienestar del organismo.",
    },
    cocaina: {
      name: "Cocaína",
      effect:
        "La cocaína, un potente estimulante, aumenta drásticamente la actividad locomotora de C. elegans y puede tener efectos neurotóxicos.",
      details: [
        "Incrementa significativamente la velocidad y la frecuencia de movimiento",
        "Puede causar comportamientos estereotipados y erráticos",
        "Afecta la señalización dopaminérgica y otros neurotransmisores",
        "Potencial daño neuronal a altas dosis",
        "Altera los patrones de alimentación y sueño",
      ],
      mechanism:
        "La cocaína actúa principalmente bloqueando la recaptación de dopamina y otros neurotransmisores, lo que aumenta su concentración en la sinapsis y prolonga su efecto estimulante. A altas dosis, puede causar toxicidad neuronal.",
      implications:
        "El estudio de los efectos de la cocaína en C. elegans proporciona un modelo para investigar los mecanismos de acción de esta droga y su potencial neurotóxico. Esto puede ayudar a desarrollar estrategias para mitigar los efectos negativos del consumo de cocaína.",
      ethics:
        "El uso de cocaína en la investigación con C. elegans plantea consideraciones éticas sobre el uso de sustancias altamente adictivas y con potencial de abuso. Es crucial minimizar la exposición y manejar la sustancia con precaución.",
    },
    heroina: {
      name: "Heroína",
      effect:
        "La heroína, un opioide altamente adictivo, causa sedación y reduce la actividad locomotora en C. elegans.",
      details: [
        "Reduce significativamente la actividad motora",
        "Puede afectar el desarrollo embrionario y la fertilidad",
        "Altera la señalización de opioides y otros neurotransmisores",
        "Potencial impacto en la longevidad",
        "Modifica la respuesta al dolor y al estrés",
      ],
      mechanism:
        "La heroína actúa como un agonista de los receptores opioides, lo que lleva a la inhibición de la actividad neuronal y la sedación. A altas dosis, puede causar depresión respiratoria y muerte.",
      implications:
        "El estudio de los efectos de la heroína en C. elegans proporciona un modelo para investigar los mecanismos de acción de este opioide y su potencial adictivo. Esto puede ayudar a desarrollar estrategias para el tratamiento de la adicción a los opioides.",
      ethics:
        "El uso de heroína en la investigación con C. elegans plantea consideraciones éticas sobre el uso de sustancias altamente adictivas y con potencial de abuso. Es crucial minimizar la exposición y manejar la sustancia con extrema precaución.",
    },
    metanfetamina: {
      name: "Metanfetamina",
      effect:
        "La metanfetamina, un potente estimulante, aumenta drásticamente la actividad locomotora de C. elegans y puede ser neurotóxica.",
      details: [
        "Incremento extremo de la velocidad y actividad",
        "Puede causar comportamientos erráticos y estereotipados",
        "Potencial daño neuronal significativo",
        "Altera los patrones de alimentación y sueño",
        "Impacto severo en la longevidad",
      ],
      mechanism:
        "La metanfetamina actúa principalmente aumentando la liberación de dopamina y otros neurotransmisores, lo que lleva a un aumento prolongado de la actividad neuronal. A altas dosis, puede causar toxicidad neuronal.",
      implications:
        "El estudio de los efectos de la metanfetamina en C. elegans proporciona un modelo para investigar los mecanismos de acción de esta droga y su potencial neurotóxico. Esto puede ayudar a desarrollar estrategias para mitigar los efectos negativos del consumo de metanfetamina.",
      ethics:
        "El uso de metanfetamina en la investigación con C. elegans plantea consideraciones éticas sobre el uso de sustancias altamente adictivas y con potencial de abuso. Es crucial minimizar la exposición y manejar la sustancia con extrema precaución.",
    },
    lsd: {
      name: "LSD",
      effect: "El LSD, un potente alucinógeno, altera el comportamiento y la percepción sensorial de C. elegans.",
      details: [
        "Modifica los patrones de movimiento",
        "Puede alterar la respuesta a estímulos sensoriales",
        "Influye en la señalización serotoninérgica y otros neurotransmisores",
        "Potencial impacto en el aprendizaje y la memoria",
        "Efectos en la plasticidad neuronal",
      ],
      mechanism:
        "El LSD actúa principalmente como un agonista parcial de los receptores de serotonina, lo que altera la señalización serotoninérgica y puede afectar la percepción sensorial y el comportamiento.",
      implications:
        "El estudio de los efectos del LSD en C. elegans proporciona un modelo para investigar los mecanismos de acción de este alucinógeno y su impacto en el sistema nervioso. Esto puede ayudar a comprender mejor los efectos del LSD en humanos.",
      ethics:
        "El uso de LSD en la investigación con C. elegans plantea consideraciones éticas sobre el uso de sustancias psicoactivas. Es importante minimizar la exposición y manejar la sustancia con precaución.",
    },
    mdma: {
      name: "MDMA",
      effect:
        "El MDMA, o éxtasis, aumenta la actividad locomotora y puede afectar el comportamiento social de C. elegans.",
      details: [
        "Incrementa la actividad motora",
        "Altera la señalización de serotonina y otros neurotransmisores",
        "Puede modificar comportamientos sociales",
        "Potencial impacto en la termorregulación",
        "Efectos en la plasticidad sináptica",
      ],
      mechanism:
        "El MDMA actúa principalmente aumentando la liberación de serotonina y otros neurotransmisores, lo que lleva a un aumento en la actividad neuronal y los efectos psicoactivos. También puede afectar la plasticidad sináptica.",
      implications:
        "El estudio de los efectos del MDMA en C. elegans proporciona un modelo para investigar los mecanismos de acción de esta droga y su impacto en el sistema nervioso. Esto puede ayudar a comprender mejor los efectos del MDMA en humanos.",
      ethics:
        "El uso de MDMA en la investigación con C. elegans plantea consideraciones éticas sobre el uso de sustancias psicoactivas. Es importante minimizar la exposición y manejar la sustancia con precaución.",
    },
    ketamina: {
      name: "Ketamina",
      effect:
        "La ketamina, un anestésico disociativo, muestra efectos diversos en C. elegans, incluyendo efectos anestésicos y potencialmente neuroprotectores.",
      details: [
        "Reduce la actividad motora a altas dosis",
        "Potencial efecto neuroprotector a bajas dosis",
        "Influye en la señalización glutamatérgica y otros neurotransmisores",
        "Puede afectar el aprendizaje y la memoria",
        "Posible impacto en la respuesta al estrés",
      ],
      mechanism:
        "La ketamina actúa principalmente bloqueando los receptores NMDA de glutamato, lo que puede tener efectos anestésicos y neuroprotectores. También puede modular otros neurotransmisores.",
      implications:
        "El estudio de los efectos de la ketamina en C. elegans proporciona un modelo para investigar los mecanismos de acción de este anestésico y su potencial terapéutico en diversas enfermedades.",
      ethics:
        "El uso de ketamina en la investigación con C. elegans plantea consideraciones éticas sobre el uso de sustancias con potencial de abuso. Es importante minimizar la exposición y manejar la sustancia con precaución.",
    },
    morfina: {
      name: "Morfina",
      effect: "La morfina, un opioide potente, causa sedación y reduce la actividad locomotora en C. elegans.",
      details: [
        "Disminuye significativamente la actividad motora",
        "Puede afectar el desarrollo y la reproducción",
        "Altera la señalización de opioides y otros neurotransmisores",
        "Potencial impacto en la longevidad",
        "Modifica la respuesta al dolor y al estrés",
      ],
      mechanism:
        "La morfina actúa como un agonista de los receptores opioides, lo que lleva a la inhibición de la actividad neuronal y la analgesia. También puede afectar otros sistemas de neurotransmisores.",
      implications:
        "El estudio de los efectos de la morfina en C. elegans proporciona un modelo para investigar los mecanismos de acción de los opioides y su potencial adictivo. Esto puede ayudar a desarrollar mejores tratamientos para el dolor y estrategias para combatir la adicción a opioides.",
      ethics:
        "El uso de morfina en la investigación con C. elegans plantea consideraciones éticas sobre el uso de sustancias con alto potencial de abuso. Es crucial minimizar la exposición y manejar la sustancia con extrema precaución.",
    },
    benzodiacepinas: {
      name: "Benzodiacepinas",
      effect: "Las benzodiacepinas, como el diazepam, tienen efectos sedantes y ansiolíticos en C. elegans.",
      details: [
        "Reducen la actividad locomotora",
        "Pueden afectar los patrones de sueño",
        "Alteran la señalización GABAérgica",
        "Potencial impacto en la memoria y el aprendizaje",
        "Pueden modificar la respuesta al estrés",
      ],
      mechanism:
        "Las benzodiacepinas actúan potenciando la acción del neurotransmisor GABA, lo que lleva a una inhibición de la actividad neuronal y produce efectos sedantes y ansiolíticos.",
      implications:
        "El estudio de los efectos de las benzodiacepinas en C. elegans proporciona un modelo para investigar los mecanismos de acción de estos fármacos y su impacto en el sistema nervioso. Esto puede ayudar a desarrollar nuevos tratamientos para la ansiedad y los trastornos del sueño.",
      ethics:
        "El uso de benzodiacepinas en la investigación con C. elegans plantea consideraciones éticas sobre el uso de sustancias con potencial de dependencia. Es importante utilizar las dosis más bajas posibles y considerar el bienestar del organismo.",
    },
    anfetaminas: {
      name: "Anfetaminas",
      effect:
        "Las anfetaminas, estimulantes del sistema nervioso central, aumentan significativamente la actividad locomotora de C. elegans.",
      details: [
        "Incrementan drásticamente la velocidad y frecuencia de movimiento",
        "Pueden causar comportamientos estereotipados",
        "Afectan la señalización de dopamina y norepinefrina",
        "Potencial daño neuronal a altas dosis",
        "Alteran los patrones de alimentación y descanso",
      ],
      mechanism:
        "Las anfetaminas actúan principalmente aumentando la liberación y bloqueando la recaptación de dopamina y norepinefrina, lo que lleva a un aumento prolongado de la actividad neuronal.",
      implications:
        "El estudio de los efectos de las anfetaminas en C. elegans proporciona un modelo para investigar los mecanismos de acción de estos estimulantes y su potencial neurotóxico. Esto puede ayudar a desarrollar estrategias para mitigar los efectos negativos del consumo de anfetaminas y mejorar los tratamientos para trastornos como el TDAH.",
      ethics:
        "El uso de anfetaminas en la investigación con C. elegans plantea consideraciones éticas sobre el uso de sustancias con potencial de abuso. Es crucial minimizar la exposición y manejar las sustancias con precaución.",
    },
  }

  // Generar botones de sustancias dinámicamente
  const substanceSelector = document.querySelector(".substance-selector")
  Object.keys(substanceInfo).forEach((substance) => {
    const button = document.createElement("button")
    button.classList.add("substance-btn")
    button.dataset.substance = substance
    button.textContent = substanceInfo[substance].name
    substanceSelector.appendChild(button)
  })

  // Actualizar los selectores después de generar los botones
  const updatedSubstanceButtons = document.querySelectorAll(".substance-btn")

  updatedSubstanceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const substance = button.dataset.substance
      const info = substanceInfo[substance]

      substanceName.textContent = info.name
      substanceEffect.textContent = info.effect

      substanceDetails.innerHTML = ""
      info.details.forEach((detail) => {
        const li = document.createElement("li")
        li.textContent = detail
        substanceDetails.appendChild(li)
      })

      document.getElementById("substance-mechanism").textContent = info.mechanism
      document.getElementById("substance-implications").textContent = info.implications
      document.getElementById("substance-ethics").textContent = info.ethics

      // Resaltar el botón seleccionado
      updatedSubstanceButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")
    })
  })
})

