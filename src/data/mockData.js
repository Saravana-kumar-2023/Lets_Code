// Mock data for the Lets Code platform
// This data simulates what would come from the Spring Boot backend

export const languages = [
  {
    id: 1,
    name: 'HTML',
    slug: 'html',
    icon: '🌐',
    color: '#E44D26',
    description: 'The foundation of web development. Learn to structure web pages with HTML elements, forms, and semantic markup.',
    difficulty: 'Beginner',
    totalTopics: 12,
    totalVideos: 8,
    totalQuizzes: 5,
    totalChallenges: 6,
  },
  {
    id: 2,
    name: 'CSS',
    slug: 'css',
    icon: '🎨',
    color: '#264DE4',
    description: 'Style your websites with CSS. Master layouts, animations, responsive design, and modern styling techniques.',
    difficulty: 'Beginner',
    totalTopics: 14,
    totalVideos: 10,
    totalQuizzes: 6,
    totalChallenges: 8,
  },
  {
    id: 3,
    name: 'JavaScript',
    slug: 'javascript',
    icon: '⚡',
    color: '#F7DF1E',
    description: 'Add interactivity to your websites. Learn variables, functions, DOM manipulation, and async programming.',
    difficulty: 'Intermediate',
    totalTopics: 18,
    totalVideos: 12,
    totalQuizzes: 8,
    totalChallenges: 10,
  },
  {
    id: 4,
    name: 'Java',
    slug: 'java',
    icon: '☕',
    color: '#007396',
    description: 'Master object-oriented programming with Java. Learn OOP concepts, data structures, and build robust applications.',
    difficulty: 'Intermediate',
    totalTopics: 20,
    totalVideos: 15,
    totalQuizzes: 10,
    totalChallenges: 12,
  },
];

