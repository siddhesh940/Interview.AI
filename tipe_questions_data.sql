-- =====================================================
-- TECHNICAL INTERVIEW PRACTICE ENGINE (TIPE) QUESTIONS
-- Total: 200 Questions (20 per domain)
-- Domains: DSA, DBMS, OS, OOPs, CN, C, C++, Java, Python, JavaScript
-- =====================================================

-- First, create the questions table if not exists
CREATE TABLE IF NOT EXISTS tipe_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    domain VARCHAR(50) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('mcq', 'coding', 'conceptual')),
    question TEXT NOT NULL,
    option_a TEXT,
    option_b TEXT,
    option_c TEXT,
    option_d TEXT,
    correct_answer VARCHAR(1) CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
    explanation TEXT,
    code_template TEXT,
    test_cases JSONB,
    solution TEXT,
    time_complexity VARCHAR(50),
    space_complexity VARCHAR(50),
    hints TEXT[],
    tags TEXT[],
    estimated_time_minutes INT DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_tipe_questions_domain ON tipe_questions(domain);
CREATE INDEX IF NOT EXISTS idx_tipe_questions_difficulty ON tipe_questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_tipe_questions_topic ON tipe_questions(topic);

-- =====================================================
-- 1. DATA STRUCTURES & ALGORITHMS (DSA) - 20 Questions
-- =====================================================

INSERT INTO tipe_questions (domain, topic, difficulty, question_type, question, option_a, option_b, option_c, option_d, correct_answer, explanation, tags, estimated_time_minutes) VALUES

-- DSA Question 1
('dsa', 'Arrays', 'easy', 'mcq', 
'What is the time complexity of accessing an element in an array by its index?',
'O(1)', 'O(n)', 'O(log n)', 'O(n²)',
'A', 
'Arrays provide constant time O(1) access because elements are stored in contiguous memory locations. The address of any element can be calculated directly using the base address and index.',
ARRAY['arrays', 'time-complexity', 'basics'], 2),

-- DSA Question 2
('dsa', 'Arrays', 'medium', 'mcq',
'Which algorithm is used to find the maximum subarray sum?',
'Binary Search', 'Kadane''s Algorithm', 'Quick Sort', 'Dijkstra''s Algorithm',
'B',
'Kadane''s Algorithm finds the maximum subarray sum in O(n) time by keeping track of the maximum sum ending at each position and the overall maximum sum.',
ARRAY['arrays', 'dynamic-programming', 'kadane'], 3),

-- DSA Question 3
('dsa', 'Linked Lists', 'easy', 'mcq',
'What is the time complexity of inserting a node at the beginning of a singly linked list?',
'O(1)', 'O(n)', 'O(log n)', 'O(n²)',
'A',
'Inserting at the beginning only requires updating the head pointer and the new node''s next pointer, which takes constant time O(1).',
ARRAY['linked-list', 'insertion', 'time-complexity'], 2),

-- DSA Question 4
('dsa', 'Linked Lists', 'medium', 'mcq',
'How do you detect a cycle in a linked list efficiently?',
'Use extra array to store visited nodes', 'Floyd''s Cycle Detection (Tortoise and Hare)', 'Compare each node with all others', 'Use recursion only',
'B',
'Floyd''s Cycle Detection uses two pointers moving at different speeds. If there''s a cycle, the fast pointer will eventually meet the slow pointer. Time: O(n), Space: O(1).',
ARRAY['linked-list', 'cycle-detection', 'two-pointers'], 3),

-- DSA Question 5
('dsa', 'Stacks', 'easy', 'mcq',
'Which data structure is used for function call management in programming?',
'Queue', 'Stack', 'Array', 'Tree',
'B',
'Stack is used for function call management (Call Stack). When a function is called, its execution context is pushed onto the stack, and popped when it returns (LIFO principle).',
ARRAY['stack', 'call-stack', 'recursion'], 2),

-- DSA Question 6
('dsa', 'Stacks', 'medium', 'mcq',
'What is the result of the postfix expression: 5 3 + 8 2 - * ?',
'48', '24', '16', '40',
'A',
'Step by step: 5+3=8, 8-2=6, 8*6=48. In postfix, operators work on the two most recent operands.',
ARRAY['stack', 'postfix', 'expression-evaluation'], 4),

-- DSA Question 7
('dsa', 'Queues', 'easy', 'mcq',
'Which scheduling algorithm uses a Queue data structure?',
'LIFO Scheduling', 'Round Robin', 'Stack-based Scheduling', 'Heap Sort',
'B',
'Round Robin scheduling uses a circular queue where each process gets a fixed time quantum. Processes are added to the back and executed from the front.',
ARRAY['queue', 'scheduling', 'round-robin'], 2),

-- DSA Question 8
('dsa', 'Trees', 'medium', 'mcq',
'What is the maximum number of nodes at level k in a binary tree?',
'2^k', '2^(k-1)', '2^(k+1)', 'k^2',
'A',
'At level k (starting from 0), maximum nodes = 2^k. Level 0 has 1 node (2^0), Level 1 has 2 nodes (2^1), Level 2 has 4 nodes (2^2), and so on.',
ARRAY['binary-tree', 'tree-properties', 'mathematics'], 3),

-- DSA Question 9
('dsa', 'Trees', 'medium', 'mcq',
'Which traversal of a Binary Search Tree gives elements in sorted order?',
'Preorder', 'Postorder', 'Inorder', 'Level order',
'C',
'Inorder traversal (Left-Root-Right) of a BST always produces elements in ascending sorted order because left subtree contains smaller elements and right subtree contains larger elements.',
ARRAY['bst', 'tree-traversal', 'inorder'], 3),

-- DSA Question 10
('dsa', 'Graphs', 'medium', 'mcq',
'Which algorithm is used to find the shortest path in an unweighted graph?',
'Dijkstra''s Algorithm', 'Bellman-Ford Algorithm', 'BFS (Breadth First Search)', 'DFS (Depth First Search)',
'C',
'BFS finds shortest path in unweighted graphs because it explores nodes level by level. The first time a node is visited, it''s via the shortest path.',
ARRAY['graph', 'bfs', 'shortest-path'], 3),

-- DSA Question 11
('dsa', 'Graphs', 'hard', 'mcq',
'What is the time complexity of Dijkstra''s algorithm using a min-heap?',
'O(V²)', 'O(E log V)', 'O(V + E)', 'O(V log E)',
'B',
'With a min-heap (priority queue), Dijkstra''s has O(E log V) complexity. Each edge is processed once (O(E)) and each heap operation takes O(log V).',
ARRAY['graph', 'dijkstra', 'time-complexity'], 4),

-- DSA Question 12
('dsa', 'Sorting', 'easy', 'mcq',
'Which sorting algorithm has the best average-case time complexity?',
'Bubble Sort - O(n²)', 'Selection Sort - O(n²)', 'Quick Sort - O(n log n)', 'Insertion Sort - O(n²)',
'C',
'Quick Sort has O(n log n) average case complexity. It uses divide-and-conquer by selecting a pivot and partitioning the array around it.',
ARRAY['sorting', 'quicksort', 'time-complexity'], 2),

-- DSA Question 13
('dsa', 'Sorting', 'medium', 'mcq',
'Which sorting algorithm is stable and has O(n log n) worst-case complexity?',
'Quick Sort', 'Heap Sort', 'Merge Sort', 'Selection Sort',
'C',
'Merge Sort is stable (maintains relative order of equal elements) and guarantees O(n log n) in all cases. Quick Sort is not stable and has O(n²) worst case.',
ARRAY['sorting', 'mergesort', 'stability'], 3),

-- DSA Question 14
('dsa', 'Searching', 'easy', 'mcq',
'What is the prerequisite for Binary Search?',
'Array must be of fixed size', 'Array must be sorted', 'Array must contain unique elements', 'Array must be dynamically allocated',
'B',
'Binary Search requires the array to be sorted. It works by repeatedly dividing the search interval in half based on comparison with the middle element.',
ARRAY['searching', 'binary-search', 'prerequisites'], 2),

-- DSA Question 15
('dsa', 'Hashing', 'medium', 'mcq',
'What is the average time complexity of search operation in a Hash Table?',
'O(n)', 'O(log n)', 'O(1)', 'O(n log n)',
'C',
'Hash tables provide O(1) average case for search, insert, and delete operations. The key is directly mapped to an index using a hash function.',
ARRAY['hashing', 'hash-table', 'time-complexity'], 3),

-- DSA Question 16
('dsa', 'Dynamic Programming', 'medium', 'mcq',
'What are the two main properties required for a problem to be solved using Dynamic Programming?',
'Sorting and Searching', 'Optimal Substructure and Overlapping Subproblems', 'Divide and Conquer', 'Greedy Choice and Local Optimal',
'B',
'DP requires: 1) Optimal Substructure - optimal solution can be constructed from optimal solutions of subproblems, 2) Overlapping Subproblems - same subproblems are solved multiple times.',
ARRAY['dynamic-programming', 'optimization', 'theory'], 4),

-- DSA Question 17
('dsa', 'Dynamic Programming', 'hard', 'mcq',
'What is the time complexity of the 0/1 Knapsack problem using dynamic programming?',
'O(n)', 'O(n × W)', 'O(2^n)', 'O(n²)',
'B',
'The DP solution for 0/1 Knapsack has O(n × W) time complexity where n is the number of items and W is the knapsack capacity. It fills an n×W table.',
ARRAY['dynamic-programming', 'knapsack', 'time-complexity'], 4),

-- DSA Question 18
('dsa', 'Recursion', 'easy', 'mcq',
'What is the base case in a recursive function?',
'The recursive call itself', 'The condition that stops recursion', 'The function parameters', 'The return type',
'B',
'The base case is the condition that stops the recursion and prevents infinite calls. Without a proper base case, recursion leads to stack overflow.',
ARRAY['recursion', 'base-case', 'fundamentals'], 2),

-- DSA Question 19
('dsa', 'Heap', 'medium', 'mcq',
'In a max-heap, what is the relationship between parent and child nodes?',
'Parent > Children', 'Parent < Children', 'Parent = Children', 'No specific relationship',
'A',
'In a max-heap, every parent node is greater than or equal to its children. The maximum element is always at the root. Opposite for min-heap.',
ARRAY['heap', 'max-heap', 'tree-property'], 3),

-- DSA Question 20
('dsa', 'Trie', 'hard', 'mcq',
'What is the time complexity of searching a word of length L in a Trie?',
'O(n)', 'O(L)', 'O(log n)', 'O(n × L)',
'B',
'Trie search takes O(L) time where L is the length of the word being searched. Each character lookup takes O(1) time, and we traverse L levels.',
ARRAY['trie', 'string-search', 'time-complexity'], 4);


-- =====================================================
-- 2. DATABASE MANAGEMENT SYSTEMS (DBMS) - 20 Questions
-- =====================================================

INSERT INTO tipe_questions (domain, topic, difficulty, question_type, question, option_a, option_b, option_c, option_d, correct_answer, explanation, tags, estimated_time_minutes) VALUES

-- DBMS Question 1
('dbms', 'SQL Basics', 'easy', 'mcq',
'Which SQL command is used to retrieve data from a database?',
'INSERT', 'UPDATE', 'SELECT', 'DELETE',
'C',
'SELECT is used to retrieve/fetch data from one or more tables. It is the most commonly used SQL command for querying databases.',
ARRAY['sql', 'select', 'dml'], 2),

-- DBMS Question 2
('dbms', 'SQL Basics', 'easy', 'mcq',
'Which clause is used to filter records in SQL?',
'ORDER BY', 'WHERE', 'GROUP BY', 'HAVING',
'B',
'WHERE clause filters rows before grouping. It specifies conditions that rows must meet to be included in the result set.',
ARRAY['sql', 'where', 'filtering'], 2),

-- DBMS Question 3
('dbms', 'SQL Joins', 'medium', 'mcq',
'Which JOIN returns all rows from the left table and matched rows from the right table?',
'INNER JOIN', 'RIGHT JOIN', 'LEFT JOIN', 'FULL OUTER JOIN',
'C',
'LEFT JOIN (or LEFT OUTER JOIN) returns all rows from the left table, and the matched rows from the right table. Unmatched rows show NULL for right table columns.',
ARRAY['sql', 'joins', 'left-join'], 3),

-- DBMS Question 4
('dbms', 'SQL Joins', 'medium', 'mcq',
'What is the result of INNER JOIN?',
'All rows from both tables', 'Only matching rows from both tables', 'All rows from left table', 'All rows from right table',
'B',
'INNER JOIN returns only the rows that have matching values in both tables. It is the most common type of join and excludes non-matching rows.',
ARRAY['sql', 'joins', 'inner-join'], 3),

-- DBMS Question 5
('dbms', 'Normalization', 'medium', 'mcq',
'A relation is in 3NF if it is in 2NF and has no:',
'Partial dependencies', 'Transitive dependencies', 'Multivalued dependencies', 'Functional dependencies',
'B',
'Third Normal Form (3NF) requires: 1) Table is in 2NF, 2) No transitive dependencies (non-prime attribute depending on another non-prime attribute).',
ARRAY['normalization', '3nf', 'database-design'], 4),

-- DBMS Question 6
('dbms', 'Normalization', 'hard', 'mcq',
'Which normal form deals with multi-valued dependencies?',
'2NF', '3NF', 'BCNF', '4NF',
'D',
'Fourth Normal Form (4NF) deals with multi-valued dependencies. A table is in 4NF if it is in BCNF and has no multi-valued dependencies.',
ARRAY['normalization', '4nf', 'mvd'], 4),

-- DBMS Question 7
('dbms', 'ACID Properties', 'medium', 'mcq',
'Which ACID property ensures that a transaction is treated as a single unit?',
'Atomicity', 'Consistency', 'Isolation', 'Durability',
'A',
'Atomicity ensures that a transaction is treated as a single, indivisible unit. Either all operations complete successfully, or none of them do (all-or-nothing).',
ARRAY['acid', 'transactions', 'atomicity'], 3),

-- DBMS Question 8
('dbms', 'ACID Properties', 'medium', 'mcq',
'Which property ensures that committed transactions are permanently saved?',
'Atomicity', 'Consistency', 'Isolation', 'Durability',
'D',
'Durability guarantees that once a transaction is committed, its changes are permanent and survive system failures. Usually achieved through write-ahead logging.',
ARRAY['acid', 'transactions', 'durability'], 3),

-- DBMS Question 9
('dbms', 'Keys', 'easy', 'mcq',
'A column that uniquely identifies each row in a table is called:',
'Foreign Key', 'Primary Key', 'Candidate Key', 'Composite Key',
'B',
'Primary Key uniquely identifies each record in a table. It cannot contain NULL values and must be unique. A table can have only one primary key.',
ARRAY['keys', 'primary-key', 'constraints'], 2),

-- DBMS Question 10
('dbms', 'Keys', 'medium', 'mcq',
'A key that references the primary key of another table is called:',
'Primary Key', 'Candidate Key', 'Foreign Key', 'Super Key',
'C',
'Foreign Key is a column (or set of columns) that references the primary key of another table. It establishes a relationship between two tables and ensures referential integrity.',
ARRAY['keys', 'foreign-key', 'relationships'], 3),

-- DBMS Question 11
('dbms', 'Indexing', 'medium', 'mcq',
'Which type of index stores data in sorted order and is efficient for range queries?',
'Hash Index', 'B-Tree Index', 'Bitmap Index', 'Full-text Index',
'B',
'B-Tree indexes store data in sorted order, making them efficient for range queries, equality searches, and ordered retrievals. Most commonly used index type.',
ARRAY['indexing', 'b-tree', 'query-optimization'], 3),

-- DBMS Question 12
('dbms', 'Indexing', 'hard', 'mcq',
'What is the time complexity of search in a B+ Tree index with n records?',
'O(n)', 'O(log n)', 'O(1)', 'O(n log n)',
'B',
'B+ Tree provides O(log n) search time. The height of the tree is logarithmic to the number of records, and each level requires one disk I/O.',
ARRAY['indexing', 'b-plus-tree', 'time-complexity'], 4),

-- DBMS Question 13
('dbms', 'Transactions', 'medium', 'mcq',
'What problem occurs when a transaction reads uncommitted data from another transaction?',
'Lost Update', 'Dirty Read', 'Non-repeatable Read', 'Phantom Read',
'B',
'Dirty Read occurs when Transaction A reads data modified by Transaction B before B commits. If B rolls back, A has read invalid/dirty data.',
ARRAY['transactions', 'isolation', 'dirty-read'], 3),

-- DBMS Question 14
('dbms', 'Transactions', 'hard', 'mcq',
'Which isolation level prevents all concurrency problems including phantom reads?',
'READ UNCOMMITTED', 'READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE',
'D',
'SERIALIZABLE is the highest isolation level. It prevents dirty reads, non-repeatable reads, and phantom reads by ensuring transactions execute as if they were serial.',
ARRAY['transactions', 'isolation-levels', 'serializable'], 4),

-- DBMS Question 15
('dbms', 'SQL Aggregates', 'easy', 'mcq',
'Which SQL function returns the number of rows in a table?',
'SUM()', 'AVG()', 'COUNT()', 'MAX()',
'C',
'COUNT() returns the number of rows that match a specified criterion. COUNT(*) counts all rows, COUNT(column) counts non-NULL values in that column.',
ARRAY['sql', 'aggregate-functions', 'count'], 2),

-- DBMS Question 16
('dbms', 'SQL Subqueries', 'medium', 'mcq',
'What type of subquery returns a single value?',
'Scalar Subquery', 'Correlated Subquery', 'Nested Subquery', 'Inline View',
'A',
'A Scalar Subquery returns exactly one value (one row, one column). It can be used anywhere a single value is expected, like in SELECT or WHERE clauses.',
ARRAY['sql', 'subquery', 'scalar'], 3),

-- DBMS Question 17
('dbms', 'Views', 'medium', 'mcq',
'What is a View in SQL?',
'A copy of a table', 'A virtual table based on a query', 'A backup of data', 'An index structure',
'B',
'A View is a virtual table based on the result set of a SQL query. It does not store data physically but provides a way to simplify complex queries and enhance security.',
ARRAY['sql', 'views', 'virtual-table'], 3),

-- DBMS Question 18
('dbms', 'Stored Procedures', 'medium', 'mcq',
'What is the main advantage of using Stored Procedures?',
'They increase database size', 'They reduce network traffic and improve performance', 'They make debugging harder', 'They cannot be reused',
'B',
'Stored Procedures reduce network traffic (SQL sent once, executed multiple times), improve performance (precompiled), enhance security, and promote code reuse.',
ARRAY['stored-procedures', 'performance', 'security'], 3),

-- DBMS Question 19
('dbms', 'ER Model', 'easy', 'mcq',
'In an ER diagram, an entity is represented by:',
'Diamond', 'Rectangle', 'Oval', 'Line',
'B',
'In ER diagrams: Rectangle = Entity, Oval = Attribute, Diamond = Relationship, Line = connects entities to relationships/attributes.',
ARRAY['er-model', 'entity', 'database-design'], 2),

-- DBMS Question 20
('dbms', 'Deadlock', 'hard', 'mcq',
'Which technique is NOT used for deadlock handling in DBMS?',
'Deadlock Prevention', 'Deadlock Detection', 'Deadlock Avoidance', 'Deadlock Compilation',
'D',
'Deadlock handling techniques include: Prevention (ensure one condition never holds), Detection (detect and recover), Avoidance (use algorithms like Banker''s). "Compilation" is not a deadlock handling technique.',
ARRAY['deadlock', 'concurrency', 'transactions'], 4);


-- =====================================================
-- 3. OPERATING SYSTEMS (OS) - 20 Questions
-- =====================================================

INSERT INTO tipe_questions (domain, topic, difficulty, question_type, question, option_a, option_b, option_c, option_d, correct_answer, explanation, tags, estimated_time_minutes) VALUES

-- OS Question 1
('os', 'Process Management', 'easy', 'mcq',
'What is a process in an operating system?',
'A file stored on disk', 'A program in execution', 'A hardware component', 'An input device',
'B',
'A process is a program in execution. It includes the program code, current activity (program counter), stack, data section, and heap. A program becomes a process when loaded into memory.',
ARRAY['process', 'basics', 'fundamentals'], 2),

-- OS Question 2
('os', 'Process States', 'easy', 'mcq',
'Which of the following is NOT a process state?',
'Ready', 'Running', 'Waiting', 'Deleted',
'D',
'The main process states are: New, Ready, Running, Waiting (Blocked), and Terminated. "Deleted" is not a standard process state.',
ARRAY['process', 'process-states', 'lifecycle'], 2),

-- OS Question 3
('os', 'CPU Scheduling', 'medium', 'mcq',
'Which CPU scheduling algorithm may cause starvation?',
'Round Robin', 'First Come First Serve', 'Shortest Job First', 'All of the above',
'C',
'Shortest Job First (SJF) can cause starvation for longer processes if shorter processes keep arriving. A long process may wait indefinitely.',
ARRAY['scheduling', 'sjf', 'starvation'], 3),

-- OS Question 4
('os', 'CPU Scheduling', 'medium', 'mcq',
'In Round Robin scheduling, what happens when a process''s time quantum expires?',
'Process is terminated', 'Process is moved to the end of ready queue', 'Process continues execution', 'Process is blocked',
'B',
'In Round Robin, when a process''s time quantum expires, it is preempted and moved to the end of the ready queue. The next process in the queue gets the CPU.',
ARRAY['scheduling', 'round-robin', 'preemption'], 3),

