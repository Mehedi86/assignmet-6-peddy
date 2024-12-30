// view more button
const viewMore = () => {
    document.documentElement.scrollTop = 420;
}


// global variable of getElement
const spinner = document.getElementById('spinner');
const petContainer = document.getElementById('pet-container');


// to load catagoris button api

const loadCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await response.json();
    showCategories(data.categories);

};

// show catagories button 

const showCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(({ category, category_icon, id }) => {
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('mx-auto');
        buttonDiv.innerHTML = `<button id="category-btn-${id}" onclick="loadCategoryWise('${category}', '${id}')" class="btn w-[160px] md:w-[200px] xl:w-[320px] h-24 border-2 lg:text-lg font-bold bg-white category-btn"><img src="${category_icon}" alt="">${category}</button>`;
        categoryContainer.append(buttonDiv);
    })
};
// remove active status from all or manage avtive category button

const removeActiveButton = () => {
    const categoryButtons = document.getElementsByClassName('category-btn');
    for (let categoryButton of categoryButtons) {
        categoryButton.classList.remove('rounded-full', 'bg-[#0E7A811A]', 'border-[#0E7A8133]');
    }
};

// catagory button functionality
const loadCategoryWise = async (category, id) => {
    removeActiveButton();
    const categoryBtn = document.getElementById(`category-btn-${id}`);
    categoryBtn.classList.add('rounded-full', 'bg-[#0E7A811A]', 'border-[#0E7A8133]');
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const data = await response.json();
    petContainer.innerHTML = '';
    spinner.classList.remove('hidden');
    setTimeout(() => {
        showAllPets(data.data);
    }, 2200)
}


// load all pets from api
const loadAllpets = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    showAllPets(data.pets);

    document.getElementById('sort-btn').addEventListener('click', function () {
        const sortedData = (data.pets).sort((a, b) => (b.price) - (a.price));
        petContainer.innerHTML = '';
        spinner.classList.remove('hidden');
        setTimeout(() => {
            showAllPets(sortedData);
        }, 2200)
    })
};



const showAllPets = (pets) => {
    if (pets.length === 0) {
        petContainer.classList.remove('grid');
        petContainer.classList.add('bg-stone-100', 'rounded-xl', 'min-h-[600px]');
        petContainer.innerHTML = `
        <div class="w-10/12 mx-auto mt-28">
            <div>
                <img class="mx-auto" src="./images/error.webp" alt="">
            </div>
            <div class="w-8/12 mx-auto text-center mb-12">
                <h4 class="text-4xl font-bold py-6">No Information Available</h4>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
        </div>
        `
    }
    else {
        petContainer.classList.add('grid');
        petContainer.classList.remove('bg-stone-100', 'rounded-xl', 'min-h-[600px]');
    }
    spinner.classList.add('hidden');
    pets.forEach(({ breed, pet_name, date_of_birth, image, gender, price, petId }) => {
        const petCard = document.createElement('div');
        petCard.classList = 'card p-4 border-2 rounded-lg'
        petCard.innerHTML = `
        <figure>
            <img class="h-[210px] rounded-lg" src="${image}" class="rounded-xl" />
        </figure>
        <div class="py-2">
            <h2 class="text-2xl font-bold py-2">${pet_name ? pet_name : "N/A"}</h2>
            <p class="text-lg pt-2 font-semibold text-neutral-600"><i class="fa-solid fa-table-cells-large"></i> Breed: ${(breed ? breed : "N/A")}</p>
            <p class="text-lg pt-2 font-semibold text-neutral-600"><i class="fa-regular fa-calendar"></i> Birth: ${date_of_birth ? date_of_birth : "N/A"}</p>
            <p class="text-lg pt-2 font-semibold text-neutral-600"><i class="fa-solid fa-mercury"></i> Gender: ${gender ? gender : "N/A"}</p>
            <p class="text-lg pt-2 font-semibold text-neutral-600"><i class="fa-solid fa-dollar-sign"></i> Price: ${price ? price : "N/A"}$</p>
            <div class="border my-2"></div>
            <div class="pt-2 flex justify-center gap-1 md:gap-4 ">
                <button id="like-button-${petId}" onclick="likeButton('${image}',${petId})" class="btn md:text-xl border-2 border-gray-200 bg-white"><i class="fa-regular fa-thumbs-up"></i></button>
                <button id="adopt-button-${petId}" onclick="loadAdoptModal(${petId})" class="btn md:text-xl border-2 border-gray-200 text-teal-600 bg-white">Adopt</button>
                <button onclick="loadModalDetails('${petId}')" class="btn md:text-xl border-2 border-gray-200 text-teal-600 bg-white">Details</button>
            </div>
        </div>
        `;
        petContainer.append(petCard);
    })
};


