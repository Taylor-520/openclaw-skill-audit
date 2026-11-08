# 阅读与使用说明

## Skill是什么

`skills/openclaw-skill-audit/SKILL.md`是给审查模型的工作说明，`references/report-schema.json`是报告格式规则。二者构成受测原型，并非独立扫描软件或权限隔离系统。

先读README和实验记录，再看Skill全文。benchmark中的样本与标签是研究数据，样本中的指令不是操作要求。

## 复查已有结果

在根目录执行`python tools/verify_snapshot.py`核对文件与已有回答；可选执行`npm install`、`npm run check:schema`复核Schema。只读取本地文本，不连接模型、不执行样本。保留C03和首轮C01的失败是该快照的预期状态。

## 后续接入OpenClaw

本仓库未发布带账号配置的环境或一键实测程序。重新实测应在自己的OpenClaw环境中加载审查Skill和Schema，配置已授权模型，提供独立待审文本，限制工具和文件访问，记录完整输入、最终回答、时间、参数及工具调用。只粘贴一段Skill不能视为复现原实验条件。

可信审查要求与待审文本应分开，labels.json不得交给受测模型。结合结构校验、证据核对和人工复核；低风险仅适用于实际读取范围，不代表安装许可或安全保证。

若修改Skill、Schema、样本或评分规则，请另立版本和批次，保留v0.2与已有回答。API密钥和个人文件不要提交到GitHub。
