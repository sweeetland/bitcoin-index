import { exec } from 'child_process'

const logData = (data: any) => console.log(data)

const startServer = () => {
  try {
    const starter = exec('ts-node ../index.ts', { cwd: __dirname })
    starter.stdout.on('data', logData)
    starter.stderr.on('data', logData)
  } catch (error) {
    console.error(error)
  }
}

export { startServer as default }
