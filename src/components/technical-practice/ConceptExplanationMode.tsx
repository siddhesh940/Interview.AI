"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { VoiceInputButton } from '@/components/ui/VoiceInputButton';
import { useTechPrep } from '@/contexts/TechPrepContext';
import { SAMPLE_CONCEPTUAL_QUESTIONS } from '@/data/technical-practice-data';
import { TechnicalDomain } from '@/types/technical-practice';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    BookOpen,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Clock,
    GraduationCap,
    Lightbulb,
    RotateCcw,
    Send,
    Star,
    Target,
    TrendingUp,
    Zap
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

export interface SessionResultData {
  scores: number[];
  topics: string[];
  timeSpent: number;
  questionsAttempted: number;
  questions: { topic: string; score: number }[];
}

interface ConceptExplanationModeProps {
  domain: string;
  onComplete: (sessionData: SessionResultData) => void;
}

interface Evaluation {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  missingPoints: string[];
}

// Preparation guidance data for each topic
const PREPARATION_GUIDES: Record<string, {
  preparationTips: string[];
  studyResources: string[];
  practiceSteps: string[];
}> = {
  'Sorting': {
    preparationTips: [
      'Start by understanding the divide-and-conquer paradigm thoroughly',
      'Practice tracing through sorting algorithms with small arrays on paper',
      'Compare Quick Sort vs Merge Sort — know when to use which',
      'Memorize time complexities: best, average, worst for each sorting algo',
      'Understand in-place vs stable sorting differences'
    ],
    studyResources: [
      'Visualize sorting at visualgo.net/sorting',
      'Practice sorting problems on LeetCode (Sort Array, Merge Intervals)',
      'Watch Abdul Bari\'s sorting playlist on YouTube',
      'Read Chapter 7-8 of "Introduction to Algorithms" (CLRS)'
    ],
    practiceSteps: [
      'Step 1: Write Quick Sort from scratch without looking at code',
      'Step 2: Explain the partitioning process to someone in simple words',
      'Step 3: Analyze what happens with already sorted input (worst case)',
      'Step 4: Implement randomized pivot selection to avoid worst case',
      'Step 5: Compare with Merge Sort — explain trade-offs'
    ]
  },
  'Trees': {
    preparationTips: [
      'Master BST insertion, deletion, and search operations',
      'Understand tree traversals: inorder, preorder, postorder, level-order',
      'Practice drawing trees and tracing operations by hand',
      'Know the difference between balanced and unbalanced BSTs',
      'Study AVL trees and Red-Black trees for balanced BST concepts'
    ],
    studyResources: [
      'Practice tree problems on LeetCode (Validate BST, Lowest Common Ancestor)',
      'Visualize BST operations at visualgo.net/bst',
      'Watch Jenny\'s lectures on Trees for clear explanations',
      'Read Chapter 12 of CLRS for BST fundamentals'
    ],
    practiceSteps: [
      'Step 1: Implement BST insert and search from scratch',
      'Step 2: Practice all 4 tree traversals with examples',
      'Step 3: Solve "Validate BST" and "Height of BST" problems',
      'Step 4: Explain BST properties clearly — left < root < right',
      'Step 5: Compare BST vs Hash Table for search operations'
    ]
  },
  'Dynamic Programming': {
    preparationTips: [
      'Understand the two key properties: overlapping subproblems & optimal substructure',
      'Learn both top-down (memoization) and bottom-up (tabulation) approaches',
      'Start with classic problems: Fibonacci, Coin Change, Knapsack',
      'Practice identifying if a problem can use DP (look for "min/max/count ways")',
      'Draw the recursion tree to see overlapping subproblems'
    ],
    studyResources: [
      'Striver\'s DP playlist on YouTube (complete 50+ problems)',
      'Practice DP problems on LeetCode (start with "Easy" tag)',
      'Read "Dynamic Programming for Coding Interviews" book',
      'Neetcode.io DP roadmap for structured practice'
    ],
    practiceSteps: [
      'Step 1: Solve Fibonacci using recursion, then memoization, then tabulation',
      'Step 2: Explain the difference between memoization and tabulation clearly',
      'Step 3: Solve Coin Change and 0/1 Knapsack problems',
      'Step 4: Practice explaining your DP approach step-by-step',
      'Step 5: Time yourself — aim to identify DP pattern in under 5 minutes'
    ]
  },
  'Database Normalization': {
    preparationTips: [
      'Memorize all normal forms: 1NF, 2NF, 3NF, BCNF with examples',
      'Understand functional dependencies and candidate keys',
      'Practice normalizing sample tables step by step',
      'Know when denormalization is acceptable (performance vs design)',
      'Relate normalization to real-world database design scenarios'
    ],
    studyResources: [
      'Gate Smashers Normalization playlist on YouTube',
      'Practice on db-fiddle.com with sample schemas',
      'Read Navathe Database textbook Chapter on Normalization',
      'HackerRank SQL practice for applied database skills'
    ],
    practiceSteps: [
      'Step 1: Take a sample unnormalized table and convert to 1NF',
      'Step 2: Identify partial dependencies and convert to 2NF',
      'Step 3: Remove transitive dependencies for 3NF',
      'Step 4: Practice explaining each normal form with a real example',
      'Step 5: Design a small database schema and normalize it completely'
    ]
  },
  'ACID Properties': {
    preparationTips: [
      'Remember: Atomicity, Consistency, Isolation, Durability — explain each with examples',
      'Understand transaction states: active, committed, aborted',
      'Know isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable',
      'Study real scenarios: bank transfers, e-commerce orders',
      'Understand the relationship between ACID and CAP theorem'
    ],
    studyResources: [
      'Hussein Nasser\'s database engineering videos on YouTube',
      'Practice transaction scenarios on PostgreSQL/MySQL',
      'Read "Designing Data-Intensive Applications" Chapter 7',
      'CMU Database Course (Andy Pavlo) — free online lectures'
    ],
    practiceSteps: [
      'Step 1: Explain each ACID property with a bank transfer example',
      'Step 2: Describe what happens if each property is violated',
      'Step 3: Compare isolation levels and their trade-offs',
      'Step 4: Explain how databases implement durability (WAL, checkpoints)',
      'Step 5: Practice answering "What are ACID properties?" in under 2 minutes'
    ]
  },
  'Process Management': {
    preparationTips: [
      'Clearly differentiate between process and thread with examples',
      'Understand PCB (Process Control Block) and context switching',
      'Know process states: new, ready, running, waiting, terminated',
      'Study IPC mechanisms: pipes, shared memory, message queues',
      'Understand multithreading benefits and challenges (race conditions, deadlocks)'
    ],
    studyResources: [
      'Neso Academy OS playlist on YouTube',
      'Practice OS concepts on GeeksforGeeks',
      'Read Galvin OS textbook Chapter 3-4',
      'Operating Systems: Three Easy Pieces (free online book)'
    ],
    practiceSteps: [
      'Step 1: Draw the process state diagram and explain transitions',
      'Step 2: Explain process vs thread with real-world analogy',
      'Step 3: Describe context switching step by step',
      'Step 4: Explain multithreading with a web server example',
      'Step 5: Practice: "Why threads share memory but processes don\'t?"'
    ]
  },
  'Deadlocks': {
    preparationTips: [
      'Memorize 4 necessary conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait',
      'Understand prevention vs avoidance vs detection',
      'Study Banker\'s Algorithm for deadlock avoidance',
      'Know Resource Allocation Graph (RAG) for detection',
      'Practice with real examples: dining philosophers, traffic deadlock'
    ],
    studyResources: [
      'Gate Smashers Deadlock playlist on YouTube',
      'Practice Banker\'s Algorithm problems manually',
      'Read Galvin OS textbook Chapter 7',
      'GeeksforGeeks deadlock practice problems'
    ],
    practiceSteps: [
      'Step 1: Explain all 4 conditions with examples',
      'Step 2: Solve a Banker\'s Algorithm problem manually',
      'Step 3: Draw a Resource Allocation Graph and detect deadlock',
      'Step 4: Explain how each prevention method breaks which condition',
      'Step 5: Describe the Dining Philosophers problem and solutions'
    ]
  },
  'Polymorphism': {
    preparationTips: [
      'Know compile-time (method overloading) vs runtime (method overriding) polymorphism',
      'Understand virtual functions and vtable mechanism',
      'Practice with code examples in Java/C++',
      'Relate polymorphism to real-world scenarios (shapes, animals)',
      'Know the role of abstract classes and interfaces'
    ],
    studyResources: [
      'Java Brains OOP playlist on YouTube',
      'Practice OOP problems on HackerRank',
      'Read "Head First Design Patterns" for practical OOP',
      'Refactoring Guru website for design patterns with polymorphism'
    ],
    practiceSteps: [
      'Step 1: Write code for method overloading (compile-time)',
      'Step 2: Write code for method overriding with virtual functions (runtime)',
      'Step 3: Explain the Shape example: base class with draw() method',
      'Step 4: Explain how vtable works internally for dynamic dispatch',
      'Step 5: Compare polymorphism in Java vs C++ vs Python'
    ]
  },
  'SOLID Principles': {
    preparationTips: [
      'Remember each letter: S-Single Responsibility, O-Open/Closed, L-Liskov, I-Interface Segregation, D-Dependency Inversion',
      'Prepare a code example for each principle',
      'Focus on explaining violations first, then how SOLID fixes them',
      'Know real-world applications in framework design',
      'Relate SOLID to clean architecture and maintainability'
    ],
    studyResources: [
      'Uncle Bob\'s SOLID talks on YouTube',
      'Refactoring Guru — SOLID with examples',
      'Practice refactoring code to follow SOLID on exercism.io',
      'Read "Clean Architecture" by Robert C. Martin'
    ],
    practiceSteps: [
      'Step 1: Explain SRP — write a class that violates it, then fix it',
      'Step 2: Show Open/Closed with a payment processor example',
      'Step 3: Demonstrate Liskov with Rectangle-Square problem',
      'Step 4: Explain Interface Segregation with a printer example',
      'Step 5: Show Dependency Inversion with repository pattern'
    ]
  },
  'OSI Model': {
    preparationTips: [
      'Memorize all 7 layers in order: Physical, Data Link, Network, Transport, Session, Presentation, Application',
      'Know protocols at each layer (HTTP, TCP, IP, Ethernet, etc.)',
      'Use mnemonics: "Please Do Not Throw Sausage Pizza Away"',
      'Understand data encapsulation at each layer',
      'Compare OSI vs TCP/IP model'
    ],
    studyResources: [
      'PowerCert Animated Videos on YouTube (OSI Model)',
      'Cisco Networking Academy free courses',
      'Read Kurose & Ross Computer Networking textbook',
      'Practice on Wireshark to see protocols in action'
    ],
    practiceSteps: [
      'Step 1: List all 7 layers with their functions',
      'Step 2: Name 2-3 protocols at each layer',
      'Step 3: Explain what happens when you type a URL — trace through layers',
      'Step 4: Compare OSI vs TCP/IP model differences',
      'Step 5: Explain data encapsulation: data → segment → packet → frame → bits'
    ]
  },
  'Closures': {
    preparationTips: [
      'Understand lexical scoping — functions remember their creation environment',
      'Know how closures capture variables by reference (not value)',
      'Practice common patterns: module pattern, data privacy, currying',
      'Understand closures in event handlers and callbacks',
      'Know the classic loop closure problem and how to fix it'
    ],
    studyResources: [
      'MDN Web Docs — Closures deep dive',
      'JavaScript.info closures chapter',
      'Watch Akshay Saini\'s Namaste JavaScript (closures episode)',
      'Practice closure problems on freeCodeCamp'
    ],
    practiceSteps: [
      'Step 1: Write a counter function using closures',
      'Step 2: Explain how a closure remembers variables after outer function returns',
      'Step 3: Show the module pattern for data privacy',
      'Step 4: Solve the loop closure problem (var vs let in loops)',
      'Step 5: Implement a function factory using closures'
    ]
  },
  'Event Loop': {
    preparationTips: [
      'Understand call stack, Web APIs, callback queue, and microtask queue',
      'Know the difference between microtasks (Promises) and macrotasks (setTimeout)',
      'Practice predicting output of async code snippets',
      'Understand why JavaScript is single-threaded but non-blocking',
      'Study async/await as syntactic sugar over Promises'
    ],
    studyResources: [
      'Philip Roberts "What the heck is the event loop?" talk (JSConf)',
      'JavaScript Visualizer 9000 tool for interactive learning',
      'Akshay Saini Namaste JavaScript — event loop episode',
      'MDN docs on concurrency model and event loop'
    ],
    practiceSteps: [
      'Step 1: Draw the event loop diagram: stack, queue, Web APIs',
      'Step 2: Trace execution of: console.log, setTimeout, Promise in correct order',
      'Step 3: Explain why microtasks run before macrotasks',
      'Step 4: Predict output of nested setTimeout + Promise code',
      'Step 5: Explain how async/await works with the event loop'
    ]
  },
  'Decorators': {
    preparationTips: [
      'Understand decorators as higher-order functions that wrap other functions',
      'Know the @decorator syntax is syntactic sugar for func = decorator(func)',
      'Practice writing decorators for logging, timing, authentication',
      'Understand functools.wraps and why it\'s important',
      'Know class-based decorators and decorators with arguments'
    ],
    studyResources: [
      'Real Python — Primer on Python Decorators',
      'Corey Schafer Python Decorators YouTube video',
      'Practice on HackerRank Python challenges',
      'Read "Fluent Python" Chapter on Decorators'
    ],
    practiceSteps: [
      'Step 1: Write a simple logging decorator from scratch',
      'Step 2: Add @functools.wraps and explain why it preserves metadata',
      'Step 3: Create a timing decorator to measure function execution',
      'Step 4: Write a decorator that accepts arguments',
      'Step 5: Implement an access control decorator (login_required)'
    ]
  },
  'JVM Architecture': {
    preparationTips: [
      'Know the 3 main components: Class Loader, Runtime Data Areas, Execution Engine',
      'Understand memory areas: Heap, Stack, Method Area, PC Register',
      'Know how JIT compiler optimizes bytecode to native code',
      'Understand garbage collection basics (Mark & Sweep, Generational GC)',
      'Know the difference between JDK, JRE, and JVM'
    ],
    studyResources: [
      'Telusko JVM Architecture video on YouTube',
      'Oracle JVM specification documentation',
      'Practice Java memory management concepts on Baeldung',
      'Read "Java Performance" by Scott Oaks'
    ],
    practiceSteps: [
      'Step 1: Draw the JVM architecture diagram from memory',
      'Step 2: Explain the class loading process: load, link, initialize',
      'Step 3: Describe Heap vs Stack memory with a code example',
      'Step 4: Explain how JIT compiler improves performance',
      'Step 5: Describe garbage collection process and why it matters'
    ]
  }
};

