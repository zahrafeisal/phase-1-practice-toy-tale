let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const URL = 'http://localhost:3000/toys'
  const toyCollection = document.getElementById('toy-collection')
  
  // fetching toys when page loads
  fetch(URL)
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(toy => {
      const toyCard = document.createElement('div');
      toyCard.className = 'card';

      const toyName = document.createElement('h2');
      toyName.textContent = toy.name;

      const toyImage = document.createElement('img');
      toyImage.src = toy.image;
      toyImage.className = 'toy-avatar';

      const toyLikes = document.createElement('p');
      toyLikes.textContent = `${toy.likes} Likes`;

      const toyLikeButton = document.createElement('button');
      toyLikeButton.className = 'like-btn';
      toyLikeButton.id = toy.id;
      toyLikeButton.textContent = 'Like ❤️';

      toyLikeButton.addEventListener('click', () => {
        increaseLikes(toy, toyLikes)
      })

      toyCard.append(toyName, toyImage, toyLikes, toyLikeButton);
      toyCollection.appendChild(toyCard);
    })
  })
  .catch(error => {
    console.error('Error fetching toys:', error);
  })


  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  // add new toys, handle form submission
const toyForm = document.querySelector('.add-toy-form');

toyForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // input values
  const toyName = event.target.name.value;
  const toyURL = event.target.image.value;

  // create toy object
  const newToy = {
    name: toyName,
    image: toyURL,
    likes: 0
  };

  // add toy to DOM
  addNewToy(newToy);

  // send data to server
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newToy)
  })
  .then(resp => resp.json())
  .then(toy => {
    console.log('Toy added:', toy);
  })
  .catch(error => {
    console.log('Error adding toy:', error);
  })

  // Reset form inputs
  toyForm.reset();
});

function addNewToy(toy) {
  const toyCard = document.createElement('div');
      toyCard.className = 'card';

      const toyName = document.createElement('h2');
      toyName.textContent = toy.name;

      const toyImage = document.createElement('img');
      toyImage.src = toy.image;
      toyImage.className = 'toy-avatar';

      const toyLikes = document.createElement('p');
      toyLikes.textContent = `${toy.likes} Likes`;

      const toyLikeButton = document.createElement('button');
      toyLikeButton.className = 'like-btn';
      toyLikeButton.id = toy.id;
      toyLikeButton.textContent = 'Like ❤️';

      toyLikeButton.addEventListener('click', () => {
        increaseLikes(toy, toyLikes)
      })

      toyCard.append(toyName, toyImage, toyLikes, toyLikeButton);
      toyCollection.appendChild(toyCard);
}


// increase toy likes
function increaseLikes(toy, toyLikes) {
  const newToyLikes = toy.likes + 1;

  // update server
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({likes: newToyLikes})
  })
  .then(resp => resp.json())
  .then(updatedToy => {
    toy.likes = updatedToy.likes;
    toyLikes.textContent = `${updatedToy.likes} Likes`
  })
  .catch(error => {
    console.error('Error updating likes:', error)
  })
}
});


