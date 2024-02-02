async function getAPI() {
  let host = "https://1111darsh.com";
  let response = await fetch(host + "/json/website.json");
  let data = await response.json();
  return data;
}

getAPI().then(data => createSite(data));

function createSite(jsonData) {
  
  createPanel();
  const navLinks = document.querySelectorAll('.nav');
  navLinks.forEach(navLink => {
    navLink.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      const topPos = parseInt(targetSection.offsetTop)
      

      if (targetSection) {
        const topPos = targetSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: topPos,
          behavior: 'smooth'
        });
      }
      else {
        console.log('No!');
      }
    });
 });
  const categories = [
    'aboutme',
    'cv',
    'skill',
    'certificate',
    'work',
    'project',
    'education',
    'contectme'
  ];

  categories.forEach(category => {
    if (jsonData[category]) {
      createCards(jsonData, category);
    }
  });
}

function createCards(data, category) {
  const container = document.getElementById(category);

  data[category].forEach(item => {
    const card = document.createElement('div');
    card.classList.add('subcard');

    const leftSection = document.createElement('div');
    leftSection.classList.add('left');

    if (item.thumbnail) {
      const icon = document.createElement('div');
      icon.classList.add('icon');
      const thumbnail = document.createElement('img');
      thumbnail.classList.add('thumbnail');
      thumbnail.setAttribute('width', 100);
      thumbnail.setAttribute('height', 100);
      thumbnail.src = item.thumbnail;
      thumbnail.alt = "Img"

      icon.appendChild(thumbnail);
      leftSection.appendChild(icon);
    }

    if (item.iicon) {
      const icon = document.createElement('div');
      icon.classList.add('icon');

      const ilogo = document.createElement('i');
      const classes = item.iicon.split(' ');
      classes.forEach(className => {
        ilogo.classList.add(className);
      });

      icon.appendChild(ilogo);
      leftSection.appendChild(icon);
    }
    const center = document.createElement('div');
    center.classList.add('center');

    if (item.title) {
      const title = document.createElement('div');
      title.classList.add('title');
      title.textContent = item.title;
      center.appendChild(title);
    }

    if (item.details) {
      const details = document.createElement('div');
      details.classList.add('details');
      details.textContent = item.details;
      center.appendChild(details);
    }

    leftSection.appendChild(center);

    const links = document.createElement('div');
    links.classList.add('links');

    if (item.link) {
      item.link.forEach(linkItem => {
        for (let link in linkItem) {
          const linkElement = document.createElement('a');
          const i = document.createElement('i');

          const classes = link.split(' ');
          classes.forEach(className => {
            i.classList.add(className);
          });

          linkElement.appendChild(i)
          linkElement.href = linkItem[link];
          linkElement.ariaLabel="link"
          links.appendChild(linkElement);

        }
      });
    }

    card.appendChild(leftSection);
    card.appendChild(links);
    container.appendChild(card);
  });


}




function createPanel(){
  const panel = document.getElementById('panel');
  const navContainer = document.createElement('div');

// Define the list of nevigator and their respective hrefs
const nevigator = [
  { src: './images/p01home.png', href: '#home' },
  { src: './images/p002information.png', href: '#aboutme' },
  { src: './images/p005cv.png', href: '#cv' },
  { src: './images/p007skill.png', href: '#skill' },
  { src: './images/p003certificate.png', href: '#certificate' },
  { src: './images/p008computer.png', href: '#work' },
  { src: './images/p003scholarship.png', href: '#education' },
  { src: './images/p009code.png', href: '#project' },
  { src: './images/p010network.png', href: '#contectme' }
];

// Loop through the nevigator array and create anchor elements with nevigator
  nevigator.forEach(imageData => {
  const anchor = document.createElement('a');
  anchor.className = 'nav';
  anchor.href = imageData.href;

  const img = document.createElement('img');
  img.className = 'navigator';
  img.alt = imageData.src.replace('./images/', '');
  img.src = imageData.src;
  const width = this.width;
  const height = this.height;
  img.setAttribute('width', width);
  img.setAttribute('height', height);

  anchor.appendChild(img);
  navContainer.appendChild(anchor);
  panel.appendChild(navContainer);

  panel.classList.add("panelhide")
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos < currentScrollPos) {
          panel.classList.add("panelshow")
      }
      if (currentScrollPos != 0) {
          panel.classList.add("panelshow")
          panel.classList.remove("panelhide")
      } else {
          panel.classList.remove("panelshow")
          panel.classList.add("panelhide")   
      }
      prevScrollpos = currentScrollPos;
  }


});

}