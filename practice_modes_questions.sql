-- =====================================================
-- PRACTICE MODES QUESTIONS DATA
-- Total: 400 Questions (200 Coding + 200 Follow-Up)
-- 20 Questions per Domain for Each Mode
-- Domains: DSA, DBMS, OS, OOPs, Networks, C, C++, Java, Python, JavaScript
-- =====================================================

-- Drop existing data to avoid duplicates
DELETE FROM coding_practice_questions;
DELETE FROM followup_questions;

-- =====================================================
-- 1. DATA STRUCTURES & ALGORITHMS (DSA) - CODING PRACTICE
-- 20 Coding Questions
-- =====================================================

INSERT INTO coding_practice_questions (domain, topic, difficulty, question_title, question_description, template_code, solution_code, test_cases, time_complexity, space_complexity, constraints, hints, tags, estimated_time_minutes) VALUES

-- DSA Coding 1
('dsa', 'Arrays', 'easy', 'Two Sum',
'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.',
'function twoSum(nums, target) {
  // Your code here
}',
'function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}',
'[{"input": "[2,7,11,15], 9", "expected": "[0,1]"}, {"input": "[3,2,4], 6", "expected": "[1,2]"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Array length: 2-10^4'], ARRAY['Use hash map'], ARRAY['arrays', 'hash-map'], 10),

-- DSA Coding 2
('dsa', 'Arrays', 'easy', 'Maximum Subarray',
'Find the contiguous subarray with the largest sum and return its sum.',
'function maxSubArray(nums) {
  // Your code here
}',
'function maxSubArray(nums) {
  let maxSum = nums[0], currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}',
'[{"input": "[-2,1,-3,4,-1,2,1,-5,4]", "expected": "6"}, {"input": "[1]", "expected": "1"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['1 <= nums.length <= 10^5'], ARRAY['Kadane algorithm'], ARRAY['arrays', 'dynamic-programming'], 10),

-- DSA Coding 3
('dsa', 'Arrays', 'medium', 'Product of Array Except Self',
'Return an array where each element is the product of all elements except itself, without using division.',
'function productExceptSelf(nums) {
  // Your code here
}',
'function productExceptSelf(nums) {
  const n = nums.length, result = new Array(n).fill(1);
  let left = 1, right = 1;
  for (let i = 0; i < n; i++) {
    result[i] *= left;
    left *= nums[i];
  }
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= right;
    right *= nums[i];
  }
  return result;
}',
'[{"input": "[1,2,3,4]", "expected": "[24,12,8,6]"}, {"input": "[-1,1,0,-3,3]", "expected": "[0,0,9,0,0]"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['2 <= nums.length <= 10^5'], ARRAY['Use prefix and suffix products'], ARRAY['arrays', 'prefix-sum'], 15),

-- DSA Coding 4
('dsa', 'Arrays', 'medium', 'Container With Most Water',
'Find two lines that together with x-axis form a container with the most water.',
'function maxArea(height) {
  // Your code here
}',
'function maxArea(height) {
  let left = 0, right = height.length - 1, maxWater = 0;
  while (left < right) {
    maxWater = Math.max(maxWater, Math.min(height[left], height[right]) * (right - left));
    if (height[left] < height[right]) left++;
    else right--;
  }
  return maxWater;
}',
'[{"input": "[1,8,6,2,5,4,8,3,7]", "expected": "49"}, {"input": "[1,1]", "expected": "1"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['n >= 2'], ARRAY['Two pointers from both ends'], ARRAY['arrays', 'two-pointers'], 15),

-- DSA Coding 5
('dsa', 'Strings', 'easy', 'Valid Palindrome',
'Check if a string is a palindrome after removing non-alphanumeric characters.',
'function isPalindrome(s) {
  // Your code here
}',
'function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0, right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left++] !== cleaned[right--]) return false;
  }
  return true;
}',
'[{"input": "A man, a plan, a canal: Panama", "expected": "true"}, {"input": "race a car", "expected": "false"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['1 <= s.length <= 2*10^5'], ARRAY['Clean string first', 'Two pointers'], ARRAY['strings', 'two-pointers'], 10),

-- DSA Coding 6
('dsa', 'Strings', 'medium', 'Longest Substring Without Repeating Characters',
'Find the length of the longest substring without repeating characters.',
'function lengthOfLongestSubstring(s) {
  // Your code here
}',
'function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let maxLen = 0, start = 0;
  for (let i = 0; i < s.length; i++) {
    if (seen.has(s[i]) && seen.get(s[i]) >= start) {
      start = seen.get(s[i]) + 1;
    }
    seen.set(s[i], i);
    maxLen = Math.max(maxLen, i - start + 1);
  }
  return maxLen;
}',
'[{"input": "abcabcbb", "expected": "3"}, {"input": "bbbbb", "expected": "1"}, {"input": "pwwkew", "expected": "3"}]'::jsonb,
'O(n)', 'O(min(n,m))', ARRAY['0 <= s.length <= 5*10^4'], ARRAY['Sliding window technique'], ARRAY['strings', 'sliding-window', 'hash-map'], 15),

-- DSA Coding 7
('dsa', 'Strings', 'medium', 'Group Anagrams',
'Group strings that are anagrams of each other.',
'function groupAnagrams(strs) {
  // Your code here
}',
'function groupAnagrams(strs) {
  const map = new Map();
  for (const str of strs) {
    const key = str.split("").sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }
  return Array.from(map.values());
}',
'[{"input": "[\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", "expected": "[[\"eat\",\"tea\",\"ate\"],[\"tan\",\"nat\"],[\"bat\"]]"}]'::jsonb,
'O(n*k*log k)', 'O(n*k)', ARRAY['1 <= strs.length <= 10^4'], ARRAY['Sort as key'], ARRAY['strings', 'hash-map', 'sorting'], 15),

-- DSA Coding 8
('dsa', 'Linked Lists', 'easy', 'Reverse Linked List',
'Reverse a singly linked list.',
'function reverseList(head) {
  // Your code here
}',
'function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}',
'[{"input": "[1,2,3,4,5]", "expected": "[5,4,3,2,1]"}, {"input": "[1,2]", "expected": "[2,1]"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['0 <= n <= 5000'], ARRAY['Use three pointers'], ARRAY['linked-list', 'pointers'], 10),

-- DSA Coding 9
('dsa', 'Linked Lists', 'medium', 'Merge Two Sorted Lists',
'Merge two sorted linked lists into one sorted list.',
'function mergeTwoLists(list1, list2) {
  // Your code here
}',
'function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(-1);
  let curr = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) { curr.next = list1; list1 = list1.next; }
    else { curr.next = list2; list2 = list2.next; }
    curr = curr.next;
  }
  curr.next = list1 || list2;
  return dummy.next;
}',
'[{"input": "[1,2,4], [1,3,4]", "expected": "[1,1,2,3,4,4]"}]'::jsonb,
'O(n+m)', 'O(1)', ARRAY['Lists are sorted'], ARRAY['Use dummy node'], ARRAY['linked-list', 'merge'], 15),

-- DSA Coding 10
('dsa', 'Linked Lists', 'medium', 'Detect Cycle in Linked List',
'Determine if a linked list has a cycle.',
'function hasCycle(head) {
  // Your code here
}',
'function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}',
'[{"input": "[3,2,0,-4] pos=1", "expected": "true"}, {"input": "[1] pos=-1", "expected": "false"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['n <= 10^4'], ARRAY['Floyd cycle detection'], ARRAY['linked-list', 'two-pointers'], 10),

-- DSA Coding 11
('dsa', 'Stacks', 'easy', 'Valid Parentheses',
'Check if the input string has valid bracket pairs.',
'function isValid(s) {
  // Your code here
}',
'function isValid(s) {
  const stack = [], map = { ")": "(", "}": "{", "]": "[" };
  for (const char of s) {
    if (char in map) { if (stack.pop() !== map[char]) return false; }
    else stack.push(char);
  }
  return stack.length === 0;
}',
'[{"input": "()", "expected": "true"}, {"input": "()[]{}", "expected": "true"}, {"input": "(]", "expected": "false"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['1 <= s.length <= 10^4'], ARRAY['Use stack for matching'], ARRAY['stack', 'strings'], 10),

-- DSA Coding 12
('dsa', 'Stacks', 'medium', 'Min Stack',
'Design a stack that supports push, pop, top, and retrieving minimum in O(1).',
'class MinStack {
  constructor() { /* Your code */ }
  push(val) { /* Your code */ }
  pop() { /* Your code */ }
  top() { /* Your code */ }
  getMin() { /* Your code */ }
}',
'class MinStack {
  constructor() { this.stack = []; this.minStack = []; }
  push(val) { this.stack.push(val); if (!this.minStack.length || val <= this.minStack[this.minStack.length-1]) this.minStack.push(val); }
  pop() { if (this.stack.pop() === this.minStack[this.minStack.length-1]) this.minStack.pop(); }
  top() { return this.stack[this.stack.length-1]; }
  getMin() { return this.minStack[this.minStack.length-1]; }
}',
'[{"input": "push(-2),push(0),push(-3),getMin(),pop(),top(),getMin()", "expected": "-3,0,-2"}]'::jsonb,
'O(1)', 'O(n)', ARRAY['Methods will be called at most 3*10^4 times'], ARRAY['Use auxiliary stack for mins'], ARRAY['stack', 'design'], 15),

-- DSA Coding 13
('dsa', 'Trees', 'easy', 'Maximum Depth of Binary Tree',
'Return the maximum depth of a binary tree.',
'function maxDepth(root) {
  // Your code here
}',
'function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}',
'[{"input": "[3,9,20,null,null,15,7]", "expected": "3"}, {"input": "[1,null,2]", "expected": "2"}]'::jsonb,
'O(n)', 'O(h)', ARRAY['0 <= n <= 10^4'], ARRAY['Use recursion'], ARRAY['trees', 'recursion', 'dfs'], 10),

-- DSA Coding 14
('dsa', 'Trees', 'easy', 'Invert Binary Tree',
'Invert a binary tree (mirror image).',
'function invertTree(root) {
  // Your code here
}',
'function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}',
'[{"input": "[4,2,7,1,3,6,9]", "expected": "[4,7,2,9,6,3,1]"}]'::jsonb,
'O(n)', 'O(h)', ARRAY['0 <= n <= 100'], ARRAY['Swap left and right recursively'], ARRAY['trees', 'recursion'], 10),

-- DSA Coding 15
('dsa', 'Trees', 'medium', 'Validate Binary Search Tree',
'Check if a binary tree is a valid BST.',
'function isValidBST(root) {
  // Your code here
}',
'function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}',
'[{"input": "[2,1,3]", "expected": "true"}, {"input": "[5,1,4,null,null,3,6]", "expected": "false"}]'::jsonb,
'O(n)', 'O(h)', ARRAY['Node count <= 10^4'], ARRAY['Pass min/max bounds'], ARRAY['trees', 'bst', 'recursion'], 15),

-- DSA Coding 16
('dsa', 'Dynamic Programming', 'easy', 'Climbing Stairs',
'Find number of distinct ways to climb n stairs taking 1 or 2 steps.',
'function climbStairs(n) {
  // Your code here
}',
'function climbStairs(n) {
  if (n <= 2) return n;
  let prev1 = 1, prev2 = 2;
  for (let i = 3; i <= n; i++) { [prev1, prev2] = [prev2, prev1 + prev2]; }
  return prev2;
}',
'[{"input": "2", "expected": "2"}, {"input": "3", "expected": "3"}, {"input": "5", "expected": "8"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['1 <= n <= 45'], ARRAY['Fibonacci pattern'], ARRAY['dynamic-programming', 'fibonacci'], 10),

-- DSA Coding 17
('dsa', 'Dynamic Programming', 'medium', 'Coin Change',
'Find minimum coins needed to make up the amount.',
'function coinChange(coins, amount) {
  // Your code here
}',
'function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}',
'[{"input": "[1,2,5], 11", "expected": "3"}, {"input": "[2], 3", "expected": "-1"}]'::jsonb,
'O(amount*n)', 'O(amount)', ARRAY['1 <= coins.length <= 12'], ARRAY['Bottom-up DP'], ARRAY['dynamic-programming', 'bfs'], 20),

-- DSA Coding 18
('dsa', 'Graphs', 'medium', 'Number of Islands',
'Count the number of islands in a 2D grid.',
'function numIslands(grid) {
  // Your code here
}',
'function numIslands(grid) {
  let count = 0;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] === "0") return;
    grid[r][c] = "0";
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  };
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === "1") { count++; dfs(r, c); }
    }
  }
  return count;
}',
'[{"input": "[[\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]", "expected": "2"}]'::jsonb,
'O(m*n)', 'O(m*n)', ARRAY['m, n <= 300'], ARRAY['DFS to mark visited'], ARRAY['graphs', 'dfs', 'matrix'], 20),

-- DSA Coding 19
('dsa', 'Binary Search', 'easy', 'Binary Search',
'Find target in sorted array, return index or -1.',
'function search(nums, target) {
  // Your code here
}',
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
'[{"input": "[-1,0,3,5,9,12], 9", "expected": "4"}, {"input": "[-1,0,3,5,9,12], 2", "expected": "-1"}]'::jsonb,
'O(log n)', 'O(1)', ARRAY['Array is sorted'], ARRAY['Compare mid element'], ARRAY['binary-search', 'arrays'], 10),

-- DSA Coding 20
('dsa', 'Sorting', 'medium', 'Merge Intervals',
'Merge all overlapping intervals.',
'function merge(intervals) {
  // Your code here
}',
'function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1];
    if (intervals[i][0] <= last[1]) last[1] = Math.max(last[1], intervals[i][1]);
    else result.push(intervals[i]);
  }
  return result;
}',
'[{"input": "[[1,3],[2,6],[8,10],[15,18]]", "expected": "[[1,6],[8,10],[15,18]]"}]'::jsonb,
'O(n log n)', 'O(n)', ARRAY['1 <= intervals.length <= 10^4'], ARRAY['Sort by start time'], ARRAY['sorting', 'intervals'], 15),


-- =====================================================
-- 2. DATABASE MANAGEMENT SYSTEMS (DBMS) - CODING PRACTICE
-- 20 SQL Coding Questions
-- =====================================================

-- DBMS Coding 1
('dbms', 'SQL Queries', 'easy', 'Select All Employees',
'Write a query to select all employees from the Employees table.',
'-- Table: Employees (id, name, salary, department)
SELECT ...',
'SELECT * FROM Employees;',
'[{"input": "Employees table", "expected": "All rows"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Basic SELECT'], ARRAY['Use SELECT *'], ARRAY['sql', 'select'], 5),

