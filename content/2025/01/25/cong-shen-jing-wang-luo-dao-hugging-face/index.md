---
title: 从神经网络到 Hugging Face
date: '2025-01-25T22:32:15+08:00'
updated: '2024-03-17T18:43:00+08:00'
taxonomies:
  tags: null
extra:
  source: https://hutusi.com/articles/the-history-of-neural-networks
  hostname: hutusi.com
  author: hutusi
  original_title: 从神经网络到 Hugging Face
  original_lang: zh
---

> **摘要**: 本文回顾了神经网络和深度学习的历史，从感知机、深度信念网络到现代大模型，作者详述了重要人物如杰弗里·辛顿的贡献及其研究基础，以及关键技术的演变。辛顿在深度学习领域的创新，包括误差反向传播算法的提出和深度信念网络的应用，解决了多层神经网络的训练难题，推动了深度学习的发展。文章还介绍了感知机的历史及其局限性，强调了连接主义与符号主义的竞争，以及深度学习在实际应用中的重要性，最终触及到大模型如GPT和Hugging Face在AI民主化中扮演的角色。
> 
>  **要点总结**:
>  1. 深度信念网络由杰弗里·辛顿提出解决了多层神经网络训练难题。
>  2. 感知机的工作原理及其历史贡献被回顾，指出其在处理非线性分类问题上的局限性。
>  3. 连接主义（神经网络）与符号主义（专家系统）在人工智能的发展中存在竞争关系。
>  4. 深度学习的兴起及其对现代AI应用（如GPT）的重要性。
>  5. Hugging Face作为深度学习工具的开创者，促进了AI开发的标准化与民主化。

---


## 神经网络和深度学习简史

March 17, 2024

TL;DR 本文8200+字，全文阅读约需15分钟。从去年开始，我读了十余本人工智能方面入门的书籍（参见文末附2），酝酿了两个月，花了两周时间写作此文。本文简要回顾了从感知机到深度学习及Hugging Face的历史，并试图以通俗的语言来介绍神经网络和深度学习的原理。

> 生活中没有什么可怕的东西，只有需要理解的东西。
> 
> —— 居里夫人

## 一 深度信念网络

2006年，加拿大多伦多大学教授杰弗里·辛顿在研究如何训练多层神经网络，他已经在神经网络领域默默耕耘了三十多年，尽管在这个领域他算得上是泰斗级的人物，但由于神经网络在人工智能行业一直不被看好，所以他的研究成果一直不为业界所重视。

辛顿出生于英国伦敦，他的家族出过不少知名学者，创立布尔代数的逻辑学家乔治·布尔便是他的曾曾祖父。他的祖父是位科普作家，父亲是昆虫学家。辛顿比周围的人都要聪明，但他的求学之路却颇为曲折，先是在大学攻读建筑学，转而又选择物理学，后又改读哲学，最后以心理学学士身份毕业。1972年辛顿进入爱丁堡大学攻读博士学位，研究方向是神经网络。彼时神经网络被业界所鄙夷，连辛顿的导师也认为这玩意没什么实际用途，也没有前途可言。但辛顿却不为所动，对神经网络研究怀有信心，坚持认为能够证明神经网络的价值，这一坚持就是三十多年。

![geoffery-hinton.jpg](geoffery-hinton.jpg)

辛顿年轻的时候有一次搬移取暖器，腰椎间盘滑脱了，此后便一直饱受腰背病痛问题的困扰。近年来，问题更严重了，大多数时候，他需要平躺着以缓解疼痛，这意味着他不能开车，也不能坐飞机，甚至在实验室里会见学生时，也要平躺在办公室的折叠床上。身体上疼痛的折磨带给辛顿的打击还不如学术研究被冷漠那么大。早在1969年，明斯基在《感知机》一书中就对多层感知机下了定论，给后来的神经网络研究盖戳：“多层感知机不会有发展前景，因为世界上没人可以将多层感知机训练得足够好，哪怕是令它可以学会最简单的函数方法。” 单层感知机能力有限，连“异或”这种基础的分类问题也实现不了，而多层感知机又没有可用的训练方法，等于说神经网络的研究方向是死路一条。神经网络在业界被认为是学术异端，没有人相信它可以成功，因此一般学生在选择导师的时候都谨慎绕开神经网络，一时间辛顿甚至都招不满研究生。

