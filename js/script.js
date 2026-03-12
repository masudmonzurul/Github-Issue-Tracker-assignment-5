
const getAllIssues = async () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    const res = await fetch(url);
    const json = await res.json();
    displayIssues(json.data);

}

function makeSmallSentence(sentence) {
    return sentence.length > 65 ? sentence.slice(0, 65) + "..." : sentence;
}


function countCard(card) {

    const counterLocation = document.getElementById('counter');
    const cards = document.getElementsByClassName(card);
    counterLocation.innerText = cards.length;


}

function showCard(className) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('hidden', 'display');
        if (card.classList.contains(className)) {
            card.classList.remove('hidden', 'display');
        }

    });
}





// console.log(makeSmallSentence("The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior."))
const displayIssues = (issues) => {
    // 1. get container
    const container = document.getElementById('issues-container');
    issues.forEach(element => {

        // 2. create child element
        const child = document.createElement('div');

        // 3. set content to child element
        child.innerHTML = `
        ${element.status === 'open' ? `<div id=${element.id} class="card pt-2 bg-white rounded-md border-t-3 border-green-600 w-85 open">` : `<div id=${element.id} class="card pt-2 bg-white rounded-md border-t-3 border-violet-600 w-85 closed">`}
        
                <div class="flex justify-between h-6 mb-3 px-4">
                ${element.status === 'open' ? `<img src="./assets/Open-Status.png" width="24">` : `<img src="./assets/Closed- Status .png" width="24"> `}

                    ${element.priority === 'high' ?
                `<div class="px-6 py-1 bg-[#FEECEC] rounded-3xl">
                        <p class="text-xs text-red-600">${element.priority.toUpperCase()}</p>
                        </div>`: element.priority === 'low' ?
                    `<div class="px-6 py-1 rounded-3xl bg-gray-100">
                        <p class="text-xs  text-gray-400">${element.priority.toUpperCase()}</p>
                    </div>`: `<div class="px-6 py-1 rounded-3xl bg-yellow-100">
                        <p class="text-xs text-orange-400">${element.priority.toUpperCase()}</p>  
                    </div>`}
                    
                </div>
                <h2 class="font-semibold text-sm mb-2 px-4 h-10">${element.title.replace(/\b\w/g, c => c.toUpperCase())}</h2>
                <p class="px-4 text-slate-500 text-xs">${makeSmallSentence(element.description)}</p>
                <div class="flex gap-2  px-4 mt-3">
                
                        <p class="${element.labels[0].toLowerCase().replace(/\s+/g, "")}">${element.labels[0].toUpperCase()}</p>
                    
                       ${element.labels[1] ? `<p class=" ml-1 p-1 text-xs ${element.labels[1].toLowerCase().replace(/\s+/g, "")}">${element.labels[1].toUpperCase()}</p>` : ''}

                    
                </div>
                
                <hr class="mt-6 text-[#E4E4E7]">
                <div class="text-[#64748B] p-3">
                    <p>#${element.id} by ${element.author}</p>
                    <p>${new Date(element.createdAt).toLocaleDateString("en-US")}</p>
                </div>
        </div>
        `


        // 3. append to container
        container.append(child);


    });

    countCard('card');

    // getting all btns

    //get all btn
    const allBtn = document.getElementById('all');
    //get open btn
    const openBtn = document.getElementById('open');
    //get close btn
    const closeBtn = document.getElementById('close');

    // const cardNode = document.querySelectorAll('.card')

    // nav btns functionality

    allBtn.addEventListener('click', () => {
        openBtn.classList.remove('bg-blue-700', 'text-slate-100');
        closeBtn.classList.remove('bg-blue-700', 'text-slate-100');
        allBtn.classList.remove('bg-slate-50', 'text-slate-700');

        allBtn.classList.add('bg-blue-700', 'text-slate-100');

        countCard('card');
        showCard('card');


    })
    openBtn.addEventListener('click', () => {
        allBtn.classList.remove('bg-blue-700', 'text-slate-100');
        closeBtn.classList.remove('bg-blue-700', 'text-slate-100');
        openBtn.classList.remove('bg-slate-50', 'text-slate-700');

        openBtn.classList.add('bg-blue-700', 'text-slate-100');

        countCard('open');
        showCard('open');


    })
    closeBtn.addEventListener('click', () => {
        openBtn.classList.remove('bg-blue-700', 'text-slate-100');
        allBtn.classList.remove('bg-blue-700', 'text-slate-100');
        closeBtn.classList.remove('bg-slate-50', 'text-slate-700');

        closeBtn.classList.add('bg-blue-700', 'text-slate-100');

        countCard('closed');
        showCard('closed');

    })
}
getAllIssues();


