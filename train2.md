% 周练2（10月12日，3小时）
% chyx111@qq.com

# UVA 101 The Blocks Problem    题意

有N个位置，编号为0～N-1

初始时，各个位置上放置这和位置编号相同的砖块，即砖块1，砖块2，...，砖块N-1

五种命令操作方式：

1. move a onto b：把砖a移动到砖b上面，如果a和b上面都有砖块，要先把它们放回原来位置
2. move a over b：把a移动到有b的“砖堆”上面，移动前需要把a上面的砖块都恢复到原位置，b的堆保持不变
3. pile a onto b：把a之上的（包括a）搬到b之上，要先把b上面的砖放回到原来位置
4. pile a over b：直接把a之上的（包括a）搬到b所在的“砖堆”上
5. quit：结束命令

. . .

--- ---- ---- ---- ---- -----
          3
 0   1    2    _    4     5
--- ---- ---- ---- ---- -----

$n \le 25$

# UVA 101 The Blocks Problem    解法

理解题意

直接用栈模拟

# UVA 102 Ecological Bin Packing

有Brown，Green，Clear三种颜色的杯子

现在有三个盒子，每个盒子中有三种数量不等的杯子

要使每个箱子中只有一种颜色的杯子，求需要移动最小的杯子数目以及之后每个箱中杯子的组成

# UVA 102 Ecological Bin Packing    解法

枚举三个盒子所有可能的最终状态

~~~
BCG
BGC
CBG
CGB
GBC
GCB
~~~

统计每种状态所需要的步数

# UVA 103  Stacking Boxes

给出几个多维的箱子

如果箱子的每一边都小于另一个箱子的对应边，就称这个箱子小于另一个箱子

求箱子套箱子最多能套多少层

# UVA 103  Stacking Boxes   解法

动态规划

dp[i], $1 \le i \le n$

dp[i] = 1 + max{dp[j], box j is inside box i}

~~~{.cpp}
int dp[kMaxN];
int from[kMaxN];

or

pair<int, int> dp[kMaxN];
~~~

# UVA 104 Arbitrage

n种货币

给出n行数据，每行n - 1个数字，表示该种货币与其他n - 1种货币的汇率

现在要在这些货币中找到一种货币，交换最少的次数，使得金额的数量增加（汇率大于1.01），并输出方案

# UVA 104 Arbitrage   解题思路

Floyd算法求最短路

~~~{.cpp}
for (int k = 0; k < n; ++k) {
  for (int i = 0; i < n; ++i) {
    for (int j = 0; j < n; ++j) {
      dp[i][j] = dp[i][k] + dp[k][j];
    }
  }
}
~~~

# UVA 105
# UVA 114
# UVA 115
# UVA 117
# UVA 121
# UVA 124
