---
title: "Data in the Age of AI"
date: "2025-01-21T22:07:08+08:00"
updated: "2023-05-20T23:23:13+08:00"
tags:
source: "https://pivotal.substack.com/p/data-in-the-age-of-ai?ref=thediff.co"
hostname: "pivotal.substack.com"
author: "Abraham Thomas"
original_title: "Data in the Age of AI"
---
How does the sudden explosion in AI affect data and data businesses?  
人工智能的突然爆发如何影响数据及数据业务？

In this essay I present two answers and explore their implications:  
在这篇文章中，我提出了两个答案并探讨了它们的含义：

- A material change in the **relative values** of information and compute, with implications for both software and data business models.  
信息和计算相对价值的重大变化，对软件和数据业务模式均产生影响。
- An even more dramatic change in the **absolute quantities** of data and compute available in the world, with implications for trust, identity, quality and curation.  
世界数据和计算能力的绝对数量发生了更为显著的变化，这对信任、身份、质量和策展产生了影响。

But I’ll begin with some history. Data and data loops are the key driver of the best performing business models of the last decade, and through them, of the AI revolution itself. Let’s find out how!  
但我将从一些历史开始讲起。数据和数据循环是过去十年表现最佳商业模式的关键驱动力，也是通过它们推动了人工智能革命本身。让我们一探究竟！

I taught myself to code on a IBM PC clone running MS-DOS on an 8086. This was in the late 80s; the computer was cheap, functional and remarkably ugly, but it worked. And it had what was — for its time — a princely amount of storage: 30 whole megabytes of hard disk space.  
我在一台运行 MS-DOS 的 8086 IBM PC 兼容机上自学编程。那是在 80 年代末；那台电脑价格便宜、功能实用且相当丑陋，但它能用。而且它拥有当时堪称豪华的存储容量：整整 30 兆字节的硬盘空间。

A decade later, working my first job as a programmer, storage was easier to come by, but it was never out of my mind. I cared about memory leaks and access times and efficiency. Creating a clever data structure to hold yield curves for rapid derivatives pricing was one of my prouder achievements at the time. We didn't store everything, only what we needed to.  
十年后，我开始了作为程序员的第一份工作，存储变得更容易获得，但它从未离开我的脑海。我关心内存泄漏、访问时间和效率。创建一个巧妙的数据结构来持有收益率曲线，以便快速进行衍生品定价，是我当时引以为豪的成就之一。我们没有存储所有东西，只存储了我们需要的。

Another decade later, I just didn't care. At Quandl, the startup I founded, we saved *everything*. Not just the data assets that formed the core of our business, with all their updates and vintages and versions, but also all our usage logs, and API records, and customer reports, and website patterns. Everything.  
又一个十年过去，我已经不在乎了。在我创立的初创公司 Quandl，我们保存了一切。不仅包括构成我们业务核心的数据资产及其所有更新、历史和版本，还包括所有的使用日志、API 记录、客户报告和网站模式。一切的一切。

What happened? Well, [this](https://ourworldindata.org/grapher/historical-cost-of-computer-memory-and-storage):  
发生了什么？嗯，是这样的：

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F70f1f969-ea85-40e3-b4aa-6235266650bc_3400x2400.jpeg)

Quantitative changes that result in qualitative changes are always worth watching. Because it wasn't just Quandl that stored all its data; it was everyone. Everyone everywhere, all at once.  
导致质变的量变总是值得关注的。因为不仅仅是 Quandl 存储了所有数据；而是所有人。无处不在的每个人，同时都在这样做。

The 2010s were **the decade of the data explosion**. Driven by falling hardware costs, and — equally as important — by business models that made said hardware easy to access (shoutout to Amazon S3!), the world began to create, log, save, and use more data than ever before.  
2010 年代是数据爆炸的十年。在硬件成本下降的推动下，同样重要的是，商业模式使得这些硬件易于获取（向 Amazon S3 致敬！），世界开始创建、记录、保存和使用比以往任何时候都多的数据。