// Search functionality
document.getElementById('btn-search').addEventListener('click', function () {
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);
    const cards = document.querySelectorAll('.card');
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';

    const searchResult = async () => {
        const res = await fetch(url);
        const data = await res.json();
        const allWords = data.data;
        console.log(allWords);
        const filterWord = allWords.filter((word) => word.title.toLowerCase().includes(searchValue)

        );
        cards.forEach(card => {
            card.classList.add('hidden', 'display');
        });

        filterWord.forEach(element => {
            const id = element.id;
            cards.forEach(card => {
                if (card.id == id) {
                    card.classList.remove('hidden', 'display');
                    card.classList.add('search');
                }
            });

        });
        countCard('search');
    }
    searchResult();
})

// Modal functionality
const my_modal_1 = document.getElementById("my_modal_1");
document.getElementById('issues-container').addEventListener('click', function (event) {

    const modalData = async () => {
        const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
        const res = await fetch(url);
        const json = await res.json();
        const allData = json.data;
        showModal(allData);
    }
    modalData();

    showModal = (data) => {
        const modalContainer = document.getElementById('my_modal_1');
        modalContainer.innerHTML = '';
        const card = event.target.closest('.card');
        
        data.forEach(element => {
            if (element.id === Number(card.id)) {
                const modalContent = document.createElement('div');
                modalContent.innerHTML = `
                <div class="modal-box min-w-96 w-11/12 max-w-5xl ">
                    <h3 class="font-bold text-lg mb-1">${element.title.replace(/\b\w/g, c => c.toUpperCase())}</h3>
                    <span class="py-4 text-xs">${element.status}&bull;</span>
                    <span class="py-4 text-xs">${element.assignee.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())} ${element.assignee ? `&bull;` : ''}</span>
                    <span class="py-4 text-xs">${new Date(element.createdAt).toLocaleDateString("en-US")}</span>


                    <div class="flex gap-2  mt-3">
                
                        <p class="${element.labels[0].toLowerCase().replace(/\s+/g, "")}">${element.labels[0].toUpperCase()}</p>
                    
                       ${element.labels[1] ? `<p class=" ml-1 p-1 text-xs ${element.labels[1].toLowerCase().replace(/\s+/g, "")}">${element.labels[1].toUpperCase()}</p>` : ''}
                    </div>
                    <p class="px-1 text-slate-500 text-xs mt-5">${makeSmallSentence(element.description)}</p>
                    
                    <div class="flex gap-2 justify-evenly w-11/12 py-2 mt-3 bg-[#F8FAFC]">
                        <div>
                            <p class="text-[#64748B] text-base">Assignee:</p>
                            <h3>${element.assignee.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Not assigned'}</h3>
                        </div>

                        <div>
                            <p class="text-[#64748B] text-base">Priority:</p>

                           ${element.priority === 'high' ?
                        `<div class="px-6 py-1 bg-[#FEECEC] rounded-3xl">
                            <p class="text-xs text-red-600">${element.priority.toUpperCase()}</p>
                            </div>`: element.priority === 'low' ?
                            `<div class="px-6 py-1 rounded-3xl bg-gray-100">
                              <p class="text-xs  text-gray-400">${element.priority.toUpperCase()}</p>
                              </div>`: `<div class="px-6 py-1 rounded-3xl bg-yellow-100">
                               <p class="text-xs text-orange-400">${element.priority.toUpperCase()}</p>  
                            </div>`}
                    
                            </div> 

                            
                        </div >
                    <div class="modal-action">
                          <form method="dialog">
                          <!-- if there is a button in form, it will close the modal -->
                           <button class="btn btn-primary">Close</button>
                         </form>
                    </div>
                    </div>
                
                </div>
            `
                modalContainer.append(modalContent);
            }
        });
    }


    // get the parent div of the clicked element which has the class 'card'
    let parentDiv = event.target.closest('.card');



    // check if the parent div has the class 'card', if yes, show the modal
    if (parentDiv) {
        my_modal_1.showModal();
    }



});


