const NUM_OF_CNCS_PER_ROW = 12;
const NG_DEF = 95;
const OBJ_ROBOT_STATE_COLOR = {
    process: '#529d1e', //RUN, Process
    standby: '#3dc5c4', //READY, Standby
    warmup: '#ffae00', //STOP, WARMUP
    toolChange: '#008bff', //tool-change
    alarm: '#e53935', //ALARM, Alarm
    robotAlarm: '#f86899',
    noSignal: '#607d8b', //MANUAL, No signal
    jigSetup: '#00a3d5',
    warning: '#bc52c3',
    normal: '#37474f',
    preCall: '#2b6205',
    robotCall: '#ce6720',
    probeErr: '#067091',
    lastMachin: '#a90e0e',
    noCall: '#5d1e61'
}
const ARR_ROBOT_STATE_COLOR = [
    OBJ_ROBOT_STATE_COLOR.process,
    OBJ_ROBOT_STATE_COLOR.standby,
    OBJ_ROBOT_STATE_COLOR.warmup,
    OBJ_ROBOT_STATE_COLOR.alarm,
    OBJ_ROBOT_STATE_COLOR.noSignal,
    OBJ_ROBOT_STATE_COLOR.noSignal,
    OBJ_ROBOT_STATE_COLOR.noSignal
];
const ARR_STATUS_MAIN_COLOR = [
    [
        'process', 'warmup', 'standby', 'alarm', 'nosignal', 'robot-alarm',
        'tool-change', 'jig-setup', 'nosignal'
    ],
    [
        OBJ_ROBOT_STATE_COLOR.process,
        OBJ_ROBOT_STATE_COLOR.warmup,
        OBJ_ROBOT_STATE_COLOR.standby,
        OBJ_ROBOT_STATE_COLOR.alarm,
        OBJ_ROBOT_STATE_COLOR.noSignal,
        OBJ_ROBOT_STATE_COLOR.robotAlarm,
        OBJ_ROBOT_STATE_COLOR.toolChange,
        OBJ_ROBOT_STATE_COLOR.jigSetup,
        OBJ_ROBOT_STATE_COLOR.noSignal
    ]
];