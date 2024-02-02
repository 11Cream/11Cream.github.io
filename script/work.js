async function getAPI() {
  let host = "https://1111darsh.com"; // Replace with your actual API URL
  let response = await fetch(host + "/json/work.json");
  let data = await response.json();
 
  return data;
}

getAPI().then(data => createCards(data));

function createCards(data) {
  const container = document.getElementById('work');

  data.work.forEach(item => {
    const workcard = document.createElement('div');
    workcard.classList.add('workcard');

    const card = document.createElement('div');
    card.classList.add('subcard');

    const leftSection = document.createElement('div');
    leftSection.classList.add('left');

    if (item.thumbnail) {
      const icon = document.createElement('div');
      icon.classList.add('icon');
      const thumbnail = document.createElement('img');
      thumbnail.classList.add('thumbnail');
      thumbnail.src = item.thumbnail;

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
          links.appendChild(linkElement);
        }
      });
    }
    card.appendChild(leftSection);
    card.appendChild(links);
    workcard.appendChild(card);


    if (item.technology) {

      const technologyDiv = document.createElement('div');
      technologyDiv.classList.add('technology');

  
      item.technology.forEach(tech => {
        const pTag = document.createElement('p');
        pTag.textContent = tech;
        technologyDiv.appendChild(pTag);
      });
      workcard.appendChild(technologyDiv)
    }

    if (item.RoleandResposibility) {
      const RandR = document.createElement('div');
      RandR.classList.add('role-responsibility');

      item.RoleandResposibility.forEach(item => {
          const keys = Object.keys(item);
          keys.forEach(key => {
            const roleDiv = document.createElement('div');
            roleDiv.classList.add('role');
            roleDiv.textContent = key;
      
            RandR.appendChild(roleDiv);
      
            const responsibilities = document.createElement('div');
            responsibilities.classList.add('responsibilities');
      
            item[key].forEach(responsibility => {
              const respDiv = document.createElement('div');
              respDiv.classList.add('respossibilities');
              respDiv.textContent = responsibility;
      
              responsibilities.appendChild(respDiv);
            });
            RandR.appendChild(responsibilities);
          });  
      workcard.appendChild(RandR)
    });
    }

    if (item.accomplishment) {

      const accomplishmentDiv = document.createElement('div');
      accomplishmentDiv.classList.add('accomplishment');

  
      item.accomplishment.forEach(accomplishment => {
        const pTag = document.createElement('p');
        pTag.textContent = accomplishment;
        accomplishmentDiv.appendChild(pTag);
      });
      workcard.appendChild(accomplishmentDiv)
    }

    
    container.appendChild(workcard);

  });
}
