/**
 * 技能类
 * @Author: centerm.gaohan
 * @Date: 2021-08-08 19:45:42
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-11 15:21:23
 */
import invariant from 'invariant';
import chalk from 'chalk';
import numeral from 'numeral';
var Skill = /** @class */ (function () {
    function Skill(options) {
        this.options = options;
        invariant(typeof options.skillTimes === 'number', '技能次数不能为空');
        this.skillTimes = options.skillTimes;
        invariant(!!options.skillName, '技能名称不能为空');
        this.skillName = options.skillName;
        invariant(!!options.core, '请设置核心类');
        this.core = options.core;
        invariant(!!options.target, '请设置目标类');
        this.target = options.target;
        invariant(!!options.supportContext, '请设置辅助类');
        this.supportContext = options.supportContext;
        this.skillBasicNumber = options.skillBasicNumber || 0;
        this.basicDamage = currySkill(getCurrentCoefficient(options.basicDamage, this.core.ZongGongJi))();
        this.basicDamageCoefficient = currySkill(getCurrentCoefficient(options.basicDamageCoefficient, 1))();
        this.poFangCoefficient = currySkill(getCurrentCoefficient(options.poFangCoefficient, 1 + this.core.PoFang / 100))();
        this.wuShuangCoefficient = currySkill(getCurrentCoefficient(options.wuShuangCoefficient, 1 + this.core.WuShuang / 100))();
        this.huiXinHuiXiaoCoefficient = currySkill(getCurrentCoefficient(options.huiXinHuiXiaoCoefficient, (this.core.HuiXin / 100) * (this.core.HuiXiao / 100) + 1 - (this.core.HuiXin / 100)))();
        this.targetDamageCoefficient = currySkill(getCurrentCoefficient(options.targetDamageCoefficient, this.target.damageCoefficient))();
        this.damageBonuesCoefficient = currySkill(getCurrentCoefficient(options.damageBonuesCoefficient, 1))();
        this.extra = currySkill(getCurrentCoefficient(options.extra, 0))();
    }
    /**
     * 计算技能小计
     *
     * @return {*}  {number}
     * @memberof Skill2
     */
    Skill.prototype.calculator = function () {
        /**
         * 当前技能小计
         */
        var subTotal = 
        /**
         * 计算技能伤害 整个公式的基础系数
         */
        (this.skillBasicNumber + (this.basicDamage * this.basicDamageCoefficient))
            /**
             * 乘破防系数
             */
            * this.poFangCoefficient
            /**
             * 乘无双系数
             */
            * this.wuShuangCoefficient
            /**
             * 乘会心会笑系数
             */
            * this.huiXinHuiXiaoCoefficient
            /**
             * 乘目标伤害系数
             */
            * this.targetDamageCoefficient
            /**
             * 乘目标易伤系数
             */
            * this.damageBonuesCoefficient
            /**
             * 乘技能次数
             */
            * this.skillTimes
            /**
             * 是否有额外伤害有则添加
             */
            + this.extra;
        this.subTotal = formatNumber(subTotal);
        return this;
    };
    Skill.prototype.showSkillInfo = function () {
        // const skillBasic = this.skillBasicNumber + (this.basicDamage * this.basicDamageCoefficient);
        // const afterPoFang = skillBasic * this.poFangCoefficient;
        // const afterWuShuang = afterPoFang * this.wuShuangCoefficient;
        // const afterHuiXin = afterWuShuang * this.huiXinHuiXiaoCoefficient;
        // const afterTarget = afterHuiXin * this.targetDamageCoefficient;
        // const afterBonues = afterTarget * this.damageBonuesCoefficient;
        // const t = afterBonues * this.skillTimes;
        // skillBasic: ${formatNumber(skillBasic)}
        // afterPoFang: ${formatNumber(afterPoFang)}
        // afterWuShuang: ${formatNumber(afterWuShuang)}
        // afterHuiXin ${this.huiXinHuiXiaoCoefficient}: ${formatNumber(afterHuiXin)}
        // afterTarget: ${formatNumber(afterTarget)}
        // afterBonues: ${formatNumber(afterBonues)}
        // t:${formatNumber(t)}
        console.log(chalk.cyan("\n      \u6280\u80FD\u540D\u79F0\uFF1A" + this.skillName + "\n      \u6280\u80FD\u6B21\u6570:" + this.skillTimes + "\n      \u5C0F\u8BA1:" + this.subTotal + " \n    "));
    };
    return Skill;
}());
export default Skill;
export function formatNumber(value) {
    return numeral(numeral(value).format('0.00')).value();
}
function getCurrentCoefficient(coefficient1, coefficient2) {
    return coefficient1 !== undefined
        ? coefficient1
        : coefficient2 !== undefined
            ? coefficient2
            : 0;
}
function currySkill(callback, params) {
    if (params === void 0) { params = {}; }
    return function () {
        if (typeof callback !== 'function') {
            return callback;
        }
        return callback(params);
    };
}
//# sourceMappingURL=skill.js.map