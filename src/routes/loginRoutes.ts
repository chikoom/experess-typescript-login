import { Router, Response, Request, NextFunction } from 'express'
const router = Router()

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session && req.session.loggedIn) {
    next()
    return
  } else {
    res
      .status(403)
      .send(`You must be <a href='/login'>Logged In</a> to watch this page`)
  }
}

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div> You are loggen in! </div>
        <a href='/logout'>Logout</a>
      </div>
    `)
  } else {
    res.send(`
    <div> Please <a href='/login'>Login</a> </div>
    `)
  }
})

router.get('/logout', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    req.session = null
  }
  res.redirect('/')
})

router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input type="text" name="email" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" />
      </div>
      <button>SUBMIT</button>
    </form>
  `)
})

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body
  if (
    email &&
    password &&
    email === 'email@email.com' &&
    password === 'password'
  ) {
    req.session = { loggedIn: true }
    res.redirect('/')
  } else {
    res.status(422).send('Invalid email or password')
  }
})

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome user!')
})

export { router }
