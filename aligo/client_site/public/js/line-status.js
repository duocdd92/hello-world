const NUM_OF_TRAYS = 10;
const TRAY_ROWS = 2;
const TRAY_COLS = 3;
const OBJ_COMMON_COLOR = {
    ngProdCnt: '#d50000',
    normalProdCnt: '#184D7A',
    trayBg: '#3dc5c4',
    layoutBg: '#ffffff'
}
const ARR_STATUS_SUB_COLOR = [
    OBJ_ROBOT_STATE_COLOR.lastMachin,
    OBJ_ROBOT_STATE_COLOR.probeErr,
    OBJ_ROBOT_STATE_COLOR.noCall,
    OBJ_ROBOT_STATE_COLOR.robotCall,
    OBJ_ROBOT_STATE_COLOR.preCall,
    OBJ_ROBOT_STATE_COLOR.normal
];
var svg;
var w = 648;
var h = 280;
var updateViewTimeOut;
var Elements = {
    initial: function() {
        this.lineCode = undefined;
        this.groupId = undefined;
        this.getLineCode();
        this.initElements();
        this.generateCncList();
        this.generateTrays();
    },
    getLineCode: function() {
        let url = document.URL;
        let splitUrl = url.split('/');
        for (let i = 0; i < splitUrl.length; i++) {
            if (splitUrl[i] == 'line-status') {
                if (splitUrl[i + 1]) {
                    this.lineCode = splitUrl[i + 2];
                    this.groupId = splitUrl[i + 1];
                    return;
                }
            }
        }
    },
    initElements: function() {
        this.tray = {};
        //Line-summary
        this.planCnt = document.getElementById('plan_cnt');
        this.targetCnt = document.getElementById('target_cnt');
        this.totalProd = document.getElementById('total_prod');
        this.achieveRate = document.getElementById('achieved_rate');
        this.cncRunRate = document.getElementById('cnc_run_rate');
        this.recipe = document.getElementById('process');
        this.cycleTime = document.getElementById('cycle_time');
        this.runCNC = document.getElementById('cnc_run');
        this.prodCnc = document.getElementById('cnc_prod');
        this.robotUtil = document.getElementById('eqp_run_rate');
        //Robot
        this.robotImage = document.getElementById('robot-img');
        this.robotTrans = document.getElementById('robot-transfer');
        this.robotCurrStt = document.getElementById('robot-status');
        this.robotTransState = document.getElementById('trans-state');
        this.robotStayTime = document.getElementById('trans-stay-time');
        //Motion
        this.motion = document.getElementById('teaching');
        this.motionBegin = document.getElementById('motion-begin');
        this.motionEnd = document.getElementById('motion-end');
        //Tray
        this.trayList = document.getElementById('tray-list');
        this.trayPos = document.getElementById('tray-pos');
        //line-left, line-right
        this.lineLeft = document.getElementById('line-left');
        this.lineRight = document.getElementById('line-right');
        this.camera = document.getElementById('line-camera');
        //Robot chart
        this.robotChart = document.getElementById('d3div');
        this.d3Title = document.getElementById('d3title');
        //Keeper
        this.keeperAva = document.getElementById('keeper-ava');
    },
    generateTrays: function() {
        let elem;
        let id;
        let className;
        for (let i = NUM_OF_TRAYS; i > 0; i--) {
            id = 'tray-' + i;
            elem = document.createElement('li');
            elem.setAttribute('id', id);
            className = 'txt-ver-mid bd-b';
            if (i == 1)
                className = 'txt-ver-mid';
            elem.className = className;
            this.trayList.appendChild(elem);
            this.tray[id] = elem;
        }
        for (let j = 0; j < TRAY_ROWS; j++) {
            for (let k = 0; k < TRAY_COLS; k++) {
                id = 'tray_pos' + j + k;
                elem = document.createElement('li');
                elem.setAttribute('id', id);
                if (j == (TRAY_ROWS - 1)) {
                    className = 'txt-ver-mid bd-r';
                    if (k == (TRAY_COLS - 1))
                        className = 'txt-ver-mid';
                } else {
                    className = 'txt-ver-mid bd-r bd-b';
                    if (k == (TRAY_COLS - 1))
                        className = 'txt-ver-mid bd-b';
                }
                elem.className = className;
                this.trayPos.appendChild(elem);
                this.tray[id] = elem;
            }
        }
    },
    fillTray: function(id, isFill, val) {
        if (isFill) {
            this.tray[id].classList.add('tray-fill');
            this.tray[id].innerText = val;
        } else {
            if (this.tray[id].innerText != '') {
                this.tray[id].innerText = '';
                this.tray[id].classList.remove('tray-fill');
            }
        }
    },
    generateCncList: function() {
        this.lineLeft.innerHTML = '';
        this.lineRight.innerHTML = '';
        var li = document.createElement('li');
        li.innerHTML = '<h2>AM4-A</h2>';
        li.setAttribute('id', 'l_0');
        Elements.lineLeft.appendChild(li);
        li = document.createElement('li');
        li.setAttribute('id', 'r_0');
        li.innerHTML = '<h2>AM4-B</h2>';
        Elements.lineRight.appendChild(li);
        for (let i = 1; i <= NUM_OF_CNCS_PER_ROW; i++) {
            li = document.createElement('li');
            li.setAttribute('id', 'l_' + i);
            li.classList.add('cnc-box');
            Elements.lineLeft.appendChild(li);
            li = document.createElement('li');
            li.setAttribute('id', 'r_' + i);
            li.classList.add('cnc-box');
            Elements.lineRight.appendChild(li);
        }
    },
    createElement: function(tagName, idName, classList, innerHTML, cssStyle) {
        let elem = document.createElement(tagName);
        if (idName) {
            elem.setAttribute('id', idName);
        }
        if (classList) {
            for (let i in classList) {
                elem.classList.add(classList[i]);
            }
        }
        if (innerHTML != undefined) {
            elem.innerHTML = innerHTML;
        }
        if (cssStyle) {
            for (let s in cssStyle) {
                elem.style[s] = cssStyle[s];
            }
        }
        return elem;
    }
}
window.onload = function() {
    menu.setActive(4);
    Elements.initial();
    getLineList();
    svg = d3.select("#d3div").append("svg")
        .attr("width", w)
        .attr("height", h);
}