1983年，辛顿发明玻尔兹曼机，后来，简化后的受限玻尔兹曼机被应用于机器学习，成为深度神经网络的层级结构基础。1986年，辛顿提出适用于多层感知机的误差反向传播算法（BP），这一算法奠定了后来深度学习的基础。辛顿每隔一段时间都能发明出新东西，而他也坚持写了两百多篇神经网络相关的论文，尽管这些论文不被待见。到了2006年，辛顿已经积累了丰富的理论和实践基础，而这一次，他发表的论文将改变整个机器学习乃至整个世界。

辛顿发现，拥有多个隐藏层的神经网络能够具有自动提取特征学习的能力，相比传统的手工提取特征的机器学习更有效果。另外，通过逐层预训练的方式可以降低多层神经网络的训练难度，而这解决了长期以来多层神经网络训练的难题。辛顿将他的研究成果发表在两篇论文中，而当时神经网络一词被许多学术期刊编辑所排斥，有些稿件的标题甚至因为包含“神经网络”就会被退回。为了不刺激这些人的敏感神经，辛顿取了个新名字，将该模型命名为“深度信念网络”（Deep Belief Network）。

## 二 感知机

其实神经网络的研究可以追溯到上世纪四十年代。1940年，17岁的沃尔特·皮茨在伊利诺伊大学芝加哥分校结识了42岁的教授沃伦·麦卡洛克，一见如故，便加入了后者的研究项目：尝试用神经元网络建立一个在逻辑运算基础上的机械性的大脑思维模型。他们用逻辑运算来抽象人类大脑的思维模型，提出了“神经网络”（Neural Network）这一概念，而神经元是神经网络中的最小信息处理单元；并且他们将神经元的工作过程抽象简化成一个非常简单的逻辑运算模型，后来这个模型被命名为“M-P神经元模型”，以他们两姓名的首字母来命名。

在这个模型中，一个神经元会接受过个来自于其他神经元传递过来的输入信号，不同的输入信号的重要性有差异，这种差异就通过连接上的“权重”（weight）大小来表示，该神经元将所有输入值按照权重加权求和，再将结果跟神经元的“激发阈值”（Threshold）进行比较，以决定是否对外输出信号。

![m-p-model.png](m-p-model.png)

“M-P模型”足够简单直接，而且可以通过符号逻辑来模拟实现，人工智能专家以该模型为基础，构建了神经网络模型，用来解决机器学习任务。这里简单说明下人工智能、机器学习和深度学习的关系：人工智能就是使用计算机技术来实现人类智能的技术，在一般教材定义为研究与构建智能体。智能体就是 Intelligent agent，或简称 agent，它通过模仿人类思维和认知来解决特定任务或通用任务，解决特性任务的智能体被称为弱人工智能，或狭义人工智能（ANI），而解决通用任务的智能体被称为强人工智能，或通用人工智能（AGI）。机器学习是人工智能的一个分支，它通过数据进行学习并改进系统。而深度学习则又是机器学习的一个分支，它使用神经网络技术进行机器学习。

1957年，康奈尔大学心理学教授罗森布拉特在IBM计算机上模拟实现了一个神经网络模型，他称之为“感知机”（Perceptron）。他的做法是将一组M-P模型神经元组合在一起，可以用来训练并完成一些机器视觉模式识别方面的任务。一般来说，机器学习有两种任务：分类和回归。分类问题是判断数据是哪一类的问题，比如识别图像是猫还是狗；而回归问题是根据一个数据预测另一个数据的问题，比如根据人的图像预测其体重。感知机解决的是线性分类问题。以《智慧的疆界》书中对感知机工作原理的举例来解释：

假设任务目标是自动识别阿拉伯数字，待识别的数字是将手写或印刷的各种形式的数字，将数字通过扫描后存储在14\*14像素大小的图片文件中。首先，要准备类似下图的训练集供机器学习用。训练集即训练数据集，是专门提供给计算机学习使用的数据集，它不仅是一组图片之类的数据，还会由人工事先标注告诉机器这些图片数据代表的数字是什么。