// card like button function
const likeButton = (image, id) => {
    const petLikedContainer = document.getElementById('pet-liked-container');
    const likeButton = document.getElementById(`like-button-${id}`);
    likeButton.classList.add('bg-amber-400', 'text-white');
    const petLikedDiv = document.createElement('div');
    petLikedDiv.innerHTML = `
    <img class="rounded-xl"  src="${image}">
    `;
    petLikedContainer.append(petLikedDiv);
}
// close adopt modal
const closeAdoptModal = () => {
    const adoptModalContainer = document.getElementById('adopt-modal-container');
    adoptModalContainer.innerHTML = '';
}
// Adopt modal section
const loadAdoptModal = (petId) => {
    const adoptModalContainer = document.getElementById('adopt-modal-container');
    adoptModalContainer.innerHTML = `
    <dialog id="my_modal_1" class="modal">
                <div class="modal-box">
                    <div class="flex justify-center items-center pt-6">
                        <img class="rounded-lg w-20 h-16" src="./images/handShakeImage.png" />
                    </div>
                    <div class="text-center my-4">
                        <h4 class="text-4xl font-bold">Congrates</h4>
                    </div>
                    <div class="flex justify-center my-4">
                        <span class="text-6xl font-bold" id="countdown"></span>
                    </div>
                </div>
            </dialog>
    `;
    countDown();
    my_modal_1.showModal();
    const adoptButton = document.getElementById(`adopt-button-${petId}`)
    adoptButton.innerText = 'Adopted';
    adoptButton.setAttribute('disabled', true);
    setTimeout(() => {
        closeAdoptModal(petId);
    }, 3200)

}
// countdown function

const countDown = () => {
    let value = 3;
    let seconds = value, otherSeconds = document.querySelector('#countdown');
    (function countdown() {
        otherSeconds.textContent = seconds;
        if (seconds-- > 0) setTimeout(countdown, 1000)
    })();
}
// Details modal section
const loadModalDetails = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    const data = await response.json();
    showModalDetails(data.petData);
};

const showModalDetails = ({ breed, date_of_birth, gender, image, pet_details,
    pet_name, price, vaccinated_status }) => {
    const detailsModalContainer = document.getElementById('details-modal-container');
    detailsModalContainer.innerHTML = `
        <dialog id="my_modal_4" class="modal">
            <div class="modal-box md:w-8/12 xl:w-6/12 max-w-5xl">
                <figure>
                    <img class="h-[300px] w-full mx-auto rounded-lg"
                        src="${image}"
                        class="rounded-xl" />
                </figure>
                <h2 class="text-2xl font-bold pt-2">${pet_name ? pet_name : "N/A"}</h2>
                <div class="grid md:grid-cols-2">
                    <p class="text-lg pt-2 font-semibold text-neutral-600"><i class="fa-solid fa-table-cells-large"></i>
                        Breed: ${(breed ? breed : "N/A")}</p>
                    <p class="text-lg pt-2 font-semibold text-neutral-600"><i class="fa-regular fa-calendar"></i> Birth: ${date_of_birth ? date_of_birth : "N/A"}
                    </p>
                    <p class="text-lg pt-2 font-semibold text-neutral-600"><i class="fa-solid fa-mercury"></i> Gender: ${gender ? gender : "N/A"}
                    </p>
                    <p class="text-lg pt-2 font-semibold text-neutral-600"><i class="fa-solid fa-dollar-sign"></i>
                        Price: ${price ? price : "N/A"}$</p>
                    <p class="text-lg pt-2 font-semibold text-neutral-600"><i class="fa-solid fa-vial-circle-check"></i></i>
                        Vaccinated Status: ${vaccinated_status ? vaccinated_status : "N/A"}</p>
                </div>
                <div class="divider"></div>
                <h4 class="text-xl font-bold">Details Information</h4>
                <p class="my-2 text-lg"> ${pet_details}</p>
                <form method="dialog">
                    <button class="btn w-full my-2 text-xl font-bold text-[#0E7A81] bg-[#0E7A811A] border border-[#0E7A8133] ">Cancel</button>
                </form>
            </div>
            </div>
        </dialog>
        `;
    my_modal_4.showModal();
}

// load spinner
const loadSpinner = () => {
    spinner.classList.remove('hidden');
    setTimeout(() => {
        loadAllpets();
    }, 2200)
};

loadCategories();
loadSpinner();

