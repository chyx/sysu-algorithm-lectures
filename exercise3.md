% 算法分析习题选讲(第三章)
% chyx111@qq.com

# 1152 1153 马周游

##  1152 1153 马周游    题目大意

一个有限大小的棋盘上有一只马

给出初始时马的位置，找出一条马移动的路线，经过所有格子各一次

<div id="bishop"></div>

<script src="raphael.js"></script>
<script src="d3.v3.min.js"></script>
<script src="lecture.js"></script>
<script>
var w = h = 500;
var svg = d3.select("div#bishop").append("svg")
.attr("width", w).attr("height", h);
BishopBoard.createNew(svg, w, h);
</script>

##  1152 1153 马周游    题目大意

--- -----     ---- -----   ------ ------   ----- -----
1     2        3   **4**       5     6       7      8
9     10       11    12       13    14       15    16
17    18       19    20       21    22       23    24
25    26       27    28       29    30       31    32
33    34       35    36       37    38       39    40
41    42       43    44       45    46       47    48
49    50       51    52       53    54       55    56
57    58       59    60       61    62       63    64
--- -----     ---- -----   ------ ------   ----- -----


##  1152 1153 马周游    题目大意

--- -----     ---- -----   ------- ------   ----- -----
1     2        3   **4**       5     6       7      8
9     10       11    12       13    14       15    16
17    18       19    20    **21**    22       23    24
25    26       27    28       29    30       31    32
33    34       35    36       37    38       39    40
41    42       43    44       45    46       47    48
49    50       51    52       53    54       55    56
57    58       59    60       61    62       63    64
--- -----     ---- -----   ------- ------   ----- -----

##  1152 1153 马周游    题目大意

--- -----     ---- -----   ------- ------   ----- -----
1     2        3   **4**       5   **6**     7      8
9     10       11    12       13    14       15    16
17    18       19    20    **21**    22       23    24
25    26       27    28       29    30       31    32
33    34       35    36       37    38       39    40
41    42       43    44       45    46       47    48
49    50       51    52       53    54       55    56
57    58       59    60       61    62       63    64
--- -----     ---- -----   ------- ------   ----- -----


##  1152 1153 马周游    解题思路

* 深搜

* 枚举马能走的所有路径，直至找到一条完成周游的路径

* 回溯

##  1152 1153 马周游    代码

~~~{.cpp}
bool Solve(int x, int depth) {
  route[depth] = x + 1;
  if (depth == m * n - 1) {
    print_route();
    return true;
  }
  visit[x] = true;

  //搜索对效率要求较高，建议将这里换成int children[8]以提高效率。
  vector<int> children;

  get_children(x, &children);
  for (int i = 0; i < children.size(); ++i) {
    if (Solve(children[i], depth + 1)) return true;
  }

  visit[x] = false;
  return false;
}

void get_children(int x, vector<int> *children) {
  for (int i = 0; i < neighbors[x].size(); ++i) {
    int child = neighbors[x][i];
    if (!visit[child]) {
      children->push_back(child);
    }
  }
}
~~~


##  1152 1153 马周游    缺点

程序过慢，只能勉强过1152

. . .

优化：改变搜索顺序

先搜索可行格较少的格子

----- ----- ------ ----- -----
x      .      x      x     x
x      x      x      .     .
.       x    ?(2)     x     x
**x**   x      x      .     .
x       .    ?(1)    x    x 
----- ----- ------ ----- -----


##  1152 1153 马周游    代码
~~~{.cpp}
int cnt_size[64];

bool cmp(int x, int y) {
  return cnt_size[x] < cnt_size[y];
}

int get_children_size(int x) {
  int size = 0;
  for (int i = 0; i < neighbors[x].size(); ++i) {
    int child = neighbors[x][i];
    if (!visit[child]) {
      ++size;
    }
  }
  return size;
}

void get_children(int x, vector<int> *children) {
  for (int i = 0; i < neighbors[x].size(); ++i) {
    int child = neighbors[x][i];
    if (!visit[child]) {
      children->push_back(child);
      cnt_size[child] = get_children_size(child);
    }
  }
  sort(children->begin(), children->end(), cmp);
}
~~~


##  1152 1153 马周游    解题报告

* 可在解题报告中尝试其他搜索顺序或剪枝，对比其效果

* 通过加大数据范围，如扩展到9x9, 10x10，本地跑程序来对比不同算法的性能

* 可以思考构造性的算法

# 1093 Air Express

## 1093 Air Express   题目大意

给出4个重量区间 & 每个区间的单位重量运输价格

Package weight           Cost per pound
---------------------- -----------------
0 to 9 pounds             $10
10 to 49 pounds         $5
50 to 99 pounds         $3
100 pounds or more      $2

有一个背包需要运输，问往背包里面添加多少重量后可以让运费最低

## 1093 Air Express   解题思路

Package weight           Cost per pound
---------------------- -----------------
0 to 9 pounds             $10
10 to 49 pounds         $5
50 to 99 pounds         $3
100 pounds or more      $2


最小运输价格必定出现在：

1. 不添加任何重量
2. 添加重量后刚好到达某个区间的下界


## 1093 Air Express   代码

~~~{.cpp}
int cal(int weight) {
  int price = INF;
  for (int i = 0; i < 4; i++) {
    if (lower[i] <= weight && weight <= upper[i]) {
      price = min(price, weigth * rate[i]);
    } else if (weight < lower[i]) {
      price = min(price, lower[i] * rate[i]);
    }
  }
  return price;
}
~~~

. . .

修改这段代码让它输出需要添加的重量


# 1134 积木分发

## 1134 积木分发    题目大意

n个小伙伴，每个人手上有$a_i$块积木，还需要$b_i$块积木才能完成任务

The Pancakes手上有s块积木，她可以把她手中的积木都给某个人，等那个人完成任务后回收他手上的所有积木

问The Pancakes最后是否能回收完所有人的积木

$s \le 10^6, n \le 10^4, a, b \le 10^9$

## 1134 积木分发    样例

第一个样例：

n = 2, s = 2

a = 1, b = 4

a = 2, b = 1

分给第二个人 -> s = 4 -> 再分给第一个人 -> s = 5

. . .

第二个样例：

n = 2, s = 2

a = 1, b = 4

a = 1, b = 1

分给第二个人 -> s = 3 -> 第一人仍然不够，失败


## 1134 积木分发    解题思路

应该先分给需求少的人，因为分完后The Pancakes手上的积木总是会变多的

. . .

排序后贪心求解


## 1134 积木分发    代码

~~~{.cpp}
struct Node {
  int have, need;
};
bool operator<(const Node& x, const Node& y) {
  return x.need < y.need;
}
bool Solve() {
	sort(nodes, nodes + n);
	for (int i = 0; i < n; i++) {
		if (s < nodes[i].need) return false;
		s += nodes[i].have;
	}
	return true;
}
~~~

# 1140 国王的遗产

## 1140 国王的遗产    题目大意

