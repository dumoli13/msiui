#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Helper function to ask the user for input
const askQuestion = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

// Helper function to update package.json version
const updatePackageJsonVersion = (version) => {
  const packageJsonPath = path.join(__dirname, '../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.version = version;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log(`Updated package.json version to ${version}`);
};

// Helper function to create a Git tag and push it
const createGitTagAndPush = (version) => {
  try {
    // Stash any uncommitted changes
    execSync('git stash push -u');

    // Create a new branch for the release
    const releaseBranch = `release/v${version}`;
    execSync(`git checkout --orphan ${releaseBranch}`);

    // Add only the dist directory and required files
    execSync('git add dist package.json'); // Add other required files if needed

    // Commit changes
    execSync(`git commit -m "Release v${version}"`);

    // Create a new Git tag
    execSync(`git tag v${version}`);

    // Push the tag to the remote repository
    execSync(`git push origin v${version}`);

    // Switch back to the original branch (e.g., master or develop)
    execSync('git checkout -'); // Switch back to the previous branch

    // Delete the temporary release branch
    execSync(`git branch -D ${releaseBranch}`);

    // Reapply stashed changes
    execSync('git stash pop');

    console.log(`Successfully created and pushed tag v${version}`);
  } catch (error) {
    console.error('Error creating Git tag or pushing changes:', error.message);
    process.exit(1);
  }
};

// Main function
const main = async () => {
  try {
    // Ask the user for the new version
    const newVersion = await askQuestion(
      'Enter the new version (e.g., 1.0.0): ',
    );

    // Validate the version format (simple check)
    if (!/^\d+\.\d+\.\d+$/.test(newVersion)) {
      console.error(
        'Invalid version format. Please use semantic versioning (e.g., 1.0.0).',
      );
      process.exit(1);
    }

    // Update package.json version
    updatePackageJsonVersion(newVersion);

    // Create Git tag and push changes
    createGitTagAndPush(newVersion);

    console.log('Export process completed successfully!');
  } catch (error) {
    console.error('Error during export process:', error.message);
    process.exit(1);
  }
};

// Run the script
main();
