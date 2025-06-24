---
title: The era of thinking about thinking
date: '2025-01-15T18:48:21+08:00'
updated: '2024-11-30T08:00:00+08:00'
taxonomies:
  tags: null
extra:
  source: https://benchugg.com/writing/thinking_about_thinking/
  hostname: benchugg.com
  author: Ben Chugg
  original_title: The era of thinking about thinking
  original_lang: en
---

> **摘要**:
>  本文探讨了四个让人期待的趋势，旨在提高信息的记忆、消化和组织能力，包括使用基于分散重复的闪卡工具Anki提升记忆力、使用zettelkasten和数字花园等工具强化笔记技术、提高信息检索效率的搜索引擎和大型语言模型、以及提升编程生产力和协作的工具如VS Code和GitHub。这些趋势均致力于提高信息消费与生产的效率，属于元科学的范畴。随着社会的动态与开放，信息暴增使得有效整理和获取知识变得愈加重要，传统的学术传播方式如期刊和会议已经无法满足需求，因此新的工具和方法的开发显得尤为关键。另一方面，文章还讨论了“伟大的停滞”现象及其与科学进展放缓的关系，作者认为文化因素在其中起着重要作用，并强调跨领域研究的重要性，认为新的问题常常出现在学科边界之间，鼓励读者关注信息间的关联以推动科学进步。
> 
>  **要点总结**:
>  1. 四个趋势包括：提高记忆的工具、增强笔记技术、信息检索效率、编程生产力。
>  2. 这些趋势旨在提升信息消费和生产的效率，属于元科学的范畴。
>  3. 信息量激增需要新的整理和获取知识的方法，传统方式难以适应。
>  4. “伟大的停滞”与科学进展放缓有关，文化因素可能是关键。
>  5. 跨学科研究的重要性，鼓励关注学科间的联系以推动创新。

---


The era of thinking about thinking

November 30, 2024

Here are four trends that I’m excited about (some older than others, but all ongoing):

