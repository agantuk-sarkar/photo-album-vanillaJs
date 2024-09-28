// photos url
const url = "https://jsonplaceholder.typicode.com/photos";

// let temp = false;

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
            showModal(albumObj[key],key);

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
const showModal = (albumArray,albumIds)=>{

    const main_container_modal = document.createElement("div");
    main_container_modal.classList.add("border-4","border-orange-600","h-[100vh]","fixed","top-0","left-0","w-[100%]","flex","justify-center","bg-gray-800/50","items-center");


    const modal_div = document.createElement("div");
    modal_div.classList.add("border-2","border-blue-600","shadow-md","h-[80vh]","w-[44%]","bg-white","top-[5rem]","flex-col","rounded-lg");

    const modal_content = document.createElement("div");
    modal_content.classList.add("border-2","border-green-500","h-full");

    // close box
    const close_button = document.createElement("div");
    close_button.classList.add("border","border-blue-500","h-[15%]","flex","justify-between","text-xl");

    const album_photos_text = document.createElement("p");
    album_photos_text.textContent = `Album Photos - ${albumIds}`;
    album_photos_text.classList.add("text-black-500","font-bold","italic");

    const close_text = document.createElement("p");
    close_text.textContent = "Close";
    close_text.classList.add("text-red-500","font-bold","italic","cursor-pointer");


    close_text.addEventListener("click",()=>{

        main_container_modal.style.display = "none";
        
    });

    close_button.append(album_photos_text,close_text);


    // photo content
    const photoContent_div = document.createElement("div");
    photoContent_div.classList.add("border-2","border-teal-600","h-[85%]","grid","auto-rows-auto","grid-cols-3","gap-2","overflow-scroll");

    // using higher order function in album array
    albumArray?.forEach((albums)=>{
        const {title,url} = getObj(albums);

        const album_mainDiv = document.createElement("div");
        album_mainDiv.classList.add("border","border-red-500","h-[40vh]","flex","flex-col");

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

    main_container_modal.append(modal_div);

    subContainer_albums.append(main_container_modal);

}

// function which will return an object to show title and url
const getObj = (obj)=>{
    return{
        title: obj.title,
        url: obj.url
    }
}