![numbers-datasets.jpeg](numbers-datasets.jpeg)

然后，我们要设计一种数据结构，以便机器可以存储并处理这些图片。对于14\*14的灰度数字图片，可以将黑色像素用1来表示，白色像素用0表示，介于黑白间的灰度像素根据其灰度强度用0-1间的浮点数表示。如下图所示对该图可以转换成一个二维张量数组：

![number1-represent.jpeg](number1-represent.jpeg)

而机器能够识别出图片中的数字是什么，主要是找到了该图片表示某个数字的特征。对于人类来说，对于识别这些手写体数字很容易，但我们很难解释这些特征是什么。机器学习的目标就是要提取出这些训练集中图片表示数字的特征，根据M-P模型，提取特征的方法就是选择对图片各个像素值进行加权求和，根据训练集中的样本图片和标注数据的对应结果来计算每个像素对应各数字的权值：如果某一个像素具有很负面的证据说明该图片不属于某个数字的话，就把该像素对应该数字的权值设置成负数，相反如果一个像素具有很正面的证据说明该图片属于某个数字，那么该像素对应该数字的权值设置成正值。比如对于数字“0”的图片中间点的像素不应该有黑色（1）像素，如果出现了则表明该图片属于数字0为负面证据，就降低该图片是数字0的概率。这样，经过对数据集的训练和校准，就可以得到14\*14（=196）每个像素对应0-9各数字的权重分布。

我们再将每个数字的分类过程转换成一个M-P神经元，每个神经元都有196个像素输入，每个输入与该神经元之间的权重值由训练得到，这样就构成了一个10个神经元、196个输入以及它们之间1960个带权重的连接线组成的神经网络，如下图示：（一般在神经网络中，会将阈值转换成偏置bias，称为求和项的一项，简化运算过程。）

![perceptron-1.png](perceptron-1.png)

不过，在实际情况中，有些手写字体存在模棱两可的情况，可能会导致加权求和后，出现两个或两个以上的神经元被激活。因此感知机在实现时引入了激活函数的设计，如下图中的Softmax就是一种激活函数，该函数会对求和值进行处理，抑制概率小的、增强概率大的数字分类。

![perceptron-2.png](perceptron-2.png)

罗森布拉特又在两年后制造了世界第一台硬件感知机”Mark-1”，该感知机可以识别英文字母，在当时可是引起了巨大轰动。美国国防部和海军军方也注意到了，并给与了大量的资金支撑，罗森布拉特对感知机的自信也达到顶点，甚至有记者问“有没有感知机做不到的事情”，罗森布拉特的回答是“爱、希望、绝望”。罗森布拉特的名气越来越大，而张扬的性格也导致他四处树敌，其中最有名的是人工智能的另一位巨头马文·明斯基。明斯基是达特茅斯会议的组织者，也是人工智能的奠基者之一。1969年，他出版了《感知机》一书，该书明确指出了感知机存在的缺陷。首先是通过数学方法证明了感知机无法处理异或等非线性分类问题，而后又证明了多层感知机的复杂度导致连接数据急剧膨胀而没有合适的训练方法。明斯基在该书出版当年获得了第四届图灵奖，巨大的声望让他对感知机的判断给神经网络研究判了死刑。连接主义备受打击，而符号主义的研究则成为人工智能的主流。

人工智能领域有两大流派：连接主义和符号主义，有点像武侠小说中的剑宗和气宗，长期以来一直互相竞争。连接主义通过模拟人类的大脑构建神经网络，将知识存储在大量的连接中，基于数据学习来发展人工智能。而符号主义则是认为知识和推理都应该用符号和规则来表示，即大量的“if-then”规则定义，来产生决策和推理，基于规则和逻辑来发展人工智能。前者的代表是神经网络，后者的代表是专家系统。

## 三 深度学习

随着感知机的失败，政府对人工智能领域的投入减少，人工智能进入了第一次寒冬期。而到了八十年代，以专家系统为代表的符号主义成为人工智能的主流，引发了人工智能的第二波浪潮，而神经网络研究被冷落。前文说到，只有一个人还在坚持，那就是杰弗里·辛顿。

