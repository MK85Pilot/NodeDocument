---
title: "使用说明"
order: 3
description: "了解 NodePass 的三种操作模式和命令行语法。"
---

# 使用说明

NodePass创建一个带有未加密TCP控制通道的隧道，并为数据交换提供可配置的TLS加密选项。本指南涵盖三种操作模式并说明如何有效地使用每种模式。

## 命令行语法

NodePass命令的一般语法是：

```bash
nodepass "<core>://<tunnel_addr>/<target_addr>?log=<level>&tls=<mode>&crt=<cert_file>&key=<key_file>&min=<min_pool>&max=<max_pool>&mode=<run_mode>&read=<timeout>&rate=<mbps>&proxy=<mode>"
```

其中：
- `<core>`：指定操作模式（`server`、`client`或`master`）
- `<tunnel_addr>`：控制通道通信的隧道端点地址
- `<target_addr>`：业务数据的目标地址，支持双向模式（或在master模式下的API前缀）

### 查询参数说明

通用查询参数：
- `log=<level>`：日志详细级别（`none`、`debug`、`info`、`warn`、`error`或`event`）
- `min=<min_pool>`：最小连接池容量（默认：64，由客户端设置）
- `max=<max_pool>`：最大连接池容量（默认：1024，服务端设置并传递给客户端）
- `mode=<run_mode>`：运行模式控制（`0`、`1`或`2`）- 控制操作行为
- `read=<timeout>`：数据读取超时时间（默认：10m，支持时间单位如30s、5m、30m等）
- `rate=<mbps>`：带宽速率限制，单位Mbps（默认：0表示无限制）
- `proxy=<mode>`：PROXY协议支持（默认：`0`，`1`启用PROXY协议v1头部传输）

TLS相关参数（仅适用于server/master模式）：
- `tls=<mode>`：数据通道的TLS安全级别（`0`、`1`或`2`）
- `crt=<cert_file>`：证书文件路径（当`tls=2`时）
- `key=<key_file>`：私钥文件路径（当`tls=2`时）

## 运行模式

NodePass提供三种互补的运行模式，以适应各种部署场景。

### 服务端模式

服务端模式建立隧道控制通道，并支持双向数据流转发。

```bash
nodepass "server://<tunnel_addr>/<target_addr>?log=<level>&tls=<mode>&crt=<cert_file>&key=<key_file>&max=<max_pool>&mode=<run_mode>&read=<timeout>&rate=<mbps>&proxy=<mode>"
```

### 客户端模式

客户端模式连接到NodePass服务端并支持双向数据流转发。

```bash
nodepass "client://<tunnel_addr>/<target_addr>?log=<level>&min=<min_pool>&mode=<run_mode>&read=<timeout>&rate=<mbps>&proxy=<mode>"
```

### 主控模式 (API)

主控模式运行RESTful API服务器，用于集中管理NodePass实例。

```bash
nodepass "master://<api_addr>[<prefix>]?log=<level>&tls=<mode>&crt=<cert_file>&key=<key_file>"
```
