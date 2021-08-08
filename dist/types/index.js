"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupSkillBuff = exports.TeamSkillBuffWaiGong = exports.TeamSkillBuffNeiGong = exports.SetBonuse = exports.Weapon = exports.EnChants = exports.Formations = exports.FormationName = exports.FormationValue = exports.TargetMuZhuangList = exports.TargetBossList = exports.TargetMode = exports.CharacterTypes = exports.SupportMode = void 0;
/**
 * 辅助类类别
 *
 * 内功 / 外功
 *
 * @export
 * @enum {number}
 */
var SupportMode;
(function (SupportMode) {
    SupportMode["NeiGong"] = "NeiGong";
    SupportMode["WaiGong"] = "WaiGong";
})(SupportMode = exports.SupportMode || (exports.SupportMode = {}));
var CharacterTypes;
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
})(CharacterTypes = exports.CharacterTypes || (exports.CharacterTypes = {}));
var TargetMode;
(function (TargetMode) {
    /**
     * 目标类型 - 木桩
     */
    TargetMode["MuZhuang"] = "MuZhuang";
    /**
     * 目标类型 - boss
     */
    TargetMode["Boss"] = "Boss";
})(TargetMode = exports.TargetMode || (exports.TargetMode = {}));
/**
 * boss 列表
 *
 * @export
 * @enum {number}
 */
var TargetBossList;
(function (TargetBossList) {
    TargetBossList["DaMoDong"] = "DaMoDong";
})(TargetBossList = exports.TargetBossList || (exports.TargetBossList = {}));
/**
 * 木桩列表
 *
 * @export
 * @enum {number}
 */
var TargetMuZhuangList;
(function (TargetMuZhuangList) {
    TargetMuZhuangList["MuZhuang111"] = "MuZhuang111";
    TargetMuZhuangList["MuZhuang112"] = "MuZhuang111";
    TargetMuZhuangList["MuZhuang113"] = "MuZhuang111";
})(TargetMuZhuangList = exports.TargetMuZhuangList || (exports.TargetMuZhuangList = {}));
var FormationValue;
(function (FormationValue) {
    FormationValue["TianGuLeiYinZhen"] = "TianGuLeiYinZhen";
})(FormationValue = exports.FormationValue || (exports.FormationValue = {}));
var FormationName;
(function (FormationName) {
    FormationName["TianGuLeiYinZhen"] = "\u5929\u9F13\u96F7\u97F3\u9635";
})(FormationName = exports.FormationName || (exports.FormationName = {}));
exports.Formations = [
    {
        name: FormationName.TianGuLeiYinZhen,
        value: FormationValue.TianGuLeiYinZhen,
    }
];
var EnChants;
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
})(EnChants = exports.EnChants || (exports.EnChants = {}));
/**
 * 武器类型
 *
 * @export
 * @enum {number}
 */
var Weapon;
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
})(Weapon = exports.Weapon || (exports.Weapon = {}));
/**
 * 套装类型
 *
 * @export
 * @enum {number}
 */
var SetBonuse;
(function (SetBonuse) {
    /**
     * 技能套装效果
     */
    SetBonuse["SkillSetBonuse"] = "SkillSetBonuse";
    /**
     * 数值套装效果
     */
    SetBonuse["ValueSetBonuse"] = "ValueSetBonuse";
})(SetBonuse = exports.SetBonuse || (exports.SetBonuse = {}));
/**
 * 内功小队技能增益
 *
 * @export
 * @enum {number}
 */
var TeamSkillBuffNeiGong;
(function (TeamSkillBuffNeiGong) {
    TeamSkillBuffNeiGong["PoCangQiong"] = "PoCangQiong";
    TeamSkillBuffNeiGong["XiuQi"] = "XiuQi";
    TeamSkillBuffNeiGong["QingJuan"] = "QingJuan";
})(TeamSkillBuffNeiGong = exports.TeamSkillBuffNeiGong || (exports.TeamSkillBuffNeiGong = {}));
/**
 * 外功小队技能增益
 *
 * @export
 * @enum {number}
 */
var TeamSkillBuffWaiGong;
(function (TeamSkillBuffWaiGong) {
    TeamSkillBuffWaiGong["SuiXingChen"] = "SuiXingChen";
    TeamSkillBuffWaiGong["YinMeiXiang"] = "YinMeiXiang";
    TeamSkillBuffWaiGong["JiLei"] = "JiLei";
    TeamSkillBuffWaiGong["Jiu"] = "Jiu";
})(TeamSkillBuffWaiGong = exports.TeamSkillBuffWaiGong || (exports.TeamSkillBuffWaiGong = {}));
/**
 * 团队技能增益
 *
 * @export
 * @enum {number}
 */
var GroupSkillBuff;
(function (GroupSkillBuff) {
    GroupSkillBuff["HongFa"] = "HongFa";
    GroupSkillBuff["LiDiChengFo"] = "LiDiChengFo";
    GroupSkillBuff["ChaoShengYan"] = "ChaoShengYan";
    GroupSkillBuff["JieHuoZhan"] = "JieHuoZhan";
    GroupSkillBuff["HaoLingSanJun"] = "HaoLingSanJun";
    GroupSkillBuff["MeiHuaDun"] = "MeiHuaDun";
})(GroupSkillBuff = exports.GroupSkillBuff || (exports.GroupSkillBuff = {}));
//# sourceMappingURL=index.js.map