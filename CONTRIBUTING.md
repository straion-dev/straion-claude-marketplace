# Contributing to Straion Marketplace

Thank you for your interest in contributing!

## Adding a Plugin

1. **Fork this repository**

2. **Add your plugin to `marketplace.json`**:

   ```json
   {
     "name": "your-plugin-name",
     "source": {
       "github": "your-org/your-plugin-repo"
     },
     "description": "Clear description of what your plugin does",
     "version": "1.0.0",
     "author": "Your Name",
     "homepage": "https://github.com/your-org/your-plugin-repo",
     "repository": "https://github.com/your-org/your-plugin-repo",
     "license": "MIT",
     "keywords": ["keyword1", "keyword2"],
     "category": "Development"
   }
   ```

3. **Update README.md** with a section describing your plugin

4. **Test locally**:
   ```bash
   /plugin marketplace add ./straion-marketplace
   /plugin install your-plugin-name@straion-marketplace
   ```

5. **Submit a pull request**

## Plugin Requirements

- Valid `.claude-plugin/plugin.json` manifest
- Clear README with installation and usage instructions
- LICENSE file (MIT or Apache 2.0 recommended)
- Works with latest Claude Code version
- No malicious code or security vulnerabilities

## Plugin Categories

- **Development**: Development tools, linters, formatters
- **Testing**: Testing frameworks, test generators
- **Documentation**: Documentation generators
- **Productivity**: Workflow improvements, automation
- **Integration**: External service integrations
- **AI**: AI-powered tools, specialized skills
- **Security**: Security scanning, vulnerability detection
- **Other**: Doesn't fit other categories

## Review Process

Pull requests will be reviewed for:
- Functionality
- Security
- Quality
- Compatibility with Claude Code
- Completeness of documentation

## Questions?

Open an issue or discussion on GitHub.

---

By contributing, you agree that your contributions will be licensed under the MIT License.
