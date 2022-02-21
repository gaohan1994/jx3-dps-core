import React, { useState } from 'react';
import numeral from 'numeral';
import Jx3DpsCore, { Support } from '../index';

const JDCDemoApp = () => {
  const [result, setResult] = useState({} as any);
  const onCalculate = () => {
    const jdcSupport = new Support({
      target: Jx3DpsCore.Target.MuZhuang113,
      CWTimes: 3,
    });
    jdcSupport.use(Jx3DpsCore.TeamSkills.JinGangNuMu);
    jdcSupport.use(Jx3DpsCore.TeamSkills.QinLongJue);
    jdcSupport.use(Jx3DpsCore.Formations.TianLuoZhen);
    // jdcSupport.use(Jx3DpsCore.Weapons.SCW);
    jdcSupport.use({
      name: 'UPDATE08-30',
      type: 'Costom',
      data: [{ gainTarget: 'damageBonus', value: 0.03, coverage: 1 }],
    });
    jdcSupport.use({
      name: '少林常驻破防加成',
      type: 'Costom',
      data: [{ gainTarget: 'SolarOvercomePercent', value: 0.15, coverage: 1 }],
    });
    const jdc = new Jx3DpsCore(
      {
        Spunk: 2904,
        SolarAttackPowerBase: 15984,
        SolarCriticalStrikeRate: 32.93,
        SolarCriticalDamagePowerPercent: 189.28,
        SolarOvercomePercent: 54.05,
        SurplusValue: 4480,
        StrainPercent: 45.74,
        Haste: Jx3DpsCore.HasteList.YiDuanJiaSu,
        MeleeWeaponDamage: 2000,
      },
      jdcSupport,
      {
        qiXueVersion: Jx3DpsCore.CalculatorVersions.YiJinJingQiXueVersion.XinZheng,
        skillEnchant: Jx3DpsCore.CalculatorVersions.YiJinJingSkillEnchant.JinGangRiLun,
      }
    );
    setResult(jdc.calculate());
  };
  const { dps, seconds, total, skills = [], profit } = result;
  return (
    <div>
      <div>
        <h3>main calculator</h3>
        <button onClick={onCalculate}>claculate</button>
      </div>
      <div>
        <span>dps: {dps}</span>
        <span>total: {total}</span>
        <span>seconds: {seconds}</span>

        {skills && (
          <ul>
            {skills.map((skill: any) => (
              <li key={skill.skillName}>
                {`${skill.skillTitle} ${parseInt(`${skill.subTotal || 0}`)} ${
                  skill.skillTimes
                }次： ${numeral((skill.percent || 0) * 100).format('0.00')}%`}
              </li>
            ))}
          </ul>
        )}

        {profit && (
          <ul>
            {profit.map((item: any) => (
              <li key={item.skillName}>
                {`${item.title.slice(0, 4)}
      单分收益: ${numeral(item.pointProfit * 100).format('0.00')}%
      6级收益${numeral(item.profitWithStone.get(6)).format('0.00')}
      7级收益${numeral(item.profitWithStone.get(7)).format('0.00')}
      8级收益${numeral(item.profitWithStone.get(8)).format('0.00')} `}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default JDCDemoApp;