function loadData() {
    clearTimeout(updateViewTimeOut);
    $.ajax({
        url: '/ajax/line-status-get/' + Elements.lineCode,
        type: 'GET',
        timeout: 60000,
        success: function(data) {
            try {
                updateView(data);
            } catch (err) {
                console.log(err);
            }
            data = null;
            updateViewTimeOut = setTimeout(loadData, 1000);
        },
        error: function(err) {
            console.log(err);
            updateViewTimeOut = setTimeout(loadData, 1000);
        }
    });
}

function updateView(data) {
    lineStatus(data.summary);
    transferStatus(data.robTransfer);
    robotStatus(data.motion);
    cncStatus(data);
    drawD3(data);
    data = null;
}

function lineStatus(lineSummary) {
    if (!lineSummary.title) return;
    header.setTitle(lineSummary.title);
    footer.setTitle(lineSummary.cur_datetime);
    Elements.planCnt.innerText = lineSummary.plan_cnt;
    Elements.targetCnt.innerText = lineSummary.target_cnt;
    Elements.cncRunRate.innerText = lineSummary.cnc_run_rate + '% (' + lineSummary.cnc_run_rate_process + ')';
    Elements.robotUtil.innerText = lineSummary.eqp_run_rate + '%';
    Elements.cycleTime.innerText = lineSummary.cycle_time;
    Elements.recipe.innerText = lineSummary.process;
    if (lineSummary.cnc_run_rate < NG_DEF) {
        Elements.cncRunRate.style.color = OBJ_COMMON_COLOR.ngProdCnt;
    } else {
        Elements.cncRunRate.style.color = OBJ_COMMON_COLOR.normalProdCnt;
    }
    let trayNo = lineSummary.TrayNo;
    if (trayNo && (Elements['NumOfTrays'] == undefined || trayNo != Elements['NumOfTrays'])) {
        if (trayNo == 0) trayNo = 1;
        Elements['NumOfTrays'] = trayNo;
        for (let t = NUM_OF_TRAYS; t > 0; t--) {
            if (t <= trayNo)
                Elements.fillTray('tray-' + t, true, t);
            else
                Elements.fillTray('tray-' + t, false);
        }
    }
    let row = lineSummary.RowPosition;
    let col = lineSummary.ColumnPosition;
    if (!row) row = 0;
    if (!col) col = 0;
    let trayId = 'tray_pos' + row + col;
    if (!Elements['activeTrayPos']) {
        Elements['activeTrayPos'] = trayId;
        Elements.fillTray(trayId, true, '' + row + col);
    }
    if (trayId != Elements['activeTrayPos']) {
        Elements.fillTray(Elements['activeTrayPos'], false);
        Elements['activeTrayPos'] = trayId;
        Elements.fillTray(trayId, true, '' + row + col);
    }
}

