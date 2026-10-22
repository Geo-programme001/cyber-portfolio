
import { motion } from 'motion/react'
import './App.css'
import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import type { FormEvent } from 'react'

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
  const [history, setHistory] = useState<
    { command: string; output: string }[]
  >([])
  const [currentView, setCurrentView] = useState<'home' | 'skills'>('home')
  const [isSending, setIsSending] = useState(false)
  const [contactStatus, setContactStatus] = useState('')


  const submitCommand = () => {
    const submittedCommand = command.trim()

    if (!submittedCommand) return

    let output: string

    switch (submittedCommand.toLowerCase()) {
      case 'help':
        output = 'Commands: help, whoami, about, skills, projects, mission, ls, date, clear'
        break
      case 'whoami':
        output = 'Geoffrey — developer in training and aspiring security professional.'
        break
      case 'about':
        output = 'Mathematics and Computer Science student exploring software development and cybersecurity.'
        break
      
      case 'skills':
      setCurrentView('skills')
      output = 'Opening skills interface...'
      break

      case 'back':
      setCurrentView('home')
      output = 'Returning to homepage...'
      break

      case 'projects':
        output = 'Featured project: AI-powered network intrusion detection system. More projects coming soon.'
        break
      case 'mission':
        output = 'Build skills. Create value. Secure systems.'
        break
      case 'ls':
        output = 'about.txt  skills.txt  projects/  mission.txt'
        break
      case 'date':
        output = new Date().toLocaleDateString()
        break
      case 'clear':
        setHistory([])
        setCommand('')
        return
      default:
        output = `Command not found: ${submittedCommand}. Type "help" for commands.`
    }

    setHistory((previousHistory) => [
      ...previousHistory,
      { command: submittedCommand, output },
    ])
    setCommand('')
  }

  const sendContactMessage = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    setIsSending(true)
    setContactStatus('')

    const form = event.currentTarget

    try {
      await emailjs.sendForm(
        'service_cbvw1pa',
        'template_xke26ee',
        form,
        {
          publicKey: 'bQAo3nvbEZuqx5yad',
        }
      )

      setContactStatus('Message sent successfully! I will get back to you soon.')
      form.reset()
    } catch (error) {
      console.error('EmailJS error:', error)
      setContactStatus('Message could not be sent. Please try again or email me directly.')
    } finally {
      setIsSending(false)
    }
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
            LET'S TALK
          </a>
        </nav>
      

      
<section
  className={`hero-section ${currentView === 'skills' ? 'hero-section--skills' : ''}`}
  id="home"
>

        {currentView === 'home' && (
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 100 }}
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
        )}

        {currentView === 'skills' && (
          <motion.div
            className="skills-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="eyebrow">
              <span className="accent">//</span> 02 / CAPABILITIES
            </p>

            <h1>
              TECHNICAL
              <br />
              <span className="accent">ARSENAL.</span>
            </h1>

            <p className="skills-view-description">
              Practical skills built through hands-on projects,
              Linux practice, networking, and authorized security labs.
            </p>

            <div className="skills-panels">
              <div className="skill-panel">
                <h3>01 — SECURITY TOOLS</h3>
                <div className="skill-icons">
                  <div className="skill-tile">Nmap</div>
                  <div className="skill-tile">Wireshark</div>
                  <div className="skill-tile">Metasploit</div>
                  <div className="skill-tile">Burp Suite</div>
                </div>
              </div>

              <div className="skill-panel">
                <h3>02 — PROGRAMMING</h3>
                <div className="skill-icons">
                  <div className="skill-tile">Python</div>
                  <div className="skill-tile">JavaScript</div>
                  <div className="skill-tile">C/C++</div>
                </div>
              </div>

              <div className="skill-panel">
                <h3>03 — SYSTEMS & WEB</h3>
                <div className="skill-icons">
                  <div className="skill-tile">Linux</div>
                  <div className="skill-tile">TCP/IP</div>
                  <div className="skill-tile">React</div>
                  <div className="skill-tile">Django</div>
                  <div className="skill-tile">HTML / CSS</div>
                </div>
              </div>
            </div>

            <p className="skills-view-hint">
              <span className="accent">$</span> type <strong>back</strong> in the terminal to return home
            </p>
          </motion.div>
        )}

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

