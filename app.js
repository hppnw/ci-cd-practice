const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Cloud Computing Class!');
});

// 故意添加一些不规范的代码来测试lint
var unusedVariable = "this is bad";  // 使用var而不是const/let
const anotherUnused = 123            // 缺少分号
undeclaredVariable = "oops"          // 未声明的变量

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
