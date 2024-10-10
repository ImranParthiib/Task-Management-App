## Task-Management-App
This is a simple Task Management App built using **React**, **Vite**, ***Tailwind CSS**, and **Supabase** as the backend for storing and managing tasks. This app allows users to add, update, delete, and manage tasks efficiently, making task management easier.

### Features

- 📋 **Task Creation**: Add new tasks with details such as name and description.
- ✅ **Mark Tasks Complete**: Update tasks as completed or incomplete.
- 🗑️ **Delete Tasks**: Remove tasks that are no longer needed.
- 🖼️ **Image Upload**: Upload images related to tasks (powered by Supabase).
- 🌐 **Backend**: Use Supabase for storing tasks in the cloud.
- 🎨 **Tailwind CSS**: Modern UI design.

### Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Deployment**: (You can specify Netlify, Vercel, etc., if applicable)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ImranParthiib/Task-Management-App.git
    cd Task-Management-App
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables. Create a `.env` file in the root of the project:
    ```bash
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

### Usage

- Create a task by entering task details and clicking "Add Task."
- Mark tasks as complete or incomplete using the toggle button.
- Delete tasks if they are no longer needed.
- Upload images (if required) while creating tasks.

### Project Structure

```
.
├── public/          # Static assets
├── src/
│   ├── assets/      # Project images and media
│   ├── components/  # Reusable React components
│   ├── pages/       # Application pages
│   ├── App.jsx      # Main App component
│   └── index.jsx    # Entry point
├── .env             # Environment variables
├── .gitignore       # Files to ignore in version control
├── README.md        # Project documentation
└── package.json     # Project metadata and dependencies
```

### Dependencies

- **React**: Frontend framework
- **Vite**: Fast build tool for React
- **Tailwind CSS**: Utility-first CSS framework
- **Supabase**: Backend as a service for database and authentication

### Contributing

1. Fork the repo and create your branch:
    ```bash
    git checkout -b feature/AmazingFeature
    ```

2. Commit your changes:
    ```bash
    git commit -m "Add some AmazingFeature"
    ```

3. Push to the branch:
    ```bash
    git push origin feature/AmazingFeature
    ```

4. Open a pull request.

### License

````markdown
This project is licensed under the MIT License. See the LICENSE file for details.
```
