document.getElementById("downloadCVButton").addEventListener("click", function(event) {
    // Evitar el comportamiento predeterminado del enlace si lo hay
    event.preventDefault();

    // Abre el PDF en una nueva pestaña
    window.open("docs/CV ", "_blank");
});

fetch('./js/projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => buildPortfolio(data))
        .catch(error => console.error('There has been a problem with your fetch operation:', error));

    function buildPortfolio(projectsArr) {
        console.log('projectsArr:', projectsArr);
        let projects = [...projectsArr];
        projects.sort(function (a, b) {
            return b.rating - a.rating;
        });

        projects = projects.slice(0, 6);

        let container = document.querySelector(".elements");
        console.log('container:', container);

        for (const project of projects) {
            let element = document.createElement("div");
            element.classList.add("element");
            element.classList.add("a");
            element.classList.add("glass");
            element.setAttribute("dataID", project.id);
            let img = document.createElement("img");
            img.src = project.logo;
            element.appendChild(img);
            container.appendChild(element);
            console.log('Added element:', element);
        }

        portfolio(projectsArr);
    }

    function portfolio(arrayData) {
        let elements = [...document.getElementsByClassName('element')];
        elements.forEach(function (e) {
            e.addEventListener("click", () => {
                let banner = document.createElement("div");
                if (parseInt(e.getAttribute("dataID")) === 1) {
                    banner.classList.add("banner-custom");
                }
                let width = e.offsetWidth;
                let height = e.offsetHeight;
                let x = e.offsetTop;
                let y = e.offsetLeft;

                banner.style.top = x + "px";
                banner.style.left = y + "px";
                banner.style.width = width + 'px';
                banner.style.height = height + 'px';
                banner.style.padding = '0';
                banner.classList.add("banner");

                let content = document.createElement("div");
                content.classList.add("content");

                let closeButton = document.createElement("button");
                closeButton.classList.add("close-btn");
                closeButton.innerHTML = "&times;";
                closeButton.addEventListener("click", goBackElements);
                content.appendChild(closeButton);

                let h2 = document.createElement("h3");
                h2.innerText = arrayData[e.getAttribute("dataID")].name;
                content.appendChild(h2);
                let p = document.createElement("p");
                p.innerHTML = arrayData[e.getAttribute("dataID")].description;
                content.appendChild(p);
                let tech = document.createElement("div");
                tech.classList.add("skills-used");
                const arrayTech = arrayData[e.getAttribute("dataID")].technologies;
                for (const el of arrayTech) {
                    let skill = document.createElement("div");
                    skill.classList.add("skill");
                    let img = document.createElement("img");
                    img.src = "img/icons/" + el + '.svg';
                    let title = document.createElement("span");
                    title.textContent = el;
                    skill.appendChild(img);
                    skill.appendChild(title);
                    tech.appendChild(skill);
                }
                content.appendChild(tech);

                // Crear el contenedor de botones
                let buttonContainer = document.createElement("div");
                buttonContainer.classList.add("button-container");

                // Añadir botón "Take a look"
                let link = document.createElement("a");
                link.classList.add("link", "btn-primary");
                link.href = arrayData[e.getAttribute("dataID")].link || "#"; // Puedes agregar un enlace por defecto si no hay enlace
                link.setAttribute("target", "_blank");
                link.innerText = "Take a look";
                buttonContainer.appendChild(link);

                // Añadir botón de GitHub
                let githubLink = document.createElement("a");
                githubLink.classList.add("link", "btn-secondary");
                githubLink.href = arrayData[e.getAttribute("dataID")].github || "#"; // Puedes agregar un enlace por defecto si no hay GitHub
                githubLink.setAttribute("target", "_blank");

                let githubIcon = document.createElement("img");
                githubIcon.src = "img/icons/GitHub.svg";
                githubIcon.alt = "GitHub";
                githubIcon.style.width = "44px";
                githubIcon.style.height = "44px";
                githubLink.appendChild(githubIcon);

                buttonContainer.appendChild(githubLink);

                content.appendChild(buttonContainer);

                let spacingMobile = document.createElement("span");
                spacingMobile.classList.add('separatorMobile');
                content.appendChild(spacingMobile);

                banner.appendChild(content);
                document.querySelector('.elements').appendChild(banner);

                if (arrayData[e.getAttribute("dataID")].backgroundImage) {
                    banner.style.backgroundImage = `url(${arrayData[e.getAttribute("dataID")].backgroundImage})`;
                    banner.style.backgroundSize = 'cover';
                    banner.style.backgroundPosition = 'center';
                    banner.classList.add("banner-with-bg");
                } else {
                    banner.style.backgroundColor = arrayData[e.getAttribute("dataID")].backgroundColor || '#ffffff';
                }

                banner.classList.add("banner-expanded");

                setTimeout(() => {
                    content.classList.add("visible");
                }, 1100);
            });
        });

        function goBackElements() {
            let banner = document.querySelector('.banner');
            banner.classList.add("hide");
            setTimeout(() => {
                banner.remove();
            }, 500);
        }
    }

// parte de portafolio

fetch('./js/portafolio.json') // Cambiado el archivo JSON
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => buildPortfolioNew(data))
    .catch(error => console.error('There has been a problem with your fetch operation:', error));