-- DBMS Coding 2
('dbms', 'SQL Queries', 'easy', 'Find High Salary Employees',
'Select employees with salary greater than 50000.',
'-- Table: Employees (id, name, salary)
SELECT ...',
'SELECT * FROM Employees WHERE salary > 50000;',
'[{"input": "Employees table", "expected": "Employees with salary > 50000"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['WHERE clause'], ARRAY['Use WHERE for filtering'], ARRAY['sql', 'where'], 5),

-- DBMS Coding 3
('dbms', 'SQL Queries', 'easy', 'Count Employees Per Department',
'Count the number of employees in each department.',
'-- Table: Employees (id, name, department)
SELECT ...',
'SELECT department, COUNT(*) as employee_count FROM Employees GROUP BY department;',
'[{"input": "Employees table", "expected": "Department-wise count"}]'::jsonb,
'O(n)', 'O(d)', ARRAY['GROUP BY'], ARRAY['Use GROUP BY and COUNT'], ARRAY['sql', 'group-by', 'aggregation'], 8),

-- DBMS Coding 4
('dbms', 'SQL Queries', 'medium', 'Second Highest Salary',
'Find the second highest salary from the Employees table.',
'-- Table: Employees (id, name, salary)
SELECT ...',
'SELECT MAX(salary) AS SecondHighest FROM Employees WHERE salary < (SELECT MAX(salary) FROM Employees);',
'[{"input": "Salaries: 100, 200, 300", "expected": "200"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['Subquery needed'], ARRAY['Use subquery with MAX'], ARRAY['sql', 'subquery'], 10),

-- DBMS Coding 5
('dbms', 'SQL Queries', 'medium', 'Employees With No Manager',
'Find employees who do not have a manager.',
'-- Table: Employees (id, name, manager_id)
SELECT ...',
'SELECT name FROM Employees WHERE manager_id IS NULL;',
'[{"input": "Employees with manager_id", "expected": "Employees where manager_id is NULL"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['NULL handling'], ARRAY['Use IS NULL'], ARRAY['sql', 'null'], 8),

-- DBMS Coding 6
('dbms', 'SQL Queries', 'medium', 'Employees Earning More Than Manager',
'Find employees who earn more than their managers.',
'-- Table: Employees (id, name, salary, manager_id)
SELECT ...',
'SELECT e.name FROM Employees e JOIN Employees m ON e.manager_id = m.id WHERE e.salary > m.salary;',
'[{"input": "Employees table", "expected": "Employees earning more than their manager"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['Self-join needed'], ARRAY['Join table with itself'], ARRAY['sql', 'self-join'], 12),

-- DBMS Coding 7
('dbms', 'SQL Queries', 'medium', 'Duplicate Emails',
'Find all duplicate emails in a table.',
'-- Table: Person (id, email)
SELECT ...',
'SELECT email FROM Person GROUP BY email HAVING COUNT(*) > 1;',
'[{"input": "Person table", "expected": "Duplicate emails"}]'::jsonb,
'O(n)', 'O(e)', ARRAY['HAVING clause'], ARRAY['GROUP BY with HAVING'], ARRAY['sql', 'group-by', 'having'], 10),

-- DBMS Coding 8
('dbms', 'SQL Queries', 'medium', 'Customers Who Never Order',
'Find customers who never placed an order.',
'-- Table: Customers (id, name), Orders (id, customer_id)
SELECT ...',
'SELECT c.name FROM Customers c LEFT JOIN Orders o ON c.id = o.customer_id WHERE o.id IS NULL;',
'[{"input": "Customers and Orders", "expected": "Customers with no orders"}]'::jsonb,
'O(n+m)', 'O(1)', ARRAY['LEFT JOIN'], ARRAY['Use LEFT JOIN with NULL check'], ARRAY['sql', 'left-join'], 12),

-- DBMS Coding 9
('dbms', 'SQL Queries', 'medium', 'Department Top Salary',
'Find the highest salary in each department.',
'-- Table: Employees (id, name, salary, department_id)
SELECT ...',
'SELECT department_id, MAX(salary) as max_salary FROM Employees GROUP BY department_id;',
'[{"input": "Employees table", "expected": "Max salary per department"}]'::jsonb,
'O(n)', 'O(d)', ARRAY['Aggregation'], ARRAY['Use MAX with GROUP BY'], ARRAY['sql', 'aggregation'], 8),

-- DBMS Coding 10
('dbms', 'SQL Queries', 'hard', 'Rank Scores',
'Rank scores in descending order. Same scores get same rank.',
'-- Table: Scores (id, score)
SELECT ...',
'SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) as rank FROM Scores;',
'[{"input": "Scores: 3.5, 3.65, 4.0, 3.85, 4.0", "expected": "Ranked scores"}]'::jsonb,
'O(n log n)', 'O(n)', ARRAY['Window functions'], ARRAY['Use DENSE_RANK()'], ARRAY['sql', 'window-functions'], 15),

-- DBMS Coding 11
('dbms', 'SQL Queries', 'hard', 'Consecutive Numbers',
'Find all numbers that appear at least three times consecutively.',
'-- Table: Logs (id, num) - id is auto-increment
SELECT ...',
'SELECT DISTINCT l1.num FROM Logs l1 JOIN Logs l2 ON l1.id = l2.id - 1 JOIN Logs l3 ON l2.id = l3.id - 1 WHERE l1.num = l2.num AND l2.num = l3.num;',
'[{"input": "Logs: 1,1,1,2,1,2,2", "expected": "1"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['Multiple self-joins'], ARRAY['Join three consecutive rows'], ARRAY['sql', 'self-join'], 15),

-- DBMS Coding 12
('dbms', 'SQL Queries', 'medium', 'Rising Temperature',
'Find dates where temperature was higher than the previous day.',
'-- Table: Weather (id, recordDate, temperature)
SELECT ...',
'SELECT w1.id FROM Weather w1 JOIN Weather w2 ON DATEDIFF(w1.recordDate, w2.recordDate) = 1 WHERE w1.temperature > w2.temperature;',
'[{"input": "Weather data", "expected": "Dates with rising temp"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['Date comparison'], ARRAY['Use DATEDIFF'], ARRAY['sql', 'date', 'self-join'], 12),

-- DBMS Coding 13
('dbms', 'Normalization', 'medium', 'Design 3NF Schema',
'Convert the given denormalized table to 3NF.',
'-- Denormalized: Orders (order_id, customer_name, customer_email, product_name, product_price)
-- Design 3NF schema',
'-- Customers (customer_id PK, customer_name, customer_email)
-- Products (product_id PK, product_name, product_price)
-- Orders (order_id PK, customer_id FK, product_id FK, order_date)',
'[{"input": "Denormalized table", "expected": "Three normalized tables"}]'::jsonb,
'N/A', 'N/A', ARRAY['Understand dependencies'], ARRAY['Remove transitive dependencies'], ARRAY['normalization', '3nf'], 20),

-- DBMS Coding 14
('dbms', 'SQL Queries', 'hard', 'Nth Highest Salary',
'Write a function to get the nth highest salary.',
'CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  -- Your code
END',
'CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  SET N = N - 1;
  RETURN (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET N);
END',
'[{"input": "N=2", "expected": "Second highest salary"}]'::jsonb,
'O(n log n)', 'O(1)', ARRAY['LIMIT OFFSET'], ARRAY['Use OFFSET with LIMIT'], ARRAY['sql', 'function'], 15),

-- DBMS Coding 15
('dbms', 'SQL Queries', 'medium', 'Delete Duplicate Emails',
'Delete duplicate emails keeping only the smallest id.',
'-- Table: Person (id, email)
DELETE ...',
'DELETE p1 FROM Person p1 JOIN Person p2 ON p1.email = p2.email WHERE p1.id > p2.id;',
'[{"input": "Person with duplicates", "expected": "Duplicates removed"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['DELETE with JOIN'], ARRAY['Self-join to find duplicates'], ARRAY['sql', 'delete'], 12),

-- DBMS Coding 16
('dbms', 'SQL Queries', 'medium', 'Department Highest Salary',
'Find employees with the highest salary in each department.',
'-- Tables: Employee (id, name, salary, departmentId), Department (id, name)
SELECT ...',
'SELECT d.name AS Department, e.name AS Employee, e.salary FROM Employee e JOIN Department d ON e.departmentId = d.id WHERE (e.departmentId, e.salary) IN (SELECT departmentId, MAX(salary) FROM Employee GROUP BY departmentId);',
'[{"input": "Employee and Department tables", "expected": "Top earners per dept"}]'::jsonb,
'O(n)', 'O(d)', ARRAY['Correlated subquery'], ARRAY['Find max per group first'], ARRAY['sql', 'subquery', 'join'], 15),

-- DBMS Coding 17
('dbms', 'Transactions', 'medium', 'Bank Transfer Transaction',
'Write a transaction to transfer money between accounts safely.',
'-- Tables: Accounts (id, balance)
-- Transfer 100 from account 1 to account 2',
'START TRANSACTION;
UPDATE Accounts SET balance = balance - 100 WHERE id = 1 AND balance >= 100;
UPDATE Accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;',
'[{"input": "Account balances", "expected": "Atomic transfer"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['ACID properties'], ARRAY['Use transaction for atomicity'], ARRAY['sql', 'transactions'], 15),

-- DBMS Coding 18
('dbms', 'Indexing', 'medium', 'Create Optimal Indexes',
'Create indexes to optimize the given query.',
'-- Query: SELECT * FROM Orders WHERE customer_id = ? AND order_date > ?
-- Create optimal indexes',
'CREATE INDEX idx_customer_date ON Orders(customer_id, order_date);',
'[{"input": "Orders table", "expected": "Composite index"}]'::jsonb,
'O(n log n)', 'O(n)', ARRAY['Index design'], ARRAY['Create composite index'], ARRAY['indexing', 'optimization'], 10),

-- DBMS Coding 19
('dbms', 'SQL Queries', 'hard', 'Median Salary',
'Find the median salary of employees.',
'-- Table: Employee (id, salary)
SELECT ...',
'SELECT AVG(salary) as median FROM (
  SELECT salary FROM Employee ORDER BY salary
  LIMIT 2 - (SELECT COUNT(*) FROM Employee) % 2
  OFFSET (SELECT (COUNT(*) - 1) / 2 FROM Employee)
) AS median_table;',
'[{"input": "Employee salaries", "expected": "Median value"}]'::jsonb,
'O(n log n)', 'O(1)', ARRAY['Complex calculation'], ARRAY['Handle odd/even count'], ARRAY['sql', 'statistics'], 20),

-- DBMS Coding 20
('dbms', 'Stored Procedures', 'hard', 'Pagination Stored Procedure',
'Create a stored procedure for paginated results.',
'-- Create procedure for paginated employee list
CREATE PROCEDURE ...',
'CREATE PROCEDURE GetEmployeePage(IN page_num INT, IN page_size INT)
BEGIN
  SET @offset = (page_num - 1) * page_size;
  SELECT * FROM Employees ORDER BY id LIMIT page_size OFFSET @offset;
END',
'[{"input": "page=2, size=10", "expected": "Rows 11-20"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['Stored procedures'], ARRAY['Calculate offset from page'], ARRAY['sql', 'stored-procedure', 'pagination'], 15),


-- =====================================================
-- 3. OPERATING SYSTEMS (OS) - CODING PRACTICE
-- 20 Coding Questions (Pseudo-code/Logic)
-- =====================================================

-- OS Coding 1
('os', 'Process Scheduling', 'easy', 'FCFS Scheduling',
'Implement First Come First Serve CPU scheduling algorithm.',
'function fcfsScheduling(processes) {
  // processes: [{id, arrivalTime, burstTime}]
  // Return: [{id, waitingTime, turnaroundTime}]
}',
'function fcfsScheduling(processes) {
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
  let currentTime = 0;
  return processes.map(p => {
    const waitingTime = Math.max(0, currentTime - p.arrivalTime);
    currentTime = Math.max(currentTime, p.arrivalTime) + p.burstTime;
    return { id: p.id, waitingTime, turnaroundTime: waitingTime + p.burstTime };
  });
}',
'[{"input": "[{id:1,arrival:0,burst:4},{id:2,arrival:1,burst:3}]", "expected": "Scheduled order"}]'::jsonb,
'O(n log n)', 'O(n)', ARRAY['Non-preemptive'], ARRAY['Sort by arrival time'], ARRAY['scheduling', 'fcfs'], 15),

-- OS Coding 2
('os', 'Process Scheduling', 'medium', 'SJF Scheduling',
'Implement Shortest Job First (non-preemptive) scheduling.',
'function sjfScheduling(processes) {
  // processes: [{id, arrivalTime, burstTime}]
}',
'function sjfScheduling(processes) {
  const result = [], completed = new Set();
  let currentTime = 0;
  while (completed.size < processes.length) {
    const available = processes.filter(p => !completed.has(p.id) && p.arrivalTime <= currentTime);
    if (available.length === 0) { currentTime++; continue; }
    available.sort((a, b) => a.burstTime - b.burstTime);
    const next = available[0];
    completed.add(next.id);
    const waitingTime = currentTime - next.arrivalTime;
    currentTime += next.burstTime;
    result.push({ id: next.id, waitingTime, turnaroundTime: waitingTime + next.burstTime });
  }
  return result;
}',
'[{"input": "Processes with burst times", "expected": "SJF schedule"}]'::jsonb,
'O(n²)', 'O(n)', ARRAY['Non-preemptive'], ARRAY['Select shortest burst from ready queue'], ARRAY['scheduling', 'sjf'], 20),

-- OS Coding 3
('os', 'Process Scheduling', 'medium', 'Round Robin Scheduling',
'Implement Round Robin scheduling with given time quantum.',
'function roundRobin(processes, quantum) {
  // processes: [{id, arrivalTime, burstTime}]
}',
'function roundRobin(processes, quantum) {
  const queue = [], result = {};
  let currentTime = 0, remaining = processes.map(p => ({...p, remaining: p.burstTime}));
  processes.forEach(p => result[p.id] = {waiting: 0, turnaround: 0});
  remaining.sort((a,b) => a.arrivalTime - b.arrivalTime);
  queue.push(remaining.shift());
  while (queue.length > 0 || remaining.length > 0) {
    if (queue.length === 0) { currentTime = remaining[0].arrivalTime; queue.push(remaining.shift()); }
    const current = queue.shift();
    const execTime = Math.min(quantum, current.remaining);
    currentTime += execTime;
    current.remaining -= execTime;
    while (remaining.length > 0 && remaining[0].arrivalTime <= currentTime) queue.push(remaining.shift());
    if (current.remaining > 0) queue.push(current);
    else result[current.id].turnaround = currentTime - current.arrivalTime;
  }
  return result;
}',
'[{"input": "Processes, quantum=2", "expected": "RR schedule"}]'::jsonb,
'O(n*totalBurst/quantum)', 'O(n)', ARRAY['Preemptive'], ARRAY['Use circular queue'], ARRAY['scheduling', 'round-robin'], 25),

-- OS Coding 4
('os', 'Memory Management', 'medium', 'First Fit Allocation',
'Implement First Fit memory allocation algorithm.',
'function firstFit(blockSizes, processSizes) {
  // Return allocation array
}',
'function firstFit(blockSizes, processSizes) {
  const allocation = new Array(processSizes.length).fill(-1);
  const blocks = [...blockSizes];
  for (let i = 0; i < processSizes.length; i++) {
    for (let j = 0; j < blocks.length; j++) {
      if (blocks[j] >= processSizes[i]) {
        allocation[i] = j;
        blocks[j] -= processSizes[i];
        break;
      }
    }
  }
  return allocation;
}',
'[{"input": "blocks:[100,500,200], processes:[212,417,112,426]", "expected": "[1,0,-1,-1]"}]'::jsonb,
'O(n*m)', 'O(n)', ARRAY['Memory allocation'], ARRAY['First block that fits'], ARRAY['memory', 'first-fit'], 15),

-- OS Coding 5
('os', 'Memory Management', 'medium', 'Best Fit Allocation',
'Implement Best Fit memory allocation algorithm.',
'function bestFit(blockSizes, processSizes) {
  // Return allocation array
}',
'function bestFit(blockSizes, processSizes) {
  const allocation = new Array(processSizes.length).fill(-1);
  const blocks = [...blockSizes];
  for (let i = 0; i < processSizes.length; i++) {
    let bestIdx = -1, minDiff = Infinity;
    for (let j = 0; j < blocks.length; j++) {
      if (blocks[j] >= processSizes[i] && blocks[j] - processSizes[i] < minDiff) {
        minDiff = blocks[j] - processSizes[i];
        bestIdx = j;
      }
    }
    if (bestIdx !== -1) {
      allocation[i] = bestIdx;
      blocks[bestIdx] -= processSizes[i];
    }
  }
  return allocation;
}',
'[{"input": "blocks and process sizes", "expected": "Best fit allocation"}]'::jsonb,
'O(n*m)', 'O(n)', ARRAY['Memory allocation'], ARRAY['Smallest sufficient block'], ARRAY['memory', 'best-fit'], 15),

-- OS Coding 6
('os', 'Page Replacement', 'medium', 'FIFO Page Replacement',
'Implement FIFO page replacement algorithm and count page faults.',
'function fifoPageReplacement(pages, frameCount) {
  // Return number of page faults
}',
'function fifoPageReplacement(pages, frameCount) {
  const frames = [];
  let faults = 0;
  for (const page of pages) {
    if (!frames.includes(page)) {
      faults++;
      if (frames.length >= frameCount) frames.shift();
      frames.push(page);
    }
  }
  return faults;
}',
'[{"input": "pages:[7,0,1,2,0,3,0,4,2,3], frames:3", "expected": "6"}]'::jsonb,
'O(n*f)', 'O(f)', ARRAY['Page replacement'], ARRAY['Remove oldest page'], ARRAY['memory', 'page-replacement', 'fifo'], 15),

-- OS Coding 7
('os', 'Page Replacement', 'medium', 'LRU Page Replacement',
'Implement LRU page replacement algorithm.',
'function lruPageReplacement(pages, frameCount) {
  // Return number of page faults
}',
'function lruPageReplacement(pages, frameCount) {
  const frames = [];
  let faults = 0;
  for (const page of pages) {
    const idx = frames.indexOf(page);
    if (idx === -1) {
      faults++;
      if (frames.length >= frameCount) frames.shift();
    } else {
      frames.splice(idx, 1);
    }
    frames.push(page);
  }
  return faults;
}',
'[{"input": "pages:[7,0,1,2,0,3,0,4,2,3], frames:3", "expected": "Page faults count"}]'::jsonb,
'O(n*f)', 'O(f)', ARRAY['Page replacement'], ARRAY['Remove least recently used'], ARRAY['memory', 'page-replacement', 'lru'], 15),

-- OS Coding 8
('os', 'Disk Scheduling', 'medium', 'FCFS Disk Scheduling',
'Implement FCFS disk scheduling and calculate total head movement.',
'function fcfsDisk(requests, initialHead) {
  // Return total head movement
}',
'function fcfsDisk(requests, initialHead) {
  let totalMovement = 0, head = initialHead;
  for (const req of requests) {
    totalMovement += Math.abs(req - head);
    head = req;
  }
  return totalMovement;
}',
'[{"input": "requests:[98,183,37,122,14,124,65,67], head:53", "expected": "640"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['Disk scheduling'], ARRAY['Sum of movements'], ARRAY['disk', 'scheduling', 'fcfs'], 10),

-- OS Coding 9
('os', 'Disk Scheduling', 'medium', 'SSTF Disk Scheduling',
'Implement Shortest Seek Time First disk scheduling.',
'function sstfDisk(requests, initialHead) {
  // Return total head movement
}',
'function sstfDisk(requests, initialHead) {
  let totalMovement = 0, head = initialHead;
  const pending = [...requests];
  while (pending.length > 0) {
    pending.sort((a, b) => Math.abs(a - head) - Math.abs(b - head));
    const nearest = pending.shift();
    totalMovement += Math.abs(nearest - head);
    head = nearest;
  }
  return totalMovement;
}',
'[{"input": "requests and initial head", "expected": "Minimized head movement"}]'::jsonb,
'O(n²)', 'O(n)', ARRAY['Disk scheduling'], ARRAY['Select nearest request'], ARRAY['disk', 'scheduling', 'sstf'], 15),

-- OS Coding 10
('os', 'Synchronization', 'hard', 'Producer Consumer',
'Implement producer-consumer problem using semaphores.',
'class ProducerConsumer {
  constructor(bufferSize) { /* Your code */ }
  produce(item) { /* Your code */ }
  consume() { /* Your code */ }
}',
'class ProducerConsumer {
  constructor(bufferSize) {
    this.buffer = [];
    this.maxSize = bufferSize;
    this.empty = bufferSize;
    this.full = 0;
  }
  async produce(item) {
    while (this.empty === 0) await this.wait();
    this.buffer.push(item);
    this.empty--;
    this.full++;
  }
  async consume() {
    while (this.full === 0) await this.wait();
    const item = this.buffer.shift();
    this.full--;
    this.empty++;
    return item;
  }
  wait() { return new Promise(r => setTimeout(r, 10)); }
}',
'[{"input": "Produce and consume operations", "expected": "Synchronized access"}]'::jsonb,
'O(1)', 'O(n)', ARRAY['Synchronization'], ARRAY['Use semaphores for empty/full'], ARRAY['synchronization', 'semaphores'], 25),

-- OS Coding 11
('os', 'Deadlock', 'hard', 'Bankers Algorithm',
'Implement Banker''s algorithm for deadlock avoidance.',
'function bankersAlgorithm(available, max, allocation) {
  // Return true if system is in safe state
}',
'function bankersAlgorithm(available, max, allocation) {
  const n = allocation.length, m = available.length;
  const need = max.map((row, i) => row.map((val, j) => val - allocation[i][j]));
  const work = [...available], finish = new Array(n).fill(false);
  const safeSequence = [];
  let count = 0;
  while (count < n) {
    let found = false;
    for (let i = 0; i < n; i++) {
      if (!finish[i] && need[i].every((val, j) => val <= work[j])) {
        for (let j = 0; j < m; j++) work[j] += allocation[i][j];
        finish[i] = true;
        safeSequence.push(i);
        count++;
        found = true;
      }
    }
    if (!found) return { safe: false, sequence: [] };
  }
  return { safe: true, sequence: safeSequence };
}',
'[{"input": "Resource matrices", "expected": "Safe state and sequence"}]'::jsonb,
'O(n²*m)', 'O(n*m)', ARRAY['Deadlock avoidance'], ARRAY['Check if need <= work'], ARRAY['deadlock', 'bankers-algorithm'], 30),

-- OS Coding 12
('os', 'Process Scheduling', 'hard', 'Priority Scheduling',
'Implement Priority Scheduling (non-preemptive).',
'function priorityScheduling(processes) {
  // processes: [{id, arrivalTime, burstTime, priority}]
}',
'function priorityScheduling(processes) {
  const result = [], completed = new Set();
  let currentTime = 0;
  while (completed.size < processes.length) {
    const available = processes.filter(p => !completed.has(p.id) && p.arrivalTime <= currentTime);
    if (available.length === 0) { currentTime++; continue; }
    available.sort((a, b) => a.priority - b.priority);
    const next = available[0];
    completed.add(next.id);
    const waitingTime = currentTime - next.arrivalTime;
    currentTime += next.burstTime;
    result.push({ id: next.id, waitingTime, turnaroundTime: waitingTime + next.burstTime });
  }
  return result;
}',
'[{"input": "Processes with priorities", "expected": "Priority scheduled"}]'::jsonb,
'O(n²)', 'O(n)', ARRAY['Non-preemptive'], ARRAY['Lower number = higher priority'], ARRAY['scheduling', 'priority'], 20),

