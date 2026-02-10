// src/data/technical-practice-data.ts
// Data and configuration for TechPrep Engine

import {
    CodingQuestion,
    ConceptualQuestion,
    DebuggingQuestion,
    DifficultyLevel,
    DomainConfig,
    PracticeMode,
    TechnicalDomain
} from '@/types/technical-practice';

// ============================================
// DOMAIN CONFIGURATIONS
// ============================================

export const DOMAIN_CONFIGS: Record<TechnicalDomain, DomainConfig> = {
  dsa: {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    shortName: 'DSA',
    description: 'Master fundamental data structures and algorithmic problem-solving techniques.',
    icon: 'GitBranch',
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-600',
    topics: [
      'Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs',
      'Hash Tables', 'Heaps', 'Sorting', 'Searching', 'Dynamic Programming',
      'Recursion', 'Greedy Algorithms', 'Backtracking', 'Divide & Conquer'
    ],
    supportedModes: ['concept', 'coding', 'followup', 'debugging']
  },
  dbms: {
    id: 'dbms',
    name: 'Database Management Systems',
    shortName: 'DBMS',
    description: 'Learn SQL, normalization, transactions, and database design principles.',
    icon: 'Database',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-cyan-600',
    topics: [
      'SQL Queries', 'Normalization', 'ER Diagrams', 'Transactions',
      'ACID Properties', 'Indexing', 'Joins', 'Views', 'Stored Procedures',
      'Triggers', 'Concurrency Control', 'Recovery', 'NoSQL Basics'
    ],
    supportedModes: ['concept', 'coding', 'followup']
  },
  os: {
    id: 'os',
    name: 'Operating Systems',
    shortName: 'OS',
    description: 'Understand process management, memory, file systems, and synchronization.',
    icon: 'Monitor',
    color: '#10B981',
    gradient: 'from-emerald-500 to-teal-600',
    topics: [
      'Process Management', 'Threads', 'CPU Scheduling', 'Synchronization',
      'Deadlocks', 'Memory Management', 'Virtual Memory', 'Paging',
      'File Systems', 'I/O Systems', 'Disk Scheduling', 'Security'
    ],
    supportedModes: ['concept', 'followup', 'debugging']
  },
  oops: {
    id: 'oops',
    name: 'Object Oriented Programming',
    shortName: 'OOPs',
    description: 'Master encapsulation, inheritance, polymorphism, and design patterns.',
    icon: 'Box',
    color: '#F59E0B',
    gradient: 'from-amber-500 to-orange-600',
    topics: [
      'Classes & Objects', 'Encapsulation', 'Inheritance', 'Polymorphism',
      'Abstraction', 'Constructors', 'Destructors', 'Static Members',
      'Interfaces', 'Abstract Classes', 'Design Patterns', 'SOLID Principles'
    ],
    supportedModes: ['concept', 'coding', 'followup', 'debugging']
  },
  networks: {
    id: 'networks',
    name: 'Computer Networks',
    shortName: 'Networks',
    description: 'Learn networking protocols, OSI model, TCP/IP, and security concepts.',
    icon: 'Network',
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-600',
    topics: [
      'OSI Model', 'TCP/IP', 'HTTP/HTTPS', 'DNS', 'DHCP',
      'Routing', 'Subnetting', 'Firewalls', 'VPN', 'Load Balancing',
      'Sockets', 'REST APIs', 'WebSockets', 'Network Security'
    ],
    supportedModes: ['concept', 'followup']
  },
  c: {
    id: 'c',
    name: 'C Programming',
    shortName: 'C',
    description: 'Master pointers, memory management, and low-level programming in C.',
    icon: 'Code2',
    color: '#6366F1',
    gradient: 'from-indigo-500 to-violet-600',
    topics: [
      'Pointers', 'Arrays', 'Strings', 'Structures', 'Unions',
      'File Handling', 'Dynamic Memory', 'Preprocessor', 'Bitwise Operations',
      'Function Pointers', 'Memory Layout', 'Compilation Process'
    ],
    supportedModes: ['concept', 'coding', 'followup', 'debugging']
  },
  cpp: {
    id: 'cpp',
    name: 'C++ Programming',
    shortName: 'C++',
    description: 'Learn STL, templates, RAII, and modern C++ features.',
    icon: 'Braces',
    color: '#0EA5E9',
    gradient: 'from-sky-500 to-blue-600',
    topics: [
      'STL Containers', 'Iterators', 'Templates', 'RAII',
      'Smart Pointers', 'Move Semantics', 'Lambda Functions', 'Exceptions',
      'Operator Overloading', 'Virtual Functions', 'Multiple Inheritance', 'Namespaces'
    ],
    supportedModes: ['concept', 'coding', 'followup', 'debugging']
  },
  java: {
    id: 'java',
    name: 'Java Programming',
    shortName: 'Java',
    description: 'Master JVM, collections, multithreading, and Java ecosystem.',
    icon: 'Coffee',
    color: '#DC2626',
    gradient: 'from-red-500 to-orange-600',
    topics: [
      'JVM Architecture', 'Collections Framework', 'Generics', 'Streams API',
      'Multithreading', 'Concurrency', 'Exception Handling', 'Annotations',
      'Reflection', 'Lambda Expressions', 'Garbage Collection', 'JDBC'
    ],
    supportedModes: ['concept', 'coding', 'followup', 'debugging']
  },
  python: {
    id: 'python',
    name: 'Python Programming',
    shortName: 'Python',
    description: 'Learn Pythonic code, decorators, generators, and Python internals.',
    icon: 'FileCode',
    color: '#22C55E',
    gradient: 'from-green-500 to-emerald-600',
    topics: [
      'Data Types', 'List Comprehensions', 'Generators', 'Decorators',
      'Context Managers', 'OOP in Python', 'Metaclasses', 'Itertools',
      'Regular Expressions', 'File Handling', 'Error Handling', 'Modules & Packages'
    ],
    supportedModes: ['concept', 'coding', 'followup', 'debugging']
  },
  javascript: {
    id: 'javascript',
    name: 'JavaScript Programming',
    shortName: 'JavaScript',
    description: 'Master closures, async programming, ES6+, and DOM manipulation.',
    icon: 'FileJson',
    color: '#FACC15',
    gradient: 'from-yellow-400 to-amber-500',
    topics: [
      'Closures', 'Prototypes', 'Event Loop', 'Promises', 'Async/Await',
      'ES6+ Features', 'DOM Manipulation', 'Hoisting', 'Scope',
      'Higher-Order Functions', 'This Keyword', 'Event Delegation', 'Modules'
    ],
    supportedModes: ['concept', 'coding', 'followup', 'debugging']
  }
};