A huge number of the business models that ‘won’ the last decade are downstream of the data explosion:  
过去十年“获胜”的大量商业模式都源于数据爆炸的下游：

- *the entire content-adtech-social ecosystem  
整个内容广告技术社交生态系统*
- *the entire ecommerce-delivery-logistics ecosystem  
整个电子商务-交付-物流生态系统*
- *the infrastructure required to support these ecosystems  
支持这些生态系统所需的基础设施*
- *the devtools to build that infrastructure  
构建该基础设施的开发工具*

How so?   怎么会这样？

Consider **advertising**, still the largest economic engine of the internet. Facebook, Reddit, Youtube, Instagram, Tiktok and Twitter all rely on the exact same loop, linking users, content and advertisers:  
考虑广告，它仍然是互联网最大的经济引擎。Facebook、Reddit、YouTube、Instagram、TikTok 和 Twitter 都依赖于完全相同的循环，将用户、内容和广告商联系在一起：

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0318f3d1-0d47-4c5b-8c9f-4c1f1f9fb70a_1714x1228.jpeg)

Companies are able to offer users unlimited free storage for photos, videos, blog posts, updates and music; the content attracts more users, who attract advertisers, who subsidize the platform, and the cycle continues. None of this is possible without cheap, plentiful storage.  
公司能够为用户提供照片、视频、博客文章、更新和音乐的无限免费存储；这些内容吸引了更多用户，用户又吸引了广告商，广告商则补贴平台，如此循环往复。如果没有廉价且充足的存储，这一切都不可能实现。

Or consider **delivery and logistics**. It's easy to take for granted today, but the operational chops required to power same-day e-commerce, or ride-sharing, or global supply chains, are simply staggering. The famous [Amazon](https://www.samseely.com/posts/the-amazon-flywheel-part-1) and [Uber](https://andrewchen.com/ubers-virtuous-cycle-5-important-reads-about-uber/) flywheels are just special cases of a data learning loop:  
或者考虑一下交付和物流。如今很容易将其视为理所当然，但支持当日电子商务、拼车或全球供应链所需的运营能力简直令人震惊。著名的亚马逊和优步飞轮只是数据学习循环的特殊案例：

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4f5d7f81-7b28-492d-b4c4-ac5951d4de0f_1572x1203.jpeg)

These flywheels require up-to-date knowledge of customer locations, purchase and travel habits, store inventories and route geographies, driver and car availability, and a whole lot more. Again, none of this is possible without cheap, plentiful data1.  
这些飞轮需要最新的客户位置、购买和旅行习惯、商店库存和路线地理、司机和车辆可用性等信息，以及更多内容。同样，没有廉价且丰富的数据 1，这一切都不可能实现。

Note, incidentally, that all these flywheels are not just powered by data; they generate new data in turn. The data explosion is not just an explosion; it's a genuine chain reaction. **Data begets data.**  
顺便提一下，所有这些飞轮不仅仅由数据驱动；它们反过来也生成新数据。数据爆炸不仅仅是一次爆炸；它是一场真正的连锁反应。数据催生数据。

All these business models are, essentially, software. And that's no surprise! **Data and software are two sides of the same coin.**  
所有这些商业模式本质上都是软件。这并不奇怪！数据和软件是同一枚硬币的两面。

The software used to optimize businesses is useless without data to apply itself to. And data is worthless without software to interpret and act on it.  
用于优化业务的软件如果没有数据可供应用，就毫无用处。而没有软件来解读和操作数据，数据也毫无价值。

More generally, tools are useless without materials; materials don't have value unless worked on with tools.  
更广泛地说，没有材料，工具就毫无用处；除非用工具加工，否则材料也没有价值。