-- OS Coding 13
('os', 'Page Replacement', 'hard', 'Optimal Page Replacement',
'Implement Optimal page replacement algorithm.',
'function optimalPageReplacement(pages, frameCount) {
  // Return number of page faults
}',
'function optimalPageReplacement(pages, frameCount) {
  const frames = [];
  let faults = 0;
  for (let i = 0; i < pages.length; i++) {
    if (!frames.includes(pages[i])) {
      faults++;
      if (frames.length >= frameCount) {
        let farthest = -1, replaceIdx = 0;
        for (let j = 0; j < frames.length; j++) {
          let nextUse = pages.slice(i + 1).indexOf(frames[j]);
          if (nextUse === -1) { replaceIdx = j; break; }
          if (nextUse > farthest) { farthest = nextUse; replaceIdx = j; }
        }
        frames[replaceIdx] = pages[i];
      } else {
        frames.push(pages[i]);
      }
    }
  }
  return faults;
}',
'[{"input": "pages and frame count", "expected": "Minimum page faults"}]'::jsonb,
'O(n*f*n)', 'O(f)', ARRAY['Optimal replacement'], ARRAY['Replace page used farthest in future'], ARRAY['memory', 'page-replacement', 'optimal'], 25),

-- OS Coding 14
('os', 'Memory Management', 'medium', 'Worst Fit Allocation',
'Implement Worst Fit memory allocation algorithm.',
'function worstFit(blockSizes, processSizes) {
  // Return allocation array
}',
'function worstFit(blockSizes, processSizes) {
  const allocation = new Array(processSizes.length).fill(-1);
  const blocks = [...blockSizes];
  for (let i = 0; i < processSizes.length; i++) {
    let worstIdx = -1, maxSize = -1;
    for (let j = 0; j < blocks.length; j++) {
      if (blocks[j] >= processSizes[i] && blocks[j] > maxSize) {
        maxSize = blocks[j];
        worstIdx = j;
      }
    }
    if (worstIdx !== -1) {
      allocation[i] = worstIdx;
      blocks[worstIdx] -= processSizes[i];
    }
  }
  return allocation;
}',
'[{"input": "blocks and process sizes", "expected": "Worst fit allocation"}]'::jsonb,
'O(n*m)', 'O(n)', ARRAY['Memory allocation'], ARRAY['Largest sufficient block'], ARRAY['memory', 'worst-fit'], 15),

-- OS Coding 15
('os', 'Disk Scheduling', 'hard', 'SCAN Disk Scheduling',
'Implement SCAN (Elevator) disk scheduling algorithm.',
'function scanDisk(requests, initialHead, diskSize, direction) {
  // direction: "up" or "down"
}',
'function scanDisk(requests, initialHead, diskSize, direction) {
  const sorted = [...requests].sort((a, b) => a - b);
  let totalMovement = 0, head = initialHead;
  const sequence = [];
  if (direction === "up") {
    const right = sorted.filter(r => r >= head);
    const left = sorted.filter(r => r < head).reverse();
    for (const r of right) { totalMovement += Math.abs(r - head); head = r; sequence.push(r); }
    if (right.length > 0) { totalMovement += Math.abs(diskSize - 1 - head); head = diskSize - 1; }
    for (const r of left) { totalMovement += Math.abs(r - head); head = r; sequence.push(r); }
  }
  return { totalMovement, sequence };
}',
'[{"input": "requests, head, direction", "expected": "SCAN traversal"}]'::jsonb,
'O(n log n)', 'O(n)', ARRAY['Disk scheduling'], ARRAY['Move in one direction then reverse'], ARRAY['disk', 'scheduling', 'scan'], 20),

-- OS Coding 16
('os', 'Synchronization', 'medium', 'Reader Writer Lock',
'Implement reader-writer lock with reader preference.',
'class ReadWriteLock {
  acquireRead() { /* Your code */ }
  releaseRead() { /* Your code */ }
  acquireWrite() { /* Your code */ }
  releaseWrite() { /* Your code */ }
}',
'class ReadWriteLock {
  constructor() { this.readers = 0; this.writing = false; }
  async acquireRead() { while (this.writing) await this.wait(); this.readers++; }
  releaseRead() { this.readers--; }
  async acquireWrite() { while (this.writing || this.readers > 0) await this.wait(); this.writing = true; }
  releaseWrite() { this.writing = false; }
  wait() { return new Promise(r => setTimeout(r, 10)); }
}',
'[{"input": "Concurrent read/write operations", "expected": "Safe access"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Synchronization'], ARRAY['Track reader count'], ARRAY['synchronization', 'locks'], 20),

-- OS Coding 17
('os', 'Process Scheduling', 'medium', 'Calculate Average Waiting Time',
'Calculate average waiting time for given scheduling.',
'function avgWaitingTime(processes, schedule) {
  // Return average waiting time
}',
'function avgWaitingTime(processes) {
  let totalWaiting = 0, currentTime = 0;
  for (const p of processes) {
    const waiting = Math.max(0, currentTime - p.arrivalTime);
    totalWaiting += waiting;
    currentTime = Math.max(currentTime, p.arrivalTime) + p.burstTime;
  }
  return totalWaiting / processes.length;
}',
'[{"input": "Process list", "expected": "Average waiting time"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['Performance metric'], ARRAY['Sum waiting times'], ARRAY['scheduling', 'metrics'], 10),

-- OS Coding 18
('os', 'Deadlock', 'medium', 'Detect Deadlock',
'Detect if the system is in deadlock state.',
'function detectDeadlock(allocation, request, available) {
  // Return true if deadlock exists
}',
'function detectDeadlock(allocation, request, available) {
  const n = allocation.length, m = available.length;
  const work = [...available], finish = new Array(n).fill(false);
  let changed = true;
  while (changed) {
    changed = false;
    for (let i = 0; i < n; i++) {
      if (!finish[i] && request[i].every((val, j) => val <= work[j])) {
        for (let j = 0; j < m; j++) work[j] += allocation[i][j];
        finish[i] = true;
        changed = true;
      }
    }
  }
  return finish.some(f => !f);
}',
'[{"input": "Resource matrices", "expected": "Deadlock detection result"}]'::jsonb,
'O(n²*m)', 'O(n)', ARRAY['Deadlock detection'], ARRAY['Similar to Bankers safety check'], ARRAY['deadlock', 'detection'], 20),

-- OS Coding 19
('os', 'Disk Scheduling', 'medium', 'C-SCAN Disk Scheduling',
'Implement C-SCAN (Circular SCAN) disk scheduling.',
'function cscanDisk(requests, initialHead, diskSize) {
  // Return total head movement
}',
'function cscanDisk(requests, initialHead, diskSize) {
  const sorted = [...requests].sort((a, b) => a - b);
  const right = sorted.filter(r => r >= initialHead);
  const left = sorted.filter(r => r < initialHead);
  let totalMovement = 0, head = initialHead;
  for (const r of right) { totalMovement += Math.abs(r - head); head = r; }
  if (left.length > 0) {
    totalMovement += (diskSize - 1 - head) + (diskSize - 1) + left[0];
    head = left[0];
    for (let i = 1; i < left.length; i++) { totalMovement += left[i] - head; head = left[i]; }
  }
  return totalMovement;
}',
'[{"input": "requests, head, diskSize", "expected": "C-SCAN movement"}]'::jsonb,
'O(n log n)', 'O(n)', ARRAY['Disk scheduling'], ARRAY['Circular movement'], ARRAY['disk', 'scheduling', 'cscan'], 20),

-- OS Coding 20
('os', 'Memory Management', 'hard', 'Page Table Lookup',
'Implement page table lookup with TLB.',
'function pageLookup(virtualAddress, pageTable, tlb, pageSize) {
  // Return physical address
}',
'function pageLookup(virtualAddress, pageTable, tlb, pageSize) {
  const pageNumber = Math.floor(virtualAddress / pageSize);
  const offset = virtualAddress % pageSize;
  let frameNumber;
  if (tlb.has(pageNumber)) {
    frameNumber = tlb.get(pageNumber);
  } else {
    if (!pageTable[pageNumber]) return { fault: true };
    frameNumber = pageTable[pageNumber].frameNumber;
    tlb.set(pageNumber, frameNumber);
  }
  return { physicalAddress: frameNumber * pageSize + offset, tlbHit: tlb.has(pageNumber) };
}',
'[{"input": "Virtual address", "expected": "Physical address"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Virtual memory'], ARRAY['Check TLB first'], ARRAY['memory', 'virtual-memory', 'paging'], 20),


-- =====================================================
-- 4. OBJECT ORIENTED PROGRAMMING (OOPs) - CODING PRACTICE
-- 20 Coding Questions
-- =====================================================

-- OOPs Coding 1
('oops', 'Classes', 'easy', 'Create a Simple Class',
'Create a Rectangle class with width, height and methods for area and perimeter.',
'class Rectangle {
  // Your code here
}',
'class Rectangle {
  constructor(width, height) { this.width = width; this.height = height; }
  area() { return this.width * this.height; }
  perimeter() { return 2 * (this.width + this.height); }
}',
'[{"input": "Rectangle(5, 3)", "expected": "area=15, perimeter=16"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Basic class'], ARRAY['Define constructor and methods'], ARRAY['classes', 'basics'], 10),

-- OOPs Coding 2
('oops', 'Inheritance', 'easy', 'Implement Inheritance',
'Create Shape base class and Circle, Square subclasses with area methods.',
'class Shape { /* base */ }
class Circle extends Shape { /* area */ }
class Square extends Shape { /* area */ }',
'class Shape { area() { throw "Not implemented"; } }
class Circle extends Shape { constructor(r) { super(); this.r = r; } area() { return Math.PI * this.r * this.r; } }
class Square extends Shape { constructor(s) { super(); this.s = s; } area() { return this.s * this.s; } }',
'[{"input": "Circle(5), Square(4)", "expected": "Circle area, Square area"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Inheritance'], ARRAY['Use extends keyword'], ARRAY['inheritance', 'polymorphism'], 15),

-- OOPs Coding 3
('oops', 'Encapsulation', 'medium', 'Implement Encapsulation',
'Create a BankAccount class with private balance and public deposit/withdraw methods.',
'class BankAccount {
  // Private balance
  // deposit, withdraw, getBalance methods
}',
'class BankAccount {
  #balance = 0;
  deposit(amount) { if (amount > 0) this.#balance += amount; }
  withdraw(amount) { if (amount > 0 && amount <= this.#balance) this.#balance -= amount; else throw "Insufficient"; }
  getBalance() { return this.#balance; }
}',
'[{"input": "deposit(100), withdraw(30)", "expected": "balance=70"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Private fields'], ARRAY['Use # for private fields'], ARRAY['encapsulation', 'private'], 15),

-- OOPs Coding 4
('oops', 'Polymorphism', 'medium', 'Method Overriding',
'Create Animal class with speak() method, override in Dog and Cat subclasses.',
'class Animal { speak() { } }
class Dog extends Animal { /* override */ }
class Cat extends Animal { /* override */ }',
'class Animal { speak() { return "Some sound"; } }
class Dog extends Animal { speak() { return "Woof!"; } }
class Cat extends Animal { speak() { return "Meow!"; } }
function makeSpeak(animal) { return animal.speak(); }',
'[{"input": "Dog, Cat, Animal", "expected": "Different sounds"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Polymorphism'], ARRAY['Override base method'], ARRAY['polymorphism', 'inheritance'], 10),

-- OOPs Coding 5
('oops', 'Abstraction', 'medium', 'Abstract Class Pattern',
'Implement abstract Vehicle class with abstract start() method.',
'// In JS, simulate abstract class
class Vehicle { /* abstract start */ }
class Car extends Vehicle { /* implement */ }',
'class Vehicle {
  constructor() { if (new.target === Vehicle) throw "Cannot instantiate abstract"; }
  start() { throw "Abstract method"; }
}
class Car extends Vehicle { start() { return "Car starting with key"; } }
class Motorcycle extends Vehicle { start() { return "Motorcycle kick start"; } }',
'[{"input": "Car, Motorcycle instances", "expected": "Different start behaviors"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Abstraction'], ARRAY['Prevent instantiation of abstract'], ARRAY['abstraction', 'abstract-class'], 15),

-- OOPs Coding 6
('oops', 'Design Patterns', 'medium', 'Singleton Pattern',
'Implement Singleton pattern for a Configuration class.',
'class Configuration {
  // Implement singleton
}',
'class Configuration {
  static #instance = null;
  #settings = {};
  constructor() { if (Configuration.#instance) return Configuration.#instance; Configuration.#instance = this; }
  static getInstance() { if (!Configuration.#instance) new Configuration(); return Configuration.#instance; }
  set(key, value) { this.#settings[key] = value; }
  get(key) { return this.#settings[key]; }
}',
'[{"input": "Multiple getInstance calls", "expected": "Same instance"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Design pattern'], ARRAY['Static instance variable'], ARRAY['singleton', 'design-patterns'], 15),

-- OOPs Coding 7
('oops', 'Design Patterns', 'medium', 'Factory Pattern',
'Implement Factory pattern for creating different types of vehicles.',
'class VehicleFactory {
  static createVehicle(type) { /* Your code */ }
}',
'class VehicleFactory {
  static createVehicle(type) {
    switch(type) {
      case "car": return new Car();
      case "bike": return new Bike();
      case "truck": return new Truck();
      default: throw "Unknown type";
    }
  }
}
class Car { drive() { return "Driving car"; } }
class Bike { drive() { return "Riding bike"; } }
class Truck { drive() { return "Driving truck"; } }',
'[{"input": "createVehicle(\"car\")", "expected": "Car instance"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Design pattern'], ARRAY['Switch based on type'], ARRAY['factory', 'design-patterns'], 15),

-- OOPs Coding 8
('oops', 'Design Patterns', 'hard', 'Observer Pattern',
'Implement Observer pattern for a newsletter subscription system.',
'class Newsletter { /* Subject */ }
class Subscriber { /* Observer */ }',
'class Newsletter {
  #subscribers = [];
  subscribe(sub) { this.#subscribers.push(sub); }
  unsubscribe(sub) { this.#subscribers = this.#subscribers.filter(s => s !== sub); }
  notify(message) { this.#subscribers.forEach(s => s.update(message)); }
}
class Subscriber {
  constructor(name) { this.name = name; }
  update(message) { console.log(`${this.name} received: ${message}`); }
}',
'[{"input": "Subscribe, publish, notify", "expected": "All subscribers notified"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Design pattern'], ARRAY['Maintain subscriber list'], ARRAY['observer', 'design-patterns'], 20),

-- OOPs Coding 9
('oops', 'Composition', 'medium', 'Composition Over Inheritance',
'Implement a Player class using composition for different abilities.',
'class Player {
  // Use composition for attack, defense abilities
}',
'class AttackAbility { attack() { return "Attacking!"; } }
class DefenseAbility { defend() { return "Defending!"; } }
class Player {
  constructor() { this.attackAbility = new AttackAbility(); this.defenseAbility = new DefenseAbility(); }
  attack() { return this.attackAbility.attack(); }
  defend() { return this.defenseAbility.defend(); }
}',
'[{"input": "Player actions", "expected": "Attack and defend"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Composition'], ARRAY['Compose objects instead of inherit'], ARRAY['composition', 'design'], 15),

-- OOPs Coding 10
('oops', 'Interfaces', 'medium', 'Implement Interface Pattern',
'Create Drawable and Resizable interfaces, implement in Shape class.',
'// Simulate interfaces in JS
const Drawable = { /* interface */ }
const Resizable = { /* interface */ }
class Shape { /* implement both */ }',
'const Drawable = { draw() { throw "Not implemented"; } };
const Resizable = { resize(factor) { throw "Not implemented"; } };
class Shape {
  constructor(x, y, size) { this.x = x; this.y = y; this.size = size; }
  draw() { return `Drawing at (${this.x}, ${this.y})`; }
  resize(factor) { this.size *= factor; return this.size; }
}',
'[{"input": "Shape instance", "expected": "Draw and resize work"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Interfaces'], ARRAY['Define contracts'], ARRAY['interfaces', 'abstraction'], 15),

-- OOPs Coding 11
('oops', 'SOLID', 'hard', 'Single Responsibility Principle',
'Refactor code to follow Single Responsibility Principle.',
'// Before: User class handles user data AND email sending
class User {
  constructor(name, email) { }
  save() { /* saves to DB */ }
  sendEmail(message) { /* sends email */ }
}',
'class User {
  constructor(name, email) { this.name = name; this.email = email; }
  getData() { return { name: this.name, email: this.email }; }
}
class UserRepository {
  save(user) { /* saves to DB */ return `Saved ${user.name}`; }
}
class EmailService {
  send(email, message) { return `Email sent to ${email}`; }
}',
'[{"input": "Separated concerns", "expected": "Each class has single responsibility"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['SOLID principles'], ARRAY['Separate concerns into classes'], ARRAY['solid', 'srp'], 20),

-- OOPs Coding 12
('oops', 'SOLID', 'hard', 'Open Closed Principle',
'Implement area calculation following Open/Closed Principle.',
'// Should be open for extension, closed for modification
class AreaCalculator {
  // Calculate area for any shape without modifying
}',
'class Shape { area() { throw "Not implemented"; } }
class Circle extends Shape { constructor(r) { super(); this.r = r; } area() { return Math.PI * this.r * this.r; } }
class Square extends Shape { constructor(s) { super(); this.s = s; } area() { return this.s * this.s; } }
class AreaCalculator {
  totalArea(shapes) { return shapes.reduce((sum, shape) => sum + shape.area(), 0); }
}',
'[{"input": "Multiple shapes", "expected": "Total area calculated"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['SOLID principles'], ARRAY['Use polymorphism'], ARRAY['solid', 'ocp'], 20),

-- OOPs Coding 13
('oops', 'Design Patterns', 'hard', 'Strategy Pattern',
'Implement Strategy pattern for different payment methods.',
'class PaymentContext { /* uses strategy */ }
class CreditCardPayment { /* strategy */ }
class PayPalPayment { /* strategy */ }',
'class PaymentStrategy { pay(amount) { throw "Not implemented"; } }
class CreditCardPayment extends PaymentStrategy { pay(amount) { return `Paid $${amount} via Credit Card`; } }
class PayPalPayment extends PaymentStrategy { pay(amount) { return `Paid $${amount} via PayPal`; } }
class PaymentContext {
  constructor(strategy) { this.strategy = strategy; }
  setStrategy(strategy) { this.strategy = strategy; }
  executePayment(amount) { return this.strategy.pay(amount); }
}',
'[{"input": "Different payment strategies", "expected": "Different payment behaviors"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Design pattern'], ARRAY['Encapsulate algorithms'], ARRAY['strategy', 'design-patterns'], 20),

-- OOPs Coding 14
('oops', 'Design Patterns', 'medium', 'Decorator Pattern',
'Implement Decorator pattern for adding features to a Coffee class.',
'class Coffee { /* base */ }
class MilkDecorator { /* adds milk */ }
class SugarDecorator { /* adds sugar */ }',
'class Coffee { cost() { return 5; } description() { return "Coffee"; } }
class CoffeeDecorator { constructor(coffee) { this.coffee = coffee; } cost() { return this.coffee.cost(); } description() { return this.coffee.description(); } }
class MilkDecorator extends CoffeeDecorator { cost() { return this.coffee.cost() + 2; } description() { return this.coffee.description() + " + Milk"; } }
class SugarDecorator extends CoffeeDecorator { cost() { return this.coffee.cost() + 1; } description() { return this.coffee.description() + " + Sugar"; } }',
'[{"input": "Coffee with decorators", "expected": "Accumulated cost and description"}]'::jsonb,
'O(1)', 'O(n)', ARRAY['Design pattern'], ARRAY['Wrap object to add behavior'], ARRAY['decorator', 'design-patterns'], 20),