辛顿在前人的基础上，先后发明了玻尔兹曼机和误差反向传播算法，辛顿在神经网络领域的开创贡献给这个领域带来了生机，虽然从上世纪八十年代到本世纪初人工智能领域的主流仍然是知识库和统计分析，神经网络的各项技术也开始突破，其中代表性的如卷积神经网络（CNN）、长短期记忆网络（LSTM）等。到了2006年，辛顿提出深度信念网络，开启了深度学习时代。

深度学习所对应的神经网络模型称为深度神经网络，这是相对浅层神经网络而言的。对于浅层神经网络而言，一般只有一个隐藏层（或称中间层），加上输入层和输出层，一共就三层。而深度神经网络的隐藏层则不止一层，对比两种神经网络：

![ndnn-dnn-compare.png](ndnn-dnn-compare.png)

深度学习之前人们一直聚焦于浅层神经网络的原因是神经网络层数的增加会导致训练难度增加，一方面缺乏足够的算力支撑，另一方面也没有很好的算法。而辛顿提出的深度信念网络则使用误差反向传播算法并通过逐层预训练的方式来解决这一训练难题。在深度信念网络之后，深度神经网络成为机器学习的主流模型，当前热门的GPT、Llama等大模型都是由一种或多种深度神经网络构建而成。

对于深度神经网络的理解可以参考上文感知机原理的介绍，将深度神经网络看成是多层多个神经元的组合，由前文可以了解，每一层输出结果跟权重、偏置和激活函数有关，而对于深度神经网络的输出还跟层数等数值相关。在深度神经网络中，这些数值可以分为两类，一类是层数、激活函数、优化器等，称为超参数（hyperparameter），它由工程师设定；另一类是权重和偏置，称为参数（parameter），它是在深度神经网络训练过程中自动得到的，寻找到合适的参数就是深度学习的目的。

![deep-learning-1.png](deep-learning-1.png)

但问题是，一个深度神经网络包含了海量的参数，而且修改一个参数将影响其他的参数行为，因此如何找到这些参数的正确取值是个难事。我们要找出参数正确取值，并让模型能够准确输出，那就需要有一个方法能够衡量模型输出与期望输出的差距。因此深度学习训练中使用损失函数（loss function）来衡量，损失函数也被称为目标函数或代价函数。损失函数通过比较深度神经网络的预测值与真实目标值，得到损失值，来表示该神经网络模型在这个训练样本上的效果好坏。

![deep-learning-2.png](deep-learning-2.png)

深度学习的方法是将损失值作为反馈信号，来对参数进行微调，以降低当前样本训练的损失值。实现这种调节的便是优化器，它来实现如梯度下降等优化算法，通过反向传播方式来更新各层神经元节点的参数。

![deep-learning-3.png](deep-learning-3.png)

一开始会对神经网络的参数进行随机赋值，输入一批训练数据，经输入层、隐藏层到输出层，得到网络的预测输出后，根据损失函数计算损失值，这是前向传播过程；然后从输出层开始，反向沿着每一层计算参数的梯度，直到输入层，并根据梯度使用优化算法更新网络的参数，这是反向传播过程。神经网络每处理一批训练样本，参数都会向正确的方向微调，损失值也会减小，这就是训练循环。训练循环足够次数，就可以得到使损失函数最小化的参数，这样就可以得到一个好的神经网络模型。

当然，实际的深度学习过程比这个要复杂得多，这里只是简要介绍下大概过程。

2012年时，辛顿带领他的两名学生 Alex Krizhevsky 和 Ilya Sutskever，开发了AlexNet 神经网络，参加 ImageNet 图像识别大赛，结果获得冠军，准确率远远高出第二名。随后辛顿和他的学生成立了DNNResearch公司，专注于深度神经网络的研究。这家公司没有任何产品或资产，但 AlexNet 的成功吸引了几大互联网巨头。2012年冬天，在美国加州和内华达州交界的太浩湖边，一场秘密的竞拍正在进行：被拍卖的对象是刚成立不久的DNNResearch，买家分别是谷歌、微软、DeepMind和百度。最后在谷歌和百度还在竞相抬价时，辛顿叫停了拍卖，选择以4400万美元卖给谷歌。2014年，谷歌又将DeepMind收入囊中。2016年，采用经典蒙特卡洛树搜索和深度神经网络结合的AlphaGo战胜了李世石，次年，又战胜了世界围棋排名第一的柯洁，AlphaGo将人工智能和深度学习推向了一个新的高潮。

