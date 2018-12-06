const OBJ_COLORS = {
    ngColor: '#d50000',
    normalColor: '#424242',
    ngBorder: '#ffad00',
    normalBorder: '#529d1e',
    rbStateNormal: '#529d1e'
}
var updateViewTimeOut;
var ZoneHandler = {
    initial: function() {
        this.groupId = undefined;
        this.getGroudId();
        this.initElements();
        this.lines = {};
        this.lineBoxes.innerHTML = '';
    },
    getGroudId: function() {
        let url = document.URL;
        let splitUrl = url.split('/');
        for (let i = 0; i < splitUrl.length; i++) {
            if (splitUrl[i] == 'total-line-status') {
                if (splitUrl[i + 1]) {
                    this.groupId = splitUrl[i + 1];
                    return;
                }
            }
        }
    },
    initElements: function() {
        //total line summary
        this.planCnt = document.getElementById('plan_cnt');
        this.targetCnt = document.getElementById('target_cnt');
        this.totalProd = document.getElementById('total_prod');
        this.achieveRate = document.getElementById('achieved_rate');
        this.cncRunRate = document.getElementById('cnc_run_rate');
        this.robotUtil = document.getElementById('robot_util');
        this.lineBoxes = document.getElementById('lines-boxes');
    },
    generateLineBox: function(lineData) {
        if (!lineData) return;
        let lineCode = lineData.ID;
        let bordId = lineCode + '_border';
        let nameId = lineCode + '_name';
        let prodId = lineCode + '_prod';
        let achiId = lineCode + '_achieve';
        let cncUtil = lineCode + '_cnc_util';
        let robotUtil = lineCode + '_robot_util';
        let runCnc = lineCode + '_run_cnc';
        let robotState = lineCode + '_robot_state';
        this.lines[lineCode] = {};
        this.lines[lineCode]['cncs'] = {};
        this.lines[lineCode]['RobotLineCode'] = lineData.RobotLineCode;
        let elem;
        let child;
        let li = this.createElem('li', bordId, 'line-box');
        //Name
        elem = this.createElem('div', nameId, 'box-name', lineData.LineName);
        this.lines[lineCode][nameId] = elem;
        li.appendChild(elem);
        //Product
        child = '<div class="title">Prod</div>';
        child = child + '<div id="' + prodId + '" class="value"></div>';
        elem = this.createElem('div', prodId, 'box-row', child);
        this.lines[lineCode][prodId] = elem.childNodes[1];
        li.appendChild(elem);
        //Achieve
        child = '<div class="title">Achieve</div>';
        child = child + '<div id="' + achiId + '" class="value"></div>';
        elem = this.createElem('div', achiId, 'box-row', child);
        this.lines[lineCode][achiId] = elem.childNodes[1];
        li.appendChild(elem);
        //CNC Util
        child = '<div class="title">CNC Util</div>';
        child = child + '<div id="' + cncUtil + '" class="value"></div>';
        elem = this.createElem('div', cncUtil, 'box-row', child);
        this.lines[lineCode][cncUtil] = elem.childNodes[1];
        li.appendChild(elem);
        //Robot Util
        child = '<div class="title">Robot Util</div>';
        child += '<div class="value">';
        child = child + '<span id="' + robotUtil + '"></span>';
        child = child + '<div id="' + robotState + '" class="robot-state"></div></div>';
        elem = this.createElem('div', robotUtil, 'box-row', child);
        this.lines[lineCode][robotUtil] = elem.childNodes[1].childNodes[0];
        this.lines[lineCode][robotState] = elem.childNodes[1].childNodes[1];
        li.appendChild(elem);
        //Run CNC
        child = '<div class="title">Run CNC</div>';
        child = child + '<div id="' + runCnc + '" class="value"></div>';
        elem = this.createElem('div', runCnc, 'box-row', child);
        this.lines[lineCode][runCnc] = elem.childNodes[1];
        li.appendChild(elem);
        //CNC grid
        elem = this.createElem('div', undefined, 'box-cncs');
        let ul = document.createElement('ul');
        //Append line left
        for (let l = 1; l <= NUM_OF_CNCS_PER_ROW; l++) {
            let liId = lineCode + '_l_' + l;
            let liTag = this.createElem('li', liId, 'cnc empty', '--')
            this.lines[lineCode]['cncs']['l_' + l] = liTag;
            ul.appendChild(liTag);
        }
        //Append line right
        for (let r = 1; r <= NUM_OF_CNCS_PER_ROW; r++) {
            let liId = lineCode + '_r_' + r;
            let liTag = this.createElem('li', liId, 'cnc empty', '--')
            this.lines[lineCode]['cncs']['r_' + r] = liTag;
            ul.appendChild(liTag);
        }
        elem.appendChild(ul);
        li.appendChild(elem);
        this.lines[lineCode][bordId] = li;
        this.lineBoxes.appendChild(li);
    },
    createElem: function(tagName, idName, classList, innerHTML, cssStyle) {
        let elem = document.createElement(tagName);
        if (idName) {
            elem.setAttribute('id', idName);
        }
        if (classList) {
            elem.className = classList;
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
    },
    handleLineClick: function(e, callback) {
        if (e.target.className.indexOf("box-name") === -1) return;
        var lineId = e.target.id.split('_')[0];
        var robotLineCode = this.lines[lineId]['RobotLineCode'];
        callback(robotLineCode);
    }
}
window.onload = function() {
    ZoneHandler.initial();
    menu.setActive(3);
    getLineGroups();
    updateViewTimeOut = setTimeout(loadMainData, 1000);
    ZoneHandler.lineBoxes.onclick = function(e) {
        ZoneHandler.handleLineClick(e, function(robotLineCode) {
            window.location.href = '/line-status/' + ZoneHandler.groupId + '/' + robotLineCode;
        });
    }
}

function loadMainData() {
    clearTimeout(updateViewTimeOut);
    if (!ZoneHandler.groupId)
        ZoneHandler.groupId = '1';
    $.ajax({
        url: '/ajax/total-line-status-get/' + ZoneHandler.groupId,
        type: 'GET',
        timeout: 60000,
        success: function(data) {
            try {
                updateView(data);
            } catch (err) {
                console.log(err);
            }
            updateViewTimeOut = setTimeout(loadMainData, 1000);
        },
        error: function(err) {
            console.log(err);
            updateViewTimeOut = setTimeout(loadMainData, 1000);
        }
    });
}

function updateView(data) {
    header.setTitle(data.title.title);
    footer.setTitle(data.title.cur_datetime);
    let lineData = data.summary;
    let cncData = data.cncRunRate;
    let robotData = data.robotRunRate;
    let status = data.cncList;
    let lineCode;
    let bordId;
    let prodId;
    let achiId;
    let cncUtil;
    let robotUtil;
    let runCnc;
    let robotState;
    //Lines data
    let totalProd, totalTarget, totalPlan;
    if (!ZoneHandler.lines[lineData[0].ID]) {
        lineData = lineData.sort(function(a, b) {
            return a.LineName > b.LineName;
        });
    }
    for (let i = 0; i < lineData.length; i++) {
        lineCode = lineData[i].ID;
        bordId = lineCode + '_border';
        prodId = lineCode + '_prod';
        achiId = lineCode + '_achieve';
        robotUtil = lineCode + '_robot_util';
        runCnc = lineCode + '_run_cnc';
        if (!ZoneHandler.lines[lineCode]) {
            ZoneHandler.generateLineBox(lineData[i]);
        }
        totalProd += lineData[i].prod_cnt;
        totalTarget += lineData[i].target_cnt;
        totalPlan += lineData[i].plan_cnt;
        let lineAchieveRate = 0;
        if (lineData[i].prod_cnt > 0)
            lineAchieveRate = lineData[i].prod_cnt / lineData[i].target_cnt * 100;

        if (lineAchieveRate == 'Infinity') lineAchieveRate = 'NaN'
        else lineAchieveRate = lineAchieveRate.toFixed(1);

        if (lineAchieveRate < NG_DEF) {
            ZoneHandler.lines[lineCode][achiId].style.color = OBJ_COLORS.ngColor;
            ZoneHandler.lines[lineCode][bordId].style['border-color'] = OBJ_COLORS.ngBorder;
        } else {
            ZoneHandler.lines[lineCode][achiId].style.color = OBJ_COLORS.normalColor;
            ZoneHandler.lines[lineCode][bordId].style['border-color'] = OBJ_COLORS.normalBorder;
        }

        ZoneHandler.lines[lineCode][prodId].innerHTML = lineData[i].prod_cnt;
        ZoneHandler.lines[lineCode][achiId].innerHTML = lineAchieveRate + '%';
        ZoneHandler.lines[lineCode][runCnc].innerHTML = lineData[i].run_cnc + '/' + lineData[i].cnc_count + ' (' + lineData[i].maint_cnc_count + ')';
        // if (data[i].robot_call_cnt >= 5)
        //     ZoneHandler.lines[lineCode][robotUtil].style['background-color'] = 'lightgreen';
        // else
        //     ZoneHandler.lines[lineCode][robotUtil].style['background-color'] = 'skyblue';
    }
    //cnc data
    let totalCncOp = 0;
    for (let i = 0; i < cncData.length; i++) {
        lineCode = cncData[i].ID;
        bordId = lineCode + '_border';
        cncUtil = lineCode + '_cnc_util';
        if (cncData[i].cnc_run_rate < NG_DEF) {
            ZoneHandler.lines[lineCode][cncUtil].style.color = OBJ_COLORS.ngColor;
            ZoneHandler.lines[lineCode][bordId].style['border-color'] = OBJ_COLORS.ngBorder;
        } else {
            ZoneHandler.lines[lineCode][cncUtil].style.color = OBJ_COLORS.normalColor;
        }
        ZoneHandler.lines[lineCode][cncUtil].innerHTML = cncData[i].cnc_run_rate + '% (' + cncData[i].cnc_run_rate_process + ')';
        totalCncOp += cncData[i].cnc_run_rate;
    }
    //Robot data
    let totalRobotOp = 0,
        loopCnt = 0;
    for (let j = 0; j < robotData.length; j++) {
        lineCode = robotData[j].ID;
        bordId = lineCode + '_border';
        robotUtil = lineCode + '_robot_util';
        robotState = lineCode + '_robot_state';
        if (robotData[j].robot_run_rate < NG_DEF) {
            ZoneHandler.lines[lineCode][robotUtil].style.color = OBJ_COLORS.ngColor;
            ZoneHandler.lines[lineCode][bordId].style['border-color'] = OBJ_COLORS.ngBorder;
        } else {
            ZoneHandler.lines[lineCode][robotUtil].style.color = OBJ_COLORS.normalColor;
        }
        ZoneHandler.lines[lineCode][robotState].style['background-color'] = ARR_ROBOT_STATE_COLOR[robotData[j].robot_status];
        totalRobotOp += robotData[j].robot_run_rate;
        loopCnt++;
    }
    let totalAchieve = totalProd / totalTarget * 100;
    totalCncOp = totalCncOp / loopCnt;
    totalRobotOp = totalRobotOp / loopCnt;
    ZoneHandler.planCnt.innerText = totalPlan;
    ZoneHandler.targetCnt.innerText = totalTarget;
    ZoneHandler.totalProd.innerText = totalProd;
    ZoneHandler.achieveRate.innerText = totalAchieve.toFixed(1) + '%';
    ZoneHandler.cncRunRate.innerText = totalCncOp.toFixed(1) + '%';
    ZoneHandler.robotUtil.innerText = totalRobotOp.toFixed(1) + '%';
    if (totalAchieve < NG_DEF)
        ZoneHandler.achieveRate.style.color = OBJ_COLORS.ngColor;
    else
        ZoneHandler.achieveRate.style.color = OBJ_COLORS.normalColor;
    if (totalCncOp < NG_DEF)
        ZoneHandler.cncRunRate.style.color = OBJ_COLORS.ngColor;
    else
        ZoneHandler.cncRunRate.style.color = OBJ_COLORS.normalColor;
    if (totalRobotOp < NG_DEF)
        ZoneHandler.robotUtil.style.color = OBJ_COLORS.ngColor;
    else
        ZoneHandler.robotUtil.style.color = OBJ_COLORS.normalColor;
    for (let k = 0; k < status.length; k++) {
        let lineId = status[k].ID.split('-')[0];
        let id = status[k].cnc_id.replace('#', '');
        ZoneHandler.lines[lineId]['cncs'][id].style['background-color'] = ARR_STATUS_MAIN_COLOR[1][status[k].status_main];
        ZoneHandler.lines[lineId]['cncs'][id].innerText = status[k].cnc_no;
    }
    data = null;
}

function getLineGroups() {
    $.ajax({
        url: '/ajax/groups-list',
        type: 'GET',
        timeout: 60000,
        success: function(data) {
            let groupList = [];
            for (let i = 0; i < data.length; i++) {
                let obj = {};
                obj.id = data[i].id;
                obj.name = data[i].name;
                groupList.push(obj);
            }
            if (!ZoneHandler.groupId)
                ZoneHandler.groupId = groupList[0].id;
            header.addData(groupList);
            header.addDropdownClickCallback(function(id) {
                window.location.href = "/total-line-status/" + id;
            });
        },
        error: function(err) {
            console.log(err);
            setTimeout(getLineGroups, 1000);
        }
    });
}