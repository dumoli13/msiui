const { execSync } = require('child_process');
const readline = require('readline');

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

const getCurrentVersion = () => {
  try {
    execSync('git fetch --tags', { stdio: 'ignore' });
    const tags = execSync('git tag --sort=-v:refname')
      .toString()
      .trim()
      .split('\n')
      .filter((tag) => tag);

    if (tags.length === 0) return null;
    return tags[0].replace(/^v/, '');
  } catch (error) {
    console.error('❌ Error fetching last Git tag:', error.message);
    return null;
  }
};

const createGitTagAndPush = (version, baseBranch) => {
  try {
    const currentBranch = execSync('git rev-parse --abbrev-ref HEAD')
      .toString()
      .trim();

    console.log('🏗️  Building project...');
    execSync('yarn build', { stdio: 'inherit' });

    let stashCreated = false;
    console.log('📦 Checking for local changes...');
    try {
      const statusOutput = execSync('git status --porcelain').toString();
      if (statusOutput.trim()) {
        console.log('📦 Stashing changes...');
        const stashOutput = execSync('git stash push --include-untracked', {
          stdio: 'pipe',
        }).toString();
        if (!stashOutput.includes('No local changes')) {
          stashCreated = true;
        }
      }
    } catch (error) {
      console.error('❌ Error during stash operation:', error.message);
      process.exit(1);
    }

    console.log(`🌿 Switching to ${baseBranch} branch...`);
    execSync(`git checkout ${baseBranch}`);
    execSync(`git pull origin ${baseBranch}`);

    // const releaseBranch = `release/v${version}`;
    // console.log(`🌿 Creating release branch ${releaseBranch}...`);
    // execSync(`git checkout -b ${releaseBranch}`);

    if (stashCreated) {
      console.log('📦 Applying stashed changes...');
      execSync('git stash pop');
    } else {
      console.log('📦 No stashed changes to apply');
    }

    console.log('📌 Checking for changes to commit...');
    const changesToCommit = execSync('git status --porcelain')
      .toString()
      .trim();

    if (changesToCommit) {
      console.log('📌 Staging files...');
      execSync('git add .');

      console.log('📜 Committing changes...');
      execSync(`git commit -m "Release v${version}"`);
    } else {
      console.log('ℹ️ No changes to commit - skipping commit');
    }

    console.log(`🏷️ Creating tag v${version}...`);
    execSync(`git tag v${version}`);

    // console.log('🚀 Pushing tag and branch...');
    execSync(`git push origin v${version}`);
    // execSync(`git push origin ${releaseBranch}`);

    console.log(`🔄 Switching back to ${currentBranch}...`);
    execSync(`git checkout ${currentBranch}`);

    // console.log(
    //   `✅ Successfully created and pushed tag v${version} and branch ${releaseBranch}`,
    // );
  } catch (error) {
    console.error(
      '❌ Error creating Git tag or pushing changes:',
      error.message,
    );
    process.exit(1);
  }
};

const main = async () => {
  try {
    const currentVersion = getCurrentVersion();
    let question = '🔢 Enter the new version (no previous release found): ';

    if (currentVersion) {
      question = `🔢 Enter the new version (current version: ${currentVersion}): `;
    }

    const newVersion = await askQuestion(question);

    if (!/^\d+\.\d+\.\d+$/.test(newVersion)) {
      console.error(
        '❌ Invalid version format. Use semantic versioning (e.g., 1.0.0)',
      );
      process.exit(1);
    }

    const branchQuestion = '🌿 Choose base branch (develop/main) [develop]: ';
    const baseBranch = await askQuestion(branchQuestion);

    const normalizedBranch = baseBranch.trim().toLowerCase();
    if (normalizedBranch === '') {
      // Default to develop if empty input
      createGitTagAndPush(newVersion, 'develop');
    } else if (normalizedBranch === 'develop' || normalizedBranch === 'main') {
      createGitTagAndPush(newVersion, normalizedBranch);
    } else {
      console.error('❌ Invalid branch. Only develop or main are allowed.');
      process.exit(1);
    }

    console.log('🎉 Release process completed successfully!');
  } catch (error) {
    console.error('❌ Error during release process:', error.message);
    process.exit(1);
  }
};

main();
