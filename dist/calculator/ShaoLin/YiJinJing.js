var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * 易筋经计算器
 *
 * 加法计算：二业加成0.0996秘籍加成3+4+5%,30%佛果触发30% 4件套10% CW特效5%
 *
 * 乘法计算: 幻身100% 众嗔20%
 *
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 18:35:26
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-11 14:48:26
 */
import CalculatorBase from "../base";
import Skill from "../../core/skill";
import { TeamSkills, SetBonusesGain } from '../../config/config';
import { EnChants } from "../../types";
import { shaoLinSkills, SkillNames } from './config';
import Skill2 from "../../core/skill";
var YiJinJing = /** @class */ (function (_super) {
    __extends(YiJinJing, _super);
    function YiJinJing(options) {
        var _a;
        var _this = _super.call(this, options) || this;
        _this.professtion = '少林';
        _this.className = '易筋经';
        _this.skillTimesLib = (_a = {},
            _a[SkillNames.WeiTuoXianChu] = 25,
            _a[SkillNames.PoZhao] = 30,
            _a[SkillNames.NaYunShi] = 39,
            _a[SkillNames.HengSaoLiuHe] = 32,
            _a[SkillNames.HengSaoLiuHeDot] = 155,
            _a[SkillNames.ShouQueShi] = 45,
            _a[SkillNames.PuDuSiFang] = 44,
            _a[SkillNames.XiangMo] = 64,
            _a[SkillNames.SuoDi] = 39,
            _a[SkillNames.TiHuGuanDing] = 22,
            _a[SkillNames.FoGuo] = 55,
            _a[SkillNames.LiuHeGun] = 172,
            _a[SkillNames.FeiJian] = 50,
            _a[EnChants.EnChantHand] = 30,
            _a[EnChants.EnChantShoe] = 15,
            _a);
        /**
         * 技能增益列表
         */
        _this.support.use(shaoLinSkills.JinGangNuMu);
        _this.support.use(shaoLinSkills.QinLongJue);
        _this.support.use(TeamSkills.FenLan);
        _this.support.use(TeamSkills.PoCangQiong);
        _this.support.use(TeamSkills.XiuQi);
        /**
         * 套装
         */
        _this.support.use(SetBonusesGain.ValueSetBonuse);
        _this.support.use(SetBonusesGain.SkillSetBonuse);
        _this.support.showGain();
        return _this;
    }
    /**
     * 添加技能
     *
     * @memberof YiJinJing
     */
    YiJinJing.prototype.addSkills = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, core, target, supportContext, support, hasCw, BaseCoefficient, ErYeYiYuanCoefficient, skillSetBonuseCoefficient, ZhongChenCoefficient, MingFaCoefficient, FoGuoCoefficient, MiJiCoefficient, skills, ingoreTargetDefenceCoefficient, liuHe, liuHeWithWeiTuo, liuHeWithWeiTuoSubTotal, weiTuo, poZhao, naYunShi, hengSaoLiuHe, shouQueShi, hengSaoLiuHeDot, puDuSiFang, suoDi, tiHuGuanDing, foGuo, FMHand, FMFeet, weituoTotal, nayunTotal, xiangMo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        core = _super.prototype.getCore.call(this);
                        target = _super.prototype.getTarget.call(this);
                        supportContext = _super.prototype.getSupportContext.call(this);
                        support = _super.prototype.getSupport.call(this);
                        hasCw = support.hasCw();
                        BaseCoefficient = 1;
                        ErYeYiYuanCoefficient = 0.0996;
                        skillSetBonuseCoefficient = support.hasSkillSetBonuese() ? 0.0996 : 0;
                        ZhongChenCoefficient = 1.2;
                        MingFaCoefficient = 1.11;
                        FoGuoCoefficient = 0.3 * 0.3;
                        MiJiCoefficient = 0.12;
                        skills = [];
                        ingoreTargetDefenceCoefficient = function () {
                            var ingoreDefense = 0.4 * target.neiFang;
                            var coefficient = target.defenseCoefficient / (target.defenseCoefficient + ingoreDefense);
                            return coefficient;
                        };
                        liuHe = new Skill2({
                            core: core,
                            target: target,
                            supportContext: supportContext,
                            skillName: SkillNames.LiuHeGun,
                            skillTimes: this.getSkillTimes(SkillNames.LiuHeGun),
                            skillBasicNumber: core.WuQiShangHai,
                            basicDamage: 0,
                            basicDamageCoefficient: 0,
                            poFangCoefficient: 1,
                        });
                        skills.push(liuHe);
                        liuHeWithWeiTuo = new Skill2({
                            core: core,
                            target: target,
                            supportContext: supportContext,
                            skillName: '韦陀触发六合棍',
                            skillTimes: this.getSkillTimes(SkillNames.WeiTuoXianChu) * 2,
                            skillBasicNumber: core.WuQiShangHai,
                            basicDamage: 0,
                            basicDamageCoefficient: 0,
                            poFangCoefficient: 1,
                        });
                        liuHeWithWeiTuoSubTotal = liuHeWithWeiTuo.calculator();
                        weiTuo = new Skill2({
                            core: core,
                            target: target,
                            supportContext: supportContext,
                            skillName: SkillNames.WeiTuoXianChu,
                            skillTimes: this.getSkillTimes(SkillNames.WeiTuoXianChu),
                            skillBasicNumber: 179,
                            basicDamageCoefficient: 1.66,
                            targetDamageCoefficient: ingoreTargetDefenceCoefficient,
                            damageBonuesCoefficient: function () {
                                return (BaseCoefficient + MiJiCoefficient + ErYeYiYuanCoefficient + skillSetBonuseCoefficient + FoGuoCoefficient) * ZhongChenCoefficient * MingFaCoefficient;
                            },
                            extra: liuHeWithWeiTuoSubTotal.subTotal
                        });
                        skills.push(weiTuo);
                        poZhao = new Skill({
                            core: core,
                            target: target,
                            supportContext: supportContext,
                            skillName: SkillNames.PoZhao,
                            skillTimes: this.getSkillTimes(SkillNames.PoZhao),
                            skillBasicNumber: 0,
                            basicDamage: core.PoZhao,
                            basicDamageCoefficient: 15.2288,
                            damageBonuesCoefficient: BaseCoefficient + ErYeYiYuanCoefficient,
                        });
                        skills.push(poZhao);
                        naYunShi = new Skill({
                            core: core,
                            target: target,
                            supportContext: supportContext,
                            skillName: SkillNames.NaYunShi,
                            skillTimes: this.getSkillTimes(SkillNames.NaYunShi),
                            skillBasicNumber: 258.5,
                            basicDamageCoefficient: 2,
                            targetDamageCoefficient: ingoreTargetDefenceCoefficient,
                            damageBonuesCoefficient: function () {
                                return (BaseCoefficient + MiJiCoefficient + ErYeYiYuanCoefficient + skillSetBonuseCoefficient + FoGuoCoefficient) * ZhongChenCoefficient * MingFaCoefficient;
                            },
                        });
                        skills.push(naYunShi);
                        hengSaoLiuHe = new Skill({
                            core: core,
                            target: target,
                            supportContext: supportContext,
                            skillName: SkillNames.HengSaoLiuHe,
                            skillTimes: this.getSkillTimes(SkillNames.HengSaoLiuHe),
                            skillBasicNumber: 75,
                            basicDamageCoefficient: 0.58,
                            damageBonuesCoefficient: function () {
                                return (BaseCoefficient + ErYeYiYuanCoefficient + FoGuoCoefficient + 0.5) * 2 * MingFaCoefficient;
                            },
                            huiXinHuiXiaoCoefficient: function () {
                                return (core.HuiXin / 100 + 0.1) * (core.HuiXiao / 100 + 0.1) + 1 - (core.HuiXin / 100 + 0.1);
                            }
                        });
                        skills.push(hengSaoLiuHe);
                        shouQueShi = new Skill({
                            core: core,
                            target: target,
                            supportContext: supportContext,
                            skillName: SkillNames.ShouQueShi,
                            skillTimes: this.getSkillTimes(SkillNames.ShouQueShi),
                            skillBasicNumber: 144.5,
                            basicDamageCoefficient: 1.36,
                            damageBonuesCoefficient: function () {
                                var cwBuff = hasCw ? 0.0996 / 2 : 0;
                                return (BaseCoefficient + 0.12 + ErYeYiYuanCoefficient + cwBuff + FoGuoCoefficient) * ZhongChenCoefficient * MingFaCoefficient;
                            },
                            huiXinHuiXiaoCoefficient: function () {
                                return (core.HuiXin / 100 + 0.04 + 0.1) * (core.HuiXiao / 100 + 0.1) + 1 - (core.HuiXin / 100 + 0.1 + 0.04);
                            },
                            targetDamageCoefficient: ingoreTargetDefenceCoefficient
                        });
                        skills.push(shouQueShi);
                        hengSaoLiuHeDot = new Skill({
                            core: core,
                            target: target,
                            supportContext: supportContext,
                            skillName: SkillNames.HengSaoLiuHeDot,
                            skillTimes: this.getSkillTimes(SkillNames.HengSaoLiuHeDot),
                            skillBasicNumber: 45,
                            basicDamageCoefficient: 0.083,
                            damageBonuesCoefficient: function () {
                                return (BaseCoefficient + FoGuoCoefficient + ErYeYiYuanCoefficient) * 2 * 3 * MingFaCoefficient;
                            },
                            huiXinHuiXiaoCoefficient: function () {
                                return (core.HuiXin / 100 + 0.1) * (core.HuiXiao / 100 + 0.1) + 1 - (core.HuiXin / 100 + 0.1);
                            }
                        });
                        skills.push(hengSaoLiuHeDot);
                        puDuSiFang = new Skill({
                            core: core,
                            target: target,
                            supportContext: supportContext,
                            skillName: SkillNames.PuDuSiFang,
                            skillTimes: this.getSkillTimes(SkillNames.PuDuSiFang),
                            skillBasicNumber: 163.5,
                            basicDamageCoefficient: 0.92,
                            damageBonuesCoefficient: function () {
                                var cwBuff = hasCw ? 0.0996 / 2 : 0;
                                return (BaseCoefficient + 0.0996 + FoGuoCoefficient + ErYeYiYuanCoefficient + cwBuff) * MingFaCoefficient;
                            }
                        });
                        skills.push(puDuSiFang);
                        suoDi = new Skill({
                            core: core,
                            target: target,
                            supportContext: supportContext,
                            skillName: SkillNames.SuoDi,
                            skillTimes: this.getSkillTimes(SkillNames.SuoDi),
                            skillBasicNumber: 407.5,
                            basicDamageCoefficient: 1.25,
                            damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient) * MingFaCoefficient,
                        });
                        skills.push(suoDi);
                        tiHuGuanDing = new Skill({
                            core: core,
                            target: target,
                            supportContext: supportContext,
                            skillName: SkillNames.TiHuGuanDing,
                            skillTimes: this.getSkillTimes(SkillNames.TiHuGuanDing),
                            skillBasicNumber: 407.5,
                            basicDamageCoefficient: 1.92185,
                            damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient),
                        });
                        skills.push(tiHuGuanDing);
                        foGuo = new Skill({
                            core: core,
                            target: target,
                            supportContext: supportContext,
                            skillName: SkillNames.FoGuo,
                            skillTimes: this.getSkillTimes(SkillNames.FoGuo),
                            skillBasicNumber: 127.5,
                            basicDamageCoefficient: 0.697922,
                            damageBonuesCoefficient: BaseCoefficient + 0.3 + ErYeYiYuanCoefficient
                        });
                        skills.push(foGuo);
                        FMHand = new Skill({
                            core: core,
                            target: target,
                            supportContext: supportContext,
                            skillName: EnChants.EnChantHand,
                            skillTimes: this.getSkillTimes(EnChants.EnChantHand),
                            skillBasicNumber: 0,
                            basicDamageCoefficient: 0.95,
                            damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient) * 0.4,
                        });
                        skills.push(FMHand);
                        FMFeet = new Skill({
                            core: core,
                            target: target,
                            supportContext: supportContext,
                            skillName: EnChants.EnChantShoe,
                            skillTimes: this.getSkillTimes(EnChants.EnChantShoe),
                            skillBasicNumber: 0,
                            basicDamageCoefficient: 0.38125,
                            damageBonuesCoefficient: (BaseCoefficient + ErYeYiYuanCoefficient)
                        });
                        skills.push(FMFeet);
                        return [4 /*yield*/, weiTuo.calculator().subTotal];
                    case 1:
                        weituoTotal = _a.sent();
                        return [4 /*yield*/, naYunShi.calculator().subTotal];
                    case 2:
                        nayunTotal = _a.sent();
                        xiangMo = new Skill({
                            core: core,
                            target: target,
                            supportContext: supportContext,
                            skillName: SkillNames.XiangMo,
                            skillTimes: 1,
                            skillBasicNumber: 0,
                            basicDamage: function () {
                                return (weituoTotal + nayunTotal) / 4 / 1.2;
                            },
                            poFangCoefficient: 1,
                            wuShuangCoefficient: 1,
                            huiXinHuiXiaoCoefficient: 1,
                            targetDamageCoefficient: 1,
                        });
                        skills.push(xiangMo);
                        _super.prototype.addSkills.call(this, skills);
                        return [2 /*return*/];
                }
            });
        });
    };
    return YiJinJing;
}(CalculatorBase));
export default YiJinJing;
//# sourceMappingURL=YiJinJing.js.map