function transferStatus(transfer) {
    if (!transfer) return;
    var transferX = -1 - (206 * Number(transfer.robot_top_view));
    Elements.robotImage.style.backgroundPositionX = transferX + 'px';
    var pos = Number(8.5 + (transfer.Arrival - 1) * 7.2) * 5;
    let translateX = 'translate3D(' + pos + '%, 0, 0)';
    if (transfer.IsMoving == 'N') {
        Elements.robotTrans.style['transform'] = translateX;
        Elements.robotTrans.style['-webkit-transform'] = translateX;
        Elements.robotTrans.style['-moz-transform'] = translateX;
        Elements.robotTrans.style['-o-transform'] = translateX;
        Elements.robotTrans.style['-ms-transform'] = translateX;
    } else {
        let style = window.getComputedStyle(Elements.robotTrans, null);
        let imgPos = style.getPropertyValue('background-position-x');
        if (imgPos == '0px' || imgPos == '-1px' || imgPos == '0%') {
            Elements.robotTrans.style['transform'] = translateX;
            Elements.robotTrans.style['-webkit-transform'] = translateX;
            Elements.robotTrans.style['-moz-transform'] = translateX;
            Elements.robotTrans.style['-o-transform'] = translateX;
            Elements.robotTrans.style['-ms-transform'] = translateX;
        }
    }
    var stayTime = setTimeStr(transfer);
    Elements.robotStayTime.innerText = stayTime;
    var state = transfer.CurState;
    if (state === 'OK') state = 'RUN';
    Elements.robotCurrStt.style.backgroundColor = ARR_ROBOT_STATE_COLOR[transfer.CurStateCode];
    Elements.robotCurrStt.innerText = transfer.moving_desc;
    if (state === 'ALARM') state += ' ' + transfer.AlarmDesc;
    Elements.robotTransState.style.backgroundColor = ARR_ROBOT_STATE_COLOR[transfer.CurStateCode];
    Elements.robotTransState.innerText = state;
}

function setTimeStr(transfer) {
    var strNum;
    var hh, mm, ss;
    hh = parseInt(transfer.tran_stay_time / 3600);
    if (hh < 10) hh = '0' + hh;
    mm = parseInt((transfer.tran_stay_time % 3600) / 60);
    if (mm < 10) mm = '0' + mm;
    ss = parseInt(transfer.tran_stay_time % 60);
    if (ss < 10) ss = '0' + ss;
    strNum = transfer.WorkingPos + ' ' + hh + ':' + mm + ':' + ss;
    return strNum;
}

function robotStatus(motion) {
    if (!motion) return;
    Elements.motion.innerText = motion.teaching;
    Elements.motionBegin.innerText = motion.motion_begin;
    Elements.motionEnd.innerText = motion.motion_end;
}

function cncStatus(data) {
    if (data.length === 0) return;
    var cncData = data.cncs;
    var targetCnt = data.summary.target_cnt;
    var lineStatus = data.summary;
    var totalProd = 0,
        cncTotal = 0,
        cncRun = 0;
    var lineNameLeft = '';
    var lineNameRight = ''
    for (let c = 0; c < cncData.length; c++) {
        let cnc = cncData[c];
        let statusMainNum = Number(cnc.status_main);
        let alarmMsgElem = '';
        let id = cnc.cnc_id.replace('#', '');
        let cncId = id + '_cnc';
        if (!Elements[cncId])
            Elements[cncId] = document.getElementById(id);
        addMessageBox(Elements[cncId], cnc, id);
        addSubCNCBox(Elements[cncId], cnc, id);
        totalProd += Number(cnc.Prod);
        cncTotal++;
        if (statusMainNum == 0 || statusMainNum == 2) cncRun++;
        if (cnc.LineDir == 'l')
            lineNameLeft = cnc.LineName;
        else
            lineNameRight = cnc.LineName;
    }
    if (!Elements['line_name']) {
        document.getElementById('l_0').innerHTML = '<h2>' + lineNameLeft + '</h2>';
        document.getElementById('r_0').innerHTML = '<h2>' + lineNameRight + '</h2>';
        Elements['line_name'] = true;
    }
    Elements.totalProd.innerText = totalProd;
    var achieve = totalProd / targetCnt * 100;
    if (achieve == 'Infinity') achieve = 'NaN'
    else achieve = achieve.toFixed(1);
    Elements.achieveRate.innerText = achieve + '%';
    Elements.prodCnc.innerText = (totalProd / cncTotal).toFixed(1);
    Elements.runCNC.innerText = cncRun + '/' + cncTotal + ' (' + lineStatus.maint_cnc_count + ')';
    if (achieve < NG_DEF) {
        Elements.achieveRate.style.color = OBJ_COMMON_COLOR.ngProdCnt;
    } else {
        Elements.achieveRate.style.color = OBJ_COMMON_COLOR.normalProdCnt;
    }
}

