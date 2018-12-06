console.log("menu is initial");
var menu = {
    initial: function() {
        this.menuIcon = document.getElementById("menu_icon");
        this.element = document.getElementById("menu");
        this.listMenuLink = {
            KPI: "/kpi",
            Layout: "/layout",
            Zone: "/total-line-status",
            Line: "/line-status",
            CCTV: "/cctv",
            Report: "/report",
            Download: "/download",
            Test: "http://107.113.193.12:4000/test"
        }
        this.addEvents();
    },
    addEvents: function() {
        var self = this;
        this.menuIcon.addEventListener("click", function() {
            //self.element.classList.add("open");
        });
        this.element.addEventListener("click", function(e) {
            var id = e.target.id;
            //console.log(id);
            if (id === "menu") {
                self.element.classList.remove("open");
            } else if (e.target.className.indexOf("item") > -1) {
                //console.log("click menu item");
                location.href = self.listMenuLink[e.target.innerText];
            }
            e.stopPropagation();
        });
    },
    setActive: function(number) {
        this.element.setAttribute("selected", number);
    }
}
menu.initial();