-- OOPs Coding 15
('oops', 'Inheritance', 'medium', 'Method Chaining',
'Implement a QueryBuilder class using method chaining.',
'class QueryBuilder {
  // select, from, where methods return this for chaining
}',
'class QueryBuilder {
  constructor() { this.query = {}; }
  select(columns) { this.query.select = columns; return this; }
  from(table) { this.query.from = table; return this; }
  where(condition) { this.query.where = condition; return this; }
  build() { return `SELECT ${this.query.select} FROM ${this.query.from} WHERE ${this.query.where}`; }
}',
'[{"input": "select.from.where chain", "expected": "SQL query string"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Fluent interface'], ARRAY['Return this from methods'], ARRAY['method-chaining', 'builder'], 15),

-- OOPs Coding 16
('oops', 'Design Patterns', 'hard', 'Adapter Pattern',
'Implement Adapter pattern to make incompatible interfaces work together.',
'class OldPrinter { printOld(text) { } }
class NewPrinterAdapter { print(text) { } }',
'class OldPrinter { printOld(text) { return `[OLD] ${text}`; } }
class NewPrinter { print(text) { return `[NEW] ${text}`; } }
class OldPrinterAdapter {
  constructor(oldPrinter) { this.oldPrinter = oldPrinter; }
  print(text) { return this.oldPrinter.printOld(text); }
}
// Usage: both can be used with same interface
function usePrinter(printer) { return printer.print("Hello"); }',
'[{"input": "Adapted old printer", "expected": "Works with new interface"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Design pattern'], ARRAY['Wrap old interface'], ARRAY['adapter', 'design-patterns'], 20),

-- OOPs Coding 17
('oops', 'Classes', 'easy', 'Static Methods and Properties',
'Create a MathUtils class with static methods for common operations.',
'class MathUtils {
  // static methods: add, multiply, factorial
}',
'class MathUtils {
  static PI = 3.14159;
  static add(a, b) { return a + b; }
  static multiply(a, b) { return a * b; }
  static factorial(n) { return n <= 1 ? 1 : n * MathUtils.factorial(n - 1); }
}',
'[{"input": "MathUtils.factorial(5)", "expected": "120"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Static members'], ARRAY['Use static keyword'], ARRAY['static', 'utility'], 10),

-- OOPs Coding 18
('oops', 'Polymorphism', 'medium', 'Interface Segregation',
'Refactor a fat interface into smaller, specific interfaces.',
'// Fat interface with too many methods
class Worker { work(); eat(); sleep(); manage(); }',
'class Workable { work() { throw "Not implemented"; } }
class Eatable { eat() { throw "Not implemented"; } }
class Manageable { manage() { throw "Not implemented"; } }
class Developer { work() { return "Coding..."; } eat() { return "Eating lunch"; } }
class Manager { work() { return "Meeting..."; } eat() { return "Business lunch"; } manage() { return "Managing team"; } }',
'[{"input": "Segregated interfaces", "expected": "Each class implements needed interfaces only"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['SOLID principles'], ARRAY['Split into smaller interfaces'], ARRAY['solid', 'isp'], 20),

-- OOPs Coding 19
('oops', 'Design Patterns', 'hard', 'Command Pattern',
'Implement Command pattern for an undo/redo system.',
'class Command { execute(); undo(); }
class CommandManager { executeCommand(); undo(); redo(); }',
'class Command { execute() { throw "Not implemented"; } undo() { throw "Not implemented"; } }
class AddCommand extends Command {
  constructor(receiver, value) { super(); this.receiver = receiver; this.value = value; }
  execute() { this.receiver.add(this.value); }
  undo() { this.receiver.subtract(this.value); }
}
class Calculator { constructor() { this.value = 0; } add(n) { this.value += n; } subtract(n) { this.value -= n; } }
class CommandManager {
  constructor() { this.history = []; this.redoStack = []; }
  execute(cmd) { cmd.execute(); this.history.push(cmd); this.redoStack = []; }
  undo() { const cmd = this.history.pop(); if (cmd) { cmd.undo(); this.redoStack.push(cmd); } }
  redo() { const cmd = this.redoStack.pop(); if (cmd) { cmd.execute(); this.history.push(cmd); } }
}',
'[{"input": "Execute, undo, redo operations", "expected": "Correct state management"}]'::jsonb,
'O(1)', 'O(n)', ARRAY['Design pattern'], ARRAY['Encapsulate operations as objects'], ARRAY['command', 'design-patterns'], 25),

-- OOPs Coding 20
('oops', 'Dependency Injection', 'hard', 'Dependency Injection',
'Implement dependency injection for a service layer.',
'class UserService { /* depends on repository */ }
class UserRepository { /* data access */ }',
'class UserRepository { find(id) { return { id, name: "User" + id }; } save(user) { return `Saved ${user.name}`; } }
class EmailService { send(to, msg) { return `Email to ${to}: ${msg}`; } }
class UserService {
  constructor(userRepo, emailService) { this.userRepo = userRepo; this.emailService = emailService; }
  getUser(id) { return this.userRepo.find(id); }
  createUser(user) { this.userRepo.save(user); this.emailService.send(user.email, "Welcome!"); }
}
// Inject dependencies
const userService = new UserService(new UserRepository(), new EmailService());',
'[{"input": "Injected dependencies", "expected": "Loosely coupled service"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['SOLID principles'], ARRAY['Pass dependencies via constructor'], ARRAY['di', 'solid', 'dip'], 20),


-- =====================================================
-- 5. COMPUTER NETWORKS - CODING PRACTICE
-- 20 Coding Questions
-- =====================================================

-- Networks Coding 1
('networks', 'IP Addressing', 'easy', 'Validate IP Address',
'Check if a given string is a valid IPv4 address.',
'function isValidIPv4(ip) {
  // Your code here
}',
'function isValidIPv4(ip) {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  for (const part of parts) {
    if (!/^\d+$/.test(part)) return false;
    const num = parseInt(part);
    if (num < 0 || num > 255) return false;
    if (part.length > 1 && part[0] === "0") return false;
  }
  return true;
}',
'[{"input": "192.168.1.1", "expected": "true"}, {"input": "256.1.1.1", "expected": "false"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['IP validation'], ARRAY['Split by dot, validate each octet'], ARRAY['ip', 'validation'], 10),

-- Networks Coding 2
('networks', 'IP Addressing', 'medium', 'IP to Binary Conversion',
'Convert an IPv4 address to its binary representation.',
'function ipToBinary(ip) {
  // Your code here
}',
'function ipToBinary(ip) {
  return ip.split(".").map(octet => parseInt(octet).toString(2).padStart(8, "0")).join(".");
}',
'[{"input": "192.168.1.1", "expected": "11000000.10101000.00000001.00000001"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Binary conversion'], ARRAY['Convert each octet to 8-bit binary'], ARRAY['ip', 'binary'], 10),

-- Networks Coding 3
('networks', 'Subnetting', 'medium', 'Calculate Subnet Mask',
'Calculate subnet mask from CIDR notation.',
'function cidrToSubnetMask(cidr) {
  // cidr: number (e.g., 24)
}',
'function cidrToSubnetMask(cidr) {
  const mask = [];
  for (let i = 0; i < 4; i++) {
    const bits = Math.min(8, Math.max(0, cidr - i * 8));
    mask.push(256 - Math.pow(2, 8 - bits));
  }
  return mask.join(".");
}',
'[{"input": "24", "expected": "255.255.255.0"}, {"input": "16", "expected": "255.255.0.0"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Subnetting'], ARRAY['Calculate bits per octet'], ARRAY['subnet', 'cidr'], 15),

-- Networks Coding 4
('networks', 'Subnetting', 'medium', 'Calculate Network Address',
'Calculate network address from IP and subnet mask.',
'function getNetworkAddress(ip, subnetMask) {
  // Your code here
}',
'function getNetworkAddress(ip, subnetMask) {
  const ipParts = ip.split(".").map(Number);
  const maskParts = subnetMask.split(".").map(Number);
  return ipParts.map((p, i) => p & maskParts[i]).join(".");
}',
'[{"input": "192.168.1.100, 255.255.255.0", "expected": "192.168.1.0"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Subnetting'], ARRAY['Bitwise AND operation'], ARRAY['subnet', 'network'], 10),

-- Networks Coding 5
('networks', 'Subnetting', 'medium', 'Calculate Broadcast Address',
'Calculate broadcast address from network address and subnet mask.',
'function getBroadcastAddress(networkAddr, subnetMask) {
  // Your code here
}',
'function getBroadcastAddress(networkAddr, subnetMask) {
  const netParts = networkAddr.split(".").map(Number);
  const maskParts = subnetMask.split(".").map(Number);
  return netParts.map((p, i) => p | (~maskParts[i] & 255)).join(".");
}',
'[{"input": "192.168.1.0, 255.255.255.0", "expected": "192.168.1.255"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Subnetting'], ARRAY['OR with inverted mask'], ARRAY['subnet', 'broadcast'], 15),

-- Networks Coding 6
('networks', 'Subnetting', 'hard', 'Calculate Host Range',
'Calculate the range of usable host addresses in a subnet.',
'function getHostRange(networkAddr, subnetMask) {
  // Return {firstHost, lastHost, totalHosts}
}',
'function getHostRange(networkAddr, subnetMask) {
  const net = networkAddr.split(".").map(Number);
  const mask = subnetMask.split(".").map(Number);
  const broadcast = net.map((p, i) => p | (~mask[i] & 255));
  const firstHost = [...net]; firstHost[3] += 1;
  const lastHost = [...broadcast]; lastHost[3] -= 1;
  const hostBits = mask.reduce((acc, m) => acc + (8 - Math.log2(256 - m || 1)), 0);
  return { firstHost: firstHost.join("."), lastHost: lastHost.join("."), totalHosts: Math.pow(2, 32 - (32 - hostBits)) - 2 };
}',
'[{"input": "192.168.1.0, 255.255.255.0", "expected": "firstHost: 192.168.1.1, lastHost: 192.168.1.254, totalHosts: 254"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Subnetting'], ARRAY['First = network+1, Last = broadcast-1'], ARRAY['subnet', 'hosts'], 20),

-- Networks Coding 7
('networks', 'HTTP', 'easy', 'Parse HTTP Request',
'Parse an HTTP request string and extract method, path, and headers.',
'function parseHttpRequest(request) {
  // Return {method, path, headers}
}',
'function parseHttpRequest(request) {
  const lines = request.split("\r\n");
  const [method, path] = lines[0].split(" ");
  const headers = {};
  for (let i = 1; i < lines.length && lines[i]; i++) {
    const [key, value] = lines[i].split(": ");
    headers[key] = value;
  }
  return { method, path, headers };
}',
'[{"input": "GET /api HTTP/1.1\\r\\nHost: example.com", "expected": "{method: GET, path: /api}"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['HTTP parsing'], ARRAY['Split by CRLF'], ARRAY['http', 'parsing'], 15),

-- Networks Coding 8
('networks', 'HTTP', 'medium', 'Build HTTP Response',
'Build a valid HTTP response string from components.',
'function buildHttpResponse(statusCode, headers, body) {
  // Return HTTP response string
}',
'function buildHttpResponse(statusCode, headers, body) {
  const statusMessages = { 200: "OK", 404: "Not Found", 500: "Internal Server Error" };
  let response = `HTTP/1.1 ${statusCode} ${statusMessages[statusCode]}\r\n`;
  headers["Content-Length"] = body.length;
  for (const [key, value] of Object.entries(headers)) {
    response += `${key}: ${value}\r\n`;
  }
  response += `\r\n${body}`;
  return response;
}',
'[{"input": "200, {Content-Type: text/html}, <h1>Hello</h1>", "expected": "HTTP response string"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['HTTP building'], ARRAY['Follow HTTP format'], ARRAY['http', 'response'], 15),

-- Networks Coding 9
('networks', 'DNS', 'medium', 'Simple DNS Resolver Simulation',
'Simulate a simple DNS resolver with caching.',
'class DNSResolver {
  resolve(domain) { /* Return IP */ }
}',
'class DNSResolver {
  constructor() { this.cache = new Map(); this.records = { "example.com": "93.184.216.34", "google.com": "142.250.190.14" }; }
  resolve(domain) {
    if (this.cache.has(domain)) return { ip: this.cache.get(domain), cached: true };
    const ip = this.records[domain] || null;
    if (ip) this.cache.set(domain, ip);
    return { ip, cached: false };
  }
}',
'[{"input": "resolve(google.com) twice", "expected": "Second call is cached"}]'::jsonb,
'O(1)', 'O(n)', ARRAY['DNS caching'], ARRAY['Use Map for cache'], ARRAY['dns', 'caching'], 15),

-- Networks Coding 10
('networks', 'TCP', 'medium', 'TCP Checksum Calculation',
'Calculate a simple checksum for data integrity.',
'function calculateChecksum(data) {
  // Return 16-bit checksum
}',
'function calculateChecksum(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i += 2) {
    const word = (data.charCodeAt(i) << 8) + (data.charCodeAt(i + 1) || 0);
    sum += word;
    sum = (sum & 0xFFFF) + (sum >> 16);
  }
  return (~sum & 0xFFFF).toString(16).padStart(4, "0");
}',
'[{"input": "Hello", "expected": "Checksum value"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['Checksum'], ARRAY['Sum 16-bit words, ones complement'], ARRAY['tcp', 'checksum'], 20),

-- Networks Coding 11
('networks', 'Routing', 'medium', 'Longest Prefix Match',
'Implement longest prefix match for IP routing.',
'function longestPrefixMatch(ip, routingTable) {
  // routingTable: [{network, mask, nextHop}]
}',
'function longestPrefixMatch(ip, routingTable) {
  const ipNum = ipToNumber(ip);
  let bestMatch = null, longestMask = -1;
  for (const route of routingTable) {
    const netNum = ipToNumber(route.network);
    const maskNum = ipToNumber(route.mask);
    if ((ipNum & maskNum) === netNum && maskNum > longestMask) {
      longestMask = maskNum;
      bestMatch = route;
    }
  }
  return bestMatch?.nextHop || "No route";
}
function ipToNumber(ip) { return ip.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct), 0); }',
'[{"input": "IP and routing table", "expected": "Next hop for best match"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['Routing'], ARRAY['Match network with longest mask'], ARRAY['routing', 'prefix-match'], 20),

-- Networks Coding 12
('networks', 'MAC Address', 'easy', 'Validate MAC Address',
'Check if a given string is a valid MAC address.',
'function isValidMAC(mac) {
  // Your code here
}',
'function isValidMAC(mac) {
  const pattern1 = /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/;
  const pattern2 = /^([0-9A-Fa-f]{2}-){5}[0-9A-Fa-f]{2}$/;
  return pattern1.test(mac) || pattern2.test(mac);
}',
'[{"input": "00:1A:2B:3C:4D:5E", "expected": "true"}, {"input": "00:1A:2B:3C:4D", "expected": "false"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['MAC validation'], ARRAY['Use regex pattern'], ARRAY['mac', 'validation'], 10),

-- Networks Coding 13
('networks', 'URL', 'easy', 'Parse URL',
'Parse a URL string into its components.',
'function parseURL(url) {
  // Return {protocol, host, port, path, query}
}',
'function parseURL(url) {
  const match = url.match(/^(https?):\/\/([^:\/]+)(?::(\d+))?(\/[^?]*)?\??(.*)$/);
  if (!match) return null;
  return { protocol: match[1], host: match[2], port: match[3] || (match[1] === "https" ? "443" : "80"), path: match[4] || "/", query: match[5] || "" };
}',
'[{"input": "https://example.com:8080/api?key=123", "expected": "{protocol, host, port, path, query}"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['URL parsing'], ARRAY['Use regex to extract parts'], ARRAY['url', 'parsing'], 15),

-- Networks Coding 14
('networks', 'Load Balancing', 'medium', 'Round Robin Load Balancer',
'Implement a round-robin load balancer.',
'class LoadBalancer {
  constructor(servers) { }
  getNextServer() { }
}',
'class LoadBalancer {
  constructor(servers) { this.servers = servers; this.currentIndex = 0; }
  getNextServer() {
    const server = this.servers[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.servers.length;
    return server;
  }
}',
'[{"input": "3 servers, 5 requests", "expected": "Round robin distribution"}]'::jsonb,
'O(1)', 'O(n)', ARRAY['Load balancing'], ARRAY['Cycle through servers'], ARRAY['load-balancing', 'round-robin'], 10),

-- Networks Coding 15
('networks', 'Load Balancing', 'medium', 'Weighted Load Balancer',
'Implement a weighted round-robin load balancer.',
'class WeightedLoadBalancer {
  constructor(servers) { /* servers: [{addr, weight}] */ }
  getNextServer() { }
}',
'class WeightedLoadBalancer {
  constructor(servers) {
    this.servers = [];
    for (const s of servers) {
      for (let i = 0; i < s.weight; i++) this.servers.push(s.addr);
    }
    this.currentIndex = 0;
  }
  getNextServer() {
    const server = this.servers[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.servers.length;
    return server;
  }
}',
'[{"input": "servers with weights", "expected": "Weighted distribution"}]'::jsonb,
'O(1)', 'O(w)', ARRAY['Load balancing'], ARRAY['Expand by weights'], ARRAY['load-balancing', 'weighted'], 15),

-- Networks Coding 16
('networks', 'Hashing', 'hard', 'Consistent Hashing',
'Implement consistent hashing for distributed systems.',
'class ConsistentHash {
  constructor(nodes, replicas) { }
  addNode(node) { }
  removeNode(node) { }
  getNode(key) { }
}',
'class ConsistentHash {
  constructor(replicas = 100) { this.replicas = replicas; this.ring = new Map(); this.sortedKeys = []; }
  hash(key) { let h = 0; for (const c of key) h = ((h << 5) - h + c.charCodeAt(0)) | 0; return Math.abs(h); }
  addNode(node) { for (let i = 0; i < this.replicas; i++) { const h = this.hash(node + i); this.ring.set(h, node); this.sortedKeys.push(h); } this.sortedKeys.sort((a,b) => a - b); }
  getNode(key) { const h = this.hash(key); for (const k of this.sortedKeys) { if (k >= h) return this.ring.get(k); } return this.ring.get(this.sortedKeys[0]); }
}',
'[{"input": "Add nodes, get node for key", "expected": "Consistent mapping"}]'::jsonb,
'O(log n)', 'O(n*r)', ARRAY['Distributed systems'], ARRAY['Hash ring with virtual nodes'], ARRAY['consistent-hashing', 'distributed'], 30),

-- Networks Coding 17
('networks', 'Sockets', 'medium', 'Simple Chat Message Protocol',
'Implement a simple message framing protocol.',
'function frameMessage(message) { /* Add length prefix */ }
function parseFramedMessage(buffer) { /* Extract message */ }',
'function frameMessage(message) {
  const length = message.length.toString().padStart(4, "0");
  return length + message;
}
function parseFramedMessage(buffer) {
  if (buffer.length < 4) return { message: null, remaining: buffer };
  const length = parseInt(buffer.slice(0, 4));
  if (buffer.length < 4 + length) return { message: null, remaining: buffer };
  return { message: buffer.slice(4, 4 + length), remaining: buffer.slice(4 + length) };
}',
'[{"input": "Hello", "expected": "0005Hello"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Protocol design'], ARRAY['Prefix with length'], ARRAY['protocol', 'framing'], 15),