-- OS Question 5
('os', 'Threads', 'medium', 'mcq',
'What is shared between threads of the same process?',
'Stack', 'Registers', 'Code and Data sections', 'Program Counter',
'C',
'Threads of the same process share: Code section, Data section, Heap, and Open files. Each thread has its own: Stack, Registers, and Program Counter.',
ARRAY['threads', 'multithreading', 'shared-resources'], 3),

-- OS Question 6
('os', 'Deadlock', 'medium', 'mcq',
'Which is NOT a necessary condition for deadlock?',
'Mutual Exclusion', 'Hold and Wait', 'Preemption', 'Circular Wait',
'C',
'The four necessary conditions for deadlock are: Mutual Exclusion, Hold and Wait, No Preemption (not Preemption), and Circular Wait. All four must hold for deadlock to occur.',
ARRAY['deadlock', 'conditions', 'mutual-exclusion'], 3),

-- OS Question 7
('os', 'Deadlock', 'hard', 'mcq',
'In Banker''s Algorithm, the system is in a safe state if:',
'All processes are blocked', 'There exists a safe sequence', 'No resources are available', 'All processes have finished',
'B',
'A system is in a safe state if there exists a safe sequence of processes where each process can get its maximum required resources, complete, and release resources for others.',
ARRAY['deadlock', 'bankers-algorithm', 'safe-state'], 4),

-- OS Question 8
('os', 'Memory Management', 'easy', 'mcq',
'Which memory management technique suffers from external fragmentation?',
'Paging', 'Segmentation', 'Virtual Memory', 'Cache Memory',
'B',
'Segmentation can suffer from external fragmentation because segments are variable-sized. Paging eliminates external fragmentation by using fixed-size pages.',
ARRAY['memory', 'segmentation', 'fragmentation'], 3),

-- OS Question 9
('os', 'Virtual Memory', 'medium', 'mcq',
'What is a page fault?',
'An error in page table', 'When a requested page is not in main memory', 'A hardware malfunction', 'Overflow of page table',
'B',
'A page fault occurs when a program accesses a page that is not currently in main memory (RAM). The OS must then load the page from disk.',
ARRAY['virtual-memory', 'page-fault', 'paging'], 3),

-- OS Question 10
('os', 'Page Replacement', 'medium', 'mcq',
'Which page replacement algorithm suffers from Belady''s Anomaly?',
'LRU (Least Recently Used)', 'FIFO (First In First Out)', 'Optimal', 'LFU (Least Frequently Used)',
'B',
'FIFO suffers from Belady''s Anomaly where increasing the number of page frames can increase page faults. Stack-based algorithms like LRU and Optimal do not have this anomaly.',
ARRAY['page-replacement', 'fifo', 'beladys-anomaly'], 4),

-- OS Question 11
('os', 'Page Replacement', 'hard', 'mcq',
'Which page replacement algorithm provides the minimum number of page faults?',
'FIFO', 'LRU', 'Optimal (OPT)', 'Random',
'C',
'Optimal (OPT/MIN) algorithm replaces the page that will not be used for the longest time in the future. It provides minimum page faults but requires future knowledge, making it impractical.',
ARRAY['page-replacement', 'optimal', 'comparison'], 4),

-- OS Question 12
('os', 'File Systems', 'easy', 'mcq',
'Which file allocation method provides direct access to any block?',
'Contiguous Allocation', 'Linked Allocation', 'Indexed Allocation', 'Both A and C',
'D',
'Both Contiguous and Indexed allocation support direct access. Contiguous uses simple calculation, Indexed uses index block. Linked allocation only supports sequential access.',
ARRAY['file-system', 'allocation', 'direct-access'], 3),

-- OS Question 13
('os', 'File Systems', 'medium', 'mcq',
'What is an inode in Unix file systems?',
'A file name', 'A data structure containing file metadata', 'A directory', 'A disk block',
'B',
'An inode is a data structure that stores file metadata: size, permissions, timestamps, owner, and pointers to data blocks. It does not store the file name.',
ARRAY['file-system', 'unix', 'inode'], 3),

-- OS Question 14
('os', 'Synchronization', 'medium', 'mcq',
'What is a semaphore in process synchronization?',
'A hardware device', 'An integer variable for synchronization', 'A type of process', 'A memory location',
'B',
'A semaphore is an integer variable used for process synchronization. It has two atomic operations: wait() (P) decrements it, and signal() (V) increments it.',
ARRAY['synchronization', 'semaphore', 'concurrent'], 3),

-- OS Question 15
('os', 'Synchronization', 'hard', 'mcq',
'What is the difference between a mutex and a binary semaphore?',
'No difference', 'Mutex has ownership concept, semaphore doesn''t', 'Semaphore is faster', 'Mutex can count, semaphore cannot',
'B',
'A mutex has ownership - only the thread that locked it can unlock it. A binary semaphore has no ownership - any thread can signal it. This affects their use cases.',
ARRAY['synchronization', 'mutex', 'semaphore'], 4),

-- OS Question 16
('os', 'Disk Scheduling', 'medium', 'mcq',
'Which disk scheduling algorithm may cause starvation?',
'FCFS', 'SSTF (Shortest Seek Time First)', 'SCAN', 'C-SCAN',
'B',
'SSTF can cause starvation for requests far from the current head position if requests near the head keep arriving. SCAN and C-SCAN prevent starvation.',
ARRAY['disk-scheduling', 'sstf', 'starvation'], 3),

-- OS Question 17
('os', 'System Calls', 'easy', 'mcq',
'What is a system call?',
'A call between two processes', 'An interface between user program and OS kernel', 'A function call within a program', 'A hardware interrupt',
'B',
'A system call is the programmatic interface through which a user program requests services from the operating system kernel, like file operations, process control, etc.',
ARRAY['system-calls', 'kernel', 'interface'], 2),

-- OS Question 18
('os', 'Interrupts', 'medium', 'mcq',
'What happens when an interrupt occurs?',
'CPU continues current execution', 'CPU saves state and jumps to interrupt handler', 'System shuts down', 'All processes are terminated',
'B',
'When an interrupt occurs, the CPU: 1) Saves current state (PC, registers) 2) Identifies interrupt type 3) Jumps to appropriate interrupt handler 4) Resumes original execution after handling.',
ARRAY['interrupts', 'interrupt-handling', 'cpu'], 3),

-- OS Question 19
('os', 'Process Synchronization', 'hard', 'mcq',
'What is the Producer-Consumer problem also known as?',
'Dining Philosophers Problem', 'Bounded Buffer Problem', 'Readers-Writers Problem', 'Sleeping Barber Problem',
'B',
'The Producer-Consumer problem is also called the Bounded Buffer problem. Producers add items to a buffer, consumers remove them. Synchronization is needed to prevent overflow/underflow.',
ARRAY['synchronization', 'producer-consumer', 'bounded-buffer'], 4),

-- OS Question 20
('os', 'Kernel', 'medium', 'mcq',
'What is the difference between monolithic kernel and microkernel?',
'No difference', 'Monolithic has all services in kernel space, microkernel has minimal services', 'Microkernel is larger', 'Monolithic uses less memory',
'B',
'Monolithic kernel runs all OS services (file system, networking, drivers) in kernel space. Microkernel keeps only essential services in kernel, others run in user space as servers.',
ARRAY['kernel', 'monolithic', 'microkernel'], 4);


-- =====================================================
-- 4. OBJECT ORIENTED PROGRAMMING (OOPs) - 20 Questions
-- =====================================================

INSERT INTO tipe_questions (domain, topic, difficulty, question_type, question, option_a, option_b, option_c, option_d, correct_answer, explanation, tags, estimated_time_minutes) VALUES

-- OOPs Question 1
('oops', 'Basics', 'easy', 'mcq',
'What are the four main pillars of Object-Oriented Programming?',
'Classes, Objects, Methods, Attributes', 'Encapsulation, Inheritance, Polymorphism, Abstraction', 'Variables, Functions, Loops, Conditions', 'Arrays, Pointers, Structures, Unions',
'B',
'The four pillars of OOP are: 1) Encapsulation - bundling data and methods 2) Inheritance - deriving new classes 3) Polymorphism - many forms 4) Abstraction - hiding complexity.',
ARRAY['oops', 'pillars', 'fundamentals'], 2),

-- OOPs Question 2
('oops', 'Classes and Objects', 'easy', 'mcq',
'What is the relationship between a class and an object?',
'Object is a blueprint for class', 'Class is an instance of object', 'Class is a blueprint, object is an instance', 'They are the same thing',
'C',
'A class is a blueprint/template that defines properties and behaviors. An object is an instance of a class - a concrete entity created from the blueprint with actual values.',
ARRAY['class', 'object', 'instance'], 2),

-- OOPs Question 3
('oops', 'Encapsulation', 'medium', 'mcq',
'Which access modifier provides the highest level of encapsulation?',
'public', 'protected', 'private', 'default',
'C',
'Private provides the highest encapsulation - members are only accessible within the same class. This hides implementation details and protects data from external modification.',
ARRAY['encapsulation', 'access-modifiers', 'private'], 3),

-- OOPs Question 4
('oops', 'Inheritance', 'medium', 'mcq',
'Which type of inheritance is NOT supported by Java through classes?',
'Single', 'Multilevel', 'Hierarchical', 'Multiple',
'D',
'Java does not support multiple inheritance through classes (one class extending multiple classes) to avoid the Diamond Problem. However, it supports multiple inheritance through interfaces.',
ARRAY['inheritance', 'multiple-inheritance', 'java'], 3),

-- OOPs Question 5
('oops', 'Polymorphism', 'medium', 'mcq',
'Method overloading is an example of which type of polymorphism?',
'Runtime Polymorphism', 'Compile-time Polymorphism', 'Dynamic Polymorphism', 'Late Binding',
'B',
'Method overloading (same method name, different parameters) is compile-time/static polymorphism. The method to call is determined at compile time based on method signature.',
ARRAY['polymorphism', 'overloading', 'compile-time'], 3),

-- OOPs Question 6
('oops', 'Polymorphism', 'medium', 'mcq',
'Method overriding is an example of which type of polymorphism?',
'Compile-time Polymorphism', 'Static Polymorphism', 'Runtime Polymorphism', 'Early Binding',
'C',
'Method overriding (redefining parent method in child class) is runtime/dynamic polymorphism. The method to call is determined at runtime based on the actual object type.',
ARRAY['polymorphism', 'overriding', 'runtime'], 3),

-- OOPs Question 7
('oops', 'Abstraction', 'medium', 'mcq',
'What is the difference between abstract class and interface?',
'No difference', 'Abstract class can have constructors, interface cannot', 'Interface can have instance variables', 'Abstract class cannot have methods',
'B',
'Abstract class can have constructors, instance variables, concrete methods. Interface (traditionally) only has abstract methods and constants. From Java 8+, interfaces can have default/static methods.',
ARRAY['abstraction', 'abstract-class', 'interface'], 4),

-- OOPs Question 8
('oops', 'Constructors', 'easy', 'mcq',
'What is a constructor in OOP?',
'A method to destroy objects', 'A special method called when object is created', 'A variable declaration', 'An interface method',
'B',
'A constructor is a special method automatically called when an object is created. It initializes the object''s state. It has the same name as the class and no return type.',
ARRAY['constructor', 'initialization', 'object-creation'], 2),

-- OOPs Question 9
('oops', 'Constructors', 'medium', 'mcq',
'What is constructor overloading?',
'Having multiple constructors in different classes', 'Having multiple constructors with different parameters in the same class', 'Calling one constructor from another', 'Inheriting constructors',
'B',
'Constructor overloading is having multiple constructors in the same class with different parameter lists. It provides flexibility in object initialization.',
ARRAY['constructor', 'overloading', 'multiple-constructors'], 3),

-- OOPs Question 10
('oops', 'this and super', 'medium', 'mcq',
'What is the purpose of the "super" keyword?',
'To refer to the current object', 'To refer to the parent class', 'To create a new object', 'To destroy an object',
'B',
'The "super" keyword refers to the parent/base class. It''s used to: call parent constructor (super()), access parent methods (super.method()), and access parent variables.',
ARRAY['super', 'inheritance', 'parent-class'], 3),

-- OOPs Question 11
('oops', 'Static Members', 'medium', 'mcq',
'What is true about static members?',
'They belong to individual objects', 'They belong to the class, shared by all objects', 'They cannot be accessed without object', 'They are always private',
'B',
'Static members belong to the class itself, not to any specific object. They are shared by all instances of the class and can be accessed using the class name directly.',
ARRAY['static', 'class-members', 'shared'], 3),

-- OOPs Question 12
('oops', 'Final Keyword', 'medium', 'mcq',
'What does the "final" keyword do when applied to a class?',
'Makes the class abstract', 'Prevents the class from being inherited', 'Makes all methods static', 'Allows multiple inheritance',
'B',
'A final class cannot be inherited/extended. This is used to prevent modification of class behavior through inheritance. Example: String class in Java is final.',
ARRAY['final', 'inheritance', 'immutable'], 3),

-- OOPs Question 13
('oops', 'Association', 'medium', 'mcq',
'What is the difference between Aggregation and Composition?',
'They are the same', 'In Composition, child cannot exist without parent; in Aggregation, it can', 'Aggregation is stronger than Composition', 'Neither involves object relationships',
'B',
'Composition is a strong "owns" relationship - child cannot exist independently (e.g., Room in House). Aggregation is a weak "has-a" relationship - child can exist independently (e.g., Student in Department).',
ARRAY['association', 'aggregation', 'composition'], 4),

-- OOPs Question 14
('oops', 'Coupling and Cohesion', 'hard', 'mcq',
'In good OOP design, we want:',
'High coupling, High cohesion', 'Low coupling, Low cohesion', 'High coupling, Low cohesion', 'Low coupling, High cohesion',
'D',
'Good OOP design aims for: Low Coupling (classes are independent, changes in one don''t affect others) and High Cohesion (class members are closely related, focused on single responsibility).',
ARRAY['coupling', 'cohesion', 'design-principles'], 4),

-- OOPs Question 15
('oops', 'SOLID Principles', 'hard', 'mcq',
'What does the "S" in SOLID stand for?',
'Substitution Principle', 'Single Responsibility Principle', 'Segregation Principle', 'Simple Design Principle',
'B',
'S = Single Responsibility Principle: A class should have only one reason to change, meaning it should have only one job or responsibility.',
ARRAY['solid', 'srp', 'design-principles'], 4),

-- OOPs Question 16
('oops', 'SOLID Principles', 'hard', 'mcq',
'The Liskov Substitution Principle states that:',
'Classes should be open for extension', 'Subclasses should be substitutable for their base classes', 'Depend on abstractions, not concretions', 'Many specific interfaces are better than one general',
'B',
'LSP states that objects of a superclass should be replaceable with objects of its subclasses without affecting the correctness of the program.',
ARRAY['solid', 'lsp', 'substitution'], 4),

-- OOPs Question 17
('oops', 'Design Patterns', 'hard', 'mcq',
'Which design pattern ensures a class has only one instance?',
'Factory Pattern', 'Singleton Pattern', 'Observer Pattern', 'Strategy Pattern',
'B',
'Singleton Pattern ensures a class has only one instance and provides a global point of access to it. It uses private constructor and a static method to get the instance.',
ARRAY['design-patterns', 'singleton', 'creational'], 4),

-- OOPs Question 18
('oops', 'Design Patterns', 'hard', 'mcq',
'Which design pattern defines a family of algorithms and makes them interchangeable?',
'Observer Pattern', 'Factory Pattern', 'Strategy Pattern', 'Decorator Pattern',
'C',
'Strategy Pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It lets the algorithm vary independently from clients that use it.',
ARRAY['design-patterns', 'strategy', 'behavioral'], 4),

-- OOPs Question 19
('oops', 'Exception Handling', 'medium', 'mcq',
'What is the difference between checked and unchecked exceptions?',
'No difference', 'Checked must be declared/handled at compile time, unchecked don''t', 'Unchecked are more severe', 'Checked cannot be caught',
'B',
'Checked exceptions must be declared in method signature or handled (try-catch) at compile time. Unchecked exceptions (RuntimeException subclasses) don''t require explicit handling.',
ARRAY['exceptions', 'checked', 'unchecked'], 3),

-- OOPs Question 20
('oops', 'Garbage Collection', 'medium', 'mcq',
'What is garbage collection in OOP?',
'Manual memory deallocation', 'Automatic reclamation of memory occupied by unused objects', 'Compiling unused code', 'Deleting old files',
'B',
'Garbage Collection is automatic memory management that reclaims memory occupied by objects that are no longer reachable/referenced. It prevents memory leaks and dangling pointers.',
ARRAY['garbage-collection', 'memory-management', 'automatic'], 3);


-- =====================================================
-- 5. COMPUTER NETWORKS (CN) - 20 Questions
-- =====================================================

INSERT INTO tipe_questions (domain, topic, difficulty, question_type, question, option_a, option_b, option_c, option_d, correct_answer, explanation, tags, estimated_time_minutes) VALUES

-- CN Question 1
('cn', 'OSI Model', 'easy', 'mcq',
'How many layers are in the OSI model?',
'5', '6', '7', '4',
'C',
'The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application. Remember: "Please Do Not Throw Sausage Pizza Away".',
ARRAY['osi', 'layers', 'fundamentals'], 2),

-- CN Question 2
('cn', 'OSI Model', 'medium', 'mcq',
'Which layer of OSI model is responsible for routing and logical addressing?',
'Data Link Layer', 'Network Layer', 'Transport Layer', 'Physical Layer',
'B',
'The Network Layer (Layer 3) handles routing, logical addressing (IP addresses), and path determination. Routers operate at this layer.',
ARRAY['osi', 'network-layer', 'routing'], 3),

-- CN Question 3
('cn', 'TCP/IP Model', 'easy', 'mcq',
'How many layers are in the TCP/IP model?',
'7', '5', '4', '3',
'C',
'The TCP/IP model has 4 layers: Network Interface (Link), Internet, Transport, and Application. It combines some OSI layers for practical implementation.',
ARRAY['tcp-ip', 'layers', 'model'], 2),

-- CN Question 4
('cn', 'TCP vs UDP', 'medium', 'mcq',
'Which transport layer protocol is connectionless?',
'TCP', 'UDP', 'Both', 'Neither',
'B',
'UDP (User Datagram Protocol) is connectionless - no handshake before data transfer. TCP is connection-oriented - establishes connection via 3-way handshake before data transfer.',
ARRAY['transport', 'udp', 'connectionless'], 3),

-- CN Question 5
('cn', 'TCP vs UDP', 'medium', 'mcq',
'Which protocol would you use for video streaming?',
'TCP', 'UDP', 'FTP', 'SMTP',
'B',
'UDP is preferred for video streaming because: lower latency (no retransmission), no connection overhead. Some packet loss is acceptable in streaming; smooth playback is more important.',
ARRAY['transport', 'udp', 'streaming'], 3),

-- CN Question 6
('cn', 'TCP', 'medium', 'mcq',
'What is the purpose of the TCP three-way handshake?',
'To encrypt data', 'To establish a reliable connection', 'To compress data', 'To route packets',
'B',
'The TCP three-way handshake (SYN, SYN-ACK, ACK) establishes a reliable connection by synchronizing sequence numbers and acknowledging both parties are ready to communicate.',
ARRAY['tcp', 'handshake', 'connection'], 3),

-- CN Question 7
('cn', 'IP Addressing', 'easy', 'mcq',
'How many bits are in an IPv4 address?',
'16', '32', '64', '128',
'B',
'IPv4 addresses are 32 bits long, typically written in dotted decimal notation (e.g., 192.168.1.1). This allows for approximately 4.3 billion unique addresses.',
ARRAY['ip', 'ipv4', 'addressing'], 2),

-- CN Question 8
('cn', 'IP Addressing', 'medium', 'mcq',
'What class of IP address is 172.16.5.10?',
'Class A', 'Class B', 'Class C', 'Class D',
'B',
'Class B addresses range from 128.0.0.0 to 191.255.255.255. 172.16.x.x is also a private IP range. Class A: 0-127, Class B: 128-191, Class C: 192-223.',
ARRAY['ip', 'classes', 'addressing'], 3),

-- CN Question 9
('cn', 'Subnetting', 'hard', 'mcq',
'What is the maximum number of hosts in a /24 subnet?',
'256', '254', '255', '252',
'B',
'/24 means 24 bits for network, 8 bits for hosts. 2^8 = 256 addresses, but subtract 2 (network address and broadcast address) = 254 usable host addresses.',
ARRAY['subnetting', 'hosts', 'cidr'], 4),

-- CN Question 10
('cn', 'HTTP', 'easy', 'mcq',
'What is the default port number for HTTP?',
'21', '22', '80', '443',
'C',
'HTTP uses port 80 by default. HTTPS uses port 443. FTP uses 21, SSH uses 22. These are well-known ports (0-1023).',
ARRAY['http', 'ports', 'application-layer'], 2),

-- CN Question 11
('cn', 'DNS', 'medium', 'mcq',
'What is the primary function of DNS?',
'Encrypting data', 'Translating domain names to IP addresses', 'Routing packets', 'Managing emails',
'B',
'DNS (Domain Name System) translates human-readable domain names (www.google.com) to IP addresses (142.250.x.x). It''s like a phonebook for the internet.',
ARRAY['dns', 'name-resolution', 'application-layer'], 3),

