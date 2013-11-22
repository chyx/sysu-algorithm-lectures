% 算法分析习题选讲(第四章)
% chyx111@qq.com

# 1259 Sum of Consecutive Primes

## 1259 Sum of Consecutive Primes   题目大意

给出一个正整数N，求出它有多少种方法可以表示成连续的素数的和

例如：

53 = 5 + 7 + 11 + 13 + 17

53 = 53

两种方法

$2 <= N <= 10000$

## 1259 Sum of Consecutive Primes   解题思路

先求出10000以内的所有素数

对每个输入，枚举连续的素数的起点，寻找是否有一段连续的素数与它相等，如果有则累加答案

## 1259 Sum of Consecutive Primes   素数筛法
~~~{.cpp}
const int kMaxN = 11000;
bool is_prime[kMaxN];
~~~

~~~{.cpp}
memset(is_prime, 1, sizeof (is_prime));
is_prime[0] = is_prime[1] = false;
for (int i = 4; i < kMaxN; i += 2) is_prime[i] = false;
for (int i = 3; i < kMaxN; ++i) if (is_prime[i]) {
  for (int j = i + i; j < kMaxN; j += i) {
    is_prime[j] = false;
  }
}
~~~

. . .

复杂度分析

估算：

$\frac^n_2 + \frac^n_3 + \frac^n_4 + \cdots + frac^n_n = n \log n$

[实际](http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes)

$O(n \log \log n)$

## 1259 Sum of Consecutive Primes   素数筛法 优化
~~~{.cpp}
memset(is_prime, 1, sizeof (is_prime));
is_prime[0] = is_prime[1] = false;
for (int i = 4; i < kMaxN; i += 2) is_prime[i] = false;
for (int i = 3; i * i < kMaxN; ++i) if (is_prime[i]) {
  for (int j = i * i; j < kMaxN; j += i) {
    is_prime[j] = false;
  }
}
~~~


## 1259 Sum of Consecutive Primes   枚举起点和连续序列
~~~{.cpp}
int ans = 0;
for (int i = 2; i <= n; ++i) if (is_prime[i]) {
  int sum = 0;
  for (int j = i; sum <= n; ++j) if (is_prime[j]){
    sum += j;
    if (sum == n) {
      ++ans;
      break;
    }
  }
}
~~~

# 1240 Faulty Odometer

## 1240 Faulty Odometer   题目大意

有个损坏的里程表，不能显示数字4，会从数字3直接跳到数字5

给出里程表的读数，求出实际里程

## 1240 Faulty Odometer   解题思路

里程表能显示的数字为012356789，总共9个，等价于九进制

以九进制的方式计算实际里程

## 1240 Faulty Odometer   进制转化
~~~{.cpp}
int ex = 1;
int ans = 0;
for (; n != 0; n /= 10) {
  int digit = n % 10;
  if (digit > 4) --digit;
  ans += ex * digit;
  ex *= 9;
}
~~~

# The Embarrassed Cryptography

## The Embarrassed Cryptography   题目大意

给出两个正整数K和L，问K是否存在小于L的质因数，有的话则找出最小的质因数

$4 \le K \le 10^{100}$, $2 \le L \le 10^6$

## The Embarrassed Cryptography   解题思路

先预处理不超过$10^6$的所有素数

对每个不超过L的素数，检查是否能整除K。

高精度除法

## The Embarrassed Cryptography   素数筛法，用bitset优化

~~~{.cpp}
const int kMaxN = 1100000;
bitset<kMaxN> is_prime;
vector<int> primes;
~~~

~~~{.cpp}
is_prime.set();
is_prime[0] = is_prime[1] = false;
for (int i = 4; i < kMaxN; i += 2) is_prime[i] = false;
for (int i = 3; i * i < kMaxN; ++i) if (is_prime[i]) {
  for (int j = i * i; j < kMaxN; j += i) {
    is_prime[j] = false;
  }
}
for (int i = 2; i < kMaxN; ++i) if (is_prime[i]) {
  primes.push_back(i);
}
~~~

## The Embarrassed Cryptography   大整数除普通整数，压缩

~~~{.cpp}
int n = strlen(input);
n_num = 0;
for (int i = n - 1; i >= 0; i -= 9) {
  ++n_num;
  num[n_num - 1] = 0;
  for (int j = 8; j >= 0; --j) if (i - j >= 0) {
    num[n_num - 1] = num[n_num - 1] * 10 + input[i - j] - '0';
  }
}
// input: 从高到低
// num: 从低到高!
~~~


