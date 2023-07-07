const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

const execSyncWrapper = (command) => {
  let stdout = null
  try {
    stdout = execSync(command).toString().trim()
  } catch (error) {
    console.error(error)
  }
  return stdout
}

const main = () => {
  // const gitTimestamp000 = execSyncWrapper("git log -1 --format=%ct")
  // const timestampSeconds = parseInt(gitTimestamp000.trim())

  // const date = new Date((timestampSeconds+ 3 * 60 * 60) * 1000)
  // const hours1 = (date.getHours() ).toString().padStart(2, "0")
  // const minutes1 = date.getMinutes().toString().padStart(2, "0")
  // const seconds1 = date.getSeconds().toString().padStart(2, "0")
  
  // const gitTimestamp = `${hours1}:${minutes1}:${seconds1}`
  
  //=======================
  
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const gitTimestampDate1 = new Date((currentTimestamp + 3 * 60 * 60) * 1000)
  
  const hours = gitTimestampDate1.getHours().toString().padStart(2, "0")
  const minutes = gitTimestampDate1.getMinutes().toString().padStart(2, "0")
  const seconds = gitTimestampDate1.getSeconds().toString().padStart(2, "0")
  
  const gitTimestampDate = `${hours}:${minutes}:${seconds}`
  

  const gitBranch = execSyncWrapper("git rev-parse --abbrev-ref HEAD")
  const gitCommitHash = execSyncWrapper("git rev-parse --short=7 HEAD")

  const obj = {
    gitBranch,
    gitCommitHash,
    gitTimestamp,
    gitTimestampDate,
  }

  // const filePath = path.resolve('src', 'generatedGitInfo.json');
  const filePath = path.resolve("src/helpers", "generatedGitInfo.json")

  const fileContents = JSON.stringify(obj, null, 2)

  fs.writeFileSync(filePath, fileContents)
  console.log(`Wrote the following contents to ${filePath}\n${fileContents}`)
}

main()
