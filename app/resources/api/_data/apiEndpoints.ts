export interface APIEndpoint {
  id: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  description: string;
  category: string;
  requiresAuth: boolean;
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  requestBody?: {
    contentType: string;
    example: string;
  };
  responseExample?: {
    status: number;
    statusText: string;
    body: string;
  };
  codeExamples?: Array<{
    language: string;
    label: string;
    code: string;
  }>;
}

// API endpoints data
export const apiEndpoints: APIEndpoint[] = [
  {
    id: "auth-login",
    method: "POST",
    path: "/api/v1/auth/login",
    description: "Authenticate user and receive access token",
    category: "Authentication",
    requiresAuth: false,
    requestBody: {
      contentType: "application/json",
      example: `{
  "email": "user@example.com",
  "password": "your_password"
}`,
    },
    responseExample: {
      status: 200,
      statusText: "OK",
      body: `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}`,
    },
    codeExamples: [
      {
        language: "javascript",
        label: "JavaScript",
        code: `const response = await fetch('https://api.karanova.io/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'your_password'
  })
});

const data = await response.json();
console.log(data.access_token);`,
      },
      {
        language: "python",
        label: "Python",
        code: `import requests

response = requests.post(
    'https://api.karanova.io/v1/auth/login',
    json={
        'email': 'user@example.com',
        'password': 'your_password'
    }
)

data = response.json()
print(data['access_token'])`,
      },
      {
        language: "curl",
        label: "cURL",
        code: `curl -X POST https://api.karanova.io/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "your_password"
  }'`,
      },
    ],
  },
  {
    id: "auth-refresh",
    method: "POST",
    path: "/api/v1/auth/refresh",
    description: "Refresh access token using refresh token",
    category: "Authentication",
    requiresAuth: false,
  },
  {
    id: "auth-logout",
    method: "POST",
    path: "/api/v1/auth/logout",
    description: "Invalidate current session",
    category: "Authentication",
    requiresAuth: true,
  },
  {
    id: "users-me",
    method: "GET",
    path: "/api/v1/users/me",
    description: "Get current user profile",
    category: "Users",
    requiresAuth: true,
  },
  {
    id: "users-update",
    method: "PATCH",
    path: "/api/v1/users/me",
    description: "Update current user profile",
    category: "Users",
    requiresAuth: true,
  },
  {
    id: "projects-list",
    method: "GET",
    path: "/api/v1/projects",
    description: "List all projects for current organization",
    category: "Projects",
    requiresAuth: true,
    parameters: [
      {
        name: "page",
        type: "integer",
        required: false,
        description: "Page number for pagination (default: 1)",
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        description: "Number of items per page (default: 20, max: 100)",
      },
      {
        name: "status",
        type: "string",
        required: false,
        description: "Filter by project status (active, completed, archived)",
      },
    ],
    responseExample: {
      status: 200,
      statusText: "OK",
      body: `{
  "data": [
    {
      "id": "proj_123",
      "name": "Website Redesign",
      "description": "Complete redesign of company website",
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-20T14:45:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "total_pages": 3
  }
}`,
    },
    codeExamples: [
      {
        language: "javascript",
        label: "JavaScript",
        code: `const response = await fetch('https://api.karanova.io/v1/projects?page=1&limit=20', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  }
});

const data = await response.json();
console.log(data.data);`,
      },
      {
        language: "python",
        label: "Python",
        code: `import requests

headers = {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
}

response = requests.get(
    'https://api.karanova.io/v1/projects',
    headers=headers,
    params={'page': 1, 'limit': 20}
)

data = response.json()
print(data['data'])`,
      },
    ],
  },
  {
    id: "projects-create",
    method: "POST",
    path: "/api/v1/projects",
    description: "Create a new project",
    category: "Projects",
    requiresAuth: true,
    requestBody: {
      contentType: "application/json",
      example: `{
  "name": "New Project",
  "description": "Project description",
  "status": "active",
  "start_date": "2024-02-01",
  "end_date": "2024-06-30"
}`,
    },
    responseExample: {
      status: 201,
      statusText: "Created",
      body: `{
  "id": "proj_456",
  "name": "New Project",
  "description": "Project description",
  "status": "active",
  "start_date": "2024-02-01",
  "end_date": "2024-06-30",
  "created_at": "2024-01-25T09:15:00Z",
  "updated_at": "2024-01-25T09:15:00Z"
}`,
    },
    codeExamples: [
      {
        language: "javascript",
        label: "JavaScript",
        code: `const response = await fetch('https://api.karanova.io/v1/projects', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'New Project',
    description: 'Project description',
    status: 'active'
  })
});

const data = await response.json();
console.log(data);`,
      },
      {
        language: "python",
        label: "Python",
        code: `import requests

headers = {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json'
}

response = requests.post(
    'https://api.karanova.io/v1/projects',
    headers=headers,
    json={
        'name': 'New Project',
        'description': 'Project description',
        'status': 'active'
    }
)

data = response.json()
print(data)`,
      },
    ],
  },
  {
    id: "projects-get",
    method: "GET",
    path: "/api/v1/projects/:id",
    description: "Get project details by ID",
    category: "Projects",
    requiresAuth: true,
  },
  {
    id: "projects-update",
    method: "PUT",
    path: "/api/v1/projects/:id",
    description: "Update project details",
    category: "Projects",
    requiresAuth: true,
  },
  {
    id: "projects-delete",
    method: "DELETE",
    path: "/api/v1/projects/:id",
    description: "Delete a project",
    category: "Projects",
    requiresAuth: true,
  },
  {
    id: "tasks-list",
    method: "GET",
    path: "/api/v1/projects/:projectId/tasks",
    description: "List all tasks in a project",
    category: "Tasks",
    requiresAuth: true,
  },
  {
    id: "tasks-create",
    method: "POST",
    path: "/api/v1/projects/:projectId/tasks",
    description: "Create a new task",
    category: "Tasks",
    requiresAuth: true,
  },
  {
    id: "tasks-update",
    method: "PATCH",
    path: "/api/v1/tasks/:id",
    description: "Update task details",
    category: "Tasks",
    requiresAuth: true,
  },
  {
    id: "analytics-dashboard",
    method: "GET",
    path: "/api/v1/analytics/dashboard",
    description: "Get dashboard analytics data",
    category: "Analytics",
    requiresAuth: true,
  },
  {
    id: "analytics-reports",
    method: "GET",
    path: "/api/v1/analytics/reports",
    description: "Generate custom analytics reports",
    category: "Analytics",
    requiresAuth: true,
  },
];
