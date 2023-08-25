---
date: 2019-10-08
permalink: /posts/230860.html
category:
- Golang
tag:
- Golang
---

# Go中使用Seed得到重复随机数的问题


## 重复的随机数

废话不多说，首先我们来看使用seed的一个很神奇的现象。

```go
func main() {
	for i := 0; i < 5; i++ {
    rand.Seed(time.Now().Unix())
		fmt.Println(rand.Intn(100))
	}
}

// 结果如下
// 90
// 90
// 90
// 90
// 90
```

可能不熟悉seed用法的看到这里会很疑惑，我不是都用了seed吗？为何我随机出来的数字都是一样的？不应该每次都不一样吗？

可能会有人说是你数据的样本空间太小了，OK，我们加大样本空间到10w再试试。

```go
func main() {
	for i := 0; i < 5; i++ {
    rand.Seed(time.Now().Unix())
		fmt.Println(rand.Intn(100000))
	}
}

// 结果如下
// 84077
// 84077
// 84077
// 84077
// 84077
```

你会发现结果仍然是一样的。简单的推理一下我们就能知道，在上面那种情况，每次都取到相同的随机数跟我们所取的样本空间大小是无关的。那么唯一有关的就是seed。我们首先得明确seed的用途。



## seed的用途

在这里就不卖关子了，先给出结论。

上面每次得到相同随机数是因为在上面的循环中，每次操作的间隔都在毫秒级下，所以每次通过`time.Now().Unix()`取出来的时间戳都是同一个值，换句话说就是使用了同一个seed。

这个其实很好验证。只需要在每次循环的时候将生成的时间戳打印出来，你就会发现每次打印出来的时间戳都是一样的。

每次rand都会使用相同的seed来生成随机队列，这样一来在循环中使用相同seed得到的随机队列都是相同的，而生成随机数时每次都会去取同一个位置的数，所以每次取到的随机数都是相同的。

seed 只用于决定一个确定的随机序列。不管seed多大多小，只要随机序列一确定，本身就不会再重复。除非是样本空间太小。解决方案有两种：

- 在全局初始化调用一次seed即可
- 每次使用纳秒级别的种子（强烈不推荐这种）



## 不用每次调用

上面的解决方案建议各位不要使用第二种，给出是因为在某种情况下的确可以解决问题。比如在你的服务中使用这个seed的地方是串行的，那么每次得到的随机序列的确会不一样。

但是如果在高并发下呢？你能够保证每次取到的还是不一样的吗？事实证明，在高并发下，即使使用UnixNano作为解决方案，同样会得到相同的时间戳，Go官方也不建议在服务中同时调用。

> Seed should not be called concurrently with any other Rand method.

接下来会带大家了解一下代码的细节。想了解源码的可以继续读下去。



## 源码解析-seed

### seed

首先来看一下seed做了什么。

```go
func (rng *rngSource) Seed(seed int64) {
	rng.tap = 0
	rng.feed = rngLen - rngTap

	seed = seed % int32max
	if seed < 0 {  // 如果是负数，则强行转换为一个int32的整数
		seed += int32max
	}
	if seed == 0 { // 如果seed没有被赋值，则默认给一个值
		seed = 89482311
	}

	x := int32(seed)
	for i := -20; i < rngLen; i++ {
		x = seedrand(x)
		if i >= 0 {
			var u int64
			u = int64(x) << 40
			x = seedrand(x)
			u ^= int64(x) << 20
			x = seedrand(x)
			u ^= int64(x)
			u ^= rngCooked[i]
			rng.vec[i] = u
		}
	}
}
```

首先，seed赋值了两个定义好的变量，`rng.tap`和`rng.feed`。`rngLen`和`rngTap`是两个常量。我们来看一下相关的常量定义。

```go
const (
	rngLen   = 607
	rngTap   = 273
	rngMax   = 1 << 63
	rngMask  = rngMax - 1
	int32max = (1 << 31) - 1
)
```

由此可见，无论seed是否相同，这两个变量的值都不会受seed的影响。同时，seed的值会最终决定x的值，只要seed相同，则得到的x就相同。而且无论seed是否被赋值，只要检测到是零值，都会默认的赋值为`89482311`。

接下来我们再看seedrand。



### seedrand

```go
// seed rng x[n+1] = 48271 * x[n] mod (2**31 - 1)
func seedrand(x int32) int32 {
	const (
		A = 48271
		Q = 44488
		R = 3399
	)

	hi := x / Q 	  // 取除数
	lo := x % Q 	  // 取余数
	x = A*lo - R*hi // 通过公式重新给x赋值
	if x < 0 {
		x += int32max // 如果x是负数，则强行转换为一个int32的正整数
	}
	return x
}
```

可以看出，只要传入的x相同，则最后输出的x一定相同。进而最后得到的随机序列`rng.vec`就相同。

到此我们验证我们最开始给出的结论，即**只要每次传入的seed相同，则生成的随机序列就相同**。验证了这个之后我们再继续验证为什么每次取到的随机序列的值都是相同的。



## 源码解析-Intn

首先举个例子，来直观的描述上面提到的问题。

```go
func printRandom() {
  for i := 0; i < 2; i++ {
    fmt.Println(rand.Intn(100))
  }
}

// 结果
// 81
// 87
// 81
// 87
```

假设`printRandom`是一个单独的Go文件，那么你无论run多少次，每次打印出来的随机序列都是一样的。通过阅读seed的源码我们知道，这是因为生成了相同的随机序列。那么为什么会每次都取到同样的值呢？不说废话，我们一层一层来看。



### Intn

```go
func (r *Rand) Intn(n int) int {
	if n <= 0 {
		panic("invalid argument to Intn")
	}
	if n <= 1<<31-1 {
		return int(r.Int31n(int32(n)))
	}
	return int(r.Int63n(int64(n)))
}
```

可以看到，如果n小于等于0，就会直接panic。其次，会根据传入的数据类型，返回对应的类型。

虽然说这里调用分成了Int31n和Int63n，但是往下看的你会发现，其实都是调用的r.Int63()，只不过在返回64位的时候做了一个右移的操作。

```go
// r.Int31n的调用
func (r *Rand) Int31() int32 { return int32(r.Int63() >> 32) }

// r.Int63n的调用
func (r *Rand) Int63() int64 { return r.src.Int63() }
```



### Int63

先给出这个函数的相关代码。

```go
// 返回一个非负的int64伪随机数.
func (rng *rngSource) Int63() int64 {
	return int64(rng.Uint64() & rngMask)
}

func (rng *rngSource) Uint64() uint64 {
	rng.tap--
	if rng.tap < 0 {
		rng.tap += rngLen
	}

	rng.feed--
	if rng.feed < 0 {
		rng.feed += rngLen
	}

	x := rng.vec[rng.feed] + rng.vec[rng.tap]
	rng.vec[rng.feed] = x
	return uint64(x)
}
```

可以看到，无论是int31还是int63，最终都会进入`Uint64`这个函数中。而在这两个函数中，这两个变量的值显得尤为关键。因为直接决定了最后得到的随机数，这两个变量的赋值如下。

```go
rng.tap = 0
rng.feed = rngLen - rngTap
```

tap的值是常量0，而feed的值决定于rngLen和rngTap，而这两个变量的值也是一个常量。如此，每次从随机队列中取到的值都是确定的两个值的和。

到这，我们也验证了**只要传入的seed相同，并且每次都调用seed方法，那么每次随机出来的值一定是相同的**。



## 结论

首先评估是否需要使用seed，其次，使用seed只需要在全局调用一次即可，如果多次调用则有可能取到相同随机数。






