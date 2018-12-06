var listContentEle;
window.onload = function() {
    menu.setActive(1);
    listContentEle = document.getElementsByClassName("content-part")[1].querySelectorAll(".item");
    getData();
};
var timerID_update = -1;

function view_update(data) {
    var ng_def = 95;
    var achieve_def = 100;
    var vs_manual_def = 115;
    var title = data.title;
    var cur_datetime = data.cur_datetime;
    var cnc_run_rate = data.cnc_run_rate;
    var robot_run_rate = data.robot_run_rate;
    var plan_cnt = data.plan_cnt;
    var target_cnt = data.target_cnt;
    var prod_cnt = data.prod_cnt;
    var vs_manual = (data.prod_cnt / data.manual_cnt * 100).toFixed(0);
    var achieve = (prod_cnt / target_cnt * 100).toFixed(0);
    var robot_on_green = data.run_robot + '/' + data.total_robot + ' (' + (data.run_robot / data.total_robot * 100).toFixed(0) + '%)';
    var cnc_on_green = data.run_cnc + '/' + data.total_cnc + ' (' + (data.run_cnc / data.total_cnc * 100).toFixed(0) + '%)';
    var maint_cnc_count = data.maint_cnc_count;
    vs_manual = (vs_manual == Infinity) ? "N/A" : vs_manual;
    achieve = (achieve == Infinity) ? "N/A" : achieve;
    //$('#title').text(title);
    header.setTitle(title);
    //$('#cur_datetime').text(cur_datetime);
    footer.setTitle(cur_datetime);
    $('#plan_cnt').text(plan_cnt);
    $('#target_cnt').text(target_cnt);
    $('#prod_cnt').text(prod_cnt);
    $('#vs_manual').text(vs_manual);
    $('#achieve').text(achieve);
    $('#cnc_run_rate').text(cnc_run_rate);
    $('#robot_run_rate').text(robot_run_rate);
    $('#robot_on_green').text(robot_on_green);
    $('#cnc_on_green').text(cnc_on_green);
    $('#maint_cnc_count').text(maint_cnc_count);
    if (vs_manual < vs_manual_def) {
        // $('#vs_manual').css('border-color', 'orange');
        // $('#vs_manual').css('color', 'red');
        // $('#h_vs_mamual').css('border-color', 'orange');
        // $('#h_vs_mamual').css('background-color', 'orange');
        setClass(listContentEle[0], "orange");
    } else {
        // $('#vs_manual').css('border-color', 'green');
        // $('#vs_manual').css('color', 'rgb(90, 90, 90)');
        // $('#h_vs_mamual').css('border-color', 'green');
        // $('#h_vs_mamual').css('background-color', 'green');
        setClass(listContentEle[0], "green");
    }
    if (achieve < achieve_def) {
        // $('#achieve').css('border-color', 'orange');
        // $('#achieve').css('color', 'red');
        // $('#h_achieve').css('border-color', 'orange');
        // $('#h_achieve').css('background-color', 'orange');
        setClass(listContentEle[1], "orange");
    } else {
        // $('#achieve').css('border-color', 'green');
        // $('#achieve').css('color', 'rgb(90, 90, 90)');
        // $('#h_achieve').css('border-color', 'green');
        // $('#h_achieve').css('background-color', 'green');
        setClass(listContentEle[1], "green");
    }
    if (cnc_run_rate < ng_def) {
        // $('#cnc_run_rate').css('border-color', 'orange');
        // $('#cnc_run_rate').css('color', 'red');
        // $('#h_cnc_run_rate').css('border-color', 'orange');
        // $('#h_cnc_run_rate').css('background-color', 'orange');
        setClass(listContentEle[2], "orange");
    } else {
        // $('#cnc_run_rate').css('border-color', 'green');
        // $('#cnc_run_rate').css('color', 'rgb(90, 90, 90)');
        // $('#h_cnc_run_rate').css('border-color', 'green');
        // $('#h_cnc_run_rate').css('background-color', 'green');
        setClass(listContentEle[2], "green");
    }
    if (robot_run_rate < ng_def) {
        // $('#robot_run_rate').css('border-color', 'orange');
        // $('#robot_run_rate').css('color', 'red');
        // $('#h_robot_run_rate').css('border-color', 'orange');
        // $('#h_robot_run_rate').css('background-color', 'orange');
        setClass(listContentEle[3], "orange");
    } else {
        // $('#robot_run_rate').css('border-color', 'green');
        // $('#robot_run_rate').css('color', 'rgb(90, 90, 90)');
        // $('#h_robot_run_rate').css('border-color', 'green');
        // $('#h_robot_run_rate').css('background-color', 'green');
        setClass(listContentEle[3], "green");
    }
};

function setClass(element, color) {
    element.classList.remove("orange");
    element.classList.remove("green");
    element.classList.add(color);
};

function getData() {
    $.ajax({
        url: '/ajax/kpi',
        type: 'GET',
        timeout: 60000,
        success: function(data) {
            view_update(data);
            timerID_update = setTimeout(getData, 10000);
        },
        error: function(err) {
            console.log(err);
            timerID_update = setTimeout(getData, 10000);
        }
    });
};