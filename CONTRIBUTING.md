# How to contribute to Wired OS?

First of all, I'm really happy to see you dedicating your time to this project. I genuinely appreciate your interest in contributing!

There are multiple ways to contribute to Wired OS, and you don't necessarily need to write code to make a difference.

## Navigate through the sections

- [With Issues](#with-issues)
  - [What if I wait for someone to solve the Issue I created?](#what-if-i-wait-for-someone-to-solve-the-issue-i-created)
  - [What if I want to solve an Issue I created or an Issue from someone else?](#what-if-i-want-to-solve-an-issue-i-created-or-an-issue-from-someone-else)
    - [Getting started with development](#getting-started-with-development)
- [With Pull Requests (PRs)](#with-pull-requests-prs)
  - [Linking Pull Requests to Issues](#linking-pull-requests-to-issues)
  - [Creating a Pull Request](#creating-a-pull-request)
  - [What happens after submitting a Pull Request?](#what-happens-after-submitting-a-pull-request)
- [Commit Guidelines](#commit-guidelines)
- [AI-Generated Code](#ai-generated-code)
- [Code Review](#code-review)

## With Issues

Create Issues in the repository to report bugs, suggest new features, or discuss potential improvements. After creating an Issue, you can either wait for someone else to work on it or take responsibility for implementing the proposed changes yourself.

**Remember:** You are responsible for managing the Issues you create. Make sure their descriptions are clear, provide all the necessary information, and keep them updated whenever new information becomes available.

### What if I wait for someone to solve the Issue I created?

If you decide to wait, someone might comment on your Issue requesting to be assigned to it. You can then decide whether you want to let them work on it. If nobody expresses interest in working on your Issue, the maintainers may review it and decide whether to address it themselves..

Once the assigned contributor believes they've successfully addressed your Issue, they'll open a Pull Request (PR) describing their changes.

As the person who originally created the Issue, you're encouraged to participate in reviewing the PR. Make sure to test the proposed changes locally, verify whether they actually solve the reported problem or implement the suggested feature, and leave comments whenever adjustments are necessary.

Once you're satisfied with the implementation, you can approve the PR if you have the appropriate repository permissions. Otherwise, communicate your approval to the maintainers so they can proceed with the review and merge process.

### What if I want to solve an Issue I created or an Issue from someone else?

**For your own Issues:**

If you want to work on an Issue you've created, make sure to assign it to yourself first. This lets other contributors know that you're already working on it and helps prevent multiple people from unknowingly working on the same task.

**For Issues created by other people:**

If you find an Issue you'd like to work on, leave a comment expressing your interest and request to be assigned to it. Wait for confirmation before starting substantial work, so you don't end up duplicating someone else's efforts.

#### Getting started with development

Once you've been assigned to an Issue, follow these steps:

1. **Fork the repository:** Create a fork of Wired OS under your GitHub profile.
2. **Clone your fork:** Download your fork to your local machine using Git.
3. **Install dependencies:** Follow the instructions provided in the README to set up the development environment.
4. **Work on your changes:** Implement the necessary modifications while following the project's coding standards.
5. **Test your changes:** Make sure everything works as expected before submitting your contribution.

If you encounter any difficulties, feel free to contact the maintainers or leave a comment on the Issue requesting assistance. Someone will be happy to help you.

Once you've finished implementing your changes, create a Pull Request targeting the original Wired OS repository, not your own fork.

The maintainers will review your code, test the proposed changes, and decide whether to approve the PR, request modifications, or close it. They may also provide suggestions to help improve your implementation.

## With Pull Requests (PRs)

**Note:** Creating Pull Requests requires coding knowledge. If you don't intend to contribute code and only want to report bugs, suggest new features, or discuss potential improvements, feel free to skip this section.

### Linking Pull Requests to Issues

Significant changes, new features, and major implementations must have an associated Issue before development begins. Small changes, such as minor documentation fixes, may be submitted without one.

If you or someone else has created an Issue related to your changes, make sure to reference it in your PR description using GitHub's closing keywords.

For example:

```text
Closes #XX
```

Replace `XX` with the corresponding Issue number.

This allows GitHub to automatically close the associated Issue when the PR is merged.

**Exceptions:** Small changes, such as minor documentation fixes or straightforward corrections, don't necessarily require an Issue. However, larger implementations and significant changes must have an associated Issue before development begins.

### Creating a Pull Request

For each PR, follow these steps:

1. **Fork the repository:** Create a fork of Wired OS under your GitHub profile.
2. **Clone your fork:** Download your fork to your local machine using Git.
3. **Install dependencies:** Follow the instructions provided in the README to set up the development environment.
4. **Implement your changes:** Make the necessary modifications while following the project's coding standards.
5. **Test your changes:** Make sure everything works as expected before submitting your contribution.
6. **Open a Pull Request:** Submit your changes to the original Wired OS repository, providing a clear description of what you've implemented and referencing the related Issue, if applicable.

### What happens after submitting a Pull Request?

Once your PR has been submitted, the maintainers will review your code, verify whether it addresses the requirements described in the associated Issue, and decide whether to approve it, request modifications, or close it.

Don't hesitate to ask for help if you encounter difficulties. Maintainers can provide feedback, explain implementation details, and suggest improvements to help you make your contribution better.

## Commit Guidelines

Create a separate commit for each logical change whenever possible. Avoid combining unrelated modifications into a single commit, as this makes the project's history easier to understand, review, and maintain.

Wired OS follows the Conventional Commits specification, which uses the following structure:

```text
<type>(<scope>): <description>
```

The scope is optional, but recommended whenever it helps identify the affected part of the project.

Here are some commonly used commit types:

| Type | Purpose |
|:---:|---|
| `feat` | Introduces a new feature. |
| `fix` | Fixes a bug. |
| `refactor` | Changes the internal implementation without altering its external behavior. |
| `style` | Applies formatting changes that don't affect the code's behavior. |
| `chore` | Handles maintenance tasks. |
| `docs` | Updates project documentation. |
| `perf` | Improves application performance. |
| `build` | Changes the build system or external dependencies. |

For more information, check the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/).

## AI-Generated Code

AI-powered development tools are allowed when contributing to Wired OS. However, their usage comes with certain responsibilities:

- AI-generated code must be reviewed and validated by the contributor before submission.
- Contributors must understand the code they submit and be able to explain their implementation.
- Contributors are responsible for the correctness, security, and maintainability of their submissions, regardless of whether AI tools were used.
- Submitting unreviewed or unverified AI-generated code is not acceptable.

Using AI tools is not discouraged, but blindly relying on generated output without understanding or validating it does not meet the project's contribution standards.

## Code Review

All Pull Requests (PRs) are reviewed by the maintainers. During the review process, the following aspects are considered:

- **Functionality:** Does the implementation work as expected?
- **Code Quality:** Is the code organized, readable, and maintainable?
- **Architecture:** Does the implementation follow the project's existing architecture and design principles?
- **Testing:** Have the necessary tests been implemented and executed?
- **Performance:** Does the change introduce any unnecessary performance overhead?
- **Security:** Does the implementation introduce any potential security vulnerabilities?
- **Scope:** Does the PR remain focused on its intended objective?

Maintainers may request additional changes, explanations, or tests before approving a PR.

---

[Back to top](#how-to-contribute-to-wired-os)