## 四 大模型

2015年，马斯克、Stripe的CTO Greg Brockman、YC创投CEO Sam Altman 和 Ilya Sutskever等人在加州的Resewood酒店里会面，商议创建一家人工智能实验室，以对抗大型互联网公司对人工智能技术的控制。接下来，Greg Brockman 又从谷歌、微软等公司邀请来一批研究人员，成立新的实验室，并命名为OpenAI。Greg Brockman、Sam Altman 和 Ilya Sutskever 分别担任 OpenAI的董事长、CEO 和 首席科学家。

马斯克和 Sam Altman 对 OpenAI 最初的设想是非营利组织，将人工智能技术面向所有人开放，以此对抗大型互联网公司控制人工智能技术而带来的危险性。因为深度学习人工智能技术正在爆炸式的发展，谁也预料不到这项技术在未来会不会形成对人类的威胁，而开放可能是最好的应对方式。而后来2019年OpenAI为了融资发展技术而选择成立盈利子公司，并闭源其核心技术，这是后话。

2017年，谷歌的工程师发表了一篇论文，名为《Attention is all you need》，在这篇论文中提出了 Transformer 神经网络架构，该架构的特点是将人类的注意力机制引入到了神经网络中。前文说到的图像识别是深度学习中的一种场景，图像数据是离散数据，之间没有关联。而现实生活中还有另外一种场景，就是处理时序型数据，比如文本，文字的上下文是有关联的，还有语音、视频等，都是时序型数据。这种时序型数据叫序列（sequence），并且实际任务中往往是将一个序列转换成另外一个序列，比如翻译，将一段中文翻译成一段英文，还有机器人问答，将一段问题转换成一段智能生成的回答，因此要用到转换器（Transformer），这也是Transformer 名称的由来。前文说到，一个神经元的激发是由它连接的输入数据加权和决定的，权重代表了连接的强度。在时序数据中，每个元素的权重也是不一样的，这跟我们日常生活的经验是一致的，比如看下面这段话：

> 研表究明，汉字的序顺并不定一能影阅响读，比如当你完看这句话后，才发这现里的字全是都乱的。

不仅是汉字，英语等其他人类语言同样如此。这是因为我们的大脑会自动判断句子里字词的权重，在冗杂的信息里抓中重点，这就是注意力Attention。谷歌工程师将注意力机制引入到神经网络模型中，用于自然语言处理，使得机器可以“理解”人类语言的意图。随后2018年，OpenAI基于Transformer架构发布了GPT-1，2019年发布GPT-2，2020年发布GPT-3，2022年底基于GPT-3.5发布了ChatGPT人工智能问答程序，它的对话能力让人震惊，人工智能也向着AGI方向迈进了一大步。

GPT全称是 Generative Pre-trained Transformer, Generative 生成式表明它的能力，能够生成新内容，Transformer 是它的基础架构，而中间的 Pre-trained 表明它的训练方式是预训练。为什么叫预训练呢？这是因为，从AlexNet开始，人们为了取得更好的效果，在神经网络训练中开始采用更大的数据和更多的参数，而这也意味着训练的资源和耗时也越来越大。这种成本对于训练特定任务有些高，且不能与其他神经网络共享，有些浪费。因此，业界开始采用一种预训练+微调的方式来训练神经网络模型，即先在较大的数据集上完成通用大模型的训练，然后在具体的任务场景用较小的数据集完成模型微调。ChatGPT采用了基于人类反馈的强化学习（Reinforcement learning from human feedback， RLHF）来进行预训练微调，分成三个步骤：第一步，预训练一个语言模型（LM）；第二步，收集问答数据并训练一个奖励模型（Reward Model，RM）；第三步，用强化学习（RL）方式微调语言模型（LM）。这个奖励模型包含了人工反馈，因此训练过程称为RLHF。

![chatgpt-training-steps.jpeg](chatgpt-training-steps.jpeg)

