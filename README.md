# CI/CD Practice Project

这是一个云计算课程的CI/CD实践项目。

## 项目概述

简单的Node.js HTTP服务器,演示完整的CI/CD流程。

## 选项2: Docker + GitHub Actions

### 功能特性
- ? 自动化代码质量检查 (ESLint)
- ? 自动构建Docker镜像
- ? 推送到GitHub Container Registry (GHCR)
- ? 代码不规范时拒绝构建

### 工作流程
1. 代码推送到main分支
2. GitHub Actions自动触发
3. 运行ESLint检查代码质量
4. 如果通过,构建Docker镜像
5. 推送镜像到GHCR

### Docker镜像
```bash
docker pull ghcr.io/hppnw/ci-cd-practice:latest
docker run -p 3000:3000 ghcr.io/hppnw/ci-cd-practice:latest
```

访问: http://localhost:3000

## 选项3: Kubernetes部署

### 前置要求
- 已安装kubectl
- 已配置Kubernetes集群 (minikube/kind/云服务)
- Docker镜像已推送到GHCR

### 部署步骤

1. **确保Docker镜像可访问**
   ```bash
   # 如果GHCR镜像是私有的,需要创建imagePullSecret
   kubectl create secret docker-registry ghcr-secret \
     --docker-server=ghcr.io \
     --docker-username=YOUR_GITHUB_USERNAME \
     --docker-password=YOUR_GITHUB_TOKEN
   ```

2. **部署应用**
   ```bash
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   ```

3. **查看部署状态**
   ```bash
   kubectl get deployments
   kubectl get pods
   kubectl get services
   ```

4. **访问应用**
   - 使用LoadBalancer: `kubectl get svc ci-cd-practice-service` 查看外部IP
   - 使用minikube: `minikube service ci-cd-practice-service`
   - 使用NodePort: `http://节点IP:30080`

5. **查看日志**
   ```bash
   kubectl logs -l app=ci-cd-practice
   ```

6. **扩缩容**
   ```bash
   kubectl scale deployment ci-cd-practice --replicas=5
   ```

### 清理资源
```bash
kubectl delete -f k8s/service.yaml
kubectl delete -f k8s/deployment.yaml
```

## 技术栈

- **运行时**: Node.js 18
- **容器化**: Docker
- **CI/CD**: GitHub Actions
- **容器注册表**: GitHub Container Registry
- **代码质量**: ESLint
- **编排**: Kubernetes

## 项目结构

```
.
├── .github/
│   └── workflows/
│       └── docker-publish.yml    # CI/CD工作流
├── k8s/
│   ├── deployment.yaml           # K8s部署配置
│   └── service.yaml              # K8s服务配置
├── app.js                        # 应用程序
├── Dockerfile                    # Docker镜像构建
├── package.json                  # 项目依赖
└── eslint.config.mjs             # ESLint配置
```

## 开发

```bash
# 安装依赖
npm install

# 运行应用
node app.js

# 代码检查
npm run lint

# 构建Docker镜像
docker build -t ci-cd-practice .

# 运行容器
docker run -p 3000:3000 ci-cd-practice
```
