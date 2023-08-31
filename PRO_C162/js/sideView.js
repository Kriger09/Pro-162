AFRAME.registerComponent("place-side-view", {
    init: function(){
        this.createPlaces()
    },
    tick: function(){
        const placesContainer=document.querySelector("#places-container")
        const {state}=placesContainer.getAttribute("tour")
        if(state=="view"||state=="change-view"){
            this.el.setAttribute("visible",true)
        }
        else{
            this.el.setAttribute("visible",false)
        }
    },
    createPlaceMini: function (position, id) {
        const entityEl = document.createElement("a-entity")
        entityEl.setAttribute("id", `place-${id}`);
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("geometry", {
            primitive: "circle",
            radius: 2.5,
        });
        entityEl.setAttribute("position", position);
        entityEl.setAttribute("material", {
            src: "../assets/helicopter.png",
            opacity: 0.9,
        });
        entityEl.setAttribute("cursor-listener", {})
        return entityEl
    },
    createPlaces: function(){
        const sideViewContainer=document.querySelector("#side-view-container")
        var preX=-150
        var preY=30
        for(var i=1;i<=4;i++){
            const position={
                x:(preX+=50),
                y:(preY+=2),
                z:-40
            }
            const entityEl=this.createPlaceMini(position,i)
            sideViewContainer.appendChild(entityEl)
        }
    }
})