-- Networks Coding 18
('networks', 'Rate Limiting', 'medium', 'Token Bucket Rate Limiter',
'Implement token bucket algorithm for rate limiting.',
'class TokenBucket {
  constructor(capacity, refillRate) { }
  tryConsume(tokens) { }
}',
'class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRate = refillRate;
    this.lastRefill = Date.now();
  }
  tryConsume(tokens = 1) {
    this.refill();
    if (this.tokens >= tokens) { this.tokens -= tokens; return true; }
    return false;
  }
  refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }
}',
'[{"input": "Consume tokens over time", "expected": "Rate limited access"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Rate limiting'], ARRAY['Refill tokens based on time'], ARRAY['rate-limiting', 'token-bucket'], 20),

-- Networks Coding 19
('networks', 'Rate Limiting', 'hard', 'Sliding Window Rate Limiter',
'Implement sliding window log rate limiter.',
'class SlidingWindowRateLimiter {
  constructor(windowMs, maxRequests) { }
  isAllowed(clientId) { }
}',
'class SlidingWindowRateLimiter {
  constructor(windowMs, maxRequests) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.logs = new Map();
  }
  isAllowed(clientId) {
    const now = Date.now();
    if (!this.logs.has(clientId)) this.logs.set(clientId, []);
    const log = this.logs.get(clientId);
    while (log.length > 0 && log[0] < now - this.windowMs) log.shift();
    if (log.length >= this.maxRequests) return false;
    log.push(now);
    return true;
  }
}',
'[{"input": "Multiple requests within window", "expected": "Limited after max"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Rate limiting'], ARRAY['Store timestamps, slide window'], ARRAY['rate-limiting', 'sliding-window'], 25),

-- Networks Coding 20
('networks', 'Encoding', 'easy', 'Base64 Encode/Decode',
'Implement Base64 encoding and decoding.',
'function base64Encode(str) { }
function base64Decode(encoded) { }',
'function base64Encode(str) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let result = "";
  const bytes = [...str].map(c => c.charCodeAt(0));
  for (let i = 0; i < bytes.length; i += 3) {
    const n = (bytes[i] << 16) | ((bytes[i+1] || 0) << 8) | (bytes[i+2] || 0);
    result += chars[(n >> 18) & 63] + chars[(n >> 12) & 63];
    result += i + 1 < bytes.length ? chars[(n >> 6) & 63] : "=";
    result += i + 2 < bytes.length ? chars[n & 63] : "=";
  }
  return result;
}
function base64Decode(encoded) { return atob(encoded); }',
'[{"input": "Hello", "expected": "SGVsbG8="}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Encoding'], ARRAY['Convert 3 bytes to 4 chars'], ARRAY['base64', 'encoding'], 20);


-- Continue with more domains...

-- =====================================================
-- 6. C PROGRAMMING - CODING PRACTICE
-- 20 Coding Questions
-- =====================================================

INSERT INTO coding_practice_questions (domain, topic, difficulty, question_title, question_description, template_code, solution_code, test_cases, time_complexity, space_complexity, constraints, hints, tags, estimated_time_minutes) VALUES

-- C Coding 1
('c', 'Pointers', 'easy', 'Swap Using Pointers',
'Swap two integers using pointers.',
'void swap(int *a, int *b) {
  // Your code here
}',
'void swap(int *a, int *b) {
  int temp = *a;
  *a = *b;
  *b = temp;
}',
'[{"input": "a=5, b=10", "expected": "a=10, b=5"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Pointer basics'], ARRAY['Use dereference operator'], ARRAY['pointers', 'swap'], 5),

-- C Coding 2
('c', 'Pointers', 'medium', 'Reverse Array Using Pointers',
'Reverse an array using pointer arithmetic.',
'void reverseArray(int *arr, int n) {
  // Your code here
}',
'void reverseArray(int *arr, int n) {
  int *start = arr, *end = arr + n - 1;
  while (start < end) {
    int temp = *start;
    *start++ = *end;
    *end-- = temp;
  }
}',
'[{"input": "[1,2,3,4,5]", "expected": "[5,4,3,2,1]"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['Pointer arithmetic'], ARRAY['Use two pointers'], ARRAY['pointers', 'arrays'], 10),

-- C Coding 3
('c', 'Strings', 'easy', 'String Length Without strlen',
'Calculate string length without using strlen().',
'int myStrlen(const char *str) {
  // Your code here
}',
'int myStrlen(const char *str) {
  int len = 0;
  while (*str++) len++;
  return len;
}',
'[{"input": "Hello", "expected": "5"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['String manipulation'], ARRAY['Count until null terminator'], ARRAY['strings', 'pointers'], 5),

-- C Coding 4
('c', 'Strings', 'medium', 'String Copy Without strcpy',
'Implement strcpy without using library function.',
'char* myStrcpy(char *dest, const char *src) {
  // Your code here
}',
'char* myStrcpy(char *dest, const char *src) {
  char *original = dest;
  while ((*dest++ = *src++));
  return original;
}',
'[{"input": "src=Hello", "expected": "dest=Hello"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['String functions'], ARRAY['Copy char by char'], ARRAY['strings', 'pointers'], 10),

-- C Coding 5
('c', 'Arrays', 'easy', 'Find Maximum Element',
'Find the maximum element in an array.',
'int findMax(int arr[], int n) {
  // Your code here
}',
'int findMax(int arr[], int n) {
  int max = arr[0];
  for (int i = 1; i < n; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}',
'[{"input": "[3,1,4,1,5,9]", "expected": "9"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['Array traversal'], ARRAY['Linear scan'], ARRAY['arrays', 'basics'], 5),

-- C Coding 6
('c', 'Dynamic Memory', 'medium', 'Dynamic Array Implementation',
'Implement a dynamic array that grows automatically.',
'typedef struct { int *data; int size; int capacity; } DynamicArray;
void push(DynamicArray *arr, int val) { /* Your code */ }',
'void push(DynamicArray *arr, int val) {
  if (arr->size >= arr->capacity) {
    arr->capacity *= 2;
    arr->data = realloc(arr->data, arr->capacity * sizeof(int));
  }
  arr->data[arr->size++] = val;
}',
'[{"input": "Push beyond capacity", "expected": "Array resizes"}]'::jsonb,
'O(1) amortized', 'O(n)', ARRAY['Dynamic allocation'], ARRAY['Double capacity when full'], ARRAY['dynamic-memory', 'arrays'], 15),

-- C Coding 7
('c', 'Linked Lists', 'medium', 'Linked List Implementation',
'Implement insert and delete for singly linked list.',
'struct Node { int data; struct Node *next; };
void insert(struct Node **head, int val) { /* Your code */ }
void delete(struct Node **head, int val) { /* Your code */ }',
'void insert(struct Node **head, int val) {
  struct Node *new = malloc(sizeof(struct Node));
  new->data = val; new->next = *head;
  *head = new;
}
void delete(struct Node **head, int val) {
  struct Node *temp = *head, *prev = NULL;
  while (temp && temp->data != val) { prev = temp; temp = temp->next; }
  if (!temp) return;
  if (!prev) *head = temp->next;
  else prev->next = temp->next;
  free(temp);
}',
'[{"input": "Insert and delete operations", "expected": "Correct list state"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['Linked list'], ARRAY['Handle head pointer'], ARRAY['linked-list', 'pointers'], 20),

-- C Coding 8
('c', 'Bitwise', 'easy', 'Check if Power of 2',
'Check if a number is a power of 2 using bitwise operations.',
'int isPowerOfTwo(int n) {
  // Your code here
}',
'int isPowerOfTwo(int n) {
  return n > 0 && (n & (n - 1)) == 0;
}',
'[{"input": "16", "expected": "1"}, {"input": "15", "expected": "0"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Bitwise'], ARRAY['n & (n-1) clears lowest bit'], ARRAY['bitwise', 'math'], 5),

-- C Coding 9
('c', 'Bitwise', 'medium', 'Count Set Bits',
'Count the number of 1 bits in an integer.',
'int countSetBits(int n) {
  // Your code here
}',
'int countSetBits(int n) {
  int count = 0;
  while (n) { count += n & 1; n >>= 1; }
  return count;
}
// OR Brian Kernighan: while(n) { n &= (n-1); count++; }',
'[{"input": "13 (1101)", "expected": "3"}]'::jsonb,
'O(log n)', 'O(1)', ARRAY['Bitwise'], ARRAY['Check each bit or use n&(n-1)'], ARRAY['bitwise', 'counting'], 10),

-- C Coding 10
('c', 'File Handling', 'medium', 'Count Words in File',
'Count the number of words in a text file.',
'int countWords(const char *filename) {
  // Your code here
}',
'int countWords(const char *filename) {
  FILE *fp = fopen(filename, "r");
  if (!fp) return -1;
  int count = 0, inWord = 0;
  char c;
  while ((c = fgetc(fp)) != EOF) {
    if (c == '' '' || c == ''\\n'' || c == ''\\t'') inWord = 0;
    else if (!inWord) { inWord = 1; count++; }
  }
  fclose(fp);
  return count;
}',
'[{"input": "File with text", "expected": "Word count"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['File I/O'], ARRAY['Track word boundaries'], ARRAY['file-handling', 'strings'], 15),

-- C Coding 11
('c', 'Structures', 'easy', 'Student Structure',
'Create a structure for student and function to display details.',
'struct Student { char name[50]; int roll; float marks; };
void displayStudent(struct Student s) { /* Your code */ }',
'void displayStudent(struct Student s) {
  printf("Name: %s\\n", s.name);
  printf("Roll: %d\\n", s.roll);
  printf("Marks: %.2f\\n", s.marks);
}',
'[{"input": "Student data", "expected": "Formatted output"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Structures'], ARRAY['Access members with dot'], ARRAY['structures', 'basics'], 5),

-- C Coding 12
('c', 'Recursion', 'easy', 'Factorial Using Recursion',
'Calculate factorial using recursion.',
'int factorial(int n) {
  // Your code here
}',
'int factorial(int n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}',
'[{"input": "5", "expected": "120"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Recursion'], ARRAY['Base case: n <= 1'], ARRAY['recursion', 'math'], 5),

-- C Coding 13
('c', 'Recursion', 'medium', 'Tower of Hanoi',
'Solve Tower of Hanoi problem.',
'void hanoi(int n, char from, char to, char aux) {
  // Your code here
}',
'void hanoi(int n, char from, char to, char aux) {
  if (n == 1) { printf("Move disk 1 from %c to %c\\n", from, to); return; }
  hanoi(n - 1, from, aux, to);
  printf("Move disk %d from %c to %c\\n", n, from, to);
  hanoi(n - 1, aux, to, from);
}',
'[{"input": "n=3", "expected": "7 moves"}]'::jsonb,
'O(2^n)', 'O(n)', ARRAY['Recursion'], ARRAY['Move n-1 to aux, move nth, move n-1 to dest'], ARRAY['recursion', 'classic'], 15),

-- C Coding 14
('c', 'Function Pointers', 'hard', 'Generic Sort with Function Pointer',
'Implement a generic sort function using function pointers.',
'void genericSort(void *arr, int n, int size, int (*compare)(void*, void*)) {
  // Your code here
}',
'void genericSort(void *arr, int n, int size, int (*compare)(void*, void*)) {
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      void *a = (char*)arr + j * size;
      void *b = (char*)arr + (j + 1) * size;
      if (compare(a, b) > 0) {
        for (int k = 0; k < size; k++) {
          char temp = *((char*)a + k);
          *((char*)a + k) = *((char*)b + k);
          *((char*)b + k) = temp;
        }
      }
    }
  }
}',
'[{"input": "Array with comparator", "expected": "Sorted array"}]'::jsonb,
'O(n²)', 'O(1)', ARRAY['Function pointers'], ARRAY['Cast to char* for byte-level access'], ARRAY['function-pointers', 'generics'], 25),

-- C Coding 15
('c', 'Memory', 'medium', 'Memory Pool Allocator',
'Implement a simple memory pool allocator.',
'typedef struct { char *pool; int blockSize; int numBlocks; int *freeList; } MemPool;
void* poolAlloc(MemPool *mp) { /* Your code */ }
void poolFree(MemPool *mp, void *ptr) { /* Your code */ }',
'void* poolAlloc(MemPool *mp) {
  for (int i = 0; i < mp->numBlocks; i++) {
    if (mp->freeList[i]) {
      mp->freeList[i] = 0;
      return mp->pool + i * mp->blockSize;
    }
  }
  return NULL;
}
void poolFree(MemPool *mp, void *ptr) {
  int idx = ((char*)ptr - mp->pool) / mp->blockSize;
  mp->freeList[idx] = 1;
}',
'[{"input": "Allocate and free", "expected": "Managed memory blocks"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Memory management'], ARRAY['Track free blocks'], ARRAY['memory', 'allocator'], 25),

-- C Coding 16
('c', 'Preprocessor', 'medium', 'Macro for Min/Max',
'Write macros for finding minimum and maximum with type safety.',
'#define MIN(a, b) /* Your code */
#define MAX(a, b) /* Your code */',
'#define MIN(a, b) ({ typeof(a) _a = (a); typeof(b) _b = (b); _a < _b ? _a : _b; })
#define MAX(a, b) ({ typeof(a) _a = (a); typeof(b) _b = (b); _a > _b ? _a : _b; })',
'[{"input": "MIN(3, 5)", "expected": "3"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Preprocessor'], ARRAY['Use GCC statement expressions'], ARRAY['macros', 'preprocessor'], 10),

-- C Coding 17
('c', 'Strings', 'medium', 'String Reverse In-Place',
'Reverse a string in-place.',
'void reverseString(char *str) {
  // Your code here
}',
'void reverseString(char *str) {
  int len = 0;
  while (str[len]) len++;
  for (int i = 0; i < len / 2; i++) {
    char temp = str[i];
    str[i] = str[len - 1 - i];
    str[len - 1 - i] = temp;
  }
}',
'[{"input": "Hello", "expected": "olleH"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['String manipulation'], ARRAY['Swap from both ends'], ARRAY['strings', 'in-place'], 10),

-- C Coding 18
('c', 'Sorting', 'medium', 'Quick Sort Implementation',
'Implement Quick Sort algorithm.',
'void quickSort(int arr[], int low, int high) {
  // Your code here
}',
'int partition(int arr[], int low, int high) {
  int pivot = arr[high], i = low - 1;
  for (int j = low; j < high; j++) {
    if (arr[j] < pivot) { i++; int t = arr[i]; arr[i] = arr[j]; arr[j] = t; }
  }
  int t = arr[i+1]; arr[i+1] = arr[high]; arr[high] = t;
  return i + 1;
}
void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}',
'[{"input": "[64,34,25,12,22,11,90]", "expected": "Sorted array"}]'::jsonb,
'O(n log n)', 'O(log n)', ARRAY['Sorting'], ARRAY['Partition around pivot'], ARRAY['sorting', 'quicksort'], 20),

-- C Coding 19
('c', 'Searching', 'easy', 'Binary Search',
'Implement binary search on sorted array.',
'int binarySearch(int arr[], int n, int target) {
  // Your code here
}',
'int binarySearch(int arr[], int n, int target) {
  int left = 0, right = n - 1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}',
'[{"input": "[1,2,3,4,5], 3", "expected": "2"}]'::jsonb,
'O(log n)', 'O(1)', ARRAY['Searching'], ARRAY['Compare with mid'], ARRAY['binary-search', 'searching'], 10),

-- C Coding 20
('c', 'Matrix', 'medium', 'Matrix Multiplication',
'Multiply two matrices.',
'void matrixMultiply(int A[][10], int B[][10], int C[][10], int r1, int c1, int c2) {
  // Your code here
}',
'void matrixMultiply(int A[][10], int B[][10], int C[][10], int r1, int c1, int c2) {
  for (int i = 0; i < r1; i++) {
    for (int j = 0; j < c2; j++) {
      C[i][j] = 0;
      for (int k = 0; k < c1; k++) {
        C[i][j] += A[i][k] * B[k][j];
      }
    }
  }
}',
'[{"input": "Two compatible matrices", "expected": "Product matrix"}]'::jsonb,
'O(n³)', 'O(1)', ARRAY['Matrix operations'], ARRAY['Three nested loops'], ARRAY['matrix', 'multiplication'], 15),


-- =====================================================
-- 7. C++ PROGRAMMING - CODING PRACTICE
-- 20 Coding Questions
-- =====================================================

-- C++ Coding 1
('cpp', 'STL Containers', 'easy', 'Vector Operations',
'Perform basic vector operations: push, pop, iterate.',
'void vectorDemo() {
  // Your code here
}',
'void vectorDemo() {
  vector<int> v = {1, 2, 3};
  v.push_back(4);
  v.pop_back();
  for (int x : v) cout << x << " ";
}',
'[{"input": "Vector operations", "expected": "1 2 3"}]'::jsonb,
'O(1) amortized', 'O(n)', ARRAY['STL basics'], ARRAY['Use push_back, pop_back'], ARRAY['stl', 'vector'], 5),

-- C++ Coding 2
('cpp', 'STL Containers', 'easy', 'Map Usage',
'Count frequency of elements using map.',
'map<int, int> countFrequency(vector<int>& nums) {
  // Your code here
}',
'map<int, int> countFrequency(vector<int>& nums) {
  map<int, int> freq;
  for (int n : nums) freq[n]++;
  return freq;
}',
'[{"input": "[1,2,2,3,3,3]", "expected": "{1:1, 2:2, 3:3}"}]'::jsonb,
'O(n log n)', 'O(n)', ARRAY['STL map'], ARRAY['Use [] operator'], ARRAY['stl', 'map'], 10),

-- C++ Coding 3
('cpp', 'STL Algorithms', 'medium', 'Custom Sort with Lambda',
'Sort pairs by second element using lambda.',
'void sortBySecond(vector<pair<int,int>>& v) {
  // Your code here
}',
'void sortBySecond(vector<pair<int,int>>& v) {
  sort(v.begin(), v.end(), [](auto& a, auto& b) {
    return a.second < b.second;
  });
}',
'[{"input": "[(1,3),(2,1),(3,2)]", "expected": "[(2,1),(3,2),(1,3)]"}]'::jsonb,
'O(n log n)', 'O(1)', ARRAY['Lambda expressions'], ARRAY['Custom comparator'], ARRAY['stl', 'lambda', 'sorting'], 10),

-- C++ Coding 4
('cpp', 'Smart Pointers', 'medium', 'Unique Pointer Usage',
'Use unique_ptr for automatic memory management.',
'void uniquePtrDemo() {
  // Your code here
}',
'void uniquePtrDemo() {
  auto ptr = make_unique<int>(42);
  cout << *ptr << endl;
  auto ptr2 = move(ptr); // Transfer ownership
  // ptr is now nullptr
}',
'[{"input": "Create and move unique_ptr", "expected": "42, ownership transferred"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Smart pointers'], ARRAY['Use make_unique, move semantics'], ARRAY['smart-pointers', 'unique_ptr'], 10),

