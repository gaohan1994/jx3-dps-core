/**
 * 辅助类类别
 *
 * 内功 / 外功
 *
 * @export
 * @enum {number}
 */
export var SupportMode;
(function (SupportMode) {
    SupportMode["NeiGong"] = "NeiGong";
    SupportMode["WaiGong"] = "WaiGong";
})(SupportMode || (SupportMode = {}));
export var CharacterTypes;
(function (CharacterTypes) {
    /**
     * 元气
     */
    CharacterTypes["YuanQi"] = "YuanQi";
    /**
     * 根骨
     */
    CharacterTypes["GenGu"] = "GenGu";
    /**
     * 力道
     */
    CharacterTypes["LiDao"] = "LiDao";
    /**
     * 身法
     */
    CharacterTypes["ShenFa"] = "ShenFa";
})(CharacterTypes || (CharacterTypes = {}));
export var TargetMode;
(function (TargetMode) {
    /**
     * 目标类型 - 木桩
     */
    TargetMode["MuZhuang"] = "MuZhuang";
    /**
     * 目标类型 - boss
     */
    TargetMode["Boss"] = "Boss";
})(TargetMode || (TargetMode = {}));
/**
 * boss 列表
 *
 * @export
 * @enum {number}
 */
export var TargetBossList;
(function (TargetBossList) {
    TargetBossList["DaMoDong"] = "DaMoDong";
})(TargetBossList || (TargetBossList = {}));
/**
 * 木桩列表
 *
 * @export
 * @enum {number}
 */
export var TargetMuZhuangList;
(function (TargetMuZhuangList) {
    TargetMuZhuangList["MuZhuang111"] = "MuZhuang111";
    TargetMuZhuangList["MuZhuang112"] = "MuZhuang111";
    TargetMuZhuangList["MuZhuang113"] = "MuZhuang111";
})(TargetMuZhuangList || (TargetMuZhuangList = {}));
export var FormationValue;
(function (FormationValue) {
    FormationValue["TianGuLeiYinZhen"] = "TianGuLeiYinZhen";
    FormationValue["DuJingZhen"] = "DuJingZhen";
    FormationValue["TianLuoZhen"] = "TianLuoZhen";
    FormationValue["QiChunZhen"] = "QiChunZhen";
})(FormationValue || (FormationValue = {}));
export var EnChants;
(function (EnChants) {
    // 附魔头
    EnChants["EnChantHead"] = "EnChantHead";
    // 附魔衣服
    EnChants["EnChantBody"] = "EnChantBody";
    // 附魔腰带
    EnChants["EnChantBelt"] = "EnChantBelt";
    // 附魔护手
    EnChants["EnChantHand"] = "EnChantHand";
    // 附魔鞋子
    EnChants["EnChantShoe"] = "EnChantShoe";
})(EnChants || (EnChants = {}));
/**
 * 武器类型
 *
 * @export
 * @enum {number}
 */
export var Weapon;
(function (Weapon) {
    Weapon["Normal"] = "Normal";
    /**
     * 橙武
     */
    Weapon["CW"] = "CW";
    /**
     * 雷特效
     */
    Weapon["EffectThunder"] = "EffectThunder";
    /**
     * 水特效
     */
    Weapon["EffectWather"] = "EffectWather";
})(Weapon || (Weapon = {}));
/**
 * 套装类型
 *
 * @export
 * @enum {number}
 */
export var SetBonuse;
(function (SetBonuse) {
    /**
     * 技能套装效果
     */
    SetBonuse["SkillSetBonuse"] = "SkillSetBonuse";
    /**
     * 数值套装效果
     */
    SetBonuse["ValueSetBonuse"] = "ValueSetBonuse";
})(SetBonuse || (SetBonuse = {}));
/**
 * 外功小队技能增益
 *
 * @export
 * @enum {number}
 */
export var TeamSkillBuffWaiGongList;
(function (TeamSkillBuffWaiGongList) {
    TeamSkillBuffWaiGongList["SuiXingChen"] = "SuiXingChen";
    TeamSkillBuffWaiGongList["YinMeiXiang"] = "YinMeiXiang";
    TeamSkillBuffWaiGongList["JiLei"] = "JiLei";
    TeamSkillBuffWaiGongList["Jiu"] = "Jiu";
})(TeamSkillBuffWaiGongList || (TeamSkillBuffWaiGongList = {}));
export var TeamSkillBuffNeiGongList;
(function (TeamSkillBuffNeiGongList) {
    TeamSkillBuffNeiGongList["XiuQi"] = "XiuQi";
    TeamSkillBuffNeiGongList["PoCangQiong"] = "PoCangQiong";
})(TeamSkillBuffNeiGongList || (TeamSkillBuffNeiGongList = {}));
/**
 * 团队技能增益
 *
 * @export
 * @enum {number}
 */
export var GroupSkillBuffList;
(function (GroupSkillBuffList) {
    GroupSkillBuffList["HongFa"] = "HongFa";
    GroupSkillBuffList["LiDiChengFo"] = "LiDiChengFo";
    GroupSkillBuffList["ChaoShengYan"] = "ChaoShengYan";
    GroupSkillBuffList["JieHuoZhan"] = "JieHuoZhan";
    GroupSkillBuffList["LieRiZhan"] = "LieRiZhan";
    GroupSkillBuffList["HaoLingSanJun"] = "HaoLingSanJun";
    GroupSkillBuffList["MeiHuaDun"] = "MeiHuaDun";
})(GroupSkillBuffList || (GroupSkillBuffList = {}));
export var SkillMiddleSteps;
(function (SkillMiddleSteps) {
    SkillMiddleSteps["step1"] = "step1";
    SkillMiddleSteps["step2"] = "step2";
    SkillMiddleSteps["step3"] = "step3";
    SkillMiddleSteps["step4"] = "step4";
})(SkillMiddleSteps || (SkillMiddleSteps = {}));
export var SupportContextKeys;
(function (SupportContextKeys) {
    SupportContextKeys["mainAttribute"] = "mainAttribute";
    SupportContextKeys["YuanQi"] = "YuanQi";
    SupportContextKeys["GenGu"] = "GenGu";
    SupportContextKeys["LiDao"] = "LiDao";
    SupportContextKeys["ShenFa"] = "ShenFa";
    SupportContextKeys["damageBonus"] = "damageBonus";
    SupportContextKeys["PoFangPercent"] = "PoFangPercent";
    SupportContextKeys["PoFangLevel"] = "PoFangLevel";
    SupportContextKeys["JiChuGongJi"] = "JiChuGongJi";
    SupportContextKeys["JiChuGongJiPercent"] = "JiChuGongJiPercent";
    SupportContextKeys["HuiXin"] = "HuiXin";
    SupportContextKeys["HuiXinLevel"] = "HuiXinLevel";
    SupportContextKeys["HuiXiao"] = "HuiXiao";
    SupportContextKeys["HuiXiaoLevel"] = "HuiXiaoLevel";
    SupportContextKeys["MingZhong"] = "MingZhong";
    SupportContextKeys["MingZhongLevel"] = "MingZhongLevel";
    SupportContextKeys["WuShuang"] = "WuShuang";
    SupportContextKeys["WuShuangLevel"] = "WuShuangLevel";
    SupportContextKeys["PoZhao"] = "PoZhao";
})(SupportContextKeys || (SupportContextKeys = {}));
//# sourceMappingURL=index.js.map