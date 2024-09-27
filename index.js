// photos url
const url = "https://jsonplaceholder.typicode.com/photos";

// getting the htmls elements into js
const main_container = document.querySelector(".main-container");
const subContainer_albums = document.querySelector(".main-container>div");

// fetching the url
const getData = async (albumUrl)=>{
    try{
        const responseObj = await fetch(albumUrl);
        if(responseObj.ok){
            const data = await responseObj.json();
            // console.log("data:",data);
            getAlbums(data);
        } else{
            throw new Error("Invalid URL");
        }
    } catch(error){
        console.log("error:",error);
    }
}
getData(url);
 
// function to filter albums with albumId and put them in an array corresponding to each keys of an object. Basically create an object

const getAlbums = (data)=>{

    let albumObj = {};

    // albumObj = {
    //     1: [{},{},{},{},...],
    //     2: [{},{},{},{},...],
    //     3: [{},{},{},{},...],
    // }

    data?.forEach((eachAlbum)=>{
        if(!albumObj[eachAlbum.albumId]){
            albumObj[eachAlbum.albumId] = [];
            albumObj[eachAlbum.albumId].push(eachAlbum);
        } else {
            albumObj[eachAlbum.albumId].push(eachAlbum);
        }
    });

    // console.log("albumObj:",albumObj);
    showAlbums(albumObj);
}

// function to display albums in UI
const showAlbums = (albumObj)=>{

    for(let key in albumObj){

        const main_div = document.createElement("div");
        main_div.classList.add("border-2","border-teal-500","h-[20vh]","rounded-lg","cursor-pointer","p-2","text-center","bg-teal-300");
        // applying click event for main div
        main_div.addEventListener("click",()=>{

            showModal(albumObj[key]);
        })

        // to get albumIDs from the count of 1 to 100 inside main div
        const albumId_text = document.createElement("p");
        albumId_text.textContent = `Album - ${key}`;
        albumId_text.classList.add("text-2xl","font-semibold");

        main_div.append(albumId_text);

        subContainer_albums.append(main_div);
    }
}

// function to display modal when any album box is clicked
const showModal = (albumArray)=>{

    // main_container.style.backgroundColor = "rgb(72,72,72)";
    // main_container.style.filter = "blur(2px)";
    subContainer_albums.style.backgroundColor = "rgb(0,0,0,0.5)";
    // subContainer_albums.style.backdrop-filter = "blur(2px)";


    const modal_div = document.createElement("div");
    modal_div.classList.add("border-2","border-blue-600","shadow-md","min-h-[90vh]","w-[60%]","bg-white","m-auto","absolute","top-[10rem]","z-99999","left-[18rem]");

    const modal_content = document.createElement("div");
    modal_content.classList.add("border-2","border-green-500","h-full");

    // close box
    const close_button = document.createElement("div");
    close_button.classList.add("border","border-blue-500","h-[5vh]","flex","justify-end","text-red-500","font-bold","italic","cursor-pointer","text-xl");
    close_button.textContent = "Close";
    close_button.addEventListener("click",()=>{
        modal_div.style.display = "none";
    })

    // photo content
    const photoContent_div = document.createElement("div");
    photoContent_div.classList.add("border-2","border-teal-600","mt-[0.5rem]","h-[85vh]","grid","auto-rows-auto","grid-cols-3","gap-2","overflow-scroll");

    // using higher order function in album array
    albumArray?.forEach((albums)=>{
        const {title,url} = getObj(albums);

        const album_mainDiv = document.createElement("div");
        album_mainDiv.classList.add("border","border-red-500","h-[40vh]");

        const photo_image = document.createElement("img");
        photo_image.src = url;
        photo_image.classList.add("h-40","w-full");

        const title_text = document.createElement("p");
        title_text.textContent = title;
        title_text.classList.add("italic","font-semibold");

        album_mainDiv.append(photo_image,title_text);

        photoContent_div.append(album_mainDiv);
    })


    modal_content.append(close_button,photoContent_div);


    modal_div.append(modal_content);

    subContainer_albums.append(modal_div);

}


// function which will return an object to show title and url
const getObj = (obj)=>{
    return{
        title: obj.title,
        url: obj.url
    }
}