export const topicsByLanguage = {
  html: [
    { id: 1, title: 'Introduction to HTML', order: 1, completed: true, type: 'beginner' },
    { id: 2, title: 'HTML Document Structure', order: 2, completed: true, type: 'beginner' },
    { id: 3, title: 'Text Elements & Headings', order: 3, completed: false, type: 'beginner' },
    { id: 4, title: 'Links & Navigation', order: 4, completed: false, type: 'beginner' },
    { id: 5, title: 'Images & Media', order: 5, completed: false, type: 'beginner' },
    { id: 6, title: 'Lists & Tables', order: 6, completed: false, type: 'intermediate' },
    { id: 7, title: 'Forms & Input Elements', order: 7, completed: false, type: 'intermediate' },
    { id: 8, title: 'Semantic HTML5', order: 8, completed: false, type: 'intermediate' },
    { id: 9, title: 'HTML Attributes', order: 9, completed: false, type: 'intermediate' },
    { id: 10, title: 'Meta Tags & SEO', order: 10, completed: false, type: 'advanced' },
    { id: 11, title: 'Accessibility Basics', order: 11, completed: false, type: 'advanced' },
    { id: 12, title: 'HTML Best Practices', order: 12, completed: false, type: 'advanced' },
  ],
  css: [
    { id: 13, title: 'Introduction to CSS', order: 1, completed: true, type: 'beginner' },
    { id: 14, title: 'Selectors & Properties', order: 2, completed: false, type: 'beginner' },
    { id: 15, title: 'Box Model', order: 3, completed: false, type: 'beginner' },
    { id: 16, title: 'Colors & Typography', order: 4, completed: false, type: 'beginner' },
    { id: 17, title: 'Display & Positioning', order: 5, completed: false, type: 'intermediate' },
    { id: 18, title: 'Flexbox Layout', order: 6, completed: false, type: 'intermediate' },
    { id: 19, title: 'CSS Grid', order: 7, completed: false, type: 'intermediate' },
    { id: 20, title: 'Responsive Design', order: 8, completed: false, type: 'intermediate' },
    { id: 21, title: 'Animations & Transitions', order: 9, completed: false, type: 'intermediate' },
    { id: 22, title: 'CSS Variables', order: 10, completed: false, type: 'advanced' },
    { id: 23, title: 'Pseudo-classes & Elements', order: 11, completed: false, type: 'advanced' },
    { id: 24, title: 'CSS Architecture', order: 12, completed: false, type: 'advanced' },
  ],
  javascript: [
    { id: 25, title: 'Introduction to JavaScript', order: 1, completed: false, type: 'beginner' },
    { id: 26, title: 'Variables & Data Types', order: 2, completed: false, type: 'beginner' },
    { id: 27, title: 'Operators & Expressions', order: 3, completed: false, type: 'beginner' },
    { id: 28, title: 'Control Flow', order: 4, completed: false, type: 'beginner' },
    { id: 29, title: 'Functions', order: 5, completed: false, type: 'beginner' },
    { id: 30, title: 'Arrays & Objects', order: 6, completed: false, type: 'intermediate' },
    { id: 31, title: 'DOM Manipulation', order: 7, completed: false, type: 'intermediate' },
    { id: 32, title: 'Events & Listeners', order: 8, completed: false, type: 'intermediate' },
    { id: 33, title: 'ES6+ Features', order: 9, completed: false, type: 'intermediate' },
    { id: 34, title: 'Async JavaScript', order: 10, completed: false, type: 'advanced' },
    { id: 35, title: 'Error Handling', order: 11, completed: false, type: 'advanced' },
    { id: 36, title: 'Modules & Bundling', order: 12, completed: false, type: 'advanced' },
  ],
  java: [
    { id: 37, title: 'Introduction to Java', order: 1, completed: false, type: 'beginner' },
    { id: 38, title: 'Variables & Data Types', order: 2, completed: false, type: 'beginner' },
    { id: 39, title: 'Operators & Control Flow', order: 3, completed: false, type: 'beginner' },
    { id: 40, title: 'Methods & Functions', order: 4, completed: false, type: 'beginner' },
    { id: 41, title: 'OOP - Classes & Objects', order: 5, completed: false, type: 'intermediate' },
    { id: 42, title: 'Inheritance & Polymorphism', order: 6, completed: false, type: 'intermediate' },
    { id: 43, title: 'Interfaces & Abstraction', order: 7, completed: false, type: 'intermediate' },
    { id: 44, title: 'Exception Handling', order: 8, completed: false, type: 'intermediate' },
    { id: 45, title: 'Collections Framework', order: 9, completed: false, type: 'advanced' },
    { id: 46, title: 'File I/O', order: 10, completed: false, type: 'advanced' },
    { id: 47, title: 'Multithreading', order: 11, completed: false, type: 'advanced' },
    { id: 48, title: 'Java Best Practices', order: 12, completed: false, type: 'advanced' },
  ],
};

