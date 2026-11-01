# ADR 017 — 作者场景、通用人生场景与角色相对引用

日期：2026-11-01
状态：accepted

## 背景

作者写的 1912 场景直接使用 seed 的固定人物/家庭 id，文本也点名 Anna、Josef、Elisabeth。玩家新生儿无法安全复用这些场景：同样的 outcome 会把效果写到 Elisabeth 或 Bauer 家，即使 subject 是另一个孩子。完全依赖固定 id 会让玩家孩子没有人生内容。

## 决定

1. `SceneDefinition.subjectIds` 限定作者场景只对特定 seed 人物触发。
2. `SceneDefinition.subjectProvenance` 限定通用场景只对 `birth`（或明确允许的 `initial`）人物触发。
3. 通用场景使用角色相对引用：`$subject`、`$mother`、`$household`、`$employerOrg` 等；引擎在提交时解析为真实 id。
4. 文本使用 `{subject}`、`{mother}`、`{residence}`、`{school}` 等 token，在提交时替换为真实姓名/地点；未知 token 保留可见，不能静默编造。
5. 同年同一人物同一场景最多提交一次，避免年度两个检查点重复。

## 后果

- 作者场景不会污染玩家家庭；通用场景可以安全落到任意新生儿。
- 通用文本不能写死姓名，需要作者使用 token；测试检查未解析 token。
- 场景仍然是有界机制，不是任意脚本。

## 备选

- 让 LLM 为每个玩家实时改写场景：会把机制正确性交给模型，违反“LLM 不掩盖缺失系统”。
- 复制整份种子为每个玩家家庭：人口/机构/事件 id 爆炸且无法解释。