-- CN Question 12
('cn', 'ARP', 'medium', 'mcq',
'What does ARP resolve?',
'Domain name to IP address', 'IP address to MAC address', 'MAC address to IP address', 'Port to IP address',
'B',
'ARP (Address Resolution Protocol) resolves IP addresses to MAC (physical) addresses. When a device knows the destination IP but not the MAC, it broadcasts an ARP request.',
ARRAY['arp', 'mac-address', 'resolution'], 3),

-- CN Question 13
('cn', 'Routing', 'medium', 'mcq',
'Which routing protocol uses hop count as its only metric?',
'OSPF', 'RIP', 'EIGRP', 'BGP',
'B',
'RIP (Routing Information Protocol) uses hop count as its only metric, with a maximum of 15 hops. OSPF uses cost based on bandwidth. EIGRP uses composite metrics.',
ARRAY['routing', 'rip', 'hop-count'], 3),

-- CN Question 14
('cn', 'Routing', 'hard', 'mcq',
'Which type of routing protocol is OSPF?',
'Distance Vector', 'Link State', 'Path Vector', 'Hybrid',
'B',
'OSPF (Open Shortest Path First) is a Link State protocol. Each router maintains a complete topology map. Distance Vector (RIP) shares only routing tables with neighbors.',
ARRAY['routing', 'ospf', 'link-state'], 4),

-- CN Question 15
('cn', 'Switching', 'medium', 'mcq',
'What does a switch use to forward frames?',
'IP Address', 'MAC Address', 'Port Number', 'Domain Name',
'B',
'Switches operate at Layer 2 (Data Link) and use MAC addresses to forward frames. They maintain a MAC address table mapping MAC addresses to ports.',
ARRAY['switching', 'mac-address', 'data-link'], 3),

-- CN Question 16
('cn', 'DHCP', 'medium', 'mcq',
'What is the purpose of DHCP?',
'Encrypt network traffic', 'Automatically assign IP addresses to devices', 'Route packets between networks', 'Resolve domain names',
'B',
'DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses and network configuration (subnet mask, gateway, DNS) to devices on a network.',
ARRAY['dhcp', 'ip-assignment', 'automatic'], 3),

-- CN Question 17
('cn', 'NAT', 'medium', 'mcq',
'What is Network Address Translation (NAT) used for?',
'Encrypting data', 'Translating private IP addresses to public IP addresses', 'Resolving domain names', 'Compressing packets',
'B',
'NAT translates private IP addresses to public IP addresses (and vice versa). This allows multiple devices on a private network to share a single public IP address.',
ARRAY['nat', 'ip-translation', 'private-public'], 3),

-- CN Question 18
('cn', 'Firewalls', 'medium', 'mcq',
'At which layer do packet filtering firewalls primarily operate?',
'Application Layer', 'Transport Layer', 'Network Layer', 'Data Link Layer',
'C',
'Packet filtering firewalls primarily operate at Network Layer (Layer 3), examining IP addresses and ports. Application firewalls work at Layer 7.',
ARRAY['firewall', 'packet-filtering', 'security'], 3),

-- CN Question 19
('cn', 'SSL/TLS', 'medium', 'mcq',
'What does HTTPS provide that HTTP does not?',
'Faster data transfer', 'Encryption and authentication', 'Better routing', 'Higher bandwidth',
'B',
'HTTPS (HTTP Secure) provides encryption (data confidentiality), authentication (server identity verification), and integrity (data not tampered). It uses SSL/TLS protocols.',
ARRAY['https', 'ssl', 'encryption'], 3),

-- CN Question 20
('cn', 'VLAN', 'hard', 'mcq',
'What is the primary benefit of using VLANs?',
'Increases bandwidth', 'Segments broadcast domains without physical separation', 'Provides encryption', 'Speeds up routing',
'B',
'VLANs (Virtual LANs) logically segment networks into separate broadcast domains without requiring physical separation. This improves security, reduces broadcast traffic, and eases administration.',
ARRAY['vlan', 'broadcast-domain', 'segmentation'], 4);


-- =====================================================
-- 6. C PROGRAMMING - 20 Questions
-- =====================================================

INSERT INTO tipe_questions (domain, topic, difficulty, question_type, question, option_a, option_b, option_c, option_d, correct_answer, explanation, tags, estimated_time_minutes) VALUES

-- C Question 1
('c', 'Basics', 'easy', 'mcq',
'Which of the following is the correct way to declare an integer variable in C?',
'integer x;', 'int x;', 'x int;', 'var x: int;',
'B',
'In C, variables are declared with the type first, followed by the variable name. "int x;" declares an integer variable named x.',
ARRAY['variables', 'declaration', 'basics'], 2),

-- C Question 2
('c', 'Data Types', 'easy', 'mcq',
'What is the size of int on a typical 32-bit system?',
'2 bytes', '4 bytes', '8 bytes', '1 byte',
'B',
'On most 32-bit systems, int is 4 bytes (32 bits). However, C only guarantees minimum sizes. Use sizeof() for portability.',
ARRAY['data-types', 'int', 'size'], 2),

-- C Question 3
('c', 'Pointers', 'medium', 'mcq',
'What does the * operator do when used with a pointer?',
'Multiplies the pointer', 'Dereferences the pointer (accesses value)', 'Gets the address', 'Increments the pointer',
'B',
'The * operator dereferences a pointer, meaning it accesses the value stored at the memory address the pointer holds. If int *p points to x, *p gives the value of x.',
ARRAY['pointers', 'dereference', 'operators'], 3),

-- C Question 4
('c', 'Pointers', 'medium', 'mcq',
'What does the & operator do when used with a variable?',
'Performs AND operation', 'Returns the address of the variable', 'Dereferences the variable', 'Compares values',
'B',
'The & operator returns the memory address of a variable. If x is a variable, &x gives its address, which can be stored in a pointer.',
ARRAY['pointers', 'address-of', 'operators'], 3),

-- C Question 5
('c', 'Arrays', 'medium', 'mcq',
'What is the relationship between arrays and pointers in C?',
'No relationship', 'Array name is a constant pointer to the first element', 'Pointers and arrays are identical', 'Arrays cannot use pointer arithmetic',
'B',
'The array name acts as a constant pointer to the first element. arr is equivalent to &arr[0]. However, array is not a modifiable lvalue; you can''t do arr++ like a pointer.',
ARRAY['arrays', 'pointers', 'relationship'], 3),

-- C Question 6
('c', 'Strings', 'medium', 'mcq',
'How are strings terminated in C?',
'With a semicolon', 'With a null character \\0', 'With a newline', 'They have a length field',
'B',
'C strings are null-terminated character arrays. The null character ''\\0'' (ASCII 0) marks the end of the string. This is how functions like strlen() know where the string ends.',
ARRAY['strings', 'null-terminator', 'character-array'], 3),

-- C Question 7
('c', 'Functions', 'easy', 'mcq',
'What is the return type of main() in C?',
'void', 'int', 'float', 'main has no return type',
'B',
'In standard C, main() returns int. Return 0 indicates successful execution, non-zero indicates an error. While void main() may work on some compilers, int main() is the standard.',
ARRAY['functions', 'main', 'return-type'], 2),

-- C Question 8
('c', 'Functions', 'medium', 'mcq',
'What is call by reference in C?',
'Passing the variable directly', 'Passing the address of the variable', 'Passing a copy of the value', 'C does not support call by reference',
'B',
'C simulates call by reference by passing pointers (addresses). The function receives the address and can modify the original variable through the pointer. Pure call by reference is not native to C.',
ARRAY['functions', 'call-by-reference', 'pointers'], 3),

-- C Question 9
('c', 'Memory', 'hard', 'mcq',
'Which function is used to allocate memory dynamically in C?',
'alloc()', 'malloc()', 'new', 'create()',
'B',
'malloc() (memory allocation) allocates specified bytes of memory from heap and returns a void pointer. calloc() allocates and initializes to zero. realloc() resizes. free() deallocates.',
ARRAY['memory', 'malloc', 'dynamic-allocation'], 4),

-- C Question 10
('c', 'Memory', 'hard', 'mcq',
'What happens if you don''t free dynamically allocated memory?',
'Nothing, OS handles it', 'Memory leak', 'Compilation error', 'Runtime error immediately',
'B',
'Not freeing dynamically allocated memory causes a memory leak. The memory remains allocated but inaccessible, reducing available memory until the program ends or system runs out.',
ARRAY['memory', 'memory-leak', 'free'], 4),

-- C Question 11
('c', 'Preprocessor', 'medium', 'mcq',
'What is the purpose of #include directive?',
'To include comments', 'To include the contents of another file', 'To include variables', 'To include functions only',
'C',
'#include is a preprocessor directive that includes the contents of another file (typically header files) at that point. <stdio.h> includes standard I/O declarations.',
ARRAY['preprocessor', 'include', 'header-files'], 3),

-- C Question 12
('c', 'Preprocessor', 'medium', 'mcq',
'What is a macro in C?',
'A type of function', 'A preprocessor directive for text substitution', 'A loop construct', 'A data type',
'B',
'Macros are preprocessor directives that perform text substitution before compilation. #define PI 3.14 replaces all occurrences of PI with 3.14. They can also have parameters.',
ARRAY['preprocessor', 'macro', 'define'], 3),

-- C Question 13
('c', 'Structures', 'medium', 'mcq',
'What is a structure in C?',
'A collection of functions', 'A user-defined data type grouping different types', 'Same as array', 'A type of pointer',
'B',
'A structure (struct) is a user-defined data type that groups variables of different types under a single name. Unlike arrays (same type), structs can have mixed types.',
ARRAY['structures', 'user-defined', 'data-types'], 3),

-- C Question 14
('c', 'Structures', 'medium', 'mcq',
'How do you access a structure member through a pointer?',
'pointer.member', 'pointer->member', '*pointer.member', '&pointer.member',
'B',
'The arrow operator (->) is used to access structure members through a pointer. ptr->member is equivalent to (*ptr).member. Dot operator is used with structure variables directly.',
ARRAY['structures', 'pointer', 'arrow-operator'], 3),

-- C Question 15
('c', 'Storage Classes', 'medium', 'mcq',
'What is the default storage class for local variables?',
'static', 'extern', 'auto', 'register',
'C',
'Auto is the default storage class for local variables. They are created when the block is entered and destroyed when exited. The keyword ''auto'' is rarely used explicitly.',
ARRAY['storage-class', 'auto', 'local-variables'], 3),

-- C Question 16
('c', 'Storage Classes', 'hard', 'mcq',
'What does the static keyword do for a local variable?',
'Makes it global', 'Preserves its value between function calls', 'Makes it constant', 'Allocates it on heap',
'B',
'A static local variable retains its value between function calls. It''s initialized only once (first call) and persists until program ends. It''s still only accessible within the function.',
ARRAY['storage-class', 'static', 'persistence'], 4),

-- C Question 17
('c', 'File Handling', 'medium', 'mcq',
'Which function is used to open a file in C?',
'open()', 'fopen()', 'file_open()', 'create()',
'B',
'fopen() opens a file and returns a FILE pointer. Modes include "r" (read), "w" (write), "a" (append), "rb"/"wb" for binary. Returns NULL on failure.',
ARRAY['file-handling', 'fopen', 'file-operations'], 3),

-- C Question 18
('c', 'Operators', 'medium', 'mcq',
'What is the output of: printf("%d", 5 & 3);',
'8', '1', '2', '5',
'B',
'5 & 3 is bitwise AND. 5 = 101, 3 = 011. 101 & 011 = 001 = 1. Bitwise AND returns 1 only where both bits are 1.',
ARRAY['operators', 'bitwise', 'and'], 3),

-- C Question 19
('c', 'Type Casting', 'medium', 'mcq',
'What is implicit type conversion also called?',
'Type casting', 'Coercion', 'Explicit conversion', 'Hard casting',
'B',
'Implicit type conversion (coercion) is automatic conversion by the compiler. In mixed expressions, smaller types are promoted to larger types (int to float, etc.).',
ARRAY['type-casting', 'coercion', 'implicit'], 3),

-- C Question 20
('c', 'Recursion', 'medium', 'mcq',
'What is the issue with infinite recursion in C?',
'Compilation error', 'Stack overflow', 'Infinite loop', 'Memory leak',
'B',
'Infinite recursion causes stack overflow. Each recursive call uses stack space for return address and local variables. Without a base case, stack fills up and program crashes.',
ARRAY['recursion', 'stack-overflow', 'base-case'], 3);


-- =====================================================
-- 7. C++ PROGRAMMING - 20 Questions
-- =====================================================

INSERT INTO tipe_questions (domain, topic, difficulty, question_type, question, option_a, option_b, option_c, option_d, correct_answer, explanation, tags, estimated_time_minutes) VALUES

-- C++ Question 1
('cpp', 'Basics', 'easy', 'mcq',
'Which header file is required for input/output operations in C++?',
'<stdio.h>', '<iostream>', '<conio.h>', '<input.h>',
'B',
'<iostream> is the standard C++ header for input/output streams. It provides cin (input), cout (output), cerr (error), and clog. <stdio.h> is C-style I/O.',
ARRAY['basics', 'iostream', 'headers'], 2),

-- C++ Question 2
('cpp', 'Basics', 'easy', 'mcq',
'What is the C++ operator used for output?',
'>>', '<<', '::', '->',
'B',
'The insertion operator << is used with cout for output: cout << "Hello". The extraction operator >> is used with cin for input: cin >> variable.',
ARRAY['basics', 'cout', 'operators'], 2),

-- C++ Question 3
('cpp', 'Classes', 'medium', 'mcq',
'What is the default access specifier for class members in C++?',
'public', 'private', 'protected', 'internal',
'B',
'In C++, class members are private by default, while struct members are public by default. This enforces encapsulation by requiring explicit public declaration.',
ARRAY['classes', 'access-specifiers', 'private'], 3),

-- C++ Question 4
('cpp', 'Classes', 'medium', 'mcq',
'What is a constructor in C++?',
'A function to destroy objects', 'A special function that initializes objects', 'A type of variable', 'A class template',
'B',
'A constructor is a special member function with the same name as the class, automatically called when an object is created. It initializes the object''s members.',
ARRAY['classes', 'constructor', 'initialization'], 3),

-- C++ Question 5
('cpp', 'Constructors', 'medium', 'mcq',
'What is a copy constructor?',
'Constructor with no parameters', 'Constructor that creates a copy of an existing object', 'Constructor that copies methods', 'Static constructor',
'B',
'A copy constructor creates a new object as a copy of an existing object. It takes a const reference to the same class: ClassName(const ClassName& other). Called during object copying.',
ARRAY['constructor', 'copy-constructor', 'deep-copy'], 3),

-- C++ Question 6
('cpp', 'Destructors', 'medium', 'mcq',
'When is a destructor called?',
'When object is created', 'When object goes out of scope or is deleted', 'At program start', 'When constructor fails',
'B',
'A destructor is called automatically when an object goes out of scope (for stack objects) or when delete is called (for heap objects). It cleans up resources.',
ARRAY['destructor', 'cleanup', 'memory-management'], 3),

-- C++ Question 7
('cpp', 'Inheritance', 'medium', 'mcq',
'Which type of inheritance is NOT supported by C++?',
'Single', 'Multiple', 'Multilevel', 'All are supported',
'D',
'C++ supports all types of inheritance: Single, Multiple, Multilevel, Hierarchical, and Hybrid. Unlike Java, C++ allows multiple inheritance through classes.',
ARRAY['inheritance', 'multiple-inheritance', 'types'], 3),

-- C++ Question 8
('cpp', 'Virtual Functions', 'hard', 'mcq',
'What is a virtual function in C++?',
'A function that doesn''t exist', 'A function that can be overridden in derived class for runtime polymorphism', 'A static function', 'An inline function',
'B',
'Virtual functions enable runtime polymorphism. When a derived class object is accessed through a base class pointer, the derived class''s overridden function is called.',
ARRAY['virtual-functions', 'polymorphism', 'runtime'], 4),

-- C++ Question 9
('cpp', 'Virtual Functions', 'hard', 'mcq',
'What is a pure virtual function?',
'A virtual function with empty body', 'A virtual function with "= 0" making the class abstract', 'A function without virtual keyword', 'A private virtual function',
'B',
'A pure virtual function is declared with "= 0" (e.g., virtual void func() = 0;). It makes the class abstract - cannot be instantiated. Derived classes must implement it.',
ARRAY['pure-virtual', 'abstract-class', 'interface'], 4),

-- C++ Question 10
('cpp', 'Operator Overloading', 'medium', 'mcq',
'Which operator cannot be overloaded in C++?',
'+', '-', '::', '[]',
'C',
'The scope resolution operator (::), member access (.), sizeof, and ternary (?:) operators cannot be overloaded. Most other operators including +, -, *, [], () can be overloaded.',
ARRAY['operator-overloading', 'scope-resolution', 'restrictions'], 3),

-- C++ Question 11
('cpp', 'References', 'medium', 'mcq',
'What is a reference in C++?',
'Same as pointer', 'An alias for an existing variable', 'A copy of a variable', 'A constant pointer',
'B',
'A reference is an alias for an existing variable. Once initialized, it cannot refer to another variable. Unlike pointers, references cannot be null and don''t need dereferencing.',
ARRAY['references', 'alias', 'variables'], 3),

-- C++ Question 12
('cpp', 'Templates', 'hard', 'mcq',
'What is a template in C++?',
'A blueprint for creating generic classes and functions', 'A type of class', 'A header file', 'A macro',
'B',
'Templates allow writing generic code that works with any data type. Function templates and class templates enable code reuse. The type is specified when using the template.',
ARRAY['templates', 'generic-programming', 'code-reuse'], 4),

-- C++ Question 13
('cpp', 'STL', 'medium', 'mcq',
'What does STL stand for?',
'Standard Type Library', 'Standard Template Library', 'Static Template Library', 'System Type Library',
'B',
'STL (Standard Template Library) provides generic classes and functions: containers (vector, list, map), algorithms (sort, find), and iterators.',
ARRAY['stl', 'containers', 'algorithms'], 3),

-- C++ Question 14
('cpp', 'STL Containers', 'medium', 'mcq',
'Which STL container provides fast random access and dynamic size?',
'list', 'vector', 'set', 'map',
'B',
'Vector provides O(1) random access (like array) plus dynamic resizing. List is doubly-linked (no random access). Set/Map are tree-based (O(log n) access).',
ARRAY['stl', 'vector', 'containers'], 3),

-- C++ Question 15
('cpp', 'Memory Management', 'medium', 'mcq',
'What is the C++ way to allocate memory dynamically?',
'malloc()', 'new', 'alloc()', 'create()',
'B',
'C++ uses ''new'' for dynamic allocation: int* p = new int; or int* arr = new int[10]. It calls constructor for objects. Use ''delete'' (not free()) to deallocate.',
ARRAY['memory', 'new', 'dynamic-allocation'], 3),

-- C++ Question 16
('cpp', 'Smart Pointers', 'hard', 'mcq',
'Which smart pointer allows shared ownership of an object?',
'unique_ptr', 'shared_ptr', 'weak_ptr', 'auto_ptr',
'B',
'shared_ptr allows multiple pointers to own the same object using reference counting. Object is deleted when last shared_ptr is destroyed. unique_ptr has exclusive ownership.',
ARRAY['smart-pointers', 'shared-ptr', 'memory-management'], 4),

-- C++ Question 17
('cpp', 'Exception Handling', 'medium', 'mcq',
'What are the keywords used for exception handling in C++?',
'try, catch, throw', 'try, except, raise', 'begin, rescue, raise', 'do, catch, throw',
'A',
'C++ uses try (block that may throw), catch (handles exceptions), and throw (raises an exception). Multiple catch blocks can handle different exception types.',
ARRAY['exceptions', 'try-catch', 'error-handling'], 3),

-- C++ Question 18
('cpp', 'Namespaces', 'medium', 'mcq',
'What is the purpose of namespaces in C++?',
'To encrypt code', 'To avoid name collisions', 'To speed up compilation', 'To manage memory',
'B',
'Namespaces prevent name collisions by grouping related declarations. std:: is the standard namespace. "using namespace std;" allows using std members without prefix.',
ARRAY['namespaces', 'scope', 'name-collision'], 3),

-- C++ Question 19
('cpp', 'Friend Function', 'hard', 'mcq',
'What can a friend function access?',
'Only public members', 'Only protected members', 'All members including private', 'No members',
'C',
'A friend function (declared with ''friend'' keyword) can access all members of a class, including private and protected. It''s not a member function but has special access.',
ARRAY['friend', 'access', 'encapsulation'], 4),

-- C++ Question 20
('cpp', 'Polymorphism', 'medium', 'mcq',
'What is function overloading?',
'Functions with same name but different parameters', 'Functions with different names', 'Inherited functions', 'Virtual functions',
'A',
'Function overloading is having multiple functions with the same name but different parameter lists (type, number, or order). Compiler selects based on arguments at compile time.',
ARRAY['overloading', 'polymorphism', 'compile-time'], 3);


-- =====================================================
-- 8. JAVA PROGRAMMING - 20 Questions
-- =====================================================

INSERT INTO tipe_questions (domain, topic, difficulty, question_type, question, option_a, option_b, option_c, option_d, correct_answer, explanation, tags, estimated_time_minutes) VALUES

-- Java Question 1
('java', 'Basics', 'easy', 'mcq',
'What is the entry point of a Java program?',
'start() method', 'init() method', 'main() method', 'run() method',
'C',
'The main() method with signature "public static void main(String[] args)" is the entry point of a Java application. JVM calls this method to start execution.',
ARRAY['basics', 'main', 'entry-point'], 2),

