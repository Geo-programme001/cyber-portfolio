
import { motion } from 'motion/react'
import './App.css'
import { useEffect, useState } from 'react'

const terminalLines = [
  '> initializing cyber_lab...',
  '> loading security modules...',
  '> status: learning. building. securing.',
  '> system ready_',
]


function TypingLine({
  text,
  delay = 35,
  startDelay = 0,
}: {
  text: string
  delay?: number
  startDelay?: number
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true)
    }, startDelay)

    return () => clearTimeout(startTimeout)
  }, [startDelay])

  useEffect(() => {
    if (!started) return

    let index = 0
    let timeoutId: ReturnType<typeof setTimeout>

    const typeNextCharacter = () => {
      index += 1
      setDisplayedText(text.slice(0, index))

      if (index < text.length) {
        timeoutId = setTimeout(typeNextCharacter, delay)
      }
    }

    timeoutId = setTimeout(typeNextCharacter, delay)

    return () => clearTimeout(timeoutId)
  }, [started, text, delay])

  return (
    <p className="terminal-line">
      {displayedText}
      {started && displayedText.length < text.length && (
        <span className="cursor">▋</span>
      )}
    </p>
  )
}


function App() {
  const [command, setCommand] = useState('')
  const [history, setHistory] = useState<{ command: string; output: string }[]>([])

  const submitCommand = () => {
    const submittedCommand = command.trim()

    if (!submittedCommand) return

    let output: string

    switch (submittedCommand.toLowerCase()) {
      case 'whoami':
        output = 'developer_in_training'
        break
      case 'mission':
        output = 'build skills. create value. secure systems.'
        break
      case 'help':
        output = 'Available commands: whoami, mission, help'
        break
      default:
        output = `Command not found: ${submittedCommand}`
    }

    setHistory((previousHistory) => [
      ...previousHistory,
      { command: submittedCommand, output },
    ])
    setCommand('')
  }

  return (
    <main className="site-shell">
      <nav className="navbar">
        <a className="brand" href="#home">
          <span className="brand-mark">[G]</span>
          <span>GEOFFREY<span className="accent">.DEV</span></span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        <a className="availability" href="#contact">
          <span className="status-dot" />
          AVAILABLE FOR WORK
        </a>
      </nav>

      <section className="hero-section" id="home">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">
            <span className="accent">//</span> DEVELOPER & ASPIRING SECURITY PROFESSIONAL
          </p>

          <h1>
            I BUILD
            <br />
            <span className="outlined-text">DIGITAL</span>
            <br />
            <span className="accent">EXPERIENCES.</span>
          </h1>

          <p className="hero-description">
            Mathematics and Computer Science student exploring the intersection
            of software development and cybersecurity. Building useful things
            while learning how to secure them.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              EXPLORE MY WORK <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-secondary" href="#contact">
              CONTACT ME
            </a>
          </div>

          <div className="hero-meta">
            <span><span className="accent">01.</span> BUILD</span>
            <span><span className="accent">02.</span> TEST</span>
            <span><span className="accent">03.</span> SECURE</span>
          </div>
        </motion.div>

        <motion.aside
          className="terminal"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          aria-label="Decorative terminal showing portfolio status"
        >
          <div className="terminal-header">
            <div className="terminal-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span>geoffrey@cyber-lab:~</span>
            <span className="terminal-lock">SECURE SHELL</span>
          </div>

          <div className="terminal-body">
            <p className="terminal-muted">PORTFOLIO_TERMINAL v1.0.0</p>

             {terminalLines.map((line, index) => (
  <TypingLine
    key={line}
    text={line}
    delay={28}
    startDelay={800 + index * 1800}
  />
))}

            <div className="terminal-divider" />

            {history.map((entry, index) => (
              <div className="terminal-history" key={`${entry.command}-${index}`}>
                <p className="terminal-prompt">
                  <span className="accent">user@portfolio</span>:~$ {entry.command}
                </p>
                <p className="terminal-output">{entry.output}</p>
              </div>
            ))}

            <p className="terminal-prompt">
              <label className="accent" htmlFor="terminal-command">
                user@portfolio
              </label>
              :~$
              <input
                id="terminal-command"
                type="text"
                aria-label="Enter a terminal command"
                autoComplete="off"
                spellCheck={false}
                value={command}
                style={{ width: `${Math.max(command.length, 1)}ch` }}
                onChange={(event) => setCommand(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') submitCommand()
                }}
              />
              <span className="terminal-cursor-block" aria-hidden="true" />
            </p>

          </div>

          <div className="terminal-footer">
            <span><span className="status-dot" /> SYSTEM OPERATIONAL</span>
            <span>KENYA · EAT</span>
          </div>
        </motion.aside>

        <div className="hero-index" aria-hidden="true">PORTFOLIO / 001</div>
      </section>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} 3llier
        </span>
        <span>DESIGNED TO BUILD. BUILT TO LEARN.</span>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </main>
  )

}

export default App