// ============================================
// MODE CONFIGURATIONS
// ============================================

export const PRACTICE_MODE_CONFIG: Record<PracticeMode, {
  id: PracticeMode;
  name: string;
  description: string;
  icon: string;
  color: string;
  estimatedTime: string;
  features: string[];
}> = {
  concept: {
    id: 'concept',
    name: 'Concept Explanation',
    description: 'Practice explaining technical concepts clearly and thoroughly.',
    icon: 'BookOpen',
    color: '#8B5CF6',
    estimatedTime: '5-10 min per question',
    features: [
      'AI evaluates concept coverage',
      'Get depth and clarity scores',
      'Identify missing points',
      'Voice or text answers supported'
    ]
  },
  coding: {
    id: 'coding',
    name: 'Coding Practice',
    description: 'Solve coding problems with real-time execution and feedback.',
    icon: 'Code',
    color: '#3B82F6',
    estimatedTime: '15-30 min per problem',
    features: [
      'In-browser code editor',
      'Multiple language support',
      'Test case validation',
      'Time & space complexity analysis'
    ]
  },
  followup: {
    id: 'followup',
    name: 'Follow-Up Questions',
    description: 'Practice handling interviewer follow-up questions dynamically.',
    icon: 'MessageSquare',
    color: '#10B981',
    estimatedTime: '10-15 min per chain',
    features: [
      'Dynamic AI-generated follow-ups',
      'Simulates real interview flow',
      'Multi-depth questioning',
      'Adaptive difficulty'
    ]
  },
  debugging: {
    id: 'debugging',
    name: 'Debugging Mode',
    description: 'Find and fix bugs in given code snippets.',
    icon: 'Bug',
    color: '#EF4444',
    estimatedTime: '10-20 min per problem',
    features: [
      'Identify syntax & logic errors',
      'Fix buggy code',
      'Problem-solving assessment',
      'Edge case handling'
    ]
  }
};

// ============================================
// SAMPLE QUESTIONS DATABASE
// ============================================