function buildPortfolioNew(projectsArr) {
    console.log('projectsArr:', projectsArr);
    let projects = [...projectsArr];
    projects.sort(function (a, b) {
        return b.rating - a.rating;
    });

    projects = projects.slice(0, 6);

    let container = document.querySelector(".newElements-2"); // Modificado selector
    console.log('container:', container);

    for (const project of projects) {
        let element = document.createElement("div");
        element.classList.add("newElement"); // Modificado nombre de clase
        element.classList.add("a-new");
        element.classList.add("glass-new");
        element.setAttribute("dataID", project.id);
        let img = document.createElement("img");
        img.src = project.logo;
        element.appendChild(img);
        container.appendChild(element);
        console.log('Added element:', element);
    }

    portfolioNew(projectsArr);
}

function portfolioNew(arrayData) {
    let elements = [...document.getElementsByClassName('newElement')]; // Modificado selector
    elements.forEach(function (e) {
        e.addEventListener("click", () => {
            let banner = document.createElement("div");
            if (parseInt(e.getAttribute("dataID")) === 1) {
                banner.classList.add("newBanner-custom"); // Modificado nombre de clase
            }
            let width = e.offsetWidth;
            let height = e.offsetHeight;
            let x = e.offsetTop;
            let y = e.offsetLeft;

            banner.style.top = x + "px";
            banner.style.left = y + "px";
            banner.style.width = width + 'px';
            banner.style.height = height + 'px';
            banner.style.padding = '0';
            banner.classList.add("newBanner"); // Modificado nombre de clase

            let content = document.createElement("div");
            content.classList.add("newContent"); // Modificado nombre de clase

            let closeButton = document.createElement("button");
            closeButton.classList.add("close-btn-new"); // Modificado nombre de clase
            closeButton.innerHTML = "&times;";
            closeButton.addEventListener("click", goBackElementsNew);
            content.appendChild(closeButton);

            let h2 = document.createElement("h3");
            h2.innerText = arrayData[e.getAttribute("dataID")].name;
            content.appendChild(h2);
            let p = document.createElement("p");
            p.innerHTML = arrayData[e.getAttribute("dataID")].description;
            content.appendChild(p);
            let tech = document.createElement("div");
            tech.classList.add("newSkills-used"); // Modificado nombre de clase
            const arrayTech = arrayData[e.getAttribute("dataID")].technologies;
            for (const el of arrayTech) {
                let skill = document.createElement("div");
                skill.classList.add("newSkill"); // Modificado nombre de clase
                let img = document.createElement("img");
                img.src = "img/icons/" + el + '.svg';
                let title = document.createElement("span");
                title.textContent = el;
                skill.appendChild(img);
                skill.appendChild(title);
                tech.appendChild(skill);
            }
            content.appendChild(tech);

            // Crear el contenedor de botones
            let buttonContainer = document.createElement("div");
            buttonContainer.classList.add("newButton-container"); // Modificado nombre de clase


            // Añadir botón de GitHub
            let githubLink = document.createElement("a");
            githubLink.classList.add("newLink"); // Modificado nombre de clase
            githubLink.href = arrayData[e.getAttribute("dataID")].github || "#";
            githubLink.setAttribute("target", "_blank");

            let githubIcon = document.createElement("img");
            githubIcon.src = "img/icons/Figma.ico";
            githubIcon.alt = "GitHub";
            githubIcon.style.width = "44px";
            githubIcon.style.height = "44px";
            githubLink.appendChild(githubIcon);

            buttonContainer.appendChild(githubLink);

            content.appendChild(buttonContainer);

            let spacingMobile = document.createElement("span");
            spacingMobile.classList.add('separatorMobile-new'); // Modificado nombre de clase
            content.appendChild(spacingMobile);

            banner.appendChild(content);
            document.querySelector('.newElements-2').appendChild(banner); // Modificado selector

            if (arrayData[e.getAttribute("dataID")].backgroundImage) {
                banner.style.backgroundImage = `url(${arrayData[e.getAttribute("dataID")].backgroundImage})`;
                banner.style.backgroundSize = 'cover';
                banner.style.backgroundPosition = 'center';
                banner.classList.add("banner-with-bg-new"); // Modificado nombre de clase
            } else {
                banner.style.backgroundColor = arrayData[e.getAttribute("dataID")].backgroundColor || '#ffffff';
            }

            banner.classList.add("banner-expanded-new"); // Modificado nombre de clase

            setTimeout(() => {
                content.classList.add("visible-new"); // Modificado nombre de clase
            }, 1100);
        });
    });

    function goBackElementsNew() {
        let banner = document.querySelector('.newBanner'); // Modificado selector
        banner.classList.add("hide-new"); // Modificado nombre de clase
        setTimeout(() => {
            banner.remove();
        }, 500);
    }
}

