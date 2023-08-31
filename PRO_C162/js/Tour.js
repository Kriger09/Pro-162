AFRAME.registerComponent("tour", {
  schema:{
    state:{type:"string",default:"places-list"},
    selectedCard:{type:"string",default:"#card1"},
    zoomAspectRatio:{type:"number",default:1}
  },
  init: function () {
    this.placesContainer = this.el;
    this.cameraEl=document.querySelector("#camera")
    this.createCards()
  },
  update: function(){
    window.addEventListener("keydown",e=>{
      if(e.key=="ArrowUp"){
        if(
          (this.data.zoomAspectRatio<=10 && this.data.state=="view")||
          (this.data.zoomAspectRatio<=10 && this.data.state=="change-view")
        ){
          this.data.zoomAspectRatio+=0.002
          this.cameraEl.setAttribute("zoom",this.data.zoomAspectRatio)
        }
      }
      if(e.key=="ArrowDown"){
        if(
          (this.data.zoomAspectRatio>1 && this.data.state=="view")||
          (this.data.zoomAspectRatio>1 && this.data.state=="change-view")
        ){
          this.data.zoomAspectRatio-=0.002
          this.cameraEl.setAttribute("zoom",this.data.zoomAspectRatio)
        }
      }
    })
  },
  tick: function(){
    const {state}=this.el.getAttribute("tour")
    if(state=="view"){
      this.hideEl([this.placesContainer])
      this.showView()
    }
  },
  hideEl: function(elList){
    elList.map(el=>{
      el.setAttribute("visible",false)
    })
  },
  showView: function(){
    const {selectedCard}=this.data
    const skyEl=document.querySelector("#main-container")
    skyEl.setAttribute("material",{
      color:"white",
      src:`../assets/360_images/${selectedCard}/place-0.jpg`
    })
  },
  createCards: function () {
    const miniRef = [
      {
        id: "india",
        title: "Taj Mahal",
        url: "./assets/mini/taj_mahal.png",
      },
      {
        id: "hungria",
        title: "Budapest",
        url: "./assets/mini/budapest.jpg",
      },

      {
        id: "francia",
        title: "Torre Eiffel",
        url: "./assets/mini/eiffel_tower.jpg",
      },
      {
        id: "eu",
        title: "Nueva York",
        url: "./assets/mini/new_york_city.png",
      },
    ];
    let previousXPosition = -60;

    for (var item of miniRef) {
      const posX = previousXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      previousXPosition = posX;

      // Elemento de borde
      const borderEl=this.createBorder(position,item.id)
      
      // Elemento de miniatura
      const miniEl=this.createMini(item)
      borderEl.appendChild(miniEl)
     
      // Elemento del texto del título
      const titleEl=this.createTitle(position,item)
      borderEl.appendChild(titleEl)
      
      this.placesContainer.appendChild(borderEl);
    }
  },
  createBorder: function(position,id){
    const entityEl=document.createElement("a-entity")
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "ring",
      radiusInner: 9,
      radiusOuter: 10,
    });
    entityEl.setAttribute("position", position);
    entityEl.setAttribute("material", {
      color: "#870000",
      opacity: 1,
    });
    entityEl.setAttribute("cursor-listener",{})
    return entityEl
  },
  createMini: function(item){
    const entityEl=document.createElement("a-entity")
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "circle",
      radius: 9,
    });
    entityEl.setAttribute("material", { src: item.url });
    return entityEl
  },
  createTitle: function(position,item){
    const entityEl=document.createElement("a-entity")
    entityEl.setAttribute("text", {
      font: "exo2bold",
      align: "center",
      width: 100,
      color: "#FFFFFF",
      value: item.title,
    });
    const elPosition = position;
    elPosition.y = -20;
    entityEl.setAttribute("position", elPosition);
    entityEl.setAttribute("visible", true);
    return entityEl
  }
});
