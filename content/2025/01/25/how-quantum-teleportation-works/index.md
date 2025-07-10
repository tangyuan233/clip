---
title: How quantum teleportation works
date: '2025-01-25T22:38:55+08:00'
updated: '2025-01-25T22:38:55+08:00'
taxonomies:
  tags: null
extra:
  source: https://quantum.country/teleportation
  hostname: quantum.country
  author: Andy Matuschak
  original_title: How quantum teleportation works
  original_lang: en
---

> **摘要**:
>  本文讲述了量子传送的基本原理和协议，通过一个墨西哥民间故事引入主题，指出量子传送并非科幻，而是1993年物理学家的理论发现。文章详细介绍了传送量子态的协议，尤其是如何借助经典信息和共享量子态将未知量子态从一地“传送”至另一地。尽管量子传送的机制相对简单，但其背后的深意和数学原理丰富，涵盖了量子计算中的噪声抑制和新硬件的构想。作者阐明了测量与量子态之间的错综复杂关系，并强调了量子传送作为量子信息科学的重要基础，具有开创性和深远的应用潜力。
> 
>  **要点总结**:
>  1. 文章通过民间故事引入量子传送的概念，探讨其历史背景和重要性。
>  2. 量子传送协议依赖于共享的量子态和经典信息的传递。
>  3. 量子传送不仅是简单的信息移动，而是涉及复杂的量子信息处理。
>  4. 测量对量子态的影响及其与经典信息的关系是核心讨论。
>  5. 量子传送推动了量子计算技术的发展，带来新的研究方向和应用。

---


According to an old Mexican folk story, on October 24, 1593 a Spanish soldier named Gil Pérez was guarding the Governor's Palace in Manila, in what is today known as the Philippines. The Governor had been assassinated by pirates on the previous night, and the soldiers guarding the palace were exhausted. Tired, Pérez leaned against a wall, and shut his eyes.

When he opened his eyes, he was no longer in Manila. Somehow, miraculously, he'd been transported instantaneously across the Pacific Ocean. He was in the Zócalo, the great public square in Mexico City. He was found by guards, who suspected that he was a deserter, due to his uniform, and threw him in jail. But he had the presence of mind to tell the guards of the death of the Governor in Manila. Months later, Pérez's story was confirmed when news of the Governor's death arrived by boat, and he was releasedStory and text adapted from [Wikipedia](https://en.wikipedia.org/wiki/1593_transported_soldier_legend)..

It's an entertaining story. For centuries, teleportation – especially the teleportation of humans! – has been a trope of folk stories, of magic shows, and of science fiction. But in 1993 a group of physicists discovered a genuine type of *quantum teleportation*, which enables a quantum state to be transported across long distances, without any need to directly send the quantum stateThe original paper is by Charles H. Bennett, Gille Brassard, Claude Crépeau, Richard Jozsa, Asher Peres, and William K. Wootters, [Teleporting an unknown quantum state via dual classical and Einstein-Podolsky-Rosen channels](http://crypto.cs.mcgill.ca/~crepeau/PDF/ASPUBLISHED/BBCJPW93.pdf) (1993). An account of the discovery has been provided by one of the discoverers: Asher Peres, [What is actually teleported?](https://arxiv.org/abs/quant-ph/0304158) (2003)..

The initial quantum teleportation paper was theoretical, using the mathematical rules of quantum mechanics to predict the teleportation phenomenon. That prediction has since been followed by many experiments demonstrating the effect. Furthermore, it turns out that quantum teleportation isn't just a fun stunt. It underlies many other phenomena in quantum computing and, more broadly, in quantum information science. For instance, it's led to important ideas about reducing the effects of noise on quantum computers, and to new hardware ideas for building quantum computers. These connections were a surprise – it's not at all obvious that quantum teleportation should have such applications. But because of applications such as these, teleportation is today viewed as a core primitive in quantum information science.