Economists call these ‘perfectly complementary inputs’: you need both to generate the desired output, and you can't substitute one for the other. An immediate consequence is that if the price of one input falls by a lot — perhaps due to a positive productivity shock — then the price of other is almost certain to rise.  
经济学家称这些为“完全互补的投入”：你需要两者来产生期望的输出，且无法用一方替代另一方。一个直接的后果是，如果其中一种投入的价格大幅下降——可能是由于积极的生产率冲击——那么另一种投入的价格几乎肯定会上升。

```
Imagine you're a tailor. To sew clothes, you need needles and fabric, and you're limited only by the quantity of each of those you can afford. (Needles and fabric are complementary inputs to the process of sewing).

Now imagine that the price of needles plummets, due to a new needle-manufacturing technology. Your response? Use the savings to buy more fabric, and thus sew more clothes! But if every tailor does this, then the price of fabric will rise. Tailors and consumers are both better off, the total quantity of clothing produced goes up, but the relative value of needles and fabric has changed.
```

For the last decade plus, the quantity of data in the world has been exploding: its price, therefore, implicitly declining. Software has been the relatively scarce input, and its price has increased: you can see this in everything from the salaries of software engineers to the market cap of top software companies. Software ate the world, with a huge assist from cheap, plentiful data.  
在过去的十多年里，全球数据量呈爆炸式增长：因此，其价格也在隐性下降。软件一直是相对稀缺的投入要素，其价格随之上涨：从软件工程师的薪资到顶级软件公司的市值，这一现象随处可见。软件吞噬了世界，而这背后离不开廉价且丰富的数据的巨大助力。

**And then came GPT, and everything changed.  
然后 GPT 出现了，一切都变了。**

GPT is a child of the data explosion. The flood of new data, generated by users but also by content farms and click factories and link bots and overzealous SEO agencies, necessitated the invention of new techniques to handle all that data. And it was a team of researchers at Google who wrote [Attention is All You Need](https://arxiv.org/abs/1706.03762), the paper that introduced the Transformers architecture underlying pretty much every modern generative AI model.  
GPT 是数据爆炸的产物。用户、内容农场、点击工厂、链接机器人以及过度热心的 SEO 机构产生的新数据洪流，催生了处理这些数据的新技术的发明。而正是谷歌的一个研究团队撰写了《Attention is All You Need》这篇论文，该论文介绍了几乎支撑所有现代生成式 AI 模型的 Transformer 架构。

The original peace dividend was that of the Cold War. Transistors, satellites and the internet were all offshoots of that conflict; today, they're used for more — far more — than just launching and tracking missiles. Similarly, although LLMs were invented to manage the data spun off by the Content Wars, they’re going to be used for a lot more than just Search.  
最初的和平红利来自冷战。晶体管、卫星和互联网都是那场冲突的副产品；如今，它们的用途远不止于发射和追踪导弹。同样，尽管LLMs的发明是为了管理内容战争产生的数据，但它们的用途将远不止于搜索。

GPT is *prima facie* a massive productivity boost for software. Technologists talk about the 10x programmer: the genius who can write high-quality code 10 times faster than anybody else. But thanks to GPT, *every* programmer has the potential to be 10x more productive than the baseline from just 2 years ago.  
GPT 表面上看极大地提升了软件开发的效率。技术专家们常谈论 10 倍程序员：那些能比其他人快 10 倍编写高质量代码的天才。但得益于 GPT，每位程序员都有潜力比两年前的基准效率高出 10 倍。

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_lossy/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F49783e90-f421-4731-bd11-1f9f176848c1_600x397.gif)

We are about to see the effects.  
我们即将看到效果。

**Move over data explosion; say hello to the compute explosion!  
数据爆炸已成过去；迎接计算爆炸的时代吧！**

The first and perhaps most obvious consequence of the compute revolution is that *data just got a whole lot more valuable.*  
计算革命的首个，或许也是最显而易见的后果是，数据的价值大幅提升。

