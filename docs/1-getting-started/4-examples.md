---
title: "使用示例"
order: 4
description: "探索 NodePass 在各种部署场景中的实际用例。"
---

# 使用示例

本页提供了NodePass在各种部署场景中的实际示例。这些示例涵盖了常见用例，可以根据您的具体需求进行调整。

## 基本服务器设置与TLS选项

### 示例1：无TLS加密

当速度比安全性更重要时（例如，在受信任网络中）：

```bash
nodepass "server://0.0.0.0:10101/127.0.0.1:8080?log=debug&tls=0"
```

### 示例2：自签名证书

为了平衡安全性和易于设置（推荐大多数情况）：

```bash
nodepass "server://0.0.0.0:10101/127.0.0.1:8080?log=debug&tls=1"
```

### 示例3：自定义域名证书

对于需要验证证书的生产环境：

```bash
nodepass "server://0.0.0.0:10101/127.0.0.1:8080?log=debug&tls=2&crt=/path/to/cert.pem&key=/path/to/key.pem"
```

## 连接到NodePass服务器

### 示例4：基本客户端连接

使用默认设置连接到NodePass服务器：

```bash
nodepass client://server.example.com:10101/127.0.0.1:8080
```

### 示例5：带调试日志的客户端

用于故障排除连接问题：

```bash
nodepass client://server.example.com:10101/127.0.0.1:8080?log=debug
```

## 高可用性与负载均衡

### 示例14：多后端服务器负载均衡

使用目标地址组实现流量均衡分配和自动故障转移：

```bash
# 服务端：配置3个后端Web服务器
nodepass "server://0.0.0.0:10101/web1.internal:8080,web2.internal:8080,web3.internal:8080?mode=2&tls=1&log=info"

# 客户端：连接到服务端
nodepass "client://server.example.com:10101/127.0.0.1:8080?log=info"
```

## 主控API管理

### 示例22：集中化管理

为多个NodePass实例设置中央控制器：

```bash
# 使用自签名证书启动主控API服务
nodepass "master://0.0.0.0:9090?log=info&tls=1"
```

然后您可以通过API调用管理实例：

```bash
# 创建服务器实例
curl -X POST http://localhost:9090/api/v1/instances \
  -H "Content-Type: application/json" \
  -d '{"url":"server://0.0.0.0:10101/0.0.0.0:8080?tls=1"}'

# 列出所有运行实例
curl http://localhost:9090/api/v1/instances
```