用户在使用ChatGPT过程中，除了赞叹它的准确度外，还被多轮对话的能力所折服。根据神经网络的底层探析，我们看到每次推理过程是从输入经各神经元加权和激活到输出，是没有记忆能力的。而ChatGPT之所以多轮对话效果好，是因为它在对话管理中使用了Prompt Engineering的技术。

对于ChatGPT等大语言模型来说，它的输入是经过将一串文字转换的token，而大模型因为计算效率和内存限制，一般会设计固定的上下文窗口，限制输入token的数量。文本首先会被分词器（tokenizer）分词，并通过查表编号，然后embedding到矩阵中变成高维空间向量，这是文本向量化的过程，如下图所示。

![tokenization-embeding.webp](tokenization-embeding.webp)

由于token数的限制，因此要在有限的上下文窗口中将更全面的信息告诉大模型，就这需要用到Prompt Engineering提示工程技术。提示工程利用一些策略来优化模型输入，以便让模型产生更符合期望的输出。

ChatGPT的成功背后是以GPT为代表的大模型的技术演进，OpenAI相信大力出奇迹，不断扩大GPT的参数，GPT-1模型参数有1.17亿，GPT-2模型参数提高到了15亿，GPT-3达到了1750亿，而GPT-4的模型参数据称有1.8万亿。更多的模型参数也就意味着需要更大的算力来支持训练，OpenAI因此总结了“Scaling Law”，称模型的性能与模型大小、数据量和计算资源有关，简单的说就是，模型越大、数据量越大、计算资源越大，模型的性能就越好。强化学习之父Rich Sutton在他的文章《苦涩的教训》(the Bitter Lesson)中也表达了类似的观点，他回顾人工智能近几十年的发展路程，总结说短期内人们总是试图通过构建知识来提升智能体的性能，但长期看强大的算力才是王道。

大模型的能力也由量变转为质变，谷歌首席科学家Jeff Dean称它为大模型的“涌现能力”(Emergent abilities)。市场看到了这个机会，一方面，各大厂商在大模型投资上呈现军备竞赛之态，另一方面，大模型的开源生态也如火如荼。

## 五 Hugging Face

2016年，法国人Clément Delangue、Julien Chaumond和Thomas Wolf成立了一家公司，起名为Hugging Face，并以该emoji图标为公司Logo. Hugging Face最初开发面向年轻人的智能聊天机器人，而后他们在训练模型的过程中开发了些模型训练工具并将它们开源，后来他们甚至调转重心来做后者，这种看似“不务正业”的做法却将他们带入了一个新的赛道，成为了深度学习领域不可或缺的角色。

硅谷有很多企业都是在副业上做出成就，比如Slack原来开发游戏，公司团队分布多地，在运作过程中开发了一款交流工具结果不小心火了，就是Slack。而Hugging Face的转向也类似，也是为了解决自己的痛点，2018年，谷歌发布了大模型BERT，而Hugging Face的员工便用了他们熟悉的Pytorch框架实现了BERT，将模型取名为pytorch-pretrained-bert，并将它开源到了GitHub。后来在社区的帮助下，又引入了GPT、GPT-2、Transformer-XL等一批模型，该项目便更名为pytorch-transformers。深度学习领域一直存在着两大框架Pytorch和TensorFlow之间的竞争，而研究人员为了比较两个框架的优劣，经常在两个框架间切换，因此该开源项目又增加了两个框架间的切换功能，项目名称也改成了Transformers。Transformers也成了GitHub上增长最快的项目。

Hugging Face继续开发了并开源了其他一系列的机器学习工具：Datasets、Tokenizer、Diffusers……这些工具也规范了AI开发的流程，在Hugging Face之前，可以说AI开发以研究人员为主，没有一套规范的工程化方法，Hugging Face则提供了完善的AI工具集并建立了一套事实标准，也使得更多的AI开发者甚至是非AI从业者可以快速上手并训练模型。

![huggingface.png](huggingface.png)

