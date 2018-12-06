var footer = {
    initial: function() {
        this.element = document.getElementById("cur_datetime");
    },
    setTitle: function(text) {
        this.element.innerText = text;
    }
};
footer.initial();