export const SAMPLE_CONCEPTUAL_QUESTIONS: ConceptualQuestion[] = [
  // DSA Questions
  {
    id: 'dsa-concept-001',
    domain: 'dsa',
    topic: 'Sorting',
    difficulty: 'medium',
    type: 'conceptual',
    question: 'Explain the Quick Sort algorithm. How does it work and what is its time complexity?',
    keyPoints: [
      'Divide and conquer approach',
      'Pivot selection',
      'Partitioning process',
      'Average case O(n log n)',
      'Worst case O(n²)',
      'In-place sorting',
      'Unstable sort'
    ],
    expectedAnswer: 'Quick Sort is a divide and conquer algorithm that works by selecting a pivot element and partitioning the array around it. Elements smaller than pivot go to the left, larger go to the right. This process is recursively applied to sub-arrays. Average time complexity is O(n log n), worst case is O(n²) when array is already sorted and poor pivot is chosen.',
    relatedTopics: ['Merge Sort', 'Heap Sort', 'Time Complexity'],
    followUpQuestions: [
      'What is the worst-case scenario for Quick Sort and how can you avoid it?',
      'How does Quick Sort compare to Merge Sort?',
      'Can you implement Quick Sort in-place?'
    ],
    hints: ['Think about how the pivot divides the array', 'Consider different pivot selection strategies'],
    tags: ['sorting', 'divide-conquer', 'recursion'],
    estimatedTime: 5
  },
  {
    id: 'dsa-concept-002',
    domain: 'dsa',
    topic: 'Trees',
    difficulty: 'easy',
    type: 'conceptual',
    question: 'What is a Binary Search Tree (BST)? Explain its properties and basic operations.',
    keyPoints: [
      'Node-based tree structure',
      'Left subtree contains smaller values',
      'Right subtree contains larger values',
      'No duplicate values (typically)',
      'Search, Insert, Delete operations',
      'O(log n) average case',
      'O(n) worst case (skewed tree)'
    ],
    expectedAnswer: 'A Binary Search Tree is a node-based tree where each node has at most two children. The key property is that all nodes in the left subtree have values less than the root, and all nodes in the right subtree have values greater than the root. This property enables efficient searching with O(log n) average time complexity.',
    relatedTopics: ['AVL Trees', 'Red-Black Trees', 'Tree Traversals'],
    followUpQuestions: [
      'What happens when a BST becomes skewed?',
      'How do AVL trees solve the BST skewing problem?',
      'What are the different tree traversal methods?'
    ],
    hints: ['Focus on the ordering property', 'Consider the relationship between parent and child nodes'],
    tags: ['trees', 'binary-tree', 'search'],
    estimatedTime: 5
  },
  {
    id: 'dsa-concept-003',
    domain: 'dsa',
    topic: 'Dynamic Programming',
    difficulty: 'hard',
    type: 'conceptual',
    question: 'Explain Dynamic Programming. When should you use it and what are memoization and tabulation?',
    keyPoints: [
      'Optimization technique for overlapping subproblems',
      'Optimal substructure property',
      'Memoization (top-down approach)',
      'Tabulation (bottom-up approach)',
      'Trading space for time',
      'Examples: Fibonacci, LCS, Knapsack'
    ],
    expectedAnswer: 'Dynamic Programming is an algorithmic technique for solving problems with overlapping subproblems and optimal substructure. Instead of solving the same subproblems repeatedly, DP stores results for reuse. Memoization is top-down (recursive with caching), while tabulation is bottom-up (iterative). DP is used when a problem can be broken into smaller subproblems whose solutions combine to solve the original.',
    relatedTopics: ['Recursion', 'Greedy Algorithms', 'Divide and Conquer'],
    followUpQuestions: [
      'How do you identify if a problem can be solved using DP?',
      'What is the difference between memoization and tabulation?',
      'Can you explain the Longest Common Subsequence problem?'
    ],
    hints: ['Think about subproblem overlap', 'Consider how smaller solutions build larger ones'],
    tags: ['dynamic-programming', 'optimization', 'memoization'],
    estimatedTime: 8
  },

  // DBMS Questions
  {
    id: 'dbms-concept-001',
    domain: 'dbms',
    topic: 'Normalization',
    difficulty: 'medium',
    type: 'conceptual',
    question: 'Explain database normalization. What are the different normal forms?',
    keyPoints: [
      'Process of organizing data',
      'Reduce redundancy',
      '1NF - Atomic values',
      '2NF - No partial dependencies',
      '3NF - No transitive dependencies',
      'BCNF - Stricter 3NF',
      'Trade-off with performance'
    ],
    expectedAnswer: 'Normalization is the process of organizing database tables to minimize redundancy and dependency. 1NF ensures atomic values and no repeating groups. 2NF removes partial dependencies (non-key attributes depending on part of composite key). 3NF removes transitive dependencies (non-key depending on non-key). BCNF is a stricter form where every determinant must be a candidate key.',
    relatedTopics: ['Denormalization', 'Functional Dependencies', 'Keys'],
    followUpQuestions: [
      'When would you denormalize a database?',
      'What is a functional dependency?',
      'Give an example of converting a table from 1NF to 3NF.'
    ],
    hints: ['Think about data redundancy', 'Consider dependency relationships'],
    tags: ['normalization', 'database-design', 'redundancy'],
    estimatedTime: 6
  },
  {
    id: 'dbms-concept-002',
    domain: 'dbms',
    topic: 'ACID Properties',
    difficulty: 'easy',
    type: 'conceptual',
    question: 'What are ACID properties in database transactions?',
    keyPoints: [
      'Atomicity - All or nothing',
      'Consistency - Valid state transitions',
      'Isolation - Concurrent transaction independence',
      'Durability - Permanent after commit',
      'Ensures data integrity',
      'Transaction management'
    ],
    expectedAnswer: 'ACID properties ensure reliable database transactions. Atomicity means transactions are all-or-nothing. Consistency ensures the database moves from one valid state to another. Isolation means concurrent transactions don\'t interfere with each other. Durability guarantees that committed transactions persist even after system failures.',
    relatedTopics: ['Transactions', 'Concurrency Control', 'Recovery'],
    followUpQuestions: [
      'How does the database ensure atomicity?',
      'What are isolation levels?',
      'How is durability maintained?'
    ],
    hints: ['Think about what each letter stands for', 'Consider failure scenarios'],
    tags: ['acid', 'transactions', 'reliability'],
    estimatedTime: 5
  },

  // OS Questions
  {
    id: 'os-concept-001',
    domain: 'os',
    topic: 'Process Management',
    difficulty: 'medium',
    type: 'conceptual',
    question: 'Explain the difference between a process and a thread. What are the advantages of multithreading?',
    keyPoints: [
      'Process - Independent execution unit',
      'Thread - Lightweight process',
      'Shared vs separate memory',
      'Context switching overhead',
      'Multithreading benefits',
      'Synchronization challenges'
    ],
    expectedAnswer: 'A process is an independent program in execution with its own memory space. A thread is a lightweight unit of execution within a process, sharing the process\'s memory. Threads have lower context switching overhead. Multithreading benefits include better resource utilization, improved responsiveness, and efficient parallel execution. Challenges include synchronization and race conditions.',
    relatedTopics: ['Context Switching', 'Synchronization', 'Deadlocks'],
    followUpQuestions: [
      'What is context switching and why is it expensive?',
      'How do threads communicate?',
      'What is a race condition?'
    ],
    hints: ['Compare resource ownership', 'Think about memory sharing'],
    tags: ['processes', 'threads', 'multithreading'],
    estimatedTime: 6
  },
  {
    id: 'os-concept-002',
    domain: 'os',
    topic: 'Deadlocks',
    difficulty: 'hard',
    type: 'conceptual',
    question: 'What is a deadlock? Explain the four necessary conditions and how to prevent/avoid deadlocks.',
    keyPoints: [
      'Mutual Exclusion',
      'Hold and Wait',
      'No Preemption',
      'Circular Wait',
      'Prevention strategies',
      'Avoidance (Banker\'s algorithm)',
      'Detection and Recovery'
    ],
    expectedAnswer: 'A deadlock occurs when processes are blocked forever, each waiting for resources held by others. Four necessary conditions: Mutual Exclusion (exclusive resource use), Hold and Wait (holding while waiting), No Preemption (resources can\'t be forcibly taken), Circular Wait (circular chain of waiting). Prevention breaks one condition. Avoidance uses algorithms like Banker\'s to check safe states.',
    relatedTopics: ['Resource Allocation', 'Synchronization', 'Semaphores'],
    followUpQuestions: [
      'Explain the Banker\'s algorithm.',
      'How can you detect a deadlock?',
      'What is resource starvation?'
    ],
    hints: ['Think about the four conditions', 'Consider resource allocation graphs'],
    tags: ['deadlock', 'synchronization', 'concurrency'],
    estimatedTime: 8
  },

  // OOPs Questions
  {
    id: 'oops-concept-001',
    domain: 'oops',
    topic: 'Polymorphism',
    difficulty: 'medium',
    type: 'conceptual',
    question: 'Explain polymorphism in OOP. What is the difference between compile-time and runtime polymorphism?',
    keyPoints: [
      'Same interface, different behavior',
      'Compile-time (static) polymorphism',
      'Method overloading',
      'Runtime (dynamic) polymorphism',
      'Method overriding',
      'Virtual functions',
      'Late binding'
    ],
    expectedAnswer: 'Polymorphism allows objects of different types to be treated through a common interface. Compile-time (static) polymorphism is achieved through method overloading and operator overloading, resolved at compile time. Runtime (dynamic) polymorphism uses method overriding with virtual functions, resolved at runtime through late binding. This enables writing flexible, extensible code.',
    relatedTopics: ['Inheritance', 'Virtual Functions', 'Interfaces'],
    followUpQuestions: [
      'How is polymorphism implemented internally?',
      'What is a virtual table (vtable)?',
      'Can constructors be virtual?'
    ],
    hints: ['Think about when binding happens', 'Consider overloading vs overriding'],
    tags: ['polymorphism', 'oop', 'inheritance'],
    estimatedTime: 6
  },
  {
    id: 'oops-concept-002',
    domain: 'oops',
    topic: 'SOLID Principles',
    difficulty: 'hard',
    type: 'conceptual',
    question: 'Explain the SOLID principles of object-oriented design.',
    keyPoints: [
      'Single Responsibility Principle',
      'Open/Closed Principle',
      'Liskov Substitution Principle',
      'Interface Segregation Principle',
      'Dependency Inversion Principle',
      'Code maintainability',
      'Loose coupling'
    ],
    expectedAnswer: 'SOLID principles are: Single Responsibility - class should have one reason to change. Open/Closed - open for extension, closed for modification. Liskov Substitution - subtypes must be substitutable for base types. Interface Segregation - prefer many specific interfaces over one general. Dependency Inversion - depend on abstractions, not concretions. These lead to maintainable, scalable code.',
    relatedTopics: ['Design Patterns', 'Abstraction', 'Coupling'],
    followUpQuestions: [
      'Give an example of violating SRP.',
      'How does DIP help in testing?',
      'What is the relationship between SOLID and design patterns?'
    ],
    hints: ['Remember what each letter stands for', 'Think about practical applications'],
    tags: ['solid', 'design-principles', 'clean-code'],
    estimatedTime: 8
  },

  // Computer Networks Questions
  {
    id: 'networks-concept-001',
    domain: 'networks',
    topic: 'OSI Model',
    difficulty: 'medium',
    type: 'conceptual',
    question: 'Explain the OSI model and its seven layers.',
    keyPoints: [
      'Physical Layer - Bits, hardware',
      'Data Link Layer - Frames, MAC',
      'Network Layer - Packets, IP',
      'Transport Layer - Segments, TCP/UDP',
      'Session Layer - Session management',
      'Presentation Layer - Data format',
      'Application Layer - User interface'
    ],
    expectedAnswer: 'The OSI model is a 7-layer framework for network communication. Physical handles bit transmission. Data Link manages frames and MAC addressing. Network handles packet routing with IP. Transport provides end-to-end communication (TCP/UDP). Session manages connections. Presentation handles data formatting and encryption. Application provides user-facing protocols like HTTP.',
    relatedTopics: ['TCP/IP Model', 'Protocols', 'Network Architecture'],
    followUpQuestions: [
      'How does OSI compare to TCP/IP model?',
      'Which layer is HTTP at?',
      'What happens at each layer when you access a website?'
    ],
    hints: ['Remember the layer order', 'Think about data encapsulation'],
    tags: ['osi', 'networking', 'protocols'],
    estimatedTime: 6
  },

  // JavaScript Questions
  {
    id: 'js-concept-001',
    domain: 'javascript',
    topic: 'Closures',
    difficulty: 'medium',
    type: 'conceptual',
    question: 'What are closures in JavaScript? Explain with an example use case.',
    keyPoints: [
      'Function with access to outer scope',
      'Lexical scoping',
      'Variables persist after outer function returns',
      'Data privacy/encapsulation',
      'Module pattern',
      'Callback functions'
    ],
    expectedAnswer: 'A closure is a function that has access to variables in its outer (enclosing) scope, even after the outer function has returned. This is due to lexical scoping - functions remember where they were defined. Use cases include data privacy (module pattern), maintaining state in callbacks, and creating function factories.',
    relatedTopics: ['Scope', 'Hoisting', 'This Keyword'],
    followUpQuestions: [
      'What is the module pattern?',
      'How do closures relate to memory management?',
      'What is the difference between scope and closure?'
    ],
    hints: ['Think about variable access', 'Consider function execution context'],
    tags: ['closures', 'scope', 'functions'],
    estimatedTime: 5
  },
  {
    id: 'js-concept-002',
    domain: 'javascript',
    topic: 'Event Loop',
    difficulty: 'hard',
    type: 'conceptual',
    question: 'Explain the JavaScript event loop and how asynchronous code execution works.',
    keyPoints: [
      'Single-threaded execution',
      'Call stack',
      'Callback queue (task queue)',
      'Microtask queue',
      'Event loop mechanism',
      'Non-blocking I/O',
      'Priority: Microtasks before macrotasks'
    ],
    expectedAnswer: 'JavaScript is single-threaded but handles async operations via the event loop. The call stack executes sync code. Async callbacks go to Web APIs, then to callback queue when ready. The event loop moves callbacks to call stack when it\'s empty. Microtasks (Promises) have priority over macrotasks (setTimeout). This enables non-blocking execution.',
    relatedTopics: ['Promises', 'Async/Await', 'Callbacks'],
    followUpQuestions: [
      'What is the difference between microtasks and macrotasks?',
      'In what order will console.logs execute with mixed sync/async code?',
      'How does async/await relate to the event loop?'
    ],
    hints: ['Think about task queues', 'Consider execution priority'],
    tags: ['event-loop', 'async', 'concurrency'],
    estimatedTime: 8
  },

  // Python Questions
  {
    id: 'python-concept-001',
    domain: 'python',
    topic: 'Decorators',
    difficulty: 'medium',
    type: 'conceptual',
    question: 'What are decorators in Python? How do they work?',
    keyPoints: [
      'Functions that modify other functions',
      'Higher-order functions',
      '@decorator syntax',
      'Wrapper function pattern',
      'Use cases: logging, timing, authentication',
      'functools.wraps for metadata'
    ],
    expectedAnswer: 'Decorators are higher-order functions that take a function as input and return a modified version. They use the @decorator syntax for clean application. Internally, they wrap the original function to add behavior before/after. Common uses include logging, timing, access control. functools.wraps preserves the original function\'s metadata.',
    relatedTopics: ['Higher-Order Functions', 'Closures', 'Metaclasses'],
    followUpQuestions: [
      'How do you create a decorator with arguments?',
      'What is functools.wraps and why use it?',
      'Can you apply multiple decorators?'
    ],
    hints: ['Think about function wrapping', 'Consider the @ syntax meaning'],
    tags: ['decorators', 'functions', 'metaprogramming'],
    estimatedTime: 6
  },

  // Java Questions
  {
    id: 'java-concept-001',
    domain: 'java',
    topic: 'JVM Architecture',
    difficulty: 'medium',
    type: 'conceptual',
    question: 'Explain the JVM architecture and how Java achieves platform independence.',
    keyPoints: [
      'Java bytecode',
      'Class Loader',
      'Method Area',
      'Heap Memory',
      'Stack',
      'JIT Compiler',
      'Garbage Collection'
    ],
    expectedAnswer: 'JVM is the virtual machine that executes Java bytecode. Java code compiles to platform-independent bytecode. The Class Loader loads .class files. Method Area stores class structures. Heap stores objects. Stack handles method calls. JIT compiler converts hot bytecode to native code for performance. Garbage Collector manages memory automatically.',
    relatedTopics: ['Garbage Collection', 'Memory Management', 'ClassLoader'],
    followUpQuestions: [
      'What are the different memory areas in JVM?',
      'How does garbage collection work?',
      'What is the difference between JDK, JRE, and JVM?'
    ],
    hints: ['Think about compilation process', 'Consider memory organization'],
    tags: ['jvm', 'architecture', 'memory'],
    estimatedTime: 7
  }
];

