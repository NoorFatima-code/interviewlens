export type Difficulty = 'beginner' | 'intermediate' | 'expert';

export const INTERVIEW_ROLES = [
  { id: 'web-dev', name: 'Web Developer' },
  { id: 'data-analyst', name: 'Data Analyst' },
  { id: 'product-manager', name: 'Product Manager' }
];

export const DIFFICULTY_LEVELS: { id: Difficulty; name: string; description: string }[] = [
  { id: 'beginner', name: 'Beginner', description: 'Foundational concepts and entry-role basics.' },
  { id: 'intermediate', name: 'Intermediate', description: 'Real-world scenarios and technical depth.' },
  { id: 'expert', name: 'Expert', description: 'Architecture, leadership, and complex problem-solving.' }
];

export const ROLE_QUESTIONS: Record<string, Record<Difficulty, string[]>> = {
  'web-dev': {
    beginner: [
      "What is the difference between let, const, and var?",
      "How does the CSS box model work?",
      "Explain the purpose of Semantic HTML.",
      "What is a Promise in JavaScript?",
      "How do you center a div in CSS?"
    ],
    intermediate: [
      "How do you optimize a website's performance for mobile users?",
      "Explain the difference between SSR and CSR.",
      "How do you handle state management in a large-scale application?",
      "Describe a time you solved a complex cross-browser compatibility issue.",
      "What is your strategy for writing maintainable and scalable CSS?"
    ],
    expert: [
      "Explain the event loop and task queue in deep detail.",
      "How would you architect a micro-frontend solution for a legacy app?",
      "Describe your approach to implementing strict Web Security (CORS, CSP, etc).",
      "How do you lead a team through a major technology migration?",
      "Explain React Fiber or similar internal reconciliation algorithms."
    ]
  },
  'data-analyst': {
    beginner: [
      "What is the difference between a join and a union in SQL?",
      "Explain the concept of a primary key.",
      "How do you handle missing values in a dataset?",
      "What is the purpose of a group-by clause?",
      "Name three types of data visualizations and when to use them."
    ],
    intermediate: [
      "How do you ensure data accuracy when dealing with multiple messy sources?",
      "Explain the difference between correlation and causation with an example.",
      "Describe a complex SQL query you wrote to solve a business problem.",
      "How do you decide which statistical test to apply to a set of data?",
      "How do you handle outliers in your analysis?"
    ],
    expert: [
      "How would you design a data pipeline for real-time analytics?",
      "Explain the bias-variance tradeoff in a predictive model.",
      "How do you communicate highly technical data findings to non-technical executives?",
      "Describe your process for validating the integrity of a company-wide data warehouse.",
      "How do you implement data governance and ethics in your analysis?"
    ]
  },
  'product-manager': {
    beginner: [
      "What is an MVP (Minimum Viable Product)?",
      "How do you define a user story?",
      "What is the difference between a feature and a benefit?",
      "How do you conduct basic user research?",
      "Explain the concept of the Product Lifecycle."
    ],
    intermediate: [
      "How do you prioritize a roadmap when stakeholders have conflicting interests?",
      "Tell me about a time a product launch failed and what you learned.",
      "How do you use A/B testing to drive product decisions?",
      "How do you handle a situation where engineering cannot meet a deadline?",
      "What metrics do you look at to determine if a feature is successful?"
    ],
    expert: [
      "Describe your strategy for pivoting a product in a saturated market.",
      "How do you manage a product portfolio across different business units?",
      "Explain how you balance short-term revenue goals with long-term vision.",
      "How do you lead a cross-functional team through a period of high ambiguity?",
      "What is your framework for evaluating the ROI of an entire product line?"
    ]
  }
};
