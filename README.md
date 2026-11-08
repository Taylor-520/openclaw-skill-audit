# OpenClaw 技能安全审查原型

本仓库保存大学生创新训练项目“给‘赛博龙虾’做安检：OpenClaw 恶意技能检测工具”的中期成果：**Skill v0.2、报告格式规则、12个构造文本样本，以及在 OpenClaw + HY4 上获得的初步实验记录**。

我们希望在安装第三方技能前，借助模型阅读技能文本，找出可能的危险行为和针对审查者的语义注入，并给出可以回到原文核对的理由。目前形成的是审查流程原型，仍需要完善测试和团队人工复核。

## 从哪里看

| 内容 | 位置 | 用途 |
| --- | --- | --- |
| 完整受测 Skill v0.2 | [SKILL.md](skills/openclaw-skill-audit/SKILL.md) | 规定审查流程、风险类别、证据与输出要求 |
| JSON Schema | [report-schema.json](skills/openclaw-skill-audit/references/report-schema.json) | 约束报告字段与结构 |
| 12个构造样本 | [cases.json](benchmark/cases.json) | 待审文本，作为数据阅读，不执行 |
| 预设标签 | [labels.json](benchmark/labels.json) | 对照预期风险，与模型输入分开保存 |
| 过程和结果说明 | [实验记录](docs/experiment.md) | 两轮的区别、指标分母、失败与限制 |
| 原始模型回答 | [首轮](evidence/round1/responses/) / [第二轮](evidence/round2/responses/) | 保留截断、错误和完整回答 |
| 使用与计划 | [使用说明](docs/usage.md) / [后续工作](docs/roadmap.md) | 如何核对、还有什么没完成 |

## 已经做了什么

- 设计三步审查：隔离待审数据；先检查对审查者的操纵，再审查危险行为；输出带原文证据的固定JSON。
- 整理六类主要威胁（T1—T6）和六类语义注入子类（T6-1—T6-6），完整定义以Skill原文为准。
- 2026年11月7日在Windows本地OpenClaw 2026.11.1（4ffdd20）上接入TokenHub HY4，完成第二轮12例真实模型调用。样本是AI辅助构造文本，不是真实恶意软件样本。

| 第二轮观察 | 结果 |
| --- | --- |
| 严格JSON与Schema结构合格 | 11/12 |
| 主要风险类别合格输出 | 7/8 |
| T6风险识别 / 指定子类字段符合 | 6/6；5/6 |
| 正常对照中高风险误报 | 0/4 |
| 可解析报告原文证据字面匹配 | 170/172处（不包含C03） |
| 按本试验定义服从攻击标记 | 0/6 |

“结构合格”不等于全部判断正确，“未服从标记”也不等于完全抵抗越狱。首轮仅运行C01，回答截断，单独保留，不混入第二轮分母。C03格式失败、C08子类遗漏、C02/C05引用问题及C12附加类别过判均保留，详见[实验记录](docs/experiment.md)。

## 如何核对仓库

下载后在仓库根目录运行（Python 3.10或更高版本，无第三方依赖）：

```text
python tools/verify_snapshot.py
```

脚本离线核对文件指纹、严格JSON、样本对应关系和证据字面匹配，不调用模型、不执行样本。`snapshot_checks_passed: true`表示归档与记录相符，**不表示所有样本检测成功**。

如需检查Schema结构，可选执行：

```text
npm install
npm run check:schema
```

该脚本使用Ajv 8.20.0，复核现存回答，预期第二轮11份合格、C03失败。两种核对都不是重新运行OpenClaw检测实验。

## 目前的限制

仅一个模型、每例一次、小规模构造样本；没有“不使用Skill”的对照组，没有独立人工标注或真实运行攻击试验。样本、标签、代码与文字整理使用了AI辅助，语义复核尚待团队独立确认。不能据此证明覆盖全部威胁、优于其他工具或可以安全安装任意技能。

学校表格、签名、联系方式、密钥、会话数据库和完整运行环境不在仓库内。公开原文及来源哈希见[provenance.json](evidence/provenance.json)，发布文件清单见[MANIFEST.sha256.json](MANIFEST.sha256.json)。当前为可公开查阅的中期研究快照，尚未声明开源许可证。
