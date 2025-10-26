---
title: "API 参考"
order: 1
description: "通过 NodePass 的 RESTful API 进行前端集成和自动化。"
---

# NodePass API 参考

## 概述

NodePass 主控模式（Master Mode）下提供 RESTful API，支持前端集成和自动化。本文档涵盖所有接口、数据结构和最佳实践。

## 主控模式 API

主控模式（`master://`）下，NodePass 支持：

1. 创建和管理服务端/客户端实例
2. 实时监控状态、流量、健康检查
3. 控制实例（启动、停止、重启、重置流量）
4. 配置自启动策略
5. 灵活参数配置

### 基础 URL

```
master://<api_addr>/<prefix>?<log>&<tls>
```

- `<api_addr>`：监听地址（如 `0.0.0.0:9090`）
- `<prefix>`：API 路径前缀（默认 `/api`）

### 主要接口

| Endpoint           | Method | 说明                 |
|--------------------|--------|----------------------|
| `/instances`       | GET    | 获取所有实例         |
| `/instances`       | POST   | 创建新实例           |
| `/instances/{id}`  | GET    | 获取实例详情         |
| `/instances/{id}`  | PATCH  | 更新/控制实例        |
| `/instances/{id}`  | PUT    | 更新实例 URL         |
| `/instances/{id}`  | DELETE | 删除实例             |
| `/events`          | GET    | SSE 实时事件流       |
| `/info`            | GET    | 获取主控服务信息     |
| `/info`            | POST   | 更新主控别名         |
| `/tcping`          | GET    | TCP连接测试          |
| `/openapi.json`    | GET    | OpenAPI 规范         |
| `/docs`            | GET    | Swagger UI 文档      |

### API 鉴权

API Key 认证默认启用，首次启动自动生成并保存在 `nodepass.gob`。

- 受保护接口：`/instances`、`/instances/{id}`、`/events`、`/info`、`/tcping`
- 公共接口：`/openapi.json`、`/docs`
- 认证方式：请求头加 `X-API-Key: <key>`
- 重置 Key：PATCH `/instances/********`，body `{ "action": "restart" }`

### 实例数据结构

```json
{
  "id": "a1b2c3d4",
  "alias": "别名",
  "type": "client|server",
  "status": "running|stopped|error",
  "url": "...",
  "config": "server://0.0.0.0:8080/localhost:3000?log=info&tls=1&max=1024&mode=0&read=1h&rate=0&slot=65536&proxy=0",
  "restart": true,
  "meta": {
    "peer": {
      "sid": "550e8400-e29b-41d4-a716-446655440000",
      "type": "1",
      "alias": "远程服务"
    },
    "tags": {
      "environment": "production",
      "region": "us-west",
      "owner": "team-alpha"
    }
  },
  "mode": 0,
  "ping": 0,
  "pool": 0,
  "tcps": 0,
  "udps": 0,
  "tcprx": 0,
  "tcptx": 0,
  "udprx": 0,
  "udptx": 0
}
```

### 完整的API参考

有关详细的API文档，请使用`/docs`端点提供的内置Swagger UI文档。

`http(s)://<api_addr>[<prefix>]/docs`

**示例:** `http://localhost:9090/api/docs`