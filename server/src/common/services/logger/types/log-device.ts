interface LogDevice {
  log: ({ message }: { message: string }) => void
}

export { LogDevice };