接着，Hugging Face又基于Git和Git LFS技术推出了托管模型、数据集、AI应用的Hugging Face Hub，到目前为止，平台上已经托管了35万模型、7.5万数据集和15万个AI应用示例。托管并开源模型和数据集，并建立全球的开源仓库中心这项工作富有创意且意义深远。上文提到，预训练+微调的方式促进了神经网络训练资源的共享，而Hugging Face Hub则更进一步，让AI开发者可以轻松复用全世界最先进的成果，并在此基础上添砖加瓦，让人人使用AI、开发AI的AI民主化成为可能。Hugging Face也被称为是机器学习领域的GitHub，或如他们的Slogan所言：构建未来的AI社区。我之前写过两篇文章，一篇《[改变世界的一次代码提交](https://hutusi.com/articles/the-greatest-git-commit)》介绍Git，一篇《[从零到百亿美金之路](https://hutusi.com/articles/the-story-of-github-and-gitlab)》介绍GitHub，而Git、GitHub、Hugging Face，我觉得它们之间存在某种传承，一种改变世界构建未来的黑客精神的传承，这也是促使我写这篇文章的原因之一。

## 六 后记

在快要写完本文时，我看了辛顿最近在牛津大学做的一次演讲。在演讲中，辛顿介绍了人工智能领域的两大流派，一种辛顿称为逻辑方法，即符号主义；另一种他称之为生物方法，即模拟人类大脑的神经网络连接主义。而事实证明了生物方法明显战胜了逻辑方法。神经网络是模拟人类大脑理解而设计的模型，大模型也像大脑那样的工作和理解。辛顿认为，超越人脑的人工智能在未来会出现，而且会比我们预测的时间快得多。

## 附1 大事记

1943年，麦卡洛克和皮茨发表“M-P神经元模型”，用数理逻辑解释并模拟人脑的计算单元，并提出神经网络这一概念。

1956年，“人工智能”一词首先在达特茅斯会议上被提出。

1957年，罗森布拉特提出“感知机”模型，并在两年后成功制造能够识别英文字母的硬件感知机Mark-1.

1969年，明斯基发表《感知机》，书中指出的感知机缺陷沉重打击了感知机乃至神经网络的研究。

1983年，辛顿发明玻尔兹曼机。

1986年，辛顿发明误差反向传播算法。

1989年，杨立昆(Yann LeCun)发明“卷积神经网络”(CNN)。

2006年，辛顿提出深度信念网络，开启深度学习时代。

2012年，辛顿和他的两个学生设计AlexNet在ImageNet大赛中以绝对优势获得冠军，深度学习被业界所重视。

2015年，Google收购的DeepMind公司推出AlphaGo，2016年战胜李世石，2017年战胜柯洁。OpenAI成立。

2016年，Hugging Face成立。

2017年，Google发表Transformer模型论文。

2018年，OpenAI基于Transformer架构发布了GPT-1。Hugging Face发布 Transformers 项目。

2019年，OpenAI发布GPT-2。

2020年，OpenAI发布GPT-3。Hugging Face推出Hugging Face Hub。

2022年，OpenAI发布ChatGPT。

## 附2 参考资料

书籍：

《智慧的疆界：从图灵机到人工智能》周志明（著） 机械工业出版社 2018年10月

《深度学习革命》凯德·梅茨（著） 杜曙光（译） 中信出版社 2023年1月

《Python深度学习》（第2版） 弗朗索瓦·肖莱（著） 张亮（译） 人民邮电出版社 2022年8月

《深度学习入门：基于Python的理论与实现》斋藤康毅（著）陆宇杰（译）人民邮电出版社 2018年

《深度学习进阶：自然语言处理》斋藤康毅（著）陆宇杰（译） 人民邮电出版社 2020年10月

《这就是ChatGPT》 斯蒂芬·沃尔夫拉姆（著） WOLFRAM传媒汉化小组（译） 人民邮电出版社 2023年7月

《生成式人工智能》丁磊（著）中信出版社 2023年5月

《Huggingface自然语言处理详解》李福林（著）清华大学出版社 2023年4月

文章：

《神经网络入门》阮一峰

《2012，改变人类命运的180天》远川研究所

《GPT家族进化史》MetaPost

《Transformer - Attention is all you need》知乎

《预训练语言模型的发展历程》 知乎

《提示工程指南》

《ChatGPT 背后的“功臣”——RLHF 技术详解》

《ChatGPT大模型技术发展与应用》

《The Bitter Lesson》 Rich Sutton

《专访HuggingFace CTO：开源崛起、创业故事和AI民主化》