-- Java Question 2
('java', 'Data Types', 'easy', 'mcq',
'Which of the following is NOT a primitive data type in Java?',
'int', 'boolean', 'String', 'char',
'C',
'String is a class (reference type), not a primitive. Java has 8 primitives: byte, short, int, long, float, double, boolean, char.',
ARRAY['data-types', 'primitives', 'string'], 2),

-- Java Question 3
('java', 'OOP', 'medium', 'mcq',
'Why doesn''t Java support multiple inheritance through classes?',
'It''s too complex to implement', 'To avoid the Diamond Problem', 'Java doesn''t support inheritance at all', 'It was a design oversight',
'B',
'Java avoids multiple class inheritance to prevent the Diamond Problem - ambiguity when two parent classes have the same method. Java uses interfaces for multiple inheritance of type.',
ARRAY['inheritance', 'diamond-problem', 'design'], 3),

-- Java Question 4
('java', 'OOP', 'medium', 'mcq',
'What is the difference between abstract class and interface in Java?',
'No difference', 'Abstract class can have constructors and instance variables, interface cannot', 'Interface is faster', 'Abstract class cannot have methods',
'B',
'Abstract class can have constructors, instance variables, concrete methods. Interface (pre-Java 8) only abstract methods and constants. From Java 8+, interfaces can have default methods.',
ARRAY['abstract-class', 'interface', 'comparison'], 3),

-- Java Question 5
('java', 'Collections', 'medium', 'mcq',
'What is the difference between ArrayList and LinkedList?',
'No difference', 'ArrayList uses array, LinkedList uses doubly-linked list', 'LinkedList is always faster', 'ArrayList cannot grow',
'B',
'ArrayList uses dynamic array (fast random access O(1), slow insert/delete O(n)). LinkedList uses doubly-linked list (slow access O(n), fast insert/delete O(1) at known position).',
ARRAY['collections', 'arraylist', 'linkedlist'], 3),

-- Java Question 6
('java', 'Collections', 'medium', 'mcq',
'Which collection does not allow duplicate elements?',
'ArrayList', 'LinkedList', 'HashSet', 'Vector',
'C',
'Set interface (HashSet, TreeSet, LinkedHashSet) does not allow duplicates. Adding a duplicate returns false and collection remains unchanged. Lists allow duplicates.',
ARRAY['collections', 'set', 'duplicates'], 3),

-- Java Question 7
('java', 'String', 'medium', 'mcq',
'Why is String immutable in Java?',
'It''s a design flaw', 'For security, caching, and thread safety', 'To save memory', 'It''s not immutable',
'B',
'String immutability provides: Security (strings in sensitive operations can''t be modified), String pool caching, Thread safety (no synchronization needed), Hash code caching.',
ARRAY['string', 'immutable', 'design'], 3),

-- Java Question 8
('java', 'String', 'medium', 'mcq',
'What is the difference between == and .equals() for Strings?',
'No difference', '== compares references, .equals() compares values', '== is faster', '.equals() compares references',
'B',
'== compares object references (are they the same object in memory). .equals() compares the actual string content. Always use .equals() for string comparison.',
ARRAY['string', 'comparison', 'equals'], 3),

-- Java Question 9
('java', 'Exception Handling', 'medium', 'mcq',
'What is the difference between final, finally, and finalize?',
'They are the same', 'final = constant, finally = exception block, finalize = garbage collection method', 'All are used in exception handling', 'All are access modifiers',
'B',
'final: keyword for constants, prevent inheritance/overriding. finally: block in try-catch that always executes. finalize: method called by GC before object destruction (deprecated).',
ARRAY['final', 'finally', 'finalize'], 4),

-- Java Question 10
('java', 'Exception Handling', 'medium', 'mcq',
'What is the difference between throw and throws?',
'No difference', 'throw is used to throw an exception, throws declares exceptions a method might throw', 'throw is for checked exceptions only', 'throws is used inside try block',
'B',
'throw: keyword to actually throw an exception (throw new Exception()). throws: declaration in method signature listing exceptions the method might throw (void method() throws IOException).',
ARRAY['exceptions', 'throw', 'throws'], 3),

-- Java Question 11
('java', 'Multithreading', 'medium', 'mcq',
'What are the two ways to create a thread in Java?',
'Using Thread class only', 'Extending Thread class or implementing Runnable interface', 'Using Process class', 'Threads cannot be created in Java',
'B',
'Two ways: 1) Extend Thread class and override run() 2) Implement Runnable interface and pass to Thread constructor. Implementing Runnable is preferred (allows extending other classes).',
ARRAY['multithreading', 'thread', 'runnable'], 3),

-- Java Question 12
('java', 'Multithreading', 'hard', 'mcq',
'What is the purpose of synchronized keyword?',
'To speed up execution', 'To ensure only one thread can access a block/method at a time', 'To create threads', 'To stop threads',
'B',
'synchronized ensures mutual exclusion - only one thread can execute the synchronized block/method at a time. It prevents race conditions by acquiring a lock on the object.',
ARRAY['multithreading', 'synchronized', 'thread-safety'], 4),

-- Java Question 13
('java', 'JVM', 'medium', 'mcq',
'What is the JVM?',
'Java Virtual Machine that executes bytecode', 'Java Version Manager', 'A Java IDE', 'Java Variable Memory',
'A',
'JVM (Java Virtual Machine) is the runtime environment that executes Java bytecode. It provides platform independence - "Write Once, Run Anywhere".',
ARRAY['jvm', 'bytecode', 'runtime'], 3),

-- Java Question 14
('java', 'Memory', 'hard', 'mcq',
'What is stored in the Java Heap?',
'Method code', 'Local variables', 'Objects and their instance variables', 'Static variables',
'C',
'Heap stores objects and their instance variables. Stack stores local variables and method calls. Method Area (part of Metaspace) stores class metadata and static variables.',
ARRAY['memory', 'heap', 'jvm'], 4),

-- Java Question 15
('java', 'Garbage Collection', 'medium', 'mcq',
'How do you make an object eligible for garbage collection?',
'Call delete()', 'Set all references to null', 'Call System.gc()', 'Call object.destroy()',
'B',
'An object becomes eligible for GC when there are no reachable references to it. Setting references to null or reassigning them makes the object unreachable. System.gc() only suggests GC.',
ARRAY['garbage-collection', 'memory', 'references'], 3),

-- Java Question 16
('java', 'Access Modifiers', 'medium', 'mcq',
'What is the order of access modifiers from most to least restrictive?',
'public, protected, default, private', 'private, default, protected, public', 'private, protected, default, public', 'protected, private, public, default',
'B',
'From most to least restrictive: private (same class only), default/package-private (same package), protected (same package + subclasses), public (everywhere).',
ARRAY['access-modifiers', 'visibility', 'encapsulation'], 3),

-- Java Question 17
('java', 'Static', 'medium', 'mcq',
'Can a static method access non-static variables?',
'Yes, always', 'No, because static method belongs to class, not object', 'Only if variable is final', 'Only in constructors',
'B',
'Static methods cannot directly access non-static (instance) variables because static methods belong to the class, not any specific object. They can access static members only.',
ARRAY['static', 'instance', 'methods'], 3),

-- Java Question 18
('java', 'Lambda', 'hard', 'mcq',
'What is a functional interface in Java?',
'Any interface', 'An interface with exactly one abstract method', 'An interface with no methods', 'An interface with only default methods',
'B',
'A functional interface has exactly one abstract method (SAM - Single Abstract Method). It can have default/static methods. Used with lambda expressions. Example: Runnable, Comparator.',
ARRAY['lambda', 'functional-interface', 'java8'], 4),

-- Java Question 19
('java', 'Streams', 'hard', 'mcq',
'What is the difference between intermediate and terminal operations in Streams?',
'No difference', 'Intermediate returns stream (lazy), terminal produces result (triggers processing)', 'Intermediate is faster', 'Terminal operations can be chained',
'B',
'Intermediate operations (filter, map, sorted) return a Stream and are lazy. Terminal operations (collect, forEach, reduce) produce a result and trigger the stream pipeline execution.',
ARRAY['streams', 'intermediate', 'terminal'], 4),

-- Java Question 20
('java', 'Generics', 'hard', 'mcq',
'What is type erasure in Java Generics?',
'Removing type information at runtime', 'Converting generics to raw types at compile time', 'A way to create generic arrays', 'Type checking at runtime',
'A',
'Type erasure removes generic type information at runtime for backward compatibility. Generic types are replaced with Object (or bound type). This is why you can''t use instanceof with generics.',
ARRAY['generics', 'type-erasure', 'runtime'], 4);


-- =====================================================
-- 9. PYTHON PROGRAMMING - 20 Questions
-- =====================================================

INSERT INTO tipe_questions (domain, topic, difficulty, question_type, question, option_a, option_b, option_c, option_d, correct_answer, explanation, tags, estimated_time_minutes) VALUES

-- Python Question 1
('python', 'Basics', 'easy', 'mcq',
'What is the correct way to declare a variable in Python?',
'int x = 5', 'var x = 5', 'x = 5', 'declare x = 5',
'C',
'Python is dynamically typed - no need to declare variable types. Simply assign a value: x = 5. Python infers the type from the value.',
ARRAY['variables', 'basics', 'dynamic-typing'], 2),

-- Python Question 2
('python', 'Data Types', 'easy', 'mcq',
'Which of the following is immutable in Python?',
'list', 'dictionary', 'tuple', 'set',
'C',
'Tuple is immutable - once created, cannot be changed. Lists, dictionaries, and sets are mutable. Strings and numbers are also immutable.',
ARRAY['data-types', 'tuple', 'immutable'], 2),

-- Python Question 3
('python', 'Lists', 'medium', 'mcq',
'What is the output of: [1, 2, 3] + [4, 5]?',
'[1, 2, 3, 4, 5]', '[5, 7, 3]', 'Error', '[[1,2,3], [4,5]]',
'A',
'The + operator concatenates lists, creating a new list with all elements. For element-wise addition, use numpy or list comprehension.',
ARRAY['lists', 'concatenation', 'operators'], 3),

-- Python Question 4
('python', 'Lists', 'medium', 'mcq',
'What does list slicing [1:4] return for [0, 1, 2, 3, 4, 5]?',
'[1, 2, 3]', '[1, 2, 3, 4]', '[0, 1, 2, 3]', '[2, 3, 4]',
'B',
'Slicing [start:end] includes start index (1) but excludes end index (4). So indices 1, 2, 3 are included: [1, 2, 3, 4]. Remember: end index is exclusive.',
ARRAY['lists', 'slicing', 'indexing'], 3),

-- Python Question 5
('python', 'Dictionaries', 'medium', 'mcq',
'How do you safely get a value from a dictionary without raising KeyError?',
'dict[key]', 'dict.get(key)', 'dict.fetch(key)', 'dict.value(key)',
'B',
'dict.get(key) returns None if key doesn''t exist (or a default value if specified). dict[key] raises KeyError if key is missing.',
ARRAY['dictionary', 'get', 'safe-access'], 3),

-- Python Question 6
('python', 'Functions', 'medium', 'mcq',
'What are *args and **kwargs in Python?',
'Syntax errors', '*args for variable positional args, **kwargs for variable keyword args', 'Pointers', 'Loop constructs',
'B',
'*args collects extra positional arguments as a tuple. **kwargs collects extra keyword arguments as a dictionary. They allow functions to accept variable number of arguments.',
ARRAY['functions', 'args', 'kwargs'], 3),

-- Python Question 7
('python', 'Functions', 'hard', 'mcq',
'What is a decorator in Python?',
'A design pattern', 'A function that modifies another function''s behavior', 'A type of variable', 'A loop construct',
'B',
'A decorator is a function that takes another function, adds functionality, and returns it. Used with @decorator_name syntax. Common use: logging, timing, authentication.',
ARRAY['decorators', 'functions', 'higher-order'], 4),

-- Python Question 8
('python', 'OOP', 'easy', 'mcq',
'What is self in Python classes?',
'A keyword to define class', 'Reference to the current instance of the class', 'A static variable', 'The class name',
'B',
'self refers to the current instance of the class. It''s used to access instance variables and methods. It must be the first parameter of instance methods.',
ARRAY['oop', 'self', 'instance'], 2),

-- Python Question 9
('python', 'OOP', 'medium', 'mcq',
'What is the purpose of __init__ method?',
'To destroy objects', 'To initialize object attributes (constructor)', 'To inherit from parent', 'To create class methods',
'B',
'__init__ is the constructor method, called automatically when an object is created. It initializes the object''s attributes. Unlike some languages, Python classes can have only one __init__.',
ARRAY['oop', 'init', 'constructor'], 3),

-- Python Question 10
('python', 'OOP', 'hard', 'mcq',
'What is a class method vs static method in Python?',
'No difference', 'Class method receives class as first arg, static method receives nothing', 'Static method can modify class state', 'Class method cannot access class',
'B',
'@classmethod receives cls (class) as first argument, can access/modify class state. @staticmethod receives no implicit first argument, is like a regular function inside a class.',
ARRAY['oop', 'classmethod', 'staticmethod'], 4),

-- Python Question 11
('python', 'List Comprehension', 'medium', 'mcq',
'What is the output of: [x**2 for x in range(5)]?',
'[0, 1, 2, 3, 4]', '[1, 4, 9, 16, 25]', '[0, 1, 4, 9, 16]', '[1, 2, 3, 4, 5]',
'C',
'range(5) gives 0,1,2,3,4. Squaring each: 0,1,4,9,16. List comprehension is a concise way to create lists based on existing iterables.',
ARRAY['list-comprehension', 'range', 'squares'], 3),

-- Python Question 12
('python', 'Exception Handling', 'medium', 'mcq',
'What is the correct syntax for exception handling in Python?',
'try-catch', 'try-except', 'try-handle', 'catch-try',
'B',
'Python uses try-except (not try-catch like Java/C++). Can also include else (runs if no exception) and finally (always runs). except Exception as e captures the exception.',
ARRAY['exceptions', 'try-except', 'error-handling'], 3),

-- Python Question 13
('python', 'File Handling', 'medium', 'mcq',
'What is the advantage of using "with" statement for file handling?',
'Faster file reading', 'Automatically closes the file even if exception occurs', 'Allows multiple file operations', 'Encrypts the file',
'B',
'with statement (context manager) ensures the file is properly closed after operations, even if an exception occurs. No need for explicit file.close().',
ARRAY['file-handling', 'with', 'context-manager'], 3),

-- Python Question 14
('python', 'Modules', 'easy', 'mcq',
'How do you import a specific function from a module?',
'import function from module', 'from module import function', 'include module.function', 'require function from module',
'B',
'from module import function imports only the specified function. import module imports the entire module (access via module.function). Can also use import module as alias.',
ARRAY['modules', 'import', 'from-import'], 2),

-- Python Question 15
('python', 'Lambda', 'medium', 'mcq',
'What is a lambda function?',
'A named function', 'An anonymous inline function', 'A recursive function', 'A generator function',
'B',
'Lambda is an anonymous (nameless) function defined with lambda keyword: lambda x: x**2. Used for short, simple functions often as arguments to higher-order functions.',
ARRAY['lambda', 'anonymous', 'functions'], 3),

-- Python Question 16
('python', 'Generators', 'hard', 'mcq',
'What is the difference between a generator and a regular function?',
'No difference', 'Generator uses yield and returns an iterator, producing values lazily', 'Generator is faster', 'Generator cannot take arguments',
'B',
'Generators use yield instead of return, producing values one at a time (lazy evaluation). They maintain state between calls and are memory-efficient for large sequences.',
ARRAY['generators', 'yield', 'iterators'], 4),

-- Python Question 17
('python', 'Memory', 'hard', 'mcq',
'What is the difference between shallow copy and deep copy?',
'No difference', 'Shallow copies references, deep copies actual objects recursively', 'Deep copy is slower because it''s sequential', 'Shallow copy uses more memory',
'B',
'Shallow copy creates new object but references same nested objects. Deep copy recursively copies all nested objects. Use copy.copy() for shallow, copy.deepcopy() for deep.',
ARRAY['copy', 'shallow', 'deep'], 4),

-- Python Question 18
('python', 'PEP8', 'easy', 'mcq',
'What is PEP 8?',
'A Python version', 'Python style guide for code formatting', 'A Python library', 'Python error type',
'B',
'PEP 8 is the official Python style guide covering naming conventions, indentation (4 spaces), line length (79 chars), imports organization, etc.',
ARRAY['pep8', 'style-guide', 'best-practices'], 2),

-- Python Question 19
('python', 'Inheritance', 'medium', 'mcq',
'How does Python handle multiple inheritance method resolution?',
'Randomly selects method', 'Uses MRO (Method Resolution Order) with C3 linearization', 'First parent class always wins', 'Multiple inheritance not supported',
'B',
'Python uses MRO (Method Resolution Order) with C3 linearization algorithm to determine which method to call. View MRO with ClassName.__mro__ or ClassName.mro().',
ARRAY['inheritance', 'mro', 'multiple-inheritance'], 4),

-- Python Question 20
('python', 'Global', 'medium', 'mcq',
'What does the global keyword do?',
'Creates a global variable', 'Allows modifying a global variable inside a function', 'Deletes a variable', 'Makes variable constant',
'B',
'global keyword inside a function indicates that a variable refers to the global scope variable, allowing modification. Without it, assignment creates a new local variable.',
ARRAY['global', 'scope', 'variables'], 3);


-- =====================================================
-- 10. JAVASCRIPT PROGRAMMING - 20 Questions
-- =====================================================

INSERT INTO tipe_questions (domain, topic, difficulty, question_type, question, option_a, option_b, option_c, option_d, correct_answer, explanation, tags, estimated_time_minutes) VALUES

-- JavaScript Question 1
('javascript', 'Basics', 'easy', 'mcq',
'What is the difference between var, let, and const?',
'No difference', 'var is function-scoped, let/const are block-scoped; const cannot be reassigned', 'const is fastest', 'let is deprecated',
'B',
'var: function-scoped, hoisted. let: block-scoped, can be reassigned. const: block-scoped, cannot be reassigned (but objects can be mutated). Prefer const, then let; avoid var.',
ARRAY['variables', 'scope', 'const'], 3),

-- JavaScript Question 2
('javascript', 'Basics', 'easy', 'mcq',
'What is the result of: typeof null?',
'"null"', '"undefined"', '"object"', '"number"',
'C',
'typeof null returns "object" - this is a known bug in JavaScript since its creation that cannot be fixed for backward compatibility. null is actually a primitive.',
ARRAY['typeof', 'null', 'quirks'], 2),

-- JavaScript Question 3
('javascript', 'Equality', 'medium', 'mcq',
'What is the difference between == and ===?',
'No difference', '== compares with type coercion, === compares value and type', '=== is slower', '== is stricter',
'B',
'== (loose equality) performs type coercion before comparison. === (strict equality) compares both value and type without coercion. Always prefer === for predictable comparisons.',
ARRAY['equality', 'comparison', 'coercion'], 3),

-- JavaScript Question 4
('javascript', 'Functions', 'medium', 'mcq',
'What is a closure in JavaScript?',
'A way to close the browser', 'A function that has access to variables from its outer scope even after the outer function has returned', 'A type of loop', 'A class definition',
'B',
'A closure is a function that remembers and accesses variables from its lexical scope even when executed outside that scope. Used for data privacy, callbacks, and functional programming.',
ARRAY['closures', 'scope', 'functions'], 4),

-- JavaScript Question 5
('javascript', 'Functions', 'medium', 'mcq',
'What is the difference between arrow functions and regular functions?',
'No difference', 'Arrow functions don''t have their own this, arguments, or prototype', 'Arrow functions are slower', 'Regular functions cannot take parameters',
'B',
'Arrow functions: lexically bind this (inherit from parent), no arguments object, no prototype, cannot be used as constructors, shorter syntax. Regular functions have their own this.',
ARRAY['arrow-functions', 'this', 'es6'], 3),

-- JavaScript Question 6
('javascript', 'Async', 'hard', 'mcq',
'What is the Event Loop in JavaScript?',
'A type of for loop', 'A mechanism that handles asynchronous callbacks by moving them from the callback queue to the call stack', 'A DOM event', 'A data structure',
'B',
'Event Loop continuously checks if the call stack is empty, then moves callbacks from the task queue (macrotasks) and microtask queue (promises) to the call stack for execution.',
ARRAY['event-loop', 'async', 'callbacks'], 4),

-- JavaScript Question 7
('javascript', 'Promises', 'medium', 'mcq',
'What are the three states of a Promise?',
'start, middle, end', 'pending, fulfilled, rejected', 'open, closed, error', 'loading, success, failure',
'B',
'Promise states: pending (initial, neither fulfilled nor rejected), fulfilled (operation completed successfully), rejected (operation failed). Once settled (fulfilled/rejected), state cannot change.',
ARRAY['promises', 'async', 'states'], 3),

-- JavaScript Question 8
('javascript', 'Async/Await', 'medium', 'mcq',
'What does the async keyword do?',
'Makes function synchronous', 'Makes function return a Promise and allows using await inside', 'Creates a new thread', 'Speeds up execution',
'B',
'async function always returns a Promise. It allows using await inside, which pauses execution until the Promise resolves. It makes asynchronous code look synchronous.',
ARRAY['async-await', 'promises', 'es8'], 3),

