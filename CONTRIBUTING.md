# Contributing to QuickCV

Thank you for considering contributing to QuickCV! We appreciate your time and effort.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue on GitHub with:
- A clear and descriptive title
- Steps to reproduce the problem
- Expected vs actual behavior
- Screenshots (if applicable)
- Your environment (OS, browser, Node version)

### Suggesting Features

We welcome feature suggestions! Please:
- Check if the feature has already been requested
- Open an issue with the `enhancement` label
- Clearly describe the feature and its benefits
- Provide examples or mockups if possible

### Pull Requests

1. **Fork the repository** and create your branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Write clear, concise commit messages
   - Keep changes focused on a single feature/fix

3. **Test your changes**
   ```bash
   npm run dev
   npm run build
   ```

4. **Submit a Pull Request**
   - Provide a clear description of the changes
   - Reference any related issues
   - Ensure the PR passes all checks

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/QuickCV.git
cd QuickCV

# Install dependencies
npm install

# Start dev server
npm run dev
```

## Code Style

- Use functional components with hooks
- Follow the existing file structure
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

## Project Structure

```
src/
├── components/
│   ├── Editor/       # Form components
│   ├── Preview/      # Resume preview & templates
│   └── UI/           # Reusable UI components
├── App.jsx           # Main application component
└── main.jsx          # Entry point
```

## Questions?

Feel free to open an issue for any questions or discussions!

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect differing opinions and experiences

Thank you for contributing! 🎉
