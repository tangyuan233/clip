---
title: "How a startup loses its spark"
date: "2025-02-06T21:43:22+08:00"
updated: "2023-08-06T21:43:22+08:00"
tags:
source: "https://blog.johnqian.com/startup-spark"
hostname: "blog.johnqian.com"
author:
original_title: "How a startup loses its spark"
---
At a well-run seed stage startup, engineers will often describe the work experience as *intoxicating*. At a larger company, the best you get is "enjoyable". Why does this happen? Is it inevitable?

Let's inspect what makes a startup intoxicating. An engineer should spend most of their time in this core loop:

1. If needed, talk to users, figure out their problems.
2. Come up with an idea to build.
3. If needed, discuss the idea with coworkers.
4. Implement the idea.
5. Cross fingers and ship. Celebrate or postmortem. Then go back to step 1.

At <10 people, each of these steps can be *fun*.

1. You can just directly reach out to users you’re interested in and grab a beer with them.
2. If you find an idea that you think is both valuable to the company and interesting to you, you can just drop everything to work on it.
3. Almost any coworker will be interested in discussing this idea with you because:
1. They have skin in the game. If your idea is good, they benefit from encouraging you to take it on. If your idea is bad, they benefit from explaining what’s wrong. They may even care as users themselves.
2. They might want to work with you on it.
3. They can likely offer useful insights since everyone’s familiar with a significant chunk of the codebase.
4. Implementation is quick.
1. Choose whatever tools you want, no security review.
2. Small codebase. Can hold the whole thing in your head, so you feel comfortable making sweeping refactors. Fast hot reload, so can do quick trial-error debugging.
3. Merge changes quick. No slow tests in CI. No need for blocking PR review for safe changes. Maybe just push to master. For unsafe changes, just tap coworker on shoulder for PR review.
4. If not too many users, can tolerate downtime to make breaking backend/database changes quickly.
5. Anything is possible! Maybe this will make your equity worth something. Maybe people will be building upon this feature for years to come, maybe you’ll be seen as a visionary in the history books. Maybe you’ll attend a party with your users and hear them say “you came up with this idea? OMG it saved my life”. Because everyone in the team has skin in the game, they’re all rooting for you. Your hearts are synced.

As a company scales, the fun is stripped from every one of these steps. At >100 people, the loop looks more like this:

1. Talking to users is for PMs, silly! You stick to what you’re good at. At best you get a summary of user insights and a reasonable task priority list derived from it. At worst you get a confusing task list built off a mistaken understanding of users and the manager’s selfish vision, and no one can explain why each task matters.
2. You can’t just work on whatever you want; coordinating would be an O(N^2) communication mess. Your manager has plans for you that they’ve designed in consideration with everything else going on. Maybe you can work on your own idea after you’ve finished all that stuff. Or you can work on it secretly in your spare time.
3. You can talk with your coworkers about your idea, but they’re not likely very interested. They don’t benefit much from your success; in fact, they might be competing with you for a promotion. They’ve got long task lists to do; they don’t have the freedom to drop what they’re doing and work with you. And they probably don’t remember much about the code you’re touching anyway.
4. Implementation is slow.
1. All the tools have been decided already. There might be better newer tools available, but they’re not worth introducing inconsistency. Don’t you *dare* introduce inconsistency. If you want to use something new, ask your manager and email the security review team.
2. Large codebase, mainly for legacy reasons. Lots of code you’re afraid to touch, lots of code no one understands anymore. Thorough tests are your only source of confidence that you’re not breaking everything. You need to rely on a lot of trial and error debugging, but each trial-error loop is slow because the code takes awhile to compile.
3. It takes 2 weeks to get a small PR in. Wait 20 minutes for CI to pass, it flakes, rerun tests. Merge conflicts accumulate as you await feedback from a reviewer. The reviewer just points out nits because they don’t have enough context or incentive to make important suggestions. You make requested changes, push changes, 20 more minutes. Repeat 3x per PR.
4. Making any infrastructure change is a 14 step process, lest you cause downtime or data loss for 10 million users.
5. After 3 months quietly toiling, you ship something. You get to demo it at a Friday meeting, your one chance for the CEO to see what you worked on. Only a few coworkers are really paying attention; your work simply doesn’t affect most of them. You get some pats on the back. Your manager says this will be big for you on your next perf cycle in 5 months. At best, you get a 20% salary bump and title change. At worst, in 4 months there’s a reorg, you get a new manager, your project gets deprioritized or scrapped. You need to convince the new manager that you’ve done stuff at this company.

Is this preventable? I think not.

If you look closely, all these problems fundamentally come from:

1. Decreased skin in the game, which reduces team alignment
2. N^2 communication, which creates need for managers and specialization, which reduces individual agency and breadth of learning
3. Reduced risk tolerance, which slows everything down

#1 and #2 are inevitable results of having more employees. #3 is an inevitable result of having more users, partially due to government regulation.

However, there are things you can do to slow the death of fun. For one, don’t accelerate it. Most startups needlessly accelerate their corporatization by copying the processes of larger companies, usually by poaching managers from large companies who bring their playbooks with them. For example, many startups use Jira because large companies use Jira. Don’t use Jira. Y Combinator has helped the world realize that inspiration should go the other way--large companies should try to operate more like startups.

Not only are large company playbooks meant for large companies, they’re also outdated. By the time your startup gets big, better solutions to many scaling challenges will exist. So when you experience scaling pains, try to solve them from first principles, or take inspiration from startups that move faster than you despite being the same size.

You can try to structure your company like a bunch of independent startups. And in fact you should do this to the extent that you can; Rippling has somewhat pulled it off. But you typically can’t get very far because the components of your product are too tightly interconnected, and most components don’t generate any revenue on their own.

You can meaningfully slow down #1 by cleverly designing your incentives. I’ll delve into this in another blog post. But no incentive is as good as a fat chunk of equity + the power to influence its value.

Beyond that, your best bet is to hire less. I strongly believe most companies hire too fast due to misaligned manager incentives, uninformed investors pushing you to look more like other fast-growing startups, and not understanding the true cost of a head. And as tools (especially AI) get better, the number of users a small team can support increases. Founders of the future may not need to worry so much about these scaling pains, and work may become fun for everyone.

---

## Addressing some comments