- Improving our ability to remember and digest the information that we read, with tools like [Anki flashcards](https://apps.ankiweb.net/) based on the idea of [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition).
- Improving our note-taking technology, with tools like [zettelkasten](https://zettelkasten.de/overview/), [digital gardens](https://www.reddit.com/r/DigitalGardens/?rdt=52281), and [second brains](https://www.buildingasecondbrain.com/).
- Improving our ability to efficiently search information space. Here the tools range from search engines (older) to large language models (newer).
- Improving programming productivity and collaboration. Tools range from code production environments like VS Code and cursor, to code sharing tools like Github, to code generating tools like co-pilot and LLMs.

What connects all of these areas?

They are all focused on making us more efficient about information consumption and production. They are tools for thought—technology for helping us connect our thinking, spot patterns in our ideas, produce and spread knowledge more quickly, and surf the world of information more easily. They might all be considered advances in [metascience](https://en.wikipedia.org/wiki/Metascience): the study of how to improve the technology and institutions in charge of creating and disseminating knowledge[^1].

I suspect these trends will only become more prominent over time. They are solving a problem that earlier societies did not have, or at least did not have to the same extent we do. The more dynamic and open a society, the more ideas it produces—from science and mathematics to art and literature. And the more ideas produced, the more technology is needed to remember, find, spread, manipulate, and digest those ideas.

While earlier societies made progress, the rate of progress was slower and the depth of knowledge shallower. If you go back far enough, it was possible to know most of what had been written about even fairly broad subjects, perhaps even to personally know those who had written it. There were only a handful of prominent philosophers in ancient Athens (Socrates, Plato, Aristotle, Epicurus, and a few others), economics in the 1800s was dominated by a few figures (Smith, Ricardo, Galiani, and arguably Bentham, Mill, and Marx), and even 20th century physicists were a relatively small community.

But now there are tens or hundreds of thousands of people interested in most fields, from credentialed researchers to bloggers. And it’s easy for all of them to upload their newest idea to the internet. We’re swimming in ideas. The number of formal scientific papers has exploded (e.g., the arXiv alone [went from receiving roughly 50 monthly submissions in 1991 to over 24,000 in October 2024](https://arxiv.org/stats/monthly_submissions)), let alone the number of informal books, blogs, and podcasts.

![](number_abstracts.jpg)

A figure from [Derek J. de Solla Price’s](https://en.wikipedia.org/wiki/Derek_J._de_Solla_Price) 1963 work on tracking the number of scientific publications over time, [*Little Science, Big Science*](https://en.wikipedia.org/wiki/Little_Science,_Big_Science). Price was one of the first people interested in tracking these trends.

You can no longer read everything published about a topic, unless you drastically narrow the subject matter down to sub-sub-sub-field. One can barely keep up with the publications of a handful of journals in microeconomics, let alone economics as a whole.

This puts pressure on discovering new ways to organize this information, both personally and institutionally. This pressure is what originally led to the invention of journals, which were circulated in order to keep scholars informed about developments in various fields. Some of the earliest journals were [The Philosophical Transactions of the Royal Society](https://royalsocietypublishing.org/journal/rstl), [The Proceedings of the Royal Society](https://royalsociety.org/journals/), and [Annalen der Physik](https://onlinelibrary.wiley.com/journal/15213889) (all still active).

This pressure also led to correspondence networks between academics so that they could tell each other about new work. Famously, [Charles Darwin sent more than 7,500 letters and received more than 6,500; Einstein sent more than 14,500 and received more than 16,000](https://www.nature.com/articles/4371251a). It also led to organized meetings and conferences between those working in the same area. The [Solvay conference of 1911](https://en.wikipedia.org/wiki/Solvay_Conference) was the first international conference on physics and chemistry, bringing together the few dozen people who were working on radiation and quanta.

![](solvay_1911.jpg)

The first Solvay conference, held in 1911 at the Hotel Metropole in Brussels. Participants included Solvay, Lorentz, Curie, Poincaré, Planck, de Broglie, Rutherford, Langevin, and Einstein.

While we still have journals and conferences, more is needed to stay apace with all the ideas floating around. And that’s where the four trends come into play. We’re learning how to remember more about what we read, organize our knowledge more efficiently, and find information more easily. (The fourth trend may at first seem unrelated, but programming has become such a key part of so many fields, that advances here translate to advances everywhere.)

Part of my excitement is purely personal. Nerds like me who want to Know Things have never had it better. We can sit in front of our computers and learn about everything from the French revolution and tort law, to general relativity and art history.

But more importantly (and more loftily), I think these trends hold part of the key to fighting [the great stagnation](https://en.wikipedia.org/wiki/The_Great_Stagnation)—a period of slow economic growth starting in the early 1970s. A lot of [bad things happened in the 1970s](https://wtfhappenedin1971.com/), but part of the great stagnation was a slowing of innovation and scientific progress. I’m not going to get into the history of and evidence behind this claim here, instead you can [read Scott Alexander talk about it](https://slatestarcodex.com/2018/11/26/is-science-slowing-down-2/) and show you fancy graphs to make the point.

There are several hypotheses for why this is the case. Some cite [institutional and cultural reasons](https://youtu.be/EVwjofV5TgU?si=_hXHqXCjFM3XSd5U&t=3193), from pessimism and an anti-progress ideology, to the distorted incentives created by funding agencies who are [only willing to fund safe research](https://mattsclancy.substack.com/p/biases-against-risky-research). Others cite the low-hanging fruit hypothesis, the idea that the biggest and most fundamental discoveries tend to happen earlier, and as time goes on good [ideas get harder to find](https://web.stanford.edu/~chadj/IdeaPF.pdf). You can only discover that DNA has the shape of a double-helix once—the next insight is going to be fundamentally harder than this.

I lean closer to the culture argument. ([I side with Adam Mastroianni](https://www.experimental-history.com/p/ideas-arent-getting-harder-to-find?utm_source=publication-search).) The low-hanging fruit hypothesis strikes me as a priori implausible because it misrepresents the discovery process. It treats knowledge generation as static, assuming that the set of ideas is fixed and that we’re simply trying to grab the next one within reach. But the next idea—whether in science, art, or literature—is a function of what questions we’re asking. And the questions we ask change constantly, not least because of what we learn. New knowledge suggests new questions and adds new fruit to the tree.

But there’s a catch: new questions may not be entirely within the original field of inquiry. This is because everything is related: we’ve erected artificial boundaries between scientific fields purely as a matter of administrative convenience. But if we take EO Wilson’s idea of [consilience](https://en.wikipedia.org/wiki/Consilience_%28book%29) seriously, then answering a question in physics can (and will!) have ramifications in chemistry, biology, mathematics, and even the humanities and social sciences.

The slowing of scientic progress is arguably a byproduct of hyper-specialization. Physicists do only physics, biologists only biology. And, of course, ideas get harder to find if you’re always asking the same questions. But if you’re open to new questions at the frontier between fields, then there will always be new low-hanging fruit to pick. To recognize these new questions, however, one has to be aware of the connections between domains of inquiry. And that’s what these four trends are doing—helping us recognize new relationships by helping us productively interact with and digest a wealth of information.

---

[Back to all writing](https://benchugg.com/writing/)

[Subscribe](https://benchugg.com/subscribe/) to get notified about new essays.