function addMessageBox(cncElem, cncItem, id) {
    let subId = id + '_tooltip';
    if (!Elements[subId]) {
        let div = document.createElement('div');
        div.setAttribute('id', subId);
        cncElem.appendChild(div);
        Elements[subId] = document.getElementById(subId);
    }
    if (cncItem.alarm_msg && (cncItem.status_main === 3 || cncItem.status_main === 5 || cncItem.status_main === 6 || cncItem.status_main === 8)) {
        let msgText = '<p>' + cncItem.alarm_msg + '</p>';
        let clColor = ARR_STATUS_MAIN_COLOR[0][cncItem.status_main];
        if (cncItem.LineDir == 'l') {
            Elements[subId].className = 'tooltip arrow-down ' + clColor;
        } else {
            Elements[subId].className = 'tooltip arrow-up ' + clColor;
        }
        Elements[subId].innerHTML = msgText;
    } else if (Elements[subId].innerHTML != '') {
        Elements[subId].className = '';
        Elements[subId].innerHTML = '';
    }
}

function addSubCNCBox(cncElem, cncItem, id) {
    let prodBg = ARR_STATUS_MAIN_COLOR[1][Number(cncItem.status_main)];
    let idBg = ARR_STATUS_SUB_COLOR[Number(cncItem.status_sub)];
    let prodId = id + '_cnc_prod';
    let timeId = id + '_cnc_time';
    let posId = id + '_cnc_pos';
    if (!Elements[prodId]) {
        if (cncItem.LineDir == 'l') {
            cncElem.appendChild(Elements.createElement('div', id + '_cnc_prod', ['cnc-prod-cnt']));
            cncElem.appendChild(Elements.createElement('div', id + '_cnc_time', ['cnc-time']));
            cncElem.appendChild(Elements.createElement('div', id + '_cnc_pos', ['cnc-pos']));
        } else {
            cncElem.appendChild(Elements.createElement('div', id + '_cnc_pos', ['cnc-pos']));
            cncElem.appendChild(Elements.createElement('div', id + '_cnc_time', ['cnc-time']));
            cncElem.appendChild(Elements.createElement('div', id + '_cnc_prod', ['cnc-prod-cnt']));
        }
        Elements[prodId] = document.getElementById(prodId);
        Elements[timeId] = document.getElementById(timeId);
        Elements[posId] = document.getElementById(posId);
        Elements[posId].innerText = cncItem.CNCNo;
    }
    Elements[prodId].innerText = cncItem.Prod;
    Elements[prodId].style['background-color'] = prodBg;
    Elements[timeId].innerText = cncItem.OnTime;
    Elements[timeId].style['background-color'] = prodBg;
    Elements[posId].style['background-color'] = idBg;
}
var alarmCntOld = "",
    alarm_dataOld = "";
var alarm_data;

