import { ComponentChildren } from "preact";
import { Reference, ReferenceAnchor } from "./Reference";
import { useLink } from "./Link";
import { codes } from "./codes";
import { Expression, Identifier, Operator, Number, SubScript, Fraction, SuperScript, Under } from "./Expression";
import { Event, Message, Process, SpaceTimeDiagram, Tick, usePathSelection } from "./SpaceTimeDiagram";
import { Inline } from "./Inline";
import { createPortal, Portal } from "./Portal";
import { PortalExpand } from "./ExpandPortal";


interface AnchorProps {
    id: string;
    children: ComponentChildren;
}

function Anchor(props: AnchorProps) {
    return (
        <a href={`#${props.id}`}>
            {props.children}
        </a>
    )
}

interface NoteProps {
    portal: Portal;
}

function Note(props: NoteProps) {
    return (
        <PortalExpand portal={props.portal}>
            <sup>
                [Note]
            </sup>
        </PortalExpand>
    )
}

const ids = {
    clock_condition: {
        root: "clock-condition",
        first: "first-clock-condition",
        second: "second-clock-condition",
    },
    physical_clock_condition: {
        first: "first-physical-clock-condition",
        second: "second-physical-clock-condition",
    },
    strong_clock_condition: "strong-clock-condition",
    implementation_rules: {
        first: "first-implementation-rule",
        second: {
            root: "second-implementation-rule",
            a: "second-implementation-rule-part-a",
            b: "second-implementation-rule-part-b",
        },
    },
    physical_implementation_rules: {
        first: "first-physical-implementation-rule",
        second: "second-physical-implementation-rule",
    },
    mutual_exclusion: {
        conditions: {
            all: "mutual-exclusion-problem-conditions",
            first: "first-mutual-exclusion-problem-condition",
            second: "second-mutual-exclusion-problem-condition",
            third: "third-mutual-exclusion-problem-condition",
        },
        rules: {
            first: "mutual-exclusion-problem_first-rule",
            second: "mutual-exclusion-problem-second-rule",
            third: "mutual-exclusion-problem-third-rule",
            fourth: "mutual-exclusion-problem-fourth-rule",
            fifth: {
                root: "mutual-exclusion-problem-fifth-rule",
                first: "mutual-exclusion-problem-fifth-rule-first",
                second: "mutual-exclusion-problem-fifth-rule-second",
            }
        }
    },
    notes: {
        event: "event-note",
        message: "message-note",
        ordering: "ordering-note",
        eventually: "eventually-note",
        acknowledgement: "acknowledgement-note",
        receive_message: "receive-message-note",
        release: "release-note",
        time: "time-note",
        limit: "limit-note",
    },
    references: {
        relativity: "reference_relativity",
        space_time: "reference_space-time",
        lamport_implementation: "reference_lamport-implementation",
        system_time: "reference_system-time",
    },
    sections: {
        abstract: "abstract",
        introduction: "introduction",
        partial_ordering: "partial-ordering",
        logical_clocks: "logical-clocks",
        total_ordering: "total-ordering",
        anomalous_behavior: "anomalous-behavior",
        physical_clocks: "physical-clocks",
        conclusion: "conclusion",
        appendix: "appendix",
        notes: "notes",
        references: "references",
    },
    figures: {
        first: "figure-1",
        second: "figure-2",
        third: "figure-3",
    },
};

const operators = {
    happened_before: codes.operators.arrows.right.single,
    not_happend_before: codes.operators.arrows.right.not_single,
}