export default function ConceptExplanationMode({ domain, onComplete }: ConceptExplanationModeProps) {
  useTechPrep();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [sessionScores, setSessionScores] = useState<number[]>([]);
  const [showIdealAnswer, setShowIdealAnswer] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);

  // Get questions for this domain
  const questions = SAMPLE_CONCEPTUAL_QUESTIONS.filter(
    q => q.domain === (domain as TechnicalDomain)
  );
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = Math.min(questions.length, 5);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Smart word-level matching: checks if user covered the concept behind a key point
  const getKeyPointScore = (keyPoint: string, answer: string): number => {
    const stopWords = new Set(['a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been',
      'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
      'may', 'might', 'shall', 'can', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by',
      'from', 'as', 'into', 'through', 'during', 'before', 'after', 'and', 'but', 'or',
      'not', 'no', 'it', 'its', 'this', 'that', 'these', 'those', 'than', 'when', 'which',
      'what', 'how', 'each', 'every', 'all', 'any', 'both', 'more', 'most', 'other', 'some',
      'such', 'only', 'also', 'very', 'just', 'so', 'there', 'then', 'here', 'where']);

    // Synonym/related word mappings for technical concepts
    const synonyms: Record<string, string[]> = {
      'divide': ['split', 'break', 'partition', 'separate', 'decompose', 'divides', 'divided', 'dividing'],
      'conquer': ['solve', 'combine', 'merge', 'conquers', 'conquered'],
      'pivot': ['pivot', 'reference', 'chosen element', 'selected element'],
      'partitioning': ['partition', 'rearrange', 'rearranging', 'splitting', 'dividing', 'separate', 'separating'],
      'average': ['avg', 'expected', 'typical', 'normally', 'generally', 'amortized'],
      'worst': ['bad', 'maximum', 'extreme', 'degenerate', 'pathological'],
      'node': ['vertex', 'element', 'item', 'nodes'],
      'tree': ['tree', 'hierarchy', 'trees', 'hierarchical'],
      'structure': ['data structure', 'form', 'organization', 'structures'],
      'subtree': ['sub-tree', 'child', 'children', 'branch', 'left side', 'right side', 'left part', 'right part'],
      'smaller': ['less', 'lesser', 'lower', 'minimum', 'min', 'small', 'below'],
      'larger': ['greater', 'bigger', 'higher', 'maximum', 'max', 'more', 'above', 'big'],
      'contains': ['has', 'holds', 'stores', 'contain', 'keep', 'keeps', 'having'],
      'search': ['find', 'lookup', 'look up', 'query', 'searching', 'finding'],
      'insert': ['add', 'put', 'push', 'adding', 'inserting', 'insertion'],
      'delete': ['remove', 'erase', 'pop', 'deleting', 'deletion', 'removing'],
      'operations': ['operation', 'methods', 'functions', 'procedures', 'ops'],
      'duplicate': ['repeated', 'same', 'copy', 'identical', 'duplicates', 'repetition'],
      'skewed': ['unbalanced', 'degenerate', 'linear', 'one-sided', 'lopsided'],
      'overlapping': ['repeated', 'same', 'shared', 'common', 'overlap', 'redundant'],
      'subproblems': ['sub-problems', 'smaller problems', 'subproblem', 'sub problem'],
      'optimal': ['best', 'optimum', 'most efficient', 'ideal', 'optimized'],
      'substructure': ['sub-structure', 'sub structure', 'structure'],
      'memoization': ['memo', 'caching', 'cache', 'remember', 'store results', 'memoize', 'memoized'],
      'tabulation': ['table', 'bottom-up', 'bottom up', 'iterative', 'tabulate'],
      'top-down': ['recursive', 'top down', 'recursion'],
      'bottom-up': ['iterative', 'bottom up', 'loop', 'tabulation'],
      'trading': ['trade', 'exchange', 'using', 'spending'],
      'normalization': ['normalize', 'normal form', 'normalizing', 'normalized'],
      'redundancy': ['redundant', 'duplicate', 'repeated', 'duplication', 'unnecessary'],
      'dependency': ['dependent', 'depends', 'dependence', 'dependencies', 'depending'],
      'atomic': ['indivisible', 'single', 'one unit', 'atomicity', 'all or nothing', 'all-or-nothing'],
      'consistency': ['consistent', 'valid state', 'integrity', 'correct'],
      'isolation': ['isolated', 'separate', 'independent', 'concurrent', 'isolate'],
      'durability': ['durable', 'permanent', 'persist', 'persistent', 'saved', 'stored', 'survive'],
      'transaction': ['transactions', 'operation', 'operations'],
      'process': ['program', 'task', 'processes', 'execution unit'],
      'thread': ['threads', 'lightweight process', 'lightweight', 'concurrent'],
      'memory': ['ram', 'heap', 'stack', 'space', 'storage', 'mem'],
      'deadlock': ['deadlocks', 'dead lock', 'blocked', 'stuck', 'waiting forever'],
      'mutual': ['exclusive', 'mutually'],
      'preemption': ['preempt', 'forcibly', 'preemptive', 'non-preemptive'],
      'circular': ['cycle', 'cyclic', 'loop', 'round'],
      'polymorphism': ['polymorphic', 'poly', 'many forms'],
      'overloading': ['overload', 'overloaded', 'same name different params'],
      'overriding': ['override', 'overridden', 'redefine', 'redefined'],
      'compile': ['compilation', 'compiled', 'compile-time', 'static'],
      'runtime': ['run-time', 'run time', 'dynamic', 'execution time'],
      'virtual': ['abstract', 'vtable', 'v-table', 'dynamic dispatch'],
      'single': ['one', 'sole', 'only one'],
      'responsibility': ['purpose', 'reason to change', 'job', 'task', 'function'],
      'interface': ['contract', 'abstraction', 'interfaces', 'api'],
      'segregation': ['separation', 'split', 'divide', 'separate'],
      'inversion': ['invert', 'inverse', 'depend on abstraction'],
      'substitution': ['substitute', 'replaceable', 'interchangeable', 'swap'],
      'layer': ['layers', 'level', 'levels', 'tier', 'tiers'],
      'physical': ['hardware', 'wire', 'cable', 'signal', 'bit'],
      'transport': ['tcp', 'udp', 'end-to-end', 'segment'],
      'application': ['http', 'ftp', 'smtp', 'dns', 'app layer', 'user-facing'],
      'closure': ['closures', 'closed over', 'captured', 'enclosed'],
      'lexical': ['scope', 'scoping', 'environment', 'context'],
      'scope': ['scoping', 'lexical', 'environment', 'block', 'function scope'],
      'callback': ['callbacks', 'event handler', 'listener', 'handler'],
      'event': ['events', 'event-driven', 'emit', 'trigger'],
      'loop': ['looping', 'event loop', 'cycle', 'iteration', 'iterate'],
      'stack': ['call stack', 'execution stack', 'stacks', 'LIFO'],
      'queue': ['queues', 'callback queue', 'task queue', 'message queue', 'FIFO'],
      'microtask': ['micro-task', 'promise', 'promises', 'microtasks'],
      'macrotask': ['macro-task', 'settimeout', 'setinterval', 'macrotasks', 'timer'],
      'decorator': ['decorators', 'wrapper', 'wrapping', 'annotation'],
      'higher-order': ['higher order', 'HOF', 'takes function', 'returns function'],
      'wraps': ['wrap', 'wrapper', 'wrapping', 'wrapped'],
      'metadata': ['meta', 'name', 'docstring', '__name__', 'attributes'],
      'jvm': ['java virtual machine', 'virtual machine', 'vm'],
      'bytecode': ['byte code', 'byte-code', 'compiled code', '.class'],
      'class loader': ['classloader', 'loading classes', 'load class'],
      'jit': ['just-in-time', 'just in time', 'compilation to native'],
      'garbage': ['gc', 'garbage collection', 'automatic memory', 'garbage collector'],
      'heap': ['heap memory', 'object memory', 'dynamic memory'],
      'examples': ['example', 'instance', 'e.g.', 'for example', 'such as', 'like', 'consider'],
      'fibonacci': ['fib', 'fibonacci sequence', 'fibonacci series'],
      'knapsack': ['0/1 knapsack', 'bag problem', 'weight problem'],
      'sorting': ['sort', 'sorted', 'arrange', 'order', 'ordering'],
      'in-place': ['in place', 'no extra space', 'constant space', 'without extra'],
      'unstable': ['not stable', 'order not preserved', 'relative order'],
      'stable': ['preserves order', 'relative order maintained', 'order preserved'],
    };

    // Extract meaningful words from the key point
    const keyWords = keyPoint.toLowerCase()
      .replace(/[()[\]{}]/g, ' ')
      .split(/[\s,;:\/]+/)
      .filter(w => w.length > 1 && !stopWords.has(w));

    if (keyWords.length === 0) return 0;

    let matchedWords = 0;
    const answerWords = answer.toLowerCase();

    for (const word of keyWords) {
      // Direct word match (with word boundary awareness)
      if (answerWords.includes(word)) {
        matchedWords += 1;
        continue;
      }

      // Check synonyms
      let synonymFound = false;
      for (const [, syns] of Object.entries(synonyms)) {
        // Check if the key word is related to this synonym group
        const allRelated = [Object.keys(synonyms).find(k => synonyms[k] === syns) || '', ...syns];
        if (allRelated.some(s => s === word || word.includes(s) || s.includes(word))) {
          // Check if any synonym appears in the answer
          if (allRelated.some(s => s.length > 2 && answerWords.includes(s))) {
            matchedWords += 0.8; // Partial credit for synonym
            synonymFound = true;
            break;
          }
        }
      }
      if (synonymFound) continue;

      // Partial/stem match (e.g., "partition" matches "partitioning")
      const stem = word.length > 4 ? word.slice(0, -2) : word;
      if (stem.length > 2 && answerWords.includes(stem)) {
        matchedWords += 0.7;
      }
    }

    return matchedWords / keyWords.length;
  };

  // Compare user answer against ideal answer using word overlap
  const getIdealAnswerSimilarity = (userAns: string, idealAns: string): number => {
    const stopWords = new Set(['a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been',
      'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
      'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as', 'and', 'but', 'or',
      'not', 'it', 'its', 'this', 'that', 'than', 'when', 'which', 'what', 'how']);

    const getWords = (text: string) => {
      return new Set(
        text.toLowerCase()
          .replace(/[^a-z0-9\s]/g, ' ')
          .split(/\s+/)
          .filter(w => w.length > 2 && !stopWords.has(w))
      );
    };

    const idealWords = getWords(idealAns);
    const userWords = getWords(userAns);

    if (idealWords.size === 0) return 0;

    let matches = 0;
    for (const word of idealWords) {
      if (userWords.has(word)) {
        matches++;
      } else {
        // Stem matching
        const stem = word.length > 4 ? word.slice(0, -2) : word;
        for (const uw of userWords) {
          if (uw.includes(stem) || stem.includes(uw.slice(0, -2))) {
            matches += 0.6;
            break;
          }
        }
      }
    }

    return matches / idealWords.size;
  };

  const evaluateAnswer = async () => {
    if (!userAnswer.trim() || !currentQuestion) return;

    setIsEvaluating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const keyPoints = currentQuestion.keyPoints || [];
    const expectedAnswer = currentQuestion.expectedAnswer || '';

    // 1. Smart key point matching (each key point gets a score 0-1)
    const keyPointScores = keyPoints.map((kp: string) => ({
      point: kp,
      score: getKeyPointScore(kp, userAnswer)
    }));

    const matchedKeyPoints = keyPointScores.filter(k => k.score >= 0.5);
    const partialKeyPoints = keyPointScores.filter(k => k.score > 0.2 && k.score < 0.5);
    const missedKeyPoints = keyPointScores.filter(k => k.score <= 0.2);

    // Key point coverage score (0-100)
    const keyPointCoverage = keyPoints.length > 0
      ? (keyPointScores.reduce((sum: number, k: { score: number }) => sum + k.score, 0) / keyPoints.length) * 100
      : 50;

    // 2. Ideal answer similarity (0-100)
    const idealSimilarity = expectedAnswer
      ? getIdealAnswerSimilarity(userAnswer, expectedAnswer) * 100
      : 0;

    // 3. Answer quality bonuses
    const wordCount = userAnswer.trim().split(/\s+/).length;
    let qualityBonus = 0;

    // Length bonus: good answers are usually 30-200 words
    if (wordCount >= 30 && wordCount <= 50) qualityBonus += 5;
    else if (wordCount > 50 && wordCount <= 100) qualityBonus += 10;
    else if (wordCount > 100 && wordCount <= 200) qualityBonus += 15;
    else if (wordCount > 200) qualityBonus += 12;
    else if (wordCount >= 15) qualityBonus += 3;

    // Structure bonus: uses examples, comparisons, technical terms
    const ansLower = userAnswer.toLowerCase();
    if (/for example|e\.g\.|such as|consider|instance|like when/i.test(userAnswer)) qualityBonus += 5;
    if (/because|therefore|thus|hence|so that|which means|this means/i.test(userAnswer)) qualityBonus += 3;
    if (/o\(|time complexity|space complexity|log n|n\^2|linear|constant/i.test(userAnswer)) qualityBonus += 5;
    if (/advantage|disadvantage|pros|cons|trade-?off|compar/i.test(userAnswer)) qualityBonus += 3;
    if (/step|first|second|then|next|finally|initially/i.test(ansLower)) qualityBonus += 2;

    // 4. Calculate final score — weighted combination
    const rawScore = (keyPointCoverage * 0.50) + (idealSimilarity * 0.35) + qualityBonus;
    const score = Math.min(100, Math.max(0, Math.round(rawScore)));

    // Generate smart feedback
    let feedback = '';
    if (score >= 85) feedback = "Outstanding! Your explanation is thorough and covers all key concepts.";
    else if (score >= 75) feedback = "Excellent! You have a strong understanding. Just a few points to polish.";
    else if (score >= 60) feedback = "Good explanation! Add more detail on the missing concepts to score higher.";
    else if (score >= 45) feedback = "Decent attempt! You covered some concepts. Review the ideal answer for improvement.";
    else if (score >= 30) feedback = "You have basic understanding. Study the preparation guide below to improve.";
    else feedback = "Keep practicing! Review the ideal answer and follow the preparation guide.";

    // Generate specific improvement suggestions based on what's missing
    const improvementSuggestions: string[] = [];
    if (missedKeyPoints.length > 0) {
      improvementSuggestions.push(`Cover these missing concepts: ${missedKeyPoints.slice(0, 2).map(k => k.point).join(', ')}`);
    }
    if (wordCount < 30) {
      improvementSuggestions.push("Write a more detailed explanation — aim for at least 50 words");
    }
    if (!/for example|e\.g\.|such as|instance/i.test(userAnswer)) {
      improvementSuggestions.push("Add real-world examples to strengthen your answer");
    }
    if (!/o\(|complexity|time|space/i.test(userAnswer) && keyPoints.some((kp: string) => /O\(|complexity|case/i.test(kp))) {
      improvementSuggestions.push("Include time/space complexity analysis where relevant");
    }
    if (!/because|therefore|thus|means|reason/i.test(userAnswer)) {
      improvementSuggestions.push("Explain WHY things work, not just WHAT they are");
    }

    const mockEvaluation: Evaluation = {
      score,
      feedback,
      strengths: matchedKeyPoints.slice(0, 4).map(k => `Covered: ${k.point}`),
      improvements: improvementSuggestions.slice(0, 3),
      missingPoints: missedKeyPoints.slice(0, 4).map(k => k.point)
    };

    setEvaluation(mockEvaluation);
    setSessionScores(prev => [...prev, score]);
    setIsEvaluating(false);

    // Auto-show guidance if score is low
    if (score < 60) {
      setShowGuidance(true);
      setShowIdealAnswer(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setEvaluation(null);
      setShowHint(false);
      setShowIdealAnswer(false);
      setShowGuidance(false);
    } else {
      // Pass real session data to results
      const finalScores = [...sessionScores];
      const sessionData: SessionResultData = {
        scores: finalScores,
        topics: questions.slice(0, totalQuestions).map(q => q.topic),
        timeSpent,
        questionsAttempted: finalScores.length,
        questions: questions.slice(0, totalQuestions).map((q, i) => ({
          topic: q.topic,
          score: finalScores[i] || 0
        }))
      };
      onComplete(sessionData);
    }
  };

  const resetAnswer = () => {
    setUserAnswer('');
    setEvaluation(null);
    setShowHint(false);
    setShowIdealAnswer(false);
    setShowGuidance(false);
  };

  // Get preparation guide for current topic
  const getGuide = () => {
    const topic = currentQuestion?.topic || '';
    return PREPARATION_GUIDES[topic] || {
      preparationTips: [
        'Break the concept into smaller sub-topics',
        'Use analogies and real-world examples',
        'Practice explaining to a friend or rubber duck',
        'Write short notes covering key points',
        'Time yourself and practice answering in 2-3 minutes'
      ],
      studyResources: [
        'GeeksforGeeks — search for the topic',
        'YouTube — search for visual explanations',
        'LeetCode Discuss — community explanations',
        'ChatGPT — ask for simplified explanations'
      ],
      practiceSteps: [
        'Step 1: Read the ideal answer below carefully',
        'Step 2: Identify which key points you missed',
        'Step 3: Write your own explanation again from scratch',
        'Step 4: Compare with ideal answer — aim for 80%+ coverage',
        'Step 5: Practice explaining it out loud without notes'
      ]
    };
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-slate-500">No questions available for this domain.</p>
      </div>
    );
  }

  const guide = getGuide();

  return (
    <div className="space-y-4 min-h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Concept Explanation Mode</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Explain technical concepts as you would in a real interview</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg px-4 py-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200">
            <Clock className="w-4 h-4 mr-2" />
            {formatTime(timeSpent)}
          </Badge>
          <Badge className="text-lg px-4 py-2 bg-blue-600 text-white">
            Question {currentQuestionIndex + 1} / {totalQuestions}
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <Progress value={((currentQuestionIndex + 1) / totalQuestions) * 100} className="h-2" />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Panel - Question */}
        <Card className="bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Question
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">{currentQuestion.topic}</Badge>
                <Badge className={`text-white ${
                  currentQuestion.difficulty === 'easy' ? 'bg-emerald-500' :
                    currentQuestion.difficulty === 'medium' ? 'bg-amber-500' : 'bg-red-500'
                }`}>
                  {currentQuestion.difficulty}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  <p className="text-lg text-slate-800 dark:text-white leading-relaxed">
                    {currentQuestion.question}
                  </p>
                </motion.div>

                {/* Hints Section */}
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    onClick={() => setShowHint(!showHint)}
                  >
                    <Lightbulb className="w-4 h-4 mr-2 text-amber-500" />
                    {showHint ? 'Hide Hints' : 'Show Hints'}
                  </Button>

                  <AnimatePresence>
                    {showHint && currentQuestion.hints && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        {currentQuestion.hints.map((hint: string, idx: number) => (
                          <div key={`hint-${idx}`} className="p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-lg">
                            <p className="text-amber-700 dark:text-amber-300 text-sm">{hint}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Key Points to Cover */}
                <div className="p-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-lg">
                  <p className="text-blue-700 dark:text-blue-300 text-sm mb-2 font-medium">Key Points to Cover:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentQuestion.keyPoints?.map((point: string, idx: number) => (
                      <Badge key={`point-${idx}`} variant="outline" className="border-blue-300 dark:border-blue-500/50 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-transparent">
                        {point}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right Panel - Answer & Evaluation */}
        <Card className="bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-slate-900 dark:text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Your Answer
              </span>
              <div className="flex items-center gap-2">
                <VoiceInputButton
                  currentValue={userAnswer}
                  onValueChange={setUserAnswer}
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={resetAnswer}
                  className="border-slate-300 dark:border-slate-600"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {!evaluation ? (
              <>
                <Textarea
                  value={userAnswer}
                  placeholder="Type your explanation here... or use voice input. Be detailed and cover the key concepts."
                  className="flex-1 min-h-[300px] bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder:text-slate-400 resize-none"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUserAnswer(e.target.value)}
                />
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-slate-500">
                    {userAnswer.length} characters
                  </p>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!userAnswer.trim() || isEvaluating}
                    onClick={evaluateAnswer}
                  >
                    {isEvaluating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Evaluating...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Answer
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <ScrollArea className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 pb-4"
                >
                  {/* Score */}
                  <div className={`p-6 rounded-xl text-center ${
                    evaluation.score >= 80 ? 'bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30' :
                    evaluation.score >= 60 ? 'bg-amber-50 dark:bg-amber-500/20 border border-amber-200 dark:border-amber-500/30' :
                    'bg-red-50 dark:bg-red-500/20 border border-red-200 dark:border-red-500/30'
                  }`}>
                    <div className={`text-5xl font-bold mb-2 ${
                      evaluation.score >= 80 ? 'text-emerald-600 dark:text-emerald-400' :
                      evaluation.score >= 60 ? 'text-amber-600 dark:text-amber-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {evaluation.score}%
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">{evaluation.feedback}</p>
                  </div>

                  {/* Strengths */}
                  {evaluation.strengths.length > 0 && (
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-lg">
                      <h4 className="font-medium text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Strengths
                      </h4>
                      <ul className="space-y-1">
                        {evaluation.strengths.map((strength: string, idx: number) => (
                          <li key={`strength-${idx}`} className="text-sm text-slate-700 dark:text-slate-300">• {strength}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Improvements */}
                  {evaluation.improvements.length > 0 && (
                    <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-lg">
                      <h4 className="font-medium text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-1">
                        {evaluation.improvements.map((improvement: string, idx: number) => (
                          <li key={`improvement-${idx}`} className="text-sm text-slate-700 dark:text-slate-300">• {improvement}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Missing Points */}
                  {evaluation.missingPoints.length > 0 && (
                    <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg">
                      <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">Missing Key Points</h4>
                      <div className="flex flex-wrap gap-2">
                        {evaluation.missingPoints.map((point: string, idx: number) => (
                          <Badge key={`missing-${idx}`} variant="outline" className="border-red-300 dark:border-red-500/50 text-red-700 dark:text-red-400 bg-red-50 dark:bg-transparent">
                            {point}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* === IDEAL ANSWER SECTION === */}
                  <div className="border border-blue-200 dark:border-blue-500/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setShowIdealAnswer(!showIdealAnswer)}
                      className="w-full p-4 flex items-center justify-between bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                    >
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                        <Star className="w-5 h-5 text-blue-500" />
                        View Ideal Answer
                      </h4>
                      {showIdealAnswer ? <ChevronUp className="w-5 h-5 text-blue-500" /> : <ChevronDown className="w-5 h-5 text-blue-500" />}
                    </button>
                    <AnimatePresence>
                      {showIdealAnswer && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-blue-200 dark:border-blue-500/30"
                        >
                          <div className="p-4 bg-blue-50/50 dark:bg-blue-500/5">
                            <p className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm">
                              {currentQuestion.expectedAnswer}
                            </p>
                            {currentQuestion.relatedTopics && currentQuestion.relatedTopics.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-500/20">
                                <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">Related Topics to Study:</p>
                                <div className="flex flex-wrap gap-1">
                                  {currentQuestion.relatedTopics.map((topic: string, idx: number) => (
                                    <Badge key={`related-${idx}`} className="text-xs bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-0">
                                      {topic}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* === GUIDANCE & PREPARATION SECTION (shows prominently when score < 60%) === */}
                  {evaluation.score < 60 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-2 border-purple-300 dark:border-purple-500/40 rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-500/10 dark:to-indigo-500/10"
                    >
                      <div className="p-4 bg-purple-100/50 dark:bg-purple-500/15 border-b border-purple-200 dark:border-purple-500/30">
                        <h4 className="font-bold text-purple-800 dark:text-purple-300 flex items-center gap-2 text-lg">
                          <GraduationCap className="w-6 h-6 text-purple-500" />
                          Improvement Guide — Score Below 60%
                        </h4>
                        <p className="text-purple-600 dark:text-purple-400 text-sm mt-1">
                          Don&apos;t worry! Follow this guide to master this topic and boost your score.
                        </p>
                      </div>

                      <div className="p-4 space-y-4">
                        {/* Preparation Tips */}
                        <div>
                          <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4 text-purple-500" />
                            How to Prepare This Topic
                          </h5>
                          <ul className="space-y-2">
                            {guide.preparationTips.map((tip, idx) => (
                              <li key={`tip-${idx}`} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{idx + 1}</span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Step-by-Step Practice */}
                        <div>
                          <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-500" />
                            Step-by-Step Practice Plan
                          </h5>
                          <div className="space-y-2">
                            {guide.practiceSteps.map((step, idx) => (
                              <div key={`step-${idx}`} className="p-2.5 bg-white/60 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-600/50">
                                <p className="text-sm text-slate-700 dark:text-slate-300">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Study Resources */}
                        <div>
                          <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-blue-500" />
                            Recommended Study Resources
                          </h5>
                          <ul className="space-y-1.5">
                            {guide.studyResources.map((resource, idx) => (
                              <li key={`resource-${idx}`} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                <span className="text-blue-500 mt-1">→</span>
                                {resource}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Show guidance toggle for scores 60-79% */}
                  {evaluation.score >= 60 && evaluation.score < 80 && (
                    <div className="border border-indigo-200 dark:border-indigo-500/30 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setShowGuidance(!showGuidance)}
                        className="w-full p-3 flex items-center justify-between bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors"
                      >
                        <h4 className="font-medium text-indigo-700 dark:text-indigo-300 flex items-center gap-2 text-sm">
                          <GraduationCap className="w-4 h-4 text-indigo-500" />
                          View Preparation Guide to Score Higher
                        </h4>
                        {showGuidance ? <ChevronUp className="w-4 h-4 text-indigo-500" /> : <ChevronDown className="w-4 h-4 text-indigo-500" />}
                      </button>
                      <AnimatePresence>
                        {showGuidance && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <div className="p-4 space-y-3 border-t border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-500/5">
                              <div>
                                <h5 className="font-medium text-slate-800 dark:text-slate-200 mb-2 text-sm flex items-center gap-1">
                                  <Target className="w-3.5 h-3.5 text-indigo-500" /> Quick Tips
                                </h5>
                                <ul className="space-y-1">
                                  {guide.preparationTips.slice(0, 3).map((tip, idx) => (
                                    <li key={`qtip-${idx}`} className="text-xs text-slate-600 dark:text-slate-400">• {tip}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="font-medium text-slate-800 dark:text-slate-200 mb-2 text-sm flex items-center gap-1">
                                  <BookOpen className="w-3.5 h-3.5 text-blue-500" /> Resources
                                </h5>
                                <ul className="space-y-1">
                                  {guide.studyResources.slice(0, 2).map((res, idx) => (
                                    <li key={`qres-${idx}`} className="text-xs text-slate-600 dark:text-slate-400">→ {res}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Next Button */}
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    onClick={nextQuestion}
                  >
                    {currentQuestionIndex < totalQuestions - 1 ? (
                      <>
                        Next Question
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        View Results
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Session Progress */}
      {sessionScores.length > 0 && (
        <Card className="bg-white dark:bg-slate-800/70 border-slate-200 dark:border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-slate-500 dark:text-slate-400">Session Scores:</span>
                {sessionScores.map((score, idx) => (
                  <Badge
                    key={`score-${idx}`}
                    className={`text-white ${
                      score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                  >
                    Q{idx + 1}: {score}%
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="font-bold text-slate-800 dark:text-white">
                  Average: {Math.round(sessionScores.reduce((a, b) => a + b, 0) / sessionScores.length)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