function drawD3(data) {
    var a = JSON.stringify(data.alarmList);
    var b = JSON.stringify(data.alarmMsg);
    if (a == alarmCntOld && b == alarm_dataOld) {
        a = null;
        b = null;
        data = null;
        return;
    }
    var alarmCnt = data.alarmList;
    alarm_data = data.alarmMsg;
    alarmCntOld = a;
    alarm_dataOld = b;
    var dataset = [],
        items = [];
    var totalAlarmCnt = 0;
    for (let i in alarmCnt) {
        items.push(alarmCnt[i].AlarmType);
        dataset.push(alarmCnt[i].AlarmCnt);
        totalAlarmCnt += Number(alarmCnt[i].AlarmCnt);
    }
    Elements.d3Title.innerText = 'Robot Alarm: ' + totalAlarmCnt;
    var barPadding = 20;
    var alarm_length = $("text.alarm_msg").length;
    if (alarm_length === 0) {
        d3.selectAll("rect").remove();
        d3.selectAll("g").remove();
        d3.selectAll("text.alarm_cnt").remove();
        var xScale = d3.scaleLinear()
            .domain([0, dataset.length])
            .range([10, w]);
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function(d) { return d; })])
            .range([0, h - 55]);
        var bar_width = w / dataset.length - barPadding;
        //if (bar_width > 40) bar_width=40;
        svg.selectAll("rect")
            .data(alarmCnt)
            .enter()
            .append("rect")
            .attr("fill", OBJ_COMMON_COLOR.trayBg)
            .attr("x", function(d, i) { return xScale(i); })
            .attr("y", function(d) { return h - yScale(d.AlarmCnt) - 30; })
            .attr("width", bar_width)
            .attr("height", function(d) { return yScale(d.AlarmCnt); })
            .on("mouseover", displayAlarm)
            .on("mouseout", function() {
                svg.selectAll("text.alarm_msg")
                    .data([])
                    .exit()
                    .remove();
            });

        function displayAlarm(d) {
            var alarm_msg = alarm_data.filter(function(el) {
                return el.AlarmType === d.AlarmType;
            });
            svg.selectAll("text.alarm_msg")
                .data(alarm_msg)
                .enter()
                .append("text")
                .style("pointer-events", "none")
                .attr("class", "alarm_msg")
                .attr("font-size", "15px")
                .attr("fill", "red")
                .attr("x", 0)
                .attr("y", function(d, i) { return i * 20 + 20; })
                .text(function(d) { return d.msg; });
            alarm_msg = null;
        };
        svg.selectAll("text.alarm_cnt")
            .data(dataset)
            .enter()
            .append("text")
            .attr("class", "alarm_cnt")
            .attr("font-size", "20px")
            .attr("font-weight", "bold")
            .attr("text-anchor", "middle")
            .text(function(d) { return d; })
            .attr("x", function(d, i) { return xScale(i) + ((xScale(1) - barPadding) / 2); })
            .attr("y", function(d) { return h - yScale(d) - 33; });
        var x = d3.scalePoint()
            .domain(items)
            .range([(xScale(1) / 2), w - (xScale(1) / 2)]);
        var xAxis = d3.axisBottom(x);
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (h - 20) + ")")
            .call(xAxis);
    };
    a = null;
    b = null;
    dataset = null;
    items = null;
    alarmCnt = null;
    data = null;
}

function photosGet() {
    $.ajax({
        url: '/ajax/mk-photo-get/' + Elements.lineCode,
        type: 'GET',
        timeout: 10000,
        success: function(data) {
            Elements.keeperAva.innerHTML = '';
            let li;
            window.x = data;
            for (let i in data) {
                let str = '<img src="data:image;base64,' + data[i].photo + '" alt="avatar" />';
                str = str + '<span>' + data[i].name + '</span>';
                li = document.createElement('li');
                li.innerHTML = str;
                Elements.keeperAva.appendChild(li);
            }
            data = null;
            setTimeout(photosGet, 10000);
        },
        error: function(err) {
            setTimeout(photosGet, 1000);
            console.log(err);
        }
    });
}

function getLineList() {
    if (!Elements.groupId) Elements.groupId = 1;
    $.ajax({
        url: '/ajax/lines-list/' + Elements.groupId,
        type: 'GET',
        timeout: 60000,
        success: function(data) {
            let lineList = [];
            for (let i = 0; i < data.length; i++) {
                let obj = {};
                obj.id = data[i].id;
                obj.name = data[i].name;
                lineList.push(obj);
            }
            if (!Elements.lineCode)
                Elements.lineCode = lineList[0].id;
            header.addData(lineList);
            header.addDropdownClickCallback(function(id) {
                window.location.href = '/line-status/' + Elements.groupId + '/' + id;
            });
            data = null;
            updateViewTimeOut = setTimeout(loadData, 300);
            photosGet();
            getLineCamera();
        },
        error: function(err) {
            console.log(err);
            setTimeout(getLineList, 2000);
        }
    });
}

function getLineCamera() {
    $.ajax({
        url: '/ajax/blackbox-ip-get/' + Elements.lineCode,
        type: 'GET',
        timeout: 10000,
        success: function(data) {
            Elements.camera.setAttribute('src', 'http://' + data.blackbox_ip + ':8765');
            data = null;
            setTimeout(getLineCamera, 10000);
        },
        error: function(err) {
            console.log(err);
            setTimeout(getLineCamera, 1000);
        }
    });
}