export const notesByTopic = {
  1: {
    id: 1,
    topicId: 1,
    title: 'Introduction to HTML',
    explanation: 'HTML (HyperText Markup Language) is the standard language for creating web pages. It describes the structure of a web page using a series of elements, which tell the browser how to display content.',
    syntax: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
</body>
</html>`,
    example: `<!-- A simple HTML page with heading and paragraph -->
<h1>Welcome to My Website</h1>
<p>This is a paragraph of text.</p>
<a href="https://example.com">Click here</a>`,
    keyPoints: [
      'HTML stands for HyperText Markup Language',
      'HTML elements are represented by tags like <tagname>',
      'Tags usually come in pairs: opening <p> and closing </p>',
      'The <!DOCTYPE html> declaration defines the document type',
      'HTML5 is the latest version of HTML',
    ],
    bestPractices: [
      'Always declare the document type with <!DOCTYPE html>',
      'Use lowercase for tag names',
      'Always close your HTML tags',
      'Use meaningful, semantic elements',
      'Include meta charset and viewport tags',
    ],
    commonMistakes: [
      'Forgetting to close tags',
      'Nesting elements incorrectly',
      'Missing the DOCTYPE declaration',
      'Not using semantic HTML5 elements',
      'Putting block elements inside inline elements',
    ],
  },
  2: {
    id: 2,
    topicId: 2,
    title: 'HTML Document Structure',
    explanation: 'Every HTML document follows a specific structure. The document starts with a DOCTYPE declaration, followed by the html element which contains head and body sections.',
    syntax: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Page Title</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
</body>
</html>`,
    example: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
</head>
<body>
    <header>
        <nav>Navigation here</nav>
    </header>
    <main>
        <section>Main content here</section>
    </main>
    <footer>
        <p>© 2024 My Website</p>
    </footer>
</body>
</html>`,
    keyPoints: [
      'DOCTYPE tells the browser which version of HTML to use',
      '<html> is the root element of the page',
      '<head> contains metadata and links to stylesheets',
      '<body> contains all visible content',
      'The <title> tag sets the browser tab title',
    ],
    bestPractices: [
      'Use semantic elements like header, main, footer, nav',
      'Keep the head section organized',
      'Set the language attribute on the html element',
      'Place scripts at the end of body for better performance',
    ],
    commonMistakes: [
      'Placing visible content in the head section',
      'Multiple body or html elements',
      'Missing the lang attribute',
    ],
  },
  13: {
    id: 13,
    topicId: 13,
    title: 'Introduction to CSS',
    explanation: 'CSS (Cascading Style Sheets) is used to style and layout web pages. It controls colors, fonts, spacing, positioning, and responsive behavior of HTML elements.',
    syntax: `/* CSS Syntax */
selector {
    property: value;
    another-property: value;
}

/* Examples */
h1 {
    color: #333;
    font-size: 2rem;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}`,
    example: `body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    color: #333;
}

.card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}`,
    keyPoints: [
      'CSS stands for Cascading Style Sheets',
      'CSS can be inline, internal, or external',
      'External CSS files are the recommended approach',
      'CSS uses selectors to target HTML elements',
      'The cascade determines which styles take priority',
    ],
    bestPractices: [
      'Use external CSS files for separation of concerns',
      'Use class selectors over ID selectors',
      'Keep specificity as low as possible',
      'Use CSS custom properties for theming',
      'Organize CSS with a consistent methodology',
    ],
    commonMistakes: [
      'Overusing !important',
      'Using too-specific selectors',
      'Not considering the cascade order',
      'Inline styles that override external CSS',
    ],
  },
  25: {
    id: 25,
    topicId: 25,
    title: 'Introduction to JavaScript',
    explanation: 'JavaScript is a versatile programming language that adds interactivity and dynamic behavior to web pages. It runs in the browser and can also be used server-side with Node.js.',
    syntax: `// Variables
let name = "John";
const age = 25;

// Functions
function greet(name) {
    return "Hello, " + name + "!";
}

// Arrow functions
const add = (a, b) => a + b;

// Console output
console.log(greet("World"));`,
    example: `// DOM manipulation example
const button = document.querySelector('#myButton');
button.addEventListener('click', () => {
    alert('Button was clicked!');
});

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]`,
    keyPoints: [
      'JavaScript is a dynamic, interpreted programming language',
      'It runs in web browsers and Node.js environments',
      'Variables can be declared with let, const, or var',
      'Functions are first-class objects in JavaScript',
      'JavaScript is event-driven and single-threaded',
    ],
    bestPractices: [
      'Use const by default, let when reassignment is needed',
      'Avoid var in modern JavaScript',
      'Use descriptive variable and function names',
      'Handle errors with try-catch blocks',
      'Use strict mode for safer code',
    ],
    commonMistakes: [
      'Confusing == with === (loose vs strict equality)',
      'Not understanding scope and hoisting',
      'Callback hell - use Promises or async/await instead',
      'Mutating objects and arrays unintentionally',
    ],
  },
  37: {
    id: 37,
    topicId: 37,
    title: 'Introduction to Java',
    explanation: 'Java is a class-based, object-oriented programming language designed to be platform-independent. It follows the principle "Write Once, Run Anywhere" (WORA) through the Java Virtual Machine (JVM).',
    syntax: `// Basic Java program structure
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}

// Variables
int age = 25;
String name = "John";
double price = 19.99;
boolean isActive = true;`,
    example: `public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();
        int result = calc.add(5, 3);
        System.out.println("Sum: " + result);
    }
}`,
    keyPoints: [
      'Java is a statically-typed, object-oriented language',
      'Every Java program needs a main method as entry point',
      'Java code is compiled to bytecode that runs on the JVM',
      'Java uses automatic garbage collection',
      'Everything in Java is inside a class',
    ],
    bestPractices: [
      'Follow Java naming conventions (camelCase, PascalCase)',
      'Use meaningful class and method names',
      'Keep methods short and focused',
      'Handle exceptions properly',
      'Use access modifiers appropriately',
    ],
    commonMistakes: [
      'Forgetting semicolons at end of statements',
      'Comparing strings with == instead of .equals()',
      'NullPointerException from uninitialized objects',
      'Confusing primitive types with wrapper classes',
    ],
  },
};

export const videosByLanguage = {
  html: [
    { id: 1, topicId: 1, title: 'HTML Crash Course for Beginners', youtubeId: 'qz0aGYrrlhU', duration: '68 min', watched: true },
    { id: 2, topicId: 2, title: 'HTML Document Structure Explained', youtubeId: 'pQN-pnXPaVg', duration: '45 min', watched: true },
    { id: 3, topicId: 3, title: 'HTML Text Elements Tutorial', youtubeId: 'kUMe1FH4CHE', duration: '25 min', watched: false },
    { id: 4, topicId: 7, title: 'HTML Forms Complete Guide', youtubeId: 'fNcJuPIZ2WE', duration: '55 min', watched: false },
    { id: 5, topicId: 8, title: 'Semantic HTML5 Elements', youtubeId: 'kGW8Al_cga4', duration: '30 min', watched: false },
  ],
  css: [
    { id: 6, topicId: 13, title: 'CSS Crash Course for Beginners', youtubeId: 'yfoY53QXEnI', duration: '85 min', watched: true },
    { id: 7, topicId: 15, title: 'CSS Box Model Explained', youtubeId: 'rIO5326FgPE', duration: '20 min', watched: false },
    { id: 8, topicId: 18, title: 'CSS Flexbox Complete Guide', youtubeId: 'JJSoEo8JSnc', duration: '50 min', watched: false },
    { id: 9, topicId: 19, title: 'CSS Grid Layout Tutorial', youtubeId: 'jV8B24rSN5o', duration: '45 min', watched: false },
    { id: 10, topicId: 20, title: 'Responsive Web Design Tutorial', youtubeId: 'srvUrASNj0s', duration: '60 min', watched: false },
  ],
  javascript: [
    { id: 11, topicId: 25, title: 'JavaScript Crash Course', youtubeId: 'hdI2bqOjy3c', duration: '100 min', watched: false },
    { id: 12, topicId: 26, title: 'JavaScript Variables & Data Types', youtubeId: 'edlFjlzxkSI', duration: '35 min', watched: false },
    { id: 13, topicId: 29, title: 'JavaScript Functions Deep Dive', youtubeId: 'N8ap4k_1QEQ', duration: '45 min', watched: false },
    { id: 14, topicId: 31, title: 'DOM Manipulation Masterclass', youtubeId: '5fb2aPlgoys', duration: '70 min', watched: false },
    { id: 15, topicId: 34, title: 'Async JavaScript - Promises & Fetch', youtubeId: 'PoRJizFvM7s', duration: '55 min', watched: false },
  ],
  java: [
    { id: 16, topicId: 37, title: 'Java Tutorial for Beginners', youtubeId: 'eIrMbAQSU34', duration: '150 min', watched: false },
    { id: 17, topicId: 41, title: 'Java OOP Concepts Explained', youtubeId: 'pTB0EiLXUC8', duration: '90 min', watched: false },
    { id: 18, topicId: 44, title: 'Java Exception Handling', youtubeId: '1XAfapkBQjk', duration: '40 min', watched: false },
    { id: 19, topicId: 45, title: 'Java Collections Framework', youtubeId: 'GdAon80-0KA', duration: '65 min', watched: false },
    { id: 20, topicId: 47, title: 'Java Multithreading Tutorial', youtubeId: 'r_MbozD32eo', duration: '50 min', watched: false },
  ],
};

export const quizzesByLanguage = {
  html: [
    {
      id: 1,
      title: 'HTML Basics Quiz',
      topicId: 1,
      questions: [
        {
          id: 1,
          question: 'What does HTML stand for?',
          options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'],
          correct: 0,
          explanation: 'HTML stands for HyperText Markup Language. It is the standard language for creating web pages.',
        },
        {
          id: 2,
          question: 'Which tag is used for the largest heading in HTML?',
          options: ['<heading>', '<h6>', '<h1>', '<head>'],
          correct: 2,
          explanation: '<h1> defines the largest heading. Headings go from <h1> (largest) to <h6> (smallest).',
        },
        {
          id: 3,
          question: 'Which element is used to create a paragraph?',
          options: ['<para>', '<p>', '<text>', '<pg>'],
          correct: 1,
          explanation: 'The <p> tag defines a paragraph in HTML.',
        },
        {
          id: 4,
          question: 'What is the correct HTML element for inserting a line break?',
          options: ['<break>', '<lb>', '<br>', '<newline>'],
          correct: 2,
          explanation: 'The <br> tag inserts a single line break. It is an empty element (no closing tag needed).',
        },
        {
          id: 5,
          question: 'Which attribute specifies an alternate text for an image?',
          options: ['title', 'src', 'alt', 'description'],
          correct: 2,
          explanation: 'The alt attribute provides alternative text for an image if it cannot be displayed.',
        },
      ],
    },
    {
      id: 2,
      title: 'HTML Forms & Semantic Elements',
      topicId: 7,
      questions: [
        {
          id: 6,
          question: 'Which input type creates a checkbox?',
          options: ['<input type="check">', '<input type="checkbox">', '<checkbox>', '<input type="tick">'],
          correct: 1,
          explanation: 'The type="checkbox" attribute creates a checkbox input element.',
        },
        {
          id: 7,
          question: 'Which HTML5 element defines navigation links?',
          options: ['<navigation>', '<nav>', '<links>', '<menu>'],
          correct: 1,
          explanation: 'The <nav> element defines a section of navigation links.',
        },
        {
          id: 8,
          question: 'What does the <article> element represent?',
          options: ['A sidebar', 'An independent, self-contained content', 'A navigation bar', 'A footer section'],
          correct: 1,
          explanation: 'The <article> element specifies independent, self-contained content like blog posts or news articles.',
        },
      ],
    },
  ],
  css: [
    {
      id: 3,
      title: 'CSS Fundamentals Quiz',
      topicId: 13,
      questions: [
        {
          id: 9,
          question: 'What does CSS stand for?',
          options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
          correct: 1,
          explanation: 'CSS stands for Cascading Style Sheets, used to style HTML elements.',
        },
        {
          id: 10,
          question: 'Which property is used to change the background color?',
          options: ['bgcolor', 'color', 'background-color', 'bg-color'],
          correct: 2,
          explanation: 'The background-color property sets the background color of an element.',
        },
        {
          id: 11,
          question: 'How do you select an element with id "demo"?',
          options: ['.demo', '#demo', 'demo', '*demo'],
          correct: 1,
          explanation: 'The # selector is used to select elements by their id attribute.',
        },
        {
          id: 12,
          question: 'Which CSS property controls the text size?',
          options: ['text-style', 'font-size', 'text-size', 'font-style'],
          correct: 1,
          explanation: 'The font-size property is used to control the size of text.',
        },
        {
          id: 13,
          question: 'What is the default value of the position property?',
          options: ['relative', 'absolute', 'static', 'fixed'],
          correct: 2,
          explanation: 'The default position value for HTML elements is static.',
        },
      ],
    },
  ],
  javascript: [
    {
      id: 4,
      title: 'JavaScript Basics Quiz',
      topicId: 25,
      questions: [
        {
          id: 14,
          question: 'Which keyword is used to declare a constant in JavaScript?',
          options: ['var', 'let', 'const', 'constant'],
          correct: 2,
          explanation: 'The const keyword declares a block-scoped constant that cannot be reassigned.',
        },
        {
          id: 15,
          question: 'What is the output of typeof null?',
          options: ['"null"', '"undefined"', '"object"', '"boolean"'],
          correct: 2,
          explanation: 'typeof null returns "object". This is a known bug in JavaScript that has been kept for backwards compatibility.',
        },
        {
          id: 16,
          question: 'Which method adds an element to the end of an array?',
          options: ['push()', 'pop()', 'shift()', 'append()'],
          correct: 0,
          explanation: 'The push() method adds one or more elements to the end of an array.',
        },
        {
          id: 17,
          question: 'What does === check?',
          options: ['Value only', 'Type only', 'Value and type', 'Reference'],
          correct: 2,
          explanation: 'The === operator checks both value and type equality (strict equality).',
        },
        {
          id: 18,
          question: 'Which function is used to parse a string to an integer?',
          options: ['Integer.parse()', 'parseInt()', 'Number.parseInt()', 'Both B and C'],
          correct: 3,
          explanation: 'Both parseInt() and Number.parseInt() can parse a string to an integer.',
        },
      ],
    },
  ],
  java: [
    {
      id: 5,
      title: 'Java Fundamentals Quiz',
      topicId: 37,
      questions: [
        {
          id: 19,
          question: 'What is the entry point of a Java program?',
          options: ['start() method', 'init() method', 'main() method', 'run() method'],
          correct: 2,
          explanation: 'The main() method with signature public static void main(String[] args) is the entry point.',
        },
        {
          id: 20,
          question: 'Which is NOT a primitive data type in Java?',
          options: ['int', 'boolean', 'String', 'double'],
          correct: 2,
          explanation: 'String is a class in Java, not a primitive data type. Primitives include int, boolean, char, etc.',
        },
        {
          id: 21,
          question: 'What keyword is used for inheritance in Java?',
          options: ['inherits', 'implements', 'extends', 'super'],
          correct: 2,
          explanation: 'The extends keyword is used for class inheritance. implements is used for interfaces.',
        },
        {
          id: 22,
          question: 'Which collection stores key-value pairs?',
          options: ['ArrayList', 'HashSet', 'HashMap', 'LinkedList'],
          correct: 2,
          explanation: 'HashMap stores data in key-value pairs and provides O(1) average lookup time.',
        },
        {
          id: 23,
          question: 'What does JVM stand for?',
          options: ['Java Visual Machine', 'Java Virtual Machine', 'Java Variable Method', 'Java Verified Machine'],
          correct: 1,
          explanation: 'JVM (Java Virtual Machine) executes Java bytecode and enables platform independence.',
        },
      ],
    },
  ],
};

export const challengesByLanguage = {
  html: [
    {
      id: 1,
      title: 'Create a Basic Webpage',
      difficulty: 'Easy',
      description: 'Create a simple HTML page with a heading, a paragraph, and a link.',
      problemStatement: `Create an HTML page that includes:
1. A DOCTYPE declaration
2. An h1 heading with the text "My First Webpage"
3. A paragraph with any text of your choice
4. An anchor link that goes to "https://example.com"`,
      sampleInput: 'N/A',
      sampleOutput: 'A webpage displaying a heading, paragraph, and clickable link.',
      language: 'html',
      starterCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title>My First Webpage</title>\n</head>\n<body>\n    <!-- Write your code here -->\n</body>\n</html>`,
    },
    {
      id: 2,
      title: 'Build a Contact Form',
      difficulty: 'Medium',
      description: 'Create an HTML form with name, email, message fields and a submit button.',
      problemStatement: `Create a contact form that includes:
1. A form element with an action and method
2. Name input field (text type)
3. Email input field (email type)
4. Message textarea
5. A submit button
All fields should have proper labels.`,
      sampleInput: 'N/A',
      sampleOutput: 'A styled contact form with all required fields.',
      language: 'html',
      starterCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title>Contact Form</title>\n</head>\n<body>\n    <h1>Contact Us</h1>\n    <!-- Build your form here -->\n</body>\n</html>`,
    },
  ],
  javascript: [
    {
      id: 3,
      title: 'FizzBuzz',
      difficulty: 'Easy',
      description: 'Print numbers 1 to n. For multiples of 3 print "Fizz", for 5 print "Buzz", and for both print "FizzBuzz".',
      problemStatement: `Write a function fizzBuzz(n) that returns an array of strings from 1 to n:
- For multiples of 3: "Fizz"
- For multiples of 5: "Buzz"
- For multiples of both 3 and 5: "FizzBuzz"
- For other numbers: the number as a string`,
      sampleInput: 'fizzBuzz(15)',
      sampleOutput: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]',
      language: 'javascript',
      starterCode: `function fizzBuzz(n) {\n    // Write your code here\n}`,
    },
    {
      id: 4,
      title: 'Palindrome Checker',
      difficulty: 'Easy',
      description: 'Check if a given string is a palindrome.',
      problemStatement: `Write a function isPalindrome(str) that returns true if the string is a palindrome, false otherwise.
Ignore case and non-alphanumeric characters.`,
      sampleInput: 'isPalindrome("A man, a plan, a canal: Panama")',
      sampleOutput: 'true',
      language: 'javascript',
      starterCode: `function isPalindrome(str) {\n    // Write your code here\n}`,
    },
    {
      id: 5,
      title: 'Array Flatten',
      difficulty: 'Medium',
      description: 'Flatten a nested array to a single level.',
      problemStatement: `Write a function flattenArray(arr) that takes a nested array and returns a flat array.
Example: [[1,2],[3,[4,5]]] → [1,2,3,4,5]`,
      sampleInput: 'flattenArray([[1,2],[3,[4,5]]])',
      sampleOutput: '[1, 2, 3, 4, 5]',
      language: 'javascript',
      starterCode: `function flattenArray(arr) {\n    // Write your code here\n}`,
    },
  ],
  java: [
    {
      id: 6,
      title: 'Hello World',
      difficulty: 'Easy',
      description: 'Write a Java program that prints "Hello, World!" to the console.',
      problemStatement: 'Create a simple Java program that prints "Hello, World!" to standard output.',
      sampleInput: 'N/A',
      sampleOutput: 'Hello, World!',
      language: 'java',
      starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}`,
    },
    {
      id: 7,
      title: 'Reverse a String',
      difficulty: 'Easy',
      description: 'Write a method to reverse a given string.',
      problemStatement: 'Create a method reverseString(String str) that returns the reversed string.',
      sampleInput: 'reverseString("hello")',
      sampleOutput: '"olleh"',
      language: 'java',
      starterCode: `public class Main {\n    public static String reverseString(String str) {\n        // Write your code here\n        return "";\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(reverseString("hello"));\n    }\n}`,
    },
  ],
  css: [
    {
      id: 8,
      title: 'Style a Card Component',
      difficulty: 'Easy',
      description: 'Create a styled card component using CSS.',
      problemStatement: `Style a card component with:
1. White background
2. Rounded corners (8px)
3. Box shadow
4. Padding of 20px
5. Max width of 400px
6. Centered on the page`,
      sampleInput: 'N/A',
      sampleOutput: 'A beautifully styled card component.',
      language: 'css',
      starterCode: `.card {\n    /* Write your CSS here */\n}`,
    },
  ],
};

export const dashboardData = {
  totalLanguages: 4,
  startedLanguages: 2,
  completedTopics: 3,
  totalTopics: 56,
  watchedVideos: 3,
  totalVideos: 20,
  quizzesAttempted: 2,
  totalQuizzes: 5,
  averageScore: 78,
  challengeSubmissions: 5,
  successfulSubmissions: 3,
  totalChallenges: 10,
  recentActivity: [
    { type: 'quiz', title: 'HTML Basics Quiz', score: 80, date: '2024-01-15' },
    { type: 'video', title: 'CSS Crash Course', date: '2024-01-14' },
    { type: 'challenge', title: 'FizzBuzz', status: 'Passed', date: '2024-01-13' },
    { type: 'note', title: 'Introduction to HTML', date: '2024-01-12' },
    { type: 'quiz', title: 'CSS Fundamentals Quiz', score: 75, date: '2024-01-11' },
  ],
  languageProgress: [
    { name: 'HTML', progress: 25 },
    { name: 'CSS', progress: 10 },
    { name: 'JavaScript', progress: 0 },
    { name: 'Java', progress: 0 },
  ],
};