-- C++ Coding 5
('cpp', 'Smart Pointers', 'medium', 'Shared Pointer Usage',
'Use shared_ptr with reference counting.',
'void sharedPtrDemo() {
  // Your code here
}',
'void sharedPtrDemo() {
  auto sp1 = make_shared<int>(100);
  cout << "Count: " << sp1.use_count() << endl; // 1
  auto sp2 = sp1;
  cout << "Count: " << sp1.use_count() << endl; // 2
}',
'[{"input": "Create and share", "expected": "Reference count increases"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Smart pointers'], ARRAY['Use make_shared, use_count'], ARRAY['smart-pointers', 'shared_ptr'], 10),

-- C++ Coding 6
('cpp', 'Templates', 'medium', 'Generic Stack Implementation',
'Implement a generic stack using templates.',
'template<typename T>
class Stack {
  // Your code here
};',
'template<typename T>
class Stack {
  vector<T> data;
public:
  void push(T val) { data.push_back(val); }
  T pop() { T val = data.back(); data.pop_back(); return val; }
  T top() { return data.back(); }
  bool empty() { return data.empty(); }
  int size() { return data.size(); }
};',
'[{"input": "Push, pop operations", "expected": "Generic stack works"}]'::jsonb,
'O(1)', 'O(n)', ARRAY['Templates'], ARRAY['Use vector as underlying container'], ARRAY['templates', 'generics'], 15),

-- C++ Coding 7
('cpp', 'OOP', 'medium', 'Operator Overloading',
'Overload + operator for a Complex number class.',
'class Complex {
  // Overload + operator
};',
'class Complex {
  double real, imag;
public:
  Complex(double r = 0, double i = 0) : real(r), imag(i) {}
  Complex operator+(const Complex& other) const {
    return Complex(real + other.real, imag + other.imag);
  }
  void display() { cout << real << " + " << imag << "i" << endl; }
};',
'[{"input": "Complex(1,2) + Complex(3,4)", "expected": "4 + 6i"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Operator overloading'], ARRAY['Return new object'], ARRAY['oop', 'operators'], 15),

-- C++ Coding 8
('cpp', 'STL Containers', 'medium', 'Priority Queue Usage',
'Implement a min-heap using priority_queue.',
'void minHeapDemo() {
  // Your code here
}',
'void minHeapDemo() {
  priority_queue<int, vector<int>, greater<int>> minHeap;
  minHeap.push(3); minHeap.push(1); minHeap.push(2);
  while (!minHeap.empty()) {
    cout << minHeap.top() << " "; // 1 2 3
    minHeap.pop();
  }
}',
'[{"input": "Push 3,1,2", "expected": "Pop order: 1,2,3"}]'::jsonb,
'O(log n)', 'O(n)', ARRAY['Priority queue'], ARRAY['Use greater<int> for min-heap'], ARRAY['stl', 'heap'], 10),

-- C++ Coding 9
('cpp', 'Move Semantics', 'hard', 'Move Constructor Implementation',
'Implement move constructor and move assignment.',
'class Buffer {
  // Implement move semantics
};',
'class Buffer {
  int* data; size_t size;
public:
  Buffer(size_t s) : size(s), data(new int[s]) {}
  ~Buffer() { delete[] data; }
  // Move constructor
  Buffer(Buffer&& other) noexcept : data(other.data), size(other.size) {
    other.data = nullptr; other.size = 0;
  }
  // Move assignment
  Buffer& operator=(Buffer&& other) noexcept {
    if (this != &other) {
      delete[] data;
      data = other.data; size = other.size;
      other.data = nullptr; other.size = 0;
    }
    return *this;
  }
};',
'[{"input": "Move buffer", "expected": "Ownership transferred"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Move semantics'], ARRAY['Steal resources, leave source valid'], ARRAY['move-semantics', 'rvalue'], 20),

-- C++ Coding 10
('cpp', 'STL Algorithms', 'medium', 'Use of transform',
'Use transform to apply function to all elements.',
'vector<int> squareAll(vector<int>& nums) {
  // Your code here
}',
'vector<int> squareAll(vector<int>& nums) {
  vector<int> result(nums.size());
  transform(nums.begin(), nums.end(), result.begin(), [](int x) { return x * x; });
  return result;
}',
'[{"input": "[1,2,3,4]", "expected": "[1,4,9,16]"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['STL algorithms'], ARRAY['Use transform with lambda'], ARRAY['stl', 'transform'], 10),

-- C++ Coding 11
('cpp', 'RAII', 'medium', 'File Handler with RAII',
'Implement a file handler using RAII.',
'class FileHandler {
  // RAII for file management
};',
'class FileHandler {
  FILE* file;
public:
  FileHandler(const char* name, const char* mode) {
    file = fopen(name, mode);
    if (!file) throw runtime_error("Cannot open file");
  }
  ~FileHandler() { if (file) fclose(file); }
  FILE* get() { return file; }
  // Prevent copying
  FileHandler(const FileHandler&) = delete;
  FileHandler& operator=(const FileHandler&) = delete;
};',
'[{"input": "Open and auto-close file", "expected": "Resource managed"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['RAII'], ARRAY['Acquire in constructor, release in destructor'], ARRAY['raii', 'resource-management'], 15),

-- C++ Coding 12
('cpp', 'STL Containers', 'medium', 'Set Operations',
'Find intersection and union of two sets.',
'pair<set<int>, set<int>> setOperations(set<int>& a, set<int>& b) {
  // Return {intersection, union}
}',
'pair<set<int>, set<int>> setOperations(set<int>& a, set<int>& b) {
  set<int> intersection, unionSet;
  set_intersection(a.begin(), a.end(), b.begin(), b.end(), inserter(intersection, intersection.begin()));
  set_union(a.begin(), a.end(), b.begin(), b.end(), inserter(unionSet, unionSet.begin()));
  return {intersection, unionSet};
}',
'[{"input": "{1,2,3}, {2,3,4}", "expected": "intersection:{2,3}, union:{1,2,3,4}"}]'::jsonb,
'O(n+m)', 'O(n+m)', ARRAY['Set operations'], ARRAY['Use set_intersection, set_union'], ARRAY['stl', 'set'], 15),

-- C++ Coding 13
('cpp', 'Iterators', 'medium', 'Custom Iterator',
'Implement a custom iterator for a range.',
'class Range {
  // Implement begin() and end()
};',
'class Range {
  int start, stop;
public:
  Range(int s, int e) : start(s), stop(e) {}
  class Iterator {
    int current;
  public:
    Iterator(int c) : current(c) {}
    int operator*() { return current; }
    Iterator& operator++() { current++; return *this; }
    bool operator!=(const Iterator& other) { return current != other.current; }
  };
  Iterator begin() { return Iterator(start); }
  Iterator end() { return Iterator(stop); }
};',
'[{"input": "Range(1,5)", "expected": "Iterate 1,2,3,4"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Iterators'], ARRAY['Implement *, ++, !='], ARRAY['iterators', 'custom'], 20),

-- C++ Coding 14
('cpp', 'Concurrency', 'hard', 'Thread-Safe Counter',
'Implement a thread-safe counter using mutex.',
'class ThreadSafeCounter {
  // Your code here
};',
'class ThreadSafeCounter {
  int count = 0;
  mutable mutex mtx;
public:
  void increment() { lock_guard<mutex> lock(mtx); count++; }
  void decrement() { lock_guard<mutex> lock(mtx); count--; }
  int get() const { lock_guard<mutex> lock(mtx); return count; }
};',
'[{"input": "Multiple threads incrementing", "expected": "Correct count"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Concurrency'], ARRAY['Use lock_guard for RAII locking'], ARRAY['threading', 'mutex'], 20),

-- C++ Coding 15
('cpp', 'Templates', 'hard', 'Variadic Template Sum',
'Implement sum function using variadic templates.',
'template<typename... Args>
auto sum(Args... args) {
  // Your code here
}',
'template<typename T>
T sum(T value) { return value; }

template<typename T, typename... Args>
auto sum(T first, Args... rest) {
  return first + sum(rest...);
}',
'[{"input": "sum(1,2,3,4,5)", "expected": "15"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Variadic templates'], ARRAY['Recursion with parameter pack'], ARRAY['templates', 'variadic'], 20),

-- C++ Coding 16
('cpp', 'STL Algorithms', 'medium', 'Find and Replace',
'Find all occurrences and replace in string.',
'string findAndReplace(string s, const string& from, const string& to) {
  // Your code here
}',
'string findAndReplace(string s, const string& from, const string& to) {
  size_t pos = 0;
  while ((pos = s.find(from, pos)) != string::npos) {
    s.replace(pos, from.length(), to);
    pos += to.length();
  }
  return s;
}',
'[{"input": "hello world, o, 0", "expected": "hell0 w0rld"}]'::jsonb,
'O(n*m)', 'O(n)', ARRAY['String manipulation'], ARRAY['Use find and replace'], ARRAY['strings', 'stl'], 10),

-- C++ Coding 17
('cpp', 'Data Structures', 'hard', 'LRU Cache with STL',
'Implement LRU Cache using list and unordered_map.',
'class LRUCache {
  // Your code here
};',
'class LRUCache {
  int capacity;
  list<pair<int,int>> cache;
  unordered_map<int, list<pair<int,int>>::iterator> map;
public:
  LRUCache(int cap) : capacity(cap) {}
  int get(int key) {
    if (map.find(key) == map.end()) return -1;
    cache.splice(cache.begin(), cache, map[key]);
    return map[key]->second;
  }
  void put(int key, int value) {
    if (map.find(key) != map.end()) {
      cache.splice(cache.begin(), cache, map[key]);
      map[key]->second = value;
    } else {
      if (cache.size() >= capacity) {
        map.erase(cache.back().first);
        cache.pop_back();
      }
      cache.push_front({key, value});
      map[key] = cache.begin();
    }
  }
};',
'[{"input": "LRU operations", "expected": "Correct eviction"}]'::jsonb,
'O(1)', 'O(n)', ARRAY['Data structures'], ARRAY['List for order, map for O(1) access'], ARRAY['lru-cache', 'design'], 25),

-- C++ Coding 18
('cpp', 'STL Containers', 'easy', 'Unordered Map Usage',
'Use unordered_map for O(1) operations.',
'void unorderedMapDemo() {
  // Your code here
}',
'void unorderedMapDemo() {
  unordered_map<string, int> ages;
  ages["Alice"] = 25;
  ages["Bob"] = 30;
  ages.insert({"Charlie", 35});
  for (auto& [name, age] : ages) {
    cout << name << ": " << age << endl;
  }
}',
'[{"input": "Insert and access", "expected": "O(1) operations"}]'::jsonb,
'O(1) average', 'O(n)', ARRAY['Hash map'], ARRAY['Use structured bindings'], ARRAY['stl', 'unordered_map'], 10),

-- C++ Coding 19
('cpp', 'Algorithms', 'medium', 'Binary Search STL',
'Use lower_bound and upper_bound.',
'pair<int,int> findRange(vector<int>& nums, int target) {
  // Return {first, last} index of target
}',
'pair<int,int> findRange(vector<int>& nums, int target) {
  auto low = lower_bound(nums.begin(), nums.end(), target);
  auto high = upper_bound(nums.begin(), nums.end(), target);
  if (low == nums.end() || *low != target) return {-1, -1};
  return {low - nums.begin(), high - nums.begin() - 1};
}',
'[{"input": "[1,2,2,2,3], 2", "expected": "{1, 3}"}]'::jsonb,
'O(log n)', 'O(1)', ARRAY['Binary search'], ARRAY['lower_bound returns first >=, upper_bound returns first >'], ARRAY['stl', 'binary-search'], 10),

-- C++ Coding 20
('cpp', 'Modern C++', 'medium', 'Structured Bindings and auto',
'Use structured bindings with maps and tuples.',
'void modernCppDemo() {
  // Your code here
}',
'void modernCppDemo() {
  // With map
  map<string, int> scores{{"Alice", 100}, {"Bob", 95}};
  for (auto& [name, score] : scores) {
    cout << name << ": " << score << endl;
  }
  // With tuple
  auto [x, y, z] = make_tuple(1, 2.5, "hello");
  cout << x << ", " << y << ", " << z << endl;
}',
'[{"input": "Structured bindings", "expected": "Clean access to pairs/tuples"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['Modern C++'], ARRAY['Use auto and structured bindings'], ARRAY['c++17', 'modern'], 10),


-- =====================================================
-- 8. JAVA PROGRAMMING - CODING PRACTICE
-- 20 Coding Questions
-- =====================================================

-- Java Coding 1
('java', 'Collections', 'easy', 'ArrayList Operations',
'Perform basic ArrayList operations.',
'void arrayListDemo() {
    // Your code here
}',
'void arrayListDemo() {
    ArrayList<Integer> list = new ArrayList<>();
    list.add(1); list.add(2); list.add(3);
    list.remove(Integer.valueOf(2));
    for (int num : list) System.out.println(num);
}',
'[{"input": "ArrayList operations", "expected": "1, 3"}]'::jsonb,
'O(1) amortized', 'O(n)', ARRAY['Collections'], ARRAY['Use add, remove methods'], ARRAY['collections', 'arraylist'], 5),

-- Java Coding 2
('java', 'Collections', 'medium', 'HashMap Frequency Count',
'Count frequency of words using HashMap.',
'Map<String, Integer> wordFrequency(String[] words) {
    // Your code here
}',
'Map<String, Integer> wordFrequency(String[] words) {
    Map<String, Integer> freq = new HashMap<>();
    for (String word : words) {
        freq.put(word, freq.getOrDefault(word, 0) + 1);
    }
    return freq;
}',
'[{"input": "[\"a\",\"b\",\"a\",\"c\",\"a\"]", "expected": "{a:3, b:1, c:1}"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['HashMap'], ARRAY['Use getOrDefault'], ARRAY['collections', 'hashmap'], 10),

-- Java Coding 3
('java', 'Streams', 'medium', 'Filter and Map with Streams',
'Use streams to filter and transform data.',
'List<Integer> filterAndSquare(List<Integer> nums) {
    // Your code here
}',
'List<Integer> filterAndSquare(List<Integer> nums) {
    return nums.stream()
        .filter(n -> n > 0)
        .map(n -> n * n)
        .collect(Collectors.toList());
}',
'[{"input": "[-1, 2, -3, 4]", "expected": "[4, 16]"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Streams API'], ARRAY['Chain filter, map, collect'], ARRAY['streams', 'lambda'], 10),

-- Java Coding 4
('java', 'Multithreading', 'medium', 'Create and Run Thread',
'Create threads using Runnable and Thread class.',
'void threadDemo() {
    // Your code here
}',
'void threadDemo() {
    // Using Runnable
    Runnable task = () -> System.out.println("Running in: " + Thread.currentThread().getName());
    Thread t1 = new Thread(task);
    t1.start();
    // Using Thread class
    Thread t2 = new Thread() {
        public void run() { System.out.println("Thread 2 running"); }
    };
    t2.start();
}',
'[{"input": "Create threads", "expected": "Threads run concurrently"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Multithreading'], ARRAY['Implement Runnable or extend Thread'], ARRAY['threads', 'concurrency'], 10),

-- Java Coding 5
('java', 'Multithreading', 'hard', 'Producer Consumer with BlockingQueue',
'Implement producer-consumer using BlockingQueue.',
'class ProducerConsumer {
    // Your code here
}',
'class ProducerConsumer {
    private BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(10);
    
    void produce() throws InterruptedException {
        for (int i = 0; i < 100; i++) {
            queue.put(i);
            System.out.println("Produced: " + i);
        }
    }
    
    void consume() throws InterruptedException {
        while (true) {
            Integer item = queue.take();
            System.out.println("Consumed: " + item);
        }
    }
}',
'[{"input": "Producer and consumer threads", "expected": "Synchronized production/consumption"}]'::jsonb,
'O(1)', 'O(n)', ARRAY['Concurrency'], ARRAY['BlockingQueue handles synchronization'], ARRAY['threads', 'blocking-queue'], 20),

-- Java Coding 6
('java', 'Generics', 'medium', 'Generic Pair Class',
'Implement a generic Pair class.',
'class Pair<K, V> {
    // Your code here
}',
'class Pair<K, V> {
    private K key;
    private V value;
    
    public Pair(K key, V value) { this.key = key; this.value = value; }
    public K getKey() { return key; }
    public V getValue() { return value; }
    public void setKey(K key) { this.key = key; }
    public void setValue(V value) { this.value = value; }
}',
'[{"input": "Pair<String, Integer>", "expected": "Type-safe pair"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Generics'], ARRAY['Use type parameters K, V'], ARRAY['generics', 'data-structures'], 10),

-- Java Coding 7
('java', 'Exception Handling', 'easy', 'Custom Exception',
'Create and throw a custom exception.',
'class InvalidAgeException extends Exception {
    // Your code here
}',
'class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

void validateAge(int age) throws InvalidAgeException {
    if (age < 0 || age > 150) {
        throw new InvalidAgeException("Invalid age: " + age);
    }
}',
'[{"input": "age = -5", "expected": "InvalidAgeException thrown"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Exceptions'], ARRAY['Extend Exception class'], ARRAY['exceptions', 'custom'], 10),

-- Java Coding 8
('java', 'Streams', 'medium', 'Group By with Streams',
'Group elements by a property using streams.',
'Map<Integer, List<String>> groupByLength(List<String> words) {
    // Your code here
}',
'Map<Integer, List<String>> groupByLength(List<String> words) {
    return words.stream()
        .collect(Collectors.groupingBy(String::length));
}',
'[{"input": "[\"a\", \"bb\", \"ccc\", \"dd\"]", "expected": "{1:[a], 2:[bb,dd], 3:[ccc]}"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Streams'], ARRAY['Use Collectors.groupingBy'], ARRAY['streams', 'collectors'], 10),

-- Java Coding 9
('java', 'Collections', 'medium', 'TreeMap for Sorted Data',
'Use TreeMap to maintain sorted order by keys.',
'void treeMapDemo() {
    // Your code here
}',
'void treeMapDemo() {
    TreeMap<Integer, String> map = new TreeMap<>();
    map.put(3, "Three"); map.put(1, "One"); map.put(2, "Two");
    // Keys are automatically sorted
    for (Map.Entry<Integer, String> e : map.entrySet()) {
        System.out.println(e.getKey() + ": " + e.getValue());
    }
    System.out.println("First: " + map.firstKey());
    System.out.println("Last: " + map.lastKey());
}',
'[{"input": "Insert in random order", "expected": "Keys sorted"}]'::jsonb,
'O(log n)', 'O(n)', ARRAY['TreeMap'], ARRAY['Sorted by natural order'], ARRAY['collections', 'treemap'], 10),

-- Java Coding 10
('java', 'OOP', 'medium', 'Interface with Default Method',
'Create interface with default and static methods.',
'interface Vehicle {
    // Your code here
}',
'interface Vehicle {
    void start();
    void stop();
    default void honk() { System.out.println("Beep!"); }
    static int getMaxSpeed() { return 200; }
}

class Car implements Vehicle {
    public void start() { System.out.println("Car starting"); }
    public void stop() { System.out.println("Car stopping"); }
}',
'[{"input": "Car implementing Vehicle", "expected": "Default honk works"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Interfaces'], ARRAY['Use default keyword'], ARRAY['oop', 'interface'], 10),

