import Tetryon, { modules, math, systems } from 'tetryon'
const { d2, input } = modules
const { cos, sin, randomInt, randomFloat, Vec2, PI } = math
const { Sprite, Transform, Physics, render, physics } = d2

const particleTextures = {
  fire1: 'assets/images/fire_particle.jpg',
  fire2: 'assets/images/fire_particle2.png',
  fire3: 'assets/images/fire_particle3.png',
  snow1: 'assets/images/snow_particle.png',
  snow2: 'assets/images/snow_particle2.png',
  smoke1: 'assets/images/smoke_particle.png',
  magic1: 'assets/images/magic_particles.png',
}

const world = {
  width: 1000,
  height: 1000,
}

let tetryon = null

const makeParticle = (i, n, r = 0, spriteName = null) => {
  const step = (Math.PI * 2 + randomFloat(-PI/4, PI/4)) / n
  const rotation = -Math.PI + r + i * step
  const forceAmt = randomFloat(200, 600)
  const position = Vec2(0, 0)
  const force = Vec2(
    cos(rotation) * forceAmt,
    sin(rotation) * forceAmt
  )

  // const names = Object.keys(particleTextures)
  if (!spriteName) {
    const names = ['snow1', 'fire3', 'smoke1']
    const idx = Math.round(Math.random() * (names.length - 1))
    spriteName = names[idx]
  }

  tetryon.entity()
    .set(Transform, { position, rotation, scale: randomFloat(0.1, 0.5) })
    .set(Physics, { force: force, mass: 1, friction: 0 })
    .set(Sprite, { name: spriteName, alpha: randomFloat(0.1, 1) })
}

const pin = (x, y, scale = 0.1) => {
  tetryon.entity()
    .set(Transform, { position: Vec2(x, y), scale })
    .set(Sprite, { name: 'fire3', alpha: 0.01 })
}

const setupEngine = () => {
  tetryon = window.tetryon = new Tetryon()
  render.configure({ fullscreen: true })

  tetryon.addComponent(Transform)
  tetryon.addComponent(Sprite)
  tetryon.addComponent(Physics)

  // const simpleRender = new systems.SimpleRender({ fullscreen: true, scale: 0.75 })
  // tetryon.addSystem(simpleRender)
  tetryon.addSystem(physics)
  tetryon.addSystem(render)
  // tetryon.addSystem(input)
  // tetryon.addSystem(physics)
  // tetryon.addSystem({
  //   dependencies: [Transform, Sprite],
  //   each(e) {
  //     const t = e.get(Transform)
  //     const s = e.get(Sprite)
  //     console.log(
  //       t.position.x,
  //       t.position.y,
  //       s._sprite.position.x,
  //       s._sprite.position.y)
  //   },
  // })

  render.stage.pivot.x = -window.innerWidth / 2
  render.stage.pivot.y = -window.innerHeight / 2
  // render.stage.anchor.x = 0.5
  // render.stage.anchor.y = 0.5
}

const populateWorld = () => {
  makeParticle(0, 1, 40)
}

function makeParticles(spriteName = null) {
  const r = randomFloat(-PI / 2, PI / 2)
  const numParticles = randomInt(3, 12)
  for (let i = 0; i < numParticles; i++) {
    makeParticle(i, numParticles, r, spriteName)
  }
}

const actions = {
  randomParticles: () => { makeParticles() },
  snowParticles: () => { makeParticles('snow1') },
  fireParticles: () => { makeParticles('fire3') },
  smokeParticles: () => { makeParticles('smoke1') },
}

const setupSprites = (callback) => {
  const names = ['fire3', 'smoke1', 'snow1']
  render.loadTextures(particleTextures, () => {
    names.forEach(name => {
      render.addSprite(name, render.textures[name])
    })
    callback()
  })
}

const demo1 = () => {
  setupEngine()
  setupSprites(() => {
    populateWorld()
    tetryon.start()
  })
  return tetryon
}

export default demo1
export { actions }
