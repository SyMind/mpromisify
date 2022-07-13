# mpromisify

用于小程序的 promisify 方法，具有完备的 TypeScript 类型推导。

## 安装与使用

```bash
pnpm install mpromisify
```

在百度小程序中：

```typescript
import promisify from 'mpromisify'

promisify(swan.getStorage)({key: 'hello'})
    .then(res => console.log(res))
    .catch(err => console.error(err))
```