export function Paper() {
    const p1 = useLink();
    const p2 = useLink();
    const p3 = useLink();
    const p4 = useLink();
    const q3 = useLink();
    const r4 = useLink();

    const processP = useLink();
    const processQ = useLink();

    const examplePath = usePathSelection();
    const showExamplePath = useLink({
        on: () => {
            examplePath[1]([0, 0]);
            examplePath[2]([2, 3]);
        },
        off: () => {
            examplePath[1]();
            examplePath[2]();
        },
    });

    const notes = {
        event: createPortal({
            entrance: (content) => content,
            exit: (content) => content,
            content: <p>
                The choice of what constitutes an event affects the ordering of events in a process. For example, the receipt of a message might denote
                the setting of an interrupt bit in a computer, or the execution of a
                subprogram to handle that interrupt. Since interrupts need not be
                handled in the order that they occur, this choice will affect the ordering of a process' message-receiving events.
            </p>
        }),
        message: createPortal({
            entrance: (content) => content,
            exit: (content) => content,
            content: <p>
                Observe that messages may be received out of order.
                We allow the sending of several messages to be a
                single event, but for convenience we will assume
                that the receipt of a single message does not
                coincide with the sending or receipt of any other message.
            </p>,
        }),
        ordering: createPortal({
            entrance: (content) => content,
            exit: (content) => content,
            content: <p>
                The ordering <Operator>{codes.operators.precedes}</Operator> establishes a priority among the processes.
                If a "fairer" method is desired, then <Operator>{codes.operators.precedes}</Operator> can be made
                a function of the clock value. For example, if <Expression>
                    <SubScript>
                        <Identifier>C</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript>
                    <Operator>{codes.operators.angle.left}</Operator>
                    <Identifier>a</Identifier>
                    <Operator>{codes.operators.angle.right}</Operator>
                    <Operator>{codes.operators.equals}</Operator>
                    <SubScript>
                        <Identifier>C</Identifier>
                        <Identifier>j</Identifier>
                    </SubScript>
                    <Operator>{codes.operators.angle.left}</Operator>
                    <Identifier>b</Identifier>
                    <Operator>{codes.operators.angle.right}</Operator>
                </Expression> and <Expression>
                    <Identifier>j</Identifier>
                    <Operator>{codes.operators.less_than}</Operator>
                    <Identifier>i</Identifier>
                </Expression>, then we can let <Expression>
                    <Identifier>a</Identifier>
                    <Operator>{codes.operators.arrows.right.double}</Operator>
                    <Identifier>b</Identifier>
                </Expression> if <Expression>
                    <Identifier>j</Identifier>
                    <Operator>{codes.operators.less_than}</Operator>
                    <SubScript>
                        <Identifier>C</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript>
                    <Operator>{codes.operators.angle.left}</Operator>
                    <Identifier>a</Identifier>
                    <Operator>{codes.operators.angle.right}</Operator>
                    <Identifier>mod</Identifier>
                    <Identifier>N</Identifier>
                    <Operator>less-than-equal</Operator>
                    <Identifier>i</Identifier>
                </Expression>, and <Expression>
                    <Identifier>b</Identifier>
                    <Operator>{codes.operators.arrows.right.double}</Operator>
                    <Identifier>a</Identifier>
                </Expression> otherwise; where <Identifier>N</Identifier> is the total number of processes.
            </p>
        }),
        eventually: createPortal({
            entrance: (content) => content,
            exit: (content) => content,
            content: <p>
                The term "eventually" should be made precise, but that would require too long a diversion from our main topic.
            </p>,
        }),
        acknowledgement: createPortal({
            entrance: (content) => content,
            exit: (content) => content,
            content: <p>
                This acknowledgement message need not be sent if <SubScript>
                    <Identifier>P</Identifier>
                    <Identifier>j</Identifier>
                </SubScript> has
                already sent a message to <SubScript>
                    <Identifier>P</Identifier>
                    <Identifier>i</Identifier>
                </SubScript> timestamped later
                than <SubScript>
                    <Identifier>T</Identifier>
                    <Identifier>m</Identifier>
                </SubScript>.
            </p>
        }),
        receive_message: createPortal({
            entrance: (content) => content,
            exit: (content) => content,
            content: <p>
                If <Expression>
                    <SubScript>
                        <Identifier>P</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript>
                    <Operator>{codes.operators.precedes}</Operator>
                    <SubScript>
                        <Identifier>P</Identifier>
                        <Identifier>j</Identifier>
                    </SubScript>
                </Expression>, then <SubScript>
                    <Identifier>P</Identifier>
                    <Identifier>i</Identifier>
                </SubScript> need only have received a
                message timestamped <Expression>
                    <Operator>greater-than-equal</Operator>
                    <SubScript>
                        <Identifier>T</Identifier>
                        <Identifier>m</Identifier>
                    </SubScript>
                </Expression> from <SubScript>
                    <Identifier>P</Identifier>
                    <Identifier>j</Identifier>
                </SubScript>.
            </p>
        }),
        release: createPortal({
            entrance: (content) => content,
            exit: (content) => content,
            content: <p>
                If each process does not stricly alternate <em>request</em> and <em>release</em> commands,
                then executing a <em>release</em> command could delete zero, one, or more than one request
                from the queue.
            </p>
        }),
        time: createPortal({
            entrance: (content) => content,
            exit: (content) => content,
            content: <p>
                We will assume a Newtonian space-time. If the relative motion of the clocks or gravitational effects are not
                negligible, then <Expression>
                    <SubScript>
                        <Identifier>C</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript>
                    <Operator>(</Operator>
                    <Identifier>t</Identifier>
                    <Operator>)</Operator>
                </Expression> must be deduced from the actual clock reading by transforming from proper time
                to the arbitrarily chosen time coordinate.
            </p>
        }),
        limit: createPortal({
            entrance: (content) => content,
            exit: (content) => content,
            content: <p>
                <Expression display="block">
                    <SubScript>
                        <Identifier>C</Identifier>
                        <Identifier>j</Identifier>
                    </SubScript>
                    <Operator>(</Operator>
                    <Identifier>t</Identifier>
                    <Operator>{codes.operators.prime}</Operator>
                    <Operator>-</Operator>
                    <Number value={0} />
                    <Operator>)</Operator>
                    <Operator>=</Operator>
                    <Under>
                        <Identifier>lim</Identifier>
                        <Expression>
                            <Identifier>{codes.greek.delta}</Identifier>
                            <Operator>{codes.operators.arrows.right.single}</Operator>
                            <Number value={0} />
                        </Expression>
                    </Under>
                    <SubScript>
                        <Identifier>C</Identifier>
                        <Identifier>j</Identifier>
                    </SubScript>
                    <Operator>(</Operator>
                    <Identifier>t</Identifier>
                    <Operator>{codes.operators.prime}</Operator>
                    <Operator>-</Operator>
                    <Operator>|</Operator>
                    <Identifier>{codes.greek.delta}</Identifier>
                    <Operator>|</Operator>
                    <Operator>)</Operator>
                </Expression>
            </p>
        }),
    }

    return (
        <article>
            <header>Time, Clocks, and the Ordering of Events in a Distributed System</header>
            <address>
                <span class="name">Leslie Lamport</span>
                <span class="institution">Massachusetts Computer Associates, Inc.</span>
            </address>
            <section id={ids.sections.abstract}>
                <header>Abstract</header>
                <p>
                    The concept of one event happening before another
                    in a distributed system is examined, and is shown to
                    define a partial ordering of the events. A distributed
                    algorithm is given for synchronizing a system of logical
                    clocks which can be used to totally order the events.
                    The use of the total ordering is illustrated with a
                    method for solving synchronization problems. The
                    algorithm is then specialized for synchronizing physical
                    clocks, and a bound is derived on how far out of
                    synchrony the clocks can become.
                </p>
            </section>

            <section>
                <header>Table of Contents</header>
                <ol>
                    <li>
                        <Anchor id={ids.sections.introduction}>Introduction</Anchor>
                    </li>
                    <li>
                        <Anchor id={ids.sections.partial_ordering}>The Partial Ordering</Anchor>
                    </li>
                    <li>
                        <Anchor id={ids.sections.logical_clocks}>Logical Clocks</Anchor>
                    </li>
                    <li>
                        <Anchor id={ids.sections.total_ordering}>Ordering the Events Totally</Anchor>
                    </li>
                    <li>
                        <Anchor id={ids.sections.anomalous_behavior}>Anomalous Behavior</Anchor>
                    </li>
                    <li>
                        <Anchor id={ids.sections.physical_clocks}>Physical Clocks</Anchor>
                    </li>
                    <li>
                        <Anchor id={ids.sections.conclusion}>Conclusion</Anchor>
                    </li>
                    <li>
                        <Anchor id={ids.sections.appendix}>Appendix</Anchor>
                    </li>
                    <li>
                        <Anchor id={ids.sections.notes}>Notes</Anchor>
                    </li>
                    <li>
                        <Anchor id={ids.sections.references}>References</Anchor>
                    </li>
                </ol>
            </section>

            <section id={ids.sections.introduction}>
                <header>
                    Introduction
                </header>
                <p>
                    The concept of time is fundamental to our way of
                    thinking. It is derived from the more basic concept of
                    the order in which events occur. We say that something
                    happened at 3:15 if it occurred after our clock read 3:15
                    and before it read 3:16. The concept of the temporal
                    ordering of events pervades our thinking about systems.
                    For example, in an airline reservation system we specify
                    that a request for a reservation should be granted if it is
                    made before the flight is filled. However, we will see that
                    this concept must be carefully reexamined when considering
                    events in a distributed system.
                </p>
                <p>
                    A distributed system consists of a collection of distinct
                    processes which are spatially separated, and which communicate
                    with one another by exchanging messages. A
                    network of interconnected computers, such as the ARPA
                    net, is a distributed system. A single computer can also
                    be viewed as a distributed system in which the central
                    control unit, the memory units, and the input-output
                    channels are separate processes. A system is distributed
                    if the message transmission delay is not negligible com-
                    pared to the time between events in a single process.
                </p>
                <p>
                    We will concern ourselves primarily with systems of
                    spatially separated computers. However, many of our
                    remarks will apply more generally. In particular, a multiprocessing
                    system on a single computer involves problems similar
                    to those of a distributed system because of
                    the unpredictable order in which certain events can
                    occur.
                </p>
                <p>
                    In a distributed system, it is sometimes impossible to
                    say that one of two events occurred first. The relation
                    "happened before" is therefore only a partial ordering
                    of the events in the system. We have found that problems
                    often arise because people are not fully aware of this fact
                    and its implications.
                </p>
                <p>
                    In this paper, we discuss the partial ordering defined
                    by the "happened before" relation, and give a distributed
                    algorithm for extending it to a consistent total ordering
                    of all the events. This algorithm can provide a useful
                    mechanism for implementing a distributed system. We
                    illustrate its use with a simple method for solving synchronization
                    problems. Unexpected, anomalous behavior can occur if
                    the ordering obtained by this algorithm
                    differs from that perceived by the user. This can be
                    avoided by introducing real, physical clocks. We describe
                    a simple method for synchronizing these clocks, and
                    derive an upper bound on how far out of synchrony they
                    can drift.
                </p>
            </section>

            <section id={ids.sections.partial_ordering}>
                <header>The Partial Ordering</header>
                <p>
                    Most people would probably say that an
                    event <Identifier description="an event">a</Identifier> happened
                    before an event <Identifier description="another event">b</Identifier> if <Identifier description="the first event)">a</Identifier> happened
                    at an earlier time than <Identifier description="the second event">b</Identifier>.
                    They might justify this definition in terms
                    of physical theories of time. However, if a system is to
                    meet a specification correctly, then that specification
                    must be given in terms of events observable within the
                    system. If the specification is in terms of physical time,
                    then the system must contain real clocks. Even if it does
                    contain real clocks, there is still the problem that such
                    clocks are not perfectly accurate and do not keep precise
                    physical time. We will therefore define the "happened
                    before" relation without using physical clocks.
                </p>
                <p>
                    We begin by defining our system more precisely. We
                    assume that the system is composed of a collection of
                    processes. Each process consists of a sequence of events.
                    Depending upon the application, the execution of a
                    subprogram on a computer could be one event, or the
                    execution of a single machine instruction could be one
                    event. We are assuming that the events of a process form
                    a sequence, where <Identifier description="the first event">a</Identifier> occurs
                    before <Identifier description="the second event">b</Identifier> in this sequence
                    if <Identifier description="the first event">a</Identifier> happens
                    before <Identifier description="the second event">b</Identifier>.
                    In other words, a single process is
                    defined to be a set of events with an a priori total
                    ordering. This seems to be what is generally meant by a
                    process. <Note portal={notes.event} /> It would be trivial to extend our definition to
                    allow a process to split into distinct subprocesses, but we
                    will not bother to do so.
                </p>
                <p>
                    We assume that sending or receiving a message is an
                    event in a process. We can then define the "happened
                    before" relation, denoted by "<Operator description="happened before">{operators.happened_before}</Operator>", as follows.
                </p>
                <p>
                    <em>Definition</em>. The relation "<Operator description="happened before">{operators.happened_before}</Operator>"
                    on the set of events of
                    a system is the smallest relation satisfying the following
                    three conditions:
                </p>
                <ol>
                    <li>
                        <p>
                            If <Identifier description="an event">a</Identifier> and <Identifier description="another event">b</Identifier> are
                            events in the same process, and <Identifier description="the first event">a</Identifier> comes
                            before <Identifier description="the second event">b</Identifier>,
                            then <Expression description="the first event happened before the second event">
                                <Identifier description="the first event">a</Identifier>
                                <Operator description="happened before">{operators.happened_before}</Operator>
                                <Identifier description="the second event">b</Identifier>
                            </Expression>.
                        </p>
                    </li>
                    <li>
                        <p>
                            If <Identifier description="an event">a</Identifier> is
                            the sending of a message by one process and <Identifier description="another event">b</Identifier> is
                            the receipt of the same message by another process, then <Expression description="the event of sending a message happened before the event of receiving the message">
                                <Identifier description="the event of sending a message">a</Identifier>
                                <Operator description="happened before">{operators.happened_before}</Operator>
                                <Identifier description="the event of receiving the message">b</Identifier>
                            </Expression>.
                        </p>
                    </li>
                    <li>
                        <p>
                            If <Expression description="a first event happened before a second event">
                                <Identifier description="the first event">a</Identifier>
                                <Operator description="happened before">{operators.happened_before}</Operator>
                                <Identifier description="the second event">b</Identifier>
                            </Expression> and <Expression description="a second event happened before a third event">
                                <Identifier description="the second event">b</Identifier>
                                <Operator description="happened before">{operators.happened_before}</Operator>
                                <Identifier description="the third event">c</Identifier>
                            </Expression> then <Expression description="a first event happened before a third event">
                                <Identifier description="the first event">a</Identifier>
                                <Operator description="happened before">{operators.happened_before}</Operator>
                                <Identifier description="the third event">c</Identifier>
                            </Expression>.
                        </p>
                    </li>
                </ol>
                <p>
                    Two distinct events <Identifier description="an event">a</Identifier> and <Identifier description="another event">b</Identifier> are
                    said to be concurrent if <Expression description="the first event did not happen before the second event">
                        <Identifier description="the first event">a</Identifier>
                        <Operator description="did not happen before">{operators.not_happend_before}</Operator>
                        <Identifier description="the second event">b</Identifier>
                    </Expression> and <Expression description="the second event did not happen before the first event">
                        <Identifier description="the second event">b</Identifier>
                        <Operator description="did not happen before">{operators.not_happend_before}</Operator>
                        <Identifier description="the first event event">a</Identifier>
                    </Expression>.
                </p>
                <p>
                    We assume that <Expression description="an event did not happen before itself">
                        <Identifier description="an event">a</Identifier>
                        <Operator description="did not happen before">{operators.not_happend_before}</Operator>
                        <Identifier description="the same event">a</Identifier>
                    </Expression> for any event <Identifier description="an event">a</Identifier>.
                    (Systems in which an event can happen before itself do not seem to
                    be physically meaningful.) This implies that <Operator description="happened before">{operators.happened_before}</Operator> is
                    an irreflexive partial ordering on the set of all events in the system.
                </p>
                <p>
                    It is helpful to view this definition in terms of a
                    "space-time diagram" such as <Anchor id={ids.figures.first}>Figure 1</Anchor>. The horizontal
                    direction represents space, and the vertical direction
                    represents time &ndash; later times being higher than earlier
                    ones. The dots denote events, the vertical lines denote
                    processes, and the wavy lines denote messages. <Note portal={notes.message} /> It is easy
                    to see that <Expression description="the first event happened before the second event">
                        <Identifier description="the first event">a</Identifier>
                        <Operator description="happened before">{operators.happened_before}</Operator>
                        <Identifier description="the second event">b</Identifier>
                    </Expression> means
                    that one can go from <Identifier description="the first event">a</Identifier> to <Identifier description="the second event">b</Identifier> in
                    the diagram by moving forward in time along process
                    and message lines. For example, we have <Expression description="the first event in process P happened before the fourth event in process R" source={showExamplePath}>
                        <SubScript description="the first event in process P" source={p1}>
                            <Identifier>p</Identifier>
                            <Number value={1} />
                        </SubScript>
                        <Operator description="happened before">{operators.happened_before}</Operator>
                        <SubScript description="the fourth event in process R" source={r4}>
                            <Identifier>r</Identifier>
                            <Number value={4} />
                        </SubScript>
                    </Expression> in <Anchor id={ids.figures.first}>Figure 1</Anchor>.
                </p>

                <figure id={ids.figures.first} class="space-time">
                    <SpaceTimeDiagram path={examplePath}>
                        <Message start={[0, 0]} end={[1, 1]} />
                        <Message start={[1, 0]} end={[0, 1]} />
                        <Message start={[1, 4]} end={[0, 3]} />

                        <Message start={[1, 0]} end={[2, 3]} />
                        <Message start={[1, 3]} end={[2, 2]} />
                        <Message start={[2, 1]} end={[1, 6]} />

                        <Process id={0} target={processP}>
                            <span>process P</span>
                            <Event time={0} target={p1}>
                                <SubScript>
                                    <Identifier>p</Identifier>
                                    <Number value={1} />
                                </SubScript>
                            </Event>
                            <Event time={20}>
                                <SubScript>
                                    <Identifier>p</Identifier>
                                    <Number value={2} />
                                </SubScript>
                            </Event>
                            <Event time={40} target={p3} >
                                <SubScript>
                                    <Identifier>p</Identifier>
                                    <Number value={3} />
                                </SubScript>
                            </Event>
                            <Event time={60} target={p4} >
                                <SubScript>
                                    <Identifier>p</Identifier>
                                    <Number value={4} />
                                </SubScript>
                            </Event>
                        </Process>
                        <Process id={1} target={processQ}>
                            <span>process Q</span>
                            <Event time={0}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={1} />
                                </SubScript>
                            </Event>
                            <Event time={10}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={2} />
                                </SubScript>
                            </Event>
                            <Event time={20} target={q3}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={3} />
                                </SubScript>
                            </Event>
                            <Event time={30}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={4} />
                                </SubScript>
                            </Event>
                            <Event time={40}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={5} />
                                </SubScript>
                            </Event>
                            <Event time={50}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={6} />
                                </SubScript>
                            </Event>
                            <Event time={60}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={7} />
                                </SubScript>
                            </Event>
                        </Process>
                        <Process id={2}>
                            <span>process R</span>
                            <Event time={0}>
                                <SubScript>
                                    <Identifier>r</Identifier>
                                    <Number value={1} />
                                </SubScript>
                            </Event>
                            <Event time={20}>
                                <SubScript>
                                    <Identifier>r</Identifier>
                                    <Number value={2} />
                                </SubScript>
                            </Event>
                            <Event time={40}>
                                <SubScript>
                                    <Identifier>r</Identifier>
                                    <Number value={3} />
                                </SubScript>
                            </Event>
                            <Event time={60} target={r4}>
                                <SubScript>
                                    <Identifier>r</Identifier>
                                    <Number value={4} />
                                </SubScript>
                            </Event>
                        </Process>
                    </SpaceTimeDiagram>
                    <figcaption>Figure 1</figcaption>
                </figure>

                <p>
                    Another way of viewing the definition is to say
                    that <Expression description="an event happened before another event">
                        <Identifier description="an event">a</Identifier>
                        <Operator description="happened before">{codes.operators.arrows.right.single}</Operator>
                        <Identifier description="another event">b</Identifier>
                    </Expression> means
                    that it is possible for event <Identifier description="an event">a</Identifier> to
                    causally affect event <Identifier description="another event">b</Identifier>.
                    Two events are concurrent if neither
                    can causally affect the other. For example,
                    events <SubScript description="the third event in process P" source={p3}>
                        <Identifier>p</Identifier>
                        <Number value={3} />
                    </SubScript> and <SubScript description="the third event in process Q" source={q3}>
                        <Identifier>q</Identifier>
                        <Number value={3} />
                    </SubScript> of <Anchor id={ids.figures.first}>Figure 1</Anchor> are
                    concurrent. Even though we have drawn the diagram to imply
                    that <SubScript description="the third event in process Q" source={q3}>
                        <Identifier>q</Identifier>
                        <Number value={3} />
                    </SubScript> occurs at an earlier
                    physical time than <SubScript description="the third event in process P" source={p3}>
                        <Identifier>p</Identifier>
                        <Number value={3} />
                    </SubScript>, <Inline source={processP}>process P</Inline> cannot know what <Inline source={processQ}>process
                        Q</Inline> did at <SubScript description="the third event in process Q" source={q3}>
                        <Identifier>q</Identifier>
                        <Number value={3} />
                    </SubScript> until it receives the message at <SubScript description="the fourth event in process P" source={p4}>
                        <Identifier>p</Identifier>
                        <Number value={4} />
                    </SubScript>.
                    (Before event <SubScript description="the fourth event in process P" source={p4}>
                        <Identifier>p</Identifier>
                        <Number value={4} />
                    </SubScript>, <Inline source={processP}>P</Inline> could at most know what <Inline source={processQ}>Q</Inline> was <em>planning</em> to
                    do at <SubScript description="the third event in process Q" source={q3}>
                        <Identifier>q</Identifier>
                        <Number value={3} />
                    </SubScript>).
                </p>
                <p>
                    This definition will appear quite natural to the reader
                    familiar with the invariant space-time formulation of
                    special relativity, as described for example in <ReferenceAnchor href={ids.references.relativity}>[1]</ReferenceAnchor> or the
                    first chapter of <ReferenceAnchor href={ids.references.space_time}>[2]</ReferenceAnchor>. In relativity, the ordering of events is
                    defined in terms of messages that could be sent. However,
                    we have taken the more pragmatic approach of only
                    considering messages that actually are sent. We should
                    be able to determine if a system performed correctly by
                    knowing only those events which did occur, without
                    knowing which events could have occurred.
                </p>
            </section>

            <section id={ids.sections.logical_clocks}>
                <header>Logical Clocks</header>

                <p>
                    We now introduce clocks into the system. We begin
                    with an abstract point of view in which a clock is just a
                    way of assigning a number to an event, where the number
                    is thought of as the time at which the event occurred.
                    More precisely, we define a clock <SubScript description="clock for process i">
                        <Identifier>C</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript> for each process <SubScript description="a process">
                        <Identifier>P</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript> to be a function which assigns a number <Expression>
                        <SubScript>
                            <Identifier>C</Identifier>
                            <Identifier>i</Identifier>
                        </SubScript>
                        <Operator>{codes.operators.angle.left}</Operator>
                        <Identifier>a</Identifier>
                        <Operator>{codes.operators.angle.right}</Operator>
                    </Expression> to any
                    event <Identifier>a</Identifier> in that process. The entire system of clocks is
                    represented by the function <Identifier>C</Identifier> which assigns to
                    any event <Identifier>b</Identifier> the number <Expression>
                        <Identifier>C</Identifier>
                        <Operator>{codes.operators.angle.left}</Operator>
                        <Identifier description="event in process j">b</Identifier>
                        <Operator>{codes.operators.angle.right}</Operator>
                    </Expression>, where <Expression>
                        <Identifier description="system of clocks for all processes">C</Identifier>
                        <Operator>{codes.operators.angle.left}</Operator>
                        <Identifier description="event in process j">b</Identifier>
                        <Operator>{codes.operators.angle.right}</Operator>
                        <Operator>{codes.operators.equals}</Operator>
                        <SubScript description="clock for process j">
                            <Identifier>C</Identifier>
                            <Identifier>j</Identifier>
                        </SubScript>
                        <Operator>{codes.operators.angle.left}</Operator>
                        <Identifier description="event in process j">b</Identifier>
                        <Operator>{codes.operators.angle.right}</Operator>
                    </Expression> if <Identifier description="event in process j">b</Identifier> is an event
                    in process <SubScript>
                        <Identifier>P</Identifier>
                        <Identifier>j</Identifier>
                    </SubScript>. For now, we make no assumption about
                    the relation of the numbers <Expression>
                        <SubScript>
                            <Identifier>C</Identifier>
                            <Identifier>i</Identifier>
                        </SubScript>
                        <Operator>{codes.operators.angle.left}</Operator>
                        <Identifier>a</Identifier>
                        <Operator>{codes.operators.angle.right}</Operator>
                    </Expression> to physical time, so we
                    can think of the clocks <SubScript description="clock for process i">
                        <Identifier>C</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript> as logical rather than physical
                    clocks. They may be implemented by counters with no
                    actual timing mechanism.
                </p>
                <p>
                    We now consider what it means for such a system of
                    clocks to be correct. We cannot base our definition of
                    correctness on physical time, since that would require
                    introducing clocks which keep physical time. Our definition
                    must be based on the order in which events occur.
                    The strongest reasonable condition is that if an event <Identifier>a</Identifier> occurs
                    before another event <Identifier>b</Identifier>, then <Identifier>a</Identifier> should
                    happen at an earlier time than <Identifier>b</Identifier>. We state this condition more
                    formally as follows.
                </p>
                <p id={ids.clock_condition.root}>
                    <em>Clock Condition.</em> For any events <Identifier description="first event">a</Identifier>, <Identifier description="second event">b</Identifier>:
                    if <Expression description="the first event happened before the second event">
                        <Identifier description="first event">a</Identifier>
                        <Operator description="happened before">{codes.operators.arrows.right.single}</Operator>
                        <Identifier description="second event">b</Identifier>
                    </Expression> then <Expression description="the logical time of the first event is less than the logical time of the second event">
                        <Expression description="the logical time of the first event">
                            <Identifier>C</Identifier>
                            <Operator>{codes.operators.angle.left}</Operator>
                            <Identifier description="first event">a</Identifier>
                            <Operator>{codes.operators.angle.right}</Operator>
                        </Expression>
                        <Operator>{codes.operators.less_than}</Operator>
                        <Expression description="the logical time of the second event">
                            <Identifier>C</Identifier>
                            <Operator>{codes.operators.angle.left}</Operator>
                            <Identifier description="second event">b</Identifier>
                            <Operator>{codes.operators.angle.right}</Operator>
                        </Expression>
                    </Expression>.
                </p>
                <p>
                    Note that we cannot expect the converse condition to
                    hold as well, since that would imply that any two concurrent
                    events must occur at the same time. In <Anchor id={ids.figures.first}>Figure 1</Anchor>, <SubScript description="the second event in process P" source={p2}>
                        <Identifier>p</Identifier>
                        <Number value={2} />
                    </SubScript> and <SubScript description="the third event in process P" source={p3}>
                        <Identifier>p</Identifier>
                        <Number value={3} />
                    </SubScript> are both concurrent with <SubScript description="the third event in process Q" source={q3}>
                        <Identifier>q</Identifier>
                        <Number value={3} />
                    </SubScript>, so this would
                    mean that they both must occur at the same time as <SubScript description="the third event in process Q" source={q3}>
                        <Identifier>q</Identifier>
                        <Number value={3} />
                    </SubScript>, which would
                    contradict the <Anchor id={ids.clock_condition.root}>Clock Condition</Anchor> because <Expression description="the second event in process P happened before the third event in process P">
                        <SubScript description="the second event in process P">
                            <Identifier>p</Identifier>
                            <Number value={2} />
                        </SubScript>
                        <Operator description="happend before">{codes.operators.arrows.right.single}</Operator>
                        <SubScript description="the third event in process P">
                            <Identifier>p</Identifier>
                            <Number value={3} />
                        </SubScript>
                    </Expression>.
                </p>
                <p>
                    It is easy to see from our definition of the relation "<Operator description="happend before relation">{codes.operators.arrows.right.single}</Operator>"
                    that the <Anchor id={ids.clock_condition.root}>Clock Condition</Anchor> is satisfied if the following two conditions hold.
                </p>
                <ol>
                    <li>
                        <p id={ids.clock_condition.first}>
                            If <Identifier>a</Identifier> and <Identifier>b</Identifier> are
                            events in process <SubScript>
                                <Identifier>P</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript> and <Identifier>a</Identifier> comes
                            before <Identifier>b</Identifier>, then <Expression>
                                <Expression>
                                    <SubScript>
                                        <Identifier>C</Identifier>
                                        <Identifier>i</Identifier>
                                    </SubScript>
                                    <Operator>{codes.operators.angle.left}</Operator>
                                    <Identifier description="the first event">a</Identifier>
                                    <Operator>{codes.operators.angle.right}</Operator>
                                </Expression>
                                <Operator>{codes.operators.less_than}</Operator>
                                <Expression>
                                    <SubScript>
                                        <Identifier>C</Identifier>
                                        <Identifier>i</Identifier>
                                    </SubScript>
                                    <Operator>{codes.operators.angle.left}</Operator>
                                    <Identifier description="the second event">b</Identifier>
                                    <Operator>{codes.operators.angle.right}</Operator>
                                </Expression>
                            </Expression>
                        </p>
                    </li>
                    <li>
                        <p id={ids.clock_condition.second}>
                            If <Identifier>a</Identifier> is the sending of a message
                            by process <SubScript>
                                <Identifier>P</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript> and <Identifier>b</Identifier> is
                            the receipt of that message by process <SubScript>
                                <Identifier>P</Identifier>
                                <Identifier>j</Identifier>
                            </SubScript>, then <Expression description="the logical time of sending a message is less than the logical time of receiving the message">
                                <Expression description="the logical time of sending a message">
                                    <SubScript>
                                        <Identifier>C</Identifier>
                                        <Identifier>i</Identifier>
                                    </SubScript>
                                    <Operator>{codes.operators.angle.left}</Operator>
                                    <Identifier description="the event of sending a message">a</Identifier>
                                    <Operator>{codes.operators.angle.right}</Operator>
                                </Expression>
                                <Operator>{codes.operators.less_than}</Operator>
                                <Expression description="the logical time of receiving the message">
                                    <SubScript>
                                        <Identifier>C</Identifier>
                                        <Identifier>j</Identifier>
                                    </SubScript>
                                    <Operator>{codes.operators.angle.left}</Operator>
                                    <Identifier description="the event of receiving the message">b</Identifier>
                                    <Operator>{codes.operators.angle.right}</Operator>
                                </Expression>
                            </Expression>
                        </p>
                    </li>
                </ol>
                <p>
                    Let us consider the clocks in terms of a space-time
                    diagram. We imagine that a process' clock "ticks"
                    through every number, with the ticks occurring between
                    the process' events. For example, if <Identifier>a</Identifier> and <Identifier>b</Identifier> are
                    consecutive events in process <SubScript>
                        <Identifier>P</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript> with <Expression>
                        <Expression description="the logical time of the first event">
                            <SubScript>
                                <Identifier>C</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript>
                            <Operator>{codes.operators.angle.left}</Operator>
                            <Identifier description="the first event">a</Identifier>
                            <Operator>{codes.operators.angle.right}</Operator>
                        </Expression>
                        <Operator>{codes.operators.equals}</Operator>
                        <Number value={4} />
                    </Expression> and <Expression>
                        <Expression description="the logical time of the second event">
                            <SubScript>
                                <Identifier>C</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript>
                            <Operator>{codes.operators.angle.left}</Operator>
                            <Identifier description="the second event">b</Identifier>
                            <Operator>{codes.operators.angle.right}</Operator>
                        </Expression>
                        <Operator>{codes.operators.equals}</Operator>
                        <Number value={7} />
                    </Expression>, then clock
                    ticks 5, 6, and 7 occur between the two events.
                    We draw a dashed "tick line" through all the like-numbered
                    ticks of the different processes. The space-time
                    diagram of <Anchor id={ids.figures.first}>Figure 1</Anchor> might then yield the picture in <Anchor id={ids.figures.second}>
                        Figure 2
                    </Anchor>. <Anchor id={ids.clock_condition.first}>
                        Condition C1
                    </Anchor> means that there must be a tick
                    line between any two events on a process line, and <Anchor id={ids.clock_condition.second}>
                        condition C2
                    </Anchor> means that every message line must cross
                    a tick line. From the pictorial meaning of <Operator description="the happened-before relation">{codes.operators.arrows.right.single}</Operator>, it is easy to
                    see why these two conditions imply the <Anchor id={ids.clock_condition.root}>Clock Condition</Anchor>.
                </p>
                <figure id={ids.figures.second} class="space-time">
                    <SpaceTimeDiagram path={examplePath}>
                        <Tick times={[2, 2, 2]} />
                        <Tick times={[7, 7, 7]} />
                        <Tick times={[30, 15, 18]} />
                        <Tick times={[42, 18, 24]} />
                        <Tick times={[44, 25, 30]} />
                        <Tick times={[50, 35, 38]} />
                        <Tick times={[55, 45, 45]} />
                        <Tick times={[65, 55, 55]} />

                        <Message start={[0, 0]} end={[1, 1]} />
                        <Message start={[1, 0]} end={[0, 1]} />
                        <Message start={[1, 4]} end={[0, 3]} />

                        <Message start={[1, 0]} end={[2, 3]} />
                        <Message start={[1, 3]} end={[2, 2]} />
                        <Message start={[2, 1]} end={[1, 6]} />

                        <Process id={0} target={processP}>
                            <span>process P</span>
                            <Event time={0} target={p1}>
                                <SubScript>
                                    <Identifier>p</Identifier>
                                    <Number value={1} />
                                </SubScript>
                            </Event>
                            <Event time={20}>
                                <SubScript>
                                    <Identifier>p</Identifier>
                                    <Number value={2} />
                                </SubScript>
                            </Event>
                            <Event time={40} target={p3} >
                                <SubScript>
                                    <Identifier>p</Identifier>
                                    <Number value={3} />
                                </SubScript>
                            </Event>
                            <Event time={60} target={p4} >
                                <SubScript>
                                    <Identifier>p</Identifier>
                                    <Number value={4} />
                                </SubScript>
                            </Event>
                        </Process>
                        <Process id={1} target={processQ}>
                            <span>process Q</span>
                            <Event time={0}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={1} />
                                </SubScript>
                            </Event>
                            <Event time={10}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={2} />
                                </SubScript>
                            </Event>
                            <Event time={20} target={q3}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={3} />
                                </SubScript>
                            </Event>
                            <Event time={30}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={4} />
                                </SubScript>
                            </Event>
                            <Event time={40}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={5} />
                                </SubScript>
                            </Event>
                            <Event time={50}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={6} />
                                </SubScript>
                            </Event>
                            <Event time={60}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={7} />
                                </SubScript>
                            </Event>
                        </Process>
                        <Process id={2}>
                            <span>process R</span>
                            <Event time={0}>
                                <SubScript>
                                    <Identifier>r</Identifier>
                                    <Number value={1} />
                                </SubScript>
                            </Event>
                            <Event time={20}>
                                <SubScript>
                                    <Identifier>r</Identifier>
                                    <Number value={2} />
                                </SubScript>
                            </Event>
                            <Event time={40}>
                                <SubScript>
                                    <Identifier>r</Identifier>
                                    <Number value={3} />
                                </SubScript>
                            </Event>
                            <Event time={60} target={r4}>
                                <SubScript>
                                    <Identifier>r</Identifier>
                                    <Number value={4} />
                                </SubScript>
                            </Event>
                        </Process>
                    </SpaceTimeDiagram>
                    <figcaption>Figure 2</figcaption>
                </figure>
                <p>
                    We can consider the tick lines to be the time coordinate
                    lines of some Cartesian coordinate system on space-time.
                    We can redraw <Anchor id={ids.figures.second}>Figure 2</Anchor> to straighten these coordinate
                    lines, thus obtaining <Anchor id={ids.figures.third}>Figure 3</Anchor>. <Anchor id={ids.figures.third}>Figure 3</Anchor> is a valid
                    alternate way of representing the same system of events
                    as <Anchor id={ids.figures.second}>Figure 2</Anchor>. Without introducing the concept of physical
                    time into the system (which requires introducing physical
                    clocks), there is no way to decide which of these pictures
                    is a better representation.
                </p>
                <figure id={ids.figures.third} class="space-time">
                    <SpaceTimeDiagram path={examplePath}>
                        <Tick times={[5, 5, 5]} />
                        <Tick times={[15, 15, 15]} />
                        <Tick times={[25, 25, 25]} />
                        <Tick times={[35, 35, 35]} />
                        <Tick times={[45, 45, 45]} />
                        <Tick times={[55, 55, 55]} />
                        <Tick times={[65, 65, 65]} />
                        <Tick times={[75, 75, 75]} />

                        <Message start={[0, 0]} end={[1, 1]} />
                        <Message start={[1, 0]} end={[0, 1]} />
                        <Message start={[1, 4]} end={[0, 3]} />

                        <Message start={[1, 0]} end={[2, 3]} />
                        <Message start={[1, 3]} end={[2, 2]} />
                        <Message start={[2, 1]} end={[1, 6]} />

                        <Process id={0} target={processP}>
                            <span>process P</span>
                            <Event time={0} target={p1}>
                                <SubScript>
                                    <Identifier>p</Identifier>
                                    <Number value={1} />
                                </SubScript>
                            </Event>
                            <Event time={20}>
                                <SubScript>
                                    <Identifier>p</Identifier>
                                    <Number value={2} />
                                </SubScript>
                            </Event>
                            <Event time={30} target={p3} >
                                <SubScript>
                                    <Identifier>p</Identifier>
                                    <Number value={3} />
                                </SubScript>
                            </Event>
                            <Event time={70} target={p4} >
                                <SubScript>
                                    <Identifier>p</Identifier>
                                    <Number value={4} />
                                </SubScript>
                            </Event>
                        </Process>
                        <Process id={1} target={processQ}>
                            <span>process Q</span>
                            <Event time={0}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={1} />
                                </SubScript>
                            </Event>
                            <Event time={20}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={2} />
                                </SubScript>
                            </Event>
                            <Event time={40} target={q3}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={3} />
                                </SubScript>
                            </Event>
                            <Event time={50}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={4} />
                                </SubScript>
                            </Event>
                            <Event time={60}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={5} />
                                </SubScript>
                            </Event>
                            <Event time={70}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={6} />
                                </SubScript>
                            </Event>
                            <Event time={80}>
                                <SubScript>
                                    <Identifier>q</Identifier>
                                    <Number value={7} />
                                </SubScript>
                            </Event>
                        </Process>
                        <Process id={2}>
                            <span>process R</span>
                            <Event time={0}>
                                <SubScript>
                                    <Identifier>r</Identifier>
                                    <Number value={1} />
                                </SubScript>
                            </Event>
                            <Event time={30}>
                                <SubScript>
                                    <Identifier>r</Identifier>
                                    <Number value={2} />
                                </SubScript>
                            </Event>
                            <Event time={60}>
                                <SubScript>
                                    <Identifier>r</Identifier>
                                    <Number value={3} />
                                </SubScript>
                            </Event>
                            <Event time={80} target={r4}>
                                <SubScript>
                                    <Identifier>r</Identifier>
                                    <Number value={4} />
                                </SubScript>
                            </Event>
                        </Process>
                    </SpaceTimeDiagram>
                    <figcaption>Figure 3</figcaption>
                </figure>
                <p>
                    The reader may find it helpful to visualize a two-dimensional
                    spatial network of processes, which yields a
                    three-dimensional space-time diagram. Processes and
                    messages are still represented by lines, but tick lines
                    become two-dimensional surfaces.
                </p>
                <p>
                    Let us now assume that the processes are algorithms,
                    and the events represent certain actions during their
                    execution. We will show how to introduce clocks into the
                    processes which satisfy the <Anchor id={ids.clock_condition.root}>Clock Condition</Anchor>. Process <SubScript description="a process">
                        <Identifier>P</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript>'s
                    clock is represented by a register <SubScript description="the clock register for the process">
                        <Identifier>C</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript>, so that <Expression description="the logical timestamp of an event in the process">
                        <SubScript>
                            <Identifier>C</Identifier>
                            <Identifier>i</Identifier>
                        </SubScript>
                        <Operator>{codes.operators.angle.left}</Operator>
                        <Identifier description="an event">a</Identifier>
                        <Operator>{codes.operators.angle.right}</Operator>
                    </Expression> is the
                    value contained by <SubScript description="the clock register for the process">
                        <Identifier>C</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript> during the event <Identifier description="an event in the process">a</Identifier>. The value of <SubScript description="the clock register for the process">
                        <Identifier>C</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript> will change between events, so changing <SubScript description="the clock register for the process">
                        <Identifier>C</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript> does not itself constitute an event.
                </p>
                <p>
                    To guarantee that the system of clocks satisfies the <Anchor id={ids.clock_condition.root}>
                        Clock Condition
                    </Anchor>, we will insure that it satisfies conditions <Anchor id={ids.clock_condition.first}>
                        C1
                    </Anchor> and <Anchor id={ids.clock_condition.second}>
                        C2
                    </Anchor>. <Anchor id={ids.clock_condition.first}>
                        Condition C1
                    </Anchor> is simple; the processes need
                    only obey the following implementation rule:
                </p>
                <ol start={1}>
                    <li>
                        <p id={ids.implementation_rules.first}>
                            IR1. Each process <SubScript description="a process">
                                <Identifier>P</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript> increments <SubScript description="the clock register of the process">
                                <Identifier>C</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript> between any two successive events.
                        </p>
                    </li>
                </ol>
                <p>
                    To meet <Anchor id={ids.clock_condition.second}>
                        condition C2
                    </Anchor>, we require that each message <Identifier description="a message">m</Identifier> contain a <em>timestamp</em> <SubScript description="the timestamp of the message">
                        <Identifier>T</Identifier>
                        <Identifier description="a message">m</Identifier>
                    </SubScript> which equals
                    the time at which the message was sent. Upon receiving a message timestamped <SubScript description="the timestamp of the message">
                        <Identifier>T</Identifier>
                        <Identifier description="a message">m</Identifier>
                    </SubScript>, a
                    process must advance its clock to be later than <SubScript description="the timestamp of the message">
                        <Identifier>T</Identifier>
                        <Identifier description="a message">m</Identifier>
                    </SubScript>. More precisely, we have the following rule.
                </p>
                <ol start={2}>
                    <li id={ids.implementation_rules.second.root}>
                        <ol type="a">
                            <li id={ids.implementation_rules.second.a}>
                                <p>
                                    If event <Identifier description="an event">a</Identifier> is the sending of a message <Identifier description="a message">m</Identifier> by
                                    process <SubScript description="a process">
                                        <Identifier>P</Identifier>
                                        <Identifier>i</Identifier>
                                    </SubScript>, then the message <Identifier description="the message">m</Identifier> contains
                                    a timestamp <Expression description="the timestamp of the message equal to the logical timestamp of the process's clock register">
                                        <SubScript description="the timestamp of the message">
                                            <Identifier>T</Identifier>
                                            <Identifier description="the message">m</Identifier>
                                        </SubScript>
                                        <Operator>{codes.operators.equals}</Operator>
                                        <Expression description="the logical timestamp of the event in the process">
                                            <SubScript>
                                                <Identifier>C</Identifier>
                                                <Identifier>i</Identifier>
                                            </SubScript>
                                            <Operator>{codes.operators.angle.left}</Operator>
                                            <Identifier>a</Identifier>
                                            <Operator>{codes.operators.angle.right}</Operator>
                                        </Expression>
                                    </Expression>.
                                </p>
                            </li>
                            <li id={ids.implementation_rules.second.b}>
                                <p>
                                    Upon receiving a message <Identifier description="a message">m</Identifier>, process <SubScript description="the receiving process">
                                        <Identifier>P</Identifier>
                                        <Identifier>j</Identifier>
                                    </SubScript> sets <SubScript description="the clock register for the receiving process">
                                        <Identifier>C</Identifier>
                                        <Identifier>j</Identifier>
                                    </SubScript> greater
                                    than or equal to its present value and
                                    greater than <SubScript description="the timestamp of the received message">
                                        <Identifier>T</Identifier>
                                        <Identifier description="the received message">m</Identifier>
                                    </SubScript>.
                                </p>
                            </li>
                        </ol>
                    </li>
                </ol>
                <p>
                    In <Anchor id={ids.implementation_rules.second.b}>IR2(b)</Anchor> we consider the event
                    which represents the receipt of the message <Identifier description="a message">m</Identifier> to
                    occur after the setting of <SubScript description="the receiving process's clock register">
                        <Identifier>C</Identifier>
                        <Identifier>j</Identifier>
                    </SubScript>. (This is just a notational nuisance, and is irrelevant in any actual implementation.)
                    Obviously, <Anchor id={ids.implementation_rules.second.root}>IR2</Anchor> insures
                    that <Anchor id={ids.clock_condition.second}>
                        C2
                    </Anchor> is satisfied. Hence, the simple implementation rules <Anchor id={ids.implementation_rules.first}>
                        IR1
                    </Anchor> and <Anchor id={ids.implementation_rules.second.root}>
                        IR2
                    </Anchor> imply that the <Anchor id={ids.clock_condition.root}>
                        Clock Condition
                    </Anchor> is satisfied, so they guarantee a correct system of logical clocks.
                </p>
            </section>

            <section id={ids.sections.total_ordering}>
                <header>Ordering the Events Totally</header>

                <p>
                    We can use a system of clocks satisfying the <Anchor id={ids.clock_condition.root}>Clock Condition</Anchor> to place
                    a total ordering on the set of all system events. We simply order the events
                    by the times at which they occur. To break ties, we use any arbitrary total
                    ordering <Operator description="an arbitrary total ordering">{codes.operators.precedes}</Operator> of the processes. More precisely,
                    we define a relation <Operator description="totally happened before">{codes.operators.arrows.right.double}</Operator> as follows:
                    if <Identifier description="an event">a</Identifier> is an event in process <SubScript description="a process">
                        <Identifier>P</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript> and <Identifier description="another event">b</Identifier> is
                    an event in process <SubScript description="another process">
                        <Identifier>P</Identifier>
                        <Identifier>j</Identifier>
                    </SubScript>, then <Expression description="the event totally happened before another event">
                        <Identifier description="an event">a</Identifier>
                        <Operator description="totally happened before">{codes.operators.arrows.right.double}</Operator>
                        <Identifier description="another event">b</Identifier>
                    </Expression> if and only if either
                </p>
                <ol type="i">
                    <li>
                        <p>
                            <Expression description="the logical timestamp of the first event is less than the logical timestamp of the second event">
                                <Expression description="the logical timestamp of the first event">
                                    <SubScript>
                                        <Identifier>C</Identifier>
                                        <Identifier>i</Identifier>
                                    </SubScript>
                                    <Operator>{codes.operators.angle.left}</Operator>
                                    <Identifier description="the first event">a</Identifier>
                                    <Operator>{codes.operators.angle.right}</Operator>
                                </Expression>
                                <Operator>{codes.operators.less_than}</Operator>
                                <Expression description="the logical timestamp of the second event">
                                    <SubScript>
                                        <Identifier>C</Identifier>
                                        <Identifier>j</Identifier>
                                    </SubScript>
                                    <Operator>{codes.operators.angle.left}</Operator>
                                    <Identifier description="the second event">b</Identifier>
                                    <Operator>{codes.operators.angle.right}</Operator>
                                </Expression>
                            </Expression> or
                        </p>
                    </li>
                    <li>
                        <p>
                            <Expression description="the logical timestamps of the events are the same">
                                <Expression description="the logical timestamp of the first event">
                                    <SubScript>
                                        <Identifier>C</Identifier>
                                        <Identifier>i</Identifier>
                                    </SubScript>
                                    <Operator>{codes.operators.angle.left}</Operator>
                                    <Identifier>a</Identifier>
                                    <Operator>{codes.operators.angle.right}</Operator>
                                </Expression>
                                <Operator>{codes.operators.equals}</Operator>
                                <Expression description="the logical timestamp of the second event">
                                    <SubScript>
                                        <Identifier>C</Identifier>
                                        <Identifier>j</Identifier>
                                    </SubScript>
                                    <Operator>{codes.operators.angle.left}</Operator>
                                    <Identifier>b</Identifier>
                                    <Operator>{codes.operators.angle.right}</Operator>
                                </Expression>
                            </Expression> and <Expression description="the first process comes before the second process">
                                <SubScript description="the first process">
                                    <Identifier>P</Identifier>
                                    <Identifier>i</Identifier>
                                </SubScript>
                                <Operator description="totally ordered before">{codes.operators.precedes}</Operator>
                                <SubScript description="the second process">
                                    <Identifier>P</Identifier>
                                    <Identifier>j</Identifier>
                                </SubScript>
                            </Expression>.
                        </p>
                    </li>
                </ol>
                <p>
                    It is easy to see that this defines a total ordering,
                    and that the <Anchor id={ids.clock_condition.root}>Clock Condition</Anchor> implies that if <Expression description="an event happened before another event">
                        <Identifier description="an event">a</Identifier>
                        <Operator description="happened before">{codes.operators.arrows.right.single}</Operator>
                        <Identifier description="another event">b</Identifier>
                    </Expression> then <Expression description="the event totally happened before the other event">
                        <Identifier description="the event">a</Identifier>
                        <Operator description="totally happened event">{codes.operators.arrows.right.double}</Operator>
                        <Identifier description="the other event">b</Identifier>
                    </Expression>. In other words, the relation <Operator description="total-order happened before">{codes.operators.arrows.right.double}</Operator> is a
                    way of completing the "happened before" partial ordering to a total ordering. <Note portal={notes.ordering} />
                </p>
                <p>
                    The ordering <Operator description="total-order happened before relation">{codes.operators.arrows.right.double}</Operator> depends upon the system of clocks <SubScript>
                        <Identifier>C</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript>, and is not unique. Different choices of clocks which satisfy the <Anchor id={ids.clock_condition.root}>Clock Condition</Anchor> yield different
                    relations <Operator description="total-order happened before relation">{codes.operators.arrows.right.double}</Operator>.
                    Given any total ordering relation <Operator description="total-order happened before relation">{codes.operators.arrows.right.double}</Operator> which
                    extends <Operator description="happened before relation">{codes.operators.arrows.right.single}</Operator>, there is a
                    system of clocks satisfying the <Anchor id={ids.clock_condition.root}>Clock Condition</Anchor> which yields that relation.
                    It is only the partial ordering <Operator description="happened before relation">{codes.operators.arrows.right.single}</Operator> which is
                    uniquely determined by the system of events.
                </p>
                <p>
                    Being able to totally order the events can be very
                    useful in implementing a distributed system. In fact, the
                    reason for implementing a correct system of logical
                    clocks is to obtain such a total ordering. We will illustrate
                    the use of this total ordering of events by solving the
                    following version of the mutual exclusion problem. Consider
                    a system composed of a fixed collection of processes
                    which share a single resource. Only one process can use
                    the resource at a time, so the processes must synchronize
                    themselves to avoid conflict. We wish to find an algorithm
                    for granting the resource to a process which satisfies
                    the following three conditions:
                </p>
                <ol type="I" id={ids.mutual_exclusion.conditions.all}>
                    <li id={ids.mutual_exclusion.conditions.first}>
                        <p>
                            A process which
                            has been granted the resource must release it before it
                            can be granted to another process.
                        </p>
                    </li>
                    <li id={ids.mutual_exclusion.conditions.second}>
                        <p>
                            Different requests
                            for the resource must be granted in the order in which
                            they are made.
                        </p>
                    </li>
                    <li id={ids.mutual_exclusion.conditions.third}>
                        <p>
                            If every process which is granted the
                            resource eventually releases it, then every request is
                            eventually granted.
                        </p>
                    </li>
                </ol>
                <p>
                    We assume that the resource is initially granted to exactly one process.
                </p>
                <p>
                    These are perfectly natural requirements. They precisely
                    specify what it means for a solution to
                    be correct. <Note portal={notes.eventually} /> Observe how the
                    conditions involve the ordering of
                    events. <Anchor id={ids.mutual_exclusion.conditions.second}>Condition II</Anchor> says nothing about which of two
                    concurrently issued requests should be granted first.
                </p>
                <p>
                    It is important to realize that this is a nontrivial problem.
                    Using a central scheduling process which grants requests in the order
                    they are received will not work, unless additional assumptions are made.
                    To see this, let <SubScript description="the scheduling process">
                        <Identifier>P</Identifier>
                        <Number value={0} />
                    </SubScript> be the scheduling
                    process. Suppose <SubScript description="the first process">
                        <Identifier>P</Identifier>
                        <Number value={1} />
                    </SubScript> sends a request
                    to <SubScript description="the scheduling process">
                        <Identifier>P</Identifier>
                        <Number value={0} />
                    </SubScript> and then sends
                    a message to <SubScript description="the second process">
                        <Identifier>P</Identifier>
                        <Number value={2} />
                    </SubScript>. Upon receiving the
                    latter message, <SubScript description="the second process">
                        <Identifier>P</Identifier>
                        <Number value={2} />
                    </SubScript> sends a request to <SubScript description="the scheduling process">
                        <Identifier>P</Identifier>
                        <Number value={0} />
                    </SubScript>. It
                    is possible for <SubScript description="the second process">
                        <Identifier>P</Identifier>
                        <Number value={2} />
                    </SubScript>'s request to reach <SubScript description="the scheduling process">
                        <Identifier>P</Identifier>
                        <Number value={0} />
                    </SubScript> before <SubScript description="the first process">
                        <Identifier>P</Identifier>
                        <Number value={1} />
                    </SubScript>'s request does. <Anchor id={ids.mutual_exclusion.conditions.second}>
                        Condition II
                    </Anchor> is then violated if <SubScript description="the second process">
                        <Identifier>P</Identifier>
                        <Number value={2} />
                    </SubScript>'s request is granted first.
                </p>
                <p>
                    To solve the problem, we implement a system of clocks with rules <Anchor id={ids.implementation_rules.first}>
                        IR1
                    </Anchor> and <Anchor id={ids.implementation_rules.second.root}>
                        IR2
                    </Anchor>, and use them to define a total ordering <Operator description="total-order happened before">{codes.operators.arrows.right.double}</Operator> of all events.
                    This provides a total ordering of all request and release operations. With this ordering, finding a solution
                    becomes a straightforward exercise. It just involves making sure that each process learns about all
                    other processes' operations.
                </p>
                <p>
                    To simplify the problem, we make some assumptions. They are not essential, but
                    they are introduced to avoid distracting implementation details. We assume first of all
                    that any two processes <SubScript description="a process">
                        <Identifier>P</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript> and <SubScript description="another process">
                        <Identifier>P</Identifier>
                        <Identifier>j</Identifier>
                    </SubScript>, the messages
                    sent from <SubScript description="the process">
                        <Identifier>P</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript> to <SubScript description="another process">
                        <Identifier>P</Identifier>
                        <Identifier>j</Identifier>
                    </SubScript> are received
                    in the same order as they are sent. Moreover, we assume that every message is eventually received.
                    (These assumptions can be avoided by introducing message numbers and message acknowledgement protocols.)
                    We also assume that a process can send messages directly to every other process.
                </p>
                <p>
                    Each process maintains its own <em>request queue</em> which is never seen by any
                    other process. We assume that the request queues initially contain the single message <Expression>
                        <SubScript>
                            <Identifier>T</Identifier>
                            <Number value={0} />
                        </SubScript>
                        <Operator>:</Operator>
                        <SubScript>
                            <Identifier>P</Identifier>
                            <Number value={0} />
                        </SubScript>
                        <mtext> requests resource</mtext>
                    </Expression>, where <SubScript>
                        <Identifier>P</Identifier>
                        <Number value={0} />
                    </SubScript> is the process initially granted
                    the resource and <SubScript>
                        <Identifier>T</Identifier>
                        <Number value={0} />
                    </SubScript> is less than the initial value of any clock.
                </p>
                <p>
                    The algorithm is then defined by the following five rules. For convenience, the actions defined
                    by each rule are assumed to form a single event.
                </p>
                <ol>
                    <li>
                        <p>
                            To request the resource, process <SubScript>
                                <Identifier>P</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript> sends
                            the message <Expression>
                                <SubScript>
                                    <Identifier>T</Identifier>
                                    <Identifier>m</Identifier>
                                </SubScript>
                                <Operator>:</Operator>
                                <SubScript>
                                    <Identifier>P</Identifier>
                                    <Identifier>i</Identifier>
                                </SubScript>
                                <mtext>requests resource</mtext>
                            </Expression> to every other process, and puts that message on its request queue, where <SubScript>
                                <Identifier>T</Identifier>
                                <Identifier>m</Identifier>
                            </SubScript> is the timestamp of the message.
                        </p>
                    </li>
                    <li id={ids.mutual_exclusion.rules.second}>
                        <p>
                            When process <SubScript>
                                <Identifier>P</Identifier>
                                <Identifier>j</Identifier>
                            </SubScript> receives the message <Expression>
                                <SubScript>
                                    <Identifier>T</Identifier>
                                    <Identifier>m</Identifier>
                                </SubScript>
                                <Operator>:</Operator>
                                <SubScript>
                                    <Identifier>P</Identifier>
                                    <Identifier>i</Identifier>
                                </SubScript>
                                <mtext>requests resource</mtext>
                            </Expression>, it places it on its request queue
                            and sends a (timestamped) acknowledgement message to <SubScript>
                                <Identifier>P</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript>. <Note portal={notes.acknowledgement} />
                        </p>
                    </li>
                    <li id={ids.mutual_exclusion.rules.third}>
                        <p>
                            To release the resource, process <SubScript>
                                <Identifier>P</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript> removes
                            any <Expression>
                                <SubScript>
                                    <Identifier>T</Identifier>
                                    <Identifier>m</Identifier>
                                </SubScript>
                                <Operator>:</Operator>
                                <SubScript>
                                    <Identifier>P</Identifier>
                                    <Identifier>i</Identifier>
                                </SubScript>
                                <mtext>requests resource</mtext>
                            </Expression> message from its request queue and sends a (timestamped) <Expression>
                                <SubScript>
                                    <Identifier>P</Identifier>
                                    <Identifier>i</Identifier>
                                </SubScript>
                                <mtext>releases resource</mtext>
                            </Expression> message to every other process.
                        </p>
                    </li>
                    <li id={ids.mutual_exclusion.rules.fourth}>
                        <p>
                            When process <SubScript>
                                <Identifier>P</Identifier>
                                <Identifier>j</Identifier>
                            </SubScript> receives a <Expression>
                                <SubScript>
                                    <Identifier>P</Identifier>
                                    <Identifier>i</Identifier>
                                </SubScript>
                                <mtext>releases resource</mtext>
                            </Expression> message,
                            it removes any <Expression>
                                <SubScript>
                                    <Identifier>T</Identifier>
                                    <Identifier>m</Identifier>
                                </SubScript>
                                <Operator>:</Operator>
                                <SubScript>
                                    <Identifier>P</Identifier>
                                    <Identifier>i</Identifier>
                                </SubScript>
                                <mtext>requests resource</mtext>
                            </Expression> message from its queue.
                        </p>
                    </li>
                    <li id={ids.mutual_exclusion.rules.fifth.root}>
                        <p>
                            Process <SubScript>
                                <Identifier>P</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript> is granted the resource when the following
                            two conditions are satisfied:
                        </p>
                        <ol type="i">
                            <li id={ids.mutual_exclusion.rules.fifth.first}>
                                <p>
                                    There is a <Expression>
                                        <SubScript>
                                            <Identifier>T</Identifier>
                                            <Identifier>m</Identifier>
                                        </SubScript>
                                        <Operator>:</Operator>
                                        <SubScript>
                                            <Identifier>P</Identifier>
                                            <Identifier>i</Identifier>
                                        </SubScript>
                                        <mtext>requests resource</mtext>
                                    </Expression> message in its request queue which is ordered before any other request
                                    in its queue by the relation <Operator>{codes.operators.arrows.right.double}</Operator>.
                                    (To define the relation "<Operator>{codes.operators.arrows.right.double}</Operator>" for messages,
                                    we identify a message with the event of sending it.)
                                </p>
                            </li>
                            <li id={ids.mutual_exclusion.rules.fifth.second}>
                                <p>
                                    <SubScript>
                                        <Identifier>P</Identifier>
                                        <Identifier>i</Identifier>
                                    </SubScript> has received a message from every other process timestamped
                                    later than <SubScript>
                                        <Identifier>T</Identifier>
                                        <Identifier>m</Identifier>
                                    </SubScript>. <Note portal={notes.receive_message} />
                                </p>
                            </li>
                        </ol>
                    </li>
                </ol>
                <p>
                    Note that <Anchor id={ids.mutual_exclusion.rules.fifth.first}>
                        conditions (i)
                    </Anchor> and <Anchor id={ids.mutual_exclusion.rules.fifth.second}>
                        (ii)
                    </Anchor> of rule 5 are tested locally by <SubScript>
                        <Identifier>P</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript>.
                </p>
                <p>
                    It is easy to verify that the algorithm defined by these rules satisfies <Anchor id={ids.mutual_exclusion.conditions.all}>
                        conditions I-III
                    </Anchor>.
                    First of all, observe that <Anchor id={ids.mutual_exclusion.rules.fifth.second}>
                        condition (ii) of rule 5
                    </Anchor>, together with the assumption that messages
                    are received in order, guarantees that <SubScript>
                        <Identifier>P</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript> has learned about all requests which preceded its current request. Since <Anchor id={ids.mutual_exclusion.rules.third}>
                        rules 3
                    </Anchor> and <Anchor id={ids.mutual_exclusion.rules.fourth}>
                        4
                    </Anchor> are the only ones which delete messages from the request queue, it is then easy to see that <Anchor id={ids.mutual_exclusion.conditions.first}>
                        condition I
                    </Anchor> holds. <Anchor id={ids.mutual_exclusion.conditions.second}>
                        Condition II
                    </Anchor> follows from the fact that the total ordering <Operator>{codes.operators.arrows.right.double}</Operator> extends the
                    partial ordering <Operator>{codes.operators.arrows.right.single}</Operator>. <Anchor id={ids.mutual_exclusion.rules.second}>
                        Rule 2
                    </Anchor> guarantees that after <SubScript>
                        <Identifier>P</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript> requests the resource, <Anchor id={ids.mutual_exclusion.rules.fifth.second}>
                        condition (ii) of rule 5
                    </Anchor> will eventually hold. <Anchor id={ids.mutual_exclusion.rules.third}>
                        Rules 3
                    </Anchor> and <Anchor id={ids.mutual_exclusion.rules.fourth}>
                        4
                    </Anchor> imply that if each process which is granted the resource eventually releases it, then <Anchor id={ids.mutual_exclusion.rules.fifth.first}>
                        condition (i) of rule 5
                    </Anchor> will eventually hold, thus providing <Anchor id={ids.mutual_exclusion.conditions.third}>
                        condition III
                    </Anchor>.
                </p>
                <p>
                    This is a distributed algorithm. Each process independently
                    follows these rules, and there is no central
                    synchronizing process or central storage. This approach
                    can be generalized to implement any desired synchronization
                    for such a distributed multiprocess system. The
                    synchronization is specified in terms of a State Machine,
                    consisting of a set <Identifier>C</Identifier> of possible commands,
                    a set <Identifier>S</Identifier> of possible states, and
                    a function <Expression>
                        <Identifier>e</Identifier>
                        <Operator>:</Operator>
                        <Identifier>C</Identifier>
                        <Operator>{codes.operators.cross}</Operator>
                        <Identifier>S</Identifier>
                        <Operator>{codes.operators.arrows.right.single}</Operator>
                        <Identifier>S</Identifier>
                    </Expression>. The relation <Expression>
                        <Identifier>e</Identifier>
                        <Operator>(</Operator>
                        <Identifier>C</Identifier>
                        <Operator>,</Operator>
                        <Identifier>S</Identifier>
                        <Operator>)</Operator>
                        <Operator>{codes.operators.equals}</Operator>
                        <Identifier>S</Identifier>
                        <Operator>{codes.operators.prime}</Operator>
                    </Expression> means that executing the command <Identifier>C</Identifier> with
                    the machine in state <Identifier>S</Identifier> causes the machine state
                    to change to <Expression>
                        <Identifier>S</Identifier>
                        <Operator>prime</Operator>
                    </Expression>. In our example, the set <Identifier>C</Identifier> consists
                    of all the commands <Expression>
                        <SubScript>
                            <Identifier>P</Identifier>
                            <Identifier>i</Identifier>
                        </SubScript>
                        <mtext>requests resource</mtext>
                    </Expression> and <Expression>
                        <SubScript>
                            <Identifier>P</Identifier>
                            <Identifier>i</Identifier>
                        </SubScript>
                        <mtext>releases resource</mtext>
                    </Expression>, and the state consists of a queue of waiting <em>request</em> commands,
                    where the request at the head of the queue
                    is the currently granted one. Executing a <em>request</em> command
                    adds the request to the tail of the queue, and
                    executing a <em>release</em> command removes a command from
                    the queue. <Note portal={notes.release} />
                </p>
                <p>
                    Each process independently simulates the execution
                    of the State Machine, using the commands issued by all
                    the processes. Synchronization is achieved because all
                    processes order the commands according to their timestamps
                    (using the relation <Operator>{codes.operators.arrows.right.double}</Operator>),
                    so each process uses the same sequence of commands. A
                    process can execute a command timestamped <Identifier>T</Identifier> when
                    it has learned of all commands issued by all other processes
                    with timestamps less than or equal to <Identifier>T</Identifier>.
                    The precise algorithm is straight-forward,
                    and we will not bother to describe it.
                </p>
                <p>
                    This method allows one to implement any desired
                    form of multiprocess synchronization in a distributed
                    system. However, the resulting algorithm requires the
                    active participation of all the processes. A process must
                    know all the commands issued by other processes, so
                    that the failure of a single process will make it impossible
                    for any other process to execute State Machine commands,
                    thereby halting the system.
                </p>
                <p>
                    The problem of failure is a difficult one, and it is
                    beyond the scope of this paper to discuss it in any detail.
                    We will just observe that the entire concept of failure is
                    only meaningful in the context of physical time. Without
                    physical time, there is no way to distinguish a failed
                    process from one which is just pausing between events.
                    A user can tell that a system has "crashed" only because
                    he has been waiting too long for a response. A method
                    which works despite the failure of individual processes
                    or communication lines is described in <ReferenceAnchor href={ids.references.lamport_implementation}>[3]</ReferenceAnchor>.
                </p>
            </section>

            <section id={ids.sections.anomalous_behavior}>
                <header>Anomalous Behavior</header>

                <p>
                    Our resource scheduling algorithm ordered the requests according to the total ordering <Operator description="total-order happened before">{codes.operators.arrows.right.double}</Operator>.
                    This permits the following type of "anomalous behavior." Consider a nationwide system of interconnected computers.
                    Suppose a person issues a request <Identifier description="a request on computer A">{codes.letters.capital.a.monospace}</Identifier> on a computer A, and then
                    telephones a friend in another city to have him issue a request <Identifier description="a request on computer B">{codes.letters.capital.b.monospace}</Identifier> on a different
                    computer B. It is quite possible for request <Identifier description="the request from computer B">{codes.letters.capital.b.monospace}</Identifier> to receive
                    a lower timestamp and be ordered before request <Identifier description="the request from computer A">{codes.letters.capital.a.monospace}</Identifier>. This can happen because the system
                    has no way of knowing that <Identifier description="the request from computer A">{codes.letters.capital.a.monospace}</Identifier> actually
                    preceded <Identifier description="the request from computer B">{codes.letters.capital.b.monospace}</Identifier>, since that
                    precedence information is based on messages external to the system.
                </p>
                <p>
                    Let us examine the source of the problem more closely. Let <Identifier description="the set of all system events">{codes.greek.zeta}</Identifier> be the
                    set of all system events. Let us introduce a set of events
                    which contains the events in <Identifier description="the set of all system events">{codes.greek.zeta}</Identifier> together
                    with all other relevant external events, such as the phone calls in our example. Let <Operator>{codes.operators.arrows.right.thick}</Operator> denote
                    the "happened before" relation for <Identifier description="the set of all system events">{codes.greek.zeta}</Identifier>. In our example, we had <Expression>
                        <Identifier>{codes.letters.capital.a.monospace}</Identifier>
                        <Operator>{codes.operators.arrows.right.thick}</Operator>
                        <Identifier>{codes.letters.capital.b.monospace}</Identifier>
                    </Expression>, but <Expression>
                        <Identifier>{codes.letters.capital.a.monospace}</Identifier>
                        <Operator>{codes.operators.arrows.right.not_single}</Operator>
                        <Identifier>{codes.letters.capital.b.monospace}</Identifier>
                    </Expression>. It is obvious that no algorithm based entirely upon events in <Identifier description="the set of all system events">{codes.greek.zeta}</Identifier>,
                    and which does not relate those events in any way with the other
                    events in <Identifier description="the set of all system events">{codes.greek.zeta}</Identifier>,
                    can guarantee that request <Identifier>{codes.letters.capital.a.monospace}</Identifier> is ordered before request <Identifier>{codes.letters.capital.b.monospace}</Identifier>.
                </p>
                <p>
                    There are two possible ways to avoid such anomalous behavior. The first way is to explicitly
                    introduce into the system the necessary information about the ordering <Operator>{codes.operators.arrows.right.thick}</Operator>.
                    In our example, the person issuing request <Identifier description="the request from computer A">{codes.letters.capital.a.monospace}</Identifier> could
                    receive the timestamp <SubScript description="the timestamp of the request from computer A">
                        <Identifier>T</Identifier>
                        <Identifier description="the request from computer A">{codes.letters.capital.a.monospace}</Identifier>
                    </SubScript> of that request from the system. When issuing request <Identifier description="the request from computer B">{codes.letters.capital.b.monospace}</Identifier>, his friend
                    could specify that <Identifier description="the request from computer B">{codes.letters.capital.b.monospace}</Identifier> be given a timestamp later than <SubScript description="the timestamp of the request from computer A">
                        <Identifier>T</Identifier>
                        <Identifier description="the request from computer A">{codes.letters.capital.a.monospace}</Identifier>
                    </SubScript>. This gives the user the responsibility for avoiding anomalous behavior.
                </p>
                <p>
                    The second approach is to construct a system of clocks which satisfies the following condition.
                </p>
                <p id={ids.strong_clock_condition}>
                    <em>Strong Clock Condition.</em> For any events <Identifier description="an event">a</Identifier>, <Identifier description="another event">b</Identifier> in <Identifier description="the set of all system events">{codes.greek.zeta}</Identifier>:
                    if <Expression>
                        <Identifier description="the first event">a</Identifier>
                        <Operator>{codes.operators.arrows.right.thick}</Operator>
                        <Identifier description="the second event">b</Identifier>
                    </Expression> then <Expression description="the logical timestamp of the first event is less than the logical timestamp of the second event">
                        <Expression description="the logical timestamp of the first event">
                            <Identifier>C</Identifier>
                            <Operator>{codes.operators.angle.left}</Operator>
                            <Identifier>a</Identifier>
                            <Operator>{codes.operators.angle.right}</Operator>
                        </Expression>
                        <Operator>{codes.operators.less_than}</Operator>
                        <Expression description="the logical timestamp of the second event">
                            <Identifier>C</Identifier>
                            <Operator>{codes.operators.angle.left}</Operator>
                            <Identifier>b</Identifier>
                            <Operator>{codes.operators.angle.right}</Operator>
                        </Expression>
                    </Expression>.
                </p>
                <p>
                    This is stronger than the ordinary <Anchor id={ids.clock_condition.root}>Clock Condition</Anchor> because <Operator>{codes.operators.arrows.right.thick}</Operator> is
                    a stronger relation than <Operator description="happened before">{codes.operators.arrows.right.single}</Operator>. It is not in general satisfied by our logical clocks.
                </p>
                <p>
                    Let us identify <Identifier>{codes.greek.zeta}</Identifier> with
                    some set of "real" events in physical space-time, and let <Operator>{codes.operators.arrows.right.thick}</Operator> be
                    the partial ordering of events defined by special relativity. One of the
                    mysteries of the universe is that it is possible to construct a system of physical
                    clocks which, running quite independently of one another, will satisfy the <Anchor id={ids.strong_clock_condition}>Strong Clock Condition</Anchor>.
                    We can therefore use physical clocks to eliminate anomalous behavior. We now turn
                    our attention to such clocks.
                </p>
            </section>

            <section id={ids.sections.physical_clocks}>
                <header>Physical Clocks</header>

                <p>
                    Let us introduce a physical time coordinate into our space-time picture, and let <Expression>
                        <SubScript description="a clock function">
                            <Identifier>C</Identifier>
                            <Identifier>i</Identifier>
                        </SubScript>
                        <Operator>{codes.operators.paren.left}</Operator>
                        <Identifier description="physical time">t</Identifier>
                        <Operator>{codes.operators.paren.right}</Operator>
                    </Expression> denote the reading of the clock <SubScript description="a clock">
                        <Identifier>C</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript> at physical time <Identifier description="physical time">t</Identifier>. <Note portal={notes.time} /> For mathematical
                    convenience, we assume that the clocks run continuously rather than in discrete "ticks."
                    (A discrete clock can be thought of as a continuous one in which there is an error of up to <Fraction>
                        <Number value={1} />
                        <Number value={2} />
                    </Fraction> "tick" in reading it.) More precisely, we assume that <Expression>
                        <SubScript>
                            <Identifier>C</Identifier>
                            <Identifier>i</Identifier>
                        </SubScript>
                        <Operator>{codes.operators.paren.left}</Operator>
                        <Identifier description="physical time">t</Identifier>
                        <Operator>{codes.operators.paren.right}</Operator>
                    </Expression> is a continuous, differentiable function of <Identifier description="physical time">t</Identifier> except
                    for isolated jump discontinuities where the clock is reset. Then <Fraction>
                        <Expression>
                            <Operator>d</Operator>
                            <SubScript>
                                <Identifier>C</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript>
                            <Operator>{codes.operators.paren.left}</Operator>
                            <Identifier description="physical time">t</Identifier>
                            <Operator>{codes.operators.paren.right}</Operator>
                        </Expression>
                        <Operator>dt</Operator>
                    </Fraction> represents the rate at which the clock is running at time <Identifier>t</Identifier>.
                </p>
                <p>
                    In order for the clock <SubScript description="a clock">
                        <Identifier>C</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript> to be a true physical clock, it must run at approximately the correct rate. That is,
                    we must have <Expression description="the rate at which the clock is running is approximately equal to 1 tick per second">
                        <Fraction>
                            <Expression>
                                <Operator>d</Operator>
                                <SubScript>
                                    <Identifier>C</Identifier>
                                    <Identifier>i</Identifier>
                                </SubScript>
                                <Operator>(</Operator>
                                <Identifier>t</Identifier>
                                <Operator>)</Operator>
                            </Expression>
                            <Operator>dt</Operator>
                        </Fraction>
                        <Operator>{codes.operators.approx}</Operator>
                        <Number value={1} />
                    </Expression> for all <Identifier description="physical time">t</Identifier>. More precisely, we will assume that the following condition is satisfied:
                </p>
                <p id={ids.physical_clock_condition.first}>
                    <strong>PC1.</strong> There exists a constant <Expression>
                        <Identifier description="maximum clock rate error">{codes.greek.kappa}</Identifier>
                        <Operator>{codes.operators.much_less_than}</Operator>
                        <Number value={1} />
                    </Expression> such that for all <Identifier>i</Identifier>: <Expression description="the clock rate error is less than the maximum clock rate error">
                        <Expression>
                            <Operator>|</Operator>
                            <Expression>
                                <Fraction description="the clock rate">
                                    <Expression>
                                        <Operator>d</Operator>
                                        <SubScript>
                                            <Identifier>C</Identifier>
                                            <Identifier>i</Identifier>
                                        </SubScript>
                                        <Operator>(</Operator>
                                        <Identifier>t</Identifier>
                                        <Operator>)</Operator>
                                    </Expression>
                                    <Operator>dt</Operator>
                                </Fraction>
                                <Operator>-</Operator>
                                <Number value={1}></Number>
                            </Expression>
                            <Operator>|</Operator>
                        </Expression>
                        <Operator>{codes.operators.less_than}</Operator>
                        <Identifier>{codes.greek.kappa}</Identifier>
                    </Expression>.
                </p>
                <p>
                    For typical crystal controlled clocks, <Expression>
                        <Identifier description="maximum clock speed error">{codes.greek.kappa}</Identifier>
                        <Operator>{codes.operators.less_than_equal}</Operator>
                        <SuperScript>
                            <Number value={10} />
                            <Number value={-6} />
                        </SuperScript>
                    </Expression>.
                </p>
                <p>
                    It is not enough for the clocks individually to run at approximately the correct rate. They must
                    be synchronized so that <Expression description="one clock is approximately the same as another clock">
                        <Expression description="one clock">
                            <SubScript>
                                <Identifier>C</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript>
                            <Operator>(</Operator>
                            <Identifier description="physical time">t</Identifier>
                            <Operator>)</Operator>
                        </Expression>
                        <Operator>{codes.operators.approx}</Operator>
                        <Expression description="another clock">
                            <SubScript>
                                <Identifier>C</Identifier>
                                <Identifier>j</Identifier>
                            </SubScript>
                            <Operator>(</Operator>
                            <Identifier description="physical time">t</Identifier>
                            <Operator>)</Operator>
                        </Expression>
                    </Expression> for all <Identifier>i</Identifier>, <Identifier>j</Identifier>, and <Identifier>t</Identifier>.
                    More precisely, there must be a sufficiently small constant <Identifier description="maximum clock drift">{codes.greek.epsilon}</Identifier> so
                    that the following condition holds:
                </p>
                <p id={ids.physical_clock_condition.second}>
                    <strong>PC2.</strong> For all <Identifier>i</Identifier>, <Identifier>j</Identifier>: <Expression>
                        <Expression description="the difference between two clocks' time">
                            <Operator>|</Operator>
                            <Expression description="one clock's time">
                                <SubScript>
                                    <Identifier>C</Identifier>
                                    <Identifier>i</Identifier>
                                </SubScript>
                                <Operator>(</Operator>
                                <Identifier>t</Identifier>
                                <Operator>)</Operator>
                            </Expression>
                            <Operator>-</Operator>
                            <Expression description="another clock's time">
                                <SubScript>
                                    <Identifier>C</Identifier>
                                    <Identifier>j</Identifier>
                                </SubScript>
                                <Operator>(</Operator>
                                <Identifier>t</Identifier>
                                <Operator>)</Operator>
                            </Expression>
                            <Operator>|</Operator>
                        </Expression>
                        <Operator>{codes.operators.less_than}</Operator>
                        <Identifier description="maximum clock drift">{codes.greek.epsilon}</Identifier>
                    </Expression>.
                </p>
                <p>
                    If we consider vertical distance in <Anchor id={ids.figures.second}>Figure 2</Anchor> to represent physical time, then <Anchor id={ids.physical_clock_condition.second}>PC2</Anchor> states
                    that the variation in height of a single tick line is less than <Identifier description="maximum clock drift">{codes.greek.epsilon}</Identifier>.
                </p>
                <p>
                    Since two different clocks will never run at exactly
                    the same rate, they will tend to drift further and further
                    apart. We must therefore devise an algorithm to insure
                    that <Anchor id={ids.physical_clock_condition.second}>PC2</Anchor> always holds. First, however, let us examine
                    how small <Identifier description="maximum clock speed error">{codes.greek.kappa}</Identifier> and <Identifier description="maximum clock drift">{codes.greek.epsilon}</Identifier> must
                    be to prevent anomalous behavior.
                    We must insure that the system <Identifier>{codes.greek.zeta}</Identifier> of relevant physical
                    events satisfies the <Anchor id={ids.strong_clock_condition}>Strong Clock Condition</Anchor>. We assume
                    that our clocks satisfy the ordinary <Anchor id={ids.clock_condition.root}>Clock Condition</Anchor>, so
                    we need only require that the <Anchor id={ids.strong_clock_condition}>Strong Clock Condition</Anchor> holds
                    when <Identifier description="an event">a</Identifier> and <Identifier description="another event">b</Identifier> are events
                    in <Identifier>{codes.greek.zeta}</Identifier> with <Expression description="the event did not happen before the other event">
                        <Identifier description="the event">a</Identifier>
                        <Operator description="did not happen before">{codes.operators.arrows.right.not_single}</Operator>
                        <Identifier description="another event">b</Identifier>
                    </Expression>.
                    Hence, we need only consider events occurring in different processes.
                </p>
                <p>
                    Let <Identifier>{codes.greek.mu}</Identifier> be a number such that if event <Identifier>a</Identifier> occurs
                    at physical time <Identifier>t</Identifier> and event <Identifier>b</Identifier> in another
                    process satisfies <Expression>
                        <Identifier>a</Identifier>
                        <Operator>{codes.operators.arrows.right.thick}</Operator>
                        <Identifier>b</Identifier>
                    </Expression>, then <Identifier>b</Identifier> occurs later than physical time <Expression>
                        <Identifier>t</Identifier>
                        <Operator>+</Operator>
                        <Identifier>{codes.greek.mu}</Identifier>
                    </Expression>. In other words, <Identifier>{codes.greek.mu}</Identifier> is less
                    than the shortest transmission time for interprocess messages. We
                    can always choose <Identifier>{codes.greek.mu}</Identifier> equal to the
                    shortest distance between processes divided by the speed of light.
                    However, depending upon how messages in <Identifier>{codes.greek.zeta}</Identifier> are
                    transmitted, <Identifier>{codes.greek.mu}</Identifier> could be significantly larger.
                </p>
                <p>
                    To avoid anomalous behavior, we must make sure that for
                    any <Identifier>i</Identifier>, <Identifier>j</Identifier>,
                    and <Identifier>t</Identifier>: <Expression>
                        <Expression>
                            <SubScript>
                                <Identifier>C</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript>
                            <Operator>(</Operator>
                            <Identifier>t</Identifier>
                            <Operator>+</Operator>
                            <Identifier>{codes.greek.mu}</Identifier>
                            <Operator>)</Operator>
                        </Expression>
                        <Operator>-</Operator>
                        <Expression>
                            <SubScript>
                                <Identifier>C</Identifier>
                                <Identifier>j</Identifier>
                            </SubScript>
                            <Operator>(</Operator>
                            <Identifier>t</Identifier>
                            <Operator>)</Operator>
                        </Expression>
                        <Operator>{codes.operators.greater_than}</Operator>
                        <Number value={0} />
                    </Expression>. Combining this with <Anchor id={ids.physical_clock_condition.first}>PC1</Anchor> and <Anchor id={ids.physical_clock_condition.second}>2</Anchor> allows us to relate the required
                    smallness of <Identifier>{codes.greek.kappa}</Identifier> and <Identifier>{codes.greek.epsilon}</Identifier> to
                    the value of <Identifier>{codes.greek.mu}</Identifier> as follows. We assume that when a clock is reset, it is
                    always set forward and never back. (Setting it back would cause <Anchor id={ids.clock_condition.first}>
                        C1
                    </Anchor> to be violated.) <Anchor id={ids.physical_clock_condition.first}>PC1</Anchor> then
                    implies that <Expression>
                        <Expression>
                            <SubScript>
                                <Identifier>C</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript>
                            <Operator>(</Operator>
                            <Identifier>t</Identifier>
                            <Operator>+</Operator>
                            <Identifier>{codes.greek.mu}</Identifier>
                            <Operator>)</Operator>
                        </Expression>
                        <Operator>-</Operator>
                        <Expression>
                            <SubScript>
                                <Identifier>C</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript>
                            <Operator>(</Operator>
                            <Identifier>t</Identifier>
                            <Operator>)</Operator>
                        </Expression>
                        <Operator>{codes.operators.greater_than}</Operator>
                        <Expression>
                            <Operator>(</Operator>
                            <Number value={1} />
                            <Operator>-</Operator>
                            <Identifier>{codes.greek.kappa}</Identifier>
                            <Operator>)</Operator>
                            <Identifier>{codes.greek.mu}</Identifier>
                        </Expression>
                    </Expression>. Using <Anchor id={ids.physical_clock_condition.second}>PC2</Anchor>, it is then easy to deduce that <Expression>
                        <Expression>
                            <SubScript>
                                <Identifier>C</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript>
                            <Operator>(</Operator>
                            <Identifier>t</Identifier>
                            <Operator>+</Operator>
                            <Identifier>{codes.greek.mu}</Identifier>
                            <Operator>)</Operator>
                        </Expression>
                        <Operator>-</Operator>
                        <Expression>
                            <SubScript>
                                <Identifier>C</Identifier>
                                <Identifier>j</Identifier>
                            </SubScript>
                            <Operator>(</Operator>
                            <Identifier>t</Identifier>
                            <Operator>)</Operator>
                        </Expression>
                        <Operator>{codes.operators.greater_than}</Operator>
                        <Number value={0} />
                    </Expression> if the following inequality holds: <Expression display="block">
                        <Fraction>
                            <Identifier>{codes.greek.epsilon}</Identifier>
                            <Expression>
                                <Operator>(</Operator>
                                <Number value={1} />
                                <Operator>-</Operator>
                                <Identifier>{codes.greek.kappa}</Identifier>
                                <Operator>)</Operator>
                            </Expression>
                        </Fraction>
                        <Operator>{codes.operators.less_than_equal}</Operator>
                        <Identifier>{codes.greek.mu}</Identifier>
                    </Expression>
                    This inequality together with <Anchor id={ids.physical_clock_condition.first}>PC1</Anchor> and <Anchor id={ids.physical_clock_condition.second}>PC2</Anchor> implies that anomalous behavior is impossible.
                </p>
                <p>
                    We now describe our algorithm for insuring that <Anchor id={ids.physical_clock_condition.second}>PC2</Anchor> holds.
                    Let <Identifier description="a message">m</Identifier> be a message which is sent at physical time <Identifier description="physical time">t</Identifier> and
                    received at time <Expression>
                        <Identifier description="physical time">t</Identifier>
                        <Operator>{codes.operators.prime}</Operator>
                    </Expression>. We define <Expression>
                        <SubScript description="the total delay of the message">
                            <Identifier>v</Identifier>
                            <Identifier>m</Identifier>
                        </SubScript>
                        <Operator>=</Operator>
                        <Expression description="received time">
                            <Identifier>t</Identifier>
                            <Operator>{codes.operators.prime}</Operator>
                        </Expression>
                        <Operator>-</Operator>
                        <Identifier description="sent time">t</Identifier>
                    </Expression> to be the <em>total delay</em> of the message <Identifier>m</Identifier>.
                    This delay will, of course, not be known to the process which receives <Identifier>m</Identifier>. However,
                    we assume that the receiving process knows some <em>minimum delay</em> <Expression>
                        <SubScript description="minimum delay of a message">
                            <Identifier>{codes.greek.mu}</Identifier>
                            <Identifier>m</Identifier>
                        </SubScript>
                        <Operator>{codes.operators.greater_than_equal}</Operator>
                        <Number value={0} />
                    </Expression> such that <Expression description="the minimum delay of a message is less than the total delay of the message">
                        <SubScript description="minimum delay of a message">
                            <Identifier>{codes.greek.mu}</Identifier>
                            <Identifier>m</Identifier>
                        </SubScript>
                        <Operator>{codes.operators.less_than_equal}</Operator>
                        <SubScript description="total delay of a message">
                            <Identifier>v</Identifier>
                            <Identifier>m</Identifier>
                        </SubScript>
                    </Expression>. We call <Expression>
                        <SubScript description="the unpredictable delay of a message">
                            <Identifier>{codes.greek.xi}</Identifier>
                            <Identifier>m</Identifier>
                        </SubScript>
                        <Operator>=</Operator>
                        <SubScript description="the total delay of a message">
                            <Identifier>v</Identifier>
                            <Identifier>m</Identifier>
                        </SubScript>
                        <Operator>-</Operator>
                        <SubScript description="the minimum delay of a message">
                            <Identifier>{codes.greek.mu}</Identifier>
                            <Identifier>m</Identifier>
                        </SubScript>
                    </Expression> the <em>unpredictable delay</em> of the message.
                </p>
                <p>
                    We now specialize rules <Anchor id={ids.implementation_rules.first}>IR1</Anchor> and <Anchor id={ids.implementation_rules.second.root}>2</Anchor> for our physical clocks as follows:
                </p>
                <ol>
                    <li id={ids.physical_implementation_rules.first}>
                        <p>
                            <strong>IR1'</strong>: For each <Identifier>i</Identifier>,
                            if <SubScript description="a process">
                                <Identifier>P</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript> does not receive a message at physical time <Identifier description="physical time">t</Identifier>,
                            then <SubScript description="the process's clock">
                                <Identifier>C</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript> is differentiable at <Identifier description="physical time">t</Identifier> and <Expression description="the clock speed is positive">
                                <Fraction description="the clock speed">
                                    <Expression>
                                        <Operator>d</Operator>
                                        <SubScript>
                                            <Identifier>C</Identifier>
                                            <Identifier>i</Identifier>
                                        </SubScript>
                                        <Operator>(</Operator>
                                        <Identifier>t</Identifier>
                                        <Operator>)</Operator>
                                    </Expression>
                                    <Operator>dt</Operator>
                                </Fraction>
                                <Operator>{codes.operators.greater_than}</Operator>
                                <Number value={0} />
                            </Expression>.
                        </p>
                    </li>
                    <li id={ids.physical_implementation_rules.second}>
                        <p>
                            <strong>IR2'</strong>:
                        </p>
                        <ol type="a">
                            <li>
                                <p>
                                    If <SubScript description="a process">
                                        <Identifier>P</Identifier>
                                        <Identifier>i</Identifier>
                                    </SubScript> sends a message <Identifier description="a message">m</Identifier> at
                                    physical time <Identifier description="physical sent time">t</Identifier>, then <Identifier description="the message">m</Identifier> contains
                                    a timestamp <Expression>
                                        <SubScript description="the message's timestamp">
                                            <Identifier>T</Identifier>
                                            <Identifier>m</Identifier>
                                        </SubScript>
                                        <Operator>=</Operator>
                                        <Expression description="the clock's value at sent time">
                                            <SubScript>
                                                <Identifier>C</Identifier>
                                                <Identifier>i</Identifier>
                                            </SubScript>
                                            <Operator>(</Operator>
                                            <Identifier>t</Identifier>
                                            <Operator>)</Operator>
                                        </Expression>
                                    </Expression>.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Upon receiving a message <Identifier description="a message">m</Identifier> at
                                    time <Expression description="physical received time">
                                        <Identifier>t</Identifier>
                                        <Operator>{codes.operators.prime}</Operator>
                                    </Expression>, process <SubScript description="the receiving process">
                                        <Identifier>P</Identifier>
                                        <Identifier>j</Identifier>
                                    </SubScript> sets <Expression description="the receiving process's clock at the received time">
                                        <SubScript>
                                            <Identifier>C</Identifier>
                                            <Identifier>j</Identifier>
                                        </SubScript>
                                        <Operator>(</Operator>
                                        <Expression description="physical received time">
                                            <Identifier>t</Identifier>
                                            <Operator>{codes.operators.prime}</Operator>
                                        </Expression>
                                        <Operator>)</Operator>
                                    </Expression> equal to maximum <Expression>
                                        <Operator>(</Operator>
                                        <Expression>
                                            <SubScript>
                                                <Identifier>C</Identifier>
                                                <Identifier>j</Identifier>
                                            </SubScript>
                                            <Operator>(</Operator>
                                            <Identifier>t</Identifier>
                                            <Operator>{codes.operators.prime}</Operator>
                                            <Operator>-</Operator>
                                            <Number value={0} />
                                            <Operator>)</Operator>
                                        </Expression>
                                        <Operator>,</Operator>
                                        <Expression>
                                            <SubScript description="the message's timestamp">
                                                <Identifier>T</Identifier>
                                                <Identifier>m</Identifier>
                                            </SubScript>
                                            <Operator>+</Operator>
                                            <SubScript description="the message's minimum delay">
                                                <Identifier>{codes.greek.mu}</Identifier>
                                                <Identifier>m</Identifier>
                                            </SubScript>
                                        </Expression>
                                        <Operator>)</Operator>
                                    </Expression>. <Note portal={notes.limit} />
                                </p>
                            </li>
                        </ol>
                    </li>
                </ol>
                <p>
                    Although the rules are formally specified in terms of
                    the physical time parameter, a process only needs to
                    know its own clock reading and the timestamps of messages
                    it receives. For mathematical convenience, we are
                    assuming that each event occurs at a precise instant of
                    physical time, and different events in the same process
                    occur at different times. These rules are then specializations
                    of rules <Anchor id={ids.implementation_rules.first}>IR1</Anchor> and <Anchor id={ids.implementation_rules.second.root}>IR2</Anchor>, so our system of clocks
                    satisfies the <Anchor id={ids.clock_condition.root}>
                        Clock Condition
                    </Anchor>. The fact that real events
                    have a finite duration causes no difficulty in implementing
                    the algorithm. The only real concern in the implementation
                    is making sure that the discrete clock ticks are
                    frequent enough so <Anchor id={ids.clock_condition.first}>
                        C1
                    </Anchor> is maintained.
                </p>
                <p>
                    We now show that this clock synchronizing algorithm can be used to satisfy <Anchor id={ids.physical_clock_condition.second}>condition PC2</Anchor>.
                    We assume that the system of processes is described by a
                    directed graph in which an arc from process <SubScript description="a process">
                        <Identifier>P</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript> to process <SubScript description="a neighbour process">
                        <Identifier>P</Identifier>
                        <Identifier>j</Identifier>
                    </SubScript> represents a communication line over which messages are sent
                    directly from <SubScript description="the process">
                        <Identifier>P</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript> to <SubScript description="the neighbour process">
                        <Identifier>P</Identifier>
                        <Identifier>j</Identifier>
                    </SubScript>. We say that a message is sent over this arc
                    every <Identifier description="neighbour period">{codes.greek.tau}</Identifier> seconds if
                    for any <Identifier description="physical time">t</Identifier>, <SubScript description="the process">
                        <Identifier>P</Identifier>
                        <Identifier>i</Identifier>
                    </SubScript> sends at least one message to <SubScript description="the neighbour process">
                        <Identifier>P</Identifier>
                        <Identifier>j</Identifier>
                    </SubScript> between physical times <Identifier description="physical time">t</Identifier> and <Expression>
                        <Identifier description="physical time">t</Identifier>
                        <Operator>+</Operator>
                        <Identifier description="neighbour period">{codes.greek.tau}</Identifier>
                    </Expression>. The <em>diameter</em> of the directed graph is the smallest
                    number <Identifier description="diameter">d</Identifier> such that for any pair of distinct processes <SubScript description="the start process">
                        <Identifier>P</Identifier>
                        <Identifier>j</Identifier>
                    </SubScript>, <SubScript description="the target process">
                        <Identifier>P</Identifier>
                        <Identifier>k</Identifier>
                    </SubScript>, there is a path from <SubScript description="the start process">
                        <Identifier>P</Identifier>
                        <Identifier>j</Identifier>
                    </SubScript> to <SubScript description="the target process">
                        <Identifier>P</Identifier>
                        <Identifier>k</Identifier>
                    </SubScript> having at most <Identifier description="diameter">d</Identifier> arcs.
                </p>
                <p>
                    In addition to establishing <Anchor id={ids.physical_clock_condition.second}>PC2</Anchor>, the following theorem bounds the length of time
                    it can take the clocks to become synchronized when the system is first started.
                </p>
                <section>
                    <p>
                        <strong>THEOREM</strong>. Assume a strongly connected graph of processes
                        with diameter <Identifier description="diameter">d</Identifier> which always obeys rules <Anchor id={ids.physical_implementation_rules.first}>IR1'</Anchor> and <Anchor id={ids.physical_implementation_rules.second}>IR2'</Anchor>. Assume that for
                        any message <Identifier description="a message">m</Identifier>, <Expression>
                            <SubScript description="the message's minimum delay">
                                <Identifier>{codes.greek.mu}</Identifier>
                                <Identifier>m</Identifier>
                            </SubScript>
                            <Operator>{codes.operators.less_than_equal}</Operator>
                            <Identifier description="maximum message delay">{codes.greek.mu}</Identifier>
                        </Expression> for some constant <Identifier description="maximum message delay">{codes.greek.mu}</Identifier>,
                        and that for all <Expression>
                            <Identifier description="physical time">t</Identifier>
                            <Operator>{codes.operators.greater_than_equal}</Operator>
                            <SubScript description="initial physical time?">
                                <Identifier>t</Identifier>
                                <Number value={0} />
                            </SubScript>
                        </Expression>:
                    </p>
                    <ol type="a">
                        <li>
                            <p>PC1 holds.</p>
                        </li>
                        <li>
                            <p>
                                There are constants <Identifier description="neighbour period">{codes.greek.tau}</Identifier> and <Identifier description="maximum unpredictable delay">{codes.greek.xi}</Identifier> such
                                that every <Identifier description="neighbour period">{codes.greek.tau}</Identifier> seconds a message with
                                an unpredictable delay less than <Identifier description="maximum unpredictable delay">{codes.greek.xi}</Identifier> is sent over every arc.
                            </p>
                        </li>
                    </ol>
                    <p>
                        Then PC2 is satisfied with <Expression>
                            <Identifier description="maximum clock drift">{codes.greek.epsilon}</Identifier>
                            <Operator>{codes.operators.approx}</Operator>
                            <Identifier description="diameter">d</Identifier>
                            <Operator>(</Operator>
                            <Number value={2} />
                            <Identifier description="maximum clock speed error">{codes.greek.kappa}</Identifier>
                            <Identifier description="neighbour period">{codes.greek.tau}</Identifier>
                            <Operator>+</Operator>
                            <Identifier description="maximum unpredictable delay">{codes.greek.xi}</Identifier>
                            <Operator>)</Operator>
                        </Expression> for all <Expression>
                            <Identifier description="physical time">t</Identifier>
                            <Operator>{codes.operators.greater_than_equal}</Operator>
                            <SubScript description="initial physical time">
                                <Identifier>t</Identifier>
                                <Number value={0} />
                            </SubScript>
                            <Operator>+</Operator>
                            <Identifier description="neighbour period">{codes.greek.tau}</Identifier>
                            <Identifier description="diameter">d</Identifier>
                        </Expression>, where the approximations assume <Expression>
                            <Identifier description="maximum message delay">{codes.greek.mu}</Identifier>
                            <Operator>+</Operator>
                            <Identifier description="maximum unpredictable delay">{codes.greek.xi}</Identifier>
                            <Operator>{codes.operators.much_less_than}</Operator>
                            <Identifier description="neighbour period">{codes.greek.tau}</Identifier>
                        </Expression>.
                    </p>
                </section>
                <p>
                    The proof of this theorem is surprisingly difficult, and is given in the Appendix.
                    There has been a great deal of work done on the problem of synchronizing physical
                    clocks. We refer the reader to <ReferenceAnchor href={ids.references.system_time}>[4]</ReferenceAnchor> for an introduction to the subject.
                    The methods describe in the literature are useful for estimating the message delays <SubScript description="minimum message delay">
                        <Identifier>{codes.greek.mu}</Identifier>
                        <Identifier>m</Identifier>
                    </SubScript> and for adjusting the clock frequencies <Fraction description="a clock's frequency">
                        <Expression>
                            <Operator>d</Operator>
                            <SubScript>
                                <Identifier>C</Identifier>
                                <Identifier>i</Identifier>
                            </SubScript>
                        </Expression>
                        <Operator>dt</Operator>
                    </Fraction> (for clocks which permit such an adjustment). However, the
                    requirement that clocks are never set backwards seems to distinguish
                    our situation from ones previously studied, and we believe this theorem
                    to be a new result.
                </p>
            </section>

            <section id={ids.sections.conclusion}>
                <header>Conclusion</header>

                <p>
                    We have seen that the concept of "happening before"
                    defines an invariant partial ordering of the events in a
                    distributed multiprocess system. We described an algorithm
                    for extending that partial ordering to a somewhat
                    arbitrary total ordering, and showed how this total ordering
                    can be used to solve a simple synchronization
                    problem. A future paper will show how this approach
                    can be extended to solve any synchronization problem.
                </p>
                <p>
                    The total ordering defined by the algorithm is somewhat
                    arbitrary. It can produce anomalous behavior if it
                    disagrees with the ordering perceived by the system's
                    users. This can be prevented by the use of properly
                    synchronized physical clocks. Our theorem showed how
                    closely the clocks can be synchronized.
                </p>
                <p>
                    In a distributed system, it is important to realize that
                    the order in which events occur is only a partial ordering.
                    We believe that this idea is useful in understanding any
                    multiprocess system. It should help one to understand
                    the basic problems of multiprocessing independently of
                    the mechanisms used to solve them.
                </p>
            </section>

            <section id={ids.sections.appendix}>
                <header>Appendix</header>

                <p>See the paper for details.</p>

                <p>
                    <em>Acknowledgement.</em> The use of timestamps to order operations,
                    and the concept of anomalous behavior are due to Paul Johnson and
                    Robert Thomas.
                </p>
            </section>

            <section id={ids.sections.notes}>
                <header>Notes</header>

                <ol>
                    <li id={ids.notes.event}>
                        <notes.event.Entrance />
                    </li>
                    <li id={ids.notes.message}>
                        <notes.message.Entrance />
                    </li>
                    <li id={ids.notes.ordering}>
                        <notes.ordering.Entrance />
                    </li>
                    <li id={ids.notes.eventually}>
                        <notes.ordering.Entrance />
                    </li>
                    <li id={ids.notes.acknowledgement}>
                        <notes.acknowledgement.Entrance />
                    </li>
                    <li id={ids.notes.receive_message}>
                        <notes.receive_message.Entrance />
                    </li>
                    <li id={ids.notes.release}>
                        <notes.release.Entrance />
                    </li>
                    <li id={ids.notes.time}>
                        <notes.time.Entrance />
                    </li>
                    <li id={ids.notes.limit}>
                        <notes.limit.Entrance />
                    </li>
                </ol>
            </section>

            <section id={ids.sections.references}>
                <header>References</header>

                <ol class="reference">
                    <li id={ids.references.relativity}>
                        <section class="reference">
                            <span class="name">Schwartz, J.T.</span>
                            <span class="title">Relativity in Illustrations</span>
                            <span class="publisher">New York U. Press, New York</span>
                            <span class="year">1962</span>
                        </section>
                    </li>
                    <li id={ids.references.space_time}>
                        <section class="reference">
                            <span class="name">Taylor, E.F.</span>
                            <span class="name">Wheeler, J.A.</span>
                            <span class="title">Space-Time Physics</span>
                            <span class="publisher">W.H. Freeman, San Francisco</span>
                            <span class="year">1966</span>
                        </section>
                    </li>
                    <li id={ids.references.lamport_implementation}>
                        <section class="reference">
                            <span class="name">Lamport, L.</span>
                            <span class="title">The implementation of reliable distributed multiprocess systems</span>
                            <span class="publisher">To appear in Computer Networks</span>
                        </section>
                    </li>
                    <li id={ids.references.system_time}>
                        <section class="reference">
                            <span class="name">Ellingson, C.</span>
                            <span class="name">Kulpinski, R.J.</span>
                            <span class="title">Dissemination of system-time</span>
                            <span class="publisher">IEEE Trans. Comm</span>
                            <span>Com-23, 5 (May 1973), 605-624</span>
                        </section>
                    </li>
                </ol>
            </section>
        </article>
    )
}