-- JavaScript Question 9
('javascript', 'Hoisting', 'medium', 'mcq',
'What is hoisting in JavaScript?',
'Lifting elements in DOM', 'Variables and function declarations are moved to the top of their scope during compilation', 'A sorting algorithm', 'Error handling',
'B',
'Hoisting moves declarations (not initializations) to the top of their scope. var is hoisted with undefined, let/const are hoisted but not initialized (Temporal Dead Zone), functions are fully hoisted.',
ARRAY['hoisting', 'scope', 'compilation'], 4),

-- JavaScript Question 10
('javascript', 'this', 'hard', 'mcq',
'What determines the value of "this" in JavaScript?',
'Where the function is defined', 'How the function is called', 'The function name', 'Random',
'B',
'this is determined by how a function is called: method call (object), constructor (new instance), call/apply/bind (explicitly set), arrow function (lexically inherited). Not by where it''s defined.',
ARRAY['this', 'context', 'binding'], 4),

-- JavaScript Question 11
('javascript', 'Arrays', 'medium', 'mcq',
'What is the difference between map() and forEach()?',
'No difference', 'map() returns a new array, forEach() returns undefined', 'forEach() is faster', 'map() modifies original array',
'B',
'map() returns a new array with transformed elements. forEach() just iterates and returns undefined. Use map() when you need the result, forEach() for side effects.',
ARRAY['arrays', 'map', 'foreach'], 3),

-- JavaScript Question 12
('javascript', 'Arrays', 'medium', 'mcq',
'What does the spread operator (...) do?',
'Multiplies arrays', 'Expands an iterable into individual elements', 'Creates a loop', 'Deletes array elements',
'B',
'Spread operator (...) expands an iterable (array, string) into individual elements. Used for: copying arrays, merging arrays, function arguments, object spread.',
ARRAY['spread', 'arrays', 'es6'], 3),

-- JavaScript Question 13
('javascript', 'Objects', 'medium', 'mcq',
'What is destructuring in JavaScript?',
'Deleting objects', 'Extracting values from objects/arrays into distinct variables', 'Creating objects', 'Validating objects',
'B',
'Destructuring extracts properties from objects or elements from arrays into variables. const {name, age} = person; or const [first, second] = array;',
ARRAY['destructuring', 'objects', 'arrays'], 3),

-- JavaScript Question 14
('javascript', 'Prototypes', 'hard', 'mcq',
'What is prototypal inheritance in JavaScript?',
'Inheritance from parent class', 'Objects inheriting directly from other objects via prototype chain', 'Multiple inheritance', 'Static inheritance',
'B',
'JavaScript uses prototypal inheritance - objects have a [[Prototype]] linking to another object. Properties not found on object are looked up in prototype chain until null is reached.',
ARRAY['prototypes', 'inheritance', 'prototype-chain'], 4),

-- JavaScript Question 15
('javascript', 'ES6 Classes', 'medium', 'mcq',
'Are ES6 classes the same as classes in classical OOP languages?',
'Yes, exactly the same', 'No, they are syntactic sugar over JavaScript''s prototypal inheritance', 'Classes are not supported in ES6', 'They create true classes',
'B',
'ES6 classes are syntactic sugar over existing prototype-based inheritance. Under the hood, they still use prototypes. They provide cleaner syntax but same behavior.',
ARRAY['classes', 'es6', 'syntactic-sugar'], 3),

-- JavaScript Question 16
('javascript', 'DOM', 'easy', 'mcq',
'Which method is used to select an element by its id?',
'getElementsByClassName()', 'querySelector()', 'getElementById()', 'getElement()',
'C',
'document.getElementById("id") returns the element with specified id. querySelector() uses CSS selectors, getElementsByClassName() returns HTMLCollection of elements with class.',
ARRAY['dom', 'selectors', 'getelementbyid'], 2),

-- JavaScript Question 17
('javascript', 'Events', 'medium', 'mcq',
'What is event bubbling?',
'Event spreading to all elements', 'Event propagating from target element up to ancestors', 'Events being removed', 'Event going from parent to child',
'B',
'Event bubbling: event propagates from the target element up through ancestors to the document. Event capturing is the opposite (down from document). Use event.stopPropagation() to stop.',
ARRAY['events', 'bubbling', 'propagation'], 3),

-- JavaScript Question 18
('javascript', 'Modules', 'medium', 'mcq',
'What is the difference between named exports and default exports?',
'No difference', 'A module can have multiple named exports but only one default export', 'Default exports are faster', 'Named exports are deprecated',
'B',
'Named exports: export {a, b} / import {a, b} - can have many. Default export: export default x / import x - only one per module, imported without braces.',
ARRAY['modules', 'export', 'import'], 3),

-- JavaScript Question 19
('javascript', 'Callbacks', 'medium', 'mcq',
'What is callback hell?',
'A JavaScript error', 'Deeply nested callbacks making code hard to read and maintain', 'A game', 'A security vulnerability',
'B',
'Callback hell (pyramid of doom) is deeply nested callbacks making code hard to read. Solved by: Promises, async/await, modularizing code, using named functions.',
ARRAY['callbacks', 'callback-hell', 'async'], 3),

-- JavaScript Question 20
('javascript', 'Coercion', 'hard', 'mcq',
'What is the result of: "5" + 3 and "5" - 3?',
'"53" and "53"', '8 and 8', '"53" and 2', '53 and NaN',
'C',
'With +, if either operand is string, concatenation occurs: "5" + 3 = "53". With -, both operands are converted to numbers: "5" - 3 = 2. This is type coercion.',
ARRAY['coercion', 'operators', 'types'], 4);


-- =====================================================
-- Create function to get random questions
-- =====================================================

CREATE OR REPLACE FUNCTION get_random_questions(
    p_domain VARCHAR(50),
    p_limit INT DEFAULT 10,
    p_difficulty VARCHAR(20) DEFAULT NULL
)
RETURNS SETOF tipe_questions AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM tipe_questions
    WHERE domain = p_domain
    AND (p_difficulty IS NULL OR difficulty = p_difficulty)
    ORDER BY RANDOM()
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;


-- =====================================================
-- Create function to get questions by topic
-- =====================================================

CREATE OR REPLACE FUNCTION get_questions_by_topic(
    p_domain VARCHAR(50),
    p_topic VARCHAR(100),
    p_limit INT DEFAULT 5
)
RETURNS SETOF tipe_questions AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM tipe_questions
    WHERE domain = p_domain
    AND topic ILIKE '%' || p_topic || '%'
    ORDER BY RANDOM()
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;


-- =====================================================
-- CODING PRACTICE QUESTIONS - 20 Questions
-- Practice Mode: coding
-- =====================================================

CREATE TABLE IF NOT EXISTS coding_practice_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    domain VARCHAR(50) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    question_title VARCHAR(255) NOT NULL,
    question_description TEXT NOT NULL,
    template_code TEXT NOT NULL,
    solution_code TEXT NOT NULL,
    test_cases JSONB NOT NULL,
    time_complexity VARCHAR(50),
    space_complexity VARCHAR(50),
    constraints TEXT[],
    hints TEXT[],
    language_support TEXT[] DEFAULT ARRAY['javascript', 'python', 'java', 'cpp'],
    tags TEXT[],
    estimated_time_minutes INT DEFAULT 15,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_coding_practice_domain ON coding_practice_questions(domain);
CREATE INDEX IF NOT EXISTS idx_coding_practice_difficulty ON coding_practice_questions(difficulty);

-- Insert 20 Coding Practice Questions
INSERT INTO coding_practice_questions (domain, topic, difficulty, question_title, question_description, template_code, solution_code, test_cases, time_complexity, space_complexity, constraints, hints, tags, estimated_time_minutes) VALUES

-- Coding Question 1
('dsa', 'Arrays', 'easy', 'Two Sum',
'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution.',
'function twoSum(nums, target) {
  // Your code here
  
}

// Test
console.log(twoSum([2,7,11,15], 9)); // Expected: [0,1]',
'function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}',
'[{"input": "[2,7,11,15], 9", "expected": "[0,1]", "description": "Normal case"},
  {"input": "[3,2,4], 6", "expected": "[1,2]", "description": "Not first two"},
  {"input": "[3,3], 6", "expected": "[0,1]", "description": "Same elements"}]'::jsonb,
'O(n)', 'O(n)',
ARRAY['Array length: 2 to 10^4', 'Elements: -10^9 to 10^9'],
ARRAY['Use a hash map to store seen values', 'Check if complement exists'],
ARRAY['arrays', 'hash-map', 'two-pointers'], 10),

-- Coding Question 2
('dsa', 'Strings', 'easy', 'Valid Palindrome',
'Given a string s, return true if it is a palindrome after removing all non-alphanumeric characters and converting to lowercase.',
'function isPalindrome(s) {
  // Your code here
  
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true',
'function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0, right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}',
'[{"input": "A man, a plan, a canal: Panama", "expected": "true", "description": "Valid palindrome"},
  {"input": "race a car", "expected": "false", "description": "Not palindrome"},
  {"input": " ", "expected": "true", "description": "Empty string is palindrome"}]'::jsonb,
'O(n)', 'O(n)',
ARRAY['String length: 1 to 2*10^5'],
ARRAY['Clean the string first', 'Use two pointers from both ends'],
ARRAY['strings', 'two-pointers', 'palindrome'], 10),

-- Coding Question 3
('dsa', 'Linked Lists', 'medium', 'Merge Two Sorted Lists',
'Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.',
'class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwoLists(list1, list2) {
  // Your code here
  
}',
'function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(-1);
  let current = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  current.next = list1 || list2;
  return dummy.next;
}',
'[{"input": "[1,2,4], [1,3,4]", "expected": "[1,1,2,3,4,4]", "description": "Normal merge"},
  {"input": "[], []", "expected": "[]", "description": "Both empty"},
  {"input": "[], [0]", "expected": "[0]", "description": "One empty"}]'::jsonb,
'O(n+m)', 'O(1)',
ARRAY['List length: 0 to 50', 'Node values: -100 to 100'],
ARRAY['Use a dummy node to simplify edge cases', 'Compare values and link nodes'],
ARRAY['linked-list', 'merge', 'two-pointers'], 15),

-- Coding Question 4
('dsa', 'Stacks', 'easy', 'Valid Parentheses',
'Given a string s containing just the characters ''('', '')'', ''{'', ''}'', ''['' and '']'', determine if the input string is valid. An input string is valid if brackets are closed in correct order.',
'function isValid(s) {
  // Your code here
  
}

console.log(isValid("()[]{}")); // Expected: true',
'function isValid(s) {
  const stack = [];
  const map = { ")": "(", "}": "{", "]": "[" };
  for (const char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}',
'[{"input": "()", "expected": "true", "description": "Simple pair"},
  {"input": "()[]{}", "expected": "true", "description": "All types"},
  {"input": "(]", "expected": "false", "description": "Wrong close"},
  {"input": "([)]", "expected": "false", "description": "Wrong order"}]'::jsonb,
'O(n)', 'O(n)',
ARRAY['String length: 1 to 10^4'],
ARRAY['Use a stack to track opening brackets', 'Match closing with most recent opening'],
ARRAY['stack', 'strings', 'parentheses'], 10),

-- Coding Question 5
('dsa', 'Binary Search', 'easy', 'Binary Search',
'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return -1.',
'function search(nums, target) {
  // Your code here
  
}

console.log(search([-1,0,3,5,9,12], 9)); // Expected: 4',
'function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}',
'[{"input": "[-1,0,3,5,9,12], 9", "expected": "4", "description": "Found in array"},
  {"input": "[-1,0,3,5,9,12], 2", "expected": "-1", "description": "Not found"},
  {"input": "[5], 5", "expected": "0", "description": "Single element"}]'::jsonb,
'O(log n)', 'O(1)',
ARRAY['Array length: 1 to 10^4', 'Array is sorted in ascending order'],
ARRAY['Use two pointers for left and right bounds', 'Calculate mid and compare'],
ARRAY['binary-search', 'arrays', 'searching'], 10),

-- Coding Question 6
('dsa', 'Trees', 'easy', 'Maximum Depth of Binary Tree',
'Given the root of a binary tree, return its maximum depth. Maximum depth is the number of nodes along the longest path from root to leaf.',
'class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function maxDepth(root) {
  // Your code here
  
}',
'function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}',
'[{"input": "[3,9,20,null,null,15,7]", "expected": "3", "description": "Normal tree"},
  {"input": "[1,null,2]", "expected": "2", "description": "Skewed tree"},
  {"input": "[]", "expected": "0", "description": "Empty tree"}]'::jsonb,
'O(n)', 'O(h)',
ARRAY['Number of nodes: 0 to 10^4'],
ARRAY['Use recursion', 'Base case: null node returns 0'],
ARRAY['trees', 'recursion', 'dfs'], 10),

-- Coding Question 7
('dsa', 'Dynamic Programming', 'easy', 'Climbing Stairs',
'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
'function climbStairs(n) {
  // Your code here
  
}

console.log(climbStairs(3)); // Expected: 3',
'function climbStairs(n) {
  if (n <= 2) return n;
  let prev1 = 1, prev2 = 2;
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev1 = prev2;
    prev2 = current;
  }
  return prev2;
}',
'[{"input": "2", "expected": "2", "description": "Two ways: 1+1 or 2"},
  {"input": "3", "expected": "3", "description": "Three ways"},
  {"input": "5", "expected": "8", "description": "Fibonacci pattern"}]'::jsonb,
'O(n)', 'O(1)',
ARRAY['1 <= n <= 45'],
ARRAY['This is Fibonacci in disguise', 'dp[n] = dp[n-1] + dp[n-2]'],
ARRAY['dynamic-programming', 'fibonacci', 'optimization'], 10),

-- Coding Question 8
('dsa', 'Graphs', 'medium', 'Number of Islands',
'Given an m x n 2D binary grid which represents a map of ''1''s (land) and ''0''s (water), return the number of islands. An island is surrounded by water and formed by connecting adjacent lands.',
'function numIslands(grid) {
  // Your code here
  
}',
'function numIslands(grid) {
  if (!grid || !grid.length) return 0;
  let count = 0;
  const rows = grid.length, cols = grid[0].length;
  
  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === "0") return;
    grid[r][c] = "0";
    dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
  }
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}',
'[{"input": "[[\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]", "expected": "2", "description": "Two islands"},
  {"input": "[[\"1\",\"0\",\"1\"]]", "expected": "2", "description": "Separated islands"},
  {"input": "[[\"0\",\"0\",\"0\"]]", "expected": "0", "description": "No islands"}]'::jsonb,
'O(m*n)', 'O(m*n)',
ARRAY['m, n <= 300', 'grid[i][j] is 0 or 1'],
ARRAY['Use DFS to mark visited cells', 'Count DFS starting points'],
ARRAY['graphs', 'dfs', 'matrix'], 20),

-- Coding Question 9
('dsa', 'Sorting', 'medium', 'Sort Colors (Dutch National Flag)',
'Given an array nums with n objects colored red, white, or blue (0, 1, 2), sort them in-place so that same colors are adjacent, in order red, white, blue.',
'function sortColors(nums) {
  // Your code here - sort in place
  
}

// Test
const arr = [2,0,2,1,1,0];
sortColors(arr);
console.log(arr); // Expected: [0,0,1,1,2,2]',
'function sortColors(nums) {
  let low = 0, mid = 0, high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++; mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
}',
'[{"input": "[2,0,2,1,1,0]", "expected": "[0,0,1,1,2,2]", "description": "Mixed colors"},
  {"input": "[2,0,1]", "expected": "[0,1,2]", "description": "One each"},
  {"input": "[0]", "expected": "[0]", "description": "Single element"}]'::jsonb,
'O(n)', 'O(1)',
ARRAY['n == nums.length', '1 <= n <= 300', 'nums[i] is 0, 1, or 2'],
ARRAY['Use three pointers: low, mid, high', 'Dutch National Flag algorithm'],
ARRAY['sorting', 'three-pointers', 'in-place'], 15),

-- Coding Question 10
('dsa', 'Hash Tables', 'medium', 'Group Anagrams',
'Given an array of strings strs, group the anagrams together. You can return the answer in any order. An Anagram is a word formed by rearranging letters.',
'function groupAnagrams(strs) {
  // Your code here
  
}

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));',
'function groupAnagrams(strs) {
  const map = new Map();
  for (const str of strs) {
    const sorted = str.split("").sort().join("");
    if (!map.has(sorted)) map.set(sorted, []);
    map.get(sorted).push(str);
  }
  return Array.from(map.values());
}',
'[{"input": "[\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", "expected": "[[\"eat\",\"tea\",\"ate\"],[\"tan\",\"nat\"],[\"bat\"]]", "description": "Multiple groups"},
  {"input": "[\"\"]", "expected": "[[\"\"]]", "description": "Empty string"},
  {"input": "[\"a\"]", "expected": "[[\"a\"]]", "description": "Single char"}]'::jsonb,
'O(n*k*log k)', 'O(n*k)',
ARRAY['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100'],
ARRAY['Use sorted string as key', 'Group by the sorted key'],
ARRAY['hash-map', 'strings', 'anagrams'], 15),

-- Coding Question 11
('dsa', 'Heaps', 'medium', 'Kth Largest Element',
'Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in sorted order, not the kth distinct element.',
'function findKthLargest(nums, k) {
  // Your code here
  
}

console.log(findKthLargest([3,2,1,5,6,4], 2)); // Expected: 5',
'function findKthLargest(nums, k) {
  // Using QuickSelect algorithm (partial sort)
  function partition(left, right, pivotIdx) {
    const pivot = nums[pivotIdx];
    [nums[pivotIdx], nums[right]] = [nums[right], nums[pivotIdx]];
    let storeIdx = left;
    for (let i = left; i < right; i++) {
      if (nums[i] > pivot) {
        [nums[storeIdx], nums[i]] = [nums[i], nums[storeIdx]];
        storeIdx++;
      }
    }
    [nums[storeIdx], nums[right]] = [nums[right], nums[storeIdx]];
    return storeIdx;
  }
  
  let left = 0, right = nums.length - 1;
  while (true) {
    const pivotIdx = left + Math.floor(Math.random() * (right - left + 1));
    const pos = partition(left, right, pivotIdx);
    if (pos === k - 1) return nums[pos];
    if (pos < k - 1) left = pos + 1;
    else right = pos - 1;
  }
}',
'[{"input": "[3,2,1,5,6,4], 2", "expected": "5", "description": "Second largest"},
  {"input": "[3,2,3,1,2,4,5,5,6], 4", "expected": "4", "description": "With duplicates"},
  {"input": "[1], 1", "expected": "1", "description": "Single element"}]'::jsonb,
'O(n) average', 'O(1)',
ARRAY['1 <= k <= nums.length <= 10^5'],
ARRAY['QuickSelect is optimal', 'Or use min-heap of size k'],
ARRAY['heaps', 'quickselect', 'sorting'], 20),

-- Coding Question 12
('dsa', 'Backtracking', 'medium', 'Generate Parentheses',
'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
'function generateParenthesis(n) {
  // Your code here
  
}

console.log(generateParenthesis(3));',
'function generateParenthesis(n) {
  const result = [];
  function backtrack(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }
    if (open < n) backtrack(current + "(", open + 1, close);
    if (close < open) backtrack(current + ")", open, close + 1);
  }
  backtrack("", 0, 0);
  return result;
}',
'[{"input": "3", "expected": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]", "description": "Three pairs"},
  {"input": "1", "expected": "[\"()\"]", "description": "One pair"},
  {"input": "2", "expected": "[\"(())\",\"()()\"]", "description": "Two pairs"}]'::jsonb,
'O(4^n/sqrt(n))', 'O(n)',
ARRAY['1 <= n <= 8'],
ARRAY['Track open and close count', 'Only add close if close < open'],
ARRAY['backtracking', 'recursion', 'strings'], 15),

-- Coding Question 13
('python', 'List Comprehensions', 'easy', 'Flatten Nested List',
'Write a function to flatten a nested list of integers. The list may contain other lists as elements.',
'def flatten(nested_list):
    # Your code here
    pass

print(flatten([1, [2, 3], [4, [5, 6]]])) # Expected: [1, 2, 3, 4, 5, 6]',
'def flatten(nested_list):
    result = []
    for item in nested_list:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result',
'[{"input": "[1, [2, 3], [4, [5, 6]]]", "expected": "[1, 2, 3, 4, 5, 6]", "description": "Nested lists"},
  {"input": "[1, 2, 3]", "expected": "[1, 2, 3]", "description": "Already flat"},
  {"input": "[[[[1]]]]", "expected": "[1]", "description": "Deeply nested"}]'::jsonb,
'O(n)', 'O(n)',
ARRAY['Arbitrary nesting depth'],
ARRAY['Use recursion for nested lists', 'Check if item is a list'],
ARRAY['python', 'recursion', 'lists'], 10),

-- Coding Question 14
('python', 'Decorators', 'medium', 'Memoization Decorator',
'Write a memoization decorator that caches function results to avoid redundant calculations.',
'def memoize(func):
    # Your code here
    pass

@memoize
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(35)) # Should be fast!',
'def memoize(func):
    cache = {}
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper',
'[{"input": "fibonacci(10)", "expected": "55", "description": "Fib 10"},
  {"input": "fibonacci(35)", "expected": "9227465", "description": "Large fib fast"},
  {"input": "fibonacci(0)", "expected": "0", "description": "Base case"}]'::jsonb,
'O(n) with memoization', 'O(n)',
ARRAY['Cache should persist between calls'],
ARRAY['Use a dictionary to store results', 'Use *args as cache key'],
ARRAY['python', 'decorators', 'memoization'], 15),

-- Coding Question 15
('java', 'Collections', 'medium', 'LRU Cache',
'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
'class LRUCache {
    // Your code here
    
    public LRUCache(int capacity) {
        
    }
    
    public int get(int key) {
        
    }
    
    public void put(int key, int value) {
        
    }
}',
'class LRUCache extends LinkedHashMap<Integer, Integer> {
    private int capacity;
    
    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }
    
    public int get(int key) {
        return super.getOrDefault(key, -1);
    }
    
    public void put(int key, int value) {
        super.put(key, value);
    }
    
    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}',
'[{"input": "LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)", "expected": "-1", "description": "2 was evicted"},
  {"input": "LRUCache(1), put(1,1), get(1)", "expected": "1", "description": "Basic get"},
  {"input": "LRUCache(2), put(1,1), put(1,2), get(1)", "expected": "2", "description": "Update value"}]'::jsonb,
'O(1) for get and put', 'O(capacity)',
ARRAY['1 <= capacity <= 3000'],
ARRAY['LinkedHashMap with access order', 'Override removeEldestEntry'],
ARRAY['java', 'collections', 'cache'], 25),

-- Coding Question 16
('javascript', 'Async/Await', 'medium', 'Promise.all Implementation',
'Implement a simplified version of Promise.all that takes an array of promises and returns a promise that resolves when all promises resolve.',
'function promiseAll(promises) {
  // Your code here
  
}

// Test
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
promiseAll([p1, p2]).then(console.log); // Expected: [1, 2]',
'function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }
    const results = new Array(promises.length);
    let completed = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}',
'[{"input": "[Promise.resolve(1), Promise.resolve(2)]", "expected": "[1, 2]", "description": "All resolve"},
  {"input": "[]", "expected": "[]", "description": "Empty array"},
  {"input": "[Promise.reject(\"error\")]", "expected": "error", "description": "One rejects"}]'::jsonb,
'O(n)', 'O(n)',
ARRAY['Array can be empty', 'Non-promise values should be wrapped'],
ARRAY['Track completion count', 'Preserve order of results'],
ARRAY['javascript', 'promises', 'async'], 20),

-- Coding Question 17
('cpp', 'STL', 'medium', 'Custom Comparator Priority Queue',
'Implement a priority queue that returns elements in custom order (by second element of pair in descending order).',
'#include <queue>
#include <vector>
using namespace std;

// Your comparator and usage here

int main() {
    // Should output pairs ordered by second element descending
}',
'struct Compare {
    bool operator()(pair<int,int>& a, pair<int,int>& b) {
        return a.second < b.second; // Max heap by second element
    }
};

int main() {
    priority_queue<pair<int,int>, vector<pair<int,int>>, Compare> pq;
    pq.push({1, 5});
    pq.push({2, 3});
    pq.push({3, 8});
    
    while (!pq.empty()) {
        auto p = pq.top();
        pq.pop();
        cout << "(" << p.first << "," << p.second << ") ";
    }
    // Output: (3,8) (1,5) (2,3)
}',
'[{"input": "pairs: (1,5), (2,3), (3,8)", "expected": "(3,8) (1,5) (2,3)", "description": "Descending by second"},
  {"input": "pairs: (1,1), (2,2)", "expected": "(2,2) (1,1)", "description": "Simple case"}]'::jsonb,
'O(log n) per operation', 'O(n)',
ARRAY['Understanding of STL containers'],
ARRAY['Define a functor for comparison', 'Note: < gives max heap in priority_queue'],
ARRAY['cpp', 'stl', 'priority-queue'], 15),

-- Coding Question 18
('dbms', 'SQL Queries', 'medium', 'Employees Earning More Than Manager',
'Write a SQL query to find employees who earn more than their managers.',
'-- Table: Employee (id, name, salary, managerId)
-- Write your query here

SELECT ...',
'SELECT e.name AS Employee
FROM Employee e
JOIN Employee m ON e.managerId = m.id
WHERE e.salary > m.salary;',
'[{"input": "Employee table with manager relationships", "expected": "Employees earning more than managers", "description": "Self join query"}]'::jsonb,
'O(n)', 'O(1)',
ARRAY['managerId can be null for CEO'],
ARRAY['Use self-join on Employee table', 'Compare salaries after join'],
ARRAY['sql', 'joins', 'self-join'], 10),

-- Coding Question 19
('dbms', 'SQL Queries', 'hard', 'Consecutive Numbers',
'Write a SQL query to find all numbers that appear at least three times consecutively.',
'-- Table: Logs (id, num)
-- id is auto-increment
-- Write your query here

SELECT ...',
'SELECT DISTINCT l1.num AS ConsecutiveNums
FROM Logs l1
JOIN Logs l2 ON l1.id = l2.id - 1
JOIN Logs l3 ON l2.id = l3.id - 1
WHERE l1.num = l2.num AND l2.num = l3.num;',
'[{"input": "Logs: 1,1,1,2,1,2,2", "expected": "1", "description": "1 appears 3 times consecutively"}]'::jsonb,
'O(n)', 'O(1)',
ARRAY['IDs are consecutive'],
ARRAY['Join table with itself 3 times', 'Match consecutive IDs and same values'],
ARRAY['sql', 'joins', 'window-functions'], 15),

-- Coding Question 20
('dsa', 'Trees', 'hard', 'Serialize and Deserialize Binary Tree',
'Design an algorithm to serialize and deserialize a binary tree. Serialization is converting a tree to a string, deserialization is converting the string back to the tree.',
'class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function serialize(root) {
  // Your code here
}

function deserialize(data) {
  // Your code here
}',
'function serialize(root) {
  if (!root) return "null";
  return root.val + "," + serialize(root.left) + "," + serialize(root.right);
}

function deserialize(data) {
  const nodes = data.split(",");
  let index = 0;
  
  function build() {
    if (nodes[index] === "null") {
      index++;
      return null;
    }
    const node = new TreeNode(parseInt(nodes[index++]));
    node.left = build();
    node.right = build();
    return node;
  }
  
  return build();
}',
'[{"input": "[1,2,3,null,null,4,5]", "expected": "Same tree structure", "description": "Full serialization cycle"},
  {"input": "[]", "expected": "null", "description": "Empty tree"},
  {"input": "[1]", "expected": "[1]", "description": "Single node"}]'::jsonb,
'O(n)', 'O(n)',
ARRAY['Tree can be empty', 'Node values can be negative'],
ARRAY['Use preorder traversal for serialization', 'Use recursion with index tracking'],
ARRAY['trees', 'serialization', 'recursion'], 30);


-- =====================================================
-- FOLLOW-UP QUESTIONS - 20 Questions
-- Practice Mode: followup
-- =====================================================

CREATE TABLE IF NOT EXISTS followup_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    domain VARCHAR(50) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    base_question TEXT NOT NULL,
    followup_chain JSONB NOT NULL,
    expected_concepts TEXT[],
    evaluation_criteria JSONB,
    tags TEXT[],
    estimated_time_minutes INT DEFAULT 15,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_followup_domain ON followup_questions(domain);
CREATE INDEX IF NOT EXISTS idx_followup_difficulty ON followup_questions(difficulty);

-- Insert 20 Follow-Up Questions
INSERT INTO followup_questions (domain, topic, difficulty, base_question, followup_chain, expected_concepts, evaluation_criteria, tags, estimated_time_minutes) VALUES

-- Follow-Up Question 1
('dsa', 'Sorting', 'medium', 
'Explain how Quick Sort works and its time complexity.',
'[
  {"level": 1, "question": "What is the worst-case time complexity of Quick Sort and when does it occur?", "key_points": ["O(n²)", "Already sorted array", "Poor pivot selection"]},
  {"level": 2, "question": "How can you modify Quick Sort to avoid worst-case performance?", "key_points": ["Random pivot", "Median of three", "Randomized quicksort"]},
  {"level": 3, "question": "What is the difference between Lomuto and Hoare partition schemes?", "key_points": ["Lomuto uses last element as pivot", "Hoare uses two pointers", "Hoare is more efficient"]},
  {"level": 4, "question": "Why is Quick Sort preferred over Merge Sort in practice?", "key_points": ["In-place sorting", "Better cache performance", "Lower constant factors"]},
  {"level": 5, "question": "Can you implement a 3-way Quick Sort? When would you use it?", "key_points": ["Handles duplicates efficiently", "Dutch National Flag", "Array with many duplicates"]}
]'::jsonb,
ARRAY['divide-conquer', 'partitioning', 'pivot-selection', 'time-complexity'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['sorting', 'quicksort', 'algorithms'], 15),

-- Follow-Up Question 2
('dsa', 'Trees', 'medium',
'What is a Binary Search Tree and what are its properties?',
'[
  {"level": 1, "question": "What happens when a BST becomes skewed? How does it affect performance?", "key_points": ["Degrades to O(n)", "Worst case like linked list", "Unbalanced tree"]},
  {"level": 2, "question": "How do AVL trees solve the BST skewing problem?", "key_points": ["Self-balancing", "Height difference <= 1", "Rotations"]},
  {"level": 3, "question": "Explain the four types of rotations in AVL trees.", "key_points": ["Left rotation", "Right rotation", "Left-Right", "Right-Left"]},
  {"level": 4, "question": "How does Red-Black tree differ from AVL tree?", "key_points": ["Less strict balancing", "Color properties", "Faster insertions"]},
  {"level": 5, "question": "When would you choose Red-Black over AVL and vice versa?", "key_points": ["AVL for search-heavy", "Red-Black for insert-heavy", "Trade-offs"]}
]'::jsonb,
ARRAY['tree-properties', 'balancing', 'rotations', 'performance'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['trees', 'bst', 'balancing'], 15),

-- Follow-Up Question 3
('dsa', 'Dynamic Programming', 'hard',
'Explain Dynamic Programming and when to use it.',
'[
  {"level": 1, "question": "How do you identify if a problem can be solved using DP?", "key_points": ["Overlapping subproblems", "Optimal substructure", "Recursive nature"]},
  {"level": 2, "question": "What is the difference between memoization and tabulation?", "key_points": ["Top-down vs bottom-up", "Recursive vs iterative", "Memory patterns"]},
  {"level": 3, "question": "Explain the 0/1 Knapsack problem and its DP solution.", "key_points": ["Include or exclude", "2D DP table", "State transition"]},
  {"level": 4, "question": "How can you optimize space complexity in DP solutions?", "key_points": ["Rolling array", "1D instead of 2D", "Only keeping necessary states"]},
  {"level": 5, "question": "What is the difference between DP and Greedy algorithms?", "key_points": ["DP considers all options", "Greedy makes local optimal", "When greedy fails"]}
]'::jsonb,
ARRAY['optimization', 'memoization', 'tabulation', 'state-transition'],
'{"depth": 30, "accuracy": 35, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['dynamic-programming', 'optimization', 'algorithms'], 20),

-- Follow-Up Question 4
('dbms', 'Normalization', 'medium',
'Explain database normalization and its different forms.',
'[
  {"level": 1, "question": "What is a functional dependency?", "key_points": ["Relationship between attributes", "Determinant and dependent", "Notation X -> Y"]},
  {"level": 2, "question": "What is the difference between 2NF and 3NF?", "key_points": ["2NF removes partial dependency", "3NF removes transitive dependency", "Non-key attributes"]},
  {"level": 3, "question": "What is BCNF and how does it differ from 3NF?", "key_points": ["Every determinant is candidate key", "Stricter than 3NF", "May lose dependencies"]},
  {"level": 4, "question": "When would you denormalize a database?", "key_points": ["Read-heavy workloads", "Performance optimization", "Reporting databases"]},
  {"level": 5, "question": "Give a practical example of converting 1NF to 3NF.", "key_points": ["Identify dependencies", "Decompose tables", "Preserve data integrity"]}
]'::jsonb,
ARRAY['functional-dependencies', 'normal-forms', 'data-integrity', 'denormalization'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['normalization', 'database-design', 'dbms'], 15),

-- Follow-Up Question 5
('dbms', 'Transactions', 'medium',
'What are ACID properties in database transactions?',
'[
  {"level": 1, "question": "How does the database ensure atomicity?", "key_points": ["Transaction logs", "Rollback mechanism", "All or nothing"]},
  {"level": 2, "question": "What are the different isolation levels?", "key_points": ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"]},
  {"level": 3, "question": "What is the phantom read problem and how to prevent it?", "key_points": ["New rows appearing", "Serializable isolation", "Range locks"]},
  {"level": 4, "question": "How is durability maintained after a system crash?", "key_points": ["Write-ahead logging", "Checkpoints", "Recovery process"]},
  {"level": 5, "question": "What is the CAP theorem and how does it relate to ACID?", "key_points": ["Consistency, Availability, Partition tolerance", "Trade-offs", "NoSQL vs SQL"]}
]'::jsonb,
ARRAY['acid', 'isolation-levels', 'transactions', 'consistency'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['transactions', 'acid', 'dbms'], 15),

-- Follow-Up Question 6
('os', 'Process Management', 'medium',
'Explain the difference between a process and a thread.',
'[
  {"level": 1, "question": "What is context switching and why is it expensive?", "key_points": ["Saving and restoring state", "CPU overhead", "Cache invalidation"]},
  {"level": 2, "question": "How do threads communicate within a process?", "key_points": ["Shared memory", "Synchronization primitives", "No IPC overhead"]},
  {"level": 3, "question": "What is a race condition and how do you prevent it?", "key_points": ["Concurrent access", "Mutexes", "Critical sections", "Locks"]},
  {"level": 4, "question": "Explain the difference between user-level and kernel-level threads.", "key_points": ["Management location", "Context switch cost", "Blocking behavior"]},
  {"level": 5, "question": "What is the producer-consumer problem? How do you solve it?", "key_points": ["Bounded buffer", "Semaphores", "Condition variables"]}
]'::jsonb,
ARRAY['processes', 'threads', 'synchronization', 'context-switching'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['processes', 'threads', 'os'], 15),

-- Follow-Up Question 7
('os', 'Deadlocks', 'hard',
'What is a deadlock? What are the four necessary conditions?',
'[
  {"level": 1, "question": "How can you prevent deadlocks by breaking each condition?", "key_points": ["Allow preemption", "Request all at once", "Ordering resources"]},
  {"level": 2, "question": "Explain the Banker''s algorithm in detail.", "key_points": ["Safe state", "Maximum need", "Available resources", "Request validation"]},
  {"level": 3, "question": "How can you detect a deadlock using a resource allocation graph?", "key_points": ["Cycle detection", "Wait-for graph", "Single vs multiple instances"]},
  {"level": 4, "question": "What is the difference between deadlock and starvation?", "key_points": ["Circular wait vs indefinite wait", "Recovery options", "Prevention strategies"]},
  {"level": 5, "question": "Give a real-world example where you might encounter deadlocks.", "key_points": ["Database transactions", "File locks", "Distributed systems"]}
]'::jsonb,
ARRAY['deadlock-conditions', 'prevention', 'detection', 'recovery'],
'{"depth": 30, "accuracy": 35, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['deadlocks', 'synchronization', 'os'], 20),

-- Follow-Up Question 8
('oops', 'Polymorphism', 'medium',
'Explain polymorphism in OOP. What are its types?',
'[
  {"level": 1, "question": "How is polymorphism implemented internally using vtables?", "key_points": ["Virtual table", "Function pointers", "Runtime resolution"]},
  {"level": 2, "question": "Can constructors be virtual? Why or why not?", "key_points": ["Object not yet created", "No virtual constructor", "Factory pattern alternative"]},
  {"level": 3, "question": "What is the diamond problem in multiple inheritance?", "key_points": ["Ambiguous base class", "Virtual inheritance", "Resolution strategies"]},
  {"level": 4, "question": "What is RTTI (Runtime Type Information)?", "key_points": ["dynamic_cast", "typeid", "Performance overhead"]},
  {"level": 5, "question": "How does polymorphism help achieve loose coupling?", "key_points": ["Interface programming", "Dependency injection", "Extensibility"]}
]'::jsonb,
ARRAY['polymorphism', 'vtable', 'inheritance', 'loose-coupling'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['polymorphism', 'oop', 'inheritance'], 15),

-- Follow-Up Question 9
('oops', 'SOLID Principles', 'hard',
'Explain the SOLID principles of object-oriented design.',
'[
  {"level": 1, "question": "Give an example of violating Single Responsibility Principle.", "key_points": ["Class doing multiple things", "Coupling concerns", "Hard to maintain"]},
  {"level": 2, "question": "How does Open/Closed Principle work with polymorphism?", "key_points": ["Extend via inheritance", "No modification needed", "Strategy pattern"]},
  {"level": 3, "question": "What does Liskov Substitution Principle mean in practice?", "key_points": ["Subtypes replaceable", "No behavior change", "Contract preservation"]},
  {"level": 4, "question": "How does Dependency Inversion help in testing?", "key_points": ["Mock dependencies", "Interface abstractions", "Decoupling"]},
  {"level": 5, "question": "How do SOLID principles relate to design patterns?", "key_points": ["Patterns implement SOLID", "Factory for DIP", "Strategy for OCP"]}
]'::jsonb,
ARRAY['solid', 'design-principles', 'clean-code', 'patterns'],
'{"depth": 30, "accuracy": 35, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['solid', 'design', 'oop'], 20),

-- Follow-Up Question 10
('networks', 'OSI Model', 'medium',
'Explain the OSI model and its seven layers.',
'[
  {"level": 1, "question": "How does the OSI model compare to the TCP/IP model?", "key_points": ["4 vs 7 layers", "Practical vs theoretical", "Layer mapping"]},
  {"level": 2, "question": "What happens at each layer when you access a website?", "key_points": ["Encapsulation", "Headers added", "Data transformation"]},
  {"level": 3, "question": "What protocols operate at the Transport layer?", "key_points": ["TCP", "UDP", "Reliability vs speed"]},
  {"level": 4, "question": "How does NAT work and at which layer does it operate?", "key_points": ["Network layer", "IP translation", "Private to public"]},
  {"level": 5, "question": "What is the difference between a switch, router, and gateway?", "key_points": ["Layer of operation", "MAC vs IP", "Network boundaries"]}
]'::jsonb,
ARRAY['osi-model', 'tcp-ip', 'protocols', 'networking'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['osi', 'networking', 'protocols'], 15),

-- Follow-Up Question 11
('javascript', 'Closures', 'medium',
'What are closures in JavaScript? Explain with an example.',
'[
  {"level": 1, "question": "What is the module pattern and how does it use closures?", "key_points": ["Private variables", "IIFE", "Revealing module"]},
  {"level": 2, "question": "How do closures relate to memory leaks in JavaScript?", "key_points": ["Reference retention", "Event listeners", "Garbage collection"]},
  {"level": 3, "question": "Explain the classic loop + setTimeout closure problem.", "key_points": ["var vs let", "IIFE solution", "Scope capture"]},
  {"level": 4, "question": "What is the difference between scope and closure?", "key_points": ["Scope is static", "Closure captures", "Execution context"]},
  {"level": 5, "question": "How would you create private variables using closures?", "key_points": ["Encapsulation", "Factory functions", "No direct access"]}
]'::jsonb,
ARRAY['closures', 'scope', 'memory', 'patterns'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['closures', 'javascript', 'scope'], 15),

-- Follow-Up Question 12
('javascript', 'Event Loop', 'hard',
'Explain the JavaScript event loop and asynchronous execution.',
'[
  {"level": 1, "question": "What is the difference between microtasks and macrotasks?", "key_points": ["Promises vs setTimeout", "Execution order", "Queue priority"]},
  {"level": 2, "question": "In what order will console.logs execute in mixed sync/async code?", "key_points": ["Call stack first", "Microtasks next", "Macrotasks last"]},
  {"level": 3, "question": "How does async/await relate to the event loop?", "key_points": ["Syntactic sugar", "Promise-based", "Execution pausing"]},
  {"level": 4, "question": "What is the role of Web APIs in the browser?", "key_points": ["setTimeout", "fetch", "DOM events", "Separate thread"]},
  {"level": 5, "question": "How can you starve the event loop? What are the consequences?", "key_points": ["Long sync operations", "UI freezing", "setTimeout(0)"]}
]'::jsonb,
ARRAY['event-loop', 'async', 'promises', 'execution'],
'{"depth": 30, "accuracy": 35, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['event-loop', 'javascript', 'async'], 20),

-- Follow-Up Question 13
('python', 'Decorators', 'medium',
'What are decorators in Python? How do they work?',
'[
  {"level": 1, "question": "How do you create a decorator with arguments?", "key_points": ["Nested functions", "Wrapper of wrapper", "Parameterized decorator"]},
  {"level": 2, "question": "What is functools.wraps and why use it?", "key_points": ["Preserves metadata", "__name__ and __doc__", "Debugging help"]},
  {"level": 3, "question": "Can you apply multiple decorators? What is the order?", "key_points": ["Bottom-up application", "Top-down execution", "Stacking decorators"]},
  {"level": 4, "question": "How are class-based decorators different from function decorators?", "key_points": ["__call__ method", "Stateful decorators", "Initialization"]},
  {"level": 5, "question": "Explain @property, @staticmethod, and @classmethod.", "key_points": ["Property access", "No self needed", "cls parameter"]}
]'::jsonb,
ARRAY['decorators', 'higher-order-functions', 'metaprogramming', 'python'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['decorators', 'python', 'functions'], 15),

-- Follow-Up Question 14
('python', 'Generators', 'medium',
'What are generators in Python? How do they differ from regular functions?',
'[
  {"level": 1, "question": "What is the difference between yield and return?", "key_points": ["Suspend vs terminate", "State preservation", "Iterator protocol"]},
  {"level": 2, "question": "How does lazy evaluation help with memory efficiency?", "key_points": ["On-demand generation", "Large datasets", "Streaming"]},
  {"level": 3, "question": "What are generator expressions and when to use them?", "key_points": ["Like list comprehension", "Parentheses syntax", "Memory efficient"]},
  {"level": 4, "question": "Explain the send() method in generators.", "key_points": ["Two-way communication", "Coroutines", "Value injection"]},
  {"level": 5, "question": "How do generators relate to async/await in Python?", "key_points": ["Coroutines evolved from generators", "asyncio", "Event loop"]}
]'::jsonb,
ARRAY['generators', 'iterators', 'lazy-evaluation', 'coroutines'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['generators', 'python', 'iterators'], 15),

-- Follow-Up Question 15
('java', 'JVM Architecture', 'medium',
'Explain the JVM architecture and how Java achieves platform independence.',
'[
  {"level": 1, "question": "What are the different memory areas in JVM?", "key_points": ["Heap", "Stack", "Method Area", "PC Register", "Native Stack"]},
  {"level": 2, "question": "How does garbage collection work in Java?", "key_points": ["Mark and sweep", "Generations", "GC roots"]},
  {"level": 3, "question": "What is the difference between JDK, JRE, and JVM?", "key_points": ["JDK includes compiler", "JRE for running", "JVM executes bytecode"]},
  {"level": 4, "question": "Explain the Class Loading mechanism in Java.", "key_points": ["Loading, Linking, Initialization", "ClassLoader hierarchy", "Delegation model"]},
  {"level": 5, "question": "What is JIT compilation and how does it improve performance?", "key_points": ["Just-In-Time", "Hot spots", "Native code generation"]}
]'::jsonb,
ARRAY['jvm', 'memory-management', 'garbage-collection', 'classloader'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['jvm', 'java', 'architecture'], 15),

-- Follow-Up Question 16
('java', 'Multithreading', 'hard',
'Explain multithreading in Java. What are the ways to create threads?',
'[
  {"level": 1, "question": "What is the difference between extending Thread and implementing Runnable?", "key_points": ["Single inheritance limitation", "Flexibility", "Resource sharing"]},
  {"level": 2, "question": "What is the synchronized keyword and how does it work?", "key_points": ["Monitor lock", "Method vs block", "Intrinsic lock"]},
  {"level": 3, "question": "Explain the difference between wait() and sleep().", "key_points": ["Lock release", "Object vs Thread", "Purpose difference"]},
  {"level": 4, "question": "What is the volatile keyword used for?", "key_points": ["Visibility guarantee", "No caching", "Happens-before"]},
  {"level": 5, "question": "Explain the Executor framework and its advantages.", "key_points": ["Thread pool", "Task submission", "Resource management"]}
]'::jsonb,
ARRAY['multithreading', 'synchronization', 'concurrency', 'locks'],
'{"depth": 30, "accuracy": 35, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['multithreading', 'java', 'concurrency'], 20),

-- Follow-Up Question 17
('cpp', 'Smart Pointers', 'medium',
'What are smart pointers in C++? Why are they needed?',
'[
  {"level": 1, "question": "What is the difference between unique_ptr and shared_ptr?", "key_points": ["Ownership model", "Reference counting", "Move vs copy"]},
  {"level": 2, "question": "When would you use weak_ptr?", "key_points": ["Breaking cycles", "Observing without owning", "expired() check"]},
  {"level": 3, "question": "How does RAII relate to smart pointers?", "key_points": ["Resource management", "Constructor/Destructor", "Automatic cleanup"]},
  {"level": 4, "question": "What are the performance implications of shared_ptr?", "key_points": ["Reference counting overhead", "Atomic operations", "Control block"]},
  {"level": 5, "question": "How do you implement a custom deleter with smart pointers?", "key_points": ["Lambda or functor", "Resource cleanup", "unique_ptr template"]}
]'::jsonb,
ARRAY['smart-pointers', 'raii', 'memory-management', 'ownership'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['smart-pointers', 'cpp', 'memory'], 15),

-- Follow-Up Question 18
('cpp', 'Move Semantics', 'hard',
'Explain move semantics and rvalue references in C++11.',
'[
  {"level": 1, "question": "What is the difference between lvalue and rvalue?", "key_points": ["Has address vs temporary", "Named vs unnamed", "Can be assigned"]},
  {"level": 2, "question": "What does std::move actually do?", "key_points": ["Cast to rvalue", "Enables move", "No actual moving"]},
  {"level": 3, "question": "How do you implement a move constructor?", "key_points": ["Steal resources", "Leave source valid", "noexcept"]},
  {"level": 4, "question": "What is perfect forwarding and how does std::forward work?", "key_points": ["Preserve value category", "Template deduction", "Universal references"]},
  {"level": 5, "question": "When does the compiler generate move operations automatically?", "key_points": ["Rule of zero/three/five", "No user-declared copy", "Implicit generation"]}
]'::jsonb,
ARRAY['move-semantics', 'rvalue', 'performance', 'modern-cpp'],
'{"depth": 30, "accuracy": 35, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['move-semantics', 'cpp', 'performance'], 20),

-- Follow-Up Question 19
('c', 'Pointers', 'medium',
'Explain pointers in C. How is pointer arithmetic different from regular arithmetic?',
'[
  {"level": 1, "question": "What is the difference between pointer to array and array of pointers?", "key_points": ["int (*p)[n] vs int *p[n]", "Memory layout", "Usage patterns"]},
  {"level": 2, "question": "How do function pointers work in C?", "key_points": ["Syntax", "Callbacks", "Function tables"]},
  {"level": 3, "question": "What is a dangling pointer and how do you prevent it?", "key_points": ["Points to freed memory", "Set to NULL", "Use after free"]},
  {"level": 4, "question": "Explain the difference between malloc, calloc, and realloc.", "key_points": ["Initialization", "Array allocation", "Resizing"]},
  {"level": 5, "question": "How does pointer aliasing affect optimization?", "key_points": ["Compiler assumptions", "restrict keyword", "Memory access patterns"]}
]'::jsonb,
ARRAY['pointers', 'memory', 'pointer-arithmetic', 'dynamic-allocation'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['pointers', 'c', 'memory'], 15),

-- Follow-Up Question 20
('dsa', 'Graphs', 'hard',
'Explain BFS and DFS graph traversal algorithms.',
'[
  {"level": 1, "question": "When would you use BFS over DFS and vice versa?", "key_points": ["Shortest path", "Memory usage", "Complete exploration"]},
  {"level": 2, "question": "How do you detect a cycle in a directed graph?", "key_points": ["DFS coloring", "Back edge", "Recursion stack"]},
  {"level": 3, "question": "Explain Dijkstra''s algorithm and its limitations.", "key_points": ["Greedy approach", "No negative edges", "Priority queue"]},
  {"level": 4, "question": "What is topological sorting and when is it used?", "key_points": ["DAG only", "Task scheduling", "DFS-based or Kahn''s"]},
  {"level": 5, "question": "Explain the difference between Dijkstra and Bellman-Ford algorithms.", "key_points": ["Negative edges", "Time complexity", "Relaxation"]}
]'::jsonb,
ARRAY['bfs', 'dfs', 'shortest-path', 'graph-algorithms'],
'{"depth": 30, "accuracy": 35, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['graphs', 'traversal', 'algorithms'], 20),

-- =====================================================
-- ADDITIONAL FOLLOW-UP QUESTIONS - 30 More Questions
-- 3 per domain for comprehensive coverage
-- =====================================================

-- Follow-Up Question 21 (DSA)
('dsa', 'Hashing', 'medium',
'Explain how hash tables work and what are collision resolution techniques.',
'[
  {"level": 1, "question": "What makes a good hash function?", "key_points": ["Uniform distribution", "Fast computation", "Deterministic output"]},
  {"level": 2, "question": "Explain the difference between chaining and open addressing.", "key_points": ["Linked lists vs probing", "Memory usage", "Cache performance"]},
  {"level": 3, "question": "What is linear probing and what problem does it have?", "key_points": ["Check next slot", "Primary clustering", "Performance degradation"]},
  {"level": 4, "question": "How does double hashing solve clustering?", "key_points": ["Two hash functions", "Variable step size", "Better distribution"]},
  {"level": 5, "question": "What is the load factor and when should you resize a hash table?", "key_points": ["Entries/Buckets ratio", "Typically 0.75", "Rehashing process"]}
]'::jsonb,
ARRAY['hashing', 'collision-resolution', 'hash-function', 'load-factor'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['hashing', 'dsa', 'data-structures'], 15),

-- Follow-Up Question 22 (DSA)
('dsa', 'Linked Lists', 'medium',
'Explain the different types of linked lists and their operations.',
'[
  {"level": 1, "question": "How would you reverse a singly linked list?", "key_points": ["Three pointers", "Iterative approach", "O(n) time, O(1) space"]},
  {"level": 2, "question": "How do you find the middle element in one pass?", "key_points": ["Two pointer technique", "Slow and fast pointers", "Floyd''s algorithm"]},
  {"level": 3, "question": "How would you merge two sorted linked lists?", "key_points": ["Dummy node", "Compare and append", "Handle remaining nodes"]},
  {"level": 4, "question": "What are the advantages of doubly linked list over singly?", "key_points": ["Bidirectional traversal", "Easier deletion", "More memory overhead"]},
  {"level": 5, "question": "How would you detect and remove a loop in linked list?", "key_points": ["Floyd''s detection", "Find loop start", "Break the loop"]}
]'::jsonb,
ARRAY['linked-list', 'two-pointers', 'reversal', 'loop-detection'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['linked-list', 'dsa', 'data-structures'], 15),

-- Follow-Up Question 23 (DSA)
('dsa', 'Heaps', 'hard',
'Explain heap data structure and its applications.',
'[
  {"level": 1, "question": "What is the time complexity of building a heap from an array?", "key_points": ["O(n) not O(n log n)", "Bottom-up heapify", "Mathematical proof"]},
  {"level": 2, "question": "How does heap sort work?", "key_points": ["Build max heap", "Extract max repeatedly", "In-place sorting"]},
  {"level": 3, "question": "How would you find the K largest elements efficiently?", "key_points": ["Min heap of size K", "O(n log k) complexity", "Better than sorting"]},
  {"level": 4, "question": "What is a priority queue and how is it implemented?", "key_points": ["Heap-based implementation", "Insert and extract min/max", "Dynamic priorities"]},
  {"level": 5, "question": "Explain the difference between binary heap and Fibonacci heap.", "key_points": ["Amortized complexity", "Decrease key operation", "Graph algorithms"]}
]'::jsonb,
ARRAY['heap', 'priority-queue', 'heapsort', 'binary-heap'],
'{"depth": 30, "accuracy": 35, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['heap', 'dsa', 'algorithms'], 20),

-- Follow-Up Question 24 (DBMS)
('dbms', 'Indexing', 'medium',
'What are database indexes and how do they improve query performance?',
'[
  {"level": 1, "question": "When should you NOT create an index?", "key_points": ["Small tables", "Frequent updates", "Low selectivity columns"]},
  {"level": 2, "question": "What is a composite index and what is the column order importance?", "key_points": ["Multiple columns", "Leftmost prefix rule", "Query optimization"]},
  {"level": 3, "question": "How does a B+ tree index differ from a hash index?", "key_points": ["Range queries support", "Sorted data", "Equality only for hash"]},
  {"level": 4, "question": "What is a covering index?", "key_points": ["All columns in index", "No table access", "Index-only scan"]},
  {"level": 5, "question": "Explain the trade-off between read and write performance with indexes.", "key_points": ["Faster reads", "Slower inserts/updates", "Storage overhead"]}
]'::jsonb,
ARRAY['indexing', 'b-tree', 'query-optimization', 'covering-index'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['indexing', 'dbms', 'performance'], 15),

-- Follow-Up Question 25 (DBMS)
('dbms', 'SQL Optimization', 'hard',
'How do you optimize slow SQL queries?',
'[
  {"level": 1, "question": "How do you use EXPLAIN to analyze query execution?", "key_points": ["Execution plan", "Cost estimates", "Index usage"]},
  {"level": 2, "question": "What is the difference between WHERE and HAVING?", "key_points": ["Before vs after grouping", "Aggregate functions", "Performance implications"]},
  {"level": 3, "question": "How do subqueries compare to JOINs in terms of performance?", "key_points": ["Query optimizer", "Correlated subqueries", "Materialization"]},
  {"level": 4, "question": "What is query caching and how does it work?", "key_points": ["Result caching", "Cache invalidation", "When to use"]},
  {"level": 5, "question": "Explain the N+1 query problem and how to solve it.", "key_points": ["ORM issue", "Eager loading", "JOINs or batching"]}
]'::jsonb,
ARRAY['sql-optimization', 'explain-plan', 'query-tuning', 'performance'],
'{"depth": 30, "accuracy": 35, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['sql', 'optimization', 'dbms'], 20),

-- Follow-Up Question 26 (DBMS)
('dbms', 'Concurrency Control', 'hard',
'Explain concurrency control mechanisms in databases.',
'[
  {"level": 1, "question": "What is two-phase locking protocol?", "key_points": ["Growing and shrinking phases", "Serializability guarantee", "Lock types"]},
  {"level": 2, "question": "What is optimistic vs pessimistic concurrency control?", "key_points": ["Lock before vs validate after", "Conflict detection", "Use cases"]},
  {"level": 3, "question": "How does MVCC (Multi-Version Concurrency Control) work?", "key_points": ["Multiple versions", "Snapshot isolation", "No read locks"]},
  {"level": 4, "question": "What is a deadlock in databases and how is it resolved?", "key_points": ["Wait-for graph", "Timeout", "Victim selection"]},
  {"level": 5, "question": "Explain the difference between shared and exclusive locks.", "key_points": ["Read vs write locks", "Compatibility matrix", "Lock escalation"]}
]'::jsonb,
ARRAY['concurrency', 'locking', 'mvcc', 'two-phase-locking'],
'{"depth": 30, "accuracy": 35, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['concurrency', 'transactions', 'dbms'], 20),

-- Follow-Up Question 27 (OS)
('os', 'Memory Management', 'medium',
'Explain virtual memory and paging in operating systems.',
'[
  {"level": 1, "question": "What is the difference between logical and physical address?", "key_points": ["Virtual vs real", "MMU translation", "Address space"]},
  {"level": 2, "question": "How does the page table work?", "key_points": ["Page to frame mapping", "Valid bit", "Page table entry"]},
  {"level": 3, "question": "What is TLB and why is it important?", "key_points": ["Translation Lookaside Buffer", "Cache for page table", "TLB hit/miss"]},
  {"level": 4, "question": "Explain demand paging and its advantages.", "key_points": ["Load on access", "Less memory needed", "Page fault handling"]},
  {"level": 5, "question": "What is thrashing and how do you prevent it?", "key_points": ["Excessive paging", "Low CPU utilization", "Working set model"]}
]'::jsonb,
ARRAY['virtual-memory', 'paging', 'tlb', 'page-table'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['memory', 'virtual-memory', 'os'], 15),

-- Follow-Up Question 28 (OS)
('os', 'CPU Scheduling', 'medium',
'Compare different CPU scheduling algorithms.',
'[
  {"level": 1, "question": "What are the criteria for evaluating scheduling algorithms?", "key_points": ["CPU utilization", "Throughput", "Turnaround time", "Response time"]},
  {"level": 2, "question": "How does priority scheduling work and what is aging?", "key_points": ["Priority-based selection", "Starvation problem", "Aging solution"]},
  {"level": 3, "question": "What is the difference between preemptive and non-preemptive scheduling?", "key_points": ["Can interrupt running process", "Context switch overhead", "Response time"]},
  {"level": 4, "question": "Explain multilevel feedback queue scheduling.", "key_points": ["Multiple queues", "Priority promotion/demotion", "Adaptive scheduling"]},
  {"level": 5, "question": "How does the Completely Fair Scheduler (CFS) in Linux work?", "key_points": ["Red-black tree", "Virtual runtime", "Proportional fairness"]}
]'::jsonb,
ARRAY['cpu-scheduling', 'fcfs', 'round-robin', 'priority'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['scheduling', 'cpu', 'os'], 15),

-- Follow-Up Question 29 (OS)
('os', 'File Systems', 'medium',
'Explain file system organization and allocation methods.',
'[
  {"level": 1, "question": "What is the difference between contiguous, linked, and indexed allocation?", "key_points": ["Contiguous - fast access", "Linked - no fragmentation", "Indexed - direct access"]},
  {"level": 2, "question": "How do journaling file systems prevent data corruption?", "key_points": ["Write-ahead logging", "Crash recovery", "ext4, NTFS"]},
  {"level": 3, "question": "What is a file descriptor and how is it used?", "key_points": ["Integer handle", "Per-process table", "System-wide table"]},
  {"level": 4, "question": "Explain hard links vs soft links.", "key_points": ["Same inode vs path reference", "Cross-filesystem", "Dangling links"]},
  {"level": 5, "question": "How does copy-on-write work in modern file systems?", "key_points": ["Share until modify", "ZFS, Btrfs", "Snapshots"]}
]'::jsonb,
ARRAY['file-system', 'allocation', 'journaling', 'links'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['file-system', 'storage', 'os'], 15),

-- Follow-Up Question 30 (OOPs)
('oops', 'Encapsulation', 'medium',
'What is encapsulation and why is it important in OOP?',
'[
  {"level": 1, "question": "What are access modifiers and their scope?", "key_points": ["public, private, protected", "Class vs package vs subclass", "Default access"]},
  {"level": 2, "question": "What are getters and setters and why use them?", "key_points": ["Controlled access", "Validation logic", "Computed properties"]},
  {"level": 3, "question": "How does encapsulation support information hiding?", "key_points": ["Implementation details hidden", "Interface stability", "Change without breaking"]},
  {"level": 4, "question": "What is the difference between encapsulation and abstraction?", "key_points": ["Hiding data vs hiding complexity", "Implementation vs interface", "Complementary concepts"]},
  {"level": 5, "question": "How would you design an immutable class?", "key_points": ["Final class", "Private final fields", "No setters", "Defensive copying"]}
]'::jsonb,
ARRAY['encapsulation', 'access-modifiers', 'information-hiding', 'immutability'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['encapsulation', 'oop', 'design'], 15),

-- Follow-Up Question 31 (OOPs)
('oops', 'Inheritance', 'medium',
'Explain inheritance in OOP and its types.',
'[
  {"level": 1, "question": "What is the difference between IS-A and HAS-A relationship?", "key_points": ["Inheritance vs composition", "When to use which", "Code reuse patterns"]},
  {"level": 2, "question": "Why should you prefer composition over inheritance?", "key_points": ["Flexibility", "Loose coupling", "Changing behavior at runtime"]},
  {"level": 3, "question": "What is the fragile base class problem?", "key_points": ["Base class changes break subclasses", "Tight coupling", "Documentation needed"]},
  {"level": 4, "question": "How does method resolution order (MRO) work?", "key_points": ["C3 linearization", "Diamond problem", "Python''s MRO"]},
  {"level": 5, "question": "What is the template method pattern?", "key_points": ["Define skeleton in base", "Subclasses fill details", "Hollywood principle"]}
]'::jsonb,
ARRAY['inheritance', 'composition', 'mro', 'design-patterns'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['inheritance', 'oop', 'design'], 15),

-- Follow-Up Question 32 (OOPs)
('oops', 'Design Patterns', 'hard',
'Explain common creational design patterns.',
'[
  {"level": 1, "question": "When would you use Factory pattern over direct instantiation?", "key_points": ["Object creation logic encapsulated", "Product variations", "Loose coupling"]},
  {"level": 2, "question": "What is the difference between Factory Method and Abstract Factory?", "key_points": ["Single product vs family", "Inheritance vs composition", "Complexity levels"]},
  {"level": 3, "question": "How does Builder pattern differ from Factory?", "key_points": ["Step-by-step construction", "Complex objects", "Fluent interface"]},
  {"level": 4, "question": "What is the Prototype pattern and when to use it?", "key_points": ["Cloning objects", "Expensive creation", "Shallow vs deep copy"]},
  {"level": 5, "question": "How do you make Singleton thread-safe?", "key_points": ["Double-checked locking", "Static initialization", "Enum singleton"]}
]'::jsonb,
ARRAY['design-patterns', 'creational', 'factory', 'singleton'],
'{"depth": 30, "accuracy": 35, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['design-patterns', 'oop', 'creational'], 20),

-- Follow-Up Question 33 (CN)
('cn', 'HTTP/HTTPS', 'medium',
'Explain HTTP protocol and the differences between HTTP and HTTPS.',
'[
  {"level": 1, "question": "What are the common HTTP methods and their purposes?", "key_points": ["GET, POST, PUT, DELETE", "Idempotency", "Safe methods"]},
  {"level": 2, "question": "What is the difference between HTTP/1.1 and HTTP/2?", "key_points": ["Multiplexing", "Header compression", "Server push"]},
  {"level": 3, "question": "How does TLS/SSL work to secure HTTPS?", "key_points": ["Handshake", "Certificate validation", "Symmetric encryption"]},
  {"level": 4, "question": "What are HTTP status codes and their categories?", "key_points": ["1xx informational", "2xx success", "3xx redirect", "4xx client error", "5xx server error"]},
  {"level": 5, "question": "What is HTTP/3 and why does it use QUIC?", "key_points": ["UDP-based", "Reduced latency", "Connection migration"]}
]'::jsonb,
ARRAY['http', 'https', 'tls', 'web-protocols'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['http', 'security', 'networking'], 15),

-- Follow-Up Question 34 (CN)
('cn', 'DNS', 'medium',
'Explain how DNS works and the DNS resolution process.',
'[
  {"level": 1, "question": "What are the different types of DNS records?", "key_points": ["A, AAAA, CNAME, MX, NS, TXT", "Purpose of each", "Record format"]},
  {"level": 2, "question": "Explain recursive vs iterative DNS queries.", "key_points": ["Resolver responsibility", "Query delegation", "Response handling"]},
  {"level": 3, "question": "What is DNS caching and TTL?", "key_points": ["Time to live", "Cache hierarchy", "Cache poisoning"]},
  {"level": 4, "question": "How does DNS load balancing work?", "key_points": ["Round-robin DNS", "GeoDNS", "Multiple A records"]},
  {"level": 5, "question": "What is DNSSEC and why is it important?", "key_points": ["DNS Security Extensions", "Digital signatures", "Chain of trust"]}
]'::jsonb,
ARRAY['dns', 'name-resolution', 'caching', 'dnssec'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['dns', 'networking', 'protocols'], 15),

-- Follow-Up Question 35 (CN)
('cn', 'Network Security', 'hard',
'Explain common network security concepts and attacks.',
'[
  {"level": 1, "question": "What is the difference between symmetric and asymmetric encryption?", "key_points": ["Single vs key pair", "Speed vs security", "Use cases"]},
  {"level": 2, "question": "What is a man-in-the-middle attack and how to prevent it?", "key_points": ["Intercepting communication", "Certificate pinning", "HTTPS"]},
  {"level": 3, "question": "How does a firewall protect a network?", "key_points": ["Packet filtering", "Stateful inspection", "Application layer filtering"]},
  {"level": 4, "question": "What is a DDoS attack and mitigation strategies?", "key_points": ["Distributed denial of service", "Rate limiting", "CDN protection"]},
  {"level": 5, "question": "Explain the difference between VPN and proxy.", "key_points": ["Encryption level", "All traffic vs specific", "Anonymity"]}
]'::jsonb,
ARRAY['network-security', 'encryption', 'firewall', 'attacks'],
'{"depth": 30, "accuracy": 35, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['security', 'networking', 'protocols'], 20),

-- Follow-Up Question 36 (JavaScript)
('javascript', 'Promises', 'medium',
'What are Promises in JavaScript and how do they work?',
'[
  {"level": 1, "question": "What are the three states of a Promise?", "key_points": ["Pending, Fulfilled, Rejected", "State transitions", "Immutable once settled"]},
  {"level": 2, "question": "What is Promise chaining and how does it work?", "key_points": ["then() returns Promise", "Sequential async operations", "Error propagation"]},
  {"level": 3, "question": "What is the difference between Promise.all and Promise.race?", "key_points": ["All resolved vs first settled", "Error handling", "Use cases"]},
  {"level": 4, "question": "How do you convert callback-based code to Promises?", "key_points": ["Promisification", "util.promisify", "Custom wrapper"]},
  {"level": 5, "question": "What is Promise.allSettled and when to use it?", "key_points": ["Wait for all regardless of outcome", "No short-circuit on rejection", "Status reporting"]}
]'::jsonb,
ARRAY['promises', 'async', 'then-catch', 'error-handling'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['promises', 'javascript', 'async'], 15),

-- Follow-Up Question 37 (JavaScript)
('javascript', 'Prototypes', 'hard',
'Explain prototypal inheritance in JavaScript.',
'[
  {"level": 1, "question": "What is the prototype chain?", "key_points": ["Object.__proto__", "Property lookup", "Ends at null"]},
  {"level": 2, "question": "What is the difference between __proto__ and prototype?", "key_points": ["Instance vs constructor", "prototype is for functions", "__proto__ is for objects"]},
  {"level": 3, "question": "How does Object.create() work?", "key_points": ["Creates with specified prototype", "No constructor call", "Pure prototypal inheritance"]},
  {"level": 4, "question": "How do ES6 classes relate to prototypes?", "key_points": ["Syntactic sugar", "Still prototypal underneath", "class and extends"]},
  {"level": 5, "question": "How would you implement classical inheritance in JavaScript?", "key_points": ["Constructor stealing", "Prototype chaining", "Parasitic combination"]}
]'::jsonb,
ARRAY['prototypes', 'inheritance', 'prototype-chain', 'es6-classes'],
'{"depth": 30, "accuracy": 35, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['prototypes', 'javascript', 'inheritance'], 20),

-- Follow-Up Question 38 (JavaScript)
('javascript', 'this Keyword', 'medium',
'Explain the "this" keyword in JavaScript and its binding rules.',
'[
  {"level": 1, "question": "What are the four binding rules for this?", "key_points": ["Default, Implicit, Explicit, new binding", "Precedence order", "Context determination"]},
  {"level": 2, "question": "How do arrow functions handle this differently?", "key_points": ["Lexical this", "No own binding", "Inherits from enclosing scope"]},
  {"level": 3, "question": "What is the difference between call, apply, and bind?", "key_points": ["Immediate vs later execution", "Arguments as array vs list", "Returns new function"]},
  {"level": 4, "question": "What is this in event handlers?", "key_points": ["Event target", "Arrow function difference", "Explicit binding needed"]},
  {"level": 5, "question": "How do you handle this in callback functions?", "key_points": ["Arrow functions", "bind()", "self/that pattern"]}
]'::jsonb,
ARRAY['this', 'binding', 'call-apply-bind', 'arrow-functions'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['this', 'javascript', 'functions'], 15),

-- Follow-Up Question 39 (Python)
('python', 'OOP in Python', 'medium',
'Explain Object-Oriented Programming features in Python.',
'[
  {"level": 1, "question": "What is the difference between __init__ and __new__?", "key_points": ["__new__ creates instance", "__init__ initializes", "When to override"]},
  {"level": 2, "question": "What are magic/dunder methods?", "key_points": ["Double underscore", "__str__, __repr__, __len__", "Operator overloading"]},
  {"level": 3, "question": "How does multiple inheritance work in Python?", "key_points": ["MRO", "C3 linearization", "super() usage"]},
  {"level": 4, "question": "What are metaclasses in Python?", "key_points": ["Class of a class", "type as metaclass", "Customizing class creation"]},
  {"level": 5, "question": "What is the descriptor protocol?", "key_points": ["__get__, __set__, __delete__", "Property implementation", "Data vs non-data descriptors"]}
]'::jsonb,
ARRAY['oop', 'magic-methods', 'metaclasses', 'descriptors'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['oop', 'python', 'classes'], 15),

-- Follow-Up Question 40 (Python)
('python', 'Memory Management', 'hard',
'How does Python manage memory and garbage collection?',
'[
  {"level": 1, "question": "What is reference counting in Python?", "key_points": ["Count references to object", "Zero count = deallocate", "Immediate cleanup"]},
  {"level": 2, "question": "What are circular references and how are they handled?", "key_points": ["Objects referencing each other", "Reference counting fails", "Generational GC"]},
  {"level": 3, "question": "What is the Python Global Interpreter Lock (GIL)?", "key_points": ["Single thread executes Python", "CPU-bound limitation", "Workarounds"]},
  {"level": 4, "question": "What is the difference between deep copy and shallow copy?", "key_points": ["Nested objects", "copy.copy vs copy.deepcopy", "Mutable objects"]},
  {"level": 5, "question": "How can you optimize memory usage in Python?", "key_points": ["__slots__", "Generators", "Memory profiling"]}
]'::jsonb,
ARRAY['memory-management', 'garbage-collection', 'gil', 'reference-counting'],
'{"depth": 30, "accuracy": 35, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['memory', 'python', 'performance'], 20),

-- Follow-Up Question 41 (Python)
('python', 'Context Managers', 'medium',
'What are context managers in Python and how do they work?',
'[
  {"level": 1, "question": "What is the with statement used for?", "key_points": ["Resource management", "Automatic cleanup", "Exception handling"]},
  {"level": 2, "question": "How do you create a context manager using __enter__ and __exit__?", "key_points": ["Class-based approach", "__enter__ returns resource", "__exit__ handles cleanup"]},
  {"level": 3, "question": "How does contextlib.contextmanager decorator work?", "key_points": ["Generator-based", "yield statement", "Simpler implementation"]},
  {"level": 4, "question": "How are exceptions handled in context managers?", "key_points": ["__exit__ receives exception info", "Return True to suppress", "Exception propagation"]},
  {"level": 5, "question": "How do you nest multiple context managers?", "key_points": ["Multiple with statements", "contextlib.ExitStack", "Resource cleanup order"]}
]'::jsonb,
ARRAY['context-managers', 'with-statement', 'resource-management', 'contextlib'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['context-managers', 'python', 'resources'], 15),

-- Follow-Up Question 42 (Java)
('java', 'Collections', 'medium',
'Explain the Java Collections Framework.',
'[
  {"level": 1, "question": "What is the difference between ArrayList and LinkedList?", "key_points": ["Array vs nodes", "Random access", "Insertion performance"]},
  {"level": 2, "question": "How does HashMap work internally?", "key_points": ["Hash buckets", "Collision handling", "Load factor and rehashing"]},
  {"level": 3, "question": "What is the difference between HashMap and TreeMap?", "key_points": ["Hash vs Red-Black tree", "Ordering", "Time complexity"]},
  {"level": 4, "question": "What is ConcurrentHashMap and how does it achieve thread safety?", "key_points": ["Segment locking", "Lock-free reads", "Better than synchronized HashMap"]},
  {"level": 5, "question": "What is the difference between fail-fast and fail-safe iterators?", "key_points": ["ConcurrentModificationException", "Copy of collection", "Performance trade-off"]}
]'::jsonb,
ARRAY['collections', 'hashmap', 'arraylist', 'concurrent-collections'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['collections', 'java', 'data-structures'], 15),

-- Follow-Up Question 43 (Java)
('java', 'Exception Handling', 'medium',
'Explain exception handling in Java.',
'[
  {"level": 1, "question": "What is the exception hierarchy in Java?", "key_points": ["Throwable, Error, Exception", "RuntimeException", "Checked vs unchecked"]},
  {"level": 2, "question": "What is the difference between throw and throws?", "key_points": ["throw raises exception", "throws declares possibility", "Method signature"]},
  {"level": 3, "question": "What is try-with-resources?", "key_points": ["AutoCloseable interface", "Automatic resource management", "Multiple resources"]},
  {"level": 4, "question": "What are suppressed exceptions?", "key_points": ["Exception during close", "getSuppressed()", "Try-with-resources feature"]},
  {"level": 5, "question": "What are best practices for exception handling?", "key_points": ["Specific exceptions", "Don''t catch Throwable", "Log and rethrow appropriately"]}
]'::jsonb,
ARRAY['exceptions', 'try-catch', 'checked-unchecked', 'error-handling'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['exceptions', 'java', 'error-handling'], 15),

-- Follow-Up Question 44 (Java)
('java', 'Streams API', 'hard',
'What is the Java Streams API and how does it work?',
'[
  {"level": 1, "question": "What is the difference between intermediate and terminal operations?", "key_points": ["Lazy vs eager", "Return stream vs result", "Pipeline execution"]},
  {"level": 2, "question": "What is the difference between map and flatMap?", "key_points": ["One-to-one vs one-to-many", "Stream flattening", "Nested structures"]},
  {"level": 3, "question": "How does parallel stream work?", "key_points": ["Fork/Join pool", "Stateless operations", "Thread safety concerns"]},
  {"level": 4, "question": "What is the difference between reduce and collect?", "key_points": ["Immutable vs mutable reduction", "Collectors utility", "Custom collectors"]},
  {"level": 5, "question": "When should you not use streams?", "key_points": ["Simple iterations", "Debugging difficulty", "Performance overhead"]}
]'::jsonb,
ARRAY['streams', 'functional-programming', 'lambda', 'collectors'],
'{"depth": 30, "accuracy": 35, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['streams', 'java', 'functional'], 20),

-- Follow-Up Question 45 (C++)
('cpp', 'Templates', 'medium',
'What are templates in C++ and how do they work?',
'[
  {"level": 1, "question": "What is the difference between function templates and class templates?", "key_points": ["Generic functions vs classes", "Type deduction", "Specialization"]},
  {"level": 2, "question": "What is template specialization?", "key_points": ["Custom implementation for specific types", "Full vs partial", "Priority rules"]},
  {"level": 3, "question": "What is SFINAE?", "key_points": ["Substitution Failure Is Not An Error", "Enable_if", "Template overloading"]},
  {"level": 4, "question": "What are variadic templates?", "key_points": ["Variable number of arguments", "Parameter pack", "Fold expressions"]},
  {"level": 5, "question": "What is template metaprogramming?", "key_points": ["Compile-time computation", "Type traits", "Constexpr vs templates"]}
]'::jsonb,
ARRAY['templates', 'generics', 'sfinae', 'metaprogramming'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['templates', 'cpp', 'generics'], 15),

-- Follow-Up Question 46 (C++)
('cpp', 'STL Containers', 'medium',
'Explain the C++ Standard Template Library containers.',
'[
  {"level": 1, "question": "What are the categories of STL containers?", "key_points": ["Sequence, Associative, Unordered", "Container adaptors", "Use cases"]},
  {"level": 2, "question": "What is the difference between vector and deque?", "key_points": ["Contiguous vs segmented", "Front insertion", "Iterator invalidation"]},
  {"level": 3, "question": "When would you use set vs unordered_set?", "key_points": ["Ordered vs unordered", "O(log n) vs O(1)", "Hash function requirement"]},
  {"level": 4, "question": "What is iterator invalidation and when does it occur?", "key_points": ["Vector reallocation", "Map insertion", "Safe operations"]},
  {"level": 5, "question": "How do you choose the right container for a task?", "key_points": ["Access patterns", "Insertion/deletion frequency", "Memory layout"]}
]'::jsonb,
ARRAY['stl', 'containers', 'vector', 'map'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['stl', 'cpp', 'containers'], 15),

-- Follow-Up Question 47 (C++)
('cpp', 'Memory Model', 'hard',
'Explain the C++ memory model and memory ordering.',
'[
  {"level": 1, "question": "What are the different memory regions in C++?", "key_points": ["Stack, Heap, Static, Code", "Lifetime differences", "Allocation patterns"]},
  {"level": 2, "question": "What is a memory leak and how do you detect it?", "key_points": ["Unreleased dynamic memory", "Valgrind", "AddressSanitizer"]},
  {"level": 3, "question": "What are the memory ordering options in C++11 atomics?", "key_points": ["relaxed, acquire, release, seq_cst", "Synchronization", "Performance trade-offs"]},
  {"level": 4, "question": "What is cache coherence and false sharing?", "key_points": ["Cache line contention", "Performance impact", "Padding solution"]},
  {"level": 5, "question": "What is placement new and when would you use it?", "key_points": ["Construct in pre-allocated memory", "Memory pools", "Custom allocators"]}
]'::jsonb,
ARRAY['memory-model', 'atomics', 'cache', 'memory-ordering'],
'{"depth": 30, "accuracy": 35, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['memory', 'cpp', 'concurrency'], 20),

-- Follow-Up Question 48 (C)
('c', 'Memory Allocation', 'medium',
'Explain dynamic memory allocation in C.',
'[
  {"level": 1, "question": "What is the difference between malloc and calloc?", "key_points": ["Initialization", "Parameters", "Zero-filling"]},
  {"level": 2, "question": "How does realloc work internally?", "key_points": ["May move memory", "Copies existing data", "Returns new pointer"]},
  {"level": 3, "question": "What are common memory errors in C?", "key_points": ["Memory leaks", "Buffer overflow", "Use after free", "Double free"]},
  {"level": 4, "question": "How do you implement a simple memory allocator?", "key_points": ["Free list", "Block headers", "Coalescing"]},
  {"level": 5, "question": "What is memory alignment and why is it important?", "key_points": ["Hardware requirements", "Performance", "Padding"]}
]'::jsonb,
ARRAY['malloc', 'memory-allocation', 'heap', 'memory-errors'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['memory', 'c', 'allocation'], 15),

-- Follow-Up Question 49 (C)
('c', 'Preprocessor', 'medium',
'Explain the C preprocessor and its directives.',
'[
  {"level": 1, "question": "What is the difference between #include <> and #include \"\"?", "key_points": ["System vs local headers", "Search paths", "Conventions"]},
  {"level": 2, "question": "How do you prevent header files from being included multiple times?", "key_points": ["Include guards", "#pragma once", "Conditional compilation"]},
  {"level": 3, "question": "What are macros and what are their pitfalls?", "key_points": ["Text substitution", "Side effects", "Type safety issues"]},
  {"level": 4, "question": "What is the difference between macro and inline function?", "key_points": ["Compile-time vs runtime", "Type checking", "Debugging"]},
  {"level": 5, "question": "What is conditional compilation and when is it used?", "key_points": ["#ifdef, #ifndef, #endif", "Platform-specific code", "Feature flags"]}
]'::jsonb,
ARRAY['preprocessor', 'macros', 'include-guards', 'conditional-compilation'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['preprocessor', 'c', 'compilation'], 15),

-- Follow-Up Question 50 (C)
('c', 'File I/O', 'medium',
'Explain file input/output operations in C.',
'[
  {"level": 1, "question": "What is the difference between text and binary file modes?", "key_points": ["Newline translation", "Character encoding", "fopen modes"]},
  {"level": 2, "question": "What are buffered vs unbuffered I/O?", "key_points": ["Performance", "fflush", "setbuf"]},
  {"level": 3, "question": "How do fread and fwrite work?", "key_points": ["Block I/O", "Size and count", "Return value"]},
  {"level": 4, "question": "What is the difference between fseek, ftell, and rewind?", "key_points": ["File position", "SEEK_SET, SEEK_CUR, SEEK_END", "Reset position"]},
  {"level": 5, "question": "How do low-level I/O functions differ from stdio functions?", "key_points": ["open vs fopen", "File descriptors vs FILE*", "System calls"]}
]'::jsonb,
ARRAY['file-io', 'stdio', 'buffering', 'file-operations'],
'{"depth": 25, "accuracy": 40, "examples": 20, "clarity": 15}'::jsonb,
ARRAY['file-io', 'c', 'io'], 15);


-- =====================================================
-- Create helper functions for Practice Modes
-- =====================================================

-- Get random coding questions
CREATE OR REPLACE FUNCTION get_random_coding_questions(
    p_domain VARCHAR(50) DEFAULT NULL,
    p_difficulty VARCHAR(20) DEFAULT NULL,
    p_limit INT DEFAULT 5
)
RETURNS SETOF coding_practice_questions AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM coding_practice_questions
    WHERE (p_domain IS NULL OR domain = p_domain)
    AND (p_difficulty IS NULL OR difficulty = p_difficulty)
    ORDER BY RANDOM()
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Get random follow-up questions
CREATE OR REPLACE FUNCTION get_random_followup_questions(
    p_domain VARCHAR(50) DEFAULT NULL,
    p_difficulty VARCHAR(20) DEFAULT NULL,
    p_limit INT DEFAULT 5
)
RETURNS SETOF followup_questions AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM followup_questions
    WHERE (p_domain IS NULL OR domain = p_domain)
    AND (p_difficulty IS NULL OR difficulty = p_difficulty)
    ORDER BY RANDOM()
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;


-- =====================================================
-- Summary Views for all Practice Modes
-- =====================================================

CREATE OR REPLACE VIEW coding_practice_summary AS
SELECT 
    domain,
    COUNT(*) as total_questions,
    COUNT(*) FILTER (WHERE difficulty = 'easy') as easy_count,
    COUNT(*) FILTER (WHERE difficulty = 'medium') as medium_count,
    COUNT(*) FILTER (WHERE difficulty = 'hard') as hard_count
FROM coding_practice_questions
GROUP BY domain
ORDER BY domain;

CREATE OR REPLACE VIEW followup_questions_summary AS
SELECT 
    domain,
    COUNT(*) as total_questions,
    COUNT(*) FILTER (WHERE difficulty = 'easy') as easy_count,
    COUNT(*) FILTER (WHERE difficulty = 'medium') as medium_count,
    COUNT(*) FILTER (WHERE difficulty = 'hard') as hard_count
FROM followup_questions
GROUP BY domain
ORDER BY domain;


-- =====================================================
-- Summary View
-- =====================================================

CREATE OR REPLACE VIEW tipe_questions_summary AS
SELECT 
    domain,
    COUNT(*) as total_questions,
    COUNT(*) FILTER (WHERE difficulty = 'easy') as easy_count,
    COUNT(*) FILTER (WHERE difficulty = 'medium') as medium_count,
    COUNT(*) FILTER (WHERE difficulty = 'hard') as hard_count
FROM tipe_questions
GROUP BY domain
ORDER BY domain;


-- =====================================================
-- Verify the data
-- =====================================================

-- Check total questions per domain
SELECT domain, COUNT(*) as question_count 
FROM tipe_questions 
GROUP BY domain 
ORDER BY domain;

-- Should show 20 questions for each of the 10 domains = 200 total
SELECT COUNT(*) as total_questions FROM tipe_questions;
