const { execSync } = require('child_process');
const readline = require('readline');

const askQuestion = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (a) => {
      rl.close();
      resolve(a);
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
      .filter(Boolean);
    if (tags.length === 0) return null;
    return tags[0].replace(/^v/, '');
  } catch (e) {
    console.error('❌ Error fetching last Git tag:', e.message);
    return null;
  }
};

const createGitTagAndPush = (version, baseBranch) => {
  try {
    const currentBranch = execSync('git rev-parse --abbrev-ref HEAD')
      .toString()
      .trim();

    console.log('🏗️  Building project...');
    execSync('npm run build:lib', { stdio: 'inherit' });

    let stashCreated = false;
    const statusOutput = execSync('git status --porcelain').toString();
    if (statusOutput.trim()) {
      console.log('📦 Stashing changes...');
      const stashOut = execSync('git stash push --include-untracked', {
        stdio: 'pipe',
      }).toString();
      if (!stashOut.includes('No local changes')) stashCreated = true;
    }

    console.log(`🌿 Switching to ${baseBranch} branch...`);
    execSync(`git checkout ${baseBranch}`);
    execSync(`git pull origin ${baseBranch}`);

    if (stashCreated) {
      console.log('📦 Applying stashed changes...');
      execSync('git stash pop');
    }

    const changesToCommit = execSync('git status --porcelain')
      .toString()
      .trim();
    if (changesToCommit) {
      execSync('git add .');
      execSync(`git commit -m "Release v${version}"`);
    } else {
      console.log('ℹ️  No changes to commit - skipping commit');
    }

    console.log(`🏷️  Creating tag v${version}...`);
    execSync(`git tag v${version}`);
    execSync(`git push origin v${version}`);

    console.log(`🔄 Switching back to ${currentBranch}...`);
    execSync(`git checkout ${currentBranch}`);
  } catch (e) {
    console.error('❌ Error:', e.message);
    process.exit(1);
  }
};

const main = async () => {
  const currentVersion = getCurrentVersion();
  const newVersion = await askQuestion(
    `🔢 Enter new version${currentVersion ? ` (current: ${currentVersion})` : ''}: `,
  );

  if (!/^\d+\.\d+\.\d+$/.test(newVersion)) {
    console.error('❌ Use semantic versioning (e.g. 1.0.0)');
    process.exit(1);
  }

  const baseBranch =
    (await askQuestion('🌿 Base branch (develop/master) [develop]: '))
      .trim()
      .toLowerCase() || 'develop';
  if (!['develop', 'master'].includes(baseBranch)) {
    console.error('❌ Only develop or master allowed.');
    process.exit(1);
  }

  createGitTagAndPush(newVersion, baseBranch);
  console.log('🎉 Release process completed successfully!');
};

main();