// ============================================
// SAMPLE CODING QUESTIONS
// ============================================

export const SAMPLE_CODING_QUESTIONS: CodingQuestion[] = [
  {
    id: 'dsa-code-001',
    domain: 'dsa',
    topic: 'Arrays',
    difficulty: 'easy',
    type: 'coding',
    question: 'Write a function to find the maximum element in an array.',
    templateCode: `function findMax(arr) {
  // Your code here
  
}

// Test
console.log(findMax([3, 1, 4, 1, 5, 9, 2, 6]));`,
    testCases: [
      { id: 'tc1', input: '[3, 1, 4, 1, 5, 9, 2, 6]', expectedOutput: '9', description: 'Normal array' },
      { id: 'tc2', input: '[1]', expectedOutput: '1', description: 'Single element' },
      { id: 'tc3', input: '[-5, -2, -8, -1]', expectedOutput: '-1', description: 'All negative' },
      { id: 'tc4', input: '[5, 5, 5, 5]', expectedOutput: '5', description: 'All same' }
    ],
    solution: `function findMax(arr) {
  if (arr.length === 0) return null;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    languageSupport: ['javascript', 'python', 'java', 'cpp'],
    constraints: ['Array length: 1 to 10^5', 'Elements: -10^9 to 10^9'],
    hints: ['Initialize max with first element', 'Iterate through array once'],
    tags: ['arrays', 'iteration', 'basics'],
    estimatedTime: 5
  },
  {
    id: 'dsa-code-002',
    domain: 'dsa',
    topic: 'Linked Lists',
    difficulty: 'medium',
    type: 'coding',
    question: 'Reverse a singly linked list.',
    templateCode: `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  // Your code here
  
}`,
    testCases: [
      { id: 'tc1', input: '[1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]', description: 'Normal list' },
      { id: 'tc2', input: '[1,2]', expectedOutput: '[2,1]', description: 'Two elements' },
      { id: 'tc3', input: '[1]', expectedOutput: '[1]', description: 'Single element' },
      { id: 'tc4', input: '[]', expectedOutput: '[]', description: 'Empty list' }
    ],
    solution: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    languageSupport: ['javascript', 'python', 'java', 'cpp'],
    constraints: ['List length: 0 to 5000', 'Node values: -5000 to 5000'],
    hints: ['Use three pointers: prev, curr, next', 'Think about edge cases'],
    tags: ['linked-list', 'pointers', 'iteration'],
    estimatedTime: 15
  },
  {
    id: 'dsa-code-003',
    domain: 'dsa',
    topic: 'Dynamic Programming',
    difficulty: 'hard',
    type: 'coding',
    question: 'Given a string, find the length of the longest palindromic subsequence.',
    templateCode: `function longestPalindromeSubseq(s) {
  // Your code here
  
}

// Test
console.log(longestPalindromeSubseq("bbbab")); // Expected: 4`,
    testCases: [
      { id: 'tc1', input: '"bbbab"', expectedOutput: '4', description: 'Normal case (bbbb)' },
      { id: 'tc2', input: '"cbbd"', expectedOutput: '2', description: 'bb is LPS' },
      { id: 'tc3', input: '"a"', expectedOutput: '1', description: 'Single char' },
      { id: 'tc4', input: '"abcdef"', expectedOutput: '1', description: 'No repeating' }
    ],
    solution: `function longestPalindromeSubseq(s) {
  const n = s.length;
  const dp = Array(n).fill(null).map(() => Array(n).fill(0));
  
  for (let i = 0; i < n; i++) {
    dp[i][i] = 1;
  }
  
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }
  
  return dp[0][n - 1];
}`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(n²)',
    languageSupport: ['javascript', 'python', 'java', 'cpp'],
    constraints: ['String length: 1 to 1000', 'Only lowercase letters'],
    hints: ['Use 2D DP table', 'Compare characters at both ends', 'Build from smaller substrings'],
    tags: ['dynamic-programming', 'strings', 'palindrome'],
    estimatedTime: 30
  },
  {
    id: 'dbms-code-001',
    domain: 'dbms',
    topic: 'SQL Queries',
    difficulty: 'medium',
    type: 'coding',
    question: 'Write a SQL query to find the second highest salary from the Employees table.',
    templateCode: `-- Table: Employees (id, name, salary)
-- Write your SQL query here

SELECT ...`,
    testCases: [
      { id: 'tc1', input: 'Employees with salaries 100, 200, 300', expectedOutput: '200', description: 'Normal case' },
      { id: 'tc2', input: 'Employees with salaries 100, 100, 200', expectedOutput: '100', description: 'Duplicate max' },
      { id: 'tc3', input: 'Single employee', expectedOutput: 'NULL', description: 'No second highest' }
    ],
    solution: `SELECT MAX(salary) AS SecondHighestSalary
FROM Employees
WHERE salary < (SELECT MAX(salary) FROM Employees);

-- Alternative using DISTINCT and LIMIT
SELECT DISTINCT salary
FROM Employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    languageSupport: ['sql'],
    constraints: ['Table has at least 1 row'],
    hints: ['Use subquery for max', 'Consider DISTINCT for duplicates'],
    tags: ['sql', 'subquery', 'aggregation'],
    estimatedTime: 10
  },
  {
    id: 'python-code-001',
    domain: 'python',
    topic: 'List Comprehensions',
    difficulty: 'easy',
    type: 'coding',
    question: 'Using list comprehension, create a function that returns all even numbers squared from a given list.',
    templateCode: `def even_squares(numbers):
    # Your code here (use list comprehension)
    pass

# Test
print(even_squares([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))`,
    testCases: [
      { id: 'tc1', input: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]', expectedOutput: '[4, 16, 36, 64, 100]', description: 'Normal case' },
      { id: 'tc2', input: '[1, 3, 5, 7]', expectedOutput: '[]', description: 'No evens' },
      { id: 'tc3', input: '[2, 4, 6]', expectedOutput: '[4, 16, 36]', description: 'All evens' }
    ],
    solution: `def even_squares(numbers):
    return [x**2 for x in numbers if x % 2 == 0]`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    languageSupport: ['python'],
    constraints: ['List length up to 1000', 'Integers only'],
    hints: ['Use conditional in list comprehension', 'x % 2 == 0 checks even'],
    tags: ['list-comprehension', 'filtering', 'basics'],
    estimatedTime: 5
  },
  {
    id: 'java-code-001',
    domain: 'java',
    topic: 'Collections Framework',
    difficulty: 'medium',
    type: 'coding',
    question: 'Implement a method to find the frequency of each word in a sentence using HashMap.',
    templateCode: `import java.util.*;

public class WordFrequency {
    public static Map<String, Integer> countWords(String sentence) {
        // Your code here
        
    }
    
    public static void main(String[] args) {
        String test = "the quick brown fox jumps over the lazy dog the";
        System.out.println(countWords(test));
    }
}`,
    testCases: [
      { id: 'tc1', input: '"the quick brown fox jumps over the lazy dog the"', expectedOutput: '{the=3, quick=1, ...}', description: 'Normal sentence' },
      { id: 'tc2', input: '"hello hello hello"', expectedOutput: '{hello=3}', description: 'Same word' },
      { id: 'tc3', input: '""', expectedOutput: '{}', description: 'Empty string' }
    ],
    solution: `public static Map<String, Integer> countWords(String sentence) {
    Map<String, Integer> frequency = new HashMap<>();
    if (sentence == null || sentence.isEmpty()) {
        return frequency;
    }
    String[] words = sentence.toLowerCase().split("\\\\s+");
    for (String word : words) {
        frequency.put(word, frequency.getOrDefault(word, 0) + 1);
    }
    return frequency;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k) where k is unique words',
    languageSupport: ['java'],
    constraints: ['Sentence length up to 10000', 'Words separated by spaces'],
    hints: ['Use split() to tokenize', 'Use getOrDefault() for clean counting'],
    tags: ['hashmap', 'collections', 'strings'],
    estimatedTime: 15
  }
];