In this essay I explainA note on pronouns: Michael wrote the text of the essay, and will use singular pronouns like “I” to denote the author, and “we” to mean the reader and the author jointly. Andy and Michael developed the mnemonic medium together. how quantum teleportation works. We'll delve deep into the details of the teleportation protocol, and discuss some of the implications of teleportation. To read the essay you need to be familiar with the quantum circuit model of computation. If you're not, you can learn the elements from the earlier essay [Quantum Computing for the Very Curious](https://quantum.country/qcvc), and you may wish to read that essay now. You shouldn't need any other prerequisites.

The essay is presented in an unusual style. It's an example of what Andy Matuschak and I have dubbed a *mnemonic medium*, incorporating new user interface elements intended to make it almost effortless for you to remember the content of the essay. The motivator is that most people (myself included) quickly forget much of what we read in books and articles. But cognitive scientists know a lot about how human beings commit ideas to memory. The mnemonic medium takes advantage of this understanding, creating an interface which will make it easy to remember the material for the long term. That is, not only will you learn quantum teleportation now: with a little extra effort, you'll remember it near-permanently. More on how that works below.

If you look ahead, you'll see that the essay contains a lot of details, and perhaps seems like a lot of work to read. In fact, it *is* a lot of work to read! Why not just read some popular account of teleportation instead? Or do something else entirely? The payoff is that with less than an hour's work you can understand in full detail an astonishing fact about the way the universe works. And it won't be a handwavy explanation, the kind you find in popular science accounts. It'll be the full story. Furthermore, if you explore quantum information and computation further, you'll find teleportation pops up all over the place. It's a fundamental tool in the toolkit of quantum computing, well nigh as useful as a chef's knife in a kitchen. So let's get on with understanding it.

## The teleportation protocol

What might it mean to teleport a quantum state from one location to another?

For simplicity, we'll consider the case of teleporting the simplest possible quantum system – a qubit. We'll suppose an experimentalist, Alice, has in her laboratory a single qubit, in a quantum state 
$$
|\psi\rangle = \alpha|0\rangle+\beta|1\rangle
$$
. Alice would like to send her quantum state to a distant laboratory operated by a colleague, Bob.

Of course, Alice could simply physically send the qubit. We're going to rule that out by fiat, as violating the desired spirit of teleportation.

Another approach would be for Alice to simply tell Bob the amplitudes 
$$
\alpha
$$
 and 
$$
\beta
$$
 for the quantum state 
$$
|\psi\rangle
$$
. To do this she doesn't need to send a quantum state – she can simply send the complex numbers 
$$
\alpha
$$
 and 
$$
\beta
$$
 to Bob, as ordinary classical information (perhaps over the internet). Bob could then re-create the state in his laboratory. But in general Alice won't know those amplitudes – there's no particular reason to suppose she knows the identity of her quantum state. It turns out that quantum teleportation works even when the identity of the state isn't known to Alice or Bob.

Yet another possible approach is for Alice to somehow measure the state of her qubit, figuring out the amplitudes, and then telling Bob so he can re-create the state. Unfortunately, as I [explained elsewhere](https://quantum.country/qcvc#measuring_a_qubit), in general Alice can get only very limited information about those amplitudes. There's certainly no way she can get anything like enough information for Bob to re-create 
$$
|\psi\rangle
$$
 or a state very close to it.

So what can Alice and Bob do?

The solution – the quantum teleportation protocol – is sufficiently simple that I'm just going to lay out the steps for you. After I've laid out the steps, it'll be pretty easy for us to verify that it works, and to discuss some implications. Note that you *shouldn't* expect to immediately see why the protocol works, or why we're using these steps in particular. Indeed, it would be shocking if you could! Rather, the point right now is to begin getting familiar with the basic mechanics of teleportation – the gates and measurements involved. Only later in the essay will we verify that these work, and gradually understand in more depth how to think about the protocol.

For Alice and Bob to do the teleportation, in addition to Alice having 
$$
|\psi\rangle
$$
 in her possession, they also need to begin by sharing a special two-qubit state,

$$
\frac{|00\rangle+|11\rangle}{\sqrt 2},
$$

one qubit in Alice's possession, the other in Bob's possession. This can be arranged in many ways. One way, for instance, is for Bob to perform the following quantum circuit in his laboratory:

![](ent_state.png)

With that done, Bob sends one of the two qubits to Alice. It doesn't matter which qubit he sends, since the state is symmetric. We can now depict the three qubits as:

![](init.png)

Here, the top two qubits belong to Alice. And the third qubit is in Bob's possession. This representation has the drawback that you've got to keep in mind which qubits belong to Alice, and which to Bob. We could make this easier by inserting some vertical space between the second and third qubits (and people sometimes do exactly this), but it's not that much work to remember, so we'll stick with the more compact representation.

The quantum circuit language is also a nice way to depict the rest of the quantum teleportation protocol. Here it is:

![](teleport.png)

Most of this is pretty transparent. Alice starts with an unknown quantum state, 
$$
|\psi\rangle
$$
, which is to be teleported. Alice and Bob share a quantum state 
$$
\frac{|00\rangle+|11\rangle}{\sqrt 2}
$$
. Then Alice performs two gates on her qubits, followed by measuring both of her qubits in the computational basis, with outcomes 
$$
z
$$
 and 
$$
x
$$
. These are just conventional classical bits, each taking the value 
$$
0
$$
 or 
$$
1
$$
.

The next piece of the protocol is only implied in the circuit representation above. Having measured her qubits, Alice then sends the classical bits 
$$
z
$$
 and 
$$
x
$$
 over to Bob. She can do this however she likes – using the internet, or some other classical communication channel. Bob then applies the Pauli 
$$
X
$$
 gate (i.e., the quantum NOT gate) to his qubit if 
$$
x=1
$$
, and otherwise does nothing. This is the meaning of the 
$$
X^x
$$
 notationIt's just matrix exponentiation: 
$$
X^0 = I
$$
, the identity matrix, and 
$$
X^1 = X
$$
, the NOT gate.. Similarly, Bob applies the Pauli 
$$
Z
$$
 gate to his qubit if 
$$
z = 1
$$
, and otherwise does nothing.

The end result is that Bob's qubit is now in the same state 
$$
|\psi\rangle
$$
 that Alice started with. That is, Alice has successfully teleported her state to Bob.

There's a lot to unpack here. As I said above, you certainly shouldn't expect to immediately see why teleportation works! But as you can see at least the basic mechanics are pretty simple: it's just a few gates, a few measurements, and some classical communication. And, somehow, Bob ends up with the state 
$$
|\psi\rangle
$$
. We'll spend the rest of the essay understanding why it's true, and what some of the implications are.

Before going through any of those details, I want to emphasize just how strange the result of the teleportation circuit is. Alice starts out with a state 
$$
|\psi\rangle = \alpha|0\rangle+\beta|1\rangle
$$
. She does some stuff to her qubits, and then – without sending Bob any qubit *at all* – somehow Bob is able to recover 
$$
|\psi\rangle
$$
, using just two bits of classical information, 
$$
x
$$
 and 
$$
z
$$
.

This is quite remarkable. After all, Alice hasn't sent Bob a qubit, just two classical bits. You might say “Oh, well, those two bits must do the job of carrying the information from the qubit”. But that can't possibly be right: just to precisely specify the original amplitudes 
$$
\alpha
$$
 and 
$$
\beta
$$
 would require, in principle, an infinite amount of classical information. Obviously, neither Alice nor Bob receives that information. Yet Bob is somehow able to recover 
$$
|\psi\rangle
$$
 anyway.

This is, in my opinion, a most curious and surprising state of affairs. We'll understand more deeply how it works below.

## How to remember the teleportation protocol

In the introduction I said that this essay is in a new form, a mnemonic medium. That means the medium is designed to make it essentially effortless for you to remember what you read.

The way the mnemonic medium works is this: throughout the essay we'll occasionally pause to ask you a few simple questions, testing you on the material just explained. In the weeks ahead we'll re-test you in followup review sessions. By expanding the review schedule, we can ensure you consolidate the answers into your long-term memory, while minimizing the study time required. In particular, the expanding review schedule means that each extra minute spent studying provides more and more benefit, a kind of exponential return. The review sessions take no more than a few minutes, and we'll notify you when you need to review. The benefit is that instead of remembering how quantum teleportation works for a few hours or days, you'll remember for years; it'll become a much more deeply internalized part of your thinking. That may sound a strange aspiration. But if you're genuinely interested in understanding quantum computing, then having teleportation down cold is necessary.

To give you a more concrete flavor of how the mnemonic medium works, let's take a look at three questions reviewing part of what you've just learned. Please indulge me by answering these questions – it'll take just a few seconds. For each question, think about what you believe the answer to be, click to reveal the actual answer, and then mark whether you remembered or not. If you can recall, that's great. But if not – and most readers don't get the answers to these questions correct(!) – I'll have some comments on how to think about it below.

I said above that most readers don't recall the answers to these questions. It's worth thinking about what this means. The questions ask about some of the most absolutely basic things about the quantum teleportation protocol. If someone is not getting these questions correct, what are they really learning about quantum teleportation? If you're in this boat, I challenge you to name three *specific* things that you've learned about quantum teleportation so far. Genuine learning requires paying close attention to what you're reading. In fact, it's not difficult to learn any of the three things tested in the questions above, if you're paying attention.

I don't mean to be a downer. But I also think it's important to be realistic. Most people (myself included) learn very little from most of what we read, unless we're paying close attention. The reading may be entertaining, or produce a brief illusion of understanding. But you can only learn if you pay attention. The questions are good way of monitoring whether that's the case. And reviewing them again in the future will help you internalize this understanding for the long term.

You may object that there's not much point in knowing “unimportant details” like the circuit used to generate Alice and Bob's shared state. It's tempting to take refuge in a belief that what you're looking for is a broad, conceptual understanding. Unfortunately, I've never met someone knowledgeable about quantum computing who didn't know the details of teleportation. So I don't buy the “unimportant details” argument.

Imagine meeting someone who told you that they “had a broad conceptual understanding” of how to speak Spanish, but it turned out they didn't know the meanings of hola, adiós, or bien. You'd think their claim to a broad conceptual understanding of Spanish was hilarious. If you want to understand quantum computing and related subjects, you need to know the details of how the teleportation protocol works. That means knowing things like what state Alice and Bob initially share. What's more, it means not just knowing them immediately after reading. It means internalizing them for the long term.

If you're interested in doing that, then I invite you to set up an account by signing in below. If you do so, your review schedule for each question in the essay will be tracked, and you'll receive periodic reminders, containing a link which takes you to an online review session. That review session isn't this full essay – rather, it looks just like the question set you answered above, but contains instead *all* the questions which are due, so you can quickly run through them. The time commitment is no more than a few minutes per session. You can study on your phone while grabbing coffee, or standing in line, or going for a walk, or in transit. The return for that small time commitment is an internalized understanding of quantum teleportation, retained for years instead of days.

To keep this promise, we'll track your review schedule for each question, and send you occasional reminders to check in, and to run through the questions which are due. You can review on your phone while grabbing coffee, or standing in line, or going for a walk, or on transit. The return for that small time commitment is an internalized understanding of quantum teleportation; it'll become a part of who you are, retained for years instead of days.

Please sign in so we can save your progress and let you know the best times to review.

Thank you! Your progress will be saved as you read.

## Does teleportation enable faster-than-light communication?

Before we verify that the teleportation circuit works, let's briefly discuss one of the most common questions about quantum teleportation: does it enable faster-than-light communication?

At first, it looks as though it may – after all, Alice is able to transmit her state 
$$
|\psi\rangle
$$
 to Bob, even if he's very distant from her. It'd be quite marvelous if it enabled faster-than-light communication, since that in turn would give rise to many incredible phenomena, including the ability to send information backward in time.

But while it would be marvelous, it is not possible. You can see the trouble if you think closely about the protocol. Remember, for Bob to recover the state 
$$
|\psi\rangle
$$
, Alice must send Bob two bits of classical information. The speed of that transmission is limited by the speed of light. Without that classical information, Bob can't guarantee that he recovers 
$$
|\psi\rangle
$$
. Instead, what he has is a distribution over four different possible states. And while I won't prove it here, it turns out to be possible to prove that with only that distribution over states, no information is transferred from Alice to Bob. It's a pity, but that's the way the world seems to work.

Let's pause to quickly review a few more questions about teleportation:

Notice that the second question is a more qualitative style of question than the earlier questions. Your answer may not exactly match the answer given. It's up to you to decide whether you want to mark yourself correct or not. Ask yourself: have I *really* understood the core point? If so, mark yourself correct. If not, don't! The point of all the questions is to serve you, and it's up to you to decide how best they can do that.

## How partial measurements work

To verify that the teleportation protocol works, we'll mostly use tools already introduced in the earlier essay [Quantum Computing for the Very Curious](https://quantum.country/qcvc). But there's one missing piece of background knowledge we need to fill in first.

In the earlier essay I explained how to do computational basis measurements for multi-qubit systems. But I didn't explain what happens if you measure just some (but not all) of the qubits. This is relevant to quantum teleportation, since we're going to be measuring just two of three qubits.

The rule for describing such partial measurements is simple, though slightly cumbersome to describe. First, I'll describe it for a two-qubit system, and then explain how it generalizes. Suppose we have a two-qubit system in the state

$$
a|00\rangle+b|01\rangle+c|10\rangle+d|11\rangle.
$$

Suppose we measure just the first qubit in the computational basis. We'd like to know (i) what the probabilities for the two measurement outcomes are; and (ii) what the corresponding resulting state of the second qubit will be.

To answer these questions, we simply group terms corresponding to 
$$
|0\rangle
$$
 and 
$$
|1\rangle
$$
 on the first qubit, rewriting the state as

$$
|0\rangle(a|0\rangle+b|1\rangle)+ |1\rangle(c|0\rangle+d|1\rangle).
$$

Suppose we measure in the computational basis on the first qubit, and obtain the result 
$$
0
$$
. It probably won't surprise you that the resulting state of the second qubit is just the corresponding piece from the above expression, namely 
$$
a|0\rangle+b|1\rangle
$$
, normalized by dividing by 
$$
\sqrt{|a|^2+|b|^2}
$$
, so it's a properly normalized quantum state:

$$
\frac{a|0\rangle+b|1\rangle}{\sqrt{|a|^2+|b|^2}}
$$

This result occurs with probability 
$$
|a|^2+|b|^2
$$
. The resulting state of the first qubit is, of course, 
$$
|0\rangle
$$
.

Similarly, if the result from the computational basis measurement is 
$$
1
$$
, then the corresponding conditional state for the second qubit is

$$
\frac{c|0\rangle+d|1\rangle}{\sqrt{|c|^2+|d|^2}},
$$

and this occurs with probability 
$$
|c|^2+|d|^2
$$
. The resulting state of the first qubit is, of course, 
$$
|1\rangle
$$
.

I won't write the general rule out in absolutely full generality, but hopefully it's pretty clear what the rule is. For instance, suppose we measure the first two qubits of a many-qubit system in the computational basis. To figure out the result, we express the state immediately prior to measurement as

$$
|00\rangle|\psi_{00}\rangle + |01\rangle|\psi_{01}\rangle +|10\rangle|\psi_{10}\rangle + |11\rangle|\psi_{11}\rangle.
$$

The result of measuring the first two qubits in the computational basis is 
$$
00
$$
 with probability 
$$
\| |\psi_{00}\rangle \|^2
$$
, and the resulting state of the other qubits in the system is the normalized state 
$$
|\psi_{00}\rangle/\||\psi_{00}\rangle\|
$$
. The resulting state of the first two qubits is 
$$
|00\rangle
$$
.

It works similarly for the other possible outcomes.

As I said above, this rule is a little bit cumbersome, but with some practice it becomes easy to use fluently. We'll get an opportunity very shortly, as we verify the teleportation protocol.

To help you get used to the rule, it's worth taking a few minutes to work through the exercise immediately below. Unlike the review questions, the point of the exercise isn't as an aid to memory. Rather, it's here because it will help you better understand the material just introduced. Note that even if you don't work through the exercise, it's worth at least reading through it, since some of the results will be tested in the review questions.

**Exercise:** Suppose we have a quantum state 
$$
\sqrt{0.8} |01\rangle+\sqrt{0.2}|10\rangle
$$
 and measure the first qubit in the computational basis. What is the probability the measurement gives 
$$
0
$$
 as outcome? What is the corresponding state of the second qubit? What is the probability the measurement gives 
$$
1
$$
 as the outcome? What is the corresponding state of the second qubit?

**Answer / spoilers:** It's worth your time taking a shot at the exercise, since even if you get stuck, learning to cope with being stuck is a much-needed superpower in quantum computing. But after you've done that, here are the answers: the probability of the outcome 
$$
0
$$
 is 
$$
0.8
$$
 and the corresponding state of the second qubit is 
$$
|1\rangle
$$
; the probability of the outcome 
$$
1
$$
 is 
$$
0.2
$$
 and the corresponding state of the second qubit is 
$$
|0\rangle
$$
.

Some of these questions perhaps seem peculiar. Obviously, there's little long-term value in remembering the *specific* probability of getting outcome 
$$
0
$$
 when we measure the first qubit of 
$$
\sqrt{0.8}|01\rangle+\sqrt{0.2}|10\rangle
$$
 in the computational basis. Rather, you should think of this question (and similar questions) as really implicitly asking if you remember *how* to compute the probability. And marking your answer appropriately. That procedural knowledge really is valuable to remember.

## Verifying the teleportation protocol works

We now have all the tools necessary to verify that teleportation works. In fact, if you're feeling enthusiastic, you can do the verification yourself. I won't pretend that it's not some work. On the other hand, if you push through the calculation you can take away a lot of confidence that you can do nontrivial calculations in quantum mechanics.

With that said, let me show you one approach to doing the verification.

(By the way, none of the in-essay review questions will be on the details of the verification. So while you should follow along, you don't need to remember every detail. There wouldn't be much point – there are many ways of doing the verification, and what's important is that you are able to do it somehow, not that you remember any particular approach.)

Let's start by recalling the circuit depicting the protocol:

![](teleport.png)

Writing 
$$
|\psi\rangle
$$
 explicitly in terms of its amplitudes, 
$$
|\psi\rangle = \alpha|0\rangle+\beta|1\rangle
$$
, we see that the initial state at the start of the teleportation protocol is:

$$
(\alpha|0\rangle+\beta|1\rangle) \frac{|00\rangle+|11\rangle}{\sqrt 2}.
$$

We can expand this out as

$$
\frac{\alpha|000\rangle+\alpha|011\rangle+\beta|100\rangle+\beta|111\rangle}{\sqrt 2}.
$$

We apply the CNOT to the first two qubits to obtain

$$
\frac{\alpha|000\rangle+\alpha|011\rangle+\beta|110\rangle+\beta|101\rangle}{\sqrt 2}.
$$

Then we apply the Hadamard gate to the first qubit. Recall from the [earlier essay](https://quantum.country/qcvc#the-hadamard-gate) that 
$$
H|0\rangle = \frac{|0\rangle+|1\rangle}{\sqrt 2}
$$
 and 
$$
H|1\rangle = \frac{|0\rangle-|1\rangle}{\sqrt 2}
$$
. So after the Hadamard gate on the first qubit the state is

$$
\frac{\alpha|000\rangle+\alpha|100\rangle+\alpha|011\rangle+\alpha|111\rangle+\beta|010\rangle-\beta|110\rangle+\beta|001\rangle-\beta|101\rangle}{2}.
$$

To analyze the computational basis measurement on the first two qubits, we group terms corresponding to each computational basis state for those qubits. The state above can be rewritten

$$
\frac{|00\rangle(\alpha|0\rangle+\beta|1\rangle)+ |01\rangle(\alpha|1\rangle+\beta|0\rangle)+ |10\rangle(\alpha|0\rangle-\beta|1\rangle)+ |11\rangle(\alpha|1\rangle-\beta|0\rangle) }{2}.
$$

When Alice measures in the computational basis, the outcome is 
$$
00
$$
 with probability given by 
$$
|\alpha|^2/4+|\beta|^2/4 = \frac{1}{4}
$$
, since 
$$
|\alpha|^2+|\beta|^2=1
$$
 (normalization condition for the original state). And the resulting conditional state for Bob is 
$$
\alpha|0\rangle+\beta|1\rangle
$$
, that is, just the original state to be teleported.

We can run through similar calculations for all four outcomes of the measurement in Alice's computational basis. The results are:

| Outcome | Probability | Bob's state |
| --- | --- | --- |
| 00 | $$ \frac{1}{4} $$ | $$ \alpha\|0\rangle+\beta\|1\rangle = \|\psi\rangle $$ |
| 01 | $$ \frac{1}{4} $$ | $$ \alpha\|1\rangle+\beta\|0\rangle = X\|\psi\rangle $$ |
| 10 | $$ \frac{1}{4} $$ | $$ \alpha\|0\rangle-\beta\|1\rangle = Z\|\psi\rangle $$ |
| 11 | $$ \frac{1}{4} $$ | $$ \alpha\|1\rangle-\beta\|0\rangle = XZ\|\psi\rangle $$ |

This is good news: in each case Bob's state is very similar to the original state 
$$
|\psi\rangle
$$
 to be teleported. The only thing wrong is the extra Pauli matrices in Bob's conditional states. But Bob can easily fix those.

To do the fix, recall that the Pauli matrices are self-inverse, 
$$
XX = I
$$
 and 
$$
ZZ = I
$$
. If we simply run through the four possibilities in the table above, we see that Bob can recover the original state by (in the respective cases): doing nothing; applying the 
$$
X
$$
 gate; applying the 
$$
Z
$$
 gate; applying 
$$
ZX
$$
. This is exactly what's done in the circuit described earlier.

That completes the verification that teleportation works.

Intuitively, one story you might tell yourself about why teleportation works is that somehow the measurement outcomes are “telling us something about the identity of the state to be teleported”, something that helps Bob put the state back together again.

While such a story seems appealing, it's wrong. Consider that the probabilities for the computational basis measurements are 
$$
\frac{1}{4}
$$
, no matter what the identity of the state wasContrast to a computational basis measurement of a state such as 
$$
\alpha|0\rangle+\beta|1\rangle
$$
, where the probabilities of the outcomes very strongly depend on the amplitudes 
$$
\alpha
$$
 and 
$$
\beta
$$
, and so on the identity of the state.. Imagine a third party, Carol, eavesdropped on Alice and Bob's classical communication, and learned the results of Alice's measurements. Because the distribution of those measurement results doesn't depend in any way on the identity of the state 
$$
|\psi\rangle
$$
, Carol would still be completely in the dark about the identity of 
$$
|\psi\rangle
$$
.

Even after years of familiarity with teleportation, I still find this marvelous and surprising. What the measurement results are saying is purely how the state has been changed – to 
$$
|\psi\rangle, X|\psi\rangle, Z|\psi\rangle
$$
, or 
$$
XZ|\psi\rangle
$$
 – without giving any information at all about the identity of 
$$
|\psi\rangle
$$
.

There's no immediate further moral to this story. I'm mentioning it merely to help flesh out your appreciation for the teleportation protocol. (We'll do more in this vein a little later in the essay). Although the protocol is technically simple, it's very deep. Indeed, I believe there are still unsuspected depths in the protocol, ideas that no-one has yet fathomed.

One further fun fact about teleportation is that it doesn't matter where Bob is. In fact, Alice may not even *know* where Bob is – she can simply broadcast the classical bits out into the world, perhaps using a public address on the internet. Provided Bob can see those bits, he can recover the state 
$$
|\psi\rangle
$$
. So teleportation is a kind of broadcast protocol.

## Summary of the teleportation protocol

We now have a basic picture of quantum teleportation, and have verified that it works. Let me summarize the key elements, followed by some questions reviewing those elements of the protocol not covered by earlier questions. The quantum circuit representation for teleportation is as follows:

![](teleport.png)

In more descriptive prose, teleportation is achieved in four steps:

1. **Initial state:** Alice starts with a quantum state 
$$
|\psi\rangle
$$
 of a single qubit. Alice and Bob also share a quantum state of two qubits, 
$$
\frac{|00\rangle+|11\rangle}{\sqrt 2}
$$
.
2. **What Alice does:** To accomplish her part of the protocol, Alice performs a CNOT gate between 
$$
|\psi\rangle
$$
 and her other qubit, then applies a Hadamard gate to the first qubit. Alice then measures both her qubits in the computational basis, getting results 
$$
z = 0
$$
 or 
$$
1
$$
 and 
$$
x = 0
$$
 or 
$$
1
$$
. The probability for each of the four possible measurement outcomes (
$$
00, 01, 10, 11
$$
) is 
$$
1/4
$$
.
3. **Classical communication:** Alice sends both classical bits, 
$$
z
$$
 and 
$$
x
$$
, to Bob.
4. **Bob recovers the quantum state 
$$
|\psi\rangle
$$
:** Bob applies 
$$
Z^z X^x
$$
 to his qubit, recovering the original state 
$$
|\psi\rangle
$$
.

One final point: at the end of the teleportation protocol, Alice no longer possesses the quantum state 
$$
|\psi\rangle
$$
. In particular, her computational basis measurement leaves her qubits in one of the four states, 
$$
|00\rangle
$$
, 
$$
|01\rangle
$$
, 
$$
|10\rangle
$$
, or 
$$
|11\rangle
$$
, corresponding to the result of her computational basis measurement. And so you shouldn't think of teleportation as copying the state 
$$
|\psi\rangle
$$
, but rather as a way of moving the state.

Let's now review some questions covering those details of teleportation not covered by earlier questions. Note that I will ask several of the questions in closely related ways. This may seem redundant, but it's done because research on memory shows that encoding information in multiple related ways results in deeper and better memories being formed. This is the biggest batch of questions in the essay, and may take a couple of minutes to work through.

## Discussion

Quantum teleportation is different in several ways from what people ordinarily think of as teleportation, the kind of thing made famous by *Star Trek*.

For one thing, it's not about teleporting complex objects, like human beings. Rather, it's about teleporting elementary quantum systems. Although in principle it is possible to teleport much more complex objects, it seems extremely unlikely in the foreseeable future.

Another difference is that quantum teleportation is not about an object vanishing in one location and then reappearing instantaneously in another. It's essential that the classical information be sent, and that Bob performs the corresponding operations. This makes some people feel cheated: “it's not real teleportation!” While the name “quantum teleportation” is great marketing, it genuinely is a little misleading.

On the other hand, quantum teleportation is still astonishing. It's impossible to measure a quantum state to determine its amplitudes. Intuitively, that ought to make anything like quantum teleportation impossible. Yet, somehow, it is still possible to use measurement to transport a state from one location to another.

One of the originators of quantum teleportation, Asher Peres, was once asked by a reporter whether it is possible to teleport not only the \[human\] body but also the soul. Peres captured the essence of quantum teleportation beautifully when he replied “only the soul”Asher Peres, [What is actually teleported?](https://arxiv.org/abs/quant-ph/0304158) (2003).. Teleportation isn't really about transmitting objects over long distances. Rather, it's about a counter-intuitive way of disassembling an unknown quantum state into classical information, using a fixed shared state and measurement, and then later recovering the original quantum state. In lectures, another of the originators of teleportation, Charles Bennett, has sometimes illustrated this using an elegant informal inequality:

1 ebit + 2 cbits 
$$
\geq
$$
 1 qubit

What this means, informally, is that one shared “ebit” (meaning the entangled state 
$$
\frac{|00\rangle+|11\rangle}{\sqrt 2}
$$
) together with two classical bits of communication is enough to enable one quantum bit of communication. It's teleportation-expressed-as-an-inequality. Bennett sometimes combines this with inequalities expressing other quantum information processing protocols, and is able to develop a kind of algebra of what's possible. Not everyone finds this to their taste, but personally I find it a fun and stimulating way of thinking about what's going on.

Teleportation has been experimentally demonstrated in many systems, beginning in the late 1990s. The experiments have been somewhat contentious, with four separate teams claiming to be the first to “really” do teleportationD. Boschi, S. Branca, F. De Martini, L. Hardy, and S. Popescu, [Experimental Realization of Teleporting an Unknown Pure Quantum State via Dual Classical and Einstein-Podolsky-Rosen Channels](https://arxiv.org/abs/quant-ph/9710013) (1997); Dik Bouwmeester, Jian-Wei Pan, Klaus Mattle, Manfred Eibl, Harald Weinfurter, and Anton Zeilinger, [Experimental Quantum Teleportation](https://www.nature.com/articles/37539) (1997); A. Furusawa, J. L. Sørensen, S. L. Braunstein, C. A. Fuchs, H. J. Kimble, and E. S. Polzik, [Unconditional Quantum Teleportation](https://science.sciencemag.org/content/282/5389/706) (1998); M. A. Nielsen, E. Knill, and R. Laflamme, [Complete quantum teleportation using nuclear magnetic resonance](https://arxiv.org/abs/quant-ph/9811020) (1998).; each team adopted a somewhat different criterion for what it means to succeed. I'm not a disinterested observer: I was on one of the teams, and unsurprisingly I think our criterion was the best; others have different opinions. In the years since many more experiments have been done, improving the quality of the implementation, and also using teleportation as part of more complex quantum information processing protocols.

There are many variations of the quantum teleportation protocol. I've described the simplest version, one that works to teleport qubits. But it's worth knowing that it's possible to extend the protocol to more complex quantum systems. There are also variations which use a different state shared between Alice and Bob, different operations performed by Alice and Bob, and so on. The version of teleportation I've described is, however, the one people are usually referring to when they say “quantum teleportation”. If you want a fun challenge, you might try to find some variations on the protocol. For instance, can you find a way of teleporting a qubit using the shared state 
$$
\frac{|01\rangle+|10\rangle}{\sqrt 2}
$$
? And are there other shared states you can find which can be used to do teleportation?

I've described how teleportation works, and we've verified that it does work. But it's still somewhat mysterious. How could you have come to discover teleportation in the first place? Why would you even suspect it's possible? Quantum mechanics took its near-modern form in the 1920s, and teleportation could have been discovered then. Certainly, more technically complex discoveries were made by physicists at the time. Yet, despite that, it wasn't discovered until 1993. Although technically rather simple, I believe teleportation wasn't discovered in part because it was conceptually unexpected. While I won't give a detailed answer to the question “what could lead you to discover teleportation”, if you're interested you may enjoy [this Twitter thread](https://twitter.com/michael_nielsen/status/1132063254849527808), which provides a partial answer, and which should be possible to follow with the background in this essay.

Why does teleportation matter? While it's a simple protocol it opens up a world of questions, leading to new ideas and new applications. You could write a fun book containing nothing but ideas inspired by or building on teleportation. I won't survey all those here, but just to give you the flavor I will mention one line of development. I hope you pardon me, but it's something I played a small role in.

In 1997, Ike Chuang and IM. A. Nielsen and Isaac L. Chuang, [Programmable Quantum Gate Arrays](https://arxiv.org/abs/quant-ph/9703032) (1997). showed that it's not only possible to teleport quantum states, but by modifying the protocol it's possible to teleport quantum *gates* from one location to another. Our gate teleportation protocol was stochastic, meaning it only worked some of the time, but in 1999, Chuang and Daniel GottesmanDaniel Gottesman and Isaac L. Chuang, [Demonstrating the viability of universal quantum computation using teleportation and single-qubit operations](https://www.nature.com/articles/46503/) (1999). pointed out that for some gates quantum gate teleportation could be made to work all the time.

This perhaps seems nice, but of mostly theoretical interest. However, in 2001 the scientists Manny Knill, Ray Laflamme, and Gerard MilburnE. Knill, R. Laflamme, and G. J. Milburn, [A scheme for efficient quantum computation with linear optics](https://www.nature.com/articles/35051009) (2001)., used quantum gate teleportation to show something unexpected. At the time, experts thought particles of light (photons) were likely to be a bad choice for use as qubits in quantum computers. While photons are in many ways excellent candidates to be qubits – it's easy to do many types of manipulation, and they're quite resistant to noise – there seemed to be no way of getting photons to interact to do a CNOT gate. But Knill, Laflamme, and Milburn found a beautiful way of teleporting the CNOT gate onto photons. This provided an in-principle (though initially very complex) way of building an optical quantum computer. That construction has since been simplified by many orders of magnitude, using yet more ideas related to teleportation. Today, there are [startup companies](https://psiquantum.com/) working toward optical quantum computers that build on this approach. Back in 1993, when teleportation was discovered, I doubt anyone anticipated that it would one day lead to new approaches to quantum computing. But teleportation is such a deep and powerful primitive that it keeps giving rise to new ideas, of which this is merely one example.

Thanks for reading. In the coming weeks, you’ll receive a notification containing a link to your first review session for this essay. In that review session you’ll be retested on the material you’ve learned, helping you further commit it to memory. It should only take a few minutes. In subsequent weeks you’ll receive more notifications linking you to re-review, gradually working toward genuine long-term memory of all the core material in the essay.

**Concluding thought:** Thanks for reading this account of quantum teleportation. If you’d like to remember the core ideas durably, please set up an account below. We’ll track your review schedule and send you occasional reminders containing links that will take you to the review experience.

Please sign in so we can save your progress and let you know the best times to review.

Thank you! Your progress will be saved as you read.