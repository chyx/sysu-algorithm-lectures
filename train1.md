% 周练1（9月28日，3小时）
% chyx111@qq.com

# URAL 1001 Reverse Root

* 题意：求整数($\le 10^{18}$)的开方

* 解法：用double的sqrt函数即可，精度是足够的。

* 注意：数据是反向输出的，有很多组数据。

. . .

double的读入应该使用：

~~~{.cpp}
scanf("%lf", ...)
~~~

而不是

~~~{.cpp}
scanf("%f", ...)
~~~


# URAL 1005 Stone Pile

* 题意：有最多20个石子，请分成两堆，使得两堆石子的重量差最小

* 石子重量不超过$10^5$

. . .

[划分问题](http://en.wikipedia.org/wiki/Partition_problem)是NP完全问题，
一般用暴力或者动态规划的方法解决

# URAL 1005 Stone Pile    解法1

$2^n$枚举第一堆中的石子

用一个0 ~ $2^n - 1$的二进制数来表示选择哪些石子

~~~{.cpp}
for (int msk = 0; msk < (1 << n); ++msk) {
  int sum1 = 0, sum2 = 0;
  for (int i = 0; i < n; ++i) {
    if (msk & (1 << i)) {
      sum1 += weight[i];
    } else {
      sum2 += weight[i];
    }
  }
}
~~~

. . .

复杂度$O(n 2^n)$

# URAL 1005 Stone Pile    解法2

用0/1背包算法来解

复杂度$O(nW)$，W是总重量的最大值

# URAL 1005 Stone Pile    解法3

拆半枚举，先把石子分成两堆，每一堆进行$2^{n/2}$的枚举

这两堆的枚举可以分别得到两个差值的集合，设为$D_1$, $D_2$

那么，最后差值为$d = d_1 + d_2, d_1 \in D_1, d_2 \in D_2$

可以给$D_1$，$D_2$分别排序，然后用移动指针的方法枚举得到最小值

. . .

复杂度$O(2^{n/2}n)$

# URAL 1009 K-based Numbers   题目大意

输入N, K，表示一个N位的K进制数

满足条件

1. 没有前导0
2. 不能有两个或两个以上的连续的0

问有多少个这样的数字

# URAL 1009 K-based Numbers    思路分析

递推

. . .

n位可以根据n - 1位的信息推出

# URAL 1009 K-based Numbers    动态规划

dp[i][2]

dp[i][0]表示i位的K进制数，最后一位是0

dp[i][1]表示i位的K进制数，最后一位非0

. . .

dp[1][0] = 0

dp[1][1] = K - 1

. . .

dp[i][0] = dp[i - 1][1] ~~+ dp[i - 1][0]~~

dp[i][1] = (dp[i - 1][0] + dp[i - 1][1]) * (K - 1)


# URAL 1014 Product of Digits

求一个最小的数字Q，满足它的每一位数字的乘积等于N

如：10对应的数字为25，因为2 $\times$ 5 = 10


# URAL 1014 Product of Digits   解法

对0和1做特殊处理：

. . .

0 -> 10, 1 -> 1

. . .

对一般情况：

N的因子必须只由2,3,5,7组成

其中，5和7的处理比较简单，我们知道这些数字必然直接出现在Q的十进制表示中

2和3比较复杂，它们的出现可能是由于2,3,4,6,8,9等数字导致的

但是，注意到我们的目标是让生成的数字尽量的少，而3个2可以组成8，2个3可以组成9，2和3可以组成6

所以，我们只需要从9到1，贪心地把数字配出来即可

最后需要将数字排序输出，因为我们需要的是最小的Q

# URAL 1020 Rope

绳子在n个钉子上绕了一圈，求绳子的长度

![http://acm.timus.ru/problem.aspx?space=1&num=1020](http://acm.timus.ru/image/get.aspx/5efad458-3218-423f-b3f6-685fc554139f)

. . .

总长度 = 所有线段的长度 + 一个圆的长度

# URAL 1021 Sacrament of the Sum

给两个数的集合$A_1, A_2$，问是否有$a_1 \in A_1, a+2 \in A_2$，满足$a_1 + a_2 = 10000$

. . .

用hash来做，枚举$a_1$，查询$10000 - a_1$在不在集合$A_2$中


# URAL 1022 Genealogical Tree

N个火星人，有些火星人是某些火星人的祖先，要求给出一个座位顺序，使得长辈总是坐在后辈的前面

. . .

有向无环图

. . .

图的拓扑排序

# URAL 1025 Democracy in Danger

样例        解释
--------   ---------
3          投票人被分成K个组
5 7 5      每个组有若干个人

超过半数的组投赞成票，即可通过决议

一个组有超过半数的人投赞成票，该组就投赞成票

问通过决议至少需要多少人赞成

. . .

解法：贪心人数少的组

# URAL 1083 Factorials!!!

9!! = 1 × 3 × 5 × 7 × 9

又称[Multifactorials](http://en.wikipedia.org/wiki/Factorial#Multifactorials)

. . .

直接算

# URAL 1409 Two Gangsters

将两个输入调换位置，再同时减去1，最后输出