// ============================================
// SAMPLE DEBUGGING QUESTIONS
// ============================================

export const SAMPLE_DEBUGGING_QUESTIONS: DebuggingQuestion[] = [
  {
    id: 'dsa-debug-001',
    domain: 'dsa',
    topic: 'Arrays',
    difficulty: 'easy',
    type: 'debugging',
    question: 'Fix the binary search implementation below. It has a subtle bug that can cause issues.',
    buggyCode: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length;
  
  while (left < right) {
    let mid = (left + right) / 2;
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid;
    } else {
      right = mid;
    }
  }
  
  return -1;
}`,
    bugs: [
      {
        lineNumber: 3,
        bugType: 'logic',
        description: 'right should be arr.length - 1 for inclusive bounds',
        hint: 'Check array bounds'
      },
      {
        lineNumber: 6,
        bugType: 'logic',
        description: 'Integer division not used, should use Math.floor()',
        hint: 'mid could be a floating point'
      },
      {
        lineNumber: 11,
        bugType: 'logic',
        description: 'left = mid can cause infinite loop, should be left = mid + 1',
        hint: 'What happens when left and right are adjacent?'
      }
    ],
    fixedCode: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`,
    errorType: 'logic',
    language: 'javascript',
    hints: ['Check the loop condition', 'Think about how mid is calculated', 'Consider infinite loop scenarios'],
    tags: ['binary-search', 'off-by-one', 'infinite-loop'],
    estimatedTime: 10
  },
  {
    id: 'oops-debug-001',
    domain: 'oops',
    topic: 'Inheritance',
    difficulty: 'medium',
    type: 'debugging',
    question: 'Fix the following code that demonstrates inheritance and method overriding.',
    buggyCode: `class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + " makes a sound.");
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    this.breed = breed;
    super(name);
  }
  
  speak() {
    console.log(this.name + " barks.");
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
dog.speak();`,
    bugs: [
      {
        lineNumber: 14,
        bugType: 'syntax',
        description: 'super() must be called before using this in constructor',
        hint: 'Check the order of super() call'
      }
    ],
    fixedCode: `class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + " makes a sound.");
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() {
    console.log(this.name + " barks.");
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
dog.speak();`,
    errorType: 'syntax',
    language: 'javascript',
    hints: ['Check constructor order', 'super() must come first'],
    tags: ['inheritance', 'constructor', 'super'],
    estimatedTime: 8
  },
  {
    id: 'python-debug-001',
    domain: 'python',
    topic: 'Generators',
    difficulty: 'medium',
    type: 'debugging',
    question: 'Fix the generator function that should yield Fibonacci numbers.',
    buggyCode: `def fibonacci(n):
    a, b = 0, 1
    count = 0
    while count < n:
        return a
        a, b = b, a + b
        count += 1

# Should print first 10 Fibonacci numbers
for num in fibonacci(10):
    print(num)`,
    bugs: [
      {
        lineNumber: 5,
        bugType: 'logic',
        description: 'Should use yield instead of return for generator',
        hint: 'What keyword makes a function a generator?'
      }
    ],
    fixedCode: `def fibonacci(n):
    a, b = 0, 1
    count = 0
    while count < n:
        yield a
        a, b = b, a + b
        count += 1

# Should print first 10 Fibonacci numbers
for num in fibonacci(10):
    print(num)`,
    errorType: 'logic',
    language: 'python',
    hints: ['return vs yield', 'Generators use yield to produce values'],
    tags: ['generators', 'iteration', 'yield'],
    estimatedTime: 8
  },
  {
    id: 'cpp-debug-001',
    domain: 'cpp',
    topic: 'Memory Management',
    difficulty: 'hard',
    type: 'debugging',
    question: 'Fix the memory-related issues in this C++ code.',
    buggyCode: `#include <iostream>
using namespace std;

class Array {
    int* data;
    int size;
public:
    Array(int n) {
        size = n;
        data = new int[n];
    }
    
    void set(int index, int value) {
        data[index] = value;
    }
    
    int get(int index) {
        return data[index];
    }
};

int main() {
    Array arr(5);
    for (int i = 0; i < 5; i++) {
        arr.set(i, i * 10);
    }
    
    Array arr2 = arr;  // Problem here
    cout << arr2.get(0) << endl;
    
    return 0;
}`,
    bugs: [
      {
        lineNumber: 4,
        bugType: 'runtime',
        description: 'Missing destructor causes memory leak',
        hint: 'new without delete'
      },
      {
        lineNumber: 4,
        bugType: 'runtime',
        description: 'Missing copy constructor causes shallow copy',
        hint: 'What happens when arr is copied to arr2?'
      },
      {
        lineNumber: 4,
        bugType: 'runtime',
        description: 'Missing copy assignment operator',
        hint: 'Rule of Three in C++'
      }
    ],
    fixedCode: `#include <iostream>
using namespace std;

class Array {
    int* data;
    int size;
public:
    Array(int n) : size(n), data(new int[n]) {}
    
    // Destructor
    ~Array() {
        delete[] data;
    }
    
    // Copy constructor
    Array(const Array& other) : size(other.size), data(new int[other.size]) {
        for (int i = 0; i < size; i++) {
            data[i] = other.data[i];
        }
    }
    
    // Copy assignment operator
    Array& operator=(const Array& other) {
        if (this != &other) {
            delete[] data;
            size = other.size;
            data = new int[size];
            for (int i = 0; i < size; i++) {
                data[i] = other.data[i];
            }
        }
        return *this;
    }
    
    void set(int index, int value) {
        data[index] = value;
    }
    
    int get(int index) {
        return data[index];
    }
};

int main() {
    Array arr(5);
    for (int i = 0; i < 5; i++) {
        arr.set(i, i * 10);
    }
    
    Array arr2 = arr;
    cout << arr2.get(0) << endl;
    
    return 0;
}`,
    errorType: 'runtime',
    language: 'cpp',
    hints: ['Rule of Three', 'Deep vs Shallow copy', 'Memory management'],
    tags: ['memory', 'raii', 'copy-constructor'],
    estimatedTime: 20
  }
];

