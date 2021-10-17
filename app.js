//Selecting HTML Elements
const titleInput = document.getElementById('title');
const submit = document.querySelector('.submit-btn');
const errorDiv = document.querySelector('.error');
const section = document.querySelector('section');
const body = document.querySelector('body')
const label = document.querySelector('.form label');
const mainHeading = document.querySelector('.main-heading');


window.addEventListener('click', getFromLocal())

//Submit Event Listener
submit.addEventListener('click',() => {
    if(titleInput.value === ''){
        //Show RED Error
        showError('Please fill all fields!' , 'red' , 'block');
        setTimeout(() => {
            showError('Please fill all fields!' , 'red' , 'none');
        },3000);
    }else{
        //Show GREEN Error
        showError('Color Saved!' , 'green' , 'block');
        setTimeout(() => {
            showError('Color Saved!' , 'green' , 'none');
        },3000);



        //Adding New Element
        addElement()

        //Add to Localstorage
        addToLocal();

        titleInput.value = '';
    }

    //Empty All Fields
})

//Removing Element
removeElement();


//Creating Error Function
function showError(message , color , displayProperty){
    errorDiv.children[0].innerText = message;
    errorDiv.style.background = color;
    errorDiv.style.display = displayProperty;
}

function addElement(){
    let newElement = document.createElement('aside');
    newElement.classList.add('full-info');
    newElement.innerHTML =  `<h3 class="full-info__heading">${titleInput.value.toLowerCase()}</h3>
    <a href='#' class='cross' style='text-decoration:none;'>x</a>`;
    section.appendChild(newElement);
    body.style.background = titleInput.value;

    if(titleInput.value === 'white' || titleInput.value.includes('#fff')){
        label.style.color = 'black';
        titleInput.style.color = 'black';
        titleInput.style.borderColor = 'black';
        mainHeading.style.color = 'black';
        submit.classList.add('button');
    }else{
        submit.classList.remove('button');
    }

}

function removeElement(){
    section.addEventListener('click',(e)=>{
        e.preventDefault();
        if(e.target.classList.contains('cross')){
            e.target.parentElement.remove();
            showError('Color removed!' , 'blue' , 'block');
            setTimeout(() => {
                showError('Color removed!' , 'blue' , 'none');
            },3000);
        }
        console.log(e.target.previousElementSibling);
        removeFromLocal(e.target.previousElementSibling)
    })
}

function addToLocal(){
    let Title;
    if(localStorage.getItem('Title') === null){
        Title = [];
    }else{
        Title = JSON.parse(localStorage.getItem('Title'));
    }
    Title.push(titleInput.value);
    localStorage.setItem('Title' , JSON.stringify(Title))
}

function getFromLocal(){
    if(localStorage.getItem('Title') === null){
        Title = [];
    }else{
        Title = JSON.parse(localStorage.getItem('Title'));
    }

    Title.forEach(element => {
        let newElement = document.createElement('aside');
        newElement.classList.add('full-info');
        newElement.innerHTML = `<h3 class="full-info__heading">${element}</h3>
                                <a href='#' class='cross' style='text-decoration:none;'>x</a>`;
        section.appendChild(newElement);
    })
}

function removeFromLocal(titleItem){
    let Title;
    if(localStorage.getItem('Title') === null){
        Title = [];
    }else{
        Title = JSON.parse(localStorage.getItem('Title'));
    }
    Title.forEach(function(element , index){
        console.log(element === titleItem.innerText)
        if(titleItem.innerText === element){
            Title.splice(index , 1);
        }
    })
    localStorage.setItem('Title' , JSON.stringify(Title));
}