<section className="contact-section" id="contact">
  <div className="contact-layout">
    {/* LEFT COLUMN */}
    <div className="contact-left">
      <div className="contact-heading">
        <p className="eyebrow">
          <span className="accent">//</span> 03 / GET IN TOUCH
        </p>

        <h2>
          LET'S BUILD
          <br />
          SOMETHING <span className="accent">SECURE.</span>
        </h2>

        <p className="contact-intro">
          Have a project, an opportunity, or an idea worth exploring?
          I'd love to hear from you.
        </p>
      </div>

      <div className="contact-details">
        <p className="contact-label">DIRECT CHANNELS</p>

        <a
          className="contact-link"
          href="mailto:geoffreykithuka76@gmail.com"
        >
          <span>Email</span>
          <span>geoffreykithuka76@gmail.com ↗</span>
        </a>

        <a
          className="contact-link"
          href="https://github.com/Geo-programme001"
          target="_blank"
          rel="noreferrer"
        >
          <span>GitHub</span>
          <span>Explore my work ↗</span>
        </a>

        <a
          className="contact-link"
          href="https://www.linkedin.com/in/geoffrey-wambua-723225394/"
          target="_blank"
          rel="noreferrer"
        >
          <span>LinkedIn</span>
          <span>Let's connect ↗</span>
        </a>
        
<a
  className="contact-link"
  href="https://wa.me/+254758317686"
  target="_blank"
  rel="noreferrer"
>
  <span>WhatsApp</span>
  <span>Let's chat ↗</span>
</a>


        <div className="contact-status">
          <span className="status-dot" />
          OPEN TO OPPORTUNITIES & COLLABORATION
        </div>
      </div>
    </div>

    {/* RIGHT COLUMN */}
    <form className="contact-form" onSubmit={sendContactMessage}>
      <p className="contact-label">SEND A MESSAGE</p>

      <label htmlFor="contact-name">YOUR NAME</label>
      <input
        id="contact-name"
        name="name"
        type="text"
        placeholder="How should I address you?"
        required
      />

      <label htmlFor="contact-email">YOUR EMAIL</label>
      <input
        id="contact-email"
        name="email"
        type="email"
        placeholder="you@example.com"
        required
      />

      <label htmlFor="contact-subject">SUBJECT</label>
      <input
        id="contact-subject"
        name="subject"
        type="text"
        placeholder="Project, opportunity, collaboration..."
        required
      />

      <label htmlFor="contact-message">MESSAGE</label>
      <textarea
        id="contact-message"
        name="message"
        rows={5}
        placeholder="Tell me what you're thinking..."
        required
      />

      <button
        className="button button-primary"
        type="submit"
        disabled={isSending}
      >
        {isSending ? 'SENDING...' : 'SEND MESSAGE'}
        {!isSending && <span aria-hidden="true">↗</span>}
      </button>

      {contactStatus && (
        <p
          className="contact-form-note"
          role="status"
          aria-live="polite"
        >
          {contactStatus}
        </p>
      )}
    </form>
  </div>
</section>


<section className="about-section" id="about">
  <div className="about-heading">
    <p className="eyebrow">
      <span className="accent">//</span> 01 / ABOUT ME
    </p>
    <h2>
      THE PERSON
      <br />
      BEHIND THE <span className="accent">CODE.</span>
    </h2>
  </div>

  <div className="about-layout">
    <div className="about-photo-wrap">
      <img
        className="about-photo"
        src="/images/geoffrey.jpg"
        alt="Geoffrey, creator of 3LLIER"
      />
      <div className="about-photo-caption">
        <span className="status-dot" />
        BUILDING MY NEXT CHAPTER
      </div>
    </div>

    <div className="about-content">
      <p className="about-kicker">MATHEMATICS · COMPUTER SCIENCE · SECURITY</p>

      <h3>
        Curious by nature.
        <br />
        <span className="accent">Driven to understand.</span>
      </h3>

      <p>
        I'm Geoffrey, a Mathematics and Computer Science student
        interested in how software works, how systems communicate,
        and how digital experiences can be made more secure.
      </p>

      <p>
        I'm building practical experience through software projects,
        Linux, networking, and hands-on cybersecurity labs, with the
        goal of growing into a penetration tester.
      </p>

      <p>
        3LLIER is where I document that journey: building useful
        things, breaking down complex problems, and learning to
        create more secure systems.
      </p>

      <div className="about-principles">
        <span><span className="accent">01.</span> BUILD</span>
        <span><span className="accent">02.</span> TEST</span>
        <span><span className="accent">03.</span> SECURE</span>
      </div>

      <a className="button button-primary" href="#contact">
        LET'S CONNECT <span aria-hidden="true">↗</span>
      </a>
    </div>
  </div>
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