// ============================================
// FOLLOW-UP QUESTION CHAINS
// ============================================

export const FOLLOW_UP_CHAINS: Record<string, string[]> = {
  'quick-sort': [
    'What is the worst-case time complexity of Quick Sort and when does it occur?',
    'How can you modify Quick Sort to avoid worst-case performance?',
    'What is the difference between Lomuto and Hoare partition schemes?',
    'How does Quick Sort compare to Merge Sort in terms of space complexity?',
    'Can you implement a 3-way Quick Sort? When would you use it?'
  ],
  'normalization': [
    'What is the difference between 2NF and 3NF?',
    'What is a functional dependency?',
    'When would you denormalize a database?',
    'What is BCNF and how does it differ from 3NF?',
    'Give an example of a table in 2NF but not 3NF.'
  ],
  'deadlock': [
    'Explain the Banker\'s algorithm in detail.',
    'What is the difference between deadlock prevention and avoidance?',
    'How can you detect a deadlock using a resource allocation graph?',
    'What is the difference between starvation and deadlock?',
    'In which real-world scenarios have you encountered or could encounter deadlocks?'
  ],
  'polymorphism': [
    'What is a virtual table (vtable) and how does it work?',
    'Can constructors be virtual? Why or why not?',
    'What is the difference between overloading and overriding?',
    'How does polymorphism help in achieving loose coupling?',
    'What is RTTI (Runtime Type Information)?'
  ],
  'closures': [
    'What is the module pattern and how does it use closures?',
    'How do closures relate to memory leaks in JavaScript?',
    'What is the difference between scope and closure?',
    'Explain IIFE (Immediately Invoked Function Expression).',
    'How would you create private variables in JavaScript using closures?'
  ]
};

