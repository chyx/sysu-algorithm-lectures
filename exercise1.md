% 算法分析习题选讲
% chyx111@qq.com

<style type="text/css"> .reveal h1 { font-size: 2em; } .reveal h2 {font-size: 1.5em;} table {margin: auto!important; }</style>
<script type="text/javascript">
Reveal.configure({width: 1024, height: 768, maxScale: 2.0, center: false});
</script>

# SOJ 1020 Big Integer

## 题目大意


输入     输出      要计算的内容
----     --------  ------------------------
4        1 1 3 6    $13 \equiv 1 \pmod 2$
2 3 5 7             $13 \equiv 1 \pmod 3$
13                  $13 \equiv 3 \pmod 5$
                    $13 \equiv 6 \pmod 7$
（样例二）


## 对一个大整数求模


$12345678901234567890 \equiv ? \pmod m$

. . .

12345678901234567890 % m

. . .

12345 % m = (1234 * 10 + 5) % m = (1234 % m * 10 + 5) % m

1234 % m = (123 * 10 + 4) % m = (123 % m * 10 + 4) % m

123 % m = (12 * 10 + 3) % m = (12 % m * 10 + 3) % m

12 % m = (1 * 10 + 2) % m = (1 % m * 10 + 2) % m

## Code

~~~ {.cpp}
int GetRemainder(string input, int m) {
  int res = 0;
  for (int i = 0; i < input.size(); ++i) {
    res = (res * 10 + (input[i] - '0')) % m;
  }
  return res;
}
~~~

# 1021 Couple

## 题目大意

N对夫妇站成一圈，如果某对夫妇站在相邻位置，则从圈中移走，问最后能不能把人全部移走。

## 转化问题

把每对夫妇用1-N的整数表示。

## 用栈来解决
<div id="raphael1"></div>
<script src="raphael.js"></script>
<script src="tmp.js"></script>

## Code
~~~ {.cpp}
stack<int> st;
for (int i = 0; i < n + n; ++i) {
  if (!st.empty() && st.top() == couple_id[i]) {
    st.pop();
  } else {
    st.push(couple_id[i]);
  }
}
puts(st.empty() ? "Yes" : "No");
~~~

# 1027 MJ, Nowhere to Hide

## 题目大意

```
8
inkfish 192.168.29.24
zhi 192.168.29.235
magicpig 192.168.50.170
pegasus 192.168.29.235
iamcs 202.116.77.131
finalBob 192.168.29.24
tomek 202.116.77.131
magicduck 192.168.50.170
4
mmmmmm 172.16.72.126
kkkkkk 192.168.49.161
llllll 192.168.49.161
nnnnnn 172.16.72.126
0
```

给出N对BBS ID和IP Address，求出IP Address相同的BBS ID。

## 按IP地址分类

                                                                                inkfish 192.168.29.24
---------------------    -----------------------  --------------------------   ---------------------------
                         zhi 192.168.29.235
                                                    magicpig 192.168.50.170
                         pegasus 192.168.29.235
iamcs 202.116.77.131
                                                                                finalBob 192.168.29.24
tomek 202.116.77.131
                                                    magicduck 192.168.50.170

## Code

# 1035

# 1046 Plane Spotting

## 题目大意

* Craig喜欢为飞机拍照
* 飞机的出现序列为$p_i$(表示第i时间内出现了多少飞机)
* Craig希望在这个序列中选取连续的一段，即子序列，希望：

 1. 子序列平均值越大越好
 2. 如果平均值一样，则长度大的子序列好
 3. 如果长度也一样，则结束位置靠前的子序列好

# 1051

# 1198

# 1176

