AFRAME.registerComponent("cursor-listener", {
    schema: {
        selectedItemId: { type: "string", default: "" }
    },
    init: function () {
        this.handleMouseEnterEvent()
        this.handleMouseLeaveEvent()
        this.handleClickEvent()
    },
    handlePlaces: function () {
        const id = this.el.getAttribute("id")
        const placesId = ["india", "hungria", "francia", "eu"]
        if (placesId.includes(id)) {
            const placeContainer = document.querySelector("#places-container")
            placeContainer.setAttribute("cursor-listener", {
                selectedItemId: id
            })
            this.el.setAttribute("material", { color: "#000000", opacity: 1 })
        }
    },
    handleMouseEnterEvent: function () {
        this.el.addEventListener("mouseenter", () => {
            this.handlePlaces()
            const cursor = document.querySelector("#camera-cursor")
            cursor.setAttribute("material", { color: "#000000", opacity: "1" })
        })
    },
    handleMouseLeaveEvent: function () {
        this.el.addEventListener("mouseleave", () => {
            const { selectedItemId } = this.data
            if (selectedItemId) {
                const el = document.querySelector(`#${selectedItemId}`)
                const id = el.getAttribute("id")
                if (id == selectedItemId) {
                    el.setAttribute("material", { color: "#870000", opacity: 1 })
                }
            }
            const cursor = document.querySelector("#camera-cursor")
            cursor.setAttribute("material", { color: "#FFFFFF", opacity: "1" })
        })
    },
    handleClickEvent: function () {
        this.el.addEventListener("click", evt => {
            const placesContainer = document.querySelector("#places-container")
            const { state } = placesContainer.getAttribute("tour")
            if (state == "places-list") {
                const id = this.el.getAttribute("id")
                const placesId = ["india", "hungria", "francia", "eu"]
                if (placesId.includes(id)) {
                    placesContainer.setAttribute("tour", {
                        selectedCard: id,
                        state: "view"
                    })
                }
            }
            if(state=="view"){
                this.handleViewState()
            }
            if(state=="change-view"){
                this.handleViewState()
            }
        })
    },
    handleViewState: function () {
        const el = this.el;

        const id = el.getAttribute("id");

        const placesContainer = document.querySelector("#places-container");

        const { selectedItemId } = placesContainer.getAttribute("cursor-listener");

        // Mantener todas las imágenes con el ID de las imágenes más la extensión .jpg
        const sideViewPlacesId = ["place-1", "place-2", "place-3", "place-4"];

        if (sideViewPlacesId.includes(id)) {

            placesContainer.setAttribute("tour", {
                state: "change-view"
            });

            const skyEl = document.querySelector("#main-container");

            // Establecer la imagen de 360 grados al elemento del cielo.
            skyEl.setAttribute("material", {
                src: `../assets/360_images/${selectedItemId}/${id}.jpg`,
                color: "#fff"
            });

        }
    },
})