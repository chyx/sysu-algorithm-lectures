% 算法分析习题选讲(第二章)
% chyx111@qq.com

<style type="text/css"> .reveal h1 { font-size: 2em; } .reveal h2 {font-size: 1.5em;} table {margin: auto!important; }</style>
<script type="text/javascript">
Reveal.configure({width: 1024, height: 768, maxScale: 2.0, center: false});
</script>

# SOJ 1150 1151 1515 魔板

## 题目大意

给出魔板的起始状态，三种基本操作，步数上限和目标状态，
求从起始状态到目标状态的操作序列，长度不得超过上限。

## 三种基本操作

* 上下互换
<div id="way1"></div>

* 循环右移
<div id="way2"></div>

* 中间四块顺时针转
<div id="way3"></div>

<script src="raphael.js"></script>
<script src="lecture.js"></script>
<script>
var paper = Raphael('way1', 500, 100);
var w = 200;
var h = 100;
MagicBoard.createNew(paper, 0, 0, w, h, [1,2,3,4,8,7,6,5]);
MagicBoard.createNew(paper, 300, 0, w, h, [8,7,6,5,1,2,3,4]);

paper = Raphael('way2', 500, 100);
MagicBoard.createNew(paper, 0, 0, w, h, [1,2,3,4,8,7,6,5]);
MagicBoard.createNew(paper, 300, 0, w, h, [4,1,2,3,5,8,7,6]);

paper = Raphael('way3', 500, 100);
MagicBoard.createNew(paper, 0, 0, w, h, [1,2,3,4,8,7,6,5]);
MagicBoard.createNew(paper, 300, 0, w, h, [1,7,2,4,8,6,3,5]);
</script>

## 解题思路

* 对模板进行状态搜索
* 由一种状态可以转移到另外三种状态，搜索树为一棵三叉树
* 在这棵三叉树上搜索，目的是求出最优解。

## 算法一：DFS(深度优先搜索)

* 对这棵三叉树进行DFS
* 缺点：若想求得最优解，需要遍历整棵树，会遍历很多重复的节点
* 优化：若已找到一个可行解，可剪去大于等于这个深度的所有子树
* 效果：勉强可过1150
* 评价：很傻很天真

## 算法二：BFS(广度优先搜索)

* 对这棵三叉树进行BFS
* 第一个可行解即是最优解
* 效果：轻松切掉1150，但过不了1151
* 评价：很慢很暴力

## 算法三：BFS + 判重

* 对这棵三叉树进行BFS
* 第一个可行解即是最优解
* 判重

. . .

  BFS每经过一个节点，就把它放进已搜索列表中

  如果节点在已搜索列表存在，则不再扩展该节点

  共有8!=40320个节点

* 节点编码
 1. 康托展开
 2. 自定义编码，如把状态 <div id='board1'></div> 编码为整数12348765

<script>
var paper = Raphael('board1', 100, 50);
MagicBoard.createNew(paper, 0, 0, 100, 50, [1,2,3,4,8,7,6,5]);
</script>

## [*康托展开](http://zh.wikipedia.org/wiki/%E5%BA%B7%E6%89%98%E5%B1%95%E5%BC%80)

康托展开是一个全排列到一个自然数的双射，常用于构建哈希表时的空间压缩

N位的十进制整数可以由N个$<10$的数字表示

$X = a_n 10^{n-1} + a_{n-1} 10^{n-2} + ... + a_i 10^{i-1} + ... + a_1 10^{0}$

类似的，N个数字的排列可以由N个$<N$的数字表示

$X = a_n (n-1)! + a_{n-1} (n-2)! + ... + a_i (i-1)! + ... + a_1 0!$

$a_i$表示，在全排列$\pi$中，比$\pi_i$大而且位于$\pi_i$前面的数字的个数。

## Code
~~~{.cpp}
int const kMaxState = 40320;
bool visit[kMaxState];  // 8!
int parent[kMaxState];
int operation[kMaxState];

queue<State> que;
void update(const State& state, const State& new_state, char op) {
  que.push(new_state);
  visit[new_state.hash_value] = true;
  parent[new_state.hash_value] = state.hash_value;
  operation[new_state.hash_value] = op;
}

void bfs(State start) {
  memset(visit, 0, sizeof (visit));
  que.push(start);
  visit[start.hash_value] = true;
  while (!que.empty()) {
    State state = que.front();
    que.pop();

    State new_state = state; new_state.transformA();
    if (!visit[new_state.hash_value]) update(state, new_state, 'A');

    new_state = state; new_state.transformB();
    if (!visit[new_state.hash_value]) update(state, new_state, 'B');

    new_state = state; new_state.transformC();
    if (!visit[new_state.hash_value]) update(state, new_state, 'C');
  }
}
~~~

