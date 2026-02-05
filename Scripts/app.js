// alert("please work")

const toggleFavBtn = document.getElementById("toggleFavBtn")
const favoritesSidebar = document.getElementById("favoritesSidebar")
const hideFavSidebarBtn = document.getElementById("hideFavSidebarBtn");






toggleFavBtn.addEventListener("click", () => {
    console.log("Fav btn clicked!")
    favoritesSidebar.classList.remove("hidden")
})
hideFavSidebarBtn.addEventListener("click", () =>{
    favoritesSidebar.classList.add("hidden")
})