// Datos iniciales de certificados
// Lista de certificados
const certificates = [
    {
      title: "Figma, UI/UX Essentials, +More",
      provider: "Udemy",
      date: "20/06/24",
      file: "docs/UC-83c78a45-d364-464d-aad8-ae9af0d81667.pdf",
    },
    {
      title: "Curso de Java - Nivel Básico",
      provider: "Udemy",
      date: "28/04/24",
      file: "docs/UC-1ff83aec-b611-47d8-bb3b-7dcdf1adc991.pdf",
    },
    {
      title: "Master WordPress 2024",
      provider: "Udemy",
      date: "12/08/24",
      file: "docs/UC-4880f4d5-2d60-4316-a5f2-c144e5aae286.pdf",
    },
  ];
  
  // Cargar certificados dinámicamente
  const container = document.getElementById("certificates-container");
  
  function loadCertificates() {
    certificates.forEach((cert) => {
      // Crear div del certificado
      const certDiv = document.createElement("div");
      certDiv.classList.add("certificate-item", "glass6");
  
      // Crear contenido
      certDiv.innerHTML = `
        <img src="img/udemy.webp" alt="Udemy Logo" class="certificate-icon" />
        <h3>${cert.title}</h3>
        <p>${cert.provider}</p>
        <p>Certificación obtenida el ${cert.date}</p>
        <a href="${cert.file}" target="_blank" class="btn-view">Ver Certificado</a>
      `;
      container.appendChild(certDiv);
    });
  }
  
  // Función para agregar nuevos certificados
  function addCertificate(title, provider, date, file) {
    const newCert = {
      title,
      provider,
      date,
      file,
    };
    certificates.push(newCert);
    updateCertificates();
  }
  
  // Actualizar certificados dinámicamente
  function updateCertificates() {
    container.innerHTML = ""; // Limpiar contenedor
    loadCertificates(); // Volver a cargar certificados
  }
  
  // Cargar certificados iniciales
  loadCertificates();
  
  addCertificate('Mestria JavaScript', 'Udemy', '12/08/2024', 'docs/UC-4143724f-1435-4580-90e0-8f9bcd8b3f9d.pdf');

  // Crear luciérnagas
function createFireflies(count) {
    for (let i = 0; i < count; i++) {
      const firefly = document.createElement("div");
      firefly.classList.add("firefly");
      firefly.style.top = `${Math.random() * 100}vh`;
      firefly.style.left = `${Math.random() * 100}vw`;
      firefly.style.animationDelay = `${Math.random() * 5}s`;
      document.body.appendChild(firefly);
    }
  }
  createFireflies(10); // Número de luciérnagas

  document.querySelector("form.contact-left").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Obtener los datos del formulario
    const formData = new FormData(this);

    // Usamos fetch para enviar los datos del formulario a Web3Forms
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // Convertir la respuesta a formato JSON
    .then(data => {
        if (data.success) {
            alert('¡Mensaje enviado con éxito!'); // Mensaje de éxito
            this.reset(); // Resetear el formulario
        } else {
            alert('Hubo un error al enviar el mensaje. Intenta nuevamente.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al enviar el mensaje.');
    });
});

 