This naturally benefits companies who already own data. But what’s valuable in an AI world is subtly different from what was valuable in the past.  
这自然有利于已经拥有数据的公司。但在人工智能世界中，有价值的东西与过去略有不同。

Some companies with ***unique data assets*** will be able to monetize those assets more effectively. [BloombergGPT](https://arxiv.org/abs/2303.17564) is my favourite example: it’s trained on decades of high-quality financial data that few others have. To quote a (regrettably but understandably anonymous) senior exec in the fin-data industry: “Bloomberg just bought themselves a twenty year lease of life with this”.  
一些拥有独特数据资产的公司将能够更有效地将这些资产货币化。BloombergGPT 是我最喜欢的例子：它基于数十年的高质量金融数据进行训练，这些数据是其他公司所不具备的。引用一位（遗憾但可以理解地匿名的）金融数据行业高管的话：“Bloomberg 通过此举为自己赢得了二十年的生存期”。

Other companies will realize that they are sitting on ***latent data assets*** — data whose value was unrecognized, or at any rate unmonetized. Not any more! Reddit is a good example: it's a treasure trove of high-quality human-generated content, surfaced by a hugely effective moderation and upvoting system. But now you have to [pay for it](https://www.searchenginejournal.com/reddit-paid-api/485172/#close).  
其他公司将意识到他们正坐拥潜在的数据资产——那些价值未被认可或至少未被货币化的数据。但这种情况将不复存在！Reddit 就是一个很好的例子：它是一个由高效审核和点赞系统挖掘出的高质量人类生成内容的宝库。不过现在，你得为此付费了。

You don't need huge content archives or expensive training to get meaningful results. Techniques like LoRA let you supplement large base models with your own prop data at relatively low cost. As a result, ***small custom data*** can hold a lot of value.  
你不需要庞大的内容档案或昂贵的培训就能获得有意义的结果。像 LoRA 这样的技术让你能够以相对较低的成本，用你自己的数据补充大型基础模型。因此，少量的定制数据也能蕴含巨大价值。

Quantity has a quality that’s all its own, but when it comes to training data, the converse is also true. ‘Data quality scales better than data size’: above a certain corpus size, the ROI from improving quality almost always outweighs that from increasing coverage. This suggests that ***golden data*** — data of exceptional quality for a given use case — is, well, golden.  
数量自有其独特的质量属性，但在训练数据方面，反之亦然。“数据质量的扩展性优于数据规模”：超过一定语料库规模后，提升质量的投资回报几乎总是超过扩大覆盖范围。这表明，黄金数据——针对特定用例具有卓越质量的数据——确实如同黄金般珍贵。

The increasing value of data has some downstream implications. In a previous essay, I wrote about the [economics of data assets](https://pivotal.substack.com/p/economics-of-data-biz):  
数据价值的提升带来了一些下游影响。在之前的一篇文章中，我探讨了数据资产的经济学：

> *The gold-rush metaphor may be over-used, but it’s still valid. Prospecting is a lottery; picks-and-shovels has the best risk-reward; jewellers make a decent living; and a handful of gold-mine owners become fabulously rich.  
> 淘金的比喻或许被过度使用，但它依然有效。勘探如同买彩票；镐铲工具风险回报最佳；珠宝商过着体面的生活；而少数金矿主则变得极其富有。*

The very best data assets, reshaped for AI use cases, are the new gold mines. But there are terrific opportunities for **picks-and-shovels** specifically designed around the increased salience of data in an AI-first world:  
为 AI 用例重塑的最佳数据资产，是新的金矿。但在一个以 AI 为首的世界中，围绕数据重要性提升而专门设计的“镐与铲”工具，蕴藏着巨大的机遇。

- tools to *build* new data assets for AI;  
为 AI 构建新数据资产的工具；
- tools to *connect* existing data assets to AI infra;  
将现有数据资产连接到 AI 基础设施的工具；
- tools to *extract* latent data using AI;  
使用 AI 提取潜在数据的工具；
- tools to *monetize* data assets of every sort.  
将各种数据资产货币化的工具。

More generally, the entire data stack needs to be refactored, such that **generative models become first-class consumers as well as producers of data**. Dozens of companies are emerging to do precisely this, from low-level infra providers like Pinecone and Chroma, to high-level content engines like Jasper and Regie, to glue layers like LangChain, and everything in between.  
更广泛地说，整个数据堆栈需要重构，使得生成模型不仅成为数据的一流生产者，也成为数据的一流消费者。数十家公司正在涌现，专门从事这项工作，从 Pinecone 和 Chroma 等底层基础设施提供商，到 Jasper 和 Regie 等高层内容引擎，再到 LangChain 等粘合层，以及介于两者之间的一切。

Quite apart from tooling, there's an entire **commercial ecosystem** waiting to be built around data in the age of AI. Pricing and usage models, compliance and data rights, a new generation of data marketplaces: everything needs to be updated. No more ‘content without consent’; even gold-rush towns need their sheriffs.  
除了工具之外，在人工智能时代，围绕数据还有一个完整的商业生态系统等待构建。定价和使用模式、合规性和数据权利、新一代数据市场：一切都需要更新。不再有“未经同意的内容”；即使是淘金热城镇也需要他们的警长。

High-value information assets; a new generation of picks-and-shovels; a reimagined ecosystem for data: the world of data business just got a lot more interesting!  
高价值信息资产；新一代的“镐与铲”；数据生态系统的重构：数据业务的世界刚刚变得更加有趣！

The second major consequence of AI is that the quantity of both data and compute in the world is going to increase dramatically. There’s flywheel acceleration: data feeds the compute explosion and compute feeds the data explosion. And there’s also a direct effect: after all, **generative models don't just consume data; they produce it.**  
人工智能的第二个主要后果是，全球的数据量和计算量都将急剧增加。存在飞轮加速效应：数据推动了计算的爆炸式增长，而计算又促进了数据的爆炸式增长。此外，还有直接影响：毕竟，生成模型不仅仅消耗数据；它们还生成数据。

Right now the output is mostly *ephemeral*. But that's already changing, as ever more business processes begin to incorporate generative components.  
目前，输出大多是短暂的。但随着越来越多的业务流程开始融入生成组件，这种情况已经在改变。

What does this imply for data?  
这对数据意味着什么？

We’re entering a world of unlimited content. Some of it is legit, but much of it isn’t — spam bots and engagement farmers, deep fakes and psyops, hallucinations and artefacts. Confronted with this infinite buffet, how do you maintain a healthy information diet?  
我们正进入一个内容无限的世界。其中一些是合法的，但大部分并非如此——垃圾邮件机器人和参与度农场、深度伪造和心理战、幻觉和人为产物。面对这无限的自助餐，你如何保持健康的信息饮食？

The answer is **the confidence chain** — a series of proofs, only as strong as its weakest link. Who created this data or content; can you prove that they created it; can you prove they are who they say they are; is what they created ‘good’; and does it match what I need or want? **Signatures, provenance, identity, quality, curation.**  
答案是信任链——一系列证明，其强度仅取决于最薄弱的一环。谁创建了这些数据或内容；你能证明是他们创建的吗；你能证明他们就是他们自称的那个人吗；他们创建的内容是否“优质”；以及它是否符合我的需求或期望？签名、来源、身份、质量、筛选。

The first three are closely linked. Signatures, provenance and identity: where does a something really come from, and can you prove it? After all, “on the internet, nobody knows you’re an AI”. Technologically, this space remains largely undefined, and therefore interesting. (The irony is that it’s an almost perfect use case for zero-knowledge crypto — and crypto has been utterly supplanted in the public imagination by AI.)  
前三个紧密相连。签名、出处和身份：某物究竟来自何处，你能否证明？毕竟，“在互联网上，没人知道你是个 AI”。从技术角度看，这一领域在很大程度上仍未明确界定，因而引人入胜。（讽刺的是，这几乎是零知识加密的完美应用场景——而在公众的想象中，加密技术已被 AI 彻底取代。）

The last two are also closely linked. Curation is how quality gets surfaced, and we’re already seeing the emergence of **trust hierarchies** that achieve this. Right now, my best guess at an order is something like this:  
最后两者也紧密相连。策展是质量得以显现的方式，我们已经看到了实现这一点的信任层级的出现。目前，我对顺序的最佳猜测大致如下：

> *filter bubbles > friends > domain experts ~= influencers > second-degree connections > institutions > anonymous experts ~= AI ~= random strangers > obvious trolls  
> 过滤气泡 > 朋友 > 领域专家 ≈ 影响者 > 二级连接 > 机构 > 匿名专家 ≈ 人工智能 ≈ 随机陌生人 > 明显的喷子*

But it's not at all clear where the final order will shake out, and I wouldn’t be surprised to see “curated AI” move up the list.  
但最终顺序将如何确定尚不清楚，如果看到“精选 AI”在列表中上升，我也不会感到惊讶。

A nuance that often gets lost here is that curation is not about ranking; it's about **matching**. If generative AI increases the total volume of content in the world 100x, that does not imply that your quality filter needs to be 1/100 as restrictive. There's no ‘law of conservation of quality’; no upper limit to the number of high-quality creations possible. The limiting factor is your bandwidth as a consumer of content.  
这里常常被忽视的一个细微差别是，策展并非关乎排名，而是匹配。如果生成式人工智能将世界上的内容总量增加了 100 倍，这并不意味着你的质量过滤器需要放宽到原来的 1/100。不存在“质量守恒定律”；高质量创作的数量没有上限。限制因素在于你作为内容消费者的带宽。

Hence the goal of curation is not to rank the ‘best’ X of any category, but rather to find the X that (conditional on a minimum quality cutoff) best matches your profile. (And your profile may not be neutral or objective; this is why filter bubbles are at the very top of the trust hierarchy.)  
因此，策展的目标不是对任何类别的“最佳”X 进行排名，而是找到（在最低质量门槛的前提下）最符合你个人资料的 X。（而你的个人资料可能并非中立或客观；这就是为什么过滤气泡位于信任层级的顶端。）

(Note that the entirety of this section is applicable to B2B use cases and a wide range of data types, not just consumer use cases and social content.)  
（请注意，本节内容适用于 B2B 用例和多种数据类型，而不仅仅是消费者用例和社交内容。）

Data becomes more valuable; ecosystems need to be retooled; the data explosion will accelerate; and trust chains will emerge. What about compute itself?  
数据变得更有价值；生态系统需要重新调整；数据爆炸将加速；信任链将出现。计算本身呢？

Just like the default behaviour for data flipped from ‘conserve memory’ to ‘save everything’, the default behaviour for software is going to flip to ‘compute everything’.  
就像数据从“节省内存”翻转为“保存一切”的默认行为一样，软件的默认行为也将翻转为“计算一切”。

What does it mean to compute all the things? **Agents, agents everywhere.** We used to talk about human-in-the-loop to improve software processes; increasingly, we're going to see **software-in-the-loop** to streamline human processes. This manifests as AI pilots and co-pilots, AI research and logistics assistants, AI interlocutors and tutors, and a plethora of AI productivity apps.  
计算一切意味着什么？代理无处不在。我们过去常讨论通过人在回路中来改进软件流程；而如今，越来越多地，我们将看到软件在回路中以简化人类流程。这表现为 AI 飞行员和副驾驶、AI 研究和物流助手、AI 对话者和导师，以及大量的 AI 生产力应用。

Some of these help on the data/content generation side; they’re productivity tools. Others help on the data/content consumption side; they’re custom curators, tuned to your personal matching preferences.  
其中一些在数据/内容生成方面提供帮助；它们是生产力工具。另一些则在数据/内容消费方面发挥作用；它们是定制策展人，根据你的个人匹配偏好进行调整。

More pithily, if you’re a Neal Stephenson fan:  
更简洁地说，如果你是尼尔·斯蒂芬森的粉丝：

An open question is whether these agents will compress or magnify current differentials in power, wealth and access. Will the rich and famous have better AI agents, and get even richer and more famous compared to the masses? History suggests not; that productivity is a democratizer; but you never know.  
一个悬而未决的问题是，这些代理是否会压缩或放大当前在权力、财富和获取途径上的差异。富人和名人是否会拥有更好的 AI 代理，并因此比大众变得更富有、更出名？历史表明并非如此；生产力是一种民主化力量；但你永远无法预知未来。

The 19th century British economist William Jevons observed a paradox in the coal industry. Even though individual coal plants became more efficient over time — using less coal per unit of energy produced — the total amount of coal used by the industry did not decline; it increased. Efficiency lowered the price of coal energy, leading to more demand for that energy from society at large.  
19 世纪英国经济学家威廉·杰文斯观察到煤炭行业的一个悖论。尽管单个煤矿的效率随着时间的推移而提高——每单位能源消耗的煤炭减少——但整个行业使用的煤炭总量并未下降；反而增加了。效率降低了煤炭能源的价格，导致社会对能源的需求增加。

Something very similar is happening with the data-software complex. It’s not just that data and software reinforce each other in a productivity flywheel. It’s not just that generative models produce and consume data, produce and consume code. It’s that the price of ‘informed computation’ has fallen, and the consequence is that there will be a lot more informed computation in the world.  
数据-软件复合体正在发生非常相似的情况。不仅仅是数据和软件在生产力飞轮中相互强化。也不仅仅是生成模型生产和消费数据，生产和消费代码。而是“知情计算”的成本已经下降，其结果是世界上将会有更多的知情计算。

A possibly lucrative question to ask is, where are the new areas of scarcity? The hardware that powers compute and data is an obvious candidate: as the latter exponentiate, the former cannot keep up. Persistent and recurring chip shortages are a symptom of this; my hypothesis is that this is not a problem of insufficient supply, it’s a problem of literally insatiable demand, driven by the Jevons effect.  
一个可能带来丰厚回报的问题是，新的稀缺领域在哪里？支撑计算和数据的硬件是一个显而易见的候选者：随着后者呈指数级增长，前者却难以跟上。持续且反复出现的芯片短缺正是这一现象的症状；我的假设是，这并非供应不足的问题，而是由杰文斯效应驱动的、字面意义上无法满足的需求问题。

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feed9bea1-5c03-479d-a1a6-35e0db8b42d4_1176x230.png)

See [original tweet](https://twitter.com/TheTranscript_/status/1656137426522238977). Druck is talking his book, but NVDA’s stock price doesn’t lie.  
查看原推文。Druck 在自说自话，但 NVDA 的股价不会说谎。

Another candidate for scarcity is energy. Large model training consumes a huge amount of energy, but at least it’s confined to a few firms. But once you add in accelerating flywheels, the compute explosion and agents everywhere, the quantities become vast. We haven’t felt the pinch yet because of recent improvements in energy infra — solar efficiency, battery storage and fracking — and there’s hope that informed compute will help maintain those learning curves.  
另一个可能面临稀缺的是能源。大型模型训练消耗大量能源，但至少目前仅限于少数公司。然而，一旦加上加速的飞轮、计算爆炸和无处不在的智能体，能源需求量将变得巨大。由于近期能源基础设施的改进——太阳能效率、电池存储和页岩气开采——我们尚未感受到压力，并且有希望认为智能计算将有助于维持这些学习曲线。

Watch out for *artificial* scarcity. Society may benefit from abundance, but individuals and corporations have different incentives; they make seek to constrain or capture the gains from ubiquitous, cheap, powerful data and computation.  
警惕人为制造的稀缺性。社会可能从丰裕中受益，但个人和公司有不同的动机；他们可能试图限制或攫取无处不在、廉价且强大的数据和计算所带来的收益。

Finally and most provocatively, what happens to human beings in this brave new world? Are we a scarce and valuable resource, and if so why — for that nebulous entity we call ‘creativity’, or for our ability to accomplish physical tasks? Will AI augment human capacity, or automate it away? I believe in abundance and I’m optimistic; the only way to find out is to go exploring. We live in interesting times!  
最后，也是最引人深思的是，在这个勇敢的新世界里，人类将何去何从？我们是否是一种稀缺且宝贵的资源，如果是，原因何在——是为了我们称之为“创造力”的模糊实体，还是为了我们完成体力任务的能力？人工智能是会增强人类的能力，还是将其自动化取代？我相信富足，并持乐观态度；唯一找出答案的方法就是去探索。我们生活在一个有趣的时代！

*Toronto, 16 May 2023.  多伦多，2023 年 5 月 16 日。*

- If you found this essay thought-provoking, **please share it** — on social media, with friends, enemies, or anyone else you think might enjoy it.  
如果你觉得这篇文章发人深省，请分享它——在社交媒体上，与朋友、敌人或任何你认为可能会喜欢它的人分享。
- **Please subscribe** to my newsletter, [Pivotal](https://pivotal.substack.com/about). I write essays on data, investing, and startups. My essays are infrequent, usually in-depth, and hopefully insightful. Also, they’re free.  
请订阅我的通讯《Pivotal》。我撰写关于数据、投资和初创企业的文章。我的文章发布不频繁，通常深入探讨，并希望能带来洞见。此外，它们都是免费的。
- Writing in public is an exercise in ‘tapping a tuning fork and seeing who resonates’. If this essay resonated with you, [come and say hi](https://abrahamthomas.info/about/)!  
公开写作是一种“敲击音叉，看看谁会产生共鸣”的练习。如果这篇文章与你产生了共鸣，来打个招呼吧！
- I’m an [active angel investor](https://abrahamthomas.info/investing/) in tech startups, many of whom fit the templates of companies described in today’s essay:  
我是一位活跃于科技初创企业的天使投资人，其中许多企业都符合今天文章中描述的公司模板：

- [Arima](https://arimadata.com/), [Citylitics](https://citylitics.com/) and [Daloopa](https://www.daloopa.com/) are building new data assets  
Arima、Citylitics 和 Daloopa 正在构建新的数据资产
- [Setyl](https://setyl.com/), [Ubico](https://www.ubico.io/) and [Getware](https://www.ubico.io/) are extracting latent data  
Setyl、Ubico 和 Getware 正在提取潜在数据
- [Quandri](https://quandri.io/), [Mero](https://www.mero.co/) and [Canopy](https://www.canopyanalytics.com/) are data capture companies  
Quandri、Mero 和 Canopy 是数据捕获公司
- [Syro](https://www.syro.com/) is working on identity and secret  
Syro 正在处理身份和机密
- If you’re building a company along similar lines, I’d love to hear from you.  
如果你正在以类似的方式创建公司，我很乐意听取你的消息。
- **\[Off-topic\]** Is high-quality preference-matched content really that valuable? To test this hypothesis, I’ve written a curated guide to visiting Japan. If you like my essay, you might like this guide: it’s selective, deep and informed. [Check it out](http://abrahamthomas.gumroad.com//l/wwrni)!  
\[离题\] 高质量偏好匹配内容真的那么有价值吗？为了验证这一假设，我撰写了一份精选的日本旅游指南。如果你喜欢我的文章，你可能会喜欢这份指南：它精选、深入且信息丰富。快来看看吧！