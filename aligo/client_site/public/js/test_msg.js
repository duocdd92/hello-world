var Message = {
    // "REQ_TIME_INFO": {
    //     "message": {
    //         "header": {
    //             "rssid": "1001",
    //             "uid": "0001",
    //             "name": "REQ_TIME_INFO",
    //             "time": "2017-07-12 14:08:09.941"
    //         },
    //         "body": null
    //     }
    // },
    "RSP_RCS_STATE": {
        "message": {
            "header": {
                "rssid": "1023",
                "uid": "2100",
                "name": "RSP_RCS_STATE",
                "time": "2017-07-13 09:26:07.897"
            },
            "body": {
                "mode": "AUTO",
                "currentlocation": "AN3-G19",
                "state": "ALARM",
                "alarmcode": "0",
                "test": "OFF"
            }
        }
    },
    "SND_CNC_STATE": {
        "message": {
            "header": {
                "rssid": "1086",
                "uid": "8038",
                "name": "SND_CNC_STATE",
                "time": "2017-07-13 09:04:03.638"
            },
            "body": {
                "cnclist": {
                    "cnc": [{
                        "id": "AN3-E10",
                        "mode": "AUTO",
                        "status": "PROCESS",
                        "statusstarttime": "2017-07-13 08:50:48",
                        "alarmmsg": "",
                        "robotcall": "OFF",
                        "precall": "OFF",
                        "nocall": "OFF",
                        "isselected": "ON",
                        "precallnow": "OFF",
                        "precalltimeout": "OFF",
                        "lastmachining": {
                            "value": "OFF",
                            "expiredtoolnumber": ""
                        },
                        "stateisnew": "OFF",
                        "eventisnew": "OFF",
                        "stlog": "",
                        "evlog": "",
                        "toolinfo": {
                            "tool": [{
                                "number": "1",
                                "limit": "520",
                                "used": "22"
                            }, {
                                "number": "2",
                                "limit": "500",
                                "used": "108"
                            }]
                        },
                        "ncfilename": "DREAM1_CNC4_R19-ROBOT.nc",
                        "processid": "",
                        "cycletime": ""
                    }]
                }
            }
        }
    },
    // "SND_CNCPICKUP_END": {
    //     "message": {
    //         "header": {
    //             "uid": "2731",
    //             "rssid": "1013",
    //             "name": "SND_CNCPICKUP_END",
    //             "time": "2017-07-13 09:25:39.507"
    //         },
    //         "body": {
    //             "cnc": "AM4-H10",
    //             "retry": {
    //                 "count": "0"
    //             }
    //         }
    //     }
    // },

    // "SND_CNCPICKUP_START": {
    //     "message": {
    //         "header": {
    //             "uid": "7341",
    //             "rssid": "1095",
    //             "name": "SND_CNCPICKUP_START",
    //             "time": "2017-07-13 10:55:44.262"
    //         },
    //         "body": {
    //             "cnc": "AO4-J15"
    //         }
    //     }
    // },
    // "SND_ERRORTRAY_END": {
    //     "message": {
    //         "header": {
    //             "uid": "2342",
    //             "rssid": "1087",
    //             "name": "SND_ERRORTRAY_END",
    //             "time": "2017-07-13 11:12:35.874"
    //         },
    //         "body": {
    //             "cnc": "AO4-Z20",
    //             "row": "1",
    //             "col": "1"
    //         }
    //     }
    // },
    // "SND_ERRORTRAY_START": {
    //     "message": {
    //         "header": {
    //             "uid": "2341",
    //             "rssid": "1087",
    //             "name": "SND_ERRORTRAY_START",
    //             "time": "2017-07-13 11:12:32.123"
    //         },
    //         "body": {
    //             "cnc": "AO4-Z20",
    //             "row": "1",
    //             "col": "0"
    //         }
    //     }
    // },
    "SND_FEEDING_END": {
        "message": {
            "header": {
                "uid": "5433",
                "rssid": "1058",
                "name": "SND_FEEDING_END",
                "time": "2017-07-13 11:24:15.330"
            },
            "body": {
                "currentlocation": "BUFFER"
            }
        }
    },
    "SND_FEEDING_START": {
        "message": {
            "header": {
                "uid": "5430",
                "rssid": "1058",
                "name": "SND_FEEDING_START",
                "time": "2017-07-13 11:24:10.343"
            },
            "body": {
                "currentlocation": "BUFFER"
            }
        }
    },
    "SND_LOAD_END": {
        "message": {
            "header": {
                "uid": "5154",
                "rssid": "1095",
                "name": "SND_LOAD_END",
                "time": "2017-07-13 09:36:11.352"
            },
            "body": {
                "currentlocation": "AO4-J09",
                "result": {
                    "value": "OK",
                    "code": ""
                }
            }
        }
    },
    "SND_LOAD_START": {
        "message": {
            "header": {
                "uid": "0192",
                "rssid": "1015",
                "name": "SND_LOAD_START",
                "time": "2017-07-13 11:01:00.358"
            },
            "body": {
                "currentlocation": "AM4-L11"
            }
        }
    },
    "SND_MOVE_END": {
        "message": {
            "header": {
                "uid": "4270",
                "rssid": "1038",
                "name": "SND_MOVE_END",
                "time": "2017-07-13 11:12:55.059"
            },
            "body": {
                "currentlocation": "AP3-M15",
                "nextlocation": "AP3-M16"
            }
        }
    },
    "SND_MOVE_START": {
        "message": {
            "header": {
                "uid": "3994",
                "rssid": "1038",
                "name": "SND_MOVE_START",
                "time": "2017-07-13 10:48:54.210"
            },
            "body": {
                "currentlocation": "AP3-M16",
                "nextlocation": "AP3-M14"
            }
        }
    },
    // "SND_ROBOT_ALARM": {
    //     "message": {
    //         "header": {
    //             "uid": "2939",
    //             "rssid": "1031",
    //             "name": "SND_ROBOT_ALARM",
    //             "time": "2017-07-13 11:11:46.380"
    //         },
    //         "body": {
    //             "cnc": "AP3-T19",
    //             "alarmcode": "5000003"
    //         }
    //     }
    // },
    // "SND_SCHEDULE_RESULT": {
    //     "message": {
    //         "header": {
    //             "uid": "0389",
    //             "rssid": "1052",
    //             "name": "SND_SCHEDULE_RESULT",
    //             "time": "2017-07-13 11:28:01.446"
    //         },
    //         "body": {
    //             "result": {
    //                 "current": "AM4-M03",
    //                 "target": "AM4-M03",
    //                 "reqtype": "NOCALL",
    //                 "rsptype": "NG",
    //                 "lastMachining": ""
    //             },
    //             "cnclist": {
    //                 "cnc": [{
    //                     "id": "AM4-N01",
    //                     "istargetable": "False",
    //                     "priority": "0",
    //                     "state": "STANDBY",
    //                     "statestarttime": "2017-07-13 11:27:22",
    //                     "isnocall": "False",
    //                     "isprecall": "False",
    //                     "isrobotcall": "False",
    //                     "islastmachining": "False",
    //                     "alarmname": "",
    //                     "isprecallnow": "False",
    //                     "isprecalltimeout": "False",
    //                     "latestprecallstarttime": "",
    //                     "latestprecallduringtime": "0",
    //                     "isselected": "True",
    //                     "direction": "RIGHT",
    //                     "distance": "6280",
    //                     "movingtime": "6",
    //                     "decisiontype": ""
    //                 }]
    //             }
    //         }
    //     }
    // },
    "SND_TRAYCHANGE_END": {
        "message": {
            "header": {
                "uid": "0379",
                "rssid": "1047",
                "name": "SND_TRAYCHANGE_END",
                "time": "2017-07-13 11:24:14.278"
            },
            "body": {
                "trayno": "7",
                "buffer": {
                    "in": "0",
                    "out": "0"
                }
            }
        }

    },
    "SND_TRAYCHANGE_START": {
        "message": {
            "header": {
                "uid": "3737",
                "rssid": "1026",
                "name": "SND_TRAYCHANGE_START",
                "time": "2017-07-13 11:28:12.838"
            },
            "body": {
                "trayno": "3",
                "buffer": {
                    "in": "0",
                    "out": "0"
                }
            }
        }
    },
    "SND_TRAYPICKUP_END": {
        "message": {
            "header": {
                "uid": "1626",
                "rssid": "1088",
                "name": "SND_TRAYPICKUP_END",
                "time": "2017-07-13 09:22:49.202"
            },
            "body": {
                "trayno": "2",
                "row": "1",
                "col": "1",
                "retry": {
                    "count": "0"
                }
            }
        }
    },
    "SND_TRAYPICKUP_START": {
        "message": {
            "header": {
                "uid": "5863",
                "rssid": "1093",
                "name": "SND_TRAYPICKUP_START",
                "time": "2017-07-13 10:48:25.846"
            },
            "body": {
                "trayno": "6",
                "row": "1",
                "col": "1"
            }
        }
    },
    "SND_UNLOAD_END": {
        "message": {
            "header": {
                "uid": "1569",
                "rssid": "1030",
                "name": "SND_UNLOAD_END",
                "time": "2017-07-13 09:25:48.463"
            },
            "body": {
                "currentlocation": "AN3-B14",
                "result": {
                    "value": "OK",
                    "code": ""
                }
            }
        }
    },
    "SND_UNLOAD_START": {
        "message": {
            "header": {
                "uid": "7415",
                "rssid": "1014",
                "name": "SND_UNLOAD_START",
                "time": "2017-07-13 09:26:23.863"
            },
            "body": {
                "currentlocation": "AM4-I15"
            }
        }
    },
    // "SND_VERSION_INFO": {
    //     "message": {
    //         "header": {
    //             "uid": "1203",
    //             "rssid": "1073",
    //             "name": "SND_VERSION_INFO",
    //             "time": "2017-07-13 11:24:32.817"
    //         },
    //         "body": {
    //             "rss": "3.7.7",
    //             "rcs": "2.7.1_Fanuc",
    //             "robot": "0.465000",
    //             "lineconfig": "1.0",
    //             "alarmconfig": "1.3"
    //         }
    //     }
    // },
    // "SND_VISION_IMAGE": {
    //     "message": {
    //         "header": {
    //             "uid": "3474",
    //             "rssid": "1097",
    //             "name": "SND_VISION_IMAGE",
    //             "time": "2017-07-13 11:24:16.986"
    //         },
    //         "body": {
    //             "cnc": "AO4-F13",
    //             "tray": {
    //                 "trayno": "4",
    //                 "row": "0",
    //                 "col": "1"
    //             },
    //             "image": "c:\\Images\\2017_07_13\\2017_07_13_11_24_16_CNCFull.jpeg"
    //         }
    //     }
    // }
}