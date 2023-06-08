//https://reqres.in/api/users?page=2

//create a base main flow
const API_KEY = 'api_key=cd8957c8f7bb64c01230c941e0d9cb6e';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL  = 'https://image.tmdb.org./t/p/w500';
const API_URL = BASE_URL+'/discover/movie?sort_by=popularity.desc&'+API_KEY;
const searchURL = BASE_URL+'/search/movie?'+API_KEY;
const GOOGLE_SEARCH = 'https://www.google.com/search?q=';
const netError = 'network error please try connecting to internet!!!'

function homeButton(){
    const cont = document.querySelector('.content');
    cont.textContent ='';
    fetchData();
    console.log('home button is pressed');
}


async function fetchSearch(name){
    let networkError = false;
    const hB = document.querySelector('.homeButton');
    hB.style.display = 'block';
    const res = await fetch(searchURL+'&query='+name).catch(error=>{networkError =true ; console.log('network error!!!')});
    if (!networkError){
        const data = await res.json();
    const lst = data.results;
    const cont = document.querySelector('#realContent');
    cont.textContent = '';
    const hd = document.querySelector('.heading');
    hd.textContent = 'SearchResults:';
    if(lst.length){
        lst.forEach(element =>{
            if (element.poster_path != null){
                const searchCard = card(element.title, element.poster_path, element.overview);
                cont.append(searchCard);
            }
        });
    }
    else{
        cont.textContent = "  :'(  no Matches please return to home page";
    }
    console.log(data);
    }
    else{
        const cont = document.querySelector('#mainContent');
        const error = document.createElement('h4');
        error.className = 'error';
        cont.textContent = '';
        error.textContent = netError;
        cont.append(error);
    }
    
}

function card(title , poster_path , overview){
    const lnk = document.createElement('a');
    lnk.href = GOOGLE_SEARCH+title;
    lnk.id = 'cItem';
    lnk.className = 'googleSearch contentItem';
    lnk.target = '_blank';
    const item = document.createElement('span');
    item.className = "contentItem";
    const container = document.createElement('div');
    container.className="itemContainer";
    const imgContainer = document.createElement('div');
    imgContainer.className="imageContainer";
    const mDescription = document.createElement('h4');
    mDescription.className = "description";
    const img = document.createElement('img');
    img.className = "posterImage";
    img.src = IMG_URL+poster_path;
    const nCon = document.createElement('div');
    nCon.className="nameContainer nameTag";
    const name = document.createElement('h4');
    name.className = "movieName nameTag";
    name.textContent = title;
    mDescription.textContent = overview;
    imgContainer.append(img,nCon,name);
    container.append(mDescription,imgContainer);
    item.append(container);
    lnk.append(item);
    imgContainer.addEventListener("mouseenter",(e)=>{imgContainer.style.opacity = '0.25';mDescription.style.display='block';});
    imgContainer.addEventListener("mouseleave",(e)=>{imgContainer.style.opacity = '1';mDescription.style.display='none';});
    return lnk;
}


async function fetchData(){
    let networkError = false;
    const resp = await fetch(API_URL).catch(error=>{networkError = true ;console.log('network error')});
    if(!networkError){
        const res = await resp.json();
        const data = res.results;
        const cont = document.querySelector('#realContent');
        data.forEach(element => {
            const lnk = card(element.title , element.poster_path ,element.overview);
            cont.append(lnk);
        });
        console.log(res);
    }
    else{
        const cont = document.querySelector('#mainContent');
        const error = document.createElement('h4');
        error.className = 'error';
        cont.textContent = '';
        error.textContent = netError;
        cont.append(error);
    }
}

fetchData();


const mi = document.querySelector('.menuItem');
const list = document.querySelector('.feature_list');
mi.addEventListener("mouseenter",(e)=>{mi.style.fontSize = '24px';list.style.display='block';});
mi.addEventListener("mouseleave",(e)=>{mi.style.fontSize = '20px';list.style.display='none';});

const sub = document.querySelector("#submit");
sub.addEventListener('click' , function clickHandle(){
    const search = document.querySelector('#tInput');
    let literal = search.value;
    let searchfrendly = '';
    for(let i = 0; i<literal.length;i++){
        if(literal[i] == ' '){
            searchfrendly += '+';
        }
        else{
            searchfrendly += literal[i];
        }
    }
    fetchSearch(searchfrendly);
    //console.log(searchfrendly);
});
const bod = document.body;
const theme = document.querySelector('.circle');
const header = document.querySelector('header');
const men = document.querySelectorAll('.links');
theme.addEventListener('click' , (e)=>{
    const ins = document.querySelector('.semiCircle');
    const dList  = document.querySelectorAll('.description');
    if(header.style.backgroundColor == 'black'){
        header.style.backgroundColor = 'white';
        theme.style.backgroundColor = 'black';
        ins.style.backgroundColor ='#666666';
        men.forEach(ele =>{
            ele.style.color = 'black';
        });
        dList.forEach(ele =>{
            ele.style.color = 'black';
        });
    }
    else{
        header.style.backgroundColor = 'black';
        theme.style.backgroundColor = 'white';
        ins.style.backgroundColor ='black';
        men.forEach(ele =>{
            ele.style.color = 'white';
        });
        dList.forEach(ele =>{
            ele.style.color = 'white';
        });
    }
    bod.classList.toggle('darkMode');
});