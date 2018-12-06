var sql = require('mssql');

exports.lineData = {
    isAllLinesConfigSet: false,
    tray: {
        trayNo: 10,
        trayRows: 2,
        trayCols: 3
    },
    cncStates: {
        'PROCESS': 0,
        'WARMUP': 1,
        'STANDBY': 2,
        'ALARM': 3,
        'NOSIGNAL': 4,
        'JIGSETUP': 7,
    },
    robotStates: {
        'RUN': 0,
        'READY': 1,
        'STOP': 2,
        'ALARM': 3,
        'MANUAL': 4
    }
}

exports.databaseConfig = {
    user: 'aligo',
    password: 'aligo',
    server: '107.114.38.103', //SEVT
    //server: '10.240.245.44',      //개발서버
    //database: 'ALIGO_Profiler_CNC',
    database: 'ALIGO_CNC_V2',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    },
    connectionTimeout: 300000,
    requestTimeout: 360000,
    pool: {
        idleTimeoutMillis: 300000,
        max: 100
    }
};

exports.procedures = {
    blackBoxIp: "usp_ajax__svmc_BlackboxIP_get",
    linesList: "usp_ajax__svmc_BtnLine_get",
    lineGroups: "usp_ajax_BtnLineGroup_get",
    kpi: "usp_ajax__svmc_KPI_get",
    allLines: "usp_ajax__svmc_LineStatus_get_new",
    mkPhotos: "usp_ajax__svmc_MKPhoto_get",
    reportWeek: "usp_ajax__svmc_ReportWeek_get",
    totalLines: "usp_ajax__svmc_TotalLineStatus_get_new2",
    robotStatus: 'usp_ajax__svmc_LineStatus_get_new_sub_robot_status',
    cncState: "usp_ajax__svmc_LineStatus_get_new_sub_CNC_state",
    allLineConfig: 'usp_ajax__svmc_CNCID_TO_RobotLineCode_get',
    alarmInfo: 'usp_ajax__svmc_RCS_ALARM_INFOR_get'
}

exports.redisKeys = {
    kpi: 'kpi',
    totalLinesGroups: 'total_lines_groups',
    totalLinesSummary: {
        keyName: 'total_lines_summary',
        keyFields: ['GroupID', 'ID']
    },
    totalLinesCnc: {
        keyName: 'total_lines_cnc',
        keyFields: ['GroupID', 'ID']
    },
    totalLinesCncRunRate: {
        keyName: 'total_lines_cnc_run_rate',
        keyFields: ['GroupID', 'ID']
    },
    totalLinesRobotRunRate: {
        keyName: 'total_line_robot_run_rate',
        keyFields: ['GroupID', 'ID']
    },
    totalLinesTitle: {
        keyName: 'total_lines_title',
        keyFields: ['ID']
    },
    lineCodeList: 'line_code_list',
    lineSummary: {
        keyName: 'line_summary',
        keyFields: ['ID']
    },
    lineRobotTransfer: {
        keyName: 'line_robot_transfer',
        keyFields: ['ID']
    },
    lineCnc: 'line_cnc',
    lineMotion: {
        keyName: 'line_motion',
        keyFields: ['ID']
    },
    lineTray: {
        keyName: 'line_tray',
        keyFields: ['ID']
    },
    lineAlarm: 'line_alarm',
    lineRealTime: 'line_real_time',
    alarmListConfig: 'alarm_list_config'
}

exports.rabbitConfigs = {
    rabbitQueueNames: {
        "S-MMAS": "S-MMAS",
        "MACHINE": "MACHINE",
        "VISA": "VISA",
        "RSS": "RSS",
        "TEST": "TEST",
        "RSSxml": "RSSxml"
    },
    exchangeName: "myExchange"
}

exports.dbQueryStatus = {
    isGettingKpi: false,
    isGettingTotalLines: false,
    isGettingAllLines: false,
    isGettingRobots: false,
    isGettingCncs: false
}