-- Java Coding 11
('java', 'Streams', 'hard', 'Parallel Stream Processing',
'Use parallel streams for concurrent processing.',
'long parallelSum(List<Long> numbers) {
    // Your code here
}',
'long parallelSum(List<Long> numbers) {
    return numbers.parallelStream()
        .mapToLong(Long::longValue)
        .sum();
}

// For custom reduction
long parallelReduce(List<Long> numbers) {
    return numbers.parallelStream()
        .reduce(0L, Long::sum);
}',
'[{"input": "Large list of numbers", "expected": "Sum computed in parallel"}]'::jsonb,
'O(n/p)', 'O(n)', ARRAY['Parallel streams'], ARRAY['Use parallelStream()'], ARRAY['streams', 'parallel'], 15),

-- Java Coding 12
('java', 'Reflection', 'hard', 'Get Class Methods Using Reflection',
'Use reflection to get all methods of a class.',
'void printMethods(Class<?> clazz) {
    // Your code here
}',
'void printMethods(Class<?> clazz) {
    Method[] methods = clazz.getDeclaredMethods();
    for (Method method : methods) {
        System.out.println("Method: " + method.getName());
        System.out.println("  Return: " + method.getReturnType().getSimpleName());
        System.out.println("  Params: " + Arrays.toString(method.getParameterTypes()));
    }
}',
'[{"input": "Any class", "expected": "All methods listed"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Reflection'], ARRAY['Use getDeclaredMethods'], ARRAY['reflection', 'metaprogramming'], 15),

-- Java Coding 13
('java', 'Collections', 'medium', 'PriorityQueue Custom Comparator',
'Use PriorityQueue with custom comparator.',
'PriorityQueue<int[]> createMinHeapBySecond() {
    // Your code here
}',
'PriorityQueue<int[]> createMinHeapBySecond() {
    return new PriorityQueue<>((a, b) -> a[1] - b[1]);
}

void demo() {
    PriorityQueue<int[]> pq = createMinHeapBySecond();
    pq.offer(new int[]{1, 5});
    pq.offer(new int[]{2, 3});
    pq.offer(new int[]{3, 4});
    while (!pq.isEmpty()) {
        int[] arr = pq.poll();
        System.out.println(arr[0] + ", " + arr[1]);
    }
}',
'[{"input": "Arrays sorted by second element", "expected": "Min heap order"}]'::jsonb,
'O(log n)', 'O(n)', ARRAY['PriorityQueue'], ARRAY['Comparator as lambda'], ARRAY['collections', 'heap'], 10),

-- Java Coding 14
('java', 'CompletableFuture', 'hard', 'Async Operations',
'Use CompletableFuture for async operations.',
'CompletableFuture<String> asyncDemo() {
    // Your code here
}',
'CompletableFuture<String> asyncDemo() {
    return CompletableFuture.supplyAsync(() -> {
        // Simulate long operation
        try { Thread.sleep(1000); } catch (Exception e) {}
        return "Result";
    }).thenApply(result -> result.toUpperCase())
      .thenCompose(upper -> CompletableFuture.supplyAsync(() -> upper + "!"));
}

void usage() throws Exception {
    CompletableFuture<String> future = asyncDemo();
    System.out.println(future.get()); // RESULT!
}',
'[{"input": "Async chain", "expected": "Chained results"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Async'], ARRAY['Chain with thenApply, thenCompose'], ARRAY['async', 'completablefuture'], 20),

-- Java Coding 15
('java', 'File I/O', 'medium', 'Read File with NIO',
'Read file contents using NIO.',
'String readFile(String path) throws IOException {
    // Your code here
}',
'String readFile(String path) throws IOException {
    return new String(Files.readAllBytes(Paths.get(path)));
}

List<String> readLines(String path) throws IOException {
    return Files.readAllLines(Paths.get(path));
}

void streamLines(String path) throws IOException {
    try (Stream<String> lines = Files.lines(Paths.get(path))) {
        lines.forEach(System.out::println);
    }
}',
'[{"input": "File path", "expected": "File contents"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['NIO'], ARRAY['Use Files.readAllBytes or Files.lines'], ARRAY['io', 'nio'], 10),

-- Java Coding 16
('java', 'Optional', 'medium', 'Use Optional Properly',
'Handle null values using Optional.',
'Optional<String> findUserName(int id) {
    // Your code here
}',
'Optional<String> findUserName(int id) {
    Map<Integer, String> users = Map.of(1, "Alice", 2, "Bob");
    return Optional.ofNullable(users.get(id));
}

void usage() {
    String name = findUserName(1)
        .map(String::toUpperCase)
        .orElse("Unknown");
    
    findUserName(3).ifPresentOrElse(
        n -> System.out.println("Found: " + n),
        () -> System.out.println("Not found")
    );
}',
'[{"input": "Valid and invalid IDs", "expected": "Handles null safely"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Optional'], ARRAY['Use map, orElse, ifPresent'], ARRAY['optional', 'null-safety'], 10),

-- Java Coding 17
('java', 'Annotations', 'hard', 'Custom Annotation with Processing',
'Create and process a custom annotation.',
'@interface JsonField {
    // Your code here
}',
'@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface JsonField {
    String name() default "";
}

class User {
    @JsonField(name = "user_name")
    private String username;
    
    @JsonField
    private int age;
}

String toJson(Object obj) throws Exception {
    StringBuilder json = new StringBuilder("{");
    for (Field field : obj.getClass().getDeclaredFields()) {
        if (field.isAnnotationPresent(JsonField.class)) {
            field.setAccessible(true);
            JsonField ann = field.getAnnotation(JsonField.class);
            String name = ann.name().isEmpty() ? field.getName() : ann.name();
            json.append("\"").append(name).append("\":").append(field.get(obj)).append(",");
        }
    }
    return json.substring(0, json.length()-1) + "}";
}',
'[{"input": "Annotated class", "expected": "JSON output"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Annotations'], ARRAY['Use @Retention, @Target'], ARRAY['annotations', 'reflection'], 25),

-- Java Coding 18
('java', 'Lambda', 'medium', 'Functional Interfaces',
'Use built-in functional interfaces.',
'void functionalDemo() {
    // Your code here
}',
'void functionalDemo() {
    // Predicate
    Predicate<Integer> isEven = n -> n % 2 == 0;
    System.out.println(isEven.test(4)); // true
    
    // Function
    Function<String, Integer> length = String::length;
    System.out.println(length.apply("Hello")); // 5
    
    // Consumer
    Consumer<String> printer = System.out::println;
    printer.accept("Hello");
    
    // Supplier
    Supplier<Double> random = Math::random;
    System.out.println(random.get());
}',
'[{"input": "Functional interfaces", "expected": "Lambda usage"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Lambda'], ARRAY['Predicate, Function, Consumer, Supplier'], ARRAY['lambda', 'functional'], 10),

-- Java Coding 19
('java', 'Collections', 'medium', 'Immutable Collections',
'Create immutable collections.',
'void immutableDemo() {
    // Your code here
}',
'void immutableDemo() {
    // Java 9+ factory methods
    List<String> list = List.of("a", "b", "c");
    Set<Integer> set = Set.of(1, 2, 3);
    Map<String, Integer> map = Map.of("one", 1, "two", 2);
    
    // list.add("d"); // throws UnsupportedOperationException
    
    // Unmodifiable wrapper
    List<String> mutable = new ArrayList<>(list);
    List<String> immutable = Collections.unmodifiableList(mutable);
}',
'[{"input": "Create immutable collections", "expected": "Cannot modify"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Immutability'], ARRAY['Use List.of, Set.of, Map.of'], ARRAY['collections', 'immutable'], 10),

-- Java Coding 20
('java', 'Records', 'easy', 'Java Records',
'Use Java records for data classes.',
'record Point(int x, int y) {
    // Your code here
}',
'record Point(int x, int y) {
    // Compact constructor for validation
    public Point {
        if (x < 0 || y < 0) throw new IllegalArgumentException("Coordinates must be positive");
    }
    
    // Additional method
    public double distanceFromOrigin() {
        return Math.sqrt(x * x + y * y);
    }
}

void usage() {
    Point p = new Point(3, 4);
    System.out.println(p.x()); // 3
    System.out.println(p.y()); // 4
    System.out.println(p.distanceFromOrigin()); // 5.0
}',
'[{"input": "Point record", "expected": "Auto-generated getters, equals, hashCode"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Records'], ARRAY['Compact syntax for data classes'], ARRAY['records', 'java16'], 10),


-- =====================================================
-- 9. PYTHON PROGRAMMING - CODING PRACTICE
-- 20 Coding Questions
-- =====================================================

-- Python Coding 1
('python', 'List Comprehensions', 'easy', 'List Comprehension Basics',
'Use list comprehension to square even numbers.',
'def square_evens(nums):
    # Your code here
    pass',
'def square_evens(nums):
    return [x**2 for x in nums if x % 2 == 0]',
'[{"input": "[1,2,3,4,5,6]", "expected": "[4, 16, 36]"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['List comprehension'], ARRAY['Filter and transform in one line'], ARRAY['list-comprehension', 'basics'], 5),

-- Python Coding 2
('python', 'Dictionaries', 'easy', 'Dictionary Comprehension',
'Create a dictionary from two lists using comprehension.',
'def create_dict(keys, values):
    # Your code here
    pass',
'def create_dict(keys, values):
    return {k: v for k, v in zip(keys, values)}',
'[{"input": "[a,b,c], [1,2,3]", "expected": "{a:1, b:2, c:3}"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Dict comprehension'], ARRAY['Use zip to pair elements'], ARRAY['dictionary', 'comprehension'], 5),

-- Python Coding 3
('python', 'Generators', 'medium', 'Generator Function',
'Create a generator for Fibonacci sequence.',
'def fibonacci(n):
    # Your code here - yield values
    pass',
'def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# Usage: list(fibonacci(10)) -> [0,1,1,2,3,5,8,13,21,34]',
'[{"input": "n=10", "expected": "First 10 Fibonacci numbers"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['Generators'], ARRAY['Use yield for lazy evaluation'], ARRAY['generators', 'fibonacci'], 10),

-- Python Coding 4
('python', 'Decorators', 'medium', 'Timing Decorator',
'Create a decorator to measure function execution time.',
'def timer(func):
    # Your code here
    pass',
'import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done"',
'[{"input": "Decorated function", "expected": "Prints execution time"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Decorators'], ARRAY['Use functools.wraps'], ARRAY['decorators', 'timing'], 15),

-- Python Coding 5
('python', 'Decorators', 'hard', 'Decorator with Arguments',
'Create a decorator that takes arguments.',
'def repeat(times):
    # Your code here
    pass',
'def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")

# Calling greet("World") prints "Hello, World!" 3 times',
'[{"input": "@repeat(3)", "expected": "Function called 3 times"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['Decorators'], ARRAY['Three levels of nesting'], ARRAY['decorators', 'parameterized'], 20),

-- Python Coding 6
('python', 'Context Managers', 'medium', 'Custom Context Manager',
'Create a context manager for file handling.',
'class FileManager:
    # Your code here
    pass',
'class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
        return False  # Don''t suppress exceptions

# Usage
with FileManager("test.txt", "w") as f:
    f.write("Hello")',
'[{"input": "Context manager usage", "expected": "File auto-closed"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Context managers'], ARRAY['Implement __enter__ and __exit__'], ARRAY['context-manager', 'with'], 15),

-- Python Coding 7
('python', 'OOP', 'medium', 'Property Decorator',
'Use @property for getter/setter.',
'class Temperature:
    # Your code here
    pass',
'class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9',
'[{"input": "Temperature manipulation", "expected": "Conversion works"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Properties'], ARRAY['Use @property and setter'], ARRAY['oop', 'property'], 15),

-- Python Coding 8
('python', 'Collections', 'medium', 'Counter and defaultdict',
'Use Counter and defaultdict from collections.',
'def collections_demo(words):
    # Your code here
    pass',
'from collections import Counter, defaultdict

def collections_demo(words):
    # Counter for frequency
    freq = Counter(words)
    most_common = freq.most_common(3)
    
    # defaultdict for grouping
    by_length = defaultdict(list)
    for word in words:
        by_length[len(word)].append(word)
    
    return {
        "frequency": dict(freq),
        "most_common": most_common,
        "by_length": dict(by_length)
    }',
'[{"input": "List of words", "expected": "Frequency and grouping"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Collections'], ARRAY['Counter and defaultdict'], ARRAY['collections', 'counter'], 10),

-- Python Coding 9
('python', 'Itertools', 'medium', 'Itertools Usage',
'Use itertools for combinations and permutations.',
'def itertools_demo(items):
    # Your code here
    pass',
'from itertools import combinations, permutations, product

def itertools_demo(items):
    # All combinations of 2
    combos = list(combinations(items, 2))
    
    # All permutations
    perms = list(permutations(items))
    
    # Cartesian product
    prod = list(product([1,2], ["a","b"]))
    
    return {
        "combinations": combos,
        "permutations": perms,
        "product": prod
    }',
'[{"input": "[1,2,3]", "expected": "All combinations, permutations"}]'::jsonb,
'O(n!)', 'O(n!)', ARRAY['Itertools'], ARRAY['combinations, permutations, product'], ARRAY['itertools', 'combinatorics'], 10),

-- Python Coding 10
('python', 'Classes', 'hard', 'Dataclass with Validation',
'Use dataclass with field validation.',
'@dataclass
class Person:
    # Your code here
    pass',
'from dataclasses import dataclass, field
from typing import List

@dataclass
class Person:
    name: str
    age: int
    hobbies: List[str] = field(default_factory=list)
    
    def __post_init__(self):
        if self.age < 0:
            raise ValueError("Age cannot be negative")
        self.name = self.name.strip().title()
    
    @property
    def is_adult(self):
        return self.age >= 18',
'[{"input": "Person data", "expected": "Validated person object"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Dataclasses'], ARRAY['Use __post_init__ for validation'], ARRAY['dataclass', 'validation'], 15),

-- Python Coding 11
('python', 'Async', 'hard', 'Async/Await Basics',
'Use async/await for concurrent operations.',
'async def fetch_all(urls):
    # Your code here
    pass',
'import asyncio
import aiohttp

async def fetch_one(session, url):
    async with session.get(url) as response:
        return await response.text()

async def fetch_all(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_one(session, url) for url in urls]
        return await asyncio.gather(*tasks)

# Usage
# results = asyncio.run(fetch_all(["http://example.com", "http://example.org"]))',
'[{"input": "List of URLs", "expected": "Concurrent fetching"}]'::jsonb,
'O(1)', 'O(n)', ARRAY['Async'], ARRAY['Use asyncio.gather for concurrency'], ARRAY['async', 'await'], 20),

-- Python Coding 12
('python', 'Type Hints', 'medium', 'Type Hints and Generics',
'Use type hints with generic types.',
'from typing import List, Dict, Optional, TypeVar

T = TypeVar("T")

def first_or_default(items: List[T], default: T) -> T:
    # Your code here
    pass',
'from typing import List, Dict, Optional, TypeVar, Generic

T = TypeVar("T")

def first_or_default(items: List[T], default: T) -> T:
    return items[0] if items else default

def find_by_key(data: Dict[str, T], key: str) -> Optional[T]:
    return data.get(key)

class Stack(Generic[T]):
    def __init__(self):
        self._items: List[T] = []
    
    def push(self, item: T) -> None:
        self._items.append(item)
    
    def pop(self) -> Optional[T]:
        return self._items.pop() if self._items else None',
'[{"input": "Typed functions", "expected": "Type-safe code"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Type hints'], ARRAY['TypeVar for generics'], ARRAY['typing', 'generics'], 15),

-- Python Coding 13
('python', 'RegEx', 'medium', 'Regular Expressions',
'Parse and validate data using regex.',
'import re

def parse_email(text):
    # Your code here
    pass',
'import re

def parse_email(text):
    pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
    return re.findall(pattern, text)

def validate_phone(phone):
    pattern = r"^\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$"
    return bool(re.match(pattern, phone))

def extract_urls(text):
    pattern = r"https?://[^\s]+"
    return re.findall(pattern, text)',
'[{"input": "Text with emails", "expected": "Extracted emails"}]'::jsonb,
'O(n)', 'O(m)', ARRAY['Regex'], ARRAY['Use re.findall, re.match'], ARRAY['regex', 'validation'], 15),

-- Python Coding 14
('python', 'Functools', 'medium', 'Functools Usage',
'Use functools for function utilities.',
'from functools import lru_cache, partial, reduce

def functools_demo():
    # Your code here
    pass',
'from functools import lru_cache, partial, reduce

@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

def functools_demo():
    # Partial application
    def power(base, exponent):
        return base ** exponent
    square = partial(power, exponent=2)
    cube = partial(power, exponent=3)
    
    # Reduce
    nums = [1, 2, 3, 4, 5]
    product = reduce(lambda x, y: x * y, nums)
    
    return {
        "fib_10": fibonacci(10),
        "square_5": square(5),
        "product": product
    }',
'[{"input": "Functools usage", "expected": "Memoized, partial, reduced"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Functools'], ARRAY['lru_cache, partial, reduce'], ARRAY['functools', 'optimization'], 15),

-- Python Coding 15
('python', 'Classes', 'hard', 'Metaclass Example',
'Create a metaclass for validation.',
'class ValidatedMeta(type):
    # Your code here
    pass',
'class ValidatedMeta(type):
    def __new__(mcs, name, bases, namespace):
        # Ensure all methods have docstrings
        for key, value in namespace.items():
            if callable(value) and not key.startswith("_"):
                if not value.__doc__:
                    raise TypeError(f"Method {key} must have a docstring")
        return super().__new__(mcs, name, bases, namespace)

class API(metaclass=ValidatedMeta):
    def get_data(self):
        """Fetches data from the API."""
        pass
    
    def post_data(self):
        """Posts data to the API."""
        pass',
'[{"input": "Class with metaclass", "expected": "Validation at class creation"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['Metaclasses'], ARRAY['Override __new__ in metaclass'], ARRAY['metaclass', 'validation'], 25),

-- Python Coding 16
('python', 'Testing', 'medium', 'Unit Test with pytest',
'Write pytest tests with fixtures.',
'# test_example.py
import pytest

def test_example():
    # Your code here
    pass',
'import pytest

# Fixture
@pytest.fixture
def sample_data():
    return {"users": [{"name": "Alice", "age": 30}]}

# Parametrized test
@pytest.mark.parametrize("input,expected", [
    (1, 1),
    (2, 4),
    (3, 9),
])
def test_square(input, expected):
    assert input ** 2 == expected

def test_with_fixture(sample_data):
    assert len(sample_data["users"]) == 1
    assert sample_data["users"][0]["name"] == "Alice"

def test_exception():
    with pytest.raises(ValueError):
        int("not a number")',
'[{"input": "Test cases", "expected": "All tests pass"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Testing'], ARRAY['Use fixtures and parametrize'], ARRAY['pytest', 'testing'], 15),

-- Python Coding 17
('python', 'Classes', 'medium', 'Abstract Base Class',
'Create an abstract base class with abstract methods.',
'from abc import ABC, abstractmethod

class Shape(ABC):
    # Your code here
    pass',
'from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass
    
    @abstractmethod
    def perimeter(self) -> float:
        pass
    
    def describe(self) -> str:
        return f"Area: {self.area():.2f}, Perimeter: {self.perimeter():.2f}"

class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius
    
    def area(self) -> float:
        return math.pi * self.radius ** 2
    
    def perimeter(self) -> float:
        return 2 * math.pi * self.radius',
'[{"input": "Circle(5)", "expected": "Area and perimeter calculated"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['ABC'], ARRAY['Use @abstractmethod'], ARRAY['abc', 'oop'], 15),

-- Python Coding 18
('python', 'Files', 'easy', 'File Operations with pathlib',
'Use pathlib for file operations.',
'from pathlib import Path

def file_operations(directory):
    # Your code here
    pass',
'from pathlib import Path

def file_operations(directory):
    path = Path(directory)
    
    # List all Python files recursively
    py_files = list(path.rglob("*.py"))
    
    # Read file content
    if py_files:
        content = py_files[0].read_text()
    
    # Create directory
    new_dir = path / "new_folder"
    new_dir.mkdir(exist_ok=True)
    
    # Write file
    (new_dir / "test.txt").write_text("Hello World")
    
    return {
        "py_files": [str(f) for f in py_files],
        "created": str(new_dir)
    }',
'[{"input": "Directory path", "expected": "File operations performed"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Pathlib'], ARRAY['Use Path methods'], ARRAY['pathlib', 'files'], 10),

-- Python Coding 19
('python', 'JSON', 'easy', 'JSON Handling',
'Parse and create JSON data.',
'import json

def json_operations(data):
    # Your code here
    pass',
'import json
from datetime import datetime

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

def json_operations(data):
    # Parse JSON string
    parsed = json.loads(data) if isinstance(data, str) else data
    
    # Serialize to JSON with custom encoder
    result = {
        "data": parsed,
        "timestamp": datetime.now()
    }
    json_str = json.dumps(result, cls=DateTimeEncoder, indent=2)
    
    return json_str',
'[{"input": "JSON string", "expected": "Parsed and serialized"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['JSON'], ARRAY['Use json.loads, json.dumps'], ARRAY['json', 'serialization'], 10),

-- Python Coding 20
('python', 'Multiprocessing', 'hard', 'Parallel Processing',
'Use multiprocessing for CPU-bound tasks.',
'from multiprocessing import Pool

def parallel_process(data):
    # Your code here
    pass',
'from multiprocessing import Pool, cpu_count
from concurrent.futures import ProcessPoolExecutor

def cpu_intensive_task(n):
    """Simulate CPU-bound task"""
    return sum(i * i for i in range(n))

def parallel_process(data):
    # Using Pool
    with Pool(processes=cpu_count()) as pool:
        results = pool.map(cpu_intensive_task, data)
    return results

def parallel_with_futures(data):
    # Using ProcessPoolExecutor
    with ProcessPoolExecutor(max_workers=cpu_count()) as executor:
        futures = [executor.submit(cpu_intensive_task, n) for n in data]
        results = [f.result() for f in futures]
    return results',
'[{"input": "List of numbers", "expected": "Parallel computation results"}]'::jsonb,
'O(n/p)', 'O(n)', ARRAY['Multiprocessing'], ARRAY['Pool.map for parallelism'], ARRAY['multiprocessing', 'parallel'], 20),


-- =====================================================
-- 10. JAVASCRIPT PROGRAMMING - CODING PRACTICE
-- 20 Coding Questions
-- =====================================================

-- JS Coding 1
('javascript', 'Arrays', 'easy', 'Array Methods',
'Use map, filter, reduce on arrays.',
'function arrayMethods(nums) {
  // Your code here
}',
'function arrayMethods(nums) {
  const doubled = nums.map(x => x * 2);
  const evens = nums.filter(x => x % 2 === 0);
  const sum = nums.reduce((acc, x) => acc + x, 0);
  return { doubled, evens, sum };
}',
'[{"input": "[1,2,3,4,5]", "expected": "doubled, evens, sum"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Array methods'], ARRAY['map, filter, reduce'], ARRAY['arrays', 'functional'], 5),

-- JS Coding 2
('javascript', 'Closures', 'medium', 'Counter with Closure',
'Create a counter using closure.',
'function createCounter() {
  // Your code here
}',
'function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
    reset: () => count = 0
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1',
'[{"input": "Counter operations", "expected": "Maintains state"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Closures'], ARRAY['Private variable in closure'], ARRAY['closures', 'state'], 10),

-- JS Coding 3
('javascript', 'Promises', 'medium', 'Promise Chain',
'Create a promise chain with error handling.',
'function promiseChain(value) {
  // Your code here
}',
'function promiseChain(value) {
  return Promise.resolve(value)
    .then(x => x * 2)
    .then(x => {
      if (x > 100) throw new Error("Too large");
      return x + 10;
    })
    .then(x => `Result: ${x}`)
    .catch(err => `Error: ${err.message}`)
    .finally(() => console.log("Done"));
}',
'[{"input": "50", "expected": "Result: 110"}, {"input": "60", "expected": "Error: Too large"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Promises'], ARRAY['Chain with then, catch, finally'], ARRAY['promises', 'async'], 10),

-- JS Coding 4
('javascript', 'Async/Await', 'medium', 'Async Function with Error Handling',
'Convert promise chain to async/await.',
'async function fetchData(url) {
  // Your code here
}',
'async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
}

// Parallel fetching
async function fetchAll(urls) {
  return Promise.all(urls.map(url => fetchData(url)));
}',
'[{"input": "Valid URL", "expected": "JSON data"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Async/Await'], ARRAY['try/catch with await'], ARRAY['async', 'fetch'], 10),

-- JS Coding 5
('javascript', 'Classes', 'medium', 'ES6 Class with Inheritance',
'Create classes with inheritance.',
'class Animal {
  // Your code here
}
class Dog extends Animal {
  // Your code here
}',
'class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  speak() {
    return `${this.name} barks`;
  }
  fetch() {
    return `${this.name} fetches the ball`;
  }
}',
'[{"input": "Dog instance", "expected": "Inherited and overridden methods work"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Classes'], ARRAY['Use extends and super'], ARRAY['oop', 'inheritance'], 10),

-- JS Coding 6
('javascript', 'Destructuring', 'easy', 'Object and Array Destructuring',
'Use destructuring for clean code.',
'function destructuringDemo(obj, arr) {
  // Your code here
}',
'function destructuringDemo(obj, arr) {
  // Object destructuring with defaults
  const { name, age = 0, address: { city } = {} } = obj;
  
  // Array destructuring with rest
  const [first, second, ...rest] = arr;
  
  // Swapping
  let [a, b] = [1, 2];
  [a, b] = [b, a];
  
  // Function parameter destructuring
  const greet = ({ name, greeting = "Hello" }) => `${greeting}, ${name}!`;
  
  return { name, age, city, first, rest };
}',
'[{"input": "Object and array", "expected": "Destructured values"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Destructuring'], ARRAY['Nested and default values'], ARRAY['es6', 'destructuring'], 10),

-- JS Coding 7
('javascript', 'Spread/Rest', 'easy', 'Spread and Rest Operators',
'Use spread and rest operators.',
'function spreadRestDemo(...args) {
  // Your code here
}',
'function spreadRestDemo(...args) {
  // Rest parameter collects arguments
  const sum = args.reduce((a, b) => a + b, 0);
  
  // Spread for array operations
  const arr1 = [1, 2, 3];
  const arr2 = [...arr1, 4, 5]; // Copy and extend
  
  // Spread for objects
  const obj1 = { a: 1, b: 2 };
  const obj2 = { ...obj1, c: 3 }; // Shallow copy with addition
  
  // Merge arrays
  const merged = [...arr1, ...arr2];
  
  return { sum, arr2, obj2, merged };
}',
'[{"input": "Multiple arguments", "expected": "Spread/rest operations"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Spread/Rest'], ARRAY['... for both spread and rest'], ARRAY['es6', 'spread'], 5),

-- JS Coding 8
('javascript', 'Higher Order Functions', 'medium', 'Custom Higher Order Functions',
'Implement custom map and filter.',
'function customMap(arr, fn) {
  // Your code here
}
function customFilter(arr, predicate) {
  // Your code here
}',
'function customMap(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i], i, arr));
  }
  return result;
}

function customFilter(arr, predicate) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

function customReduce(arr, fn, initial) {
  let acc = initial;
  for (let i = 0; i < arr.length; i++) {
    acc = fn(acc, arr[i], i, arr);
  }
  return acc;
}',
'[{"input": "Array and function", "expected": "Same as built-in"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Higher order functions'], ARRAY['Accept function as argument'], ARRAY['functional', 'hof'], 15),

-- JS Coding 9
('javascript', 'this Keyword', 'medium', 'Understanding this',
'Demonstrate this binding in different contexts.',
'const thisDemo = {
  // Your code here
};',
'const thisDemo = {
  name: "Object",
  
  // Regular function - this from caller
  regularMethod: function() {
    return this.name;
  },
  
  // Arrow function - this from definition scope
  arrowMethod: () => {
    return this.name; // undefined (global this)
  },
  
  // Nested with bind
  nestedMethod: function() {
    const inner = function() {
      return this.name;
    }.bind(this);
    return inner();
  },
  
  // Nested with arrow
  nestedArrow: function() {
    const inner = () => this.name;
    return inner();
  }
};',
'[{"input": "Call methods", "expected": "Different this bindings"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['this keyword'], ARRAY['Arrow vs regular functions'], ARRAY['this', 'context'], 15),

-- JS Coding 10
('javascript', 'Modules', 'medium', 'ES6 Modules',
'Create and use ES6 modules.',
'// math.js
export function add(a, b) { /* */ }

// main.js
import { add } from "./math.js";',
'// math.js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export default class Calculator {
  constructor() {
    this.result = 0;
  }
  add(n) { this.result += n; return this; }
  getResult() { return this.result; }
}

// main.js
import Calculator, { add, multiply } from "./math.js";
import * as MathUtils from "./math.js";

console.log(add(2, 3)); // 5
console.log(MathUtils.multiply(4, 5)); // 20',
'[{"input": "Module import/export", "expected": "Proper module usage"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Modules'], ARRAY['Named and default exports'], ARRAY['modules', 'es6'], 10),

-- JS Coding 11
('javascript', 'Proxy', 'hard', 'Proxy for Validation',
'Use Proxy for object validation.',
'function createValidatedObject(schema) {
  // Your code here
}',
'function createValidatedObject(schema) {
  return new Proxy({}, {
    set(target, property, value) {
      if (schema[property]) {
        const { type, required, min, max } = schema[property];
        
        if (required && value == null) {
          throw new Error(`${property} is required`);
        }
        
        if (type && typeof value !== type) {
          throw new Error(`${property} must be ${type}`);
        }
        
        if (type === "number") {
          if (min !== undefined && value < min) throw new Error(`${property} must be >= ${min}`);
          if (max !== undefined && value > max) throw new Error(`${property} must be <= ${max}`);
        }
      }
      target[property] = value;
      return true;
    }
  });
}

const user = createValidatedObject({
  age: { type: "number", min: 0, max: 150 },
  name: { type: "string", required: true }
});',
'[{"input": "Schema and values", "expected": "Validated object"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Proxy'], ARRAY['Trap set operations'], ARRAY['proxy', 'validation'], 20),

-- JS Coding 12
('javascript', 'Generators', 'medium', 'Generator Functions',
'Create generator functions.',
'function* rangeGenerator(start, end) {
  // Your code here
}',
'function* rangeGenerator(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

function* infiniteSequence() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

// Usage
const range = rangeGenerator(0, 5);
console.log([...range]); // [0, 1, 2, 3, 4]

// Take first n from infinite
function* take(iterator, n) {
  for (let i = 0; i < n; i++) {
    const { value, done } = iterator.next();
    if (done) break;
    yield value;
  }
}

console.log([...take(infiniteSequence(), 5)]); // [0, 1, 2, 3, 4]',
'[{"input": "Range parameters", "expected": "Generated values"}]'::jsonb,
'O(n)', 'O(1)', ARRAY['Generators'], ARRAY['yield for lazy evaluation'], ARRAY['generators', 'iterators'], 15),

-- JS Coding 13
('javascript', 'WeakMap/WeakSet', 'medium', 'WeakMap for Private Data',
'Use WeakMap for private data.',
'const privateData = new WeakMap();

class User {
  // Your code here
}',
'const privateData = new WeakMap();

class User {
  constructor(name, password) {
    this.name = name;
    privateData.set(this, { password });
  }
  
  checkPassword(attempt) {
    return privateData.get(this).password === attempt;
  }
  
  changePassword(oldPass, newPass) {
    if (this.checkPassword(oldPass)) {
      privateData.get(this).password = newPass;
      return true;
    }
    return false;
  }
}

// password is truly private, can''t be accessed directly
const user = new User("Alice", "secret");
console.log(user.checkPassword("secret")); // true
console.log(user.password); // undefined',
'[{"input": "User with password", "expected": "Password is private"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['WeakMap'], ARRAY['WeakMap for private data'], ARRAY['weakmap', 'privacy'], 15),

-- JS Coding 14
('javascript', 'Event Loop', 'hard', 'Understanding Event Loop Order',
'Predict execution order with microtasks.',
'function eventLoopDemo() {
  // Predict the output order
}',
'function eventLoopDemo() {
  console.log("1. Sync start");
  
  setTimeout(() => console.log("2. Timeout 0"), 0);
  
  Promise.resolve()
    .then(() => console.log("3. Promise 1"))
    .then(() => console.log("4. Promise 2"));
  
  queueMicrotask(() => console.log("5. Microtask"));
  
  console.log("6. Sync end");
}

// Output order:
// 1. Sync start
// 6. Sync end
// 3. Promise 1
// 5. Microtask
// 4. Promise 2
// 2. Timeout 0

// Microtasks (Promises) execute before macrotasks (setTimeout)',
'[{"input": "Mixed sync/async code", "expected": "Correct order prediction"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Event loop'], ARRAY['Microtasks before macrotasks'], ARRAY['event-loop', 'async'], 20),

-- JS Coding 15
('javascript', 'Debounce/Throttle', 'medium', 'Implement Debounce and Throttle',
'Create debounce and throttle functions.',
'function debounce(fn, delay) {
  // Your code here
}
function throttle(fn, limit) {
  // Your code here
}',
'function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage
const debouncedSearch = debounce(query => console.log("Searching:", query), 300);
const throttledScroll = throttle(() => console.log("Scroll"), 1000);',
'[{"input": "Rapid function calls", "expected": "Controlled execution"}]'::jsonb,
'O(1)', 'O(1)', ARRAY['Debounce/Throttle'], ARRAY['clearTimeout for debounce, flag for throttle'], ARRAY['performance', 'optimization'], 15),

-- JS Coding 16
('javascript', 'Currying', 'medium', 'Function Currying',
'Implement function currying.',
'function curry(fn) {
  // Your code here
}',
'function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

// Usage
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6',
'[{"input": "Multi-argument function", "expected": "Curried version"}]'::jsonb,
'O(1)', 'O(n)', ARRAY['Currying'], ARRAY['Check args.length vs fn.length'], ARRAY['functional', 'currying'], 15),

-- JS Coding 17
('javascript', 'Memoization', 'medium', 'Memoization Function',
'Create a memoization wrapper.',
'function memoize(fn) {
  // Your code here
}',
'function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// With LRU eviction
function memoizeLRU(fn, maxSize = 100) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value;
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    if (cache.size > maxSize) {
      cache.delete(cache.keys().next().value);
    }
    return result;
  };
}',
'[{"input": "Expensive function", "expected": "Cached results"}]'::jsonb,
'O(1)', 'O(n)', ARRAY['Memoization'], ARRAY['Use Map for cache'], ARRAY['memoization', 'optimization'], 15),

-- JS Coding 18
('javascript', 'Promise.all/race', 'medium', 'Promise Combinators',
'Use Promise.all, allSettled, race, any.',
'async function promiseCombinators(promises) {
  // Your code here
}',
'async function promiseCombinators(promises) {
  // All must succeed
  try {
    const all = await Promise.all(promises);
    console.log("All:", all);
  } catch (e) {
    console.log("One failed:", e);
  }
  
  // All results regardless of success/failure
  const allSettled = await Promise.allSettled(promises);
  console.log("All settled:", allSettled);
  
  // First to complete (success or failure)
  const race = await Promise.race(promises);
  console.log("Race winner:", race);
  
  // First to succeed (ignores rejections)
  try {
    const any = await Promise.any(promises);
    console.log("Any success:", any);
  } catch (e) {
    console.log("All failed:", e);
  }
}',
'[{"input": "Array of promises", "expected": "Proper handling of each combinator"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Promise combinators'], ARRAY['Different semantics for each'], ARRAY['promises', 'async'], 15),

-- JS Coding 19
('javascript', 'Set/Map', 'easy', 'Set and Map Operations',
'Use Set and Map effectively.',
'function setMapDemo() {
  // Your code here
}',
'function setMapDemo() {
  // Set for unique values
  const set = new Set([1, 2, 2, 3, 3, 3]);
  set.add(4);
  set.delete(1);
  console.log([...set]); // [2, 3, 4]
  
  // Set operations
  const a = new Set([1, 2, 3]);
  const b = new Set([2, 3, 4]);
  const union = new Set([...a, ...b]);
  const intersection = new Set([...a].filter(x => b.has(x)));
  const difference = new Set([...a].filter(x => !b.has(x)));
  
  // Map for key-value pairs
  const map = new Map();
  map.set("key1", "value1");
  map.set({ id: 1 }, "object key");
  console.log(map.get("key1")); // value1
  
  // Iterate
  for (const [key, value] of map) {
    console.log(key, value);
  }
}',
'[{"input": "Set and Map usage", "expected": "Proper operations"}]'::jsonb,
'O(1)', 'O(n)', ARRAY['Set/Map'], ARRAY['Unique values, any key type'], ARRAY['collections', 'es6'], 10),

-- JS Coding 20
('javascript', 'Object Methods', 'medium', 'Object Static Methods',
'Use Object static methods.',
'function objectMethodsDemo(obj) {
  // Your code here
}',
'function objectMethodsDemo(obj) {
  // Keys, values, entries
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const entries = Object.entries(obj);
  
  // From entries back to object
  const newObj = Object.fromEntries(entries);
  
  // Freeze (immutable)
  const frozen = Object.freeze({ a: 1 });
  // frozen.a = 2; // Fails silently or throws in strict mode
  
  // Seal (can modify, can''t add/delete)
  const sealed = Object.seal({ b: 2 });
  sealed.b = 3; // Works
  // sealed.c = 4; // Fails
  
  // Check
  console.log(Object.isFrozen(frozen)); // true
  console.log(Object.isSealed(sealed)); // true
  
  // Shallow copy
  const copy = Object.assign({}, obj);
  const spread = { ...obj };
  
  // Define property with descriptor
  Object.defineProperty(obj, "readonly", {
    value: 42,
    writable: false,
    enumerable: true
  });
  
  return { keys, values, entries };
}',
'[{"input": "Object", "expected": "Various operations performed"}]'::jsonb,
'O(n)', 'O(n)', ARRAY['Object methods'], ARRAY['freeze, seal, assign, defineProperty'], ARRAY['objects', 'immutability'], 15);

