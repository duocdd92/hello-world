console.log("initial header");
var header = {
    initial: function() {
        this.element = document.getElementById("drop_down_list");
        this.titleEle = document.getElementById("header_title");
        this.listLink = {}
        this.addEvents();
    },
    addEvents: function() {
        var self = this;
        this.element.addEventListener("click", function(e) {
            var id = e.target.id;
            console.log(id);
            if (self.dropDownItemClick) {
                self.dropDownItemClick(id);
            }
            e.stopPropagation();
        });
    },
    addData: function(listData) {
        if (listData.length == 0) return;
        document.getElementsByClassName("arrow-icon")[0].classList.remove("hidden-header");
        this.element.innerHTML = "";
        for (var i = 0; i < listData.length; i++) {
            var ele = document.createElement("div");
            ele.className = "drop-down-item center";
            ele.id = listData[i].id;
            ele.innerText = listData[i].name;
            this.element.appendChild(ele);
        }
    },
    setTitle: function(title) {
        this.titleEle.innerText = title;
    },
    addDropdownClickCallback: function(callback) {
        this.dropDownItemClick = callback;
    }
}
header.initial();
var fakeData = [{ "id": 1, "name": "AMR(1)", "line_group_code": "1" }, { "id": 2, "name": "AMR(2)" }, { "id": 4, "name": "ANR(1)" }, { "id": 5, "name": "ANR(2)" }, { "id": 6, "name": "AOR(1)" }, { "id": 7, "name": "AOR(2)" }, { "id": 8, "name": "APR(1)" }, { "id": 9, "name": "APR(2)" }, { "id": 10, "name": "APR(3)" }, { "id": 11, "name": "APR(4)" }];
//header.addData(fakeData);