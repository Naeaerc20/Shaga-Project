const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { playSpin } = require('./scripts/apis');
const figlet = require('figlet');
const clear = require('console-clear');

const USERS_FILE = path.join(__dirname, 'usersInfo.json');
const INTERVAL_MS = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    console.error('❌ usersInfo.json not found.');
    process.exit(1);
  }
  const data = fs.readFileSync(USERS_FILE, 'utf8');
  return JSON.parse(data);
}

async function runSpinForAllUsers() {
  console.log('🔄 Starting spin process for all users...\n'); // Added a new line after the message

  const users = loadUsers();

  for (const user of users) {
    try {
      await new Promise(res => setTimeout(res, 500)); // 500ms delay before each request
      const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
      const result = await playSpin(user.user_id, user.token_bearer, userAgent);

      const pointsWon = result?.user?.spinPoints ?? 0;
      console.log(`🎉 User ${user.id} won ${pointsWon} GLOB Points!`);
    } catch (err) {
      console.error(`❌ Error with user ${user.id}: ${err.message}`);
    }
  }

  console.log('✅ Done processing spins for all users.');
}

function printBanner() {
  return new Promise((resolve, reject) => {
    figlet.text('SHAGA AUTO-SPIN', (err, data) => {
      if (err) return reject(err);
      console.log('\x1b[32m%s\x1b[0m', data); // Print in green

      console.log('👑 Script created by Naeaex');
      console.log('📱 Follow on X and GitHub for more codes.');
      console.log('🔗 www.x.com/naeaexeth - www.github.com/Naeaerc20\n');

      resolve();
    });
  });
}

function askUser() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("🤖 Do you wish to run the code constantly every 6 hours? (y/n)");
  rl.question("> ", async (answer) => {
    rl.close();

    clear();
    await printBanner();

    if (answer.toLowerCase() === 'y') {
      console.log("⏳ Will run now and then every 6 hours!");
      runSpinForAllUsers();
      setInterval(runSpinForAllUsers, INTERVAL_MS);
    } else {
      console.log("⚡ Running only once...");
      runSpinForAllUsers();
    }
  });
}

askUser();