// ============================================
// DIFFICULTY PROGRESSION RULES
// ============================================

export const DIFFICULTY_RULES = {
  promotion: {
    minScore: 80,
    minAttempts: 5,
    consecutiveCorrect: 3
  },
  demotion: {
    maxScore: 40,
    consecutiveWrong: 3
  },
  weights: {
    easy: { concept: 1, coding: 5, debugging: 3 },
    medium: { concept: 2, coding: 10, debugging: 6 },
    hard: { concept: 3, coding: 15, debugging: 10 }
  }
};

// ============================================
// SCORING CRITERIA
// ============================================

export const SCORING_CRITERIA = {
  concept: {
    coverage: 40,      // % of key points covered
    depth: 25,         // Explanation depth
    clarity: 20,       // Clear communication
    examples: 15       // Practical examples given
  },
  coding: {
    correctness: 50,   // Test cases passed
    efficiency: 25,    // Time/space complexity
    codeQuality: 15,   // Clean code practices
    edgeCases: 10      // Handling edge cases
  },
  debugging: {
    bugsFound: 40,     // Identified all bugs
    correctFixes: 40,  // Fixed correctly
    explanation: 20    // Understanding of why
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getDomainConfig(domain: TechnicalDomain): DomainConfig {
  return DOMAIN_CONFIGS[domain];
}

export function getQuestionsByDomain(domain: TechnicalDomain): {
  conceptual: ConceptualQuestion[];
  coding: CodingQuestion[];
  debugging: DebuggingQuestion[];
} {
  return {
    conceptual: SAMPLE_CONCEPTUAL_QUESTIONS.filter(q => q.domain === domain),
    coding: SAMPLE_CODING_QUESTIONS.filter(q => q.domain === domain),
    debugging: SAMPLE_DEBUGGING_QUESTIONS.filter(q => q.domain === domain)
  };
}

export function getQuestionsByDifficulty(difficulty: DifficultyLevel) {
  return {
    conceptual: SAMPLE_CONCEPTUAL_QUESTIONS.filter(q => q.difficulty === difficulty),
    coding: SAMPLE_CODING_QUESTIONS.filter(q => q.difficulty === difficulty),
    debugging: SAMPLE_DEBUGGING_QUESTIONS.filter(q => q.difficulty === difficulty)
  };
}

export function getAllDomains(): TechnicalDomain[] {
  return Object.keys(DOMAIN_CONFIGS) as TechnicalDomain[];
}

export function getProgrammingLanguageDomains(): TechnicalDomain[] {
  return ['c', 'cpp', 'java', 'python', 'javascript'];
}

export function getCoreDomains(): TechnicalDomain[] {
  return ['dsa', 'dbms', 'os', 'oops', 'networks'];
}
