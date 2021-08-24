let targetList = [
    {
        id: 0,      // id就是index
        title: 'ICU患者收治率和ICU患者收治床日率', 
        checked: true,
        dataName: 'ICUAdmissionInfo',   // 多个标签时，接口返回数据的名称
        detail: [
            {
                name: 'ICU患者收治率',
                btnMethod: 'ICUAdmission',              // 调用接口时传的method字段的值
                resMole: 'ICUHospital',                 // 接口返回数据的字段名(分子)
                resDeno: 'SamePeriodHospital',          // 接口返回数据的字段名(分母)
                resRate: 'ICUAdmissionRate',            // 接口返回数据的字段名(计算结果)
                molecular: 'ICU收治患者总数',           // 分子名称
                denominator: '同期医院收治患者总数',    // 分母名称
                suffix: 100,                            // 公式后缀
                explanation: ['ICU患者收治率=ICU收治患者总数/同期医院收治患者总数×100%', 'ICU收治患者总数：特定时间范围内ICU收治病人数。', '同期医院收治患者总数：特定时间范围内住院病人收治总数。']
            },
            {
                name: 'ICU患者收治床日率',
                btnMethod: 'ICUAdmission',
                resMole: 'ICUHospital',                     // 接口返回数据的字段名(分子)
                resDeno: 'SamePeriodHospital',              // 接口返回数据的字段名(分母)
                resRate: 'ICUBedDayRate',                   // 接口返回数据的字段名(计算结果)
                molecular: 'ICU收治患者总床日数',           // 分子
                denominator: '同期医院收治患者总床日数',    // 分母
                suffix: 100,                                // 公式后缀
                explanation: ['ICU患者收治床日率=ICU收治患者总床日数/同期医院收治患者总床日数×100%', ' ICU 收治患者总床日数：ICU 患者住房的总天数。', '同期医院收治患者总床日数：同期住院床位总天数。']
            }
        ]
    },
    {
        id: 1,
        title: '急性生理与慢性健康评分（APACHEⅡ评分）≥15分患者收治率（入ICU24小时内）',  
        checked: false,
        dataName: 'ICUAPACHEInfo',   // 多个标签时，接口返回数据的名称
        detail: [
            {
                name: 'APACHEⅡ评分≥15分患者收治率（入ICU24小时内）',
                btnMethod: 'ICUAPACHE',
                resMole: 'ZYRECORD_Mode',       // 接口返回数据的字段名(分子)
                resDeno: 'ICUHospital',         // 接口返回数据的字段名(分母)
                resRate: 'APACHERate',          // 接口返回数据的字段名(计算结果)
                molecular: 'ICU收治APACHEⅡ评分≥15分患者',   // 分子
                denominator: 'ICU收治患者总数',             // 分母
                suffix: 100,                    // 公式后缀
                explanation: ['APACHEⅡ评分≥15分患者收治率（入ICU24小时内）=ICU收治APACHEⅡ评分≥15分患者/ICU收治患者总数（入ICU 24小时内）×100%']
            }
        ]
    },
    {
        id: 2,
        title: '感染性休克患者1小时内测定乳酸比例',  
        checked: false,
        dataName: 'ICULacInfo',   // 多个标签时，接口返回数据的名称
        detail: [
            {
                name: '感染性休克1小时内测定乳酸比例',
                btnMethod: 'ICULac',
                resMole: '_ICU',            // 接口返回数据的字段名(分子)
                resDeno: 'ICUHospital',     // 接口返回数据的字段名(分母)
                resRate: 'LacRate',         // 接口返回数据的字段名(计算结果)
                molecular: '入ICU诊断为感染性休克 1h 内完成乳酸检测的患者数',   // 分子
                denominator: '同期入ICU诊断为感染性休克患者总数',               // 分母
                suffix: 100,                // 公式后缀
                explanation: ['感染性休克1小时内测定乳酸比例=入ICU诊断为感染性休克 1h 内完成乳酸检测的患者数/同期入ICU诊断为感染性休克患者总数×100%']
            }
        ]
    },
    {
        id: 3,
        title: '感染性休克患者1小时内血培养留取率',  
        checked: false,
        dataName: 'ICUBloodCultureInfo',   // 多个标签时，接口返回数据的名称
        detail: [
            {
                name: '感染性休克患者1小时内血培养留取率',
                btnMethod: 'ICUBloodCulture',
                resMole: '_ICU',                // 接口返回数据的字段名(分子)
                resDeno: 'ICUHospital',         // 接口返回数据的字段名(分母)
                resRate: 'BloodCultureRate',    // 接口返回数据的字段名(计算结果)
                molecular: '入ICU诊断为感染性休克 1h 内血培养留取的患者数', // 分子
                denominator: '同期入ICU诊断为感染性休克患者总数',           // 分母
                suffix: 100,                    // 公式后缀
                explanation: ['感染性休克患者1小时内血培养留取率=入ICU诊断为感染性休克 1h 内血培养留取的患者数/同期入ICU诊断为感染性休克患者总数×100%']
            }
        ]
    },
    {
        id: 4,
        title: '感染性休克患者1小时内抗菌药物使用率',  
        checked: false,
        dataName: 'ICUAntibacterialsRateInfo',   // 多个标签时，接口返回数据的名称
        detail: [
            {
                name: '感染性休克患者1小时内抗菌药物使用率',
                btnMethod: 'ICUAntibacterialsRate',
                resMole: 'ICUAntibiotics',              // 接口返回数据的字段名(分子)
                resDeno: 'ICUSepticshock',              // 接口返回数据的字段名(分母)
                resRate: 'ICUAntibacterialsRate',       // 接口返回数据的字段名(计算结果)
                molecular: '入ICU诊断为感染性休克 1h 内抗菌药物使用的患者数',   // 分子
                denominator: '同期入ICU诊断为感染性休克患者总数',               // 分母
                suffix: 100,                            // 公式后缀
                explanation: ['感染性休克患者1小时内抗菌药物使用率=入ICU诊断为感染性休克 1h 内抗菌药物使用的患者数/同期入ICU诊断为感染性休克患者总数×100%']
            }
        ]
    },
    {
        id: 5,
        title: '氧合指数<150mmHg的ARDS患者采用小潮气量且限制平台压的比例',  
        checked: false,
        dataName: 'ICUARDSRate1Info',   // 多个标签时，接口返回数据的名称
        detail: [
            {
                name: '氧合指数<150mmHg的ARDS患者采用小潮气量且限制平台压的比例',
                btnMethod: 'ICUARDSRate1',
                resMole: 'PingTaiYa',        // 接口返回数据的字段名(分子)
                resDeno: 'ARDSANDPF',        // 接口返回数据的字段名(分母)
                resRate: 'ICUARDSRate1',        // 接口返回数据的字段名(计算结果)
                molecular: '氧合指数<150mmHg的ARDS患者采用小潮气量且限制平台压的患者数',    // 分子
                denominator: '同期入ICU诊断为ARDS且氧合指数<150mmHg患者总数',               // 分母
                suffix: 100,        // 公式后缀
                explanation: ['氧合指数<150mmHg的ARDS患者采用小潮气量且限制平台压的比例=氧合指数<150mmHg的ARDS患者采用小潮气量且限制平台压的患者数/同期入ICU诊断为ARDS且氧合指数<150mmHg患者总数×100%']
            }
        ]
    },
    {
        id: 6,
        title: '氧合指数<150mmHg的ARDS患者采用俯卧位通气的比例',  
        checked: false,
        dataName: 'ICUARDSRate2Info',   // 多个标签时，接口返回数据的名称
        detail: [
            {
                name: '氧合指数<150mmHg的ARDS患者采用俯卧位通气的比例',
                btnMethod: 'ICUARDSRate2',
                resMole: 'FUWOWEI',        // 接口返回数据的字段名(分子)
                resDeno: 'ARDSANDPF',        // 接口返回数据的字段名(分母)
                resRate: 'ICUARDSRate2',        // 接口返回数据的字段名(计算结果)
                molecular: '入ICU氧合指数<150mmHg的ARDS患者采用俯卧位通气的患者数', // 分子
                denominator: '同期入ICU诊断为ARDS且氧合指数<150mmHg患者总数',       // 分母
                suffix: 100,        // 公式后缀
                explanation: ['氧合指数<150mmHg的ARDS患者采用俯卧位通气的比例=入ICU氧合指数<150mmHg的ARDS患者采用俯卧位通气的患者数/同期入ICU诊断为ARDS且氧合指数<150mmHg患者总数×100%']
            }
        ]
    },
    {
        id: 7,
        title: 'ICU抗菌药物治疗前病原学送检率',  
        checked: false,
        dataName: 'testInfo',   // 多个标签时，接口返回数据的名称
        detail: [
            {
                name: 'ICU抗菌药物治疗前病原学送检率',
                btnMethod: 'test',
                resMole: '',        // 接口返回数据的字段名(分子)
                resDeno: '',        // 接口返回数据的字段名(分母)
                resRate: '',        // 接口返回数据的字段名(计算结果)
                molecular: '使用抗菌药物前病原学检验标本送检病例数',    // 分子
                denominator: '同期使用抗菌药物治疗病例总数',            // 分母
                suffix: 100,        // 公式后缀
                explanation: ['ICU抗菌药物治疗前病原学送检率=使用抗菌药物前病原学检验标本送检病例数/同期使用抗菌药物治疗病例总数×100%']
            }
        ]
    },
    {
        id: 8,
        title: 'ICU深静脉血栓（DVT）预防率',  
        checked: false,
        dataName: 'VenousThrombosisInfo',   // 多个标签时，接口返回数据的名称
        detail: [
            {
                name: 'ICU深静脉血栓（DVT）预防率',
                btnMethod: 'VenousThrombosis',
                resMole: 'ZYADVICE_Mode',               // 接口返回数据的字段名(分子)
                resDeno: 'ICUHospital',                 // 接口返回数据的字段名(分母)
                resRate: 'VenousThrombosisRate',        // 接口返回数据的字段名(计算结果)
                molecular: '进行深静脉血栓（DVT）预防的ICU患者数',  // 分子
                denominator: '同期ICU收治患者总数',     // 分母
                suffix: 100,                            // 公式后缀
                explanation: ['ICU深静脉血栓（DVT）预防率=进行深静脉血栓（DVT）预防的ICU患者数/同期ICU收治患者总数×100%']
            }
        ]
    },
    {
        id: 9,
        title: 'ICU患者预计病死率和ICU患者标化病死率比值（Standardized Mortality Ratio）',  
        checked: false,
        dataName: 'testInfo',   // 多个标签时，接口返回数据的名称
        detail: [
            {
                name: 'ICU患者预计病死率',
                btnMethod: 'test',
                resMole: '',            // 接口返回数据的字段名(分子)
                resDeno: '',            // 接口返回数据的字段名(分母)
                resRate: '',            // 接口返回数据的字段名(计算结果)
                molecular: 'ICU收治患者预计病死率总和',     // 分子
                denominator: '同期ICU收治患者总数',         // 分母
                suffix: 100,            // 公式后缀
                explanation: ['ICU患者预计病死率=ICU收治患者预计病死率总和/同期ICU收治患者总数×100%']
            },
            {
                name: 'ICU患者标化病死率比值',
                btnMethod: 'test',
                resMole: '',                // 接口返回数据的字段名(分子)
                resDeno: '',                // 接口返回数据的字段名(分母)
                resRate: '',                // 接口返回数据的字段名(计算结果)
                molecular: 'ICU患者实际病死率',         // 分子
                denominator: '同期ICU患者预计病死率',   // 分母
                suffix: 100,                // 公式后缀
                explanation: ['ICU患者标化病死率比值=ICU患者实际病死率/同期ICU患者预计病死率×100%']
            }
        ]
    },
    {
        id: 10,
        title: 'ICU非计划气管插管拔管率',  
        checked: false,
        dataName: 'ICUUnplannedTracheaInfo',   // 多个标签时，接口返回数据的名称
        detail: [
            {
                name: 'ICU非计划气管插管拔管率',
                btnMethod: 'ICUUnplannedTrachea',
                resMole: 'ZYRECORD_Mode',               // 接口返回数据的字段名(分子)
                resDeno: 'ZYADVICE_Mode',               // 接口返回数据的字段名(分母)
                resRate: 'ICUUnplannedTracheaRate',     // 接口返回数据的字段名(计算结果)
                molecular: '非计划气管插管拔管例数',    // 分子
                denominator: '同期ICU患者气管插管拔管总数',   // 分母
                suffix: 100,                            // 公式后缀
                explanation: ['ICU非计划气管插管拔管率=非计划气管插管拔管例数/同期ICU患者气管插管拔管总数×100%']
            }
        ]
    },
    {
        id: 11,
        title: 'ICU气管插管拔管后48小时内再插管率',  
        checked: false,
        dataName: 'ReturnICUTrachea48Info',   // 多个标签时，接口返回数据的名称
        detail: [
            {
                name: 'ICU气管插管拔管后48小时内再插管率',
                btnMethod: 'ReturnICUTrachea48',
                resMole: 'ZYRECORD_Mode',               // 接口返回数据的字段名(分子)
                resDeno: 'ZYADVICE_Mode',               // 接口返回数据的字段名(分母)
                resRate: 'ReturnICUTrachea48Rate',      // 接口返回数据的字段名(计算结果)
                molecular: '气管插管计划拔管后48h内再插管例数',     // 分子
                denominator: '同期ICU患者气管插管拔管总例数',       // 分母
                suffix: 100,                            // 公式后缀
                explanation: ['ICU气管插管拔管后48小时内再插管率=气管插管计划拔管后48h内再插管例数/同期ICU患者气管插管拔管总例数×100%']
            }
        ]
    },
    {
        id: 12,
        title: '非计划转入ICU率',  
        checked: false,
        dataName: 'UnplannedTransferToICUInfo',   // 多个标签时，接口返回数据的名称
        detail: [
            {
                name: '非计划转入ICU率',
                btnMethod: 'UnplannedTransferToICU',
                resMole: 'UnplannedICU',                // 接口返回数据的字段名(分子)
                resDeno: 'InICUHospital',               // 接口返回数据的字段名(分母)
                resRate: 'UnplannedTransferToICURate',  // 接口返回数据的字段名(计算结果)
                molecular: '非计划转入ICU患者数',       // 分子
                denominator: '同期转入ICU患者总数',     // 分母
                suffix: 100,                            // 公式后缀
                explanation: ['非计划转入ICU率=非计划转入ICU患者数/同期转入ICU患者总数×100%']
            }
        ]
    },
    {
        id: 13,
        title: '转出ICU后48小时内重返率',  
        checked: false,
        dataName: 'ReturnICU48Info',   // 多个标签时，接口返回数据的名称
        detail: [
            {
                name: '转出ICU后48小时内重返率',
                btnMethod: 'ReturnICU48',
                resMole: 'InICUHospital',       // 接口返回数据的字段名(分子)
                resDeno: 'OutICUHospital',      // 接口返回数据的字段名(分母)
                resRate: 'TransferOutICURate',  // 接口返回数据的字段名(计算结果)
                molecular: '转出ICU后48h内重返ICU的患者数',     // 分子
                denominator: '同期转出ICU患者总数',             // 分母
                suffix: 100,                    // 公式后缀
                explanation: ['转出ICU后48小时内重返率=转出ICU后48h内重返ICU的患者数/同期转出ICU患者总数×100%']
            }
        ]
    },
    {
        id: 14,
        title: 'ICU呼吸机相关性肺炎（VAP）发病率',  
        checked: false,
        dataName: 'ICUVAPIncidenceRateInfo',   // 多个标签时，接口返回数据的名称
        detail: [
            {
                name: 'ICU呼吸机相关性肺炎（VAP）发病率（例/千机械通气日）',
                btnMethod: 'ICUVAPIncidenceRate',
                resMole: 'ZYRECORD_Mode',       // 接口返回数据的字段名(分子)
                resDeno: 'ZYADVICE_Mode',       // 接口返回数据的字段名(分母)
                resRate: 'VAPRate',             // 接口返回数据的字段名(计算结果)
                molecular: 'VAP发生例数',       // 分子
                denominator: '同期ICU患者有创机械通气总天数',   // 分母
                suffix: 1000,                   // 公式后缀
                explanation: ['ICU呼吸机相关性肺炎（VAP）发病率（例/千机械通气日）=VAP发生例数/同期ICU患者有创机械通气总天数×1000‰']
            }
        ]
    },
    {
        id: 15,
        title: 'ICU血管内导管相关血行性感染（CRBSI）发病率',  
        checked: false,
        dataName: 'CRBSIInfo',   // 多个标签时，接口返回数据的名称
        detail: [
            {
                name: 'ICU血管内导管相关血流感染（CRBSI）发病率（例/千导管日）',
                btnMethod: 'ICUCRBSIIncidenceRate',
                resMole: 'ZYRECORD_Mode',       // 接口返回数据的字段名(分子)
                resDeno: 'ZYHMdata',            // 接口返回数据的字段名(分母)
                resRate: 'CRBSIRate',           // 接口返回数据的字段名(计算结果)
                molecular: 'CRBSI发生例数',     // 分子
                denominator: '同期ICU患者血管内导管留置总天数',   // 分母
                suffix: 1000,                   // 公式后缀
                explanation: ['ICU血管内导管相关血流感染（CRBSI）发病率（例/千导管日）=CRBSI发生例数/同期ICU患者血管内导管留置总天数×1000‰']
            }
        ],
        catheter: true
    },
    {
        id: 16,
        title: 'ICU导尿管相关泌尿系感染（CAUTI）发病率',  
        checked: false,
        dataName: 'CAUTIInfo',   // 多个标签时，接口返回数据的名称
        detail: [
            {
                name: 'ICU导尿管相关泌尿系感染（CAUTI）发病率（例/千导尿管日）',
                btnMethod: 'ICUcatheterIncidenceRate',
                resMole: 'ZYRECORD_Mode',       // 接口返回数据的字段名(分子)
                resDeno: 'ZYADVICE_Mode',       // 接口返回数据的字段名(分母)
                resRate: 'CAUTIRate',           // 接口返回数据的字段名(计算结果)
                molecular: 'CAUTI发生例数',     // 分子
                denominator: '同期ICU患者导尿管留置总天数',   // 分母
                suffix: 1000,                   // 公式后缀
                explanation: ['ICU导尿管相关泌尿系感染（CAUTI）发病率（例/千导尿管日）=CAUTI发生例数/同期ICU患者导尿管留置总天数×1000‰']
            }
        ]
    }
];

let targetIdList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

let catheterList = [
    {name: 'CVC', id: 'CVC', checked: false},
    {name: 'PZCC', id: 'PZCC', checked: false},
    {name: 'CRRT', id: 'CRRT', checked: false},
    {name: '外周静脉', id: 'WZJM', checked: false},
    {name: '动脉留置针', id: 'DMLZZ', checked: false},
    {name: 'picco导管', id: 'PICCO', checked: false}
];

let catheterIdList = ['CVC', 'PZCC', 'CRRT', 'WZJM', 'DMLZZ', 'PICCO'];

export {
    targetList,
    targetIdList,
    catheterList,
    catheterIdList
}