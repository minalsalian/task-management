# Contributing to Task Management App

Thank you for considering contributing to this project! Here are some guidelines to help you get started.

## Code of Conduct

Please be respectful and constructive in all interactions.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. Create a new issue with a clear title and description
3. Include steps to reproduce the bug
4. Add screenshots if applicable
5. Mention your environment (OS, Node version, MySQL version)

### Suggesting Features

1. Open an issue with the tag `enhancement`
2. Describe the feature and its benefits
3. Explain how it would work
4. Consider backwards compatibility

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   ```bash
   npm test
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add: brief description of changes"
   ```
   
   Use conventional commits:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for updates to existing features
   - `Docs:` for documentation changes
   - `Refactor:` for code refactoring

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/task-management.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
mysql -u root -p < database/schema.sql

# Start development server
npm run dev
```

## Code Style

- Use 2 spaces for indentation
- Use meaningful variable names
- Keep functions small and focused
- Add comments for complex logic
- Use async/await instead of callbacks

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Aim for good code coverage

```bash
npm test
npm run test:watch  # For development
```

## Project Structure

```
task_management/
├── database/           # Database schema and connection
├── middleware/         # Express middleware (auth, etc.)
├── public/            # Frontend files
├── __tests__/         # Test files
├── server.js          # Main server file
└── README.md          # Documentation
```

## Questions?

Feel free to open an issue with the `question` tag if you need help or clarification.

## License

By contributing, you agree that your contributions will be licensed under the ISC License.
