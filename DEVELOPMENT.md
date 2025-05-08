# Development Guide

This document provides guidelines and instructions for developing the Vue Notification Center package.

## Prerequisites

- Node.js >= 16.0.0 (Tested with v20.18.3)
- PNPM >= 8.0.0 (Tested with v8.15.4)
- Git

## Dependencies

### Core Dependencies

- Vue.js: ^3.0.0 (peer dependency)
- dayjs: ^1.11.13
- deepmerge: ^4.3.1
- sass: ^1.56.2
- uuid: ^11.1.0

### Development Dependencies

- @rollup/plugin-commonjs: ^25.0.0
- @rollup/plugin-node-resolve: ^15.0.0
- @rollup/plugin-replace: ^6.0.2
- @rollup/plugin-terser: ^0.4.0
- rollup: ^4.0.0
- rollup-plugin-postcss: ^4.0.2
- rollup-plugin-vue: ^6.0.0
- vue: ^3.5.13 (for development)

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/HariantoAtWork/vue-notification-center.git
   cd vue-notification-center
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Build the package:
   ```bash
   pnpm run build
   ```

## Project Structure

```
vue-notification-center/
├── src/                  # Source code
│   ├── components/       # Vue components
│   ├── directives/       # Vue directives
│   ├── helpers/          # Utility functions
│   ├── lib/              # Core library code
│   ├── scss/             # Styles
│   ├── example/          # Example usage
│   ├── index.js          # Main entry point
│   └── notificationCenter.js  # Core notification logic
├── dist/                 # Built files (generated, not committed)
├── rollup.config.js      # Rollup configuration
├── package.json          # Package configuration
└── .npmrc                # NPM configuration
```

## Development Workflow

### Building

The package uses Rollup for building. The build process generates:

- UMD build: `dist/vue-notification-center.umd.js`
- ESM build: `dist/vue-notification-center.esm.js`
- CSS file: `dist/vue-notification-center.css`

To build the package:

```bash
pnpm run build
```

### Testing Locally

To test the package locally in another project:

1. Build the package:

   ```bash
   pnpm run build
   ```

2. Link the package:

   ```bash
   pnpm link --global
   ```

3. In your test project:
   ```bash
   pnpm link --global @harianto/vue-notification-center
   ```

### Publishing

Before publishing:

1. Update the version in `package.json`
2. Build the package:
   ```bash
   pnpm run build
   ```
3. Publish to npm:
   ```bash
   npm publish
   ```
4. Create a Git tag:
   ```bash
   git tag -a v1.0.1 -m "Release v1.0.1 - [Description of changes]"
   git push main v1.0.1
   ```

## Code Style and Best Practices

### Vue Components

- Use Vue 3 Composition API
- Keep components focused and single-responsibility
- Use TypeScript for better type safety (if applicable)

### CSS/SCSS

- Use BEM naming convention
- Keep styles modular and scoped to components
- Use variables for consistent theming

### JavaScript

- Use ES6+ features
- Follow the existing code style
- Add comments for complex logic

## Contributing

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Build and test your changes
5. Commit your changes:
   ```bash
   git commit -m "feat: description of your changes"
   ```
6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Create a Pull Request

## Versioning

This project follows [Semantic Versioning](https://semver.org/):

- Major version (1.x.x): Breaking changes
- Minor version (x.1.x): New features, backward compatible
- Patch version (x.x.1): Bug fixes, backward compatible

### Version Update Workflow

#### Patch Version (x.x.1)

For bug fixes and minor improvements that don't add new features:

1. Make your changes and commit them:

   ```bash
   git commit -m "fix: description of the bug fix"
   ```

2. Update the version in package.json:

   ```bash
   pnpm version patch
   ```

   This will automatically increment the patch version (e.g., 1.0.0 → 1.0.1)

3. Build the package:

   ```bash
   pnpm run build
   ```

4. Publish to npm:

   ```bash
   npm publish
   ```

5. Create and push a Git tag:
   ```bash
   git tag -a v1.0.1 -m "Release v1.0.1 - Bug fixes and improvements"
   git push main v1.0.1
   ```

#### Minor Version (x.1.x)

For new features that are backward compatible:

1. Make your changes and commit them:

   ```bash
   git commit -m "feat: description of the new feature"
   ```

2. Update the version in package.json:

   ```bash
   pnpm version minor
   ```

   This will automatically increment the minor version (e.g., 1.0.1 → 1.1.0)

3. Build the package:

   ```bash
   pnpm run build
   ```

4. Publish to npm:

   ```bash
   npm publish
   ```

5. Create and push a Git tag:
   ```bash
   git tag -a v1.1.0 -m "Release v1.1.0 - New features added"
   git push main v1.1.0
   ```

#### Major Version (1.x.x)

For breaking changes that are not backward compatible:

1. Make your changes and commit them:

   ```bash
   git commit -m "feat!: description of the breaking change"
   ```

2. Update the version in package.json:

   ```bash
   pnpm version major
   ```

   This will automatically increment the major version (e.g., 1.1.0 → 2.0.0)

3. Build the package:

   ```bash
   pnpm run build
   ```

4. Publish to npm:

   ```bash
   npm publish
   ```

5. Create and push a Git tag:
   ```bash
   git tag -a v2.0.0 -m "Release v2.0.0 - Breaking changes"
   git push main v2.0.0
   ```

### Pre-release Versions

For testing before a full release:

1. Create a pre-release version:

   ```bash
   pnpm version prerelease --preid=beta
   ```

   This will create a version like 1.0.0-beta.0

2. Build and publish:

   ```bash
   pnpm run build
   npm publish --tag beta
   ```

3. Create and push a Git tag:
   ```bash
   git tag -a v1.0.0-beta.0 -m "Release v1.0.0-beta.0 - Beta release"
   git push main v1.0.0-beta.0
   ```

### Version Management Tips

- Always update the CHANGELOG.md file with your changes
- Use conventional commit messages (feat:, fix:, etc.)
- Consider using a tool like `standard-version` to automate the versioning process
- Test your package thoroughly before publishing
- Consider using a CI/CD pipeline to automate the build and publish process

## Troubleshooting

### Common Issues

1. **Build fails**

   - Check for syntax errors
   - Ensure all dependencies are installed
   - Check Rollup configuration

2. **Package not working in test project**
   - Ensure the package is built
   - Check if the package is properly linked
   - Verify Vue version compatibility

## Additional Resources

- [Vue 3 Documentation](https://v3.vuejs.org/)
- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Rollup Documentation](https://rollupjs.org/guide/en/)
- [PNPM Documentation](https://pnpm.io/)
