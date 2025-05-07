# Time, Clocks, and the Ordering of Events in a Distributed System

WORK IN PROGRESS

An interactive version, in the style of Bret Victor's [Collective dynamics of 'small-world' networks](https://worrydream.com/ScientificCommunicationAsSequentialArt/), for Leslie Lamport's ["Time, Clocks, and the Ordering of Events in a Distributed System"](https://lamport.azurewebsites.net/pubs/time-clocks.pdf).

Additional words from the author on the paper: https://lamport.azurewebsites.net/pubs/pubs.html#time-clocks


## Changes from the Original

### New Subsections

[In his additional words about the paper](https://lamport.azurewebsites.net/pubs/pubs.html#time-clocks), Lamport wrote:

> This is my most often cited paper.
> Many computer scientists claim to have read it.
> But I have rarely encountered anyone who was aware that the paper said anything about state machines.
> People seem to think that it is about either the causality relation on events in a distributed system, or the distributed mutual exclusion problem.
> People have insisted that there is nothing about state machines in the paper.
> I've even had to go back and reread it to convince myself that I really did remember what I had written.

Therefore, the "Ordering the Events Totally" has 2 subsection titles added: "Distributed Mutual Exclusion Problem" and "State Machines" to alleviate this problem.


### Set of System Events

The original symbol for the set of system events defined in "Anomalous Behavior" appears to be the "\mathscr{S}" symbol.
We also have the set of relevant events which is "\mathscr{S}" but with an underline (which looks like it was drawn on after print).
The closest unicode symbol is the [mathmatical script capital S](https://unicodeplus.com/U+1D4AE) and there is no symbol with a dedicated underline.
Therefore, I went with the [mathmatical script lowercase s](https://unicodeplus.com/U+1D4C8) for the system events and the capital for relevant events (capital is bigger than lowercase and the relevant events contains the system events).

### Corrections

- In the appendix, just after equation (6), the message clock is defined with $C_m (t) = t_m$ and $C_m (t') = t_m + u_m$. $t_m$ is not defined and probably was supposed to be $T_m$, the timestamp of the message.


## Elements

This section describes the various elements the paper has and why they are how they are.

### Math

Math is used to give precise and concise representations of ideas which are also described in words (eg: let "m" be the slope of a line).
A reader will have to map the math to the idea in their mind via the math or textual representation.
The information is in the paper but the reader may take time to build the mapping:
- if the reader already knows the mapping, they continue reading
- if the reader does not know the mapping, they either have to
    - go back to find what it presents (eg: go back in the paper to see "let "m" be the slope of a line")
    - spend time understanding what the notation means (eg: "mx + b" means the y-coordinate of the x position)

The paper will already know the mapping but may be far away from the use of the notation.

The math elements allow a reader to switch between the math notation and its textual representation.
This brings the related information close together and allows the reader to understand quicker.

### Expandable Text

Inspiration is from [Nicky Case's Nutshell library](https://ncase.me/nutshell/).

The further away a reference is from its source, the higher the mental load is on the reader.
If they forget the source, they have to go back, read the source again, and then resume reader where they left off.
This round-trip time grows the further away the reference is from the source.

The solution is to place the source right next to its use, eliminating the travel time.
