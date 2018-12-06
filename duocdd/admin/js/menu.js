const LOC_MENU_EXPANDING = 'isExpandingMenu';
const LOC_OBJ_SUB_EXPAND = 'subExpandMenuObject';
const LOC_OBJ_SUB_NARROW = 'subNarrowMenuObject';

var Menu = {

    initial: function() {
        this.getElements();

        let isExpand = localStorage.getItem(LOC_MENU_EXPANDING);

        if (isExpand == undefined) {
            localStorage.setItem(LOC_MENU_EXPANDING, 'true');
            isExpand = 'true';
        }

        if (isExpand == 'true')
            this.initExpandMenu();
        else
            this.initNarrowMenu();
    },

    initExpandMenu: function() {
        this.profile.style.display = 'block';

        this.navMenu.style.width = '300px';
        this.menuContainer.style.width = '300px';
        this.menuContainer.classList.remove('menu-close');
        this.menuContainer.classList.add('menu-open');

        for (let i = 0; i < this.subMenus.length; i++) {
            this.subMenus[i].classList.remove('sub-close-menu');
        }

        let subMenuObj = this.getSubMenuObj(LOC_OBJ_SUB_EXPAND);

        if (subMenuObj == null) subMenuObj = {};

        for (let i in subMenuObj) {
            if (subMenuObj[i]) {
                let element = document.getElementById(i);
                element.classList.add('none-transition');
                element.style.height = element.scrollHeight + 'px';
                element.classList.remove('none-transition');
            }
        }
    },

    initNarrowMenu: function() {
        localStorage.setItem(LOC_OBJ_SUB_NARROW, null);

        this.profile.style.display = 'none';

        this.navMenu.style.width = '70px';
        this.menuContainer.style.width = '70px';
        this.menuContainer.classList.remove('menu-open');
        this.menuContainer.classList.add('menu-close');

        for (let i = 0; i < this.subMenus.length; i++) {
            this.subMenus[i].classList.add('none-transition');
            this.subMenus[i].style.height = '0px';
            this.subMenus[i].classList.add('sub-close-menu');
            this.subMenus[i].classList.remove('none-transition');
        }
    },

    handleMenuClick: function(e) {
        let idAttr = e.target.attributes['for'];

        if (!idAttr) return;

        let id = idAttr.value;
        let subMenu = document.getElementById(id);

        let isExpand = localStorage.getItem(LOC_MENU_EXPANDING);

        let subMenuObj;
        let subMenuObjName;

        if (isExpand == 'true')
            subMenuObjName = LOC_OBJ_SUB_EXPAND;
        else
            subMenuObjName = LOC_OBJ_SUB_NARROW;

        subMenuObj = Menu.getSubMenuObj(subMenuObjName);

        if (subMenuObj == null) subMenuObj = {};

        if (subMenuObj[id] == undefined) subMenuObj[id] = false;

        if (subMenuObj[id]) {
            subMenu.style.height = '0px';
            subMenuObj[id] = false;

        } else {
            if (isExpand == 'false')
                Menu.turnOffAllSubMenus(subMenuObj);

            subMenu.style.height = subMenu.scrollHeight + 'px';
            subMenuObj[id] = true;
        }

        this.setSubMenuObj(subMenuObjName, subMenuObj);

        e.stopPropagation();
    },

    handleToggleMenu: function() {
        let isExpand = localStorage.getItem(LOC_MENU_EXPANDING);

        if (isExpand == 'true') {
            Menu.initNarrowMenu();
            isExpand = 'false';
        } else {
            Menu.initExpandMenu();
            isExpand = 'true';
        }

        localStorage.setItem(LOC_MENU_EXPANDING, isExpand);
    },

    turnOffAllSubMenus: function(obj) {
        for (let i in obj) {
            if (obj[i]) {
                let elem = document.getElementById(i);
                elem.style.height = '0px';
                obj[i] = false;
            }
        }
    },

    getSubMenuObj: function(objName) {
        return JSON.parse(localStorage.getItem(objName));
    },

    setSubMenuObj: function(objName, obj) {
        localStorage.setItem(objName, JSON.stringify(obj));
    },

    getElements: function() {
        this.profile = document.getElementById('profile');

        this.menuToggle = document.getElementById('menu-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.menuContainer = document.getElementById('menu-container');
        this.dropDownMenu = document.getElementById('drop-down-menu');

        this.subMenus = document.getElementsByClassName('sub-menu');
    }
}

window.onload = () => {
    Menu.initial();

    Menu.menuToggle.onclick = function() {
        Menu.handleToggleMenu();
    }

    Menu.dropDownMenu.onclick = function(e) {
        Menu.handleMenuClick(e);
    }

    window.onclick = function() {
        let isExpand = localStorage.getItem(LOC_MENU_EXPANDING);

        if (isExpand == 'false') {
            Menu.turnOffAllSubMenus(Menu.getSubMenuObj(LOC_OBJ_SUB_